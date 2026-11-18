// Signing in with a Red Eclipse account: the master's remembered sign-ins, and the account pages under /account.
// See "Remembered sign-ins" in the Web API Guide (https://www.redeclipse.net/docs/Web-API-Guide). The private key is only ever held while answering a challenge.
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

    // the master's own sign-in takes the answer hashed with what it's for, so one given to a game server can't be passed on to it
    function signinanswer(privkey, challenge)
    {
        var raw = answer(privkey, challenge).toLowerCase().replace(/^0+(?=.)/, "");
        if(!window.crypto || !crypto.subtle) return Promise.reject(new Error("This browser can't sign in here, as the page needs a secure connection."));
        return crypto.subtle.digest("SHA-256", new TextEncoder().encode("Red Eclipse master sign-in " + raw)).then(function(h)
        {
            return Array.from(new Uint8Array(h)).map(function(b) { return (b < 16 ? "0" : "") + b.toString(16); }).join("");
        });
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
            var id = r.json.id;
            return signinanswer(privkey, r.json.challenge).then(function(ans)
            {
                return self.call("POST", "", { id: id, answer: ans, remember: !!remember, label: device(navigator.userAgent) });
            });
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

    // a session on the master itself, for its live list, where the Matchmaking Queue takes the account's place; a fresh one
    // each time, as one kept would lapse while a socket that opened with it stays open
    Account.prototype.mastersession = function()
    {
        var self = this;
        return this.call("POST", "/session").then(function(r)
        {
            if(r.status === 200 && r.json.token) return r.json;
            if(r.status === 401) { hint(false); self.mine = Promise.resolve(null); }
            return null;
        });
    };

    window.REAccount = { Account: Account, answer: answer, readauthcfg: readauthcfg, device: device, MASTER: MASTER };

    // ---- the account pages

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
        (function add(list)
        {
            (Array.isArray(list) ? list : list ? [list] : []).forEach(function(c)
            {
                if(c === undefined || c === null || c === false) return;
                if(Array.isArray(c)) add(c);
                else e.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
            });
        })(kids);
        return e;
    }
    function clear(e) { while(e.firstChild) e.removeChild(e.firstChild); return e; }
    function date(t) { return new Date(t * 1000).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }); }
    function day(t) { return new Date(t * 1000).toLocaleDateString(undefined, { dateStyle: "medium" }); }

    // a message box for one form or panel, so what an action says shows next to it; the page has one of its own for the rest
    function notifier()
    {
        var box = el("p", { class: "account-notice", role: "status", hidden: true });
        return { el: box, say: function(text, bad)
        {
            box.textContent = text || "";
            box.hidden = !text;
            box.className = "account-notice" + (bad ? " account-bad" : "");
        } };
    }
    var pagenote = notifier(), notice = pagenote.el, say = pagenote.say;

    // a labelled field over its input, help under it and, beside the label, anything that fills it in
    function formfield(label, input, help, side)
    {
        return el("div", { class: "account-field" }, [
            el("div", { class: "account-field-head" }, [el("label", { for: input.id, text: label }), side]),
            input,
            help ? el("p", { class: "account-help" }, help) : null
        ]);
    }
    function actions(kids) { return el("div", { class: "account-actions" }, kids); }
    // a page with one thing to do has it in a card, and the pages next to it linked under that
    function card(kids, wide) { return el("div", { class: "account-card" + (wide ? " account-card-wide" : "") }, kids); }
    function cardlinks(list)
    {
        var kids = [];
        list.forEach(function(l, i) { if(i) kids.push(" · "); kids.push(el("a", { href: l[1], text: l[0] })); });
        return el("p", { class: "account-cardlinks" }, kids);
    }
    // a part of a signed in page with its own heading, anything acting on all of it beside that, and its own messages
    function panel(title, o)
    {
        o = o || {};
        var note = notifier();
        var box = el("div", { class: "account-panel" + (o.full ? " account-panel-full" : "") + (o.danger ? " account-danger" : "") }, [
            el("div", { class: "account-panel-head" }, [el("h2", { text: title }), o.tools ? el("div", { class: "account-panel-tools" }, o.tools) : null]),
            o.intro ? el("p", { class: "account-help account-panel-intro" }, o.intro) : null,
            note.el
        ]);
        box.say = note.say;
        return box;
    }
    // one of the site's icons, as includes/icon.html draws them
    function icon(name, width)
    {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        svg.setAttribute("class", "icon");
        svg.setAttribute("viewBox", "0 0 " + width + " 512");
        svg.setAttribute("aria-hidden", "true");
        use.setAttribute("href", "/bits/images/icons.svg#" + name);
        svg.appendChild(use);
        return svg;
    }

    function signinform(done)
    {
        var note = notifier(), say = note.say;
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
        var button = el("button", { type: "submit", class: "account-primary", text: "Sign in" });
        var form = el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            button.disabled = true;
            say("Signing in…");
            account.signin(name.value, key.value, remember.checked).then(function(me)
            {
                key.value = "";
                say("");
                done(me);
            }, function(err)
            {
                button.disabled = false;
                say(err.message, true);
            });
        } }, [
            formfield("Handle", name),
            formfield("Private key", key, ["In ", el("code", { text: "auth.cfg" }), " in your Red Eclipse home folder, after ", el("code", { text: "authkey" }),
                " and your handle. It only answers the master server's challenge here, and is never sent anywhere or kept."],
                [el("button", { type: "button", class: "account-link", text: "Read it from auth.cfg", onclick: function() { file.click(); } }), file]),
            el("div", { class: "account-check" }, [
                el("label", {}, [remember, "Keep me signed in on this browser"]),
                el("p", { class: "account-help", text: "For 26 weeks, or 4 for moderators and above, unless it goes unused for half that. Safari keeps it 7 days unless you come back." })
            ]),
            note.el,
            actions(button)
        ]);
        return form;
    }

    function signinlist(me, say)
    {
        var rows = (me.signins || []).slice().sort(function(a, b) { return b.lastused - a.lastused; }).map(function(s)
        {
            return el("tr", { class: s.current ? "account-current" : null }, [
                el("td", { class: "account-device", title: s.label || "" }, [device(s.label) || "Unnamed", s.current ? el("span", { class: "account-tag", text: "This browser" }) : null]),
                el("td", { class: "account-when", "data-label": "Signed in", text: date(s.created) }),
                el("td", { class: "account-when", "data-label": "Last used", text: date(s.lastused) }),
                el("td", { class: "account-when", "data-label": "Ends", text: s.remember ? day(s.expires) : "When the browser closes" }),
                el("td", { class: "account-addr", "data-label": "Address" }, el("span", { class: "account-ip" }, s.firstaddr === s.lastaddr ? s.lastaddr : [s.firstaddr, el("br"), "then " + s.lastaddr])),
                el("td", { class: "account-end" }, el("button", { type: "button", class: "account-quiet", text: s.current ? "Sign out" : "Sign out there", onclick: function()
                {
                    account.end(s.current ? null : s.id).then(function() { refresh(); }, function(err) { say(err.message, true); });
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
    var FLAGPRIV = { u: 1, s: 2, m: 3, o: 3, a: 4, d: 5, c: 6 }, PRIVNAMES = ["none", "player", "supporter", "moderator", "administrator", "developer", "founder"];
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

    // Cloudflare Turnstile in a box, whose answer goes with the form. Its script loads only once someone starts on the form,
    // so the page where a private key is typed for signing in runs nobody else's code unless it's wanted
    function captcha(box, fields)
    {
        var id = null, started = false;
        box.textContent = "The captcha appears once you start filling this in.";
        function start()
        {
            if(started) return;
            started = true;
            box.textContent = "";
            box.classList.add("account-captcha-on");
            loadturnstile().then(function(t) { id = t.render(box, { sitekey: SITEKEY, theme: "dark" }); }, function(err) { started = false; box.textContent = err.message; });
        }
        fields.forEach(function(f) { f.addEventListener("focus", start); });
        return {
            start: start,
            token: function() { return id !== null && window.turnstile ? window.turnstile.getResponse(id) || "" : ""; },
            reset: function() { if(id !== null && window.turnstile) window.turnstile.reset(id); }
        };
    }

    function registerform(info)
    {
        if(!info.register) return el("p", { class: "account-help", text: "Registration is closed for now." });
        if(!info.website || !SITEKEY) return el("p", { class: "account-help" }, ["Register in the game instead: open ", el("strong", { text: "Player setup" }), ", then ", el("strong", { text: "Account" }), "."]);
        var note = notifier(), say = note.say;
        var handle = el("input", { type: "text", id: "account-handle", autocomplete: "off", spellcheck: "false", required: true, minlength: 3, maxlength: 24, pattern: "[A-Za-z0-9_-]{3,24}" });
        var email = el("input", { type: "email", id: "account-email", autocomplete: "email", required: true, maxlength: 254 });
        var box = el("div", { class: "account-captcha" }), check = captcha(box, [handle, email]);
        var button = el("button", { type: "submit", class: "account-primary", text: "Register" });
        return el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            if(!check.token()) { check.start(); say("Solve the captcha first.", true); return; }
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
            formfield("Handle", handle, "The name everyone knows your account by: 3 to 24 letters, numbers, - or _. It can't be changed."),
            formfield("Email address", email, "Only for the link that activates it, resetting its key and changing the address. It's never shown."),
            box, note.el, actions(button)
        ]);
    }

    function resetform(info)
    {
        if(!info.website || !SITEKEY) return el("p", { class: "account-help" }, ["Ask for a new key in the game: open ", el("strong", { text: "Player setup" }), ", then ", el("strong", { text: "Account" }), "."]);
        var note = notifier(), say = note.say;
        var who = el("input", { type: "text", id: "account-who", autocomplete: "off", spellcheck: "false", required: true });
        var box = el("div", { class: "account-captcha" }), check = captcha(box, [who]);
        var button = el("button", { type: "submit", class: "account-primary", text: "Send a reset link" });
        return el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            if(!check.token()) { check.start(); say("Solve the captcha first.", true); return; }
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
        } }, [formfield("Handle or email address", who), box, note.el, actions(button)]);
    }

    function copybutton(get)
    {
        var b = el("button", { type: "button", text: "Copy", onclick: function()
        {
            navigator.clipboard.writeText(get()).then(function() { b.textContent = "Copied"; setTimeout(function() { b.textContent = "Copy"; }, 2000); });
        } });
        return b;
    }

    // the key, shown once, and how to use it in the game, in a wide card of its own
    function keypanel(k, title)
    {
        var line = "authkey " + k.handle + " " + k.privkey, cfg = "// the Red Eclipse account " + k.handle + "\n" + line + "\n";
        var file = el("textarea", { class: "account-cfg", readonly: true, rows: 3, wrap: "off", spellcheck: "false", "aria-label": "auth.cfg" });
        file.value = cfg;
        var download = el("a", { href: URL.createObjectURL(new Blob([cfg], { type: "text/plain" })), download: "auth.cfg", class: "account-button", text: "Download auth.cfg" });
        return card([
            el("h2", { text: title }),
            el("p", { class: "account-notice account-bad" }, [el("strong", { text: "This key is shown once." }), " Save it now: it can't be shown again, and without it you'd have to reset it."]),
            el("div", { class: "account-ways" }, [
                el("div", { class: "account-way" }, [
                    el("h3", { text: "In the game" }),
                    el("p", {}, ["Open the console with ", el("kbd", { text: "`" }), " (the key above Tab), paste this line and press Enter. The game saves it to ", el("code", { text: "auth.cfg" }), " for you."]),
                    el("code", { class: "account-copyline", text: line }),
                    actions(copybutton(function() { return line; }))
                ]),
                el("div", { class: "account-way" }, [
                    el("h3", { text: "Or as a file" }),
                    el("p", {}, ["Save this as ", el("code", { text: "auth.cfg" }), " in your Red Eclipse home folder."]),
                    file,
                    actions([download, copybutton(function() { return cfg; })])
                ])
            ]),
            el("h3", { text: "Your home folder" }),
            el("dl", { class: "account-folders" }, [
                el("dt", { text: "Windows" }), el("dd", {}, el("code", { text: "Documents\\My Games\\Red Eclipse" })),
                el("dt", { text: "Linux" }), el("dd", {}, el("code", { text: "~/.redeclipse" })),
                el("dt", { text: "macOS" }), el("dd", {}, el("code", { text: "~/Library/Application Support/Red Eclipse" }))
            ]),
            el("p", { class: "account-help", text: "The game's console shows the folder it uses as \"Home directory\" when it starts, which may have another folder inside, such as stable." }),
            el("p", {}, "Then you're signed in on every server that uses accounts, and you can sign in here with it too."),
            actions(el("a", { href: PAGES.login, class: "account-button account-primary", text: "Sign in" }))
        ], true);
    }

    // a server account's key, shown once, and where it goes
    function serverkeypanel(k)
    {
        var cfg = "// the Red Eclipse server account " + k.handle + "\n" + k.serverauthkey + "\n";
        var download = el("a", { href: URL.createObjectURL(new Blob([cfg], { type: "text/plain" })), download: "secrets.cfg", class: "account-button", text: "Download secrets.cfg" });
        return card([
            el("h2", { text: k.newkey ? "Here's the new key for " + k.handle : "The server account " + k.handle + " is ready" }),
            el("p", { class: "account-notice account-bad" }, [el("strong", { text: "This key is shown once." }), " Save it now: it can't be shown again, and without it an administrator would have to send you a new one."]),
            el("div", { class: "account-way" }, [
                el("h3", { text: "Put it in secrets.cfg" }),
                el("p", {}, ["Add this line to ", el("code", { text: "secrets.cfg" }), " in your server's home folder, next to ", el("code", { text: "servinit.cfg" }),
                    k.newkey ? ", in place of its old serverauthkey line." : ". Download it only if your server has no secrets.cfg yet."]),
                el("code", { class: "account-copyline", text: k.serverauthkey }),
                actions([copybutton(function() { return k.serverauthkey; }), download])
            ]),
            el("p", {}, ["The server reads ", el("code", { text: "secrets.cfg" }), " before ", el("code", { text: "servinit.cfg" }), " when it starts and on ", el("code", { text: "rehash" }),
                ", then signs in to the master server with it: its log says ", el("code", { text: "Server auth succeeded" }), "."]),
            k.newkey ? el("p", { class: "account-help", text: "The old key no longer works." }) : null
        ], true);
    }

    // what a mailed link did, and where to go next
    function result(title, text, next)
    {
        return card([el("h2", { text: title }), el("p", { text: text }), next ? actions(el("a", { href: next[1], class: "account-button account-primary", text: next[0] })) : null]);
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
        var note = notifier(), front;
        var button = el("button", { type: "button", class: "account-primary", text: label, onclick: function()
        {
            button.disabled = true;
            note.say("Asking the master server…");
            post().then(function(r) { root.replaceChild(done(r), front); }).catch(function(err) { button.disabled = false; note.say(err.message, true); });
        } });
        front = card([el("p", { class: "account-intro", text: intro }), note.el, actions(button)]);
        root.appendChild(front);
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
                }, function(k) { return keypanel(k, "Your account " + k.handle + " is ready"); });
            case "reset":
                if(!token) return false; // asking for the link, rather than following it
                return linkpage(token, "Reset my key", "Get a new key for your Red Eclipse account. The old one stops working, and you're signed out everywhere it was remembered.", function()
                {
                    return account.accounts("POST", "/reset/confirm", { token: token }).then(function(r) { if(r.status !== 200) throw failed(r, "The master server couldn't reset it."); return r.json; });
                }, function(k) { return keypanel(k, "Here's the new key for " + k.handle); });
            case "cancel":
                return linkpage(token, "Remove the registration", "Someone registered a Red Eclipse account with your email address. If it wasn't you, remove it.", function()
                {
                    return account.accounts("POST", "/cancel", { token: token }).then(function(r) { if(r.status !== 204) throw failed(r, "The master server couldn't remove it."); });
                }, function() { return result("Registration removed", "Your email address is free again, and nothing more will come from this.", ["Back to Red Eclipse", "/"]); });
            case "email":
                return linkpage(token, "Use this email address", "Use this email address for your Red Eclipse account from now on.", function()
                {
                    return account.accounts("POST", "/email/confirm", { token: token }).then(function(r) { if(r.status !== 200) throw failed(r, "The master server couldn't change it."); return r.json; });
                }, function(r) { return result("Email address changed", r.handle + "'s email address is now " + r.email + ".", ["Your account", PAGES.profile]); });
            case "email-cancel":
                return linkpage(token, "Stop the change", "Someone asked to move your Red Eclipse account to another email address. If it wasn't you, stop it.", function()
                {
                    return account.accounts("POST", "/email/cancel", { token: token }).then(function(r) { if(r.status !== 204) throw failed(r, "The master server couldn't stop it."); });
                }, function()
                {
                    var box = result("Change stopped", "Someone was signed in to your account to ask for it. Reset its key to sign them out everywhere.");
                    account.accounts("GET").then(function(r) { box.appendChild(resetform(r.json || {})); });
                    return box;
                });
            case "server":
                return linkpage(token, "Get the server's key", "Get the key your server signs in to the Red Eclipse master server with.", function()
                {
                    return account.accounts("POST", "/server", { token: token }).then(function(r) { if(r.status !== 200) throw failed(r, "The master server couldn't make it."); return r.json; });
                }, function(k) { return serverkeypanel(k); });
            case "steam": case "discord":
                return linkreturn();
        }
        return false;
    }

    // Steam or Discord sending the person back after proving who they are
    function linkreturn()
    {
        var q = new URLSearchParams(window.location.search), body, kind = ACTION;
        if(window.history.replaceState) window.history.replaceState(null, "", PAGES.profile);
        if(kind === "steam")
        {
            var openid = {};
            q.forEach(function(v, k) { if(k.indexOf("openid.") === 0) openid[k] = v; });
            ACTION = "profile";
            if(!openid["openid.return_to"]) { refresh(); return true; }
            body = { openid: openid };
        }
        else
        {
            ACTION = "profile";
            if(q.get("error") || !q.get("code")) { refresh(); say("Discord didn't link: " + (q.get("error") === "access_denied" ? "it was cancelled" : q.get("error") ? "Discord refused it" : "no code came back") + ".", true); return true; }
            body = { code: q.get("code"), state: q.get("state") };
        }
        root.textContent = "Linking…";
        account.me(true).then(function(me)
        {
            if(!me) { tologin(); return; }
            return account.call("POST", "/account/" + kind, body).then(function(r)
            {
                refresh();
                if(r.status !== 200) say(failed(r, "It didn't link.").message, true);
                else say(kind === "steam" ? "Your Steam account is linked." : "Your Discord account is linked.");
            });
        });
        return true;
    }

    // ---- the signed in owner's account

    function field(label, value) { return [el("dt", { text: label }), el("dd", {}, value)]; }
    function capital(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

    // the signed in owner's account, as panels: who they are, what's linked, and changing or deleting it
    function ownerpanels(mine, into)
    {
        var who = panel("Account"), linked = panel("Linked identities"), mail = panel("Change your email address"), gone = panel("Delete your account", { danger: true,
            intro: "This can't be undone: its key stops working everywhere, and its handle is free for anyone to register." });
        var display = el("input", { type: "text", id: "account-display", maxlength: 64, value: mine.displayname || "", placeholder: "From your in-game or Discord name" });
        var save = el("button", { type: "button", text: "Save", onclick: function()
        {
            save.disabled = true;
            account.call("PATCH", "/account", { displayname: display.value }).then(function(r)
            {
                save.disabled = false;
                if(r.status !== 200) throw failed(r, "It couldn't be changed.");
                display.value = r.json.displayname || "";
                who.say(r.json.displayname ? "You show as " + r.json.displayname + " (" + r.json.handle + ") on the website." : "Your display name is cleared, and it's filled in again from your in-game or Discord name.");
            }).catch(function(err) { save.disabled = false; who.say(err.message, true); });
        } });
        who.appendChild(el("dl", { class: "account-fields" }, [].concat(
            field("Handle", el("strong", { text: mine.handle })),
            field("Privilege", capital(PRIVNAMES[privof(mine.flags)] || "player")),
            field("Email", [mine.email || "none", mine.newemail ? el("div", { class: "account-help", text: "Changing to " + mine.newemail + " once it's confirmed" }) : null]),
            field("Display name", [el("div", { class: "account-inline" }, [display, save]),
                el("div", { class: "account-help", text: "Shown with your handle on the website, up to 32 characters. In game you go by your in-game name, and on Discord by your Discord name." })])
        )));

        function linkrow(kind, label, width, value)
        {
            var button = value ? el("button", { type: "button", class: "account-quiet", text: "Unlink", onclick: function()
            {
                account.call("DELETE", "/account/" + kind).then(function(r) { if(r.status !== 204) throw failed(r, "It couldn't be unlinked."); refresh(); }).catch(function(err) { linked.say(err.message, true); });
            } }) : el("button", { type: "button", text: "Link with " + label, onclick: function()
            {
                account.call("GET", "/account/" + kind).then(function(r)
                {
                    if(r.status !== 200 || !r.json.url) throw failed(r, "It can't be linked right now.");
                    window.location.href = r.json.url;
                }).catch(function(err) { linked.say(err.message, true); });
            } });
            return el("div", { class: "account-linkrow" }, [icon(kind, width), el("div", { class: "account-linkwhat" }, [el("strong", { text: label }),
                el("span", { class: "account-help" }, value || "Not linked")]), button]);
        }
        linked.appendChild(el("div", {}, [
            linkrow("steam", "Steam", 512, mine.steamid ? el("a", { href: "https://steamcommunity.com/profiles/" + mine.steamid, rel: "noopener", text: mine.steamid }) : null),
            linkrow("discord", "Discord", 576, mine.discord || null)
        ]));

        var newemail = el("input", { type: "email", id: "account-newemail", autocomplete: "email", maxlength: 254, required: true });
        mail.appendChild(el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/account/email", { email: newemail.value.trim() }).then(function(r)
            {
                if(r.status !== 202) throw failed(r, "It couldn't be changed.");
                mail.say("Check " + newemail.value.trim() + " for a link to confirm it. Until then your account keeps its old address, which is told about the change.");
                newemail.value = "";
            }).catch(function(err) { mail.say(err.message, true); });
        } }, [formfield("New address", newemail, "A link to confirm it goes there first."), actions(el("button", { type: "submit", text: "Change address" }))]));

        var confirm = el("input", { type: "text", id: "account-confirm", autocomplete: "off", spellcheck: "false", required: true });
        gone.appendChild(el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            if(confirm.value.trim() !== mine.handle) { gone.say("That isn't your handle.", true); return; }
            account.call("DELETE", "/account", { confirm: confirm.value.trim() }).then(function(r)
            {
                if(r.status !== 204) throw failed(r, "It couldn't be deleted.");
                account.end().then(function()
                {
                    page(null);
                    say("Your account is deleted. Its key no longer works, and its handle is free for anyone.");
                });
            }).catch(function(err) { gone.say(err.message, true); });
        } }, [formfield("Type your handle to confirm", confirm), actions(el("button", { type: "submit", class: "account-danger-button", text: "Delete my account" }))]));

        into.appendChild(who);
        into.appendChild(linked);
        return [mail, gone];
    }

    // ---- administration, for administrators, which mirrors what the master allows; the master decides

    // nobody changes or gives a standing at or above their own, except a founder
    function outranks(mine, other) { return mine >= FLAGPRIV.c || other < mine; }
    function givable(mine) { return Object.keys(FLAGPRIV).filter(function(c) { return outranks(mine, FLAGPRIV[c]); }); }
    function cangive(mine, flags, say)
    {
        if(outranks(mine, privof(flags))) return true;
        say("You can only give a privilege below your own: " + givable(mine).join(", ") + ".", true);
        return false;
    }

    // a table whose cells carry their column's name, so on a phone each row is a card of labelled values
    function admintable(head, rows)
    {
        rows.forEach(function(tr)
        {
            Array.from(tr.children).forEach(function(td, i)
            {
                if(head[i]) td.setAttribute("data-label", head[i]);
                if(i === tr.children.length - 1 && !head[i]) td.className = (td.className ? td.className + " " : "") + "account-end";
            });
        });
        return el("div", { class: "account-scroll" }, el("table", { class: "account-signins account-admintable" },
            [el("thead", {}, el("tr", {}, head.map(function(h) { return el("th", { text: h }); }))), el("tbody", {}, rows)]));
    }
    // an account's Privilege as the game's icons, one picked; those it can't be given are greyed, and picking one asks first
    var PRIVLETTERS = ["u", "s", "m", "a", "d", "c"];
    function aname(word) { return (/^[aeiou]/i.test(word) ? "an " : "a ") + word; }
    function privpicker(a, mine, why, act)
    {
        var now = privof(a.flags);
        return el("div", { class: "account-picker", role: "group", "aria-label": "Privilege" }, PRIVLETTERS.map(function(c, i)
        {
            var priv = i + 1, word = PRIVNAMES[priv], on = priv === now, cant = why || (!outranks(mine, priv) ? "Only below your own privilege" : null);
            var url = "url(/bits/images/servers/privilege/" + word + ".svg)";
            return el("button", { type: "button", class: "account-pick" + (on ? " account-pick-on" : ""), "aria-pressed": on ? "true" : "false", "aria-label": capital(word),
                title: capital(word) + (on ? ", now" : cant ? ": " + cant.charAt(0).toLowerCase() + cant.slice(1) : ""), disabled: !!(cant && (!on || why)), onclick: function()
                {
                    if(on) return;
                    if(window.confirm("Make " + a.handle + " " + aname(word) + "? This ends their sign-ins.")) act("PATCH", { flags: c }, a.handle + " is now " + aname(word) + ".");
                } }, el("span", { class: "account-privicon", style: "-webkit-mask-image:" + url + ";mask-image:" + url }));
        }));
    }
    // a server account's level, which sets its place among servers with as many players: one letter, the highest it has
    var SERVERLEVELS = [["b", "Basic"], ["u", "Featured"], ["m", "Official"]];
    function levelof(flags) { return /m/i.test(flags || "") ? "Official" : /u/i.test(flags || "") ? "Featured" : "Basic"; }
    // now: the letter picked; cant(letter): why it can't be, or nothing; pick(letter, done): done() lights it once it's taken
    function levelpicker(now, cant, pick)
    {
        var buttons = SERVERLEVELS.map(function(l)
        {
            var on = l[0] === now, why = cant(l[0]);
            return el("button", { type: "button", class: "account-pick account-pickword" + (on ? " account-pick-on" : ""), "aria-pressed": on ? "true" : "false", text: l[1],
                title: why || null, disabled: !!(why && !on), onclick: function()
                {
                    if(l[0] === now) return;
                    pick(l[0], function()
                    {
                        now = l[0];
                        buttons.forEach(function(b, j) { var lit = SERVERLEVELS[j][0] === now; b.className = "account-pick account-pickword" + (lit ? " account-pick-on" : ""); b.setAttribute("aria-pressed", lit ? "true" : "false"); });
                    });
                } });
        });
        return el("div", { class: "account-picker", role: "group", "aria-label": "Level" }, buttons);
    }
    function removebutton(label, onclick, why) { return el("button", { type: "button", class: "account-danger-button", text: label, disabled: !!why, title: why || null, onclick: onclick }); }

    function adminaccounts(me)
    {
        var mine = privof(me.flags), list = panel("Accounts", { full: true }), results = el("div");
        var q = el("input", { type: "search", id: "admin-q", placeholder: "Handle or email", spellcheck: "false", "aria-label": "Handle or email" });
        function search()
        {
            account.call("GET", "/admin/accounts?limit=100&q=" + encodeURIComponent(q.value.trim())).then(function(r)
            {
                if(r.status !== 200) throw failed(r, "The search failed.");
                clear(results).appendChild(el("p", { class: "account-help", text: r.json.total + " account" + (r.json.total === 1 ? "" : "s") + (r.json.total > r.json.accounts.length ? ", showing " + r.json.accounts.length : "") }));
                results.appendChild(admintable(["Handle", "Privilege", "Email", "Display name", "Steam", "Discord", ""], r.json.accounts.map(function(a)
                {
                    var self = a.handle === me.name, can = !self && outranks(mine, privof(a.flags));
                    var why = self ? "You can't change your own account here" : can ? null : "Their privilege is at or above yours";
                    function act(method, body, done)
                    {
                        return account.call(method, "/admin/accounts/" + encodeURIComponent(a.handle), body).then(function(r)
                        {
                            if(r.status !== 200 && r.status !== 204) throw failed(r, "That didn't work.");
                            list.say(done);
                            search();
                        }).catch(function(err) { list.say(err.message, true); });
                    }
                    return el("tr", {}, [
                        el("td", {}, el("strong", { text: a.handle })),
                        el("td", {}, privpicker(a, mine, why, act)),
                        el("td", { text: a.email }),
                        el("td", {}, [a.displayname || null, a.displayname ? el("button", { type: "button", class: "account-link account-clear", text: "Clear", disabled: !can, title: why, onclick: function() { act("PATCH", { displayname: "" }, a.handle + "'s display name is cleared."); } }) : null]),
                        el("td", { text: a.steamid }), el("td", { text: a.discord }),
                        el("td", {}, removebutton("Remove", function() { if(window.confirm("Remove the account " + a.handle + "?")) act("DELETE", null, a.handle + " is removed."); }, why))
                    ]);
                })));
                results.appendChild(el("p", { class: "account-help", text: "You can give up to " + aname(PRIVNAMES[Math.max.apply(null, PRIVLETTERS.map(function(c, i) { return outranks(mine, i + 1) ? i + 1 : 0; }))]) + ". Changing an account's privilege ends its sign-ins." }));
            }).catch(function(err) { list.say(err.message, true); });
        }
        list.querySelector(".account-panel-head").appendChild(el("form", { class: "account-inline account-search", role: "search", onsubmit: function(e) { e.preventDefault(); search(); } },
            [q, el("button", { type: "submit", text: "Search" })]));
        list.appendChild(results);
        var grid = el("div", { class: "account-panels" }, list);
        return grid;
    }

    function admincontrols()
    {
        var list = panel("Global lists", { full: true, intro: "Every linked server gets these, and a server's own excepts don't lift them: only an except here does. Global bans are a last resort: see the Multiplayer Guidelines. Bans from Master Shield, the master's own defence against hostile servers, have the Automatic source and lapse on their own." });
        var add = panel("Add to the global lists"), controls = el("div");
        function load()
        {
            account.call("GET", "/admin/controls").then(function(r)
            {
                if(r.status !== 200) throw failed(r, "The global lists couldn't be read.");
                clear(controls).appendChild(r.json.controls.length ? admintable(["Type", "Address", "Reason", "Source", "Added", ""], r.json.controls.map(function(c)
                {
                    var source = c.source ? capital(c.source) + (c.by ? " (" + c.by + ")" : "") : "";
                    return el("tr", {}, [el("td", { text: capital(c.type) }), el("td", {}, el("span", { class: "account-ip", text: c.address })), el("td", { text: c.reason }),
                        el("td", { text: source }), el("td", { text: c.added ? day(c.added) : "" }), el("td", {}, removebutton("Remove", function()
                    {
                        account.call("DELETE", "/admin/controls/" + c.id).then(function(r) { if(r.status !== 204) throw failed(r, "It couldn't be removed."); list.say(c.address + " is off the " + c.type + " list."); load(); }).catch(function(err) { list.say(err.message, true); });
                    }))]);
                })) : el("p", { class: "account-help", text: "The global lists are empty." }));
            }).catch(function(err) { list.say(err.message, true); });
        }
        list.appendChild(controls);
        var ctype = el("select", { id: "admin-ctype" }, CONTROLTYPES.map(function(t) { return el("option", { value: t, text: capital(t) }); }));
        var caddr = el("input", { type: "text", id: "admin-caddr", spellcheck: "false", required: true }), creason = el("input", { type: "text", id: "admin-creason" });
        add.appendChild(el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/admin/controls", { type: ctype.value, address: caddr.value.trim(), reason: creason.value.trim() }).then(function(r)
            {
                if(r.status !== 201) throw failed(r, "It couldn't be added.");
                add.say(caddr.value.trim() + " is on the " + ctype.value + " list.");
                caddr.value = creason.value = "";
                load();
            }).catch(function(err) { add.say(err.message, true); });
        } }, [formfield("Type", ctype), formfield("Address", caddr, "An address such as 1.2.3.4, or 1.2 for a range."), formfield("Reason", creason, "Why, with the date."),
            actions(el("button", { type: "submit", text: "Add" }))]));
        load();
        return el("div", { class: "account-panels" }, [list, add]);
    }

    function adminservers(me)
    {
        var mine = privof(me.flags), list = panel("Server accounts", { full: true, intro: "The accounts game servers sign in to the master with. Each has an owner, whose account gets the key." });
        var add = panel("Add a server account", { intro: "Its owner is mailed a link to get the key, which their server reads from secrets.cfg." }), servers = el("div");
        function levelcant(letter) { return outranks(mine, privof(letter)) ? null : "Only below your own privilege"; }
        function call(method, a, path, body, done)
        {
            return account.call(method, "/admin/servers/" + encodeURIComponent(a.handle) + (path || ""), body).then(function(r)
            {
                if(r.status < 200 || r.status > 204) throw failed(r, "That didn't work.");
                list.say(done);
                load();
            }).catch(function(err) { list.say(err.message, true); });
        }
        // inline editor for a cell's text field, turning it into a form with Save and Cancel when Change is clicked
        function inlinefield(cls, value, label, why, required, help, save)
        {
            var box = el("div", { class: cls });
            function show()
            {
                clear(box).appendChild(el("div", { class: "account-inline account-ownernow" }, [el("span", { text: value }),
                    why ? null : el("button", { type: "button", class: "account-link account-clear", text: "Change", onclick: edit })]));
                if(help) box.appendChild(el("div", { class: "account-help", text: help }));
            }
            function edit()
            {
                var input = el("input", { type: "text", value: value, spellcheck: "false", required: !!required, "aria-label": label });
                clear(box).appendChild(el("form", { class: "account-inline", onsubmit: function(e)
                {
                    e.preventDefault();
                    if(!save(input.value.trim())) show();
                } }, [input, el("button", { type: "submit", class: "account-quiet", text: "Save" }), el("button", { type: "button", class: "account-link", text: "Cancel", onclick: show })]));
                input.focus();
            }
            show();
            return box;
        }
        // the owner, with Change turning it into a field for another's handle
        function owner(a, why)
        {
            var help = a.ownergone ? "Account deleted" : !a.owner ? "No owner, from before owners" : null;
            return inlinefield("account-owner", a.owner || "", "The new owner's handle", why, true, help, function(to)
            {
                if(!to || (to === a.owner && !a.ownergone)) return false;
                var ask = a.pending ? "Send " + a.handle + "'s link to " + to + " instead? The one already sent stops working."
                    : "Make " + to + " the owner of " + a.handle + "?" + (a.newkey ? " The new key's link already sent stops working." : "");
                if(window.confirm(ask)) call("PATCH", a, "", { owner: to }, a.handle + " now belongs to " + to + "." + (a.pending ? " Its link went to them." : ""));
                return true;
            });
        }
        // the description, with Change turning it into an inline field
        function desc(a, why)
        {
            return inlinefield("account-desc", a.desc || "", "Description", why, false, null, function(to)
            {
                if(to === (a.desc || "")) return false;
                call("PATCH", a, "", { desc: to }, a.handle + "'s description was updated.");
                return true;
            });
        }
        function state(a)
        {
            if(a.pending) return el("span", { class: "account-tag account-tag-wait", text: "Waiting for its owner until " + day(a.expires) });
            if(a.newkey) return el("span", { class: "account-tag account-tag-wait", text: "New key sent, until " + day(a.newkey) });
            return null;
        }
        function load()
        {
            account.call("GET", "/admin/servers").then(function(r)
            {
                if(r.status !== 200) throw failed(r, "The server accounts couldn't be read.");
                clear(servers).appendChild(r.json.servers.length ? admintable(["Handle", "Level", "Owner", "Description", ""], r.json.servers.map(function(a)
                {
                    var why = outranks(mine, privof(a.flags)) ? null : "Its level is at or above your privilege";
                    var keywhy = why || (!a.owner ? "Give it an owner first" : a.ownergone ? "Give it a new owner first" : null);
                    var picker = levelpicker(a.flags, function(l) { return why || levelcant(l); }, function(l, done)
                    {
                        var word = levelof(l);
                        if(window.confirm("Make " + a.handle + " " + word + "?")) call("PATCH", a, "", { flags: l }, a.handle + " is now " + word + ".");
                    });
                    return el("tr", {}, [
                        el("td", {}, [el("strong", { text: a.handle }), state(a)]),
                        el("td", {}, picker),
                        el("td", {}, owner(a, why)),
                        el("td", {}, desc(a, why)),
                        el("td", {}, el("div", { class: "account-rowactions" }, [
                            el("button", { type: "button", class: "account-quiet", text: a.pending ? "Send again" : "Send a new key", disabled: !!keywhy, title: keywhy, onclick: function()
                            {
                                if(a.pending || window.confirm("Mail " + a.owner + " a link to a new key for " + a.handle + "? Its old key works until they follow it."))
                                    call("POST", a, "/key", null, "A new link went to " + a.owner + ".");
                            } }),
                            removebutton(a.pending ? "Withdraw" : "Remove", function()
                            {
                                if(window.confirm((a.pending ? "Withdraw " : "Remove ") + "the server account " + a.handle + "?")) call("DELETE", a, "", null, a.handle + (a.pending ? " is withdrawn." : " is removed."));
                            }, why)
                        ]))
                    ]);
                })) : el("p", { class: "account-help", text: "There are no server accounts." }));
            }).catch(function(err) { list.say(err.message, true); });
        }
        list.appendChild(servers);
        var shandle = el("input", { type: "text", id: "admin-shandle", spellcheck: "false", required: true, minlength: 3, maxlength: 24, pattern: "[A-Za-z0-9_-]{3,24}" });
        var sowner = el("input", { type: "text", id: "admin-sowner", spellcheck: "false", required: true });
        var sdesc = el("input", { type: "text", id: "admin-sdesc", spellcheck: "false" });
        var slevel = "b", spicker = levelpicker("b", levelcant, function(l, done) { slevel = l; done(); });
        add.appendChild(el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/admin/servers", { handle: shandle.value.trim(), flags: slevel, owner: sowner.value.trim(), desc: sdesc.value.trim() }).then(function(r)
            {
                if(r.status !== 202) throw failed(r, "It couldn't be added.");
                add.say("A link to get " + r.json.handle + "'s key went to " + r.json.owner + "'s email address. It lasts until " + day(r.json.expires) + ".");
                shandle.value = sowner.value = sdesc.value = "";
                load();
            }).catch(function(err) { add.say(err.message, true); });
        } }, [formfield("Handle", shandle, "The server's own name on the master: 3 to 24 letters, numbers, - or _."),
            el("div", { class: "account-field" }, [el("div", { class: "account-field-head" }, el("span", { class: "account-label", text: "Level" })), spicker,
                el("p", { class: "account-help", text: "Among servers with as many players, Official ones come first in the Server Browser, then Featured, then Basic." })]),
            formfield("Owner", sowner, "The handle of the player account that runs it."),
            formfield("Description", sdesc, "Optional note on what the server is, such as where it runs or who it's for."),
            actions(el("button", { type: "submit", text: "Send to the owner" }))]));
        load();
        return el("div", { class: "account-panels" }, [list, add]);
    }

    function adminmail()
    {
        var mail = panel("Mail", { full: true, intro: "Send a test email to check the master's mail works; its log says if it couldn't be delivered." });
        var mailto = el("input", { type: "email", id: "admin-mailto", required: true });
        mail.appendChild(el("form", { class: "account-stack", onsubmit: function(e)
        {
            e.preventDefault();
            account.call("POST", "/admin/mail", { to: mailto.value.trim() }).then(function(r)
            {
                if(r.status !== 202) throw failed(r, "It couldn't be sent.");
                mail.say("A test email is on its way to " + mailto.value.trim() + ".");
            }).catch(function(err) { mail.say(err.message, true); });
        } }, [formfield("Address", mailto), actions(el("button", { type: "submit", text: "Send a test email" }))]));
        return mail;
    }

    // the overview: what each page is for, and the mail test
    function adminoverview()
    {
        var about = { "admin-accounts": "Find player accounts, set their privilege, clear display names and remove accounts.",
            "admin-controls": "The bans, mutes, limits, allows, excepts and trusts every linked server gets.",
            "admin-servers": "The accounts game servers sign in with, which set their place in the Server Browser." };
        var cards = ADMINPAGES.slice(1).map(function(p)
        {
            var box = panel(p[1]);
            box.appendChild(el("p", { text: about[p[0]] }));
            box.appendChild(actions(el("a", { href: p[2], class: "account-button", text: "Open " + p[1].toLowerCase() })));
            return box;
        });
        return el("div", {}, [el("p", { class: "account-help account-lead", text: "The master server has no console, so its administrators manage it here." }),
            el("div", { class: "account-panels account-panels-three" }, cards), el("div", { class: "account-panels account-gap" }, adminmail())]);
    }

    // ---- the pages, each at its own address

    var PAGES = { login: "/account/login", register: "/account/register", reset: "/account/reset", profile: "/account/profile", admin: "/account/admin" };
    var ADMINPAGES = [["admin", "Overview", PAGES.admin], ["admin-accounts", "Accounts", PAGES.admin + "/accounts"], ["admin-controls", "Global lists", PAGES.admin + "/controls"],
        ["admin-servers", "Server accounts", PAGES.admin + "/servers"]];

    function go(path) { window.location.replace(path); }
    // where to go once signed in: only ever the server browser or one of these pages, so a link can't send anyone elsewhere
    function nextpath()
    {
        var n = new URLSearchParams(window.location.search).get("next") || "";
        return n === "/servers" || (/^\/account\/[a-z\/-]+$/.test(n) && n !== PAGES.login && n !== PAGES.register) ? n : PAGES.profile;
    }
    function tologin() { go(PAGES.login + "?next=" + encodeURIComponent(window.location.pathname)); }
    function isadmin(me) { return privof(me.flags) >= FLAGPRIV.a; }

    // links between pages, the one we're on (or, unless exact, under) marked
    function tabs(list, exact)
    {
        var here = window.location.pathname.replace(/\/+$/, "");
        return el("nav", { class: "account-tabs" }, list.map(function(t)
        {
            var on = here === t[1] || (!exact && here.indexOf(t[1] + "/") === 0);
            return el("a", { href: t[1], class: on ? "account-tab-on" : null, "aria-current": on ? "page" : null, text: t[0] });
        }));
    }

    // a fresh page: signed in, a bar with the links between the account pages and who's signed in; then the page's notice
    function page(me, sub)
    {
        clear(root);
        if(me)
        {
            var out = el("button", { type: "button", class: "account-link", text: "Sign out", onclick: function() { account.end().then(function() { go(PAGES.login); }); } });
            root.appendChild(el("div", { class: "account-bar" }, [
                el("div", { class: "account-barrow" }, [
                    tabs([["Your account", PAGES.profile]].concat(isadmin(me) ? [["Administration", PAGES.admin]] : [])),
                    el("div", { class: "account-whoami" }, ["Signed in as ", el("strong", { text: me.name }), " · ", out])
                ]),
                sub ? el("div", { class: "account-subbar" }, sub) : null
            ]));
        }
        root.appendChild(notice);
    }

    function loginpage(me)
    {
        if(me) { go(nextpath()); return; }
        page(null);
        root.appendChild(card([
            el("p", { class: "account-intro", text: "Sign in with your Red Eclipse account to chat on servers from the Server Browser, and to moderate them if your account can." }),
            signinform(function() { go(nextpath()); })
        ]));
        root.appendChild(cardlinks([["Register an account", PAGES.register], ["Lost your key?", PAGES.reset]]));
    }

    function registerpage(me)
    {
        if(me) { go(PAGES.profile); return; }
        page(null);
        var box = card(el("p", { class: "account-intro", text: "A Red Eclipse account proves who you are on every server, and signs you in here. A link to activate it goes to your email address." }));
        root.appendChild(box);
        root.appendChild(cardlinks([["Sign in", PAGES.login], ["Lost your key?", PAGES.reset]]));
        account.accounts("GET").then(function(r) { box.appendChild(registerform(r.status === 200 ? r.json : { register: false })); });
    }

    function resetpage(me)
    {
        page(me);
        var box = card(el("p", { class: "account-intro", text: "A link to get a new key goes to the account's email address. The old key stops working once you follow it." }));
        root.appendChild(box);
        if(!me) root.appendChild(cardlinks([["Sign in", PAGES.login], ["Register an account", PAGES.register]]));
        account.accounts("GET").then(function(r) { box.appendChild(resetform(r.status === 200 ? r.json : {})); });
    }

    function profilepage(me)
    {
        if(!me) { tologin(); return; }
        page(me);
        var grid = el("div", { class: "account-panels" });
        root.appendChild(grid);
        var signins = panel("Where you're signed in", { full: true, tools: el("button", { type: "button", class: "account-quiet", text: "Sign out everywhere", onclick: function()
        {
            account.end("all").then(function() { go(PAGES.login); });
        } }) });
        signins.appendChild(signinlist(me, signins.say));
        account.call("GET", "/account").then(function(r)
        {
            if(r.status !== 200) { say(failed(r, "Your account's details couldn't be read.").message, true); grid.appendChild(signins); return; }
            var rest = ownerpanels(r.json, grid);
            grid.appendChild(signins);
            rest.forEach(function(p) { grid.appendChild(p); });
        });
    }

    function adminpage(me)
    {
        if(!me) { tologin(); return; }
        if(!isadmin(me)) { page(me); say("Your account can't manage the master server.", true); return; }
        page(me, tabs(ADMINPAGES.map(function(p) { return [p[1], p[2]]; }), true));
        switch(ACTION)
        {
            case "admin-accounts": root.appendChild(adminaccounts(me)); break;
            case "admin-controls": root.appendChild(admincontrols()); break;
            case "admin-servers": root.appendChild(adminservers(me)); break;
            default: root.appendChild(adminoverview());
        }
    }

    function route(me)
    {
        switch(ACTION)
        {
            case "login": return loginpage(me);
            case "register": return registerpage(me);
            case "reset": return resetpage(me);
            case "profile": return profilepage(me);
            case "admin": case "admin-accounts": case "admin-controls": case "admin-servers": return adminpage(me);
        }
        go(me ? PAGES.profile : PAGES.login);
    }

    function refresh() { account.me(true).then(route); }
    root.textContent = "Loading…";
    if(!actionpage()) refresh();
})();
