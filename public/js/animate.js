jQuery.fn.visible = function () {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

// animation input hover
$('.form-control').focusin(function () {
    var obj = $(this).parent().find('.pencil-name');
    if ($(this).val() == '') {
        obj.transition({y: '15px', opacity: 1}, 500, 'out');
        obj.next().transition({y: '0px'}, 500, 'in')
    }
    obj.next().visibilityToggle();
}).focusout(function () {
    var obj = $(this).parent().find('.pencil-name');
    if ($(this).val() == '') {
        obj.transition({y: '0px', opacity: 0}, 500, 'in');
        obj.next().transition({y: '15px'}, 500, 'out');
    }
    obj.next().visibilityToggle();
});

//btn send
(function (window, $) {
    $(function () {
        $('.svg-wrapper').on('click', function (event) {
            event.preventDefault();

            var $div = $('<div/>'),
                btnOffset = $(this).offset(),
                xPos = event.pageX - btnOffset.left,
                yPos = event.pageY - btnOffset.top;


            $div.addClass('ripple-effect');
            var $ripple = $(".ripple-effect");

            $ripple.css("height", $(this).height());
            $ripple.css("width", $(this).height());
            $div
                .css({
                    top: yPos - ($ripple.height() / 2),
                    left: xPos - ($ripple.width() / 2),
                    background: $(this).data("ripple-color")
                })
                .appendTo($(this));

            window.setTimeout(function () {
                $div.remove();
            }, 2000);
        });


        var emailUrl = '/mail/sender.php'
        //  $('#contact-form').on('submit', function (e) {
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
                success: function () {
                    alert("si");
                },
                error: function () {
                    alert("no");
                }
            });
        });
    });
})(window, jQuery);