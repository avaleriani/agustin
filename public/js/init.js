var linesDrawer = require('../js/lines-drawer.js');
var app = require('../js/application.js');
var animate = require('../js/animate.js');
var workViewer = require('../js/work-viewer.js');

(function (window, $) {
    $(function () {
        app.svgInjector();
        workViewer.init();
        app.loadApplication();
        if (window.innerWidth == '1920') { //todo:: fix mobile
            // TODO:: ver como hacer para que las lineas sean mobile, supongo que multiplicando por un numero magico que de 0 en la resolucion que lo hice
            linesDrawer.createAllLines('#lines-container');
            linesDrawer.scrollAnimate();
            linesDrawer.mouseCoordenatesOnTitle();
        }
        app.worksFilter();
        animate.workModalClick();
        animate.hideMoreBtnMobile();
        animate.inputAnimation();
        animate.rippleEffect();
        animate.emailSend();
        animate.hexagonRotate();
        $(".year").text(new Date().getFullYear());
    });
})(window, jQuery);