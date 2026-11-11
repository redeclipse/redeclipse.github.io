// Server browser and match monitor for /servers, built on the Red Eclipse Web API.
// See doc/web-api-guide.md in redeclipse/base for the routes and fields used here.
(function()
{
    "use strict";

    // How a server's mode, mutators and state numbers read depends on its game protocol (status.gameversion),
    // taken from src/game/gamemode.h in redeclipse/base, and Redflare for the versions before that history.
    // Each entry applies from its protocol on and inherits whatever it leaves out; "gsp" is merged by mode id.
    // The game specific mutators always take the bits straight after the named ones.
    var OLDSTATES = ["Waiting", "Voting", "Intermission", "Playing", "Overtime"];
    var STATES = ["Waiting", "Getting Map", "Sending Map", "Readying", "Syncing Info", "Playing", "Overtime", "Intermission", "Voting"];
    var LAYOUTS = (function()
    {
        var changes = [
            { from: 0, // 1.2
                modes: ["Demo", "Editing", "Campaign", "Deathmatch", "Capture the Flag", "Defend the Flag", "Bomber Ball", "Time Trial"],
                mutators: ["Multi", "Team", "Instagib", "Medieval", "Ballistic", "Duel", "Survivor", "Arena", "Onslaught", "Hover", "Jetpack", "Vampire", "Expert", "Resize"],
                gsp: {}, states: OLDSTATES, play: [3, 4] },
            { from: 217, // 1.3
                modes: ["Demo", "Editing", "Deathmatch", "Capture the Flag", "Defend the Flag", "Bomber Ball", "Time Trial"],
                mutators: ["Multi", "Team", "Coop", "Instagib", "Medieval", "Ballistic", "Duel", "Survivor", "Arena", "Onslaught", "Jetpack", "Vampire", "Expert", "Resize"] },
            { from: 220, // 1.4
                modes: ["Demo", "Editing", "Deathmatch", "Capture the Flag", "Defend the Flag", "Bomber Ball", "Time Trial", "Gauntlet"],
                mutators: ["Multi", "Free for All", "Coop", "Instagib", "Medieval", "Kaboom", "Duel", "Survivor", "Classic", "Onslaught", "Jetpack", "Vampire", "Expert", "Resize"] },
            { from: 226, // 1.5
                modes: ["Demo", "Editing", "Deathmatch", "Capture the Flag", "Defend and Control", "Bomber Ball", "Race"],
                mutators: ["Multi", "Free for All", "Coop", "Instagib", "Medieval", "Kaboom", "Duel", "Survivor", "Classic", "Onslaught", "Freestyle", "Vampire", "Resize", "Hard", "Basic"],
                gsp: { 3: ["Quick", "Defend", "Protect"], 4: ["Quick", "King"], 5: ["Hold", "Basket", "Attack"], 6: ["Timed", "Endurance", "Gauntlet"] } },
            { from: 227, states: STATES, play: [5, 6] },
            { from: 228, gsp: { 2: ["Gladiator", "Old School"] } }, // 1.6 is 230
            { from: 236, gsp: { 5: ["Hold", "Basket", "Assault"] } },
            { from: 242, mutators: ["Multi", "Free for All", "Coop", "Instagib", "Medieval", "Kaboom", "Duel", "Survivor", "Classic", "Onslaught", "Freestyle", "Vampire", "Resize", "Hard", "Arena"] },
            { from: 244, mutators: ["Multi", "Free for All", "Coop", "Instagib", "Medieval", "Kaboom", "Duel", "Survivor", "Classic", "Onslaught", "Vampire", "Resize", "Hard", "Arena"] },
            { from: 245, // 2.0
                mutators: ["Free for All", "Coop", "Instagib", "Medieval", "Kaboom", "Duel", "Survivor", "Classic", "Onslaught", "Vampire", "Resize", "Hard", "Arena"],
                gsp: { 6: ["Lapped", "Endurance", "Gauntlet"] } },
            { from: 270, mutators: ["Free for All", "Coop", "Instagib", "Medieval", "Kaboom", "Duel", "Survivor", "Classic", "Onslaught", "Vampire", "Resize", "Hard", "Arena", "Dark"] },
            { from: 278, modes: ["Demo", "Editing", "Deathmatch", "Capture the Flag", "Defend and Control", "Bomber Ball", "Speedrun"] }
        ];
        var out = [], cur = {};
        changes.forEach(function(c)
        {
            var next = {};
            for(var k in cur) next[k] = cur[k];
            for(k in c) if(k !== "gsp") next[k] = c[k];
            if(c.gsp)
            {
                next.gsp = {};
                for(k in cur.gsp) next.gsp[k] = cur.gsp[k];
                for(k in c.gsp) next.gsp[k] = c.gsp[k];
            }
            out.push(cur = next);
        });
        return out;
    })();
    var MASTERMODES = ["Open", "Veto", "Locked", "Private", "Password"];
    var TEAMCOLOURS = { alpha: "#7aa2ff", omega: "#ff6a6a", neutral: "#e8e8e8", enemy: "#ffd27a", environment: "#b0b0b0" };
    // Icons drawn by dc, in bits/images/servers by the game's names; whatever has none is shown as text.
    var ICONPATH = "/bits/images/servers/";
    var MODEICONS = { "Demo": "demo", "Editing": "editing", "Deathmatch": "deathmatch", "Capture the Flag": "capture", "Defend the Flag": "defend",
        "Defend and Control": "defend", "Bomber Ball": "bomber", "Time Trial": "speedrun", "Race": "speedrun", "Speedrun": "speedrun" };
    // Mode specific mutators are named for their mode, as "Quick" means something different in each.
    var MUTATORICONS = ["arena", "classic", "coop", "dark", "duel", "ffa", "hard", "instagib", "kaboom", "medieval", "onslaught", "resize", "survivor", "vampire",
        "deathmatch-gladiator", "deathmatch-oldschool", "capture-quick", "capture-defend", "capture-protect", "defend-quick", "defend-king",
        "bomber-hold", "bomber-basket", "bomber-assault", "speedrun-lapped", "speedrun-endurance", "speedrun-gauntlet"];
    var TEAMICONS = ["alpha", "omega", "neutral", "spectator"];
    // Privileges with icons, and those a server's operator can give locally, which have icons of their own.
    var PRIVILEGES = ["none", "player", "supporter", "moderator", "administrator", "developer", "creator"];
    var LOCALPRIVILEGES = ["supporter", "moderator", "administrator"];
    // A polled status has the words on the game's Privilege icons, where creator is founder and v1.6's operator sits just above moderator.
    var ICONPRIVILEGES = { founder: "creator", operator: "moderator" };
    // A polled status has each player's team colour. The game's default team colours changed often, even within a game version,
    // but no colour ever meant two teams, so one table names them all. Kappa and sigma were v1.6's extra teams with the Multi mutator.
    var POLLTEAMS = (function()
    {
        var teams = {
            neutral: [0x90A090, 0xA0A0A0, 0x909090, 0x707070, 0xAAAAAA, 0x606060, 0x808080],
            alpha: [0x5F66FF, 0x6060FF, 0x2020FF, 0x1040F8, 0x0000DD, 0x1010DD, 0x3030F0],
            omega: [0xFF4F44, 0xFF4040, 0xFF2020, 0xFF3210, 0xDD0000, 0xDD1010, 0xF03030],
            kappa: [0xFFD022, 0xFFFF40, 0xA0A020],
            sigma: [0x22FF22, 0x40FF40, 0x20A020]
        }, bycolour = {};
        Object.keys(teams).forEach(function(t) { teams[t].forEach(function(c) { bycolour[c] = t; }); });
        return bycolour;
    })();
    var MAPPATH = "/bits/images/maps/", MAPUNKNOWN = "/bits/images/servers/map-unknown.jpg";
    var POLLTIME = 5000, BACKOFFMIN = 1000, BACKOFFMAX = 30000, FEEDLINES = 100;
    var PREFKEY = "redeclipse.servers";

    var root = document.getElementById("servers");
    if(!root) return;
    var master = (root.getAttribute("data-master") || "https://play.redeclipse.net:28888").replace(/\/+$/, "");
    // The Current Release from data/game.yml, numbered as server versions are (209 is 2.0.9), or 0 if unreadable.
    var release = (function(v)
    {
        var m = /^(\d)\.(\d)\.(\d)$/.exec(v || "");
        return m ? m[1] * 100 + m[2] * 10 + m[3] * 1 : 0;
    })(root.getAttribute("data-release"));

    // ---- helpers

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
        if(kids) append(e, kids);
        return e;
    }
    function append(e, kids)
    {
        if(!Array.isArray(kids)) kids = [kids];
        kids.forEach(function(c)
        {
            if(c === undefined || c === null || c === false) return;
            e.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
        });
        return e;
    }
    function clear(e) { while(e.firstChild) e.removeChild(e.firstChild); return e; }
    function plain(s) { return String(s || "").replace(/\f(?:z..|\[[^\]]*\]|\([^)]*\)|\{[^}]*\}|.)/g, ""); }
    function now() { return Date.now() / 1000; }
    function key(host, port) { return host + "/" + port; }
    function skey(s) { return key(s.host, s.port); }
    function address(s) { return (s.host.indexOf(":") >= 0 ? "[" + s.host + "]" : s.host) + ":" + s.port; }

    // The layout for a status, or the newest when it doesn't say which protocol it speaks.
    function layout(st)
    {
        var v = st && st.gameversion;
        if(typeof v !== "number") return LAYOUTS[LAYOUTS.length - 1];
        for(var i = LAYOUTS.length - 1; i > 0; i--) if(v >= LAYOUTS[i].from) return LAYOUTS[i];
        return LAYOUTS[0];
    }
    function slug(name) { name = name.toLowerCase().replace(/[^a-z]/g, ""); return name === "freeforall" ? "ffa" : name; }
    // The mode, then its mutators, each with its icon where there is one.
    function modeparts(st)
    {
        var l = layout(st), name = l.modes[st.modeid] || ("Mode " + st.modeid), gsp = l.gsp[st.modeid] || [], mode = MODEICONS[name];
        var parts = [{ name: name, icon: mode ? "mode/" + mode : null }];
        for(var i = 0; i < 31; i++) if(st.mutators & (1 << i))
        {
            var specific = i >= l.mutators.length, m = specific ? gsp[i - l.mutators.length] : l.mutators[i];
            if(!m) continue;
            var file = (specific ? mode + "-" : "") + slug(m);
            parts.push({ name: m, icon: MUTATORICONS.indexOf(file) >= 0 ? "mutator/" + file : null });
        }
        return parts;
    }
    function modename(st)
    {
        var parts = modeparts(st), muts = parts.slice(1).map(function(p) { return p.name; });
        return muts.length ? parts[0].name + ": " + muts.join(", ") : parts[0].name;
    }
    // An icon with its name on hover; the name is its alt text too, unless the name is written beside it.
    function icon(path, name, named)
    {
        return el("img", { class: "servers-icon", src: ICONPATH + path + ".png", alt: named ? "" : name, title: name });
    }
    // A mode or mutator as its icon, named beside it or only on hover; one with no icon is always named.
    function partview(p, named)
    {
        if(!p.icon) return el("span", { class: "servers-modepart" }, named ? p.name : el("small", { text: p.name }));
        return el("span", { class: "servers-modepart" }, [icon(p.icon, p.name, named), named ? p.name : null]);
    }
    function mutatornames(st) { return modeparts(st).slice(1).map(function(p) { return p.name; }).join(", "); }
    // As in the game, a Privilege icon takes the player's colour, so the icons are masks over it. Bots have one of their own,
    // and a Privilege the page doesn't know shows as none, as the game clamps it.
    function privicon(privilege, local, bot, colour)
    {
        if(PRIVILEGES.indexOf(privilege) < 0) privilege = "none";
        local = local && LOCALPRIVILEGES.indexOf(privilege) >= 0;
        var name = bot ? "Bot" : privilege === "none" ? "No privilege" : privilege.charAt(0).toUpperCase() + privilege.slice(1) + (local ? ", given by this server" : "");
        var url = "url(" + ICONPATH + "privilege/" + (bot ? "bot" : (local ? "local" : "") + privilege) + ".svg)";
        return el("span", { class: "servers-priv", role: "img", "aria-label": name, title: name, style: "color:" + colour + ";-webkit-mask-image:" + url + ";mask-image:" + url });
    }
    // Team icons are masks too, so they take the colour of the team's name beside them.
    function teamicon(team, name)
    {
        var url = "url(" + ICONPATH + "team/" + team + ".png)";
        return el("span", { class: "servers-teamicon", "aria-hidden": "true", title: name, style: "-webkit-mask-image:" + url + ";mask-image:" + url });
    }
    // A Master Mode's icon, before the server's name, as a mask coloured as the game's server browser colours them.
    function access(st)
    {
        var name = MASTERMODES[st.mastermode];
        if(!name) return null;
        var slug = name.toLowerCase(), url = "url(" + ICONPATH + "mastermode/" + slug + ".svg)";
        return el("span", { class: "servers-accessicon " + slug, role: "img", "aria-label": name, title: name, style: "-webkit-mask-image:" + url + ";mask-image:" + url });
    }
    function statename(st) { return typeof st.state === "number" ? layout(st).states[st.state] || "?" : ""; }
    function version(v)
    {
        if(typeof v !== "number") return "?";
        return Math.floor(v / 100) + "." + (Math.floor(v / 10) % 10) + "." + (v % 10);
    }
    // A game server's version, coloured by how it compares with the Current Release: Current, Outdated, or a Development Build.
    function versionview(v)
    {
        if(typeof v !== "number" || !release) return version(v);
        var kind = v === release ? ["current", "Current", "The current release"]
            : v < release ? ["outdated", "Outdated", "Older than the current release, v" + version(release)]
            : ["development", "Development", "A development build, newer than the current release, v" + version(release)];
        return el("span", { class: "servers-version " + kind[0], title: kind[2] }, [version(v), el("span", { class: "sr-only", text: " (" + kind[1] + ")" })]);
    }
    function clock(secs)
    {
        secs = Math.max(0, Math.floor(secs));
        var m = Math.floor(secs / 60), s = secs % 60;
        return m + ":" + (s < 10 ? "0" : "") + s;
    }
    function remaining(ends) { return ends < 0 ? "No limit" : clock(ends - now()); }
    // Only a match in play (Playing or Overtime) has a meaningful time left; with no state to go on, trust the clock.
    function playing(st)
    {
        if(typeof st.state !== "number") return typeof st.ends === "number";
        return layout(st).play.indexOf(st.state) >= 0;
    }
    function teamname(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : ""; }

    // A team colour that's none of the defaults, as game mods rarely make it, names no team.
    function polledteam(st, p) { return typeof p.teamcolour === "number" ? POLLTEAMS[p.teamcolour] || null : null; }
    function polledname(st, p)
    {
        var team = polledteam(st, p), priv = typeof p.privilege === "string" ? ICONPRIVILEGES[p.privilege] || p.privilege : null;
        return el("span", { class: "servers-player", style: "color:" + (TEAMCOLOURS[team] || TEAMCOLOURS.neutral), title: team ? teamname(team) : null }, [
            priv ? privicon(priv, p.local, false, playercolour(p.colour || 0, team)) : null,
            plain(p.name)
        ]);
    }

    // Player colours are chosen in game against a dark background; lift very dark ones so they stay legible.
    function playercolour(colour, team)
    {
        if(!colour) return TEAMCOLOURS[team] || TEAMCOLOURS.neutral;
        var r = (colour >> 16) & 255, g = (colour >> 8) & 255, b = colour & 255;
        var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if(lum < 140)
        {
            var f = (140 - lum) / (255 - lum);
            r = Math.round(r + (255 - r) * f); g = Math.round(g + (255 - g) * f); b = Math.round(b + (255 - b) * f);
        }
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    function backoff(n) { return Math.min(BACKOFFMAX, BACKOFFMIN * Math.pow(2, n)); }

    // ---- preferences, remembered per browser where storage allows

    var prefs = { filter: "", hideempty: false, sort: "players", dir: -1 };
    try
    {
        var saved = JSON.parse(window.localStorage.getItem(PREFKEY) || "{}");
        for(var p in prefs) if(saved && typeof saved[p] === typeof prefs[p]) prefs[p] = saved[p];
    }
    catch(e) {}
    function saveprefs() { try { window.localStorage.setItem(PREFKEY, JSON.stringify(prefs)); } catch(e) {} }

    // ---- the list

    var servers = new Map(), loaded = false, stale = false, transport = "connecting";

    // Everyone connected, spectators included; -1 when the server reports no status.
    function playercount(s) { return s.status && s.status.players ? s.status.players.length : -1; }

    var COLUMNS = [
        { id: "description", title: "Server", value: function(s) { return plain(s.description).toLowerCase(); } },
        { id: "players", title: "Players", icon: "servers-playersicon", value: playercount },
        { id: "map", title: "Map", value: function(s) { return s.status ? s.status.map : ""; } },
        { id: "mode", title: "Mode", cls: "servers-wide", value: function(s) { return s.status ? modeparts(s.status)[0].name : ""; } },
        { id: "mutators", title: "Mutators", short: "Muts", cls: "servers-opt", value: function(s) { return s.status ? mutatornames(s.status) : ""; } },
        { id: "time", title: "Time", value: function(s) { return !s.status ? -2 : !playing(s.status) ? -1 : s.status.ends < 0 ? 1e12 : s.status.ends; } },
        { id: "version", title: "Version", short: "Ver", cls: "servers-opt", value: function(s) { return s.version || 0; } },
        { id: "address", title: "Address", cls: "servers-opt", value: function(s) { return skey(s); } }
    ];

    function sorted()
    {
        var col = COLUMNS.filter(function(c) { return c.id === prefs.sort; })[0] || COLUMNS[1];
        var list = Array.from(servers.values());
        list.sort(function(a, b)
        {
            var x = col.value(a), y = col.value(b);
            if(x < y) return -prefs.dir;
            if(x > y) return prefs.dir;
            if((a.priority || 0) !== (b.priority || 0)) return (b.priority || 0) - (a.priority || 0);
            return skey(a) < skey(b) ? -1 : 1;
        });
        return list;
    }

    function visible(s)
    {
        if(open && open.key === skey(s)) return true; // the server being watched never disappears under a filter
        if(prefs.hideempty && playercount(s) === 0) return false; // unknown counts stay, they may not be empty
        if(prefs.filter)
        {
            var f = prefs.filter.toLowerCase(), st = s.status || {};
            var hay = [plain(s.description), s.host, String(s.port), st.map || "", s.status ? modename(st) : "", s.handle || ""];
            (st.players || []).forEach(function(p) { hay.push(plain(p.name)); });
            if(hay.join("\n").toLowerCase().indexOf(f) < 0) return false;
        }
        return true;
    }

    function copyconnect(s, button)
    {
        var text = "/connect " + s.host + " " + s.port;
        var done = function(ok)
        {
            var was = button.textContent;
            button.textContent = ok ? "Copied" : text;
            setTimeout(function() { button.textContent = was; }, ok ? 1500 : 6000);
        };
        if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function() { done(true); }, function() { done(false); });
        else done(false);
    }

    // The address copies the command to join it when clicked.
    function addressbutton(s)
    {
        var b = el("button", { type: "button", class: "servers-copy", title: "Click to copy /connect " + s.host + " " + s.port });
        b.textContent = address(s);
        b.addEventListener("click", function(e) { e.stopPropagation(); copyconnect(s, b); });
        return b;
    }

    // ---- page skeleton

    var bar = el("div", { class: "servers-bar" });
    var filter = el("input", { type: "search", class: "servers-filter", placeholder: "Filter by server, map, mode or player", "aria-label": "Filter servers", value: prefs.filter });
    var hideempty = el("input", { type: "checkbox", id: "servers-hideempty" });
    hideempty.checked = prefs.hideempty;
    var indicator = el("span", { class: "servers-indicator", role: "status" });
    var summary = el("span", { class: "servers-summary" });
    append(bar, [filter, el("label", { for: "servers-hideempty", class: "servers-toggle" }, [hideempty, " Hide empty"]), summary, indicator]);

    var banner = el("div", { class: "servers-banner", role: "alert", hidden: true });
    var notice = el("div", { class: "servers-notice", role: "status", hidden: true });
    var thead = el("thead"), tbody = el("tbody");
    var table = el("table", { class: "servers-table" }, [thead, tbody]);
    append(clear(root), [bar, banner, notice, el("div", { class: "servers-scroll" }, table)]);

    filter.addEventListener("input", function() { prefs.filter = filter.value; saveprefs(); render(); });
    hideempty.addEventListener("change", function() { prefs.hideempty = hideempty.checked; saveprefs(); render(); });

    function shownotice(text)
    {
        if(!text) { notice.hidden = true; return; }
        clear(notice);
        append(notice, [text, " ", el("button", { type: "button", class: "servers-dismiss", "aria-label": "Dismiss", text: "×", onclick: function() { notice.hidden = true; } })]);
        notice.hidden = false;
    }

    function renderhead()
    {
        var tr = el("tr");
        COLUMNS.forEach(function(c)
        {
            var active = prefs.sort === c.id;
            var label = c.icon ? el("span", { class: c.icon, "aria-hidden": "true" }) : c.short || c.title;
            var arrow = active ? el("span", { class: "servers-sortdir", "aria-hidden": "true", text: prefs.dir < 0 ? "▾" : "▴" }) : null;
            var abbr = c.icon || c.short;
            var b = el("button", { type: "button", class: "servers-sort" + (active ? " active" : ""), title: abbr ? c.title : null, "aria-label": abbr ? c.title : null }, [label, arrow]);
            b.addEventListener("click", function()
            {
                if(prefs.sort === c.id) prefs.dir = -prefs.dir;
                else { prefs.sort = c.id; prefs.dir = c.id === "players" || c.id === "version" ? -1 : 1; }
                saveprefs();
                render();
            });
            tr.appendChild(el("th", { class: c.cls, "aria-sort": active ? (prefs.dir < 0 ? "descending" : "ascending") : null }, b));
        });
        clear(thead).appendChild(tr);
    }

    function row(s)
    {
        var st = s.status, k = skey(s), everyone = st && st.players;
        var tr = el("tr", { class: "servers-row" + (open && open.key === k ? " open" : ""), tabindex: "0", "aria-expanded": open && open.key === k ? "true" : "false" });
        var players = "–";
        // Everyone connected, spectators included and bots left out, with their names on hover.
        if(everyone)
            players = el("span", { title: everyone.length ? everyone.map(function(p) { return plain(p.name); }).join("\n") : "Nobody on" }, everyone.length + "/" + st.maxplayers);
        var time = "–";
        if(st) time = playing(st) ? el("span", { "data-ends": st.ends, text: remaining(st.ends) })
            : el("small", {}, [statename(st) || "?", st.stateends > now() ? " " : null, st.stateends > now() ? el("span", { "data-ends": st.stateends, text: remaining(st.stateends) }) : null]);
        append(tr, [
            el("td", { class: "servers-desc", title: (plain(s.description) || s.host) + (s.handle ? " (" + s.handle + ")" : "") }, [st ? access(st) : null, plain(s.description) || s.host, s.handle ? el("small", { text: " " + s.handle }) : null]),
            el("td", { class: "servers-num" }, players),
            el("td", {}, st ? st.map : "–"),
            el("td", { class: "servers-wide servers-mode", title: st ? modeparts(st)[0].name : null }, st ? partview(modeparts(st)[0], true) : "–"),
            el("td", { class: "servers-opt servers-mutators", title: st ? mutatornames(st) || null : null }, st ? modeparts(st).slice(1).map(function(p) { return partview(p, false); }) : null),
            el("td", { class: "servers-num" }, time),
            el("td", { class: "servers-opt", title: s.branch || null }, versionview(s.version)),
            el("td", { class: "servers-opt servers-addr" }, addressbutton(s))
        ]);
        var toggle = function() { if(open && open.key === k) closepanel(); else openpanel(k); };
        tr.addEventListener("click", function(e) { if(!e.target.closest("button, a")) toggle(); });
        tr.addEventListener("keydown", function(e) { if((e.key === "Enter" || e.key === " ") && e.target === tr) { e.preventDefault(); toggle(); } });
        return tr;
    }

    var renderqueued = false;
    function render()
    {
        renderqueued = false;
        renderhead();
        clear(tbody);
        var list = sorted(), shown = 0, people = 0;
        list.forEach(function(s)
        {
            people += Math.max(0, playercount(s));
            if(!visible(s)) return;
            shown++;
            tbody.appendChild(row(s));
            if(open && open.key === skey(s)) tbody.appendChild(open.row);
        });
        if(!loaded) tbody.appendChild(el("tr", {}, el("td", { colspan: COLUMNS.length, class: "servers-empty", text: "Loading servers…" })));
        else if(!shown) tbody.appendChild(el("tr", {}, el("td", { colspan: COLUMNS.length, class: "servers-empty", text: servers.size ? "No servers match the filter." : "No servers are registered right now." })));
        summary.textContent = loaded ? servers.size + " server" + (servers.size === 1 ? "" : "s") + ", " + people + " player" + (people === 1 ? "" : "s") : "";
        table.classList.toggle("stale", stale);
        if(open) open.update();
    }
    function queue() { if(!renderqueued) { renderqueued = true; requestAnimationFrame(render); } }

    function setstate(t, isstale)
    {
        transport = t;
        stale = !!isstale;
        indicator.className = "servers-indicator " + t;
        indicator.textContent = { live: "Live", polling: "Polling", connecting: "Connecting…", offline: "Offline" }[t];
        indicator.title = { live: "Updates arrive as they happen", polling: "Checking for updates every 5 seconds", connecting: "", offline: "The master server can't be reached" }[t];
        banner.hidden = t !== "offline";
        banner.textContent = "Can't reach the master server, retrying…" + (loaded ? " The list below may be out of date." : "");
        queue();
    }

    function setlist(list)
    {
        servers.clear();
        (list || []).forEach(function(s) { servers.set(skey(s), s); });
        loaded = true;
        listchanged();
    }
    function listchanged()
    {
        if(open && !servers.has(open.key))
        {
            closepanel();
            shownotice("This server has gone offline.");
        }
        if(wanted) { var w = wanted; wanted = null; if(servers.has(w)) openpanel(w); else shownotice("That server isn't on the list right now."); }
        queue();
    }

    // ---- staying up to date: the live list, with polling while it is down

    var live = null, livefails = 0, polltimer = null;

    function connectlive()
    {
        var url = master.replace(/^http/, "ws") + "/api/v1/servers/live";
        try { live = new WebSocket(url); }
        catch(e) { liveclosed(); return; }
        var ws = live, opened = false;
        ws.onmessage = function(e)
        {
            var m;
            try { m = JSON.parse(e.data); } catch(err) { return; }
            switch(m.event)
            {
                case "snapshot":
                    opened = true;
                    livefails = 0;
                    stoppolling();
                    setstate("live");
                    setlist(m.servers);
                    break;
                case "add": case "update":
                    if(m.server) { servers.set(skey(m.server), m.server); listchanged(); }
                    break;
                case "remove":
                    servers.delete(key(m.host, m.port));
                    listchanged();
                    break;
            }
        };
        ws.onclose = function() { if(ws === live) { live = null; liveclosed(opened); } };
    }
    function liveclosed(wasopen)
    {
        if(wasopen) livefails = 0;
        if(transport === "live") setstate("connecting", loaded);
        startpolling();
        setTimeout(connectlive, backoff(livefails++));
    }

    // Polling runs only while the live list is down; each start gets a new generation so a request
    // still in flight from an earlier run can't revive it.
    var pollgen = 0, polling = false;
    function poll(gen)
    {
        polltimer = null;
        // "no-cache" has the browser revalidate with the list's ETag itself; setting If-None-Match by hand
        // would need a CORS preflight the master doesn't allow that header in
        fetch(master + "/api/v1/servers", { cache: "no-cache" }).then(function(r)
        {
            if(!r.ok) throw new Error(r.status);
            return r.json();
        }).then(function(data)
        {
            if(gen !== pollgen) return;
            if(data) setlist(data.servers);
            setstate("polling");
        }).catch(function()
        {
            if(gen === pollgen) setstate("offline", loaded);
        }).then(function()
        {
            if(gen === pollgen && polling) polltimer = setTimeout(function() { poll(gen); }, POLLTIME);
        });
    }
    function startpolling() { if(polling) return; polling = true; poll(++pollgen); }
    function stoppolling() { polling = false; pollgen++; if(polltimer) { clearTimeout(polltimer); polltimer = null; } }

    // ---- the match monitor

    var open = null, wanted = null;

    var RELAYERRORS = {
        403: "This server doesn't allow its match to be relayed.",
        404: "This server isn't linked to the master server right now.",
        414: "The request was too long for the relay.",
        502: "The master server lost its link to this server.",
        503: "The relay for this server is busy.",
        504: "This server didn't answer in time."
    };
    var RETRYABLE = { 502: true, 503: true, 504: true };

    function Panel(k)
    {
        var self = this;
        this.key = k;
        this.closed = false;
        this.players = new Map();
        this.teams = [];
        this.feed = [];
        this.feedfails = 0;
        this.fetchfails = 0;
        this.ws = null;
        this.timers = [];

        this.map = null;
        this.mapimg = el("img", { class: "servers-mapimg", width: 128, height: 128, alt: "", hidden: true, onerror: function()
        {
            if(this.src.indexOf(MAPUNKNOWN) < 0) this.src = MAPUNKNOWN; // a new or custom map with no preview
        } });
        this.info = el("div", { class: "servers-matchinfo" });
        this.message = el("p", { class: "servers-message", hidden: true });
        this.board = el("div", { class: "servers-board" });
        this.feedstate = el("p", { class: "servers-feedstate" });
        this.feedlist = el("ol", { class: "servers-feed", "aria-live": "polite" });
        this.body = el("div", { class: "servers-panelbody" }, [
            el("div", { class: "servers-scoreboard" }, [el("h3", { text: "Scoreboard" }), this.board]),
            el("div", { class: "servers-feedbox" }, [el("h3", { text: "Match feed" }), this.feedstate, this.feedlist])
        ]);
        var closebtn = el("button", { type: "button", class: "servers-close", "aria-label": "Close", text: "×", onclick: function() { closepanel(); } });
        // The map preview has a column of its own, with the match beside it.
        this.header = el("div", { class: "servers-match" }, [this.mapimg, this.info, this.message, this.body]);
        this.cell = el("td", { colspan: COLUMNS.length }, [closebtn, this.header]);
        this.row = el("tr", { class: "servers-panel" }, this.cell);

        var s = servers.get(k);
        if(s && s.relay >= 1)
        {
            this.base = master + "/relay/" + encodeURIComponent(s.host) + "/" + s.port + "/api/v1";
            this.refresh(); // the scoreboard shouldn't wait on the feed, which may be slow or blocked
            this.connect();
        }
        else
        {
            this.body.hidden = true;
            this.say(s && s.status && s.status.polled
                ? "This server isn't linked to the master server, which asks it how it's doing every 30 seconds instead, so there's no live match to show."
                : "This server isn't linked to the master server, so there's no live match to show.");
        }
        this.update();
    }

    Panel.prototype.later = function(fn, ms) { var self = this; this.timers.push(setTimeout(function() { if(!self.closed) fn(); }, ms)); };

    Panel.prototype.say = function(text) { this.message.textContent = text || ""; this.message.hidden = !text; };

    Panel.prototype.get = function(path)
    {
        return fetch(this.base + path, { cache: "no-store" }).then(function(r)
        {
            if(!r.ok) { var e = new Error(r.status); e.status = r.status; throw e; }
            return r.json();
        });
    };

    // The feed sends no snapshot, so fetch the match whenever the feed (re)opens or a new match starts.
    Panel.prototype.refresh = function()
    {
        var self = this;
        return Promise.all([this.get("/players"), this.get("/teams")]).then(function(res)
        {
            if(self.closed) return;
            self.fetchfails = 0;
            self.players.clear();
            (res[0] || []).forEach(function(p) { self.players.set(p.cn, p); });
            self.teams = res[1] || [];
            self.say("");
            self.drawboard();
        }).catch(function(e)
        {
            if(self.closed) return;
            self.say(RELAYERRORS[e.status] || "Couldn't fetch this server's match.");
            if(!e.status || RETRYABLE[e.status]) self.later(function() { self.refresh(); }, e.status === 503 ? 1000 : backoff(self.fetchfails++));
        });
    };

    Panel.prototype.connect = function()
    {
        var self = this, opened = false;
        if(!this.feedfails) this.feedstate.textContent = "Connecting to the match feed…";
        var ws;
        try { ws = new WebSocket(this.base.replace(/^http/, "ws") + "/events"); }
        catch(e) { this.feedclosed(false); return; }
        this.ws = ws;
        ws.onopen = function()
        {
            var first = !self.feedopened;
            opened = self.feedopened = true;
            self.feedfails = 0;
            self.feedstate.textContent = "";
            if(!first) self.refresh(); // catch up on what was missed while the feed was down
        };
        ws.onmessage = function(e)
        {
            var m;
            try { m = JSON.parse(e.data); } catch(err) { return; }
            self.event(m);
        };
        ws.onclose = function() { if(self.ws === ws) { self.ws = null; self.feedclosed(opened); } };
    };

    Panel.prototype.feedclosed = function(wasopen)
    {
        if(this.closed) return;
        if(wasopen) this.feedfails = 0;
        var self = this, wait = backoff(this.feedfails++);
        this.feedstate.textContent = this.feedopened ? "Lost the match feed, reconnecting…" : "Can't connect to the match feed, retrying…";
        this.later(function() { self.connect(); }, wait);
    };

    Panel.prototype.line = function(kids, cls)
    {
        var t = new Date();
        var stamp = [t.getHours(), t.getMinutes(), t.getSeconds()].map(function(n) { return (n < 10 ? "0" : "") + n; }).join(":");
        var li = el("li", { class: cls }, [el("time", { text: stamp }), " "].concat(kids));
        this.feedlist.insertBefore(li, this.feedlist.firstChild);
        while(this.feedlist.childNodes.length > FEEDLINES) this.feedlist.removeChild(this.feedlist.lastChild);
    };

    // A name is in its team's colour, after its Privilege (or the bot icon) in the player's own colour,
    // preferring the list's Privilege, which says whether it's local.
    Panel.prototype.name = function(c)
    {
        if(!c) return el("span", { text: "someone" });
        var who = c.bot ? null : this.listplayer(c.cn) || c, colour = this.colour(c.cn, c.team);
        return el("span", { class: "servers-player", style: "color:" + (TEAMCOLOURS[c.team] || TEAMCOLOURS.neutral) }, [
            c.bot ? privicon(null, false, true, colour) : typeof who.privilege === "string" ? privicon(who.privilege, who.local, false, colour) : null,
            c.name
        ]);
    };

    // The list carries each human player's chosen colour and spectator flag, kept current by the live list.
    Panel.prototype.listplayer = function(cn)
    {
        var s = servers.get(this.key);
        var ps = s && s.status && s.status.players || [];
        for(var i = 0; i < ps.length; i++) if(ps[i].cn === cn) return ps[i];
        return null;
    };
    Panel.prototype.colour = function(cn, team)
    {
        var lp = this.listplayer(cn);
        return playercolour(lp ? lp.colour : 0, team);
    };

    Panel.prototype.event = function(m)
    {
        var self = this, p;
        switch(m.event)
        {
            case "join":
                if(m.client) this.players.set(m.client.cn, Object.assign({ points: 0, frags: 0, deaths: 0 }, m.client));
                this.line([this.name(m.client), " joined"], "join");
                break;
            case "leave":
                if(m.client) this.players.delete(m.client.cn);
                this.line([this.name(m.client), " left" + (m.reason ? " (" + m.reason + ")" : "")], "leave");
                break;
            case "team":
                if(m.client && (p = this.players.get(m.client.cn))) p.team = m.client.team;
                if(m.client) this.line([this.name(m.client), " joined team " + teamname(m.client.team)], "team");
                break;
            case "frag":
                this.line([this.name(m.killer), " fragged ", this.name(m.victim), m.weapon ? " with the " + m.weapon : ""], "frag");
                break;
            case "suicide":
                this.line([this.name(m.victim), " died" + (m.weapon ? " by their own " + m.weapon : "")], "frag");
                break;
            case "map":
                var cur = servers.get(this.key), gv = cur && cur.status ? cur.status.gameversion : undefined;
                this.line(["New match: " + m.map + ", " + modename({ modeid: m.modeid, mutators: m.mutators, gameversion: gv })], "map");
                this.later(function() { self.refresh(); }, 2500); // past the relay's 2 second cache
                break;
            case "score":
                if(m.teams) this.teams = m.teams;
                (m.players || []).forEach(function(s)
                {
                    var q = self.players.get(s.cn);
                    if(q) { q.points = s.points; q.frags = s.frags; q.deaths = s.deaths; }
                });
                break;
            case "chat": case "action": case "control": case "auth": case "challenge":
                break; // chat is deliberately not shown on the website
            default:
                if(typeof m.text === "string" && m.text) this.line([m.text], "broadcast");
                return;
        }
        this.drawboard();
    };

    Panel.prototype.spectating = function(p)
    {
        var lp = this.listplayer(p.cn);
        return lp ? !!lp.spectator : p.state === "Spectator";
    };

    Panel.prototype.drawboard = function()
    {
        var self = this, groups = new Map(), specs = [];
        this.players.forEach(function(p)
        {
            if(self.spectating(p)) { specs.push(p); return; }
            var t = p.team || "neutral";
            if(!groups.has(t)) groups.set(t, []);
            groups.get(t).push(p);
        });
        var scores = {};
        this.teams.forEach(function(t) { scores[t.team] = t.score; });
        var order = Array.from(groups.keys()).sort(function(a, b) { return (scores[b] || 0) - (scores[a] || 0) || (a < b ? -1 : 1); });
        clear(this.board);
        if(!order.length && !specs.length) { this.board.appendChild(el("p", { class: "servers-empty", text: "Nobody is playing." })); return; }
        var byscore = function(a, b) { return (b.points || 0) - (a.points || 0) || (b.frags || 0) - (a.frags || 0) || a.cn - b.cn; };
        order.forEach(function(t)
        {
            var title = t === "neutral" ? "Players" : teamname(t);
            var tb = el("tbody");
            groups.get(t).sort(byscore).forEach(function(p)
            {
                append(tb, el("tr", {}, [
                    el("td", {}, [self.name(p), p.handle && p.handle !== p.name ? el("small", { text: " " + p.handle }) : null]),
                    el("td", { class: "servers-num", text: p.points || 0 }),
                    el("td", { class: "servers-num", text: p.frags || 0 }),
                    el("td", { class: "servers-num", text: p.deaths || 0 })
                ]));
            });
            self.board.appendChild(el("table", { class: "servers-team" }, [
                el("thead", {}, el("tr", {}, [
                    el("th", { style: "color:" + (TEAMCOLOURS[t] || TEAMCOLOURS.neutral) }, [TEAMICONS.indexOf(t) >= 0 ? teamicon(t, title) : null, title, t in scores ? el("span", { class: "servers-teamscore", title: "Team score", style: "border-color:" + (TEAMCOLOURS[t] || TEAMCOLOURS.neutral), text: scores[t] }) : null]),
                    el("th", { class: "servers-num", text: "Points" }),
                    el("th", { class: "servers-num", text: "Frags" }),
                    el("th", { class: "servers-num", text: "Deaths" })
                ])),
                tb
            ]));
        });
        if(specs.length)
        {
            var sp = el("p", { class: "servers-specs" }, el("strong", {}, [teamicon("spectator", "Spectating"), "Spectating: "]));
            specs.forEach(function(p, i) { if(i) sp.appendChild(document.createTextNode(", ")); sp.appendChild(self.name(p)); });
            this.board.appendChild(sp);
        }
    };

    // The match header comes from the list entry, which the live list keeps current.
    Panel.prototype.update = function()
    {
        var s = servers.get(this.key);
        if(!s) return;
        var st = s.status, facts = [];
        // Only what the row doesn't show; facts from columns that small screens hide are shown only there.
        var fact = function(label, value, cls) { facts.push(el("div", { class: cls }, [el("dt", { text: label }), el("dd", {}, value)])); };
        if(st)
        {
            var parts = modeparts(st);
            fact("Mode", partview(parts[0], true), "servers-widefact");
            if(parts.length > 1) fact("Mutators", parts.slice(1).map(function(p) { return partview(p, true); }));
            if(playing(st) && statename(st)) fact("State", statename(st)); // the Time column shows it otherwise
        }
        fact("Version", versionview(s.version), "servers-optfact");
        if(s.branch) fact("Branch", s.branch);
        fact("Address", addressbutton(s), "servers-optfact");
        if((st && st.map || null) !== this.map)
        {
            this.map = st && st.map || null;
            this.mapimg.hidden = !this.map;
            if(this.map)
            {
                this.mapimg.src = MAPPATH + encodeURIComponent(this.map.replace(/^.*\//, "")) + ".jpg";
                this.mapimg.alt = this.mapimg.title = "Preview of " + this.map;
            }
        }
        clear(this.info);
        append(this.info, el("dl", {}, facts));
        // A polled server only gives names, spectators among them, so list who's on in place of a scoreboard,
        // best score first, each after their Privilege in their colour and in their team's colour as in the game's server browser.
        if(st && st.polled && !this.base && st.players && st.players.length)
        {
            var on = el("p", { class: "servers-specs" }, "On the server: ");
            st.players.forEach(function(p, i) { if(i) on.appendChild(document.createTextNode(", ")); on.appendChild(polledname(st, p)); });
            append(this.info, on);
        }
        if(this.players.size) this.drawboard(); // spectator flags and colours may have changed
    };

    Panel.prototype.close = function()
    {
        this.closed = true;
        this.timers.forEach(clearTimeout);
        if(this.ws) { var ws = this.ws; this.ws = null; try { ws.close(); } catch(e) {} }
    };

    function openpanel(k)
    {
        if(open) open.close();
        shownotice(null);
        open = new Panel(k);
        var hash = "#" + k;
        if(location.hash !== hash) history.replaceState(null, "", hash);
        render();
        open.row.scrollIntoView({ block: "nearest" });
    }
    function closepanel()
    {
        if(!open) return;
        open.close();
        open = null;
        if(location.hash) history.replaceState(null, "", location.pathname + location.search);
        queue();
    }

    function fromhash()
    {
        var h = decodeURIComponent(location.hash.replace(/^#/, ""));
        var at = h.lastIndexOf("/");
        if(at <= 0) { if(open) closepanel(); return; }
        var k = key(h.slice(0, at), h.slice(at + 1));
        if(open && open.key === k) return;
        if(!loaded) { wanted = k; return; }
        if(servers.has(k)) openpanel(k);
        else shownotice("That server isn't on the list right now.");
    }
    window.addEventListener("hashchange", fromhash);

    // ---- countdowns

    setInterval(function()
    {
        var spans = root.querySelectorAll("[data-ends]");
        for(var i = 0; i < spans.length; i++) spans[i].textContent = remaining(Number(spans[i].getAttribute("data-ends")));
    }, 1000);

    setstate("connecting");
    fromhash();
    connectlive();
    render();
})();
