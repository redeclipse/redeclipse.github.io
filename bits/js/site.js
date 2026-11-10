(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','/bits/js/analytics.js','ga');

ga('create', 'UA-45886576-1', 'www.redeclipse.net');
ga('require', 'linkid', 'linkid.js');
ga('send', 'pageview');

$(document).ready(function() {
    jQuery("time.timeago").timeago();
    jQuery.timeago.settings = {
        refreshMillis: 60000,
        allowPast: true,
        allowFuture: true,
        localeTitle: false,
        cutoff: 0,
        autoDispose: true,
        strings: {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: "ago",
            suffixFromNow: "from now",
            inPast: "any moment",
            seconds: "a moment",
            minute: "1 minute",
            minutes: "%d minutes",
            hour: "1 hour",
            hours: "%d hours",
            day: "1 day",
            days: "%d days",
            month: "1 month",
            months: "%d months",
            year: "1 year",
            years: "%d years",
            wordSeparator: " ",
            numbers: []
        }
    }
});
