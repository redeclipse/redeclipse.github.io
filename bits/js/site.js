// The menu button shows and hides the navbar below 992px, and "More" opens its menu on a click as well as on hover
document.addEventListener("DOMContentLoaded", function()
{
    var button = document.querySelector(".navbar-toggle"), menu = document.getElementById("navbar");
    if(button && menu) button.addEventListener("click", function()
    {
        var open = menu.classList.toggle("open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
    });
    var more = document.querySelector(".navmore"), morebutton = document.querySelector(".navmorebutton");
    if(!more || !morebutton) return;
    function setmore(open)
    {
        more.classList.toggle("open", open);
        morebutton.setAttribute("aria-expanded", open ? "true" : "false");
    }
    morebutton.addEventListener("click", function(e) { e.stopPropagation(); setmore(!more.classList.contains("open")); });
    document.addEventListener("click", function(e) { if(!more.contains(e.target)) setmore(false); });
    document.addEventListener("keydown", function(e) { if(e.key === "Escape" && more.classList.contains("open")) { setmore(false); morebutton.focus(); } });
});
