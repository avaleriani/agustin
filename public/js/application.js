(function () {
    var formSubscribe, loadApplication, svgInjector, worksFilter;

    loadApplication = function () {
        $(svgInjector);
        $(worksFilter);
        $(formSubscribe);
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
    };

    svgInjector = function () {
        var mySVGsToInject;
        mySVGsToInject = document.querySelectorAll('img.inject-me');
        return SVGInjector(mySVGsToInject);
    };

    worksFilter = function () {
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
            //todo::make it work
            var $this, group, isActive;
            e.preventDefault();
            $this = $(this);
            isActive = $this.hasClass('active');

            if (isActive) {
                return false;
            } else {
                group = $this.find('a').attr('data-group')
                $('#work-filter .active').removeClass('active');
                console.log(group);
                $this.toggleClass('active');
                return $grid.shuffle('shuffle', group);
            }
        });

    };

    $(document).ready(function () {

        $(".year").text(new Date().getFullYear());

        $(document).on({
            mouseenter: function () {
                $(this).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
                $(this).find(".hexagon").css("background-color", "#000000");
                $(this).find(".hexagon-icon-position").css("color", "#ffffff");
            },

            mouseleave: function () {
                $(this).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
                $(this).find(".hexagon").css("background-color", "#ffffff");
                $(this).find(".hexagon-icon-position").css("color", "#000000");
            }
        }, '.hexagon-wrapper');


        $(".project-box").click(function (e) {
            e.preventDefault();

            $('<img src="' + $(this).attr("data-largesrc") + '">').appendTo("#avimg");

            $("#avtitle").html($(this).attr("data-title"));
            $("#avtext").html($(this).attr("data-description"));

            $("#avpopup").center();
            avgrund.activate();

            return false;
        });

        jQuery.fn.center = function (parent) {
            this.css("position", "absolute");
            this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
            this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
            return this;
        }

        //If is touchscreen, the "+ More" button in works is always visible
        {
            if (true) {
                $(".info").addClass("work-button-mobile");
            } else {
                $(".info").removeClass("work-button-mobile");
            }
        }
        $.support.placeholder = (function () {
            var i = document.createElement('input');
            return 'placeholder' in i;
        })();

        if ($.support.placeholder) {
            $('.form-label').each(function () {
                $(this).addClass('js-hide-label');
            });

            $('.form-group').find('input, textarea').on('keyup blur focus', function (e) {

                var $this = $(this),
                    $parent = $this.parent().find("label");

                if (e.type == 'keyup') {
                    if ($this.val() == '') {
                        $parent.addClass('js-hide-label');
                    } else {
                        $parent.removeClass('js-hide-label');
                    }
                }
                else if (e.type == 'blur') {
                    if ($this.val() == '') {
                        $parent.addClass('js-hide-label');
                    }
                    else {
                        $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                    }
                }
                else if (e.type == 'focus') {
                    if ($this.val() !== '') {
                        $parent.removeClass('js-unhighlight-label');
                    }
                }
            });
        }
    });

    $(loadApplication);


}).call(this);
