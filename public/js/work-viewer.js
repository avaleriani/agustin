var $ = require("../node_modules/jquery");
var workViewer = {
    currentState: null,
    originalTitle: document.title,
    container: document.documentElement,
    popup: document.querySelector('.avgrund-popup'),
    cover: document.querySelector('.avgrund-cover'),

    init: function () {
        var that = this;
        that.addClass(that.container, 'avgrund-ready');
        window.avgrund = {
            activate: that.activate,
            deactivate: that.deactivate,
            disableBlur: that.disableBlur
        };
    },

    activate: function (state) {
        //todo: hacer que se cierre la ventana con un evento al 
        document.addEventListener('keyup', workViewer.deactivateEscape(event), false);
        document.addEventListener('click', workViewer.deactivateOnClickOutside(event), false);

        workViewer.removeClass(workViewer.popup, workViewer.currentState);
        workViewer.addClass(workViewer.popup, 'no-transition');
        workViewer.addClass(workViewer.popup, state);


        setTimeout(function () {
            workViewer.removeClass(workViewer.popup, 'no-transition');
            workViewer.addClass(workViewer.container, 'avgrund-active');
        }, 0);
        //document.title =  TODO:: get titulo del proyecto y ponerlo aca.

        workViewer.currentState = state;
    },

    deactivate: function () {
        document.removeEventListener('keyup', workViewer.deactivateEscape(event), false);
        document.removeEventListener('click', workViewer.deactivateOnClickOutside(event), false);

        workViewer.removeClass(workViewer.container, 'avgrund-active');

        $("#avimg").html('');
        $("#avtitle").html('');
        $("#avtext").html('');
        document.title = workViewer.originalTitle;
    },

    disableBlur: function () {
        workViewer.addClass(document.documentElement, 'no-blur');
    },

    addClass: function (element, name) {
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + name;
    },

    removeClass: function (element, name) {
        element.className = element.className.replace(name, '');
    },

    deactivateEscape: function (e) {
        console.log("aa");
        var code = e.keyCode || e.which;
        if (code === 27) {
            workViewer.deactivate();
        }
    },

    deactivateOnClickOutside: function (e) {
        console.log("aab");
        if (e.target === this.cover) {
            workViewer.deactivate();
        }
    }
};


module.exports = workViewer;