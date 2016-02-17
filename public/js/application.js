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
        var $btns, $filter, $grid, $mobileFilterBtn, $sizer, $workItem;
        $filter = $('#work-filter');
        $grid = $('#work-grid');
        $sizer = $grid.find('.shuffle__sizer');
        $workItem = $('.work-item');
        $mobileFilterBtn = $('.mobile-filter-select');
        $mobileFilterBtn.on('click', function (e) {
            e.preventDefault();
            $filter.slideToggle();
            return $(this).toggleClass('opened');
        });
        $(window).resize(function () {
            if ($(window).width() > 768) {
                if ($filter.is(':visible')) {

                } else {
                    return $filter.slideDown();
                }
            } else {
                $filter.slideUp();
                return $mobileFilterBtn.removeClass('opened');
            }
        });
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
            if ($this.hasClass('active')) {
                return false;
            } else {
                group = (isActive ? 'all' : $this.data('group'));
                if (!isActive) {
                    $('#work-filter .active').removeClass('active');
                }
                $this.toggleClass('active');
                return $grid.shuffle('shuffle', group);
            }
        });
    };

    formSubscribe = function () {
        var form, formMessages, hasHtml5Validation;
        form = $('#subscribe');
        formMessages = $('.form-result');
        hasHtml5Validation = function () {
            return typeof document.createElement("input").checkValidity === "function";
        };
        if (hasHtml5Validation()) {
            return form.submit(function (e) {
                var formData;
                if (!this.checkValidity()) {
                    e.preventDefault();
                    $(this).addClass("invalid");
                    return $("#status").html("invalid");
                } else {
                    $(this).removeClass("invalid");
                    e.preventDefault();
                    formData = $(form).serialize();
                    return $.ajax({
                        type: "POST",
                        url: $(form).attr("action"),
                        data: formData
                    }).done(function () {
                        $(formMessages).removeClass("error");
                        $(formMessages).addClass("success");
                        $(formMessages).text('You have successfully subscribed!');
                        return $("#email").val("");
                    }).fail(function (data) {
                        $(formMessages).removeClass("success");
                        $(formMessages).addClass("error");
                        if (data.responseText !== "") {
                            return $(formMessages).text(data.responseText);
                        } else {
                            return $(formMessages).text("Oops! An error occured please check your email address.");
                        }
                    });
                }
            });
        }
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
