var $ = require("jquery");
window.jQuery = window.$ = $;
var velocity = require("velocity-animate");
delete window.jQuery;
delete window.$;
var scrollMagic = require("scrollmagic");
var theaterJS = require("theaterjs");

var animate = {
  inputAnimation: function () {
    var that = this;
    $(".form-control")
      .focusin(function () {
        var obj = $(this).parent().find(".pencil-name");
        if ($(this).val() === "") {
          obj.velocity({ y: "15px", opacity: 1 }, 500, "out");
          obj.next().velocity({ y: "0px" }, 500, "in");
        }
        that.visibilityToggle(obj.next());
      })
      .focusout(function () {
        var obj = $(this).parent().find(".pencil-name");
        if ($(this).val() === "") {
          obj.velocity({ y: "0px", opacity: 0 }, 500, "in");
          obj.next().velocity({ y: "15px" }, 500, "out");
        }
        that.visibilityToggle(obj.next());
      });

    $.support.placeholder = (function () {
      var i = document.createElement("input");
      return "placeholder" in i;
    })();

    if ($.support.placeholder) {
      $(".form-label").each(function () {
        $(this).addClass("js-hide-label");
      });

      $(".form-group")
        .find("input, textarea")
        .on("keyup blur focus", function (e) {
          var that = $(this),
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

  visibilityToggle: function (obj) {
    if (obj.css("visibility") === "hidden") {
      obj.css("visibility", "visible");
    } else {
      obj.css("visibility", "hidden");
    }
  },

  rippleEffect: function () {
    $(".svg-wrapper").on("click", function (event) {
      event.preventDefault();

      var divCreated = $("<div/>"),
        btnOffset = $(this).offset(),
        xPos = event.pageX - btnOffset.left,
        yPos = event.pageY - btnOffset.top;

      divCreated.addClass("ripple-effect");
      var ripple = $(".ripple-effect");

      ripple.css("height", $(this).height());
      ripple.css("width", $(this).height());
      divCreated
        .css({
          top: yPos - ripple.height() / 2,
          left: xPos - ripple.width() / 2,
          background: $(this).data("ripple-color"),
        })
        .appendTo($(this));

      window.setTimeout(function () {
        divCreated.remove();
      }, 2000);
    });
  },

  showEmailSendFinished: function () {
    $(".hidden-text-success").velocity({ opacity: "1" }, { duration: 1500, easing: "easeOutExpo" });
  },

  postToGoogle: function (data) {
    var successMsg = "Thanks! I'll be in touch shortly.";
    var errorMsg =
      "Sorry, there's been an error, please email me at <a href='mailto:hello@agustinvaleriani.com'>hello@agustinvaleriani.com</a>";
    var message = $(".hidden-email-message");
    var image = $(".hidden-email-image");
    $.ajax({
      url: "https://docs.google.com/forms/d/1U6VHwNJcCFZqyBwxjwsUvFNQyIOLhiJaCN4FOX8vwXM/formResponse",
      data: {
        "entry.1592497313": data.name,
        "entry.335030587": data.email,
        "entry.1421954823": data.email,
        "entry.1116466754": data.message,
      },
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $("#mail-loader").hide();
          message.html(successMsg);
          image.attr("src", "/assets/images/success.png");
          animate.showEmailSendFinished();
        },
        200: function () {
          // $("#mail-loader").hide();
          // if (data.status === 'error') {
          //   message.html(errorMsg);
          //   image.attr('src', '/assets/images/error.png');
          // } else {
          //   message.html(successMsg);
          //   image.attr('src', '/assets/images/success.png');
          // }
          // animate.showEmailSendFinished();

          $("#mail-loader").hide();
          message.html(successMsg);
          image.attr("src", "/assets/images/success.png");
          animate.showEmailSendFinished();
        },
      },
      // error: function() {
      //   $("#mail-loader").hide();
      //   message.html(errorMsg);
      //   image.attr('src', '/assets/images/error.png');
      //   animate.showEmailSendFinished();
      // }
    });
  },

  emailSend: function () {
    $("#btn-send").on("click", function (e) {
      e.preventDefault();

      $("#hidden-contactform")
        .css("display", "block")
        .velocity(
          { height: "650px" },
          {
            duration: 1500,
            easing: "easeOutExpo",
          }
        )
        .find("#mail-loader")
        .delay(500)
        .show();

      const data = {
        name: $("#name").val(),
        email: $("#email").val(),
        subject: $("#subject").val(),
        message: $("#message").val(),
      };
      animate.postToGoogle(data);
    });
  },

  hexagonRotate: function () {
    $(document).on(
      {
        mouseenter: function () {
          $(this).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
          $(this).find(".hexagon").css("background-color", "#000000");
          $(this).find(".hexagon-icon-position").css("color", "#E3B673");
        },

        mouseleave: function () {
          $(this).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
          $(this).find(".hexagon").css("background-color", "#E3B673");
          $(this).find(".hexagon-icon-position").css("color", "#000000");
        },
      },
      ".hexagon-wrapper"
    );
  },

  hideMoreBtnMobile: function () {
    //If is touchscreen, the "+ More" button in works is always visible
    if (!!("ontouchstart" in window)) {
      $(".info").addClass("work-button-mobile");
    } else {
      $(".info").removeClass("work-button-mobile");
    }
  },

  typingEffect: function () {
    try {
      var controller = new scrollMagic.Controller();

      var theater = theaterJS();
      theater.on("type:start, erase:start", function () {
        var actor = theater.getCurrentActor();
        actor.$element.classList.add("is-typing");
      });

      theater.addActor("typing");
      theater.addScene("typing:Hello", 200);

      //typing about
      new scrollMagic.Scene({ triggerElement: "#about", duration: 200, offset: -150, reverse: false })
        .addTo(controller)
        .on("start", function () {
          theater.addActor("about");
          theater.addScene("about:About.", 300);
        });

      //typing work
      new scrollMagic.Scene({ triggerElement: "#work", duration: 200, offset: -150, reverse: false })
        .addTo(controller)
        .on("start", function () {
          theater.addActor("work");
          theater.addScene("work:Work.", 300);
        });

      //typing contact
      new scrollMagic.Scene({ triggerElement: "#contact", duration: 200, offset: -150, reverse: false })
        .addTo(controller)
        .on("start", function () {
          theater.addActor("contact", { accuracy: 0.4 });
          theater.addScene("contact:Contact.", 300);
        });
    } catch (e) {
      console.log("No element for typing");
    }
  },

  scrollArrow: function () {
    $(".arrow-down").on("click", function (e) {
      e.preventDefault();
      return $("html,body").animate({
        scrollTop: $("#page-about").offset().top,
      });
    });
  },
};

module.exports = animate;
