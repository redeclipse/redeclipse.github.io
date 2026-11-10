// The home page's screenshots: a row that advances on its own, and a lightbox to step through them full size
document.addEventListener("DOMContentLoaded", function()
{
    var INTERVAL = 5000, SWIPE = 40;
    var shots = document.querySelector(".shots"), dialog = document.querySelector(".lightbox");
    if(!shots || !dialog) return;
    var track = shots.querySelector(".shots-track"), links = Array.prototype.slice.call(track.querySelectorAll(".shots-item"));
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- the row

    function current() { return Math.round(track.scrollLeft / track.clientWidth); }
    function go(i)
    {
        var n = links.length;
        track.scrollTo({ left: ((i % n) + n) % n * track.clientWidth });
    }
    shots.querySelector(".shots-prev").addEventListener("click", function() { go(current() - 1); });
    shots.querySelector(".shots-next").addEventListener("click", function() { go(current() + 1); });

    var hovered = false, focused = false;
    shots.addEventListener("mouseenter", function() { hovered = true; });
    shots.addEventListener("mouseleave", function() { hovered = false; });
    shots.addEventListener("focusin", function() { focused = true; });
    shots.addEventListener("focusout", function() { focused = false; });
    if(!still) setInterval(function()
    {
        if(!hovered && !focused && !dialog.open && document.visibilityState === "visible") go(current() + 1);
    }, INTERVAL);

    // ---- the lightbox

    var img = dialog.querySelector("img"), loading = dialog.querySelector(".lightbox-loading"), count = dialog.querySelector(".lightbox-count");
    var at = 0, cache = {};

    function load(i)
    {
        var src = links[i].getAttribute("href");
        if(!cache[src]) { cache[src] = new Image(); cache[src].src = src; }
        return cache[src];
    }
    function show(i)
    {
        var n = links.length;
        at = ((i % n) + n) % n;
        count.textContent = (at + 1) + " of " + n;
        var want = at, pic = load(at);
        function ready()
        {
            if(want !== at) return; // moved on while this one loaded
            img.src = pic.src;
            img.style.visibility = "";
            loading.hidden = true;
        }
        if(pic.complete && pic.naturalWidth) ready();
        else
        {
            img.style.visibility = "hidden";
            loading.hidden = false;
            pic.addEventListener("load", ready, { once: true });
        }
        load((at + 1) % n);
        load((at + n - 1) % n);
    }
    links.forEach(function(a, i)
    {
        a.addEventListener("click", function(e)
        {
            e.preventDefault();
            show(i);
            dialog.showModal();
        });
    });
    dialog.querySelector(".lightbox-prev").addEventListener("click", function() { show(at - 1); });
    dialog.querySelector(".lightbox-next").addEventListener("click", function() { show(at + 1); });
    dialog.querySelector(".lightbox-close").addEventListener("click", function() { dialog.close(); });
    dialog.addEventListener("click", function(e) { if(e.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", function(e)
    {
        if(e.key === "ArrowLeft") { e.preventDefault(); show(at - 1); }
        else if(e.key === "ArrowRight") { e.preventDefault(); show(at + 1); }
    });
    dialog.addEventListener("close", function() { go(at); });

    var startx = null;
    dialog.addEventListener("pointerdown", function(e) { startx = e.pointerType === "mouse" ? null : e.clientX; });
    dialog.addEventListener("pointerup", function(e)
    {
        if(startx === null) return;
        var dx = e.clientX - startx;
        startx = null;
        if(Math.abs(dx) > SWIPE) show(at + (dx < 0 ? 1 : -1));
    });
});
