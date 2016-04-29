var $ = require("jquery");
window.jQuery = window.$ = $;
var velocity = require("velocity-animate");
delete window.jQuery;
delete window.$;
var scrollMagic = require("scrollmagic");
var theaterJS = require("theaterjs");

var animate = {
    inputAnimation: function () {
        $('.form-control').focusin(function () {
            var obj = $(this).parent().find('.pencil-name');
            if ($(this).val() == '') {
                obj.velocity({y: '15px', opacity: 1}, 500, 'out');
                obj.next().velocity({y: '0px'}, 500, 'in');
            }
            obj.next().visibilityToggle();
        }).focusout(function () {
            var obj = $(this).parent().find('.pencil-name');
            if ($(this).val() == '') {
                obj.velocity({y: '0px', opacity: 0}, 500, 'in');
                obj.next().velocity({y: '15px'}, 500, 'out');
            }
            obj.next().visibilityToggle();
        });

        $.support.placeholder = (function () {
            var i = document.createElement('input');
            return 'placeholder' in i;
        })();

        if ($.support.placeholder) {
            $('.form-label').each(function () {
                $(this).addClass('js-hide-label');
            });

            $('.form-group').find('input, textarea').on('keyup blur focus', function (e) {

                var that = $(this),
                    parent = that.parent().find("label");

                if (e.type == 'keyup') {
                    if (that.val() == '') {
                        parent.addClass('js-hide-label');
                    } else {
                        parent.removeClass('js-hide-label');
                    }
                }
                else if (e.type == 'blur') {
                    if (that.val() == '') {
                        parent.addClass('js-hide-label');
                    }
                    else {
                        parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                    }
                }
                else if (e.type == 'focus') {
                    if (that.val() !== '') {
                        parent.removeClass('js-unhighlight-label');
                    }
                }
            });
        }
    },

    rippleEffect: function () {
        $('.svg-wrapper').on('click', function (event) {
            event.preventDefault();

            var divCreated = $('<div/>'),
                btnOffset = $(this).offset(),
                xPos = event.pageX - btnOffset.left,
                yPos = event.pageY - btnOffset.top;


            divCreated.addClass('ripple-effect');
            var ripple = $(".ripple-effect");

            ripple.css("height", $(this).height());
            ripple.css("width", $(this).height());
            divCreated.css({
                    top: yPos - (ripple.height() / 2),
                    left: xPos - (ripple.width() / 2),
                    background: $(this).data("ripple-color")
                })
                .appendTo($(this));

            window.setTimeout(function () {
                divCreated.remove();
            }, 2000);
        });
    },

    showEmailSendFinished: function () {
        $("#hidden-contactform").css("display", "block").velocity({height: "650px"}, {
            duration: 2500,
            easing: "easeOutExpo"
        });
        $(".hidden-text-success").velocity({opacity: "1"}, {duration: 1500, easing: "easeOutExpo"});
    },

    emailSend: function () {
        var emailUrl = '/mail/sender.php';
        var message = $(".hidden-email-message");
        var image = $(".hidden-email-image");

        $('#btn-send').on('click', function (e) {
            e.preventDefault();
            var data = {
                name: $("#name").val(),
                email: $("#email").val(),
                subject: $("#subject").val(),
                message: $("#message").val()
            };
            $.ajax({
                type: "POST",
                url: emailUrl,
                data: data,
                success: function (data) {
                    if (data.status == 'error') {
                        message.html("Sorry, there's been an error, please try again or email me at <a href='#'mailto='hello@agustinvaleriani.com'>hello@agustinvaleriani.com</a>");
                        image.attr('src', 'images/error.png');
                    }
                    else {
                        message.html("Thanks! I'll be in touch shortly.");
                        image.attr('src', 'images/success.png');
                    }
                    animate.showEmailSendFinished();
                },
                error: function () {
                    message.html("Sorry, there's been an error, please try again or email me at <a href='#'mailto='hello@agustinvaleriani.com'>hello@agustinvaleriani.com</a>");
                    image.attr('src', 'images/error.png');
                    animate.showEmailSendFinished();
                }
            });
        });
    },

    workModalClick: function () {
        $(".project-box").click(function (e) {
            e.preventDefault();

            $('<img src="' + $(this).attr("data-largesrc") + '">').appendTo("#avimg");

            $("#avtitle").html($(this).attr("data-title"));
            $("#avtext").html($(this).attr("data-description"));

            $("#avpopup").center();
            window.avgrund.activate();

            return false;
        });
    },

    hexagonRotate: function () {
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
    },

    hideMoreBtnMobile: function () {
        //If is touchscreen, the "+ More" button in works is always visible
            if (!!('ontouchstart' in window)) {
                $(".info").addClass("work-button-mobile");
            } else {
                $(".info").removeClass("work-button-mobile");
            }
    },

    typingEffect: function () {
        var controller = new scrollMagic.Controller();

        var theater = theaterJS();
        theater.on('type:start, erase:start', function(){
            var actor = theater.getCurrentActor();
            actor.$element.classList.add('is-typing');
        });

        //todo: luego de animar el logo cuando cargas la pagina, que escriba el hello.
        theater.addActor('typing');
        theater.addScene('typing:Hello.', 300);
        
        //typing about
        var s1 = new scrollMagic.Scene({triggerElement: "#about", duration: 200, offset: -100, reverse:false})
            .addTo(controller)
            .on("start", function (e) {
                theater.addActor('about');
                theater.addScene('about:About.', 500);
            });

        //typing work
        var s2 = new scrollMagic.Scene({triggerElement: "#work", duration: 200, offset: -100, reverse:false})
            .addTo(controller)
            .on("start", function (e) {
                theater.addActor('work');
                theater.addScene('work:Work.', 500);
            });

        //typing contact
        var s3 = new scrollMagic.Scene({triggerElement: "#contact", duration: 200, offset: -100, reverse:false})
            .addTo(controller)
            .on("start", function (e) {
                theater.addActor('contact', {accuracy: 0.3});
                theater.addScene('contact:Contact.', 500);
            });
    }
};

module.exports = animate;