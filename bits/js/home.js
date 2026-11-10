$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                if (window.console) {
                    return console.log('Checking our the events huh?');
                }
            },
            onNavigate: function(direction, itemIndex) {
                if (window.console) {
                    return console.log('Navigating '+direction+'. Current item: '+itemIndex);
                }
            }
        });
    });
    //Programatically call
    $('#open-image').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
    $('#open-youtube').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
    $(document).delegate('*[data-gallery="navigateTo"]', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                var a = this.modal_content.find('.modal-footer a');
                if(a.length > 0) {
                    a.click(function(e) {
                        e.preventDefault();
                        this.navigateTo(2);
                    }.bind(this));
                }
            }
        });
    });
});
$(document).ready(function()
{
    $('#carousel-example-generic .carousel-control').on('mouseup', function()
    {
        this.blur();
    });
    var PARALLAX = 30, hero = document.querySelector('.hero-background');
    if(!hero) return;
    hero.addEventListener('mousemove', function(e)
    {
        var rect = hero.getBoundingClientRect(), cx = rect.width / 2, cy = rect.height / 2;
        var ox = (e.clientX - rect.left - cx) / cx * PARALLAX, oy = (e.clientY - rect.top - cy) / cy * PARALLAX;
        hero.style.backgroundPosition = 'calc(50% + ' + -ox + 'px) calc(50% + ' + -oy + 'px)';
    });
    hero.addEventListener('mouseleave', function()
    {
        hero.style.backgroundPosition = 'center center';
    });
});
