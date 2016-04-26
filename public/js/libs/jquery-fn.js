
var $ = require("../../node_modules/jquery");

$.fn.visible = function () {
    return this.css('visibility', 'visible');
};

$.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

$.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
    this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
    return this;
};

module.exports = $;