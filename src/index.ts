require("./scss/main.scss");
import app from "./js/application";
import workViewer from "./js/work-viewer";
import animate from "./js/animate";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

document.addEventListener("DOMContentLoaded", () => {
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
