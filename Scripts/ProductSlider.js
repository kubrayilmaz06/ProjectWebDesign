//Product Slider Js
var productDetailsCarousel = $(".slider");
var productThumbnailsCarousel = $(".navigation-thumbs");

var thumbnailItemClass = '.owl-item';

var slides = productDetailsCarousel.owlCarousel({
    video: true,
    startPosition: 12,
    items: 1,
    loop: true,
    margin: 10,
    autoplay: false,
    nav: true,
    dots: true,
    navText: ["<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"]

}).on('changed.owl.carousel', syncPosition);

function syncPosition(el) {
    $owl_slider = $(this).data('owl.carousel');
    var loop = $owl_slider.options.loop;

    if (loop) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
    } else {
        var current = el.item.index;
    }

    var owl_thumbnail = productThumbnailsCarousel.data('owl.carousel');
    var itemClass = "." + owl_thumbnail.options.itemClass;


    var thumbnailCurrentItem = productThumbnailsCarousel
        .find(itemClass)
        .removeClass("synced")
        .eq(current);

    thumbnailCurrentItem.addClass('synced');

    if (!thumbnailCurrentItem.hasClass('active')) {
        var duration = 300;
        productThumbnailsCarousel.trigger('to.owl.carousel', [current, duration, true]);
    }
}
var thumbs = productThumbnailsCarousel.owlCarousel({
    startPosition: 12,
    items: 3,
    loop: false,
    margin: 40,
    autoplay: false,
    nav: false,
    dots: false,
    onInitialized: function (e) {
        var thumbnailCurrentItem = $(e.target).find(thumbnailItemClass).eq(this._current);
        thumbnailCurrentItem.addClass('synced');
    },
})
    .on('click', thumbnailItemClass, function (e) {
        e.preventDefault();
        var duration = 300;
        var itemIndex = $(e.target).parents(thumbnailItemClass).index();
        productDetailsCarousel.trigger('to.owl.carousel', [itemIndex, duration, true]);
    }).on("changed.owl.carousel", function (el) {
        var number = el.item.index;
        $owl_slider = productDetailsCarousel.data('owl.carousel');
        $owl_slider.to(number, 100, true);
    });


//FancyBox JS 
$(document).ready(function () {
    $(".fancybox").fancybox();
});



