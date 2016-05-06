var workViewer = {

    init: function () {
       var elements =  document.querySelectorAll('.work-item');

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', workViewer.activate, false);
        }

        var elem2 =  document.querySelectorAll('.overlay-close');

        for (i = 0; i < elem2.length; i++) {
           // elem2[i].addEventListener('click', workViewer.deactivate(elements[i].nextElementSibling), false);
            elem2[i].addEventListener('click', workViewer.deactivate, false);
        }
    },

    activate: function () {
        var currElem = this.nextElementSibling;
        if(!currElem.classList.contains('open')){//if it's closed
            document.addEventListener('keyup', workViewer.deactivateWithEscape, false);
            currElem.classList.add('open');
        }
    },

    deactivate: function () {
        this.parentElement.classList.remove('open');
    },

    deactivateWithEscape: function (e) {
        var code = e.keyCode || e.which;
        if (code === 27) {
            var elems = document.querySelector(".open");
            elems.classList.remove('open');
        }
    }
};


module.exports = workViewer;