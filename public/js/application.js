var $ = require("jquery");
var SVGInjector = require("svg-injector");
var shufflejs = require("shufflejs");

var app = {
    loadApplication: function () {
        var touch = !!( 'ontouchstart' in document.documentElement || navigator.msMaxTouchPoints > 0 );
        $('.view').on('click', function (e) {
            e.preventDefault();
            return false;
        });
        $('.arrow-down').on('click', function (e) {
            e.preventDefault();
            return $("html,body").animate({
                scrollTop: $("#page-work").offset().top
            });
        });
        if (touch) {
            return FastClick.attach(document.body);
        }
    },

    svgInjector: function () {
        var mySVGsToInject;
        mySVGsToInject = document.querySelectorAll('img.inject-me');
        return SVGInjector(mySVGsToInject);
    },

    worksFilter: function () {
        var btns;
        var filterContainer = $('#work-filter');
        var grid = $('#work-grid');
        var sizer = grid.find('.shuffle__sizer');
        var shfl = new shufflejs(grid, {
            itemSelector: '.work-item',
            easing: 'ease-in-out',
            sizer: sizer,
            speed:600
        });
        btns = filterContainer.children();
        return btns.on('click', function (e) {
            var esto, group, isActive;
            e.preventDefault();
            esto = $(this);
            isActive = esto.hasClass('active');

            if (isActive) {
                return false;
            } else {
                group = esto.find('a').attr('data-group');
                $('#work-filter .active').removeClass('active');
                esto.toggleClass('active');
                shfl.filter(group);
            }
        });
    }
};

module.exports = app;