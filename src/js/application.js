const $ = require("jquery");
const fastClick = require("fastclick");
import Shuffle from "shufflejs";

export const app = {
  loadApplication: function () {
    const touch = !!("ontouchstart" in document.documentElement || navigator.msMaxTouchPoints > 0);
    $(".view").on("click", function (e) {
      e.preventDefault();
      return false;
    });
    if (touch) {
      return fastClick.attach(document.body);
    }
  },

  worksFilter: function () {
    const grid = document.getElementById("work-grid");
    const sizer = document.getElementsByClassName("shuffle__sizer")[0];
    const btns = document.getElementsByClassName("svg-wrapper");
    if (grid) {
      const shfl = new Shuffle(grid, {
        itemSelector: ".work-item",
        easing: "ease-in-out",
        sizer: sizer,
        speed: 600,
      });

      Array.from(btns).forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let group, isActive;
          e.preventDefault();
          isActive = btn.classList.contains("active");

          if (!isActive) {
            group = btn.getElementsByTagName("a")[0].getAttribute("data-group");
            $(".active").removeClass("active");
            btn.classList.toggle("active");
            shfl.filter(group);
          }
        });
      });
    }
  },
};
