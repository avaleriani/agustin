var workViewer = {
    overlay: document.querySelector('div.overlay'),
    closeBttn: overlay.querySelector('button.overlay-close'),
    transEndEventNames: {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
    transEndEventName: transEndEventNames[Modernizr.prefixed('transition')],
    support: {transitions: Modernizr.csstransitions},

    init: function () {
        var thath = this;
        window.avgrund = {
            activate: that.activate,
            deactivate: that.deactivate
        };

    },

    activate: function () {
        document.addEventListener('keyup', workViewer.deactivateEscape, false);
        this.overlay.classList.add('open');
    },

    deactivate: function () {
        var that = this;
        document.removeEventListener('keyup', workViewer.deactivateEscape, false);

        if (this.overlay.classList.contains('open')) {

            this.overlay.classList.remove('open');
            this.overlay.classList.add('close');
            var onEndTransitionFn = function (ev) {
                if (that.support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(that.transEndEventName, onEndTransitionFn);
                }
                that.overlay.classList.remove('close');
            };
            if (this.support.transitions) {
                that.overlay.addEventListener(that.transEndEventName, onEndTransitionFn);
            }
            else {
                onEndTransitionFn();
            }
        }
    },

    deactivateEscape: function (e) {
        var code = e.keyCode || e.which;
        if (code === 27) {
            workViewer.deactivate();
        }
    }
};


module.exports = workViewer;