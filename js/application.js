var $ = require("jquery");
var SVGInjector = require("svg-injector");
var shufflejs = require("shufflejs");
var fastClick = require('fastclick');

var app = {
    loadApplication: function () {
        var that = this;
        var touch = !!( 'ontouchstart' in document.documentElement || navigator.msMaxTouchPoints > 0 ); //the best I can do to dettect touchscreen
        $('.view').on('click', function (e) {
            e.preventDefault();
            return false;
        });
        if (touch) {
            return fastClick.attach(document.body);
        }
        this.centerGrid();
        window.addEventListener('resize', function () {
            that.centerGrid();
        }, true);
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
            speed: 600

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
                $('.active').removeClass('active');
                esto.toggleClass('active');
                shfl.filter(group);
            }
        });
    },

    centerGrid: function () {
        var width = window.innerWidth;
        var count = 0;
        var margin = (count - 1) * 15;
        var total = 1127;
        if(width < total)
        {
            count = Math.floor(width / 270);
            margin = (count - 1) * 15;
            total = (count * 270) + margin;
        }
        document.getElementById('work-grid').style.width = total + "px";
        document.getElementById('grid-box-container').style.width = total + "px";
    }
};

module.exports = app;