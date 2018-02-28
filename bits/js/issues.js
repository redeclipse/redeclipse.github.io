var issue_num = 0;
var issues_data = [];
var issues_data_page = 1;
var issues_current = null;
var issues_comments = [];
var issues_comments_page = 1;
var issues_location = sitedata.locs.api + '/repos/' + sitedata.organisation + '/' + pagedata.issues.repository + '/issues?state=' + pagedata.issues.sort.state + '&sort=' + pagedata.issues.sort.by + '&direction=' + pagedata.issues.sort.direction + '&callback=issues';

// Helpers
Number.prototype.zeropad= function(len) {
    var s = String(this), c = '0';
    len = len || 2;
    while(s.length < len) s = c + s;
    return s;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

Element.prototype.makechild = function(elemname, idname, classname) {
    var child = document.createElement(elemname);
    child.id = idname;
    child.className = classname;
    this.appendChild(child);
    return child;
}

Array.prototype.extend = function (data) {
    data.forEach(function(v) {
        this.push(v)
    }, this);    
}

function makecookie(name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    document.cookie = name + '=' + escape(value) + '; expires=' + exdate.toUTCString() + '; path=/';
}

function getcookie(name) {
    var cname = name + '=';
    var decoded = decodeURIComponent(document.cookie);
    var ca = decoded.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return '';
}

function getelem(name) {
    return document.getElementById(name);
}

function mkelem(name) {
    return document.createElement(name);
}

// Showdown
var md_convert = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    noHeaderId: true,
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    tasklists: true,
    smoothLivePreview: true,
    simpleLineBreaks: true,
    ghMentions: true,
    openLinksInNewWindow: true,
    emoji: true
});
md_convert.setFlavor('github');

function markdown(data) {
    var str = md_convert.makeHtml(data);
    return str.replace(/<br>|<br\/>|<br \/>/gi, '</p><p>');
}

// OAuth
var user_data = null;
var user_login = null;
var user_cookie = '0';
var user_nologin = false;
OAuth.initialize('p7dOPzuUbL6qWAyxu73egl5DJYA');
OAuth.setOAuthdURL('https://hq.redeclipse.net:6284');

function user_oauth(setup, src) {
    user_nologin = true;
    OAuth.redirect('github', { cache: true }, sitedata.url + pagedata.permalink + "#");
}

function user_failed(err) {
    console.log('login error: ', err);
    makecookie('login', '0', 0);
    user_cookie = '0';
    issues_script(issues_location, 'issues-script', issues_data_page);
}

function user_callback(err, result) {
    user_nologin = true;
    if(err) {
        user_failed(err);
    } else {
        console.log('login result: ', result);
        user_data = result;
        user_data.get('/user')
        .done(function (response) {
            console.log('login user: ', response);
            user_login = response;
            var top = getelem('issues-login');
            if(top) {
                top.innerHTML = user_login.login + ' <img src="' + user_login.avatar_url + '" />';
                top.href = user_login.html_url;
                top.title = 'Logged in as: ' + user_login.name;
                top.onclick = '';
            }
            makecookie('login', '1', 7300);
            user_cookie = '1';
            issues_script(issues_location, 'issues-script', issues_data_page);
        })
        .fail(function (err) {
            user_failed(err);
        });
    }
}
OAuth.callback('github', { cache: true }, user_callback);

// Issues API
var issues_reactions = [ "+1", "-1", "laugh", "hooray", "confused", "heart" ];
var issues_reactmd = [ ":+1:", ":-1:", ":laughing:", ":raised_hands:", ":confused:", ":heart:" ];

function issues_setup()
{
    user_cookie = getcookie('login');
    var url = window.location.hash, idx = url.indexOf('#');
    if(idx >= 0) {
        var str = url.substring(idx + 1);
        if(str == 'oauthio=cache:github' || str == '&oauthio=cache:github') {
            user_nologin = true;
            issue_num = 0;
            window.location.hash = '';
        }
        else {
            var old = issue_num;
            issue_num = parseInt(str);
            if(issue_num != old) {
                issues_comments = [];
                issues_comments_page = 1;
            }
        }
    }
    else {
        issue_num = 0;
    }
}

function issues_date(data) {
    var d = new Date(data);
    return d.getFullYear() + '-' + d.getMonth().zeropad() + '-' + d.getDate().zeropad() + ' ' + d.getHours() + ':' + d.getMinutes().zeropad() + ':' + d.getSeconds().zeropad();
}

function issues_create(item, iter) {
    var row = mkelem('tr');
    row.id = 'issues-t-row';
    row.className = 'issues-' + (iter%2 ? 'bg1' : 'bg2');
    row.innerHTML += '<td id="issues-t-number" class="issues-center"><a id="issues-t-numurl" href="' + item.html_url + '#show_issue" target="_blank">#' + item.number + '</a></td>';
    var title = mkelem('td');
    title.id = 'issues-t-title';
    title.className = 'issues-left';
    title.innerHTML += '<a id="issues-t-url" class="issues-left" href="#' + item.number + '">' + item.title + '</a>';
    for(var j = 0; j < item.labels.length; j++) {
        var label = item.labels[j];
        title.innerHTML += ' <span id="issues-t-label" class="issues-label" style="border-color: #' + label.color + ';">' + label.name + '</span>';
    }
    row.appendChild(title);
    row.innerHTML += '<td id="issues-t-comments" class="issues-center">' + item.comments + '</td>';
    row.innerHTML += '<td id="issues-t-reactions" class="issues-center">' + item.reactions.total_count + '</td>';
    row.innerHTML += '<td id="issues-t-author" class="issues-center">' + item.user.login + '</td>';
    row.innerHTML += '<td id="issues-t-created" class="issues-time issues-center"><time class="timeago" datetime="' + item.created_at + '">' + issues_date(item.created_at) + '</time></td>';
    row.innerHTML += '<td id="issues-t-updated" class="issues-time issues-center"><time class="timeago" datetime="' + item.updated_at + '">' + issues_date(item.updated_at) + '</time></td>';
    return row;
}

function issues_view(item, hbody, hrow) {
    var head = hrow.makechild('th', 'issues-h-comments-info', 'issues-left'),
        span = head.makechild('span', 'issues-h-comments-span', 'issues-left'),
        avat = head.makechild('span', 'issues-h-comments-avatar', 'issues-right');
    span.innerHTML = ' <a href="' + item.html_url + '#show_issue" class="issues-left" target="_blank">#' + item.number + ': ' + item.title + '</a>';
    span.innerHTML += ' created <time class="timeago" datetime="' + item.created_at + '">' + issues_date(item.created_at) + '</time>';
    avat.innerHTML += '<a href="' + item.user.html_url + '" title="' + item.user.login + '" class="issues-left" target="_blank">' + item.user.login + ' <img src="' + item.user.avatar_url + '" class="issues-left" /></a>';
    var xrow = hbody.makechild('tr', 'issues-h-comments-xtra', ''),
        xtra = xrow.makechild('th', 'issues-h-comments-xtra-row', 'issues-left'),
        labels = xtra.makechild('span', 'issues-h-comments-xtra-labels', 'issues-left'),
        reactions = xtra.makechild('span', 'issues-h-comments-xtra-reactions', 'issues-right');
    for(var j = 0; j < item.labels.length; j++) {
        var label = item.labels[j];
        labels.innerHTML += ' <span id="issues-t-label" class="issues-top issues-label" style="border-color: #' + label.color + ';">' + label.name + '</span>';
    }
    if(item.reactions.total_count > 0) {
        for(var j = 0; j < issues_reactions.length; j++) {
            var react = issues_reactions[j], num = item.reactions[react];
            if(num > 0) {
                reactions.innerHTML += ' ' + markdown(issues_reactmd[j]) + ' ' + num;
            }
        }
    }
    var irow = hbody.makechild('tr', 'issues-t-comments-row', 'issues-left'),
        info = irow.makechild('td', 'issues-t-comments-info', 'issues-left'),
        cont = info.makechild('span', 'issues-t-comments-span', 'issues-left');
    cont.innerHTML = markdown(item.body);
    var vrow = hbody.makechild('tr', 'issues-t-load', 'issues-left'),
        load = vrow.makechild('td', 'issues-t-loading', 'issues-left');
    load.innerHTML = '<span class="fas fa-cog fa-spin"></span> Loading...';
    issues_script(item.comments_url + '?callback=issuecomments', 'issues-script-comment', issues_comments_page);
}

function issues_build() {
    var loading = getelem('issues-h-load');
    if(loading != null) loading.remove();
    if(issues_data == null || issues_data.length <= 0) return;
    var table = getelem('issues-table'),
        head = getelem('issues-header'),
        hbody = getelem('issues-body'),
        hrow = getelem('issues-h-row');
    if(table == null) {
        table = getelem('issues-view');
    }
    if(hrow == null) {
        hrow = mkelem('tr');
        hrow.id = 'issues-h-row';
        hrow.class = 'issues-left';
        head.appendChild(hrow);
    }
    if(issue_num > 0) {
        table.id = 'issues-view';
        hrow.innerHTML = '';
        hbody.innerHTML = '';
        for(var i = 0; i < issues_data.length; i++) {
            if(issues_data[i].number == issue_num) {
                issues_current = issues_data[i];
                issues_view(issues_data[i], hbody, hrow);
                break;
            }
        }
    }
    else {
        table.id = 'issues-table';
        hrow.innerHTML = '<th id="issues-h-number" class="issues-center">ID</th>';
        hrow.innerHTML += '<th id="issues-h-title" class="issues-left">Title</th>';
        hrow.innerHTML += '<th id="issues-h-comments" class="issues-center"><span class="far fa-comment fa-fw" aria-hidden="true"></span></th>';
        hrow.innerHTML += '<th id="issues-h-reactions" class="issues-center"><span class="far fa-meh fa-fw" aria-hidden="true"></span></th>';
        hrow.innerHTML += '<th id="issues-h-author" class="issues-center">Author</th>';
        hrow.innerHTML += '<th id="issues-h-created" class="issues-center">Created</th>';
        hrow.innerHTML += '<th id="issues-h-updated" class="issues-center">Updated</th>';
        hbody.innerHTML = "";
        for(var i = 0; i < issues_data.length; i++) {
            issues_current = issues_data[i];
            var row = issues_create(issues_data[i], i);
            hbody.appendChild(row);
        }
        if(issues_data_page > 0) {
            var more = getelem('issues-h-more');
            if(more) {
                var count = issues_data_page*pagedata.issues.perpage;
                if(issues_data.length >= count) {
                    more.style.display = 'table-row';
                }
                else {
                    more.style.display = 'none';
                }
            }
        }
        var view = getelem('issues-morebody');
        if(view) view.innerHTML = '';
    }
    jQuery("time.timeago").timeago();
}

function issues_view_comment(item, comment, hbody) {
    var hrow = hbody.makechild('tr', 'issues-h-comments-row', 'issues-left'),
        head = hrow.makechild('th', 'issues-h-comments-info', 'issues-left'),
        span = head.makechild('span', 'issues-h-comments-span', 'issues-left'),
        avat = head.makechild('span', 'issues-h-comments-avatar', 'issues-right');
    span.innerHTML = ' comment <a href="' + item.html_url + '" class="issues-left" target="_blank">#' + comment + '</a>';
    span.innerHTML += ' updated <time class="timeago" datetime="' + item.updated_at + '">' + issues_date(item.updated_at) + '</time>';
    if(item.reactions.total_count > 0) {
        for(var j = 0; j < issues_reactions.length; j++) {
            var react = issues_reactions[j], num = item.reactions[react];
            if(num > 0) {
                span.innerHTML += ' ' + markdown(issues_reactmd[j]) + ' ' + num;
            }
        }
    }
    avat.innerHTML += '<a href="' + item.user.html_url + '" title="' + item.user.login + '" class="issues-left" target="_blank">' + item.user.login + ' <img src="' + item.user.avatar_url + '" class="issues-left" /></a>';
    var irow = hbody.makechild('tr', 'issues-t-comments-row', 'issues-left'),
        info = irow.makechild('td', 'issues-t-comments-info', 'issues-left'),
        cont = info.makechild('span', 'issues-t-comments-span', 'issues-left');
    cont.innerHTML = markdown(item.body);
}

function issues_build_comments() {
    var loading = getelem('issues-t-load');
    if(loading != null) loading.remove();
    if(issue_num <= 0 || issues_current == null) return;
    if(issues_comments != null && issues_comments.length > 0) {
        var hbody = getelem('issues-body');
        for(var i = 0; i < issues_comments.length; i++) {
            issues_view_comment(issues_comments[i], i+1, hbody);
        }
        if(issues_comments_page > 0) {
            var more = getelem('issues-h-more');
            if(more) {
                var count = issues_comments_page*pagedata.issues.perpage;
                if(issues_comments.length >= count) {
                    more.style.display = 'table-row';
                }
                else {
                    more.style.display = 'none';
                }
            }
        }
    }
    var view = getelem('issues-morebody');
    if(view) {
        view.innerHTML = '';
        var hrow = view.makechild('tr', 'issues-t-reply-row', 'issues-left'),
            head = hrow.makechild('td', 'issues-t-reply-info', 'issues-center'),
            span = head.makechild('span', 'issues-t-reply-span', 'issues-left');
        span.innerHTML = '<a href="' + issues_current.html_url + '#show_issue" class="issues-left" target="_blank">View on GitHub</a>'
        span.innerHTML += ' | <a href="' + issues_current.html_url + '#partial-timeline-marker" class="issues-left" target="_blank">Reply on GitHub</a>';
    }
    jQuery("time.timeago").timeago();
}

function issues_script(src, idname, pagenum)
{
    var head = {}, uri = src + '&per_page=' + pagedata.issues.perpage + '&page=' + pagenum;
    if(user_login != null) {
        head = {
            "Authorization": "token "  + user_data.access_token
        }
    }
    console.log('script get: ', idname, uri, head);
    $.ajax({
        method: "GET",
        url: uri,
        headers: head,
        accepts: {
            "*": "application/vnd.github.squirrel-girl-preview+json; charset=utf-8"
        },
        success: function(data) {
            var script = getelem(idname);
            if(script != null) script.remove();
            script = mkelem('script');
            script.id = idname;
            script.innerHTML = data;
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        error: function() {
            console.log('script failure: ', idname, uri);
        }
    });
}

function issues_more() {
    if(issue_num > 0) {
        var count = issues_comments_page*pagedata.issues.perpage;
        if(issues_comments.length >= count) {
            for(var i = 0; i < issues_data.length; i++) {
                if(issues_data[i].number == issue_num) {
                    issues_comments_page++;
                    issues_script(issues_data[i].comments_url + '?callback=issuecomments', 'issues-script-comment', issues_comments_page);
                    break;
                }
            }
        }
    }
    else {
        var count = issues_data_page*pagedata.issues.perpage;
        if(issues_data.length >= count) {
            issues_data_page++;
            issues_script(issues_location, 'issues-script', issues_data_page);
        }
    }
}

function issues_remain(remain, rate) {
    if(remain != null && rate != null) {
        var more = getelem('issues-rate');
        if(more) {
            more.innerHTML = 'Rate limit: ' + remain + '/' + rate;
            more.title = user_login != null ? 'You have the full authenticated rate limit.' : 'Login with GitHub to increase your rate limit.';
        }
    }
}

function issuecomments(response) {
    console.log('issue comments meta: ', response.meta);
    console.log('issue comments data: ', response.data);
    issues_remain(response.meta['X-RateLimit-Remaining'], response.meta['X-RateLimit-Limit']);

    issues_comments.extend(response.data);
    issues_build_comments();
}

function issues(response) {
    console.log('issues meta: ', response.meta);
    console.log('issues data: ', response.data);
    issues_remain(response.meta['X-RateLimit-Remaining'], response.meta['X-RateLimit-Limit']);
    issues_data.extend(response.data);
    issues_build();
}

$(document).ready(function ($) {
    issues_setup();
    if(user_nologin == false) {
        console.log('cookie: ', user_cookie);
        if(user_cookie == '1') {
            user_oauth(true);
        }
        else {
            issues_script(issues_location, 'issues-script', issues_data_page);
        }
    }
});

$(window).on('hashchange', function() {
    issues_setup();
    issues_build();
});
