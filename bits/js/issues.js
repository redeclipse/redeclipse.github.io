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

// Issues API
var issues_page = 0;
var issues_data = null;
var issues_current = null;
var issues_comments_data = null;
var issues_reactions = [ "+1", "-1", "laugh", "hooray", "confused", "heart" ];
var issues_reactmd = [ ":+1:", ":-1:", ":laugh:", ":raised_hands:", ":confused:", ":heart:" ];

function issues_get()
{
    var url = window.location.hash, idx = url.indexOf('#')
    issues_page = idx != -1 ? parseInt(url.substring(idx+1)) : 0;
}

function issues_set(idx)
{
    issues_page = idx;
    issues_build();
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
    span.innerHTML += ' updated <time class="timeago" datetime="' + item.updated_at + '">' + issues_date(item.updated_at) + '</time>';
    if(item.reactions.total_count > 0) {
        for(var j = 0; j < issues_reactions.length; j++) {
            var react = issues_reactions[j], num = item.reactions[react];
            if(num > 0) {
                span.innerHTML += ' ' + sdconv.makeHtml(issues_reactmd[j]) + ' ' + num;
            }
        }
    }
    avat.innerHTML += '<a href="' + item.user.html_url + '" target="_blank">' + item.user.login + ' <img src="' + item.user.avatar_url + '" alt="' + item.user.login + '" /></a>';
    var irow = hbody.makechild('tr', 'issues-t-comments-row', ''),
        info = irow.makechild('td', 'issues-t-comments-info', 'issues-left'),
        cont = info.makechild('span', 'issues-t-comments-span', 'issues-left');
    cont.innerHTML = sdconv.makeHtml(item.body);
    issues_script(pagedata.uselocal ? pagedata.comments : item.comments_url + '?callback=issues_comments', 'issues-script-comment');
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
                span.innerHTML += ' ' + sdconv.makeHtml(issues_reactmd[j]) + ' ' + num;
            }
        }
    }
    avat.innerHTML += '<a href="' + item.user.html_url + '" target="_blank">' + item.user.login + ' <img src="' + item.user.avatar_url + '" alt="' + item.user.login + '" /></a>';
    var irow = hbody.makechild('tr', 'issues-t-comments-row', ''),
        info = irow.makechild('td', 'issues-t-comments-info', 'issues-left'),
        cont = info.makechild('span', 'issues-t-comments-span', 'issues-left');
    cont.innerHTML = sdconv.makeHtml(item.body);
}

function issues_build_comments() {
    if(issues_page <= 0 || issues_current == null) return;
    var hbody = document.getElementById('issues-body');
    for(var i = 0; i < issues_comments_data.length; i++) {
        issues_view_comment(issues_comments_data[i], i+1, hbody);
    }
    var hrow = hbody.makechild('tr', 'issues-t-reply-row', ''),
        head = hrow.makechild('td', 'issues-t-reply-info', 'issues-center'),
        span = head.makechild('span', 'issues-t-reply-span', 'issues-middle');
    span.innerHTML = '<a href="' + issues_current.html_url + '#show_issue" target="_blank">View on GitHub</a>'
    span.innerHTML += ' | <a href="' + issues_current.html_url + '#partial-timeline-marker" target="_blank">Reply on GitHub</a>';
    jQuery("time.timeago").timeago();
}

function issues_build() {
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
    if(issues_page > 0) {
        table.id = 'issues-view';
        hrow.innerHTML = '';
        hbody.innerHTML = '';
        for(var i = 0; i < issues_data.length; i++) {
            if(issues_data[i].number == issues_page) {
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
    }
    jQuery("time.timeago").timeago();
}

function issues_script(src, idname)
{
    if(pagedata.uselocal) {
        var script = document.getElementById(idname);
        if(script != null) script.remove();
        script = document.createElement('script');
        script.id = idname;
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    else {
        $.ajax({
            method: "GET",
            url: src,
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
                console.log('script failure: ', idname, src);
            }
        });
    }
}

function issues_comments(response) {
    console.log('issue comments meta: ', response.meta);
    console.log('issue comments data: ', response.data);
    issues_comments_data = response.data;
    issues_build_comments();
}

function issues(response) {
    console.log('issues meta: ', response.meta);
    console.log('issues data: ', response.data);
    issues_data = response.data;
    issues_build();
}

$(document).ready(function ($) {
    issues_get();
    issues_script(pagedata.script, 'issues-script');
});

$(window).on('hashchange', function() {
    issues_get();
    issues_build();
});
