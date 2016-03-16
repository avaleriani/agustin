var workViewer = {
    currentState: null,
    originalTitle: document.title,
    container: document.documentElement,
    popup: document.querySelector('.avgrund-popup'),
    cover: document.querySelector('.avgrund-cover'),

    init: function () {
        this.addClass(container, 'avgrund-ready');
        window.avgrund = {
            activate: this.activate,
            deactivate: this.deactivate,
            disableBlur: this.disableBlur
        };
        this.deactivateEscape();
        this.deactivateOnClickOutside();
    },

    deactivateEscape: function (event) {
        if (event.keyCode === 27) {
            this.deactivate();
        }
    },

    deactivateOnClickOutside: function (event) {
        if (event.target === cover) {
            this.deactivate();
        }
    },

    activateModal: function (state) {
        document.addEventListener('keyup', onDocumentKeyUp, false);
        document.addEventListener('click', onDocumentClick, false);

        this.removeClass(popup, this.currentState);
        this.addClass(popup, 'no-transition');
        this.addClass(popup, state);

        setTimeout(function () {
            this.parent.removeClass(popup, 'no-transition');
            this.parent.addClass(this.container, 'avgrund-active');
        }, 0);
        //document.title =  TODO:: get titulo del proyecto y ponerlo aca.

        this.currentState = state;
    },

    deactivate: function () {
        document.removeEventListener('keyup', onDocumentKeyUp, false);
        document.removeEventListener('click', onDocumentClick, false);

        this.removeClass(this.container, 'avgrund-active');

        $("#avimg").html('');
        $("#avtitle").html('');
        $("#avtext").html('');
        document.title = this.originalTitle;
    },

    disableBlur: function () {
        this.addClass(document.documentElement, 'no-blur');
    },

    addClass: function (element, name) {
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + name;
    },

    removeClass: function (element, name) {
        element.className = element.className.replace(name, '');
    }
};


module.exports = workViewer;