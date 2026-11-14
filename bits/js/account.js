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

    // a name people know their device by, such as "Firefox on Linux", from a browser's User-Agent, which the master may have cut short
    function device(ua)
    {
        ua = String(ua || "");
        if(!/^Mozilla\//.test(ua)) return ua;
        var browser = /Edg\//.test(ua) ? "Edge" : /OPR\/|Opera/.test(ua) ? "Opera" : /Firefox|Gecko\/\d/.test(ua) ? "Firefox" : /Chrome\/|CriOS/.test(ua) ? "Chrome"
            : /Safari\//.test(ua) ? "Safari" : "A browser";
        var system = /Android/.test(ua) ? "Android" : /iPhone|iPad|iPod/.test(ua) ? "iOS" : /Windows/.test(ua) ? "Windows" : /Mac OS X|Macintosh/.test(ua) ? "macOS"
            : /CrOS/.test(ua) ? "ChromeOS" : /Linux|X11/.test(ua) ? "Linux" : /BSD/.test(ua) ? "BSD" : "";
        return system ? browser + " on " + system : browser;
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

    Account.prototype.request = function(method, path, body, credentials)
    {
        var init = { method: method, cache: "no-store", headers: {} };
        if(credentials) init.credentials = "include";
        if(body) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(body); }
        return fetch(this.master + "/api/v1" + path, init).then(function(r)
        {
            return r.json().catch(function() { return {}; }).then(function(json) { return { status: r.status, json: json || {} }; });
        }, function()
        {
            return { status: 0, json: { error: "couldn't reach the master server" } };
        });
    };

    // the sign-in's own routes, the cookie going with them
    Account.prototype.call = function(method, path, body) { return this.request(method, "/signin" + (path || ""), body, true); };

    // registration and the mailed links, which need no sign-in
    Account.prototype.accounts = function(method, path, body) { return this.request(method, "/accounts" + (path || ""), body, false); };

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
            return self.call("POST", "", { id: r.json.id, answer: ans, remember: !!remember, label: device(navigator.userAgent) });
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

    window.REAccount = { Account: Account, answer: answer, readauthcfg: readauthcfg, device: device, MASTER: MASTER };

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
                el("td", { class: "account-device", title: s.label || "" }, [device(s.label) || "Unnamed", s.current ? el("span", { class: "account-tag", text: "This browser" }) : null]),
                el("td", { class: "account-when", "data-label": "Signed in", text: date(s.created) }),
                el("td", { class: "account-when", "data-label": "Last used", text: date(s.lastused) }),
                el("td", { class: "account-when", "data-label": "Ends", text: s.remember ? day(s.expires) : "When the browser closes" }),
                el("td", { class: "account-addr", "data-label": "Address" }, el("span", { class: "account-ip" }, s.firstaddr === s.lastaddr ? s.lastaddr : [s.firstaddr, el("br"), "then " + s.lastaddr])),
                el("td", { class: "account-end" }, el("button", { type: "button", text: s.current ? "Sign out" : "Sign out there", onclick: function()
                {
                    account.end(s.current ? null : s.id).then(function() { refresh(); });
                } }))
            ]);
        });
        return el("div", { class: "account-scroll" }, el("table", { class: "account-signins" }, [
            el("thead", {}, el("tr", {}, ["Device", "Signed in", "Last used", "Ends", "Address", ""].map(function(h) { return el("th", { text: h }); }))),
            el("tbody", {}, rows)
        ]));
    }

    // ---- registering, lost keys and the mailed links

    var ACTION = root.getAttribute("data-action") || "", SITEKEY = root.getAttribute("data-turnstile") || "";
    var FLAGPRIV = { u: 1, s: 2, m: 3, o: 3, a: 4, d: 5, c: 6 }, PRIVNAMES = ["none", "player", "supporter", "moderator", "administrator", "developer", "creator"];
    var CONTROLTYPES = ["ban", "mute", "limit", "allow", "except", "trust"];

    function privof(flags)
    {
        var best = 0;
        String(flags || "").toLowerCase().split("").forEach(function(c) { best = Math.max(best, FLAGPRIV[c] || 0); });
        return best;
    }

    function failed(r, what) { return new Error((r.json && r.json.error) ? r.json.error.charAt(0).toUpperCase() + r.json.error.slice(1) + "." : what); }

    var turnstile = null;
    function loadturnstile()
    {
        if(turnstile) return turnstile;
        turnstile = new Promise(function(resolve, reject)
        {
            var s = el("script", { src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit", async: true });
            s.onload = function() { resolve(window.turnstile); };
            s.onerror = function() { turnstile = null; reject(new Error("The captcha couldn't load, so try again later.")); };
            document.head.appendChild(s);
        });
        return turnstile;
    }

    // Cloudflare Turnstile in a box, whose answer goes with the form
    function captcha(box)
    {
        var id = null;
        loadturnstile().then(function(t) { id = t.render(box, { sitekey: SITEKEY, theme: "dark" }); }, function(err) { box.textContent = err.message; });
        return {
            token: function() { return id !== null && window.turnstile ? window.turnstile.getResponse(id) || "" : ""; },
            reset: function() { if(id !== null && window.turnstile) window.turnstile.reset(id); }
        };
    }

    function registerform(info)
    {
        if(!info.register) return el("p", { class: "account-help", text: "Registration is closed for now." });
        if(!info.website || !SITEKEY) return el("p", { class: "account-help" }, ["Register in the game instead: open ", el("strong", { text: "Player setup" }), ", then ", el("strong", { text: "Account" }), "."]);
        var handle = el("input", { type: "text", id: "account-handle", autocomplete: "off", spellcheck: "false", required: true, minlength: 3, maxlength: 24, pattern: "[A-Za-z0-9_-]{3,24}" });
        var email = el("input", { type: "email", id: "account-email", autocomplete: "email", required: true, maxlength: 254 });
        var box = el("div", { class: "account-captcha" }), check = captcha(box);
        var button = el("button", { type: "submit", text: "Register" });
        return el("form", { class: "account-form", onsubmit: function(e)
        {
            e.preventDefault();
            if(!check.token()) { say("Solve the captcha first.", true); return; }
            button.disabled = true;
            say("Registering…");
            account.accounts("POST", "", { handle: handle.value.trim(), email: email.value.trim(), captcha: check.token() }).then(function(r)
            {
                button.disabled = false;
                check.reset();
                if(r.status !== 202) throw failed(r, "The master server couldn't register it.");
                say("Check " + email.value.trim() + " for a link to activate " + r.json.handle + ", within " + info.days + " days. If it doesn't come, register again the same way for a new one.");
                handle.value = email.value = "";
            }).catch(function(err) { button.disabled = false; say(err.message, true); });
        } }, [
            el("label", { for: "account-handle", text: "Handle" }), handle,
            el("label", { for: "account-email", text: "Email address" }), email,
            el("p", { class: "account-help", text: "Your handle is the name everyone knows your account by, 3 to 24 letters, numbers, - or _, and it can't be changed. "
                + "Your email address is only used for the link that activates it, resetting its key and changing the address, and is never shown." }),
            box, button
        ]);
    }

    function resetform(info)
    {
        if(!info.website || !SITEKEY) return el("p", { class: "account-help" }, ["Ask for a new key in the game: open ", el("strong", { text: "Player setup" }), ", then ", el("strong", { text: "Account" }), "."]);
        var who = el("input", { type: "text", id: "account-who", autocomplete: "off", spellcheck: "false", required: true });
        var box = el("div", { class: "account-captcha" }), check = captcha(box);
        var button = el("button", { type: "submit", text: "Reset the key" });
        return el("form", { class: "account-form", onsubmit: function(e)
        {
            e.preventDefault();
            if(!check.token()) { say("Solve the captcha first.", true); return; }
            var value = who.value.trim(), body = { captcha: check.token() };
            body[value.indexOf("@") >= 0 ? "email" : "handle"] = value;
            button.disabled = true;
            account.accounts("POST", "/reset", body).then(function(r)
            {
                button.disabled = false;
                check.reset();
                if(r.status !== 202) throw failed(r, "The master server couldn't do that.");
                say("If that's an account with an email address, a link to reset its key was sent there. It lasts a day.");
            }).catch(function(err) { button.disabled = false; say(err.message, true); });
        } }, [el("label", { for: "account-who", text: "Handle or email" }), who, box, button]);
    }

    function copybutton(get)
    {
        var b = el("button", { type: "button", text: "Copy", onclick: function()
        {
            navigator.clipboard.writeText(get()).then(function() { b.textContent = "Copied"; setTimeout(function() { b.textContent = "Copy"; }, 2000); });
        } });
        return b;
    }

    // the key, shown once, and how to use it in the game
    function keypanel(k)
    {
        var line = "authkey " + k.handle + " " + k.privkey, cfg = "// the Red Eclipse account " + k.handle + "\n" + line + "\n";
        var file = el("textarea", { class: "account-cfg", readonly: true, rows: 2, spellcheck: "false" });
        file.value = cfg;
        var download = el("a", { href: URL.createObjectURL(new Blob([cfg], { type: "text/plain" })), download: "auth.cfg", class: "account-button", text: "Download auth.cfg" });
        return el("div", { class: "account-key" }, [
            el("p", { class: "account-notice account-bad" }, [el("strong", { text: "This key is shown once." }), " Save it now: it can't be shown again, and without it you'd have to reset it."]),
            el("h2", { text: "Use it in the game" }),
            el("p", {}, ["Open the console with ", el("kbd", { text: "`" }), " (the key above Tab), paste this line and press Enter. The game saves it to ", el("code", { text: "auth.cfg" }), " for you."]),
            el("p", { class: "account-line" }, [el("code", { text: line }), " ", copybutton(function() { return line; })]),
            el("h2", { text: "Or save auth.cfg" }),
            el("p", {}, ["Put this ", el("code", { text: "auth.cfg" }), " in your Red Eclipse home folder:"]),
            file,
            el("p", {}, [download, " ", copybutton(function() { return cfg; })]),
            el("ul", { class: "account-help" }, [
                el("li", {}, ["Windows: ", el("code", { text: "Documents\\My Games\\Red Eclipse" })]),
                el("li", {}, ["Linux: ", el("code", { text: "~/.redeclipse" })]),
                el("li", {}, ["macOS: ", el("code", { text: "~/Library/Application Support/Red Eclipse" })]),
                el("li", { text: "The game's console shows the folder it uses as \"Home directory\" when it starts, which may have another folder inside, such as stable." })
            ]),
            el("p", {}, ["Then you're signed in on every server that uses accounts, and you can ", el("a", { href: "/account", text: "sign in here" }), " with it too."])
        ]);
    }

    // the link's token, taken out of the address bar so it isn't left there
    function linktoken()
    {
        var token = window.location.hash.replace(/^#/, "");
        if(token && window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
        return /^[0-9a-f]{64}$/.test(token) ? token : "";
    }

    // a mailed link: nothing happens until the person presses the button, as some mail scanners run a page's scripts
    function linkpage(token, label, intro, post, done)
    {
        clear(root);
        root.appendChild(notice);
        if(!token) { say("That link is incomplete. Copy the whole of it from the email.", true); return true; }
        var button = el("button", { type: "button", text: label, onclick: function()
        {
            button.disabled = true;
            say("Asking the master server…");
            post().then(function(r)
            {
                say("");
                clear(root);
                root.appendChild(notice);
                done(r);
            }).catch(function(err) { button.disabled = false; say(err.message, true); });
        } });
        root.appendChild(el("p", { text: intro }));
        root.appendChild(el("p", {}, button));
        return true;
    }

    function actionpage()
    {
        var token = linktoken();
        switch(ACTION)
        {
            case "activate":
                return linkpage(token, "Activate my account", "Activate your Red Eclipse account and get its key.", function()
                {
                    return account.accounts("POST", "/activate", { token: token }).then(function(r) { if(r.status !== 200) throw failed(r, "The master server couldn't activate it."); return r.json; });
                }, function(k)
                {
                    root.appendChild(el("p", { class: "account-who" }, ["Your account ", el("strong", { text: k.handle }), " is ready."]));
                    root.appendChild(keypanel(k));
                });
            case "reset":
                return linkpage(token, "Reset my key", "Get a new key for your Red Eclipse account. The old one stops working, and you're signed out everywhere it was remembered.", function()
                {
                    return account.accounts("POST", "/reset/confirm", { token: token }).then(function(r) { if(r.status !== 200) throw failed(r, "The master server couldn't reset it."); return r.json; });
                }, function(k)
                {
                    root.appendChild(el("p", { class: "account-who" }, ["Here's the new key for ", el("strong", { text: k.handle }), "."]));
                    root.appendChild(keypanel(k));
                });
            case "cancel":
                return linkpage(token, "Remove the registration", "Someone registered a Red Eclipse account with your email address. If it wasn't you, remove it.", function()
                {
                    return account.accounts("POST", "/cancel", { token: token }).then(function(r) { if(r.status !== 204) throw failed(r, "The master server couldn't remove it."); });
                }, function() { say("Removed. Your email address is free again, and nothing more will come from this."); });
            case "email":
                return linkpage(token, "Use this email address", "Use this email address for your Red Eclipse account from now on.", function()
                {
                    return account.accounts("POST", "/email/confirm", { token: token }).then(function(r) { if(r.status !== 200) throw failed(r, "The master server couldn't change it."); return r.json; });
                }, function(r) { say("Done: " + r.handle + "'s email address is now " + r.email + "."); });
            case "email-cancel":
                return linkpage(token, "Stop the change", "Someone asked to move your Red Eclipse account to another email address. If it wasn't you, stop it.", function()
                {
                    return account.accounts("POST", "/email/cancel", { token: token }).then(function(r) { if(r.status !== 204) throw failed(r, "The master server couldn't stop it."); });
                }, function()
                {
                    say("Stopped. Someone was signed in to your account to ask for it, so reset its key to sign them out.");
                    account.accounts("GET").then(function(r) { root.appendChild(el("h2", { text: "Reset the key" })); root.appendChild(resetform(r.json || {})); });
                });
            case "steam": case "discord":
                return linkreturn();
        }
        return false;
    }

    // Steam or Discord sending the person back after proving who they are
    function linkreturn()
    {
        var q = new URLSearchParams(window.location.search), body;
        if(window.history.replaceState) window.history.replaceState(null, "", "/account");
        if(ACTION === "steam")
        {
            var openid = {};
            q.forEach(function(v, k) { if(k.indexOf("openid.") === 0) openid[k] = v; });
            if(!openid["openid.return_to"]) { refresh(); return true; }
            body = { openid: openid };
        }
        else
        {
            if(q.get("error") || !q.get("code")) { refresh(); say("Discord didn't link: " + (q.get("error_description") || q.get("error") || "no code came back") + ".", true); return true; }
            body = { code: q.get("code"), state: q.get("state") };
        }
        root.textContent = "Linking…";
        account.me(true).then(function(me)
        {
            if(!me) { draw(null); say("Sign in first, then link it again.", true); return; }
            return account.call("POST", "/account/" + ACTION, body).then(function(r)
            {
                refresh();
                if(r.status !== 200) say(failed(r, "It didn't link.").message, true);
                else say(ACTION === "steam" ? "Your Steam account is linked." : "Your Discord account is linked.");
            });
        });
        return true;
    }

    // ---- the signed in owner's account

    function field(label, value) { return [el("dt", { text: label }), el("dd", {}, value)]; }

    function ownerpanel(mine)
    {
        var box = el("div", { class: "account-owner" });
        var display = el("input", { type: "text", id: "account-display", maxlength: 64, value: mine.displayname || "", placeholder: "Taken from your in-game or Discord name" });
        var save = el("button", { type: "button", text: "Save", onclick: function()
        {
            save.disabled = true;
            account.call("PATCH", "/account", { displayname: display.value }).then(function(r)
            {
                save.disabled = false;
                if(r.status !== 200) throw failed(r, "It couldn't be changed.");
                display.value = r.json.displayname || "";
                say(r.json.displayname ? "You show as " + r.json.displayname + " (" + r.json.handle + ") on the website." : "Your display name is cleared, and it's filled in again from your in-game or Discord name.");
            }).catch(function(err) { save.disabled = false; say(err.message, true); });
        } });
        function linkbutton(kind, label)
        {
            return el("button", { type: "button", text: label, onclick: function()
            {
                account.call("GET", "/account/" + kind).then(function(r)
                {
                    if(r.status !== 200 || !r.json.url) throw failed(r, "It can't be linked right now.");
                    window.location.href = r.json.url;
                }).catch(function(err) { say(err.message, true); });
            } });
        }
        function unlinkbutton(kind)
        {
            return el("button", { type: "button", text: "Unlink", onclick: function()
            {
                account.call("DELETE", "/account/" + kind).then(function(r) { if(r.status !== 204) throw failed(r, "It couldn't be unlinked."); refresh(); }).catch(function(err) { say(err.message, true); });
            } });
        }
        var code = el("span", { class: "account-code" });
        var codebutton = el("button", { type: "button", text: "Get a /link code", onclick: function()
        {
            account.call("POST", "/account/discord/code").then(function(r)
            {
                if(r.status !== 200) throw failed(r, "No code came back.");
                clear(code).appendChild(el("span", {}, ["Type ", el("code", { text: "/link " + r.json.code }), " to the Red Eclipse bot on Discord within ten minutes."]));
            }).catch(function(err) { say(err.message, true); });
        } });
        var newemail = el("input", { type: "email", id: "account-newemail", autocomplete: "email", maxlength: 254 });
        var confirm = el("input", { type: "text", id: "account-confirm", autocomplete: "off", spellcheck: "false" });
        box.appendChild(el("dl", { class: "account-fields" }, [].concat(
            field("Handle", el("strong", { text: mine.handle })),
            field("Standing", PRIVNAMES[privof(mine.flags)] || "player"),
            field("Email", [mine.email || "none", mine.newemail ? el("span", { class: "account-help", text: " (changing to " + mine.newemail + " once it's confirmed)" }) : null]),
            field("Display name", el("span", { class: "account-inline" }, [display, save])),
            field("Steam", mine.steamid ? [el("a", { href: "https://steamcommunity.com/profiles/" + mine.steamid, rel: "noopener", text: mine.steamid }), " ", unlinkbutton("steam")]
                : linkbutton("steam", "Link with Steam")),
            field("Discord", mine.discord ? [el("span", { text: mine.discord }), " ", unlinkbutton("discord")]
                : el("span", { class: "account-inline" }, [linkbutton("discord", "Link with Discord"), codebutton, code]))
        )));
        box.appendChild(el("p", { class: "account-help", text: "Your display name is shown with your handle here on the website, up to 32 characters. In game you go by your in-game name, and on Discord by your Discord name." }));
        box.appendChild(el("h3", { text: "Change your email address" }));
        box.appendChild(el("form", { class: "account-form", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/account/email", { email: newemail.value.trim() }).then(function(r)
            {
                if(r.status !== 202) throw failed(r, "It couldn't be changed.");
                say("Check " + newemail.value.trim() + " for a link to confirm it. Until then your account keeps its old address, which is told about the change.");
                newemail.value = "";
            }).catch(function(err) { say(err.message, true); });
        } }, [el("label", { for: "account-newemail", text: "New address" }), newemail, el("button", { type: "submit", text: "Change" })]));
        box.appendChild(el("h3", { text: "Delete your account" }));
        box.appendChild(el("form", { class: "account-form", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("DELETE", "/account", { confirm: confirm.value.trim() }).then(function(r)
            {
                if(r.status !== 204) throw failed(r, "It couldn't be deleted.");
                account.end().then(function() { draw(null); say("Your account is deleted. Its key no longer works, and its handle is free for anyone."); });
            }).catch(function(err) { say(err.message, true); });
        } }, [
            el("p", { class: "account-help", text: "This can't be undone. Type your handle to delete it." }),
            el("label", { for: "account-confirm", text: "Your handle" }), confirm, el("button", { type: "submit", text: "Delete my account" })
        ]));
        return box;
    }

    // ---- administration, for administrators

    function admintable(head, rows) { return el("div", { class: "account-scroll" }, el("table", { class: "account-signins" }, [el("thead", {}, el("tr", {}, head.map(function(h) { return el("th", { text: h }); }))), el("tbody", {}, rows)])); }

    function adminpanel(me)
    {
        var box = el("div", { class: "account-admin" }), results = el("div"), controls = el("div"), servers = el("div");
        var q = el("input", { type: "text", id: "admin-q", placeholder: "Handle or email", spellcheck: "false" });
        function search()
        {
            account.call("GET", "/admin/accounts?limit=100&q=" + encodeURIComponent(q.value.trim())).then(function(r)
            {
                if(r.status !== 200) throw failed(r, "The search failed.");
                clear(results).appendChild(el("p", { class: "account-help", text: r.json.total + " account(s)" + (r.json.total > r.json.accounts.length ? ", showing " + r.json.accounts.length : "") }));
                results.appendChild(admintable(["Handle", "Flags", "Email", "Display name", "Steam", "Discord", ""], r.json.accounts.map(function(a)
                {
                    var flags = el("input", { type: "text", value: a.flags, size: 4, spellcheck: "false" });
                    function act(method, body, done)
                    {
                        return account.call(method, "/admin/accounts/" + encodeURIComponent(a.handle), body).then(function(r)
                        {
                            if(r.status !== 200 && r.status !== 204) throw failed(r, "That didn't work.");
                            say(done);
                            search();
                        }).catch(function(err) { say(err.message, true); });
                    }
                    return el("tr", {}, [el("td", { text: a.handle }), el("td", {}, [flags, el("button", { type: "button", text: "Set", onclick: function() { act("PATCH", { flags: flags.value.trim() }, a.handle + "'s flags are " + flags.value.trim() + "."); } })]),
                        el("td", { text: a.email }), el("td", {}, [a.displayname || "", a.displayname ? el("button", { type: "button", text: "Clear", onclick: function() { act("PATCH", { displayname: "" }, a.handle + "'s display name is cleared."); } }) : null]),
                        el("td", { text: a.steamid }), el("td", { text: a.discord }),
                        el("td", {}, el("button", { type: "button", text: "Remove", onclick: function() { if(window.confirm("Remove the account " + a.handle + "?")) act("DELETE", null, a.handle + " is removed."); } }))]);
                })));
            }).catch(function(err) { say(err.message, true); });
        }
        function loadcontrols()
        {
            account.call("GET", "/admin/controls").then(function(r)
            {
                if(r.status !== 200) throw failed(r, "The global lists couldn't be read.");
                clear(controls).appendChild(admintable(["Type", "Address", "Reason", ""], r.json.controls.map(function(c)
                {
                    return el("tr", {}, [el("td", { text: c.type }), el("td", { text: c.address }), el("td", { text: c.reason }), el("td", {}, el("button", { type: "button", text: "Remove", onclick: function()
                    {
                        account.call("DELETE", "/admin/controls/" + c.id).then(function(r) { if(r.status !== 204) throw failed(r, "It couldn't be removed."); loadcontrols(); }).catch(function(err) { say(err.message, true); });
                    } }))]);
                })));
            }).catch(function(err) { say(err.message, true); });
        }
        function loadservers()
        {
            account.call("GET", "/admin/servers").then(function(r)
            {
                if(r.status !== 200) throw failed(r, "The server accounts couldn't be read.");
                clear(servers).appendChild(admintable(["Handle", "Flags", "Email", ""], r.json.servers.map(function(a)
                {
                    return el("tr", {}, [el("td", { text: a.handle }), el("td", { text: a.flags }), el("td", { text: a.email }), el("td", {}, el("button", { type: "button", text: "Remove", onclick: function()
                    {
                        if(!window.confirm("Remove the server account " + a.handle + "?")) return;
                        account.call("DELETE", "/admin/servers/" + encodeURIComponent(a.handle)).then(function(r) { if(r.status !== 204) throw failed(r, "It couldn't be removed."); loadservers(); }).catch(function(err) { say(err.message, true); });
                    } }))]);
                })));
            }).catch(function(err) { say(err.message, true); });
        }
        var ctype = el("select", {}, CONTROLTYPES.map(function(t) { return el("option", { value: t, text: t }); }));
        var caddr = el("input", { type: "text", placeholder: "1.2.3.4, or 1.2 for a range", spellcheck: "false" }), creason = el("input", { type: "text", placeholder: "Reason, with the date" });
        var shandle = el("input", { type: "text", placeholder: "Handle", spellcheck: "false" }), sflags = el("input", { type: "text", placeholder: "Flags", size: 4, spellcheck: "false" });
        var skey = el("input", { type: "text", placeholder: "Public key", spellcheck: "false" }), semail = el("input", { type: "email", placeholder: "Email" });
        var mailto = el("input", { type: "email", placeholder: "Address" });
        box.appendChild(el("h3", { text: "Accounts" }));
        box.appendChild(el("form", { class: "account-inline", onsubmit: function(e) { e.preventDefault(); search(); } }, [q, el("button", { type: "submit", text: "Search" })]));
        box.appendChild(results);
        box.appendChild(el("h3", { text: "Global lists" }));
        box.appendChild(el("p", { class: "account-help", text: "Every linked server gets these. Global bans are a last resort: see the Multiplayer Guidelines." }));
        box.appendChild(controls);
        box.appendChild(el("form", { class: "account-inline", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/admin/controls", { type: ctype.value, address: caddr.value.trim(), reason: creason.value.trim() }).then(function(r)
            {
                if(r.status !== 201) throw failed(r, "It couldn't be added.");
                caddr.value = creason.value = "";
                loadcontrols();
            }).catch(function(err) { say(err.message, true); });
        } }, [ctype, caddr, creason, el("button", { type: "submit", text: "Add" })]));
        box.appendChild(el("h3", { text: "Server accounts" }));
        box.appendChild(servers);
        box.appendChild(el("form", { class: "account-inline", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/admin/servers", { handle: shandle.value.trim(), flags: sflags.value.trim(), pubkey: skey.value.trim(), email: semail.value.trim() }).then(function(r)
            {
                if(r.status !== 201) throw failed(r, "It couldn't be added.");
                shandle.value = sflags.value = skey.value = semail.value = "";
                loadservers();
            }).catch(function(err) { say(err.message, true); });
        } }, [shandle, sflags, skey, semail, el("button", { type: "submit", text: "Add" })]));
        box.appendChild(el("h3", { text: "Mail" }));
        box.appendChild(el("form", { class: "account-inline", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/admin/mail", { to: mailto.value.trim() }).then(function(r)
            {
                if(r.status !== 202) throw failed(r, "It couldn't be sent.");
                say("A test email is on its way to " + mailto.value.trim() + "; the master's log says if it couldn't be delivered.");
            }).catch(function(err) { say(err.message, true); });
        } }, [mailto, el("button", { type: "submit", text: "Send a test email" })]));
        loadcontrols();
        loadservers();
        return box;
    }

    function draw(me)
    {
        clear(root);
        root.appendChild(notice);
        if(!me)
        {
            root.appendChild(el("p", { text: "Sign in with your Red Eclipse account to chat on servers from the server browser, and to moderate them if your account can." }));
            root.appendChild(signinform());
            var more = el("div");
            root.appendChild(more);
            account.accounts("GET").then(function(r)
            {
                var info = r.status === 200 ? r.json : { register: false };
                more.appendChild(el("h2", { text: "Register" }));
                more.appendChild(registerform(info));
                more.appendChild(el("h2", { text: "Lost your key?" }));
                more.appendChild(resetform(info));
            });
            return;
        }
        root.appendChild(el("p", { class: "account-who" }, ["Signed in as ", el("strong", { text: me.name }), "."]));
        var owner = el("div");
        root.appendChild(el("h2", { text: "Your account" }));
        root.appendChild(owner);
        account.call("GET", "/account").then(function(r)
        {
            if(r.status === 200) owner.appendChild(ownerpanel(r.json));
            else owner.appendChild(el("p", { class: "account-help", text: failed(r, "Your account's details couldn't be read.").message }));
        });
        root.appendChild(el("h2", { text: "Where you're signed in" }));
        root.appendChild(signinlist(me));
        root.appendChild(el("p", {}, [el("button", { type: "button", text: "Sign out everywhere", onclick: function()
        {
            account.end("all").then(function() { refresh(); });
        } })]));
        if(privof(me.flags) >= FLAGPRIV.a)
        {
            root.appendChild(el("h2", { text: "Administration" }));
            root.appendChild(adminpanel(me));
        }
    }

    function refresh() { account.me(true).then(draw); }
    root.textContent = "Loading…";
    if(!actionpage()) refresh();
})();
