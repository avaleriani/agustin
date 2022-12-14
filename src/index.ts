require("./scss/main.scss");
import app from "./js/application";
const workViewer = require("./js/work-viewer.ts");
const animate = require("./js/animate.ts");
import "typeface-roboto";

document.addEventListener("DOMContentLoaded", function () {
  app.loadApplication();
  workViewer.init();
  animate.scrollArrow();
  app.worksFilter();
  animate.typingEffect();
  animate.hideMoreBtnMobile();
  animate.inputAnimation();
  animate.rippleEffect();
  animate.emailSend();
  animate.hexagonRotate();

  const yearContainer = document.getElementById("year");
  if (yearContainer) {
    yearContainer.innerHTML = String(new Date().getFullYear());
  }
});
