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
        var btns;
        var filterContainer = $('#work-filter');
        var grid = $('#work-grid');
        var sizer = grid.find('.shuffle__sizer');
        var shfl = new shufflejs(grid, {
            itemSelector: '.work-item',
            easing: 'easeInOutBack',
            sizer: sizer
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
    },

    typingEffect: function () {
        setInterval(function () {
            $('.blinking').animate({
                opacity: 0
            }, 'fast', 'swing').animate({
                opacity: 1
            }, 'fast', 'swing');
        }, 800);

        var effect = $('.blinking').val();
        this.type({effect: effect, captionLength: 0});
    },

    type: function (parameters) {
        var effect = parameters.effect;
        var captionLength = parameters.captionLength;
        $('.typing').html(effect.substr(0, captionLength++));
        if (captionLength < caption.length + 1) {
            setTimeout('type()', 50);
        } else {
            captionLength = 0;
            caption = '';
        }
    }
};

module.exports = app;