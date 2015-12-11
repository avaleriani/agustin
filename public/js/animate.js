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
});

$('.form-control').focusout(function () {
    var obj = $(this).parent().find('.pencil-name');
    if ($(this).val() == '') {
        obj.transition({y: '0px', opacity: 0}, 500, 'in');
        obj.next().transition({y: '15px'}, 500, 'out');
    }
    obj.next().visibilityToggle();
});