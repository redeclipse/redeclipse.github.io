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

function getcookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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
    console.log(str);
    return str.replace(/<br>|<br\/>|<br \/>/gi, '</p><p>');
}

// OAuth
var user_data = null;
var user_login = null;
var user_cookie = '0';
var user_nologin = false;
OAuth.initialize('TnbOMXVV86ugQ7ol49rg5giIz8E');

function user_oauth(setup, src) {
    makecookie('login', '2', 1);
    user_cookie = '2';
    user_nologin = true;
    OAuth.redirect('github', { cache: true }, pagedata.site + pagedata.permalink + "#");
}

function user_callback(err, result) {
    user_nologin = true;
    if(err) {
        console.log('login error: ', result);
    } else {
        console.log('login result: ', result);
        makecookie('login', '1', 7300);
        user_cookie = '1';
        user_data = result;
        user_data.get('/user')
        .done(function (response) {
            console.log('login user: ', response);
            user_login = response;
            var top = document.getElementById('issues-login');
            if(top) {
                top.innerHTML = '@' + user_login.login;
                top.href = user_login.html_url;
                top.title = 'Logged in as: ' + user_login.name;
                top.onclick = '';
            }
            makecookie('login', '1', 7300);
            issues_script(pagedata.script, 'issues-script', issues_data_page);
        })
        .fail(function (err) {
            console.log('login error: ', err);
        });
    }
}
OAuth.callback('github', { cache: true }, user_callback);

// Issues API
var issue_num = 0;
var issues_data = [];
var issues_data_page = 1;
var issues_current = null;
var issues_comments = [];
var issues_comments_page = 1;

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
    var row = document.createElement('tr');
    row.id = 'issues-t-row';
    row.className = 'issues-' + (iter%2 ? 'bg1' : 'bg2');
    row.innerHTML += '<td id="issues-t-number" class="issues-center"><a href="' + item.html_url + '#show_issue" target="_blank">#' + item.number + '</a></td>';
    var title = document.createElement('td');
    title.id = 'issues-t-title';
    title.className = 'issues-left';
    title.innerHTML += '<a id="issues-t-url" href="#' + item.number + '">' + item.title + '</a>';
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
        span = head.makechild('span', 'issues-h-comments-span', 'issues-left issues-middle'),
        avat = head.makechild('span', 'issues-h-comments-avatar', 'issues-right issues-middle');
    span.innerHTML = ' <a href="' + item.html_url + '#show_issue" target="_blank">#' + item.number + ': ' + item.title + '</a>';
    span.innerHTML += ' created <time class="timeago" datetime="' + item.created_at + '">' + issues_date(item.created_at) + '</time>';
    if(item.reactions.total_count > 0) {
        for(var j = 0; j < issues_reactions.length; j++) {
            var react = issues_reactions[j], num = item.reactions[react];
            if(num > 0) {
                span.innerHTML += ' ' + markdown(issues_reactmd[j]) + ' ' + num;
            }
        }
    }
    avat.innerHTML += '<a href="' + item.user.html_url + '" target="_blank">' + item.user.login + ' <img src="' + item.user.avatar_url + '" alt="' + item.user.login + '" /></a>';
    var irow = hbody.makechild('tr', 'issues-t-comments-row', ''),
        info = irow.makechild('td', 'issues-t-comments-info', 'issues-left'),
        cont = info.makechild('span', 'issues-t-comments-span', 'issues-left');
    cont.innerHTML = markdown(item.body);
    var vrow = hbody.makechild('tr', 'issues-t-load', ''),
        load = vrow.makechild('td', 'issues-t-loading', 'issues-left');
    load.innerHTML = '<span class="fas fa-cog fa-spin"></span> Loading...';
    issues_script(item.comments_url + '?callback=issuecomments', 'issues-script-comment', issues_comments_page);
}

function issues_view_comment(item, comment, hbody) {
    var hrow = hbody.makechild('tr', 'issues-h-comments-row', ''),
        head = hrow.makechild('th', 'issues-h-comments-info', 'issues-left'),
        span = head.makechild('span', 'issues-h-comments-span', 'issues-left issues-middle'),
        avat = head.makechild('span', 'issues-h-comments-avatar', 'issues-right issues-middle');
    span.innerHTML = ' <a href="' + item.html_url + '" target="_blank">comment #' + comment + '</a>';
    span.innerHTML += ' updated <time class="timeago" datetime="' + item.updated_at + '">' + issues_date(item.updated_at) + '</time>';
    if(item.reactions.total_count > 0) {
        for(var j = 0; j < issues_reactions.length; j++) {
            var react = issues_reactions[j], num = item.reactions[react];
            if(num > 0) {
                span.innerHTML += ' ' + markdown(issues_reactmd[j]) + ' ' + num;
            }
        }
    }
    avat.innerHTML += '<a href="' + item.user.html_url + '" target="_blank">' + item.user.login + ' <img src="' + item.user.avatar_url + '" alt="' + item.user.login + '" /></a>';
    var irow = hbody.makechild('tr', 'issues-t-comments-row', ''),
        info = irow.makechild('td', 'issues-t-comments-info', 'issues-left'),
        cont = info.makechild('span', 'issues-t-comments-span', 'issues-left');
    cont.innerHTML = markdown(item.body);
}

function issues_build_comments() {
    var loading = document.getElementById('issues-t-load');
    if(loading != null) loading.remove();
    if(issue_num <= 0 || issues_current == null || issues_comments == null || issues_comments.length <= 0) return;
    var hbody = document.getElementById('issues-body');
    for(var i = 0; i < issues_comments.length; i++) {
        issues_view_comment(issues_comments[i], i+1, hbody);
    }
    if(issues_comments_page > 0) {
        var more = document.getElementById('issues-h-more');
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
    var view = document.getElementById('issues-morebody');
    if(view) {
        view.innerHTML = '';
        var hrow = view.makechild('tr', 'issues-t-reply-row', ''),
            head = hrow.makechild('td', 'issues-t-reply-info', 'issues-center'),
            span = head.makechild('span', 'issues-t-reply-span', 'issues-middle');
        span.innerHTML = '<a href="' + issues_current.html_url + '#show_issue" target="_blank">View on GitHub</a>'
        span.innerHTML += ' | <a href="' + issues_current.html_url + '#partial-timeline-marker" target="_blank">Reply on GitHub</a>';
    }
    jQuery("time.timeago").timeago();
}

function issues_build() {
    var loading = document.getElementById('issues-h-load');
    if(loading != null) loading.remove();
    if(issues_data == null || issues_data.length <= 0) return;
    var table = document.getElementById('issues-table'),
        head = document.getElementById('issues-header'),
        hbody = document.getElementById('issues-body'),
        hrow = document.getElementById('issues-h-row');
    if(table == null) {
        table = document.getElementById('issues-view');
    }
    if(hrow == null) {
        hrow = document.createElement('tr');
        hrow.id = 'issues-h-row';
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
            var more = document.getElementById('issues-h-more');
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
        var view = document.getElementById('issues-morebody');
        if(view) view.innerHTML = '';
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
            var script = document.getElementById(idname);
            if(script != null) script.remove();
            script = document.createElement('script');
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
            issues_script(pagedata.script, 'issues-script', issues_data_page);
        }
    }
}

function issues_remain(remain, rate) {
    if(remain != null && rate != null) {
        var more = document.getElementById('issues-rate');
        if(more) {
            more.innerHTML = 'Rate limit: ' + remain + '/' + rate;
            more.title = user_login != null ? 'You have the full authenticated rate.' : 'Login with GitHub to increase your rate limit.';
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
            issues_script(pagedata.script, 'issues-script', issues_data_page);
        }
    }
});

$(window).on('hashchange', function() {
    issues_setup();
    issues_build();
});
