const workViewer = {
  init: () => {
    const elements = document.querySelectorAll(".work-item");

    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", workViewer.activate, false);
    }

    const elem2 = document.querySelectorAll(".overlay-close");

    for (let i = 0; i < elem2.length; i++) {
      elem2[i].addEventListener("click", workViewer.deactivate, false);
    }
  },

  activate: (obj: any) => {
    const currElem = obj.nextElementSibling;
    if (!currElem.classList.contains("open")) {
      //if it's closed
      document.addEventListener("keyup", workViewer.deactivateWithEscape, false);
      currElem.classList.add("open");
      document.body.style.overflowY = "hidden";
      currElem.querySelector(".overlay-title-text").classList.add("overlay-title-effect");
    }
  },

  deactivate: () => {
    const elem = document.querySelector(".open");
    if (elem) {
      elem.classList.remove("open");
      document.body.style.overflowY = "auto";
      const titleText = elem.querySelector(".overlay-title-text") as HTMLElement;
      titleText.classList.remove("overlay-title-effect");
    }
  },

  deactivateWithEscape: (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      const elem = document.querySelector(".open") as HTMLElement;
      elem.classList.remove("open");
      document.body.style.overflowY = "auto";
      const overlayTitleText = elem.querySelector(".overlay-title-text") as HTMLElement;
      overlayTitleText.classList.remove("overlay-title-effect");
    }
  },
};

export default workViewer;
