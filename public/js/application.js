var $ = require("../node_modules/jquery");
var app = {
    loadApplication: function () {
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
        if (Modernizr.touch) {
            return FastClick.attach(document.body);
        }
    },

    svgInjector: function () {
        var mySVGsToInject;
        mySVGsToInject = document.querySelectorAll('img.inject-me');
        return SVGInjector(mySVGsToInject);
    },

    worksFilter: function () {
        var $btns, $filter, $grid, $sizer, $workItem;
        $filter = $('#work-filter');
        $grid = $('#work-grid');
        $sizer = $grid.find('.shuffle__sizer');
        $workItem = $('.work-item');
        $grid.shuffle({
            itemSelector: $workItem,
            sizer: $sizer
        });
        $btns = $filter.children();
        return $btns.on('click', function (e) {
            var $this, group, isActive;
            e.preventDefault();
            $this = $(this);
            isActive = $this.hasClass('active');

            if (isActive) {
                return false;
            } else {
                group = $this.find('a').attr('data-group')
                $('#work-filter .active').removeClass('active');
                $this.toggleClass('active');
                return $grid.shuffle('shuffle', group);
            }
        });

    }
};

module.exports = app;