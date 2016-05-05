var workViewer = {
    originalTitle: document.title,
    container: document.documentElement,
    popup: document.querySelector('.avgrund-popup'),
    cover: document.querySelector('.avgrund-cover'),

    init: function () {
        var that = this;
        window.avgrund = {
            activate: that.activate,
            deactivate: that.deactivate,
            disableBlur: that.disableBlur
        };
    },

    activate: function () {
        document.addEventListener('keyup', workViewer.deactivateEscape, false);
        document.addEventListener('click', workViewer.deactivateOnClickOutside, false);

        workViewer.addClass(workViewer.popup, 'no-transition');

        setTimeout(function () {
            workViewer.removeClass(workViewer.popup, 'no-transition');
            workViewer.addClass(workViewer.container, 'avgrund-active');
        }, 0);
        //document.title =  TODO:: get titulo del proyecto y ponerlo aca.
    },

    deactivate: function () {
        document.removeEventListener('keyup', workViewer.deactivateEscape, false);
        document.removeEventListener('click', workViewer.deactivateOnClickOutside, false);

        workViewer.removeClass(workViewer.container, 'avgrund-active');

        document.querySelector('#avimg').innerHTML = '';
        document.querySelector('#avtitle').innerHTML = '';
        document.querySelector('#avtext').innerHTML = '';
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
        var code = e.keyCode || e.which;
        if (code === 27) {
            workViewer.deactivate();
        }
    },

    deactivateOnClickOutside: function (e) {
        if (e.target === workViewer.cover) {
            workViewer.deactivate();
        }
    }
};


module.exports = workViewer;