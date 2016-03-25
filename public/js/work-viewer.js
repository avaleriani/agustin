
var workViewer = {
    currentState: null,
    originalTitle: document.title,
    container: document.documentElement,
    popup: document.querySelector('.avgrund-popup'),
    cover: document.querySelector('.avgrund-cover'),

    init: function () {
        this.addClass(this.container, 'avgrund-ready');
        window.avgrund = {
            activate: this.activate,
            deactivate: this.deactivate,
            disableBlur: this.disableBlur
        };
        this.deactivateEscape(event);
        this.deactivateOnClickOutside(event);
    },

    activate: function (state) {
        document.addEventListener('keyup', workViewer.deactivateEscape(workViewer), false);
        document.addEventListener('click', workViewer.deactivateOnClickOutside(workViewer), false);

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
        document.removeEventListener('keyup', workViewer.deactivateEscape, false);
        document.removeEventListener('click', workViewer.deactivateOnClickOutside, false);

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

    deactivateEscape: function (event) {
        if (event.keyCode === 27) {
            workViewer.deactivate();
        }
    },

    deactivateOnClickOutside: function (event) {
        if (event.target === this.cover) {
            workViewer.deactivate();
        }
    }
};


module.exports = workViewer;