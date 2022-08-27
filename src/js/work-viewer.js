const workViewer = {
  init: function () {
    const elements = document.querySelectorAll(".work-item");

    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", workViewer.activate, false);
    }

    const elem2 = document.querySelectorAll(".overlay-close");

    for (let i = 0; i < elem2.length; i++) {
      elem2[i].addEventListener("click", workViewer.deactivate, false);
    }
  },

  activate: function () {
    const currElem = this.nextElementSibling;
    if (!currElem.classList.contains("open")) {
      //if it's closed
      document.addEventListener("keyup", workViewer.deactivateWithEscape, false);
      currElem.classList.add("open");
      document.body.style.overflowY = "hidden";
      currElem.querySelector(".overlay-title-text").classList.add("overlay-title-effect");
    }
  },

  deactivate: function () {
    const elem = document.querySelector(".open");
    elem.classList.remove("open");
    document.body.style.overflowY = "auto";
    elem.querySelector(".overlay-title-text").classList.remove("overlay-title-effect");
  },

  deactivateWithEscape: function (e) {
    const code = e.keyCode || e.which;
    if (code === 27) {
      const elem = document.querySelector(".open");
      elem.classList.remove("open");
      document.body.style.overflowY = "auto";
      elem.querySelector(".overlay-title-text").classList.remove("overlay-title-effect");
    }
  },
};

module.exports = workViewer;
