require("./scss/main.scss");
import { app } from "./js/application.js";
const workViewer = require("./js/work-viewer.js");
const animate = require("./js/animate.js");
import "typeface-roboto";

document.addEventListener("DOMContentLoaded", function () {
  app.loadApplication();
  app.svgInjector();
  workViewer.init();
  animate.scrollArrow();
  // if (window.innerWidth === "1920") {
  // TODO: fix mobile
  // TODO/: check how the lines can work on mobile, maybe making it responsive based on resolution.
  // hice = window.innerWidth * 1920
  //          linesDrawer.createAllLine
  // s('#lines-container');
  //          linesDrawer.scrollAnimate();
  //l     inesDrawer.mouseCoordinatesOnTitle();
  // }
  app.worksFilter();
  animate.typingEffect();
  animate.hideMoreBtnMobile();
  animate.inputAnimation();
  animate.rippleEffect();
  animate.emailSend();
  animate.hexagonRotate();

  document.getElementById("year").innerHTML = String(new Date().getFullYear());
});
