import * as $ from "jquery";
import Velocity from "velocity-animate";
import CONSTANTS from "./utils";
const scrollMagic = require("scrollmagic");
const theaterJS = require("theaterjs");
($ as any).velocity = Velocity;

const animate = {
  // TODO: fix, the object is always empty, find solution
  inputAnimation: (object: any) => {
    const that = object;
    $(".form-control")
      .on("focusin", (object) => {
        const obj = $(object).parent().find(".pencil-name") as any;
        if ($(object).val() === "") {
          obj.velocity({ y: "15px", opacity: 1 }, 500, "out");
          obj.next().velocity({ y: "0px" }, 500, "in");
        }
        that.visibilityToggle(obj.next());
      })
      .on("focusout", (object) => {
        const obj = $(object).parent().find(".pencil-name") as any;
        if ($(object).val() === "") {
          obj.velocity({ y: "0px", opacity: 0 }, 500, "in");
          obj.next().velocity({ y: "15px" }, 500, "out");
        }
        that.visibilityToggle(obj.next());
      });

    $.support.placeholder = ((object) => {
      const i = document.createElement("input");
      return "placeholder" in i;
    })();

    if ($.support.placeholder) {
      $(".form-label").each(() => {
        $(object).addClass("js-hide-label");
      });

      $(".form-group")
        .find("input, textarea")
        .on("keyup blur focus", function (e) {
          const that = $(object),
            parent = that.parent().find("label");

          if (e.type === "keyup") {
            if (that.val() === "") {
              parent.addClass("js-hide-label");
            } else {
              parent.removeClass("js-hide-label");
            }
          } else if (e.type === "blur") {
            if (that.val() === "") {
              parent.addClass("js-hide-label");
            } else {
              parent.removeClass("js-hide-label").addClass("js-unhighlight-label");
            }
          } else if (e.type === "focus") {
            if (that.val() !== "") {
              parent.removeClass("js-unhighlight-label");
            }
          }
        });
    }
  },

  visibilityToggle: function (obj: any) {
    if (obj.css("visibility") === "hidden") {
      obj.css("visibility", "visible");
    } else {
      obj.css("visibility", "hidden");
    }
  },

  rippleEffect: () => {
    $(".svg-wrapper").on("click", (event, object) => {
      event.preventDefault();

      const divCreated = $("<div/>");
      const btnOffset = $(object).offset();
      const xPos = btnOffset && event.pageX - btnOffset.left;
      const yPos = btnOffset && event.pageY - btnOffset.top;

      divCreated.addClass("ripple-effect");
      const ripple = $(".ripple-effect");

      ripple.css("height", $(object).height() || 0);
      ripple.css("width", $(object).height() || 0);

      if (yPos && xPos && ripple) {
        divCreated
          .css({
            top: yPos - (ripple.height() || 2) / 2,
            left: xPos - (ripple.width() || 2) / 2,
            background: $(object).data("ripple-color"),
          })
          .appendTo($(object));
      }

      window.setTimeout(() => {
        divCreated.remove();
      }, 2000);
    });
  },

  showEmailSendFinished: () => {
    const textArea = $(".hidden-text-success") as any;
    textArea.velocity({ opacity: "1" }, { duration: 1500, easing: "easeOutExpo" });
  },

  postToGoogle: (data: { name?: string; email?: string; message?: string; status?: any }) => {
    const successMsg = "Thanks! I'll be in touch shortly.";
    const errorMsg =
      "Sorry, there's been an error, please email me directly at <a href='mailto:hello@agustinvaleriani.com'>hello@agustinvaleriani.com</a>";
    const message = $(".hidden-email-message");
    const image = $(".hidden-email-image");
    $.ajax({
      url: CONSTANTS.GOOGLE_FORM_URL,
      data: {
        "entry.1592497313": data.name,
        "entry.335030587": data.email,
        "entry.1421954823": data.email,
        "entry.1116466754": data.message,
      },
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: () => {
          $("#mail-loader").hide();
          message.html(successMsg);
          image.attr("src", "/assets/images/success.png");
          animate.showEmailSendFinished();
        },
        200: () => {
          $("#mail-loader").hide();
          if (data?.status === "error") {
            message.html(errorMsg);
            image.attr("src", "/assets/images/error.png");
          } else {
            message.html(successMsg);
            image.attr("src", "/assets/images/success.png");
          }
          animate.showEmailSendFinished();
        },
      },
      error: () => {
        $("#mail-loader").hide();
        message.html(errorMsg);
        image.attr("src", "/assets/images/error.png");
        animate.showEmailSendFinished();
      },
    });
  },

  emailSend: () => {
    $("#btn-send").on("click", function (e) {
      e.preventDefault();

      const name = $("#name");
      const email = $("#email");
      const subject = $("#subject");
      const message = $("#message");

      const isValid = name.val() !== "" && email.val() !== "" && subject.val() !== "" && message.val() !== "";

      if (isValid) {
        const item = $("#hidden-contactform").css("display", "block") as any;
        item
          .velocity(
            { height: "730px" },
            {
              duration: 1500,
              easing: "easeOutExpo",
            }
          )
          .find("#mail-loader")
          .delay(500)
          .show();

        const data = {
          name: name.val() as string,
          email: email.val() as string,
          subject: subject.val() as string,
          message: message.val() as string,
        };
        animate.postToGoogle(data);
      } else {
        if (name.val() === "") name.css({ border: "1px solid red" });
        if (email.val() === "") email.css({ border: "1px solid red" });
        if (subject.val() === "") subject.css({ border: "1px solid red" });
        if (message.val() === "") message.css({ border: "1px solid red" });

        name.on("focus", () => name.attr("style", ""));
        email.on("focus", () => email.attr("style", ""));
        subject.on("focus", () => subject.attr("style", ""));
        message.on("focus", () => message.attr("style", ""));
      }
    });
  },

  hexagonRotate: () => {
    $(document).on(
      {
        mouseenter: (object) => {
          $(object).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
          $(object).find(".hexagon").css("background-color", "#070606");
          $(object).find(".hexagon-icon-position").css("color", "#E3B673");
        },

        mouseleave: (object) => {
          $(object).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
          $(object).find(".hexagon").css("background-color", "#E3B673");
          $(object).find(".hexagon-icon-position").css("color", "#070606");
        },
      },
      ".hexagon-wrapper"
    );
  },

  hideMoreBtnMobile: () => {
    //If is touchscreen, the "+ More" button in works is always visible
    if ("ontouchstart" in window) {
      $(".info").addClass("work-button-mobile");
    } else {
      $(".info").removeClass("work-button-mobile");
    }
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
    $(".arrow-down").on("click", (e) => {
      e.preventDefault();
      const position = $("#about").offset()?.top;

      const body = $("html,body") as any;
      body.velocity("scroll", {
        duration: 3000,
        offset: position,
        easing: "easeOutQuart",
      });
    });
  },
};

export default animate;
