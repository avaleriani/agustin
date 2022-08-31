require("./scss/main.scss");
import { app } from "./js/application.js";
const workViewer = require("./js/work-viewer.js");
const animate = require("./js/animate.js");
import "typeface-roboto";
import "lazysizes";

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

  document.getElementById("year").innerHTML = String(new Date().getFullYear());
});
