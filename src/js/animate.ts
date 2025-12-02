import Velocity from "velocity-animate";
import CONSTANTS from "./constants";
import { getOffset, validateEmail } from "./utils";
const scrollMagic = require("scrollmagic");
const theaterJS = require("theaterjs");

const animate = {
  inputAnimation: () => {
    const onFormGroupEvent = (event: Event) => {
      const currentInput = event.currentTarget as HTMLInputElement;
      const parentLabel = currentInput.parentNode?.querySelector("label") as HTMLElement;

      if (event.type === "keyup") {
        if (currentInput.value === "") {
          parentLabel.classList.add("js-hide-label");
        } else {
          parentLabel.classList.remove("js-hide-label");
        }
      } else if (event.type === "blur") {
        if (currentInput.value === "") {
          parentLabel.classList.add("js-hide-label");
        } else {
          parentLabel.classList.remove("js-hide-label");
        }
      }
    };

    const formControls = Array.from(document.getElementsByClassName("form-control"));
    formControls.forEach((formControl) => {
      formControl.addEventListener("focusin", (event: Event) => {
        const selectedInput = event.currentTarget as HTMLElement;
        const selectedPencil = selectedInput.previousElementSibling?.querySelector(".pencil-name") as any;
        if ((selectedInput as HTMLInputElement).value === "") {
          selectedPencil.velocity({ y: "15px", opacity: 1 }, 500, "out");
          (selectedPencil.nextElementSibling as any).velocity({ y: "0px", opacity: 1 }, 500, "in");
        }
        animate.visibilityToggle(selectedPencil.nextElementSibling);
      });

      formControl.addEventListener("focusout", (event: Event) => {
        const selectedInput = event.currentTarget as HTMLElement;
        const selectedPencil = selectedInput.previousElementSibling?.querySelector(".pencil-name") as any;
        if ((selectedInput as HTMLInputElement).value === "") {
          selectedPencil.velocity({ y: "0px", opacity: 0 }, 500, "in");
          (selectedPencil.nextElementSibling as any).velocity({ y: "15px", opacity: 0 }, 500, "out");
        }
        animate.visibilityToggle(selectedPencil.nextElementSibling);
      });
    });

    const isPlaceholderSupported = () => {
      const input = document.createElement("input");
      return "placeholder" in input;
    };

    if (isPlaceholderSupported()) {
      Array.from(document.getElementsByClassName("form-label")).forEach((label) => {
        label.classList.add("js-hide-label");
      });

      Array.from(document.getElementsByClassName("form-group")).forEach((formGroup) => {
        formGroup.querySelector("input, textarea")?.addEventListener("keyup", onFormGroupEvent);
        formGroup.querySelector("input, textarea")?.addEventListener("blur", onFormGroupEvent);
      });
    }
  },

  visibilityToggle: (element: HTMLElement) => {
    if (!element.style.visibility || element.style.visibility === "hidden") {
      element.style.visibility = "visible";
    } else {
      element.style.visibility = "hidden";
    }
  },

  rippleEffect: () => {
    Array.from(document.getElementsByClassName("svg-wrapper")).forEach((svgWrapper) => {
      svgWrapper.addEventListener("click", (event: Event) => {
        event.preventDefault();

        const buttonElement = event.currentTarget as HTMLElement;

        const divCreated = document.createElement("div");
        const btnOffset = getOffset(buttonElement);
        const xPos = btnOffset && (event as MouseEvent).pageX - btnOffset.left;
        const yPos = btnOffset && (event as MouseEvent).pageY - btnOffset.top;

        divCreated.classList.add("ripple-effect");
        divCreated.style.top = `${yPos - buttonElement.clientHeight / 2 + 20}px`;
        divCreated.style.left = `${xPos - buttonElement.clientHeight / 2 + 20}px`;
        divCreated.style.background = "#e3b673";

        buttonElement.appendChild(divCreated);

        window.setTimeout(() => {
          divCreated.remove();
        }, 2000);
      });
    });
  },

  showEmailSendFinished: () => {
    const textArea = document.getElementById("hidden-text-success") as HTMLElement;
    textArea.velocity({ opacity: "1" }, { duration: 1500, easing: "easeOutExpo" });
  },

  submitContactForm: async (data: { name?: string; email?: string; subject?: string; message?: string }): Promise<boolean> => {
    const title = `Contact: ${data.subject || "Form submission"} from ${data.name}`;
    const body = `**From:** ${data.name}\n**Email:** ${data.email}\n\n**Message:**\n${data.message}`;

    try {
      const response = await fetch(CONSTANTS.GITHUB_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `token ${CONSTANTS.GITHUB_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          labels: ["contact-form"],
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      return false;
    }
  },

  emailSend: () => {
    document.getElementById("btn-send")?.addEventListener("click", async (e) => {
      e.preventDefault();

      const button = e.currentTarget as HTMLElement;

      const name = document.getElementById("name") as HTMLInputElement;
      const email = document.getElementById("email") as HTMLInputElement;
      const subject = document.getElementById("subject") as HTMLInputElement;
      const message = document.getElementById("message") as HTMLTextAreaElement;

      const isValid = name.value !== "" && email.value !== "" && validateEmail(email.value) && subject.value !== "" && message.value !== "";

      if (isValid) {
        const item = document.getElementById("hidden-contactform");
        const mailLoader = document.getElementById("mail-loader");
        if (item && mailLoader) {
          item.style.display = "block";
          item.velocity(
            { height: "730px" },
            {
              duration: 1500,
              easing: "easeOutExpo",
            }
          );
          Velocity(mailLoader, { opacity: "1" }, { duration: 500, easing: "easeOutExpo" });

          const data = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
          };

          const success = await animate.submitContactForm(data);
          
          Velocity(mailLoader, { opacity: "0" }, { duration: 300 });
          
          if (success) {
            animate.showEmailSendFinished();
            // Clear form
            name.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
          } else {
            alert("Failed to send message. Please try again.");
          }
        }
      } else {
        if (name.value === "") name.style.border = "1px solid red";
        if (email.value === "" || !validateEmail(email.value)) email.style.border = "1px solid red";
        if (subject.value === "") subject.style.border = "1px solid red";
        if (message.value === "") message.style.border = "1px solid red";

        name.addEventListener("focus", () => (name.style.border = ""));
        email.addEventListener("focus", () => (email.style.border = ""));
        subject.addEventListener("focus", () => (subject.style.border = ""));
        message.addEventListener("focus", () => (message.style.border = ""));

        setTimeout(() => {
          button.parentElement?.parentElement?.classList.remove("active");
        }, 300);
      }
    });
  },

  hexagonRotate: () => {
    Array.from(document.getElementsByClassName("hexagon-wrapper")).forEach((hexagonWrapper: Element) => {
      hexagonWrapper.addEventListener("mouseenter", (event) => {
        const currentHexagon = event.currentTarget as HTMLElement;
        const iconPosition = currentHexagon.querySelector(".hexagon-icon-position") as HTMLElement;
        iconPosition?.classList.toggle("hexagon-hover-rotate");
        (currentHexagon.querySelector(".hexagon") as HTMLElement).style.backgroundColor = "#070606";
        iconPosition.style.color = "#E3B673";
      });

      hexagonWrapper.addEventListener("mouseleave", (event) => {
        const currentHexagon = event.currentTarget as HTMLElement;
        const iconPosition = currentHexagon.querySelector(".hexagon-icon-position") as HTMLElement;
        iconPosition?.classList.toggle("hexagon-hover-rotate");
        (currentHexagon.querySelector(".hexagon") as HTMLElement).style.backgroundColor = "#E3B673";
        iconPosition.style.color = "#070606";
      });
    });
  },

  hideMoreBtnMobile: () => {
    const infos = Array.from(document.getElementsByClassName("info"));
    //If is touchscreen, the "+ More" button in works is always visible
    infos.forEach((info) => {
      if ("ontouchstart" in window) {
        info.classList.add("work-button-mobile");
      } else {
        info.classList.remove("work-button-mobile");
      }
    });
  },

  typingEffect: () => {
    try {
      const controller = new scrollMagic.Controller();

      const theater = theaterJS();
      theater.on("type:start, erase:start", () => {
        const actor = theater.getCurrentActor();
        actor.$element.classList.add("is-typing");
      });

      theater.addActor("typing");
      theater.addScene("typing:Hello", 200);

      //typing about
      new scrollMagic.Scene({ triggerElement: "#about", duration: 200, offset: -150, reverse: true }).addTo(controller).on("start", () => {
        theater.addActor("about");
        theater.addScene("about:About.", 300);
      });

      //typing work
      new scrollMagic.Scene({ triggerElement: "#work", duration: 200, offset: -150, reverse: true }).addTo(controller).on("start", () => {
        theater.addActor("work");
        theater.addScene("work:Work.", 300);
      });

      //typing contact
      new scrollMagic.Scene({ triggerElement: "#contact", duration: 200, offset: -150, reverse: true })
        .addTo(controller)
        .on("start", () => {
          theater.addActor("contact", { accuracy: 0.4 });
          theater.addScene("contact:Contact.", 300);
        });
    } catch (e) {
      console.log("No element for typing");
    }
  },

  scrollArrow: () => {
    document.getElementById("arrow-down")?.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  },
};

export default animate;
