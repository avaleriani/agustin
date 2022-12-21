const Shuffle = require("shufflejs");
const tiltjs = require("vanilla-tilt");

const app = {
  loadApplication: () => {
    Array.from(document.getElementsByClassName("view")).forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        e.preventDefault();
        return false;
      });
    });

    const element = document.querySelector(".tilted") as HTMLElement;
    const tiltConfig = {
      reverse: false,
      max: 22,
      startX: 0,
      startY: 10,
      perspective: 1000,
      speed: 200,
      transition: true,
      "mouse-event-element": "body",
    };
    tiltjs.init(element, tiltConfig);
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
            Array.from(document.querySelectorAll(".active")).forEach((el) => el.classList.remove("active"));
            btn.classList.toggle("active");
            shfl.filter(group);
          }
        });
      });
    }
  },
};

export default app;
