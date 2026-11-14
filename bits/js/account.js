// Signing in with a Red Eclipse account: the master's remembered sign-ins, and the Account page.
// See "Remembered sign-ins" in doc/web-api-guide.md in redeclipse/base. The private key is only ever held while answering a challenge.
(function()
{
    "use strict";

    var MASTER = "https://play.redeclipse.net:28888";
    var HINTKEY = "redeclipse.signedin"; // only whether to ask the master, so anonymous visitors cost it nothing

    // ---- NIST P-192, as src/shared/crypto.cpp uses it: a challenge is a point, a sign for the parity of y then x in hex,
    // and the answer is x of that point multiplied by the private key

    var P = BigInt("0xfffffffffffffffffffffffffffffffeffffffffffffffff");
    var B = BigInt("0x64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1");

    function mod(a) { a %= P; return a < 0n ? a + P : a; }
    function modpow(b, e)
    {
        var r = 1n;
        b = mod(b);
        while(e > 0n)
        {
            if(e & 1n) r = r * b % P;
            b = b * b % P;
            e >>= 1n;
        }
        return r;
    }
    function inverse(a) { return modpow(a, P - 2n); }

    function decompress(challenge)
    {
        var m = /^([+-])([0-9a-fA-F]+)$/.exec(String(challenge || "").trim());
        if(!m) return null;
        var x = BigInt("0x" + m[2]);
        var y2 = mod(x * x * x - 3n * x + B), y = modpow(y2, (P + 1n) / 4n);
        if(y * y % P !== y2) return null;
        if((y & 1n) !== (m[1] === "-" ? 1n : 0n)) y = P - y;
        return { x: x, y: y };
    }

    function add(a, b)
    {
        if(!a) return b;
        if(!b) return a;
        var l;
        if(a.x === b.x)
        {
            if(mod(a.y + b.y) === 0n) return null;
            l = mod(3n * a.x * a.x - 3n) * inverse(2n * a.y) % P;
        }
        else l = mod(b.y - a.y) * inverse(mod(b.x - a.x)) % P;
        var x = mod(l * l - a.x - b.x);
        return { x: x, y: mod(l * (a.x - x) - a.y) };
    }

    function multiply(k, pt)
    {
        var r = null;
        for(var i = k.toString(2), n = 0; n < i.length; n++)
        {
            r = add(r, r);
            if(i[n] === "1") r = add(r, pt);
        }
        return r;
    }

    function answer(privkey, challenge)
    {
        var key = String(privkey || "").trim();
        if(!/^[0-9a-fA-F]+$/.test(key)) throw new Error("That isn't a private key: it should be the long run of letters and numbers after your name in auth.cfg.");
        var pt = decompress(challenge);
        if(!pt) throw new Error("The master server sent a challenge this page can't read.");
        var r = multiply(BigInt("0x" + key), pt);
        if(!r) throw new Error("That private key gives no answer.");
        return r.x.toString(16);
    }

    // auth.cfg holds a line like: authkey "name" "private key"
    function readauthcfg(text)
    {
        var m = /authkey\s+"?([^"\s]+)"?\s+"?([0-9a-fA-F]+)"?/.exec(text || "");
        return m ? { name: m[1], key: m[2] } : null;
    }

    // ---- the master's sign-in routes, the cookie going with each request

    function hint(on)
    {
        try { if(on) window.localStorage.setItem(HINTKEY, "1"); else window.localStorage.removeItem(HINTKEY); } catch(e) {}
    }
    function hinted() { try { return window.localStorage.getItem(HINTKEY) === "1"; } catch(e) { return true; } }

    function Account(master)
    {
        this.master = (master || MASTER).replace(/\/+$/, "");
        this.mine = null;
        this.sessions = new Map();
    }

    Account.prototype.call = function(method, path, body)
    {
        var init = { method: method, credentials: "include", cache: "no-store", headers: {} };
        if(body) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(body); }
        return fetch(this.master + "/api/v1/signin" + (path || ""), init).then(function(r)
        {
            return r.json().catch(function() { return {}; }).then(function(json) { return { status: r.status, json: json || {} }; });
        }, function()
        {
            return { status: 0, json: { error: "couldn't reach the master server" } };
        });
    };

    // the account and its sign-ins, or null when this browser isn't signed in
    Account.prototype.me = function(fresh)
    {
        var self = this;
        if(!fresh && this.mine) return this.mine;
        if(!hinted()) return (this.mine = Promise.resolve(null));
        this.mine = this.call("GET").then(function(r)
        {
            if(r.status === 200) return r.json;
            if(r.status === 401) { hint(false); self.sessions.clear(); }
            return null;
        });
        return this.mine;
    };

    Account.prototype.signin = function(name, privkey, remember)
    {
        var self = this;
        name = String(name || "").trim();
        if(!name) return Promise.reject(new Error("Enter your account name."));
        return this.call("POST", "", { name: name }).then(function(r)
        {
            if(r.status !== 200) throw new Error(r.json.error || "The master server refused to sign you in.");
            var ans = answer(privkey, r.json.challenge);
            return self.call("POST", "", { id: r.json.id, answer: ans, remember: !!remember });
        }).then(function(r)
        {
            if(r.status !== 200) throw new Error(r.json.error === "identity verification failed" ? "That key isn't this account's." : (r.json.error || "The master server refused to sign you in."));
            hint(true);
            self.sessions.clear();
            return self.me(true);
        });
    };

    Account.prototype.end = function(id)
    {
        var self = this;
        return this.call("DELETE", id ? "/" + encodeURIComponent(id) : "").then(function(r)
        {
            if(!id || id === "all" || r.status === 401) { hint(false); self.sessions.clear(); self.mine = null; }
            return r;
        });
    };

    // a session on a server from the master, kept until it's refused; cleared with forget
    Account.prototype.session = function(host, port)
    {
        var self = this, k = host + "/" + port;
        if(this.sessions.has(k)) return this.sessions.get(k);
        var p = this.call("POST", "/session/" + encodeURIComponent(host) + "/" + encodeURIComponent(port)).then(function(r)
        {
            if(r.status === 200 && r.json.token) return r.json;
            if(r.status === 401) { hint(false); self.mine = Promise.resolve(null); }
            self.sessions.delete(k);
            var e = new Error(r.json.error || "couldn't get a session there");
            e.status = r.status;
            throw e;
        });
        this.sessions.set(k, p);
        return p;
    };
    Account.prototype.forget = function(host, port) { this.sessions.delete(host + "/" + port); };

    window.REAccount = { Account: Account, answer: answer, readauthcfg: readauthcfg, MASTER: MASTER };

    // ---- the Account page

    var root = document.getElementById("account");
    if(!root) return;
    var account = new Account(root.getAttribute("data-master"));

    function el(tag, attrs, kids)
    {
        var e = document.createElement(tag);
        if(attrs) for(var k in attrs)
        {
            var v = attrs[k];
            if(v === undefined || v === null || v === false) continue;
            if(k === "class") e.className = v;
            else if(k === "text") e.textContent = v;
            else if(k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
            else e.setAttribute(k, v === true ? "" : v);
        }
        (Array.isArray(kids) ? kids : kids ? [kids] : []).forEach(function(c)
        {
            if(c === undefined || c === null || c === false) return;
            e.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
        });
        return e;
    }
    function clear(e) { while(e.firstChild) e.removeChild(e.firstChild); return e; }
    function date(t) { return new Date(t * 1000).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }); }
    function day(t) { return new Date(t * 1000).toLocaleDateString(undefined, { dateStyle: "medium" }); }

    var notice = el("p", { class: "account-notice", hidden: true });
    function say(text, bad)
    {
        notice.textContent = text || "";
        notice.hidden = !text;
        notice.className = "account-notice" + (bad ? " account-bad" : "");
    }

    function signinform()
    {
        var name = el("input", { type: "text", id: "account-name", autocomplete: "username", spellcheck: "false", required: true });
        var key = el("input", { type: "password", id: "account-key", autocomplete: "off", spellcheck: "false", required: true });
        var remember = el("input", { type: "checkbox", id: "account-remember", checked: true });
        var file = el("input", { type: "file", accept: ".cfg,text/plain", hidden: true, onchange: function()
        {
            var f = file.files && file.files[0];
            if(!f) return;
            f.text().then(function(text)
            {
                var found = readauthcfg(text);
                if(!found) { say("That file has no authkey line.", true); return; }
                name.value = found.name;
                key.value = found.key;
                say("");
            });
            file.value = "";
        } });
        var button = el("button", { type: "submit", text: "Sign in" });
        var form = el("form", { class: "account-form", onsubmit: function(e)
        {
            e.preventDefault();
            button.disabled = true;
            say("Signing in…");
            account.signin(name.value, key.value, remember.checked).then(function(me)
            {
                key.value = "";
                say("");
                draw(me);
            }, function(err)
            {
                button.disabled = false;
                say(err.message, true);
            });
        } }, [
            el("label", { for: "account-name", text: "Account name" }), name,
            el("label", { for: "account-key", text: "Private key" }), key,
            el("p", { class: "account-help" }, ["Your private key is in ", el("code", { text: "auth.cfg" }), " in your Red Eclipse home folder, after ",
                el("code", { text: "authkey" }), " and your name. ",
                el("button", { type: "button", class: "account-link", text: "Read it from the file", onclick: function() { file.click(); } }), file,
                " It's used here once to answer the master server's challenge, then forgotten: it's never sent anywhere or kept."]),
            el("label", { class: "account-check" }, [remember, " Keep me signed in on this browser"]),
            el("p", { class: "account-help", text: "For 26 weeks, or 4 for moderators and above, unless it goes unused for half that. Safari keeps it 7 days unless you come back." }),
            button
        ]);
        return form;
    }

    function signinlist(me)
    {
        var rows = (me.signins || []).slice().sort(function(a, b) { return b.lastused - a.lastused; }).map(function(s)
        {
            return el("tr", { class: s.current ? "account-current" : null }, [
                el("td", {}, [s.label || "Unnamed", s.current ? el("span", { class: "account-tag", text: "This browser" }) : null]),
                el("td", { text: date(s.created) }),
                el("td", { text: date(s.lastused) }),
                el("td", { text: day(s.expires) + (s.remember ? "" : " (when the browser closes)") }),
                el("td", { text: s.firstaddr === s.lastaddr ? s.lastaddr : s.firstaddr + ", then " + s.lastaddr }),
                el("td", {}, el("button", { type: "button", text: s.current ? "Sign out" : "Sign out there", onclick: function()
                {
                    account.end(s.current ? null : s.id).then(function() { refresh(); });
                } }))
            ]);
        });
        return el("table", { class: "account-signins" }, [
            el("thead", {}, el("tr", {}, ["Device", "Signed in", "Last used", "Ends", "Address", ""].map(function(h) { return el("th", { text: h }); }))),
            el("tbody", {}, rows)
        ]);
    }

    function draw(me)
    {
        clear(root);
        root.appendChild(notice);
        if(!me)
        {
            root.appendChild(el("p", { text: "Sign in with your Red Eclipse account to chat on servers from the server browser, and to moderate them if your account can." }));
            root.appendChild(signinform());
            return;
        }
        root.appendChild(el("p", { class: "account-who" }, ["Signed in as ", el("strong", { text: me.name }), "."]));
        root.appendChild(el("h2", { text: "Where you're signed in" }));
        root.appendChild(signinlist(me));
        root.appendChild(el("p", {}, [el("button", { type: "button", text: "Sign out everywhere", onclick: function()
        {
            account.end("all").then(function() { refresh(); });
        } })]));
    }

    function refresh() { account.me(true).then(draw); }
    root.textContent = "Loading…";
    refresh();
})();
