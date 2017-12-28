// Helpers
Number.prototype.zeropad= function(len) {
    var s = String(this), c = '0';
    len = len || 2;
    while(s.length < len) s = c + s;
    return s;
}

// Issues API
var issues_page = 0;
var issues_data = null;

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
    row.class = 'issues-' + (iter%2 ? 'bg1' : 'bg2');
    row.innerHTML += '<td id="issues-t-number" class="issues-center"><a href="https://github.com/red-eclipse/' + page_issues_repository + '/issues/' + item.number + '" target="_blank">#' + item.number + '</a></td>';
    var title = document.createElement('td');
    title.id = 'issues-t-title';
    title.class = 'issues-left';
    title.innerHTML += '<a id="issues-t-url" href="#' + item.number + '">' + item.title + '</a>';
    for(var j = 0; j < item.labels.length; j++) {
        var label = item.labels[j];
        title.innerHTML += ' <span id="issues-t-label" class="issues-label" style="border-color: #' + label.color + ';">' + label.name + '</span>';
    }
    row.appendChild(title);
    row.innerHTML += '<td id="issues-t-comments" class="issues-center">' + item.comments + '</td>';
    row.innerHTML += '<td id="issues-t-author" class="issues-center">' + item.user.login + '</td>';
    row.innerHTML += '<td id="issues-t-created" class="issues-time issues-center"><time class="timeago" datetime="' + item.created_at + '">' + issues_date(item.created_at) + '</time></td>';
    row.innerHTML += '<td id="issues-t-updated" class="issues-time issues-center"><time class="timeago" datetime="' + item.updated_at + '">' + issues_date(item.updated_at) + '</time></td>';
    return row;
}

function issues_view(item, hbody, hrow) {
    hrow.innerHTML = '<th id="issues-h-info" class="issues-left"><a href="https://github.com/red-eclipse/' + page_issues_repository + '/issues/' + item.number + '" target="_blank">#' + item.number + ': ' + item.title + '</a> by ' + item.user.login + ' updated <time class="timeago" datetime="' + item.updated_at + '">' + issues_date(item.updated_at) + '</time></th>';
    hbody.innerHTML = '<tr id="issues-t-row"><td id="issues-t-info" class="issues-left">' + sdconv.makeHtml(item.body) + '</td></tr>';
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
        hrow.innerHTML += '<th id="issues-h-author" class="issues-center">Author</th>';
        hrow.innerHTML += '<th id="issues-h-created" class="issues-center">Created</th>';
        hrow.innerHTML += '<th id="issues-h-updated" class="issues-center">Updated</th>';
        hbody.innerHTML = "";
        for(var i = 0; i < issues_data.length; i++) {
            var row = issues_create(issues_data[i], i);
            hbody.appendChild(row);
        }
    }
    jQuery("time.timeago").timeago();
}

function issues_script(src)
{
    var issues_script = document.getElementById('issues-script');
    if(issues_script == null) {
        issues_script = document.createElement('script');
        issues_script.id = 'issues-script';
        document.getElementsByTagName('head')[0].appendChild(issues_script);
    }
    issues_script.src = src;
}

function issues(response) {
    console.log(response.meta);
    console.log(response.data);
    issues_data = response.data;
    issues_build();
}

$(document).ready(function ($) {
    issues_get();
    issues_script(page_script);
});

$(window).on('hashchange', function() {
    issues_get();
    issues_build();
});
