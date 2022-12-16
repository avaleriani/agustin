require("./scss/main.scss");
import app from "./js/application";
import workViewer from "./js/work-viewer";
import animate from "./js/animate";
import "typeface-roboto";

document.addEventListener("load", function () {
  app.loadApplication();
  workViewer.init();
  animate.scrollArrow();
  app.worksFilter();
  animate.typingEffect();
  animate.hideMoreBtnMobile();
  animate.inputAnimation({});
  animate.rippleEffect();
  animate.emailSend();
  animate.hexagonRotate();

  const yearContainer = document.getElementById("year");
  if (yearContainer) {
    yearContainer.innerHTML = String(new Date().getFullYear());
  }
});
