import * as $ from "jquery";
import * as FastClick from "fastclick";
import Shuffle from "shufflejs";
import VanillaTilt from "vanilla-tilt";

const app = {
  loadApplication: () => {
    const touch = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    $(".view").on("click", function (e) {
      e.preventDefault();
      return false;
    });
    if (touch) {
      return FastClick(document.body);
    }

    const element = document.querySelector(".brand-logo") as HTMLElement;
    VanillaTilt.init(element);
  },

  worksFilter: () => {
    const grid = document.getElementById("work-grid");
    const sizer = document.getElementsByClassName("shuffle__sizer")[0] as HTMLElement;
    const btns = document.getElementsByClassName("svg-wrapper");
    if (grid) {
      const shfl = new Shuffle(grid, {
        itemSelector: ".work-item",
        easing: "ease-in-out",
        sizer: sizer,
        speed: 600,
      });

      Array.from(btns).forEach((btn: Element) => {
        btn.addEventListener("click", (e) => {
          let group, isActive;
          e.preventDefault();
          isActive = btn.classList.contains("active");

          if (!isActive) {
            group = btn.getElementsByTagName("a")[0].getAttribute("data-group") || undefined;
            $(".active").removeClass("active");
            btn.classList.toggle("active");
            shfl.filter(group);
          }
        });
      });
    }
  },
};

export default app;
