// The menu button shows and hides the navbar below 768px
document.addEventListener("DOMContentLoaded", function()
{
    var button = document.querySelector(".navbar-toggle"), menu = document.getElementById("navbar");
    if(!button || !menu) return;
    button.addEventListener("click", function()
    {
        var open = menu.classList.toggle("open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
    });
});
