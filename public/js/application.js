var $ = require("../node_modules/jquery");
var SVGInjector = require("../node_modules/svg-injector");
var shufflejs = require("../node_modules/shufflejs");
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
        var btns, filter, grid, sizer, workItem;
        filter = $('#work-filter');
        grid = $('#work-grid');
        sizer = grid.find('.shuffle__sizer');
        new shufflejs(grid, {
            itemSelector: '.work-item',
            sizer: sizer
        });
        btns = filter.children();
        return btns.on('click', function (e) {
            var esto, group, isActive;
            e.preventDefault();
            esto = $(this);
            isActive = esto.hasClass('active');

            if (isActive) {
                return false;
            } else {
                group = esto.find('a').attr('data-group')
                $('#work-filter .active').removeClass('active');
                esto.toggleClass('active');
                return shufflejs('shuffle', group);
            }
        });

    }
};

module.exports = app;