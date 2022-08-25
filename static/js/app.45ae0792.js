/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3001:
/*!***************************!*\
  !*** ./src/js/animate.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! jquery */ 3836);

window.jQuery = window.$ = $;

var velocity = __webpack_require__(/*! velocity-animate */ 9182);

delete window.jQuery;
delete window.$;

var scrollMagic = __webpack_require__(/*! scrollmagic */ 6239);

var theaterJS = __webpack_require__(/*! theaterjs */ 3164);

var animate = {
  inputAnimation: function inputAnimation() {
    var that = this;
    $(".form-control").focusin(function () {
      var obj = $(this).parent().find(".pencil-name");

      if ($(this).val() === "") {
        obj.velocity({
          y: "15px",
          opacity: 1
        }, 500, "out");
        obj.next().velocity({
          y: "0px"
        }, 500, "in");
      }

      that.visibilityToggle(obj.next());
    }).focusout(function () {
      var obj = $(this).parent().find(".pencil-name");

      if ($(this).val() === "") {
        obj.velocity({
          y: "0px",
          opacity: 0
        }, 500, "in");
        obj.next().velocity({
          y: "15px"
        }, 500, "out");
      }

      that.visibilityToggle(obj.next());
    });

    $.support.placeholder = function () {
      var i = document.createElement("input");
      return "placeholder" in i;
    }();

    if ($.support.placeholder) {
      $(".form-label").each(function () {
        $(this).addClass("js-hide-label");
      });
      $(".form-group").find("input, textarea").on("keyup blur focus", function (e) {
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
  visibilityToggle: function visibilityToggle(obj) {
    if (obj.css("visibility") === "hidden") {
      obj.css("visibility", "visible");
    } else {
      obj.css("visibility", "hidden");
    }
  },
  rippleEffect: function rippleEffect() {
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
      divCreated.css({
        top: yPos - ripple.height() / 2,
        left: xPos - ripple.width() / 2,
        background: $(this).data("ripple-color")
      }).appendTo($(this));
      window.setTimeout(function () {
        divCreated.remove();
      }, 2000);
    });
  },
  showEmailSendFinished: function showEmailSendFinished() {
    $(".hidden-text-success").velocity({
      opacity: "1"
    }, {
      duration: 1500,
      easing: "easeOutExpo"
    });
  },
  postToGoogle: function postToGoogle(data) {
    var successMsg = "Thanks! I'll be in touch shortly.";
    var errorMsg = "Sorry, there's been an error, please email me at <a href='mailto:hello@agustinvaleriani.com'>hello@agustinvaleriani.com</a>";
    var message = $(".hidden-email-message");
    var image = $(".hidden-email-image");
    $.ajax({
      url: "https://docs.google.com/forms/d/1U6VHwNJcCFZqyBwxjwsUvFNQyIOLhiJaCN4FOX8vwXM/formResponse",
      data: {
        "entry.1592497313": data.name,
        "entry.335030587": data.email,
        "entry.1421954823": data.email,
        "entry.1116466754": data.message
      },
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function _() {
          $("#mail-loader").hide();
          message.html(successMsg);
          image.attr("src", "/assets/images/success.png");
          animate.showEmailSendFinished();
        },
        200: function _() {
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
        }
      } // error: function() {
      //   $("#mail-loader").hide();
      //   message.html(errorMsg);
      //   image.attr('src', '/assets/images/error.png');
      //   animate.showEmailSendFinished();
      // }

    });
  },
  emailSend: function emailSend() {
    $("#btn-send").on("click", function (e) {
      e.preventDefault();
      $("#hidden-contactform").css("display", "block").velocity({
        height: "650px"
      }, {
        duration: 1500,
        easing: "easeOutExpo"
      }).find("#mail-loader").delay(500).show();
      var data = {
        name: $("#name").val(),
        email: $("#email").val(),
        subject: $("#subject").val(),
        message: $("#message").val()
      };
      animate.postToGoogle(data);
    });
  },
  hexagonRotate: function hexagonRotate() {
    $(document).on({
      mouseenter: function mouseenter() {
        $(this).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
        $(this).find(".hexagon").css("background-color", "#000000");
        $(this).find(".hexagon-icon-position").css("color", "#E3B673");
      },
      mouseleave: function mouseleave() {
        $(this).find(".hexagon-icon-position").toggleClass("hexagon-hover-rotate");
        $(this).find(".hexagon").css("background-color", "#E3B673");
        $(this).find(".hexagon-icon-position").css("color", "#000000");
      }
    }, ".hexagon-wrapper");
  },
  hideMoreBtnMobile: function hideMoreBtnMobile() {
    //If is touchscreen, the "+ More" button in works is always visible
    if (!!("ontouchstart" in window)) {
      $(".info").addClass("work-button-mobile");
    } else {
      $(".info").removeClass("work-button-mobile");
    }
  },
  typingEffect: function typingEffect() {
    try {
      var controller = new scrollMagic.Controller();
      var theater = theaterJS();
      theater.on("type:start, erase:start", function () {
        var actor = theater.getCurrentActor();
        actor.$element.classList.add("is-typing");
      });
      theater.addActor("typing");
      theater.addScene("typing:Hello", 200); //typing about

      new scrollMagic.Scene({
        triggerElement: "#about",
        duration: 200,
        offset: -150,
        reverse: false
      }).addTo(controller).on("start", function () {
        theater.addActor("about");
        theater.addScene("about:About.", 300);
      }); //typing work

      new scrollMagic.Scene({
        triggerElement: "#work",
        duration: 200,
        offset: -150,
        reverse: false
      }).addTo(controller).on("start", function () {
        theater.addActor("work");
        theater.addScene("work:Work.", 300);
      }); //typing contact

      new scrollMagic.Scene({
        triggerElement: "#contact",
        duration: 200,
        offset: -150,
        reverse: false
      }).addTo(controller).on("start", function () {
        theater.addActor("contact", {
          accuracy: 0.4
        });
        theater.addScene("contact:Contact.", 300);
      });
    } catch (e) {
      console.log("No element for typing");
    }
  },
  scrollArrow: function scrollArrow() {
    $(".arrow-down").on("click", function (e) {
      e.preventDefault();
      return $("html,body").animate({
        scrollTop: $("#page-about").offset().top
      });
    });
  }
};
module.exports = animate;

/***/ }),

/***/ 9086:
/*!*******************************!*\
  !*** ./src/js/work-viewer.js ***!
  \*******************************/
/***/ ((module) => {

var workViewer = {
  init: function init() {
    var elements = document.querySelectorAll(".work-item");

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", workViewer.activate, false);
    }

    var elem2 = document.querySelectorAll(".overlay-close");

    for (i = 0; i < elem2.length; i++) {
      elem2[i].addEventListener("click", workViewer.deactivate, false);
    }
  },
  activate: function activate() {
    var currElem = this.nextElementSibling;

    if (!currElem.classList.contains("open")) {
      //if it's closed
      document.addEventListener("keyup", workViewer.deactivateWithEscape, false);
      currElem.classList.add("open");
      currElem.querySelector(".overlay-title-text").classList.add("overlay-title-effect");
    }
  },
  deactivate: function deactivate() {
    var elem = document.querySelector(".open");
    elem.classList.remove("open");
    elem.querySelector(".overlay-title-text").classList.remove("overlay-title-effect");
  },
  deactivateWithEscape: function deactivateWithEscape(e) {
    var code = e.keyCode || e.which;

    if (code === 27) {
      var elem = document.querySelector(".open");
      elem.classList.remove("open");
      elem.querySelector(".overlay-title-text").classList.remove("overlay-title-effect");
    }
  }
};
module.exports = workViewer;

/***/ }),

/***/ 2856:
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 6656:
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ 8309:
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 1489:
/*!*************************************************!*\
  !*** ./node_modules/fastclick/lib/fastclick.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;;

(function () {
  'use strict';
  /**
   * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
   *
   * @codingstandard ftlabs-jsv2
   * @copyright The Financial Times Limited [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   */

  /*jslint browser:true, node:true*/

  /*global define, Event, Node*/

  /**
   * Instantiate fast-clicking listeners on the specified layer.
   *
   * @constructor
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */

  function FastClick(layer, options) {
    var oldOnClick;
    options = options || {};
    /**
     * Whether a click is currently being tracked.
     *
     * @type boolean
     */

    this.trackingClick = false;
    /**
     * Timestamp for when click tracking started.
     *
     * @type number
     */

    this.trackingClickStart = 0;
    /**
     * The element being tracked for a click.
     *
     * @type EventTarget
     */

    this.targetElement = null;
    /**
     * X-coordinate of touch start event.
     *
     * @type number
     */

    this.touchStartX = 0;
    /**
     * Y-coordinate of touch start event.
     *
     * @type number
     */

    this.touchStartY = 0;
    /**
     * ID of the last touch, retrieved from Touch.identifier.
     *
     * @type number
     */

    this.lastTouchIdentifier = 0;
    /**
     * Touchmove boundary, beyond which a click will be cancelled.
     *
     * @type number
     */

    this.touchBoundary = options.touchBoundary || 10;
    /**
     * The FastClick layer.
     *
     * @type Element
     */

    this.layer = layer;
    /**
     * The minimum time between tap(touchstart and touchend) events
     *
     * @type number
     */

    this.tapDelay = options.tapDelay || 200;
    /**
     * The maximum time for a tap
     *
     * @type number
     */

    this.tapTimeout = options.tapTimeout || 700;

    if (FastClick.notNeeded(layer)) {
      return;
    } // Some old versions of Android don't have Function.prototype.bind


    function bind(method, context) {
      return function () {
        return method.apply(context, arguments);
      };
    }

    var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
    var context = this;

    for (var i = 0, l = methods.length; i < l; i++) {
      context[methods[i]] = bind(context[methods[i]], context);
    } // Set up event handlers as required


    if (deviceIsAndroid) {
      layer.addEventListener('mouseover', this.onMouse, true);
      layer.addEventListener('mousedown', this.onMouse, true);
      layer.addEventListener('mouseup', this.onMouse, true);
    }

    layer.addEventListener('click', this.onClick, true);
    layer.addEventListener('touchstart', this.onTouchStart, false);
    layer.addEventListener('touchmove', this.onTouchMove, false);
    layer.addEventListener('touchend', this.onTouchEnd, false);
    layer.addEventListener('touchcancel', this.onTouchCancel, false); // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
    // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
    // layer when they are cancelled.

    if (!Event.prototype.stopImmediatePropagation) {
      layer.removeEventListener = function (type, callback, capture) {
        var rmv = Node.prototype.removeEventListener;

        if (type === 'click') {
          rmv.call(layer, type, callback.hijacked || callback, capture);
        } else {
          rmv.call(layer, type, callback, capture);
        }
      };

      layer.addEventListener = function (type, callback, capture) {
        var adv = Node.prototype.addEventListener;

        if (type === 'click') {
          adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
            if (!event.propagationStopped) {
              callback(event);
            }
          }), capture);
        } else {
          adv.call(layer, type, callback, capture);
        }
      };
    } // If a handler is already declared in the element's onclick attribute, it will be fired before
    // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
    // adding it as listener.


    if (typeof layer.onclick === 'function') {
      // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
      // - the old one won't work if passed to addEventListener directly.
      oldOnClick = layer.onclick;
      layer.addEventListener('click', function (event) {
        oldOnClick(event);
      }, false);
      layer.onclick = null;
    }
  }
  /**
  * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
  *
  * @type boolean
  */


  var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
  /**
   * Android requires exceptions.
   *
   * @type boolean
   */

  var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
  /**
   * iOS requires exceptions.
   *
   * @type boolean
   */

  var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
  /**
   * iOS 4 requires an exception for select elements.
   *
   * @type boolean
   */

  var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
  /**
   * iOS 6.0-7.* requires the target element to be manually derived
   *
   * @type boolean
   */

  var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);
  /**
   * BlackBerry requires exceptions.
   *
   * @type boolean
   */

  var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
  /**
   * Determine whether a given element requires a native click.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element needs a native click
   */

  FastClick.prototype.needsClick = function (target) {
    switch (target.nodeName.toLowerCase()) {
      // Don't send a synthetic click to disabled inputs (issue #62)
      case 'button':
      case 'select':
      case 'textarea':
        if (target.disabled) {
          return true;
        }

        break;

      case 'input':
        // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
        if (deviceIsIOS && target.type === 'file' || target.disabled) {
          return true;
        }

        break;

      case 'label':
      case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames

      case 'video':
        return true;
    }

    return /\bneedsclick\b/.test(target.className);
  };
  /**
   * Determine whether a given element requires a call to focus to simulate click into element.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
   */


  FastClick.prototype.needsFocus = function (target) {
    switch (target.nodeName.toLowerCase()) {
      case 'textarea':
        return true;

      case 'select':
        return !deviceIsAndroid;

      case 'input':
        switch (target.type) {
          case 'button':
          case 'checkbox':
          case 'file':
          case 'image':
          case 'radio':
          case 'submit':
            return false;
        } // No point in attempting to focus disabled inputs


        return !target.disabled && !target.readOnly;

      default:
        return /\bneedsfocus\b/.test(target.className);
    }
  };
  /**
   * Send a click event to the specified element.
   *
   * @param {EventTarget|Element} targetElement
   * @param {Event} event
   */


  FastClick.prototype.sendClick = function (targetElement, event) {
    var clickEvent, touch; // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)

    if (document.activeElement && document.activeElement !== targetElement) {
      document.activeElement.blur();
    }

    touch = event.changedTouches[0]; // Synthesise a click event, with an extra attribute so it can be tracked

    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
  };

  FastClick.prototype.determineEventType = function (targetElement) {
    //Issue #159: Android Chrome Select Box does not open with a synthetic click event
    if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
      return 'mousedown';
    }

    return 'click';
  };
  /**
   * @param {EventTarget|Element} targetElement
   */


  FastClick.prototype.focus = function (targetElement) {
    var length; // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.

    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
      length = targetElement.value.length;
      targetElement.setSelectionRange(length, length);
    } else {
      targetElement.focus();
    }
  };
  /**
   * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
   *
   * @param {EventTarget|Element} targetElement
   */


  FastClick.prototype.updateScrollParent = function (targetElement) {
    var scrollParent, parentElement;
    scrollParent = targetElement.fastClickScrollParent; // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
    // target element was moved to another parent.

    if (!scrollParent || !scrollParent.contains(targetElement)) {
      parentElement = targetElement;

      do {
        if (parentElement.scrollHeight > parentElement.offsetHeight) {
          scrollParent = parentElement;
          targetElement.fastClickScrollParent = parentElement;
          break;
        }

        parentElement = parentElement.parentElement;
      } while (parentElement);
    } // Always update the scroll top tracker if possible.


    if (scrollParent) {
      scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
    }
  };
  /**
   * @param {EventTarget} targetElement
   * @returns {Element|EventTarget}
   */


  FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
    // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
    if (eventTarget.nodeType === Node.TEXT_NODE) {
      return eventTarget.parentNode;
    }

    return eventTarget;
  };
  /**
   * On touch start, record the position and scroll offset.
   *
   * @param {Event} event
   * @returns {boolean}
   */


  FastClick.prototype.onTouchStart = function (event) {
    var targetElement, touch, selection; // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).

    if (event.targetTouches.length > 1) {
      return true;
    }

    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];

    if (deviceIsIOS) {
      // Only trusted events will deselect text on iOS (issue #49)
      selection = window.getSelection();

      if (selection.rangeCount && !selection.isCollapsed) {
        return true;
      }

      if (!deviceIsIOS4) {
        // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
        // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
        // with the same identifier as the touch event that previously triggered the click that triggered the alert.
        // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
        // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
        // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
        // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
        // random integers, it's safe to to continue if the identifier is 0 here.
        if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
          event.preventDefault();
          return false;
        }

        this.lastTouchIdentifier = touch.identifier; // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
        // 1) the user does a fling scroll on the scrollable layer
        // 2) the user stops the fling scroll with another tap
        // then the event.target of the last 'touchend' event will be the element that was under the user's finger
        // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
        // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).

        this.updateScrollParent(targetElement);
      }
    }

    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY; // Prevent phantom clicks on fast double-tap (issue #36)

    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
      event.preventDefault();
    }

    return true;
  };
  /**
   * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
   *
   * @param {Event} event
   * @returns {boolean}
   */


  FastClick.prototype.touchHasMoved = function (event) {
    var touch = event.changedTouches[0],
        boundary = this.touchBoundary;

    if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
      return true;
    }

    return false;
  };
  /**
   * Update the last position.
   *
   * @param {Event} event
   * @returns {boolean}
   */


  FastClick.prototype.onTouchMove = function (event) {
    if (!this.trackingClick) {
      return true;
    } // If the touch has moved, cancel the click tracking


    if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
      this.trackingClick = false;
      this.targetElement = null;
    }

    return true;
  };
  /**
   * Attempt to find the labelled control for the given label element.
   *
   * @param {EventTarget|HTMLLabelElement} labelElement
   * @returns {Element|null}
   */


  FastClick.prototype.findControl = function (labelElement) {
    // Fast path for newer browsers supporting the HTML5 control attribute
    if (labelElement.control !== undefined) {
      return labelElement.control;
    } // All browsers under test that support touch events also support the HTML5 htmlFor attribute


    if (labelElement.htmlFor) {
      return document.getElementById(labelElement.htmlFor);
    } // If no for attribute exists, attempt to retrieve the first labellable descendant element
    // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label


    return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
  };
  /**
   * On touch end, determine whether to send a click event at once.
   *
   * @param {Event} event
   * @returns {boolean}
   */


  FastClick.prototype.onTouchEnd = function (event) {
    var forElement,
        trackingClickStart,
        targetTagName,
        scrollParent,
        touch,
        targetElement = this.targetElement;

    if (!this.trackingClick) {
      return true;
    } // Prevent phantom clicks on fast double-tap (issue #36)


    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
      this.cancelNextClick = true;
      return true;
    }

    if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
      return true;
    } // Reset to prevent wrong click cancel on input (issue #156).


    this.cancelNextClick = false;
    this.lastClickTime = event.timeStamp;
    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0; // On some iOS devices, the targetElement supplied with the event is invalid if the layer
    // is performing a transition or scroll, and has to be re-detected manually. Note that
    // for this to function correctly, it must be called *after* the event target is checked!
    // See issue #57; also filed as rdar://13048589 .

    if (deviceIsIOSWithBadTarget) {
      touch = event.changedTouches[0]; // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null

      targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
      targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }

    targetTagName = targetElement.tagName.toLowerCase();

    if (targetTagName === 'label') {
      forElement = this.findControl(targetElement);

      if (forElement) {
        this.focus(targetElement);

        if (deviceIsAndroid) {
          return false;
        }

        targetElement = forElement;
      }
    } else if (this.needsFocus(targetElement)) {
      // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
      // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
      if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
        this.targetElement = null;
        return false;
      }

      this.focus(targetElement);
      this.sendClick(targetElement, event); // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
      // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)

      if (!deviceIsIOS || targetTagName !== 'select') {
        this.targetElement = null;
        event.preventDefault();
      }

      return false;
    }

    if (deviceIsIOS && !deviceIsIOS4) {
      // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
      // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
      scrollParent = targetElement.fastClickScrollParent;

      if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
        return true;
      }
    } // Prevent the actual click from going though - unless the target node is marked as requiring
    // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.


    if (!this.needsClick(targetElement)) {
      event.preventDefault();
      this.sendClick(targetElement, event);
    }

    return false;
  };
  /**
   * On touch cancel, stop tracking the click.
   *
   * @returns {void}
   */


  FastClick.prototype.onTouchCancel = function () {
    this.trackingClick = false;
    this.targetElement = null;
  };
  /**
   * Determine mouse events which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */


  FastClick.prototype.onMouse = function (event) {
    // If a target element was never set (because a touch event was never fired) allow the event
    if (!this.targetElement) {
      return true;
    }

    if (event.forwardedTouchEvent) {
      return true;
    } // Programmatically generated events targeting a specific element should be permitted


    if (!event.cancelable) {
      return true;
    } // Derive and check the target element to see whether the mouse event needs to be permitted;
    // unless explicitly enabled, prevent non-touch click events from triggering actions,
    // to prevent ghost/doubleclicks.


    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
      // Prevent any user-added listeners declared on FastClick element from being fired.
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      } else {
        // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        event.propagationStopped = true;
      } // Cancel the event


      event.stopPropagation();
      event.preventDefault();
      return false;
    } // If the mouse event is permitted, return true for the action to go through.


    return true;
  };
  /**
   * On actual clicks, determine whether this is a touch-generated click, a click action occurring
   * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
   * an actual click which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */


  FastClick.prototype.onClick = function (event) {
    var permitted; // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.

    if (this.trackingClick) {
      this.targetElement = null;
      this.trackingClick = false;
      return true;
    } // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.


    if (event.target.type === 'submit' && event.detail === 0) {
      return true;
    }

    permitted = this.onMouse(event); // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.

    if (!permitted) {
      this.targetElement = null;
    } // If clicks are permitted, return true for the action to go through.


    return permitted;
  };
  /**
   * Remove all FastClick's event listeners.
   *
   * @returns {void}
   */


  FastClick.prototype.destroy = function () {
    var layer = this.layer;

    if (deviceIsAndroid) {
      layer.removeEventListener('mouseover', this.onMouse, true);
      layer.removeEventListener('mousedown', this.onMouse, true);
      layer.removeEventListener('mouseup', this.onMouse, true);
    }

    layer.removeEventListener('click', this.onClick, true);
    layer.removeEventListener('touchstart', this.onTouchStart, false);
    layer.removeEventListener('touchmove', this.onTouchMove, false);
    layer.removeEventListener('touchend', this.onTouchEnd, false);
    layer.removeEventListener('touchcancel', this.onTouchCancel, false);
  };
  /**
   * Check whether FastClick is needed.
   *
   * @param {Element} layer The layer to listen on
   */


  FastClick.notNeeded = function (layer) {
    var metaViewport;
    var chromeVersion;
    var blackberryVersion;
    var firefoxVersion; // Devices that don't support touch don't need FastClick

    if (typeof window.ontouchstart === 'undefined') {
      return true;
    } // Chrome version - zero for other browsers


    chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

    if (chromeVersion) {
      if (deviceIsAndroid) {
        metaViewport = document.querySelector('meta[name=viewport]');

        if (metaViewport) {
          // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
          if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
            return true;
          } // Chrome 32 and above with width=device-width or less don't need FastClick


          if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        } // Chrome desktop doesn't need FastClick (issue #15)

      } else {
        return true;
      }
    }

    if (deviceIsBlackBerry10) {
      blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/); // BlackBerry 10.3+ does not require Fastclick library.
      // https://github.com/ftlabs/fastclick/issues/251

      if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
        metaViewport = document.querySelector('meta[name=viewport]');

        if (metaViewport) {
          // user-scalable=no eliminates click delay.
          if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
            return true;
          } // width=device-width (or less than device-width) eliminates click delay.


          if (document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        }
      }
    } // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)


    if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
      return true;
    } // Firefox version - zero for other browsers


    firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

    if (firefoxVersion >= 27) {
      // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
      metaViewport = document.querySelector('meta[name=viewport]');

      if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
        return true;
      }
    } // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
    // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx


    if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
      return true;
    }

    return false;
  };
  /**
   * Factory method for creating a FastClick object
   *
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */


  FastClick.attach = function (layer, options) {
    return new FastClick(layer, options);
  };

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return FastClick;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 3836:
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
(function (global, factory) {
  "use strict";

  if ( true && typeof module.exports === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }

      return factory(w);
    };
  } else {
    factory(global);
  } // Pass this if window is not defined yet

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  "use strict";

  var arr = [];
  var getProto = Object.getPrototypeOf;
  var slice = arr.slice;
  var flat = arr.flat ? function (array) {
    return arr.flat.call(array);
  } : function (array) {
    return arr.concat.apply([], array);
  };
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
    // Plus for old WebKit, typeof returns "function" for HTML collections
    // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
    return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
  };

  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };

  var document = window.document;
  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval(code, node, doc) {
    doc = doc || document;
    var i,
        val,
        script = doc.createElement("script");
    script.text = code;

    if (node) {
      for (i in preservedScriptAttributes) {
        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || node.getAttribute && node.getAttribute(i);

        if (val) {
          script.setAttribute(i, val);
        }
      }
    }

    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  function toType(obj) {
    if (obj == null) {
      return obj + "";
    } // Support: Android <=2.3 only (functionish RegExp)


    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module


  var version = "3.6.0",
      // Define a local copy of jQuery
  jQuery = function (selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init(selector, context);
  };

  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function () {
      return slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
      // Return all the elements in a clean array
      if (num == null) {
        return slice.call(this);
      } // Return just the one element from the set


      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function (elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems); // Add the old object onto the stack (as a reference)

      ret.prevObject = this; // Return the newly-formed element set

      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function (callback) {
      return jQuery.each(this, callback);
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function () {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    even: function () {
      return this.pushStack(jQuery.grep(this, function (_elem, i) {
        return (i + 1) % 2;
      }));
    },
    odd: function () {
      return this.pushStack(jQuery.grep(this, function (_elem, i) {
        return i % 2;
      }));
    },
    eq: function (i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };

  jQuery.extend = jQuery.fn.extend = function () {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false; // Handle a deep copy situation

    if (typeof target === "boolean") {
      deep = target; // Skip the boolean and the target

      target = arguments[i] || {};
      i++;
    } // Handle case when target is a string or something (possible in deep copy)


    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    } // Extend jQuery itself if only one argument is passed


    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name]; // Prevent Object.prototype pollution
          // Prevent never-ending loop

          if (name === "__proto__" || target === copy) {
            continue;
          } // Recurse if we're merging plain objects or arrays


          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name]; // Ensure proper type for the source value

            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }

            copyIsArray = false; // Never move original objects, clone them

            target[name] = jQuery.extend(deep, clone, copy); // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    } // Return the modified object


    return target;
  };

  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function (msg) {
      throw new Error(msg);
    },
    noop: function () {},
    isPlainObject: function (obj) {
      var proto, Ctor; // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects

      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

      if (!proto) {
        return true;
      } // Objects with prototype are plain iff they were constructed by a global Object function


      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function (obj) {
      var name;

      for (name in obj) {
        return false;
      }

      return true;
    },
    // Evaluates a script in a provided context; falls back to the global one
    // if not specified.
    globalEval: function (code, options, doc) {
      DOMEval(code, {
        nonce: options && options.nonce
      }, doc);
    },
    each: function (obj, callback) {
      var length,
          i = 0;

      if (isArrayLike(obj)) {
        length = obj.length;

        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },
    // results is for internal usage only
    makeArray: function (arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function (first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;
      return first;
    },
    grep: function (elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert; // Go through the array, only saving the items
      // that pass the validator function

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);

        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },
    // arg is for internal usage only
    map: function (elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = []; // Go through the array, translating each of the items to their new values

      if (isArrayLike(elems)) {
        length = elems.length;

        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        } // Go through every key on the object,

      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      } // Flatten any nested arrays


      return flat(ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  } // Populate the class2type map


  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj);

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }

  var Sizzle =
  /*!
   * Sizzle CSS Selector Engine v2.3.6
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2021-02-16
   */
  function (window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        // Local document vars
    setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        // Instance-specific data
    expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        nonnativeSelectorCache = createCache(),
        sortOrder = function (a, b) {
      if (a === b) {
        hasDuplicate = true;
      }

      return 0;
    },
        // Instance methods
    hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        pushNative = arr.push,
        push = arr.push,
        slice = arr.slice,
        // Use a stripped-down indexOf as it's faster than native
    // https://jsperf.com/thor-indexof-vs-for/5
    indexOf = function (list, elem) {
      var i = 0,
          len = list.length;

      for (; i < len; i++) {
        if (list[i] === elem) {
          return i;
        }
      }

      return -1;
    },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" + "ismap|loop|multiple|open|readonly|required|scoped",
        // Regular expressions
    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",
        // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
    identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5]
    // or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
    ".*" + ")\\)|)",
        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rdescend = new RegExp(whitespace + "|>"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
      "ID": new RegExp("^#(" + identifier + ")"),
      "CLASS": new RegExp("^\\.(" + identifier + ")"),
      "TAG": new RegExp("^(" + identifier + "|[*])"),
      "ATTR": new RegExp("^" + attributes),
      "PSEUDO": new RegExp("^" + pseudos),
      "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      "bool": new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    },
        rhtml = /HTML$/i,
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        // CSS escapes
    // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
        funescape = function (escape, nonHex) {
      var high = "0x" + escape.slice(1) - 0x10000;
      return nonHex ? // Strip the backslash prefix from a non-hex escape sequence
      nonHex : // Replace a hexadecimal escape sequence with the encoded Unicode code point
      // Support: IE <=11+
      // For values outside the Basic Multilingual Plane (BMP), manually construct a
      // surrogate pair
      high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    },
        // CSS string/identifier serialization
    // https://drafts.csswg.org/cssom/#common-serializing-idioms
    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function (ch, asCodePoint) {
      if (asCodePoint) {
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if (ch === "\0") {
          return "\uFFFD";
        } // Control characters and (dependent upon position) numbers get escaped as code points


        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      } // Other potentially-special ASCII characters get backslash-escaped


      return "\\" + ch;
    },
        // Used for iframes
    // See setDocument()
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE
    unloadHandler = function () {
      setDocument();
    },
        inDisabledFieldset = addCombinator(function (elem) {
      return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
    }, {
      dir: "parentNode",
      next: "legend"
    }); // Optimize for push.apply( _, NodeList )


    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes); // Support: Android<4.0
      // Detect silently failing push.apply
      // eslint-disable-next-line no-unused-expressions

      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? // Leverage slice if possible
        function (target, els) {
          pushNative.apply(target, slice.call(els));
        } : // Support: IE<9
        // Otherwise append directly
        function (target, els) {
          var j = target.length,
              i = 0; // Can't trust NodeList.length

          while (target[j++] = els[i++]) {}

          target.length = j - 1;
        }
      };
    }

    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          // nodeType defaults to 9, since context defaults to document
      nodeType = context ? context.nodeType : 9;
      results = results || []; // Return early from calls with invalid selector or context

      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      } // Try to shortcut find operations (as opposed to filters) in HTML documents


      if (!seed) {
        setDocument(context);
        context = context || document;

        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                } // Element context

              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } // Type selector

            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results; // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          } // Take advantage of querySelectorAll


          if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && ( // Support: IE 8 only
          // Exclude object elements
          nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
            newSelector = selector;
            newContext = context; // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // The technique has to be used as well when a leading combinator is used
            // as such selectors are not recognized by querySelectorAll.
            // Thanks to Andrew Dupont for this technique.

            if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context; // We can use :scope instead of the ID hack if the browser
              // supports it & if we're not changing the context.

              if (newContext !== context || !support.scope) {
                // Capture the context ID, setting it first if necessary
                if (nid = context.getAttribute("id")) {
                  nid = nid.replace(rcssescape, fcssescape);
                } else {
                  context.setAttribute("id", nid = expando);
                }
              } // Prefix every selector in the list


              groups = tokenize(selector);
              i = groups.length;

              while (i--) {
                groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
              }

              newSelector = groups.join(",");
            }

            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      } // All others


      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */


    function createCache() {
      var keys = [];

      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }

        return cache[key + " "] = value;
      }

      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */


    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */


    function assert(fn) {
      var el = document.createElement("fieldset");

      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } // release memory in IE


        el = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */


    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;

      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */


    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex; // Use IE sourceIndex if available on both nodes

      if (diff) {
        return diff;
      } // Check if b follows a


      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }

      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */


    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */


    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */


    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ("form" in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            } // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors


            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually

            /* jshint -W018 */
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }

          return elem.disabled === disabled; // Try to winnow out elements that can't be disabled before trusting the disabled property.
          // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
          // even exist on them, let alone have a boolean value.
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        } // Remaining elements are neither :enabled nor :disabled


        return false;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */


    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length; // Match elements found at the specified indexes

          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */


    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    } // Expose support vars for convenience


    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */

    isXML = Sizzle.isXML = function (elem) {
      var namespace = elem && elem.namespaceURI,
          docElem = elem && (elem.ownerDocument || elem).documentElement; // Support: IE <=8
      // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
      // https://bugs.jquery.com/ticket/4833

      return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */


    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare,
          subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc; // Return early if doc is invalid or already selected
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq

      if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      } // Update global variables


      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document); // Support: IE 9 - 11+, Edge 12 - 18+
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq

      if (preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 11, Edge
        if (subWindow.addEventListener) {
          subWindow.addEventListener("unload", unloadHandler, false); // Support: IE 9 - 10 only
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent("onunload", unloadHandler);
        }
      } // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
      // Safari 4 - 5 only, Opera <=11.6 - 12.x only
      // IE/Edge & older browsers don't support the :scope pseudo-class.
      // Support: Safari 6.0 only
      // Safari 6.0 supports :scope but it's an alias of :root there.


      support.scope = assert(function (el) {
        docElem.appendChild(el).appendChild(document.createElement("div"));
        return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
      });
      /* Attributes
      ---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)

      support.attributes = assert(function (el) {
        el.className = "i";
        return !el.getAttribute("className");
      });
      /* getElement(s)By*
      ---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements

      support.getElementsByTagName = assert(function (el) {
        el.appendChild(document.createComment(""));
        return !el.getElementsByTagName("*").length;
      }); // Support: IE<9

      support.getElementsByClassName = rnative.test(document.getElementsByClassName); // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test

      support.getById = assert(function (el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      }); // ID filter and find

      if (support.getById) {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId;
          };
        };

        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        }; // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut


        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node,
                i,
                elems,
                elem = context.getElementById(id);

            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode("id");

              if (node && node.value === id) {
                return [elem];
              } // Fall back on getElementsByName


              elems = context.getElementsByName(id);
              i = 0;

              while (elem = elems[i++]) {
                node = elem.getAttributeNode("id");

                if (node && node.value === id) {
                  return [elem];
                }
              }
            }

            return [];
          }
        };
      } // Tag


      Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem,
            tmp = [],
            i = 0,
            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
        results = context.getElementsByTagName(tag); // Filter out possible comments

        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }

          return tmp;
        }

        return results;
      }; // Class

      Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)


      rbuggyMatches = []; // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See https://bugs.jquery.com/ticket/13378

      rbuggyQSA = [];

      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (el) {
          var input; // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // https://bugs.jquery.com/ticket/12359

          docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

          if (el.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          } // Support: IE8
          // Boolean attributes and "value" are not treated correctly


          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          } // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+


          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          } // Support: IE 11+, Edge 15 - 18+
          // IE 11/Edge don't find elements on a `[name='']` query in some cases.
          // Adding a temporary attribute to the document before the selection works
          // around the issue.
          // Interestingly, IE 10 & older don't seem to have the issue.


          input = document.createElement("input");
          input.setAttribute("name", "");
          el.appendChild(input);

          if (!el.querySelectorAll("[name='']").length) {
            rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
          } // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests


          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          } // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibling-combinator selector` fails


          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          } // Support: Firefox <=3.6 - 5 only
          // Old Firefox doesn't throw on a badly-escaped identifier.


          el.querySelectorAll("\\\f");
          rbuggyQSA.push("[\\r\\n\\f]");
        });
        assert(function (el) {
          el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>"; // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment

          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D"); // Support: IE8
          // Enforce case-sensitivity of name attribute

          if (el.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          } // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests


          if (el.querySelectorAll(":enabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Support: IE9-11+
          // IE's :disabled selector does not pick up the children of disabled fieldsets


          docElem.appendChild(el).disabled = true;

          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Support: Opera 10 - 11 only
          // Opera 10-11 does not throw on post-comma invalid pseudos


          el.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (el) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(el, "*"); // This should fail with an exception
          // Gecko does not error, returns false instead

          matches.call(el, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      /* Contains
      ---------------------------------------------------------------------- */

      hasCompare = rnative.test(docElem.compareDocumentPosition); // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself

      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }

        return false;
      };
      /* Sorting
      ---------------------------------------------------------------------- */
      // Document order sorting

      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } // Sort on method existence if only one input has compareDocumentPosition


        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;

        if (compare) {
          return compare;
        } // Calculate position if both inputs belong to the same document
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq


        compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1; // Disconnected nodes

        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if (a == document || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
            return -1;
          } // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq


          if (b == document || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
            return 1;
          } // Maintain original order


          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }

        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b]; // Parentless nodes are either documents or disconnected

        if (!aup || !bup) {
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.

          /* eslint-disable eqeqeq */
          return a == document ? -1 : b == document ? 1 :
          /* eslint-enable eqeqeq */
          aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0; // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        } // Otherwise we need full lists of their ancestors for comparison


        cur = a;

        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }

        cur = b;

        while (cur = cur.parentNode) {
          bp.unshift(cur);
        } // Walk down the tree looking for a discrepancy


        while (ap[i] === bp[i]) {
          i++;
        }

        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.

        /* eslint-disable eqeqeq */
        ap[i] == preferredDoc ? -1 : bp[i] == preferredDoc ? 1 :
        /* eslint-enable eqeqeq */
        0;
      };
      return document;
    };

    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };

    Sizzle.matchesSelector = function (elem, expr) {
      setDocument(elem);

      if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr); // IE 9's matchesSelector returns false on disconnected nodes

          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }

      return Sizzle(expr, document, null, [elem]).length > 0;
    };

    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((context.ownerDocument || context) != document) {
        setDocument(context);
      }

      return contains(context, elem);
    };

    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((elem.ownerDocument || elem) != document) {
        setDocument(elem);
      }

      var fn = Expr.attrHandle[name.toLowerCase()],
          // Don't get fooled by Object.prototype properties (jQuery #13807)
      val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };

    Sizzle.escape = function (sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };

    Sizzle.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */


    Sizzle.uniqueSort = function (results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0; // Unless we *know* we can detect duplicates, assume their presence

      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);

      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }

        while (j--) {
          results.splice(duplicates[j], 1);
        }
      } // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225


      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */


    getText = Sizzle.getText = function (elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      } // Do not include comment or processing instruction nodes


      return ret;
    };

    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        "ATTR": function (match) {
          match[1] = match[1].replace(runescape, funescape); // Move the given value to match[3] whether quoted or unquoted

          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }

          return match.slice(0, 4);
        },
        "CHILD": function (match) {
          /* matches from matchExpr["CHILD"]
          	1 type (only|nth|...)
          	2 what (child|of-type)
          	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          	4 xn-component of xn+y argument ([+-]?\d*n|)
          	5 sign of xn-component
          	6 x of xn-component
          	7 sign of y-component
          	8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            } // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1


            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd"); // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }

          return match;
        },
        "PSEUDO": function (match) {
          var excess,
              unquoted = !match[6] && match[2];

          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          } // Accept quoted arguments as-is


          if (match[3]) {
            match[2] = match[4] || match[5] || ""; // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && ( // Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && ( // advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          } // Return only captures needed by the pseudo filter method (type and argument)


          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function (className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);

            if (result == null) {
              return operator === "!=";
            }

            if (!operator) {
              return true;
            }

            result += "";
            /* eslint-disable max-len */

            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
            /* eslint-enable max-len */
          };
        },
        "CHILD": function (type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, _context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;

            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;

                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  } // Reverse direction for :only-* (if we haven't yet done so)


                  start = dir = type === "only" && !start && "nextSibling";
                }

                return true;
              }

              start = [forward ? parent.firstChild : parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`

              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)

                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];

                while (node = ++nodeIndex && node && node[dir] || ( // Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)

                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                } // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)


                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)

                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }

                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              } // Incorporate the offset, then check against cycle size


              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        "PSEUDO": function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does

          if (fn[expando]) {
            return fn(argument);
          } // But maintain support for old signatures


          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;

              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }

          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length; // Match elements unmatched by `matcher`

            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results); // Don't keep the element (issue #299)

            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }

          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;

            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);

            return false;
          };
        }),
        // Miscellaneous
        "target": function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function (elem) {
          return elem === docElem;
        },
        "focus": function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        "enabled": createDisabledPseudo(false),
        "disabled": createDisabledPseudo(true),
        "checked": function (elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
        },
        "selected": function (elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            // eslint-disable-next-line no-unused-expressions
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },
        // Contents
        "empty": function (elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }

          return true;
        },
        "parent": function (elem) {
          return !Expr.pseudos["empty"](elem);
        },
        // Element/input types
        "header": function (elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function (elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ( // Support: IE<8
          // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
          (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        "first": createPositionalPseudo(function () {
          return [0];
        }),
        "last": createPositionalPseudo(function (_matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function (_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument > length ? length : argument;

          for (; --i >= 0;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;

          for (; ++i < length;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"]; // Add button/input type pseudos

    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }

    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    } // Easy API for creating new setFilters


    function setFilters() {}

    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];

      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }

          groups.push(tokens = []);
        }

        matched = false; // Combinators

        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        } // Filters


        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }

        if (!matched) {
          break;
        }
      } // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens


      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };

    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";

      for (; i < len; i++) {
        selector += tokens[i].value;
      }

      return selector;
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === "parentNode",
          doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }

        return false;
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching

        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {}); // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)

              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[key] = newCache; // A match means we're done; a fail means we have to keep checking

                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      };
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;

        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }

        return true;
      } : matchers[0];
    }

    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;

      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }

      return results;
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;

      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);

            if (mapped) {
              map.push(i);
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }

      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }

      return markFunction(function (seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            // Get initial elements from seed or context
        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            // Prefilter to get matcher input, preserving a map for seed-results synchronization
        matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
        [] : // ...otherwise use results directly
        results : matcherIn; // Find primary matches

        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        } // Apply postFilter


        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml); // Un-match failing elements by moving them back to matcherIn

          i = temp.length;

          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }

        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;

              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }

              postFinder(null, matcherOut = [], temp, xml);
            } // Move matched elements from seed to results to keep them synchronized


            i = matcherOut.length;

            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          } // Add elements to results, through postFinder if defined

        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);

          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }

    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          // The foundational matcher ensures that elements are reachable from top-level context(s)
      matchContext = addCombinator(function (elem) {
        return elem === checkContext;
      }, implicitRelative, true),
          matchAnyContext = addCombinator(function (elem) {
        return indexOf(checkContext, elem) > -1;
      }, implicitRelative, true),
          matchers = [function (elem, context, xml) {
        var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml)); // Avoid hanging onto element (issue #299)

        checkContext = null;
        return ret;
      }];

      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches); // Return special upon seeing a positional matcher

          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;

            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }

            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }

          matchers.push(matcher);
        }
      }

      return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function (seed, context, xml, results, outermost) {
        var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
            len = elems.length;

        if (outermost) {
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          outermostContext = context == document || context || outermost;
        } // Add elements passing elementMatchers directly to results
        // Support: IE<9, Safari
        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id


        for (; i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0; // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq

            if (!context && elem.ownerDocument != document) {
              setDocument(elem);
              xml = !documentIsHTML;
            }

            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document, xml)) {
                results.push(elem);
                break;
              }
            }

            if (outermost) {
              dirruns = dirrunsUnique;
            }
          } // Track unmatched elements for set filters


          if (bySet) {
            // They will have gone through all possible matchers
            if (elem = !matcher && elem) {
              matchedCount--;
            } // Lengthen the array for every element, matched or not


            if (seed) {
              unmatched.push(elem);
            }
          }
        } // `i` is now the count of elements visited above, and adding it to `matchedCount`
        // makes the latter nonnegative.


        matchedCount += i; // Apply set filters to unmatched elements
        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
        // no element matchers and no seed.
        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
        // numerically zero.

        if (bySet && i !== matchedCount) {
          j = 0;

          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }

          if (seed) {
            // Reintegrate element matches to eliminate the need for sorting
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            } // Discard index placeholder values to get only actual matches


            setMatched = condense(setMatched);
          } // Add matches to results


          push.apply(results, setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting

          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        } // Override manipulation of globals by nested matchers


        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }

        return unmatched;
      };

      return bySet ? markFunction(superMatcher) : superMatcher;
    }

    compile = Sizzle.compile = function (selector, match
    /* Internal Use Only */
    ) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];

      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }

        i = match.length;

        while (i--) {
          cached = matcherFromTokens(match[i]);

          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        } // Cache the compiled function


        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)); // Save selector and tokenization

        cached.selector = selector;
      }

      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */


    select = Sizzle.select = function (selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || []; // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)

      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);

        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];

          if (!context) {
            return results; // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }

          selector = selector.slice(tokens.shift().value.length);
        } // Fetch a seed set for right-to-left matching


        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;

        while (i--) {
          token = tokens[i]; // Abort if we hit a combinator

          if (Expr.relative[type = token.type]) {
            break;
          }

          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);

              if (!selector) {
                push.apply(results, seed);
                return results;
              }

              break;
            }
          }
        }
      } // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above


      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    }; // One-time assignments
    // Sort stability


    support.sortStable = expando.split("").sort(sortOrder).join("") === expando; // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function

    support.detectDuplicates = !!hasDuplicate; // Initialize against the default document

    setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*

    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
    }); // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx

    if (!assert(function (el) {
      el.innerHTML = "<a href='#'></a>";
      return el.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    } // Support: IE<9
    // Use defaultValue in place of getAttribute("value")


    if (!support.attributes || !assert(function (el) {
      el.innerHTML = "<input/>";
      el.firstChild.setAttribute("value", "");
      return el.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function (elem, _name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    } // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies


    if (!assert(function (el) {
      return el.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;

        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }

    return Sizzle;
  }(window);

  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors; // Deprecated

  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;

  var dir = function (elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;

    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }

        matched.push(elem);
      }
    }

    return matched;
  };

  var siblings = function (n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  var rneedsContext = jQuery.expr.match.needsContext;

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }

  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; // Implement the identical functionality for filter and not

  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    } // Single element


    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    } // Arraylike of elements (jQuery, arguments, Array)


    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    } // Filtered directly for both simple and complex selectors


    return jQuery.filter(qualifier, elements, not);
  }

  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];

    if (not) {
      expr = ":not(" + expr + ")";
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
  };

  jQuery.fn.extend({
    find: function (selector) {
      var i,
          ret,
          len = this.length,
          self = this;

      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }

      ret = this.pushStack([]);

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function (selector) {
      return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  }); // Initialize a jQuery object
  // A central reference to the root jQuery(document)

  var rootjQuery,
      // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  // Shortcut simple #id case for speed
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      init = jQuery.fn.init = function (selector, context, root) {
    var match, elem; // HANDLE: $(""), $(null), $(undefined), $(false)

    if (!selector) {
      return this;
    } // Method init() accepts an alternate rootjQuery
    // so migrate can support jQuery.sub (gh-2101)


    root = root || rootjQuery; // Handle HTML strings

    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      } // Match html or make sure no context is specified for #id


      if (match && (match[1] || !context)) {
        // HANDLE: $(html) -> $(array)
        if (match[1]) {
          context = context instanceof jQuery ? context[0] : context; // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present

          jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)); // HANDLE: $(html, props)

          if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              // Properties of context are called as methods if possible
              if (isFunction(this[match])) {
                this[match](context[match]); // ...and otherwise set as attributes
              } else {
                this.attr(match, context[match]);
              }
            }
          }

          return this; // HANDLE: $(#id)
        } else {
          elem = document.getElementById(match[2]);

          if (elem) {
            // Inject the element directly into the jQuery object
            this[0] = elem;
            this.length = 1;
          }

          return this;
        } // HANDLE: $(expr, $(...))

      } else if (!context || context.jquery) {
        return (context || root).find(selector); // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor(context).find(selector);
      } // HANDLE: $(DOMElement)

    } else if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this; // HANDLE: $(function)
      // Shortcut for document ready
    } else if (isFunction(selector)) {
      return root.ready !== undefined ? root.ready(selector) : // Execute immediately if ready is not present
      selector(jQuery);
    }

    return jQuery.makeArray(selector, this);
  }; // Give the init function the jQuery prototype for later instantiation


  init.prototype = jQuery.fn; // Initialize central reference

  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };
  jQuery.fn.extend({
    has: function (target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function () {
        var i = 0;

        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function (selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          targets = typeof selectors !== "string" && jQuery(selectors); // Positional selectors never match, since there's no _selection_ context

      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : // Don't pass non-elements to Sizzle
            cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function (elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      } // Index in selector


      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      } // Locate the position of the desired element


      return indexOf.call(this, // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

    return cur;
  }

  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function (elem, _i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function (elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function (elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function (elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function (elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function (elem, _i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function (elem, _i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function (elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return siblings(elem.firstChild);
    },
    contents: function (elem) {
      if (elem.contentDocument != null && // Support: IE 11+
      // <object> elements with no `data` attribute has an object
      // `contentDocument` with a `null` prototype.
      getProto(elem.contentDocument)) {
        return elem.contentDocument;
      } // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.


      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }

      return jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);

      if (name.slice(-5) !== "Until") {
        selector = until;
      }

      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }

      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        } // Reverse order for parents* and prev-derivatives


        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }

      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g; // Convert String-formatted options into Object-formatted ones

  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */


  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

    var // Flag to know if list is currently firing
    firing,
        // Last fire value for non-forgettable lists
    memory,
        // Flag to know if list was already fired
    fired,
        // Flag to prevent firing
    locked,
        // Actual callback list
    list = [],
        // Queue of execution data for repeatable lists
    queue = [],
        // Index of currently firing callback (modified by add/remove as needed)
    firingIndex = -1,
        // Fire callbacks
    fire = function () {
      // Enforce single-firing
      locked = locked || options.once; // Execute callbacks for all pending executions,
      // respecting firingIndex overrides and runtime changes

      fired = firing = true;

      for (; queue.length; firingIndex = -1) {
        memory = queue.shift();

        while (++firingIndex < list.length) {
          // Run callback and check for early termination
          if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }
        }
      } // Forget the data if we're done with it


      if (!options.memory) {
        memory = false;
      }

      firing = false; // Clean up if we're done firing for good

      if (locked) {
        // Keep an empty list if we have data for future add calls
        if (memory) {
          list = []; // Otherwise, this object is spent
        } else {
          list = "";
        }
      }
    },
        // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function () {
        if (list) {
          // If we have memory from a past run, we should fire after adding
          if (memory && !firing) {
            firingIndex = list.length - 1;
            queue.push(memory);
          }

          (function add(args) {
            jQuery.each(args, function (_, arg) {
              if (isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && toType(arg) !== "string") {
                // Inspect recursively
                add(arg);
              }
            });
          })(arguments);

          if (memory && !firing) {
            fire();
          }
        }

        return this;
      },
      // Remove a callback from the list
      remove: function () {
        jQuery.each(arguments, function (_, arg) {
          var index;

          while ((index = jQuery.inArray(arg, list, index)) > -1) {
            list.splice(index, 1); // Handle firing indexes

            if (index <= firingIndex) {
              firingIndex--;
            }
          }
        });
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function (fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
      },
      // Remove all callbacks from the list
      empty: function () {
        if (list) {
          list = [];
        }

        return this;
      },
      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable: function () {
        locked = queue = [];
        list = memory = "";
        return this;
      },
      disabled: function () {
        return !list;
      },
      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock: function () {
        locked = queue = [];

        if (!memory && !firing) {
          list = memory = "";
        }

        return this;
      },
      locked: function () {
        return !!locked;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function (context, args) {
        if (!locked) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);

          if (!firing) {
            fire();
          }
        }

        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function () {
        self.fireWith(this, arguments);
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function () {
        return !!fired;
      }
    };

    return self;
  };

  function Identity(v) {
    return v;
  }

  function Thrower(ex) {
    throw ex;
  }

  function adoptValue(value, resolve, reject, noValue) {
    var method;

    try {
      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject); // Other thenables
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject); // Other non-thenables
      } else {
        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      } // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.

    } catch (value) {
      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }

  jQuery.extend({
    Deferred: function (func) {
      var tuples = [// action, add listener, callbacks,
      // ... .then handlers, argument index, [final state]
      ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
          state = "pending",
          promise = {
        state: function () {
          return state;
        },
        always: function () {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        "catch": function (fn) {
          return promise.then(null, fn);
        },
        // Keep pipe for back-compat
        pipe: function
          /* fnDone, fnFail, fnProgress */
        () {
          var fns = arguments;
          return jQuery.Deferred(function (newDefer) {
            jQuery.each(tuples, function (_i, tuple) {
              // Map tuples (progress, done, fail) to arguments (done, fail, progress)
              var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]]; // deferred.progress(function() { bind to newDefer or newDefer.notify })
              // deferred.done(function() { bind to newDefer or newDefer.resolve })
              // deferred.fail(function() { bind to newDefer or newDefer.reject })

              deferred[tuple[1]](function () {
                var returned = fn && fn.apply(this, arguments);

                if (returned && isFunction(returned.promise)) {
                  returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                } else {
                  newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                }
              });
            });
            fns = null;
          }).promise();
        },
        then: function (onFulfilled, onRejected, onProgress) {
          var maxDepth = 0;

          function resolve(depth, deferred, handler, special) {
            return function () {
              var that = this,
                  args = arguments,
                  mightThrow = function () {
                var returned, then; // Support: Promises/A+ section 2.3.3.3.3
                // https://promisesaplus.com/#point-59
                // Ignore double-resolution attempts

                if (depth < maxDepth) {
                  return;
                }

                returned = handler.apply(that, args); // Support: Promises/A+ section 2.3.1
                // https://promisesaplus.com/#point-48

                if (returned === deferred.promise()) {
                  throw new TypeError("Thenable self-resolution");
                } // Support: Promises/A+ sections 2.3.3.1, 3.5
                // https://promisesaplus.com/#point-54
                // https://promisesaplus.com/#point-75
                // Retrieve `then` only once


                then = returned && ( // Support: Promises/A+ section 2.3.4
                // https://promisesaplus.com/#point-64
                // Only check objects and functions for thenability
                typeof returned === "object" || typeof returned === "function") && returned.then; // Handle a returned thenable

                if (isFunction(then)) {
                  // Special processors (notify) just wait for resolution
                  if (special) {
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)); // Normal processors (resolve) also hook into progress
                  } else {
                    // ...and disregard older resolution values
                    maxDepth++;
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                  } // Handle all other returned values

                } else {
                  // Only substitute handlers pass on context
                  // and multiple values (non-spec behavior)
                  if (handler !== Identity) {
                    that = undefined;
                    args = [returned];
                  } // Process the value(s)
                  // Default process is resolve


                  (special || deferred.resolveWith)(that, args);
                }
              },
                  // Only normal processors (resolve) catch and reject exceptions
              process = special ? mightThrow : function () {
                try {
                  mightThrow();
                } catch (e) {
                  if (jQuery.Deferred.exceptionHook) {
                    jQuery.Deferred.exceptionHook(e, process.stackTrace);
                  } // Support: Promises/A+ section 2.3.3.3.4.1
                  // https://promisesaplus.com/#point-61
                  // Ignore post-resolution exceptions


                  if (depth + 1 >= maxDepth) {
                    // Only substitute handlers pass on context
                    // and multiple values (non-spec behavior)
                    if (handler !== Thrower) {
                      that = undefined;
                      args = [e];
                    }

                    deferred.rejectWith(that, args);
                  }
                }
              }; // Support: Promises/A+ section 2.3.3.3.1
              // https://promisesaplus.com/#point-57
              // Re-resolve promises immediately to dodge false rejection from
              // subsequent errors


              if (depth) {
                process();
              } else {
                // Call an optional hook to record the stack, in case of exception
                // since it's otherwise lost when execution goes async
                if (jQuery.Deferred.getStackHook) {
                  process.stackTrace = jQuery.Deferred.getStackHook();
                }

                window.setTimeout(process);
              }
            };
          }

          return jQuery.Deferred(function (newDefer) {
            // progress_handlers.add( ... )
            tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)); // fulfilled_handlers.add( ... )

            tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity)); // rejected_handlers.add( ... )

            tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function (obj) {
          return obj != null ? jQuery.extend(obj, promise) : promise;
        }
      },
          deferred = {}; // Add list-specific methods

      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
            stateString = tuple[5]; // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add

        promise[tuple[1]] = list.add; // Handle state

        if (stateString) {
          list.add(function () {
            // state = "resolved" (i.e., fulfilled)
            // state = "rejected"
            state = stateString;
          }, // rejected_callbacks.disable
          // fulfilled_callbacks.disable
          tuples[3 - i][2].disable, // rejected_handlers.disable
          // fulfilled_handlers.disable
          tuples[3 - i][3].disable, // progress_callbacks.lock
          tuples[0][2].lock, // progress_handlers.lock
          tuples[0][3].lock);
        } // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire


        list.add(tuple[3].fire); // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }

        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        }; // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith


        deferred[tuple[0] + "With"] = list.fireWith;
      }); // Make the deferred a promise

      promise.promise(deferred); // Call given func if any

      if (func) {
        func.call(deferred, deferred);
      } // All done!


      return deferred;
    },
    // Deferred helper
    when: function (singleValue) {
      var // count of uncompleted subordinates
      remaining = arguments.length,
          // count of unprocessed arguments
      i = remaining,
          // subordinate fulfillment data
      resolveContexts = Array(i),
          resolveValues = slice.call(arguments),
          // the primary Deferred
      primary = jQuery.Deferred(),
          // subordinate callback factory
      updateFunc = function (i) {
        return function (value) {
          resolveContexts[i] = this;
          resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;

          if (! --remaining) {
            primary.resolveWith(resolveContexts, resolveValues);
          }
        };
      }; // Single- and empty arguments are adopted like Promise.resolve


      if (remaining <= 1) {
        adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining); // Use .then() to unwrap secondary thenables (cf. gh-3000)

        if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return primary.then();
        }
      } // Multiple arguments are aggregated like Promise.all array elements


      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), primary.reject);
      }

      return primary.promise();
    }
  }); // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.

  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  jQuery.Deferred.exceptionHook = function (error, stack) {
    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }
  };

  jQuery.readyException = function (error) {
    window.setTimeout(function () {
      throw error;
    });
  }; // The deferred used on DOM ready


  var readyList = jQuery.Deferred();

  jQuery.fn.ready = function (fn) {
    readyList.then(fn) // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
    .catch(function (error) {
      jQuery.readyException(error);
    });
    return this;
  };

  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Handle when the DOM is ready
    ready: function (wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      } // Remember that the DOM is ready


      jQuery.isReady = true; // If a normal DOM Ready event fired, decrement, and wait if need be

      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      } // If there are functions bound, to execute


      readyList.resolveWith(document, [jQuery]);
    }
  });
  jQuery.ready.then = readyList.then; // The ready event handler and self cleanup method

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  } // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon


  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);
  } else {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed); // A fallback to window.onload, that will always work

    window.addEventListener("load", completed);
  } // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function


  var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null; // Sets many values

    if (toType(key) === "object") {
      chainable = true;

      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      } // Sets one value

    } else if (value !== undefined) {
      chainable = true;

      if (!isFunction(value)) {
        raw = true;
      }

      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null; // ...except when executing function values
        } else {
          bulk = fn;

          fn = function (elem, _key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }

    if (chainable) {
      return elems;
    } // Gets


    if (bulk) {
      return fn.call(elems);
    }

    return len ? fn(elems[0], key) : emptyGet;
  }; // Matches dashed string for camelizing


  var rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g; // Used by camelCase as callback to replace()

  function fcamelCase(_all, letter) {
    return letter.toUpperCase();
  } // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)


  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }

  var acceptData = function (owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };

  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;
  Data.prototype = {
    cache: function (owner) {
      // Check if the owner object already has a cache
      var value = owner[this.expando]; // If not, create one

      if (!value) {
        value = {}; // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return an empty object.

        if (acceptData(owner)) {
          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value; // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }

      return value;
    },
    set: function (owner, data, value) {
      var prop,
          cache = this.cache(owner); // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)

      if (typeof data === "string") {
        cache[camelCase(data)] = value; // Handle: [ owner, { properties } ] args
      } else {
        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }

      return cache;
    },
    get: function (owner, key) {
      return key === undefined ? this.cache(owner) : // Always use camelCase key (gh-2257)
      owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access: function (owner, key, value) {
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        return this.get(owner, key);
      } // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //


      this.set(owner, key, value); // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]

      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i,
          cache = owner[this.expando];

      if (cache === undefined) {
        return;
      }

      if (key !== undefined) {
        // Support array or space separated string of keys
        if (Array.isArray(key)) {
          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key); // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace

          key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
        }

        i = key.length;

        while (i--) {
          delete cache[key[i]];
        }
      } // Remove the expando if there's no more data


      if (key === undefined || jQuery.isEmptyObject(cache)) {
        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function (owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data(); //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === "true") {
      return true;
    }

    if (data === "false") {
      return false;
    }

    if (data === "null") {
      return null;
    } // Only convert to a number if it doesn't change the string


    if (data === +data + "") {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }

  function dataAttr(elem, key, data) {
    var name; // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute

    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);

      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {} // Make sure we set the data so it isn't changed later


        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }

    return data;
  }

  jQuery.extend({
    hasData: function (elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function (elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function (elem, name) {
      dataUser.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function (elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes; // Gets all values

      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);

          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;

            while (i--) {
              // Support: IE 11 only
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;

                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }

            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }

        return data;
      } // Sets multiple values


      if (typeof key === "object") {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }

      return access(this, function (value) {
        var data; // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.

        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);

          if (data !== undefined) {
            return data;
          } // Attempt to "discover" the data in
          // HTML5 custom data-* attrs


          data = dataAttr(elem, key);

          if (data !== undefined) {
            return data;
          } // We tried really hard, but the data doesn't exist.


          return;
        } // Set the data...


        this.each(function () {
          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function (key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;

      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type); // Speed up dequeue by getting out quickly if this is just a lookup

        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }

        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || "fx";

      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function () {
        jQuery.dequeue(elem, type);
      }; // If the fx queue is dequeued, always remove the progress sentinel


      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }

      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        } // Clear up the last queue stop function


        delete hooks.stop;
        fn.call(elem, next, hooks);
      }

      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function (elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;

      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }

      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }

      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data); // Ensure a hooks for this queue

        jQuery._queueHooks(this, type);

        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function (type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function (type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function () {
        if (! --count) {
          defer.resolveWith(elements, [elements]);
        }
      };

      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }

      type = type || "fx";

      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");

        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }

      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var documentElement = document.documentElement;

  var isAttached = function (elem) {
    return jQuery.contains(elem.ownerDocument, elem);
  },
      composed = {
    composed: true
  }; // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.


  if (documentElement.getRootNode) {
    isAttached = function (elem) {
      return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    };
  }

  var isHiddenWithinTree = function (elem, el) {
    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem; // Inline style trumps all

    return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
    // Support: Firefox <=43 - 45
    // Disconnected elements can have computed display: none, so first confirm that elem is
    // in the document.
    isAttached(elem) && jQuery.css(elem, "display") === "none";
  };

  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale,
        maxIterations = 20,
        currentValue = tween ? function () {
      return tween.cur();
    } : function () {
      return jQuery.css(elem, prop, "");
    },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        // Starting value computation is required for potential unit mismatches
    initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {
      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial = initial / 2; // Trust units reported by jQuery.css

      unit = unit || initialInUnit[3]; // Iteratively approximate from a nonzero starting point

      initialInUnit = +initial || 1;

      while (maxIterations--) {
        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);

        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }

        initialInUnit = initialInUnit / scale;
      }

      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit); // Make sure we update the tween properties later on

      valueParts = valueParts || [];
    }

    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0; // Apply relative offset (+=/-=) if specified

      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];

      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }

    return adjusted;
  }

  var defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    var temp,
        doc = elem.ownerDocument,
        nodeName = elem.nodeName,
        display = defaultDisplayMap[nodeName];

    if (display) {
      return display;
    }

    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);

    if (display === "none") {
      display = "block";
    }

    defaultDisplayMap[nodeName] = display;
    return display;
  }

  function showHide(elements, show) {
    var display,
        elem,
        values = [],
        index = 0,
        length = elements.length; // Determine new display value for elements that need to change

    for (; index < length; index++) {
      elem = elements[index];

      if (!elem.style) {
        continue;
      }

      display = elem.style.display;

      if (show) {
        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;

          if (!values[index]) {
            elem.style.display = "";
          }
        }

        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none"; // Remember what we're overwriting

          dataPriv.set(elem, "display", display);
        }
      }
    } // Set the display of the elements in a second loop to avoid constant reflow


    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }

    return elements;
  }

  jQuery.fn.extend({
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }

      return this.each(function () {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;

  (function () {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input"); // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)

    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input); // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments

    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned

    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue; // Support: IE <=9 only
    // IE <=9 replaces <option> tags with their contents when inserted outside of
    // the select element.

    div.innerHTML = "<option></option>";
    support.option = !!div.lastChild;
  })(); // We have to close these tags to support XHTML (#13200)


  var wrapMap = {
    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td; // Support: IE <=9 only

  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
  }

  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (#15151)
    var ret;

    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }

    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }

    return ret;
  } // Mark scripts as having already been evaluated


  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;

    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }

  var rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        attached,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;

    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {
        // Add nodes directly
        if (toType(elem) === "object") {
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem); // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div")); // Deserialize a standard representation

          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2]; // Descend through wrappers to the right content

          j = wrap[0];

          while (j--) {
            tmp = tmp.lastChild;
          } // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit


          jQuery.merge(nodes, tmp.childNodes); // Remember the top-level container

          tmp = fragment.firstChild; // Ensure the created nodes are orphaned (#12392)

          tmp.textContent = "";
        }
      }
    } // Remove wrapper from fragment


    fragment.textContent = "";
    i = 0;

    while (elem = nodes[i++]) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }

        continue;
      }

      attached = isAttached(elem); // Append to fragment

      tmp = getAll(fragment.appendChild(elem), "script"); // Preserve script evaluation history

      if (attached) {
        setGlobalEval(tmp);
      } // Capture executables


      if (scripts) {
        j = 0;

        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }

    return fragment;
  }

  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  } // Support: IE <=9 - 11+
  // focus() and blur() are asynchronous, except when they are no-op.
  // So expect focus to be synchronous when the element is already active,
  // and blur to be synchronous when the element is not already active.
  // (focus and blur are always synchronous in other supported browsers,
  // this just defines when we can count on it).


  function expectSync(elem, type) {
    return elem === safeActiveElement() === (type === "focus");
  } // Support: IE <=9 only
  // Accessing document.activeElement can throw unexpectedly
  // https://bugs.jquery.com/ticket/13393


  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  function on(elem, types, selector, data, fn, one) {
    var origFn, type; // Types can be a map of types/handlers

    if (typeof types === "object") {
      // ( types-Object, selector, data )
      if (typeof selector !== "string") {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }

      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }

      return elem;
    }

    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }

    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (one === 1) {
      origFn = fn;

      fn = function (event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      }; // Use same guid so caller can remove using origFn


      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }

    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */


  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem); // Only attach events to objects that accept data

      if (!acceptData(elem)) {
        return;
      } // Caller can pass in an object of custom data in lieu of the handler


      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      } // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)


      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      } // Make sure that the handler has a unique ID, used to find/remove it later


      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      } // Init the element's event structure and main handler, if this is the first


      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null);
      }

      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      } // Handle multiple events separated by a space


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers

        if (!type) {
          continue;
        } // If event changes its type, use the special event handlers for the changed type


        special = jQuery.event.special[type] || {}; // If selector defined, determine special event api type, otherwise given type

        type = (selector ? special.delegateType : special.bindType) || type; // Update special based on newly reset type

        special = jQuery.event.special[type] || {}; // handleObj is passed to all event handlers

        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn); // Init the event handler queue if we're the first

        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0; // Only use addEventListener if the special events handler returns false

          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj);

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        } // Add to the element's handler list, delegates in front


        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        } // Keep track of which events have ever been used, for event optimization


        jQuery.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

      if (!elemData || !(events = elemData.events)) {
        return;
      } // Once for each type.namespace in types; type may be omitted


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element

        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }

          continue;
        }

        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"); // Remove matching events

        origCount = j = handlers.length;

        while (j--) {
          handleObj = handlers[j];

          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);

            if (handleObj.selector) {
              handlers.delegateCount--;
            }

            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        } // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)


        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }

          delete events[type];
        }
      } // Remove data and the expando if it's no longer used


      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function (nativeEvent) {
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue,
          args = new Array(arguments.length),
          // Make a writable jQuery.Event from the native event object
      event = jQuery.event.fix(nativeEvent),
          handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
          special = jQuery.event.special[event.type] || {}; // Use the fix-ed jQuery.Event rather than the (read-only) native event

      args[0] = event;

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      event.delegateTarget = this; // Call the preDispatch hook for the mapped type, and let it bail if desired

      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      } // Determine handlers


      handlerQueue = jQuery.event.handlers.call(this, event, handlers); // Run delegates first; they may want to stop propagation beneath us

      i = 0;

      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;

        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // If the event is namespaced, then each handler is only invoked if it is
          // specially universal or its namespaces are a superset of the event's.
          if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      } // Call the postDispatch hook for the mapped type


      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }

      return event.result;
    },
    handlers: function (event, handlers) {
      var i,
          handleObj,
          sel,
          matchedHandlers,
          matchedSelectors,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target; // Find delegate handlers

      if (delegateCount && // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType && // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          // Don't check non-elements (#13208)
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};

            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i]; // Don't conflict with Object.prototype properties (#13203)

              sel = handleObj.selector + " ";

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }

              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }

            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      } // Add the remaining (directly-bound) handlers


      cur = this;

      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount)
        });
      }

      return handlerQueue;
    },
    addProp: function (name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function () {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function () {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function (value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },
    fix: function (originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      click: {
        // Utilize native event to ensure correct state for checkable inputs
        setup: function (data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data; // Claim the first handler

          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            // dataPriv.set( el, "click", ... )
            leverageNative(el, "click", returnTrue);
          } // Return false to allow normal processing in the caller


          return false;
        },
        trigger: function (data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data; // Force setup before triggering a click

          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click");
          } // Return non-false to allow normal event-path propagation


          return true;
        },
        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default: function (event) {
          var target = event.target;
          return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  }; // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.

  function leverageNative(el, type, expectSync) {
    // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
    if (!expectSync) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue);
      }

      return;
    } // Register the controller as a special universal handler for all event namespaces


    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function (event) {
        var notAsync,
            result,
            saved = dataPriv.get(this, type);

        if (event.isTrigger & 1 && this[type]) {
          // Interrupt processing of the outer synthetic .trigger()ed event
          // Saved data should be false in such cases, but might be a leftover capture object
          // from an async native handler (gh-4350)
          if (!saved.length) {
            // Store arguments for use when handling the inner native event
            // There will always be at least one argument (an event object), so this array
            // will not be confused with a leftover capture object.
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved); // Trigger the native event and capture its result
            // Support: IE <=9 - 11+
            // focus() and blur() are asynchronous

            notAsync = expectSync(this, type);
            this[type]();
            result = dataPriv.get(this, type);

            if (saved !== result || notAsync) {
              dataPriv.set(this, type, false);
            } else {
              result = {};
            }

            if (saved !== result) {
              // Cancel the outer synthetic event
              event.stopImmediatePropagation();
              event.preventDefault(); // Support: Chrome 86+
              // In Chrome, if an element having a focusout handler is blurred by
              // clicking outside of it, it invokes the handler synchronously. If
              // that handler calls `.remove()` on the element, the data is cleared,
              // leaving `result` undefined. We need to guard against this.

              return result && result.value;
            } // If this is an inner synthetic event for an event with a bubbling surrogate
            // (focus or blur), assume that the surrogate already propagated from triggering the
            // native event and prevent that from happening again here.
            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
            // less bad than duplication.

          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          } // If this is a native event triggered above, everything is now in order
          // Fire an inner synthetic event with the original arguments

        } else if (saved.length) {
          // ...and capture the result
          dataPriv.set(this, type, {
            value: jQuery.event.trigger( // Support: IE <=9 - 11+
            // Extend with the prototype to reset the above stopImmediatePropagation()
            jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
          }); // Abort handling of the native event

          event.stopImmediatePropagation();
        }
      }
    });
  }

  jQuery.removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };

  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    } // Event object


    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type; // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.

      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android <=2.3 only
      src.returnValue === false ? returnTrue : returnFalse; // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (#504, #13143)

      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget; // Event type
    } else {
      this.type = src;
    } // Put explicitly provided properties onto the event object


    if (props) {
      jQuery.extend(this, props);
    } // Create a timestamp if incoming event doesn't have one


    this.timeStamp = src && src.timeStamp || Date.now(); // Mark it as fixed

    this[jQuery.expando] = true;
  }; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html


  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;

      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }

      this.stopPropagation();
    }
  }; // Includes all common event props including KeyEvent and MouseEvent specific props

  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: true
  }, jQuery.event.addProp);
  jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function (type, delegateType) {
    jQuery.event.special[type] = {
      // Utilize native event if possible so blur/focus sequence is correct
      setup: function () {
        // Claim the first handler
        // dataPriv.set( this, "focus", ... )
        // dataPriv.set( this, "blur", ... )
        leverageNative(this, type, expectSync); // Return false to allow normal processing in the caller

        return false;
      },
      trigger: function () {
        // Force setup before trigger
        leverageNative(this, type); // Return non-false to allow normal event-path propagation

        return true;
      },
      // Suppress native focus or blur as it's already being fired
      // in leverageNative.
      _default: function () {
        return true;
      },
      delegateType: delegateType
    };
  }); // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).

  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window

        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }

        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;

      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }

      if (typeof types === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }

        return this;
      }

      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }

      if (fn === false) {
        fn = returnFalse;
      }

      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var // Support: IE <=10 - 11, Edge 12 - 13 only
  // In IE/Edge using regex groups here causes severe slowdowns.
  // See https://connect.microsoft.com/IE/feedback/details/1736512/
  rnoInnerhtml = /<script|<style|<link/i,
      // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Prefer a tbody over its parent table for containing new rows

  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery(elem).children("tbody")[0] || elem;
    }

    return elem;
  } // Replace/restore the type attribute of script elements for safe DOM manipulation


  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }

  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }

    return elem;
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, udataOld, udataCur, events;

    if (dest.nodeType !== 1) {
      return;
    } // 1. Copy private data: events, handlers, etc.


    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;

      if (events) {
        dataPriv.remove(dest, "handle events");

        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    } // 2. Copy user data


    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  } // Fix IE bugs, see support tests


  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.

    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked; // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }

  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = flat(args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        valueIsFunction = isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit

    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function (index) {
        var self = collection.eq(index);

        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }

        domManip(self, args, callback, ignored);
      });
    }

    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;

      if (fragment.childNodes.length === 1) {
        fragment = first;
      } // Require either new content or an interest in ignored elements to invoke the callback


      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length; // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).

        for (; i < l; i++) {
          node = fragment;

          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true); // Keep references to cloned scripts for later restoration

            if (hasScripts) {
              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }

          callback.call(collection[i], node, i);
        }

        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument; // Reenable scripts

          jQuery.map(scripts, restoreScript); // Evaluate executable scripts on first document insertion

          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];

            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  }, doc);
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
              }
            }
          }
        }
      }
    }

    return collection;
  }

  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;

    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }

      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"));
        }

        node.parentNode.removeChild(node);
      }
    }

    return elem;
  }

  jQuery.extend({
    htmlPrefilter: function (html) {
      return html;
    },
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = isAttached(elem); // Fix IE cloning issues

      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      } // Copy the events from the original to the clone


      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);

          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      } // Preserve script evaluation history


      destElements = getAll(clone, "script");

      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      } // Return the cloned set


      return clone;
    },
    cleanData: function (elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;

      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type); // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            } // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove


            elem[dataPriv.expando] = undefined;
          }

          if (elem[dataUser.expando]) {
            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function (selector) {
      return remove(this, selector, true);
    },
    remove: function (selector) {
      return remove(this, selector);
    },
    text: function (value) {
      return access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function () {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function () {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function () {
      var elem,
          i = 0;

      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false)); // Remove any remaining nodes

          elem.textContent = "";
        }
      }

      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return access(this, function (value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;

        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        } // See if we can take a shortcut and just use innerHTML


        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);

          try {
            for (; i < l; i++) {
              elem = this[i] || {}; // Remove element nodes and prevent memory leaks

              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }

            elem = 0; // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }

        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function () {
      var ignored = []; // Make the changes, replacing each non-ignored context element with the new content

      return domManip(this, arguments, function (elem) {
        var parent = this.parentNode;

        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));

          if (parent) {
            parent.replaceChild(elem, this);
          }
        } // Force callback invocation

      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems); // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit

        push.apply(ret, elems.get());
      }

      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

  var getStyles = function (elem) {
    // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view.getComputedStyle(elem);
  };

  var swap = function (elem, options, callback) {
    var ret,
        name,
        old = {}; // Remember the old values, and insert the new ones

    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }

    ret = callback.call(elem); // Revert the old values

    for (name in options) {
      elem.style[name] = old[name];
    }

    return ret;
  };

  var rboxStyle = new RegExp(cssExpand.join("|"), "i");

  (function () {
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {
      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }

      container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%"; // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44

      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12; // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't

      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36; // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements

      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36; // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)
      // Support: Chrome <=64
      // Don't get tricked when zoom affects offsetWidth (gh-4029)

      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
      documentElement.removeChild(container); // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed

      div = null;
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }

    var pixelPositionVal,
        boxSizingReliableVal,
        scrollboxSizeVal,
        pixelBoxStylesVal,
        reliableTrDimensionsVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div"); // Finish early in limited (non-browser) environments

    if (!div.style) {
      return;
    } // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (#8908)


    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery.extend(support, {
      boxSizingReliable: function () {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function () {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function () {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function () {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function () {
        computeStyleTests();
        return scrollboxSizeVal;
      },
      // Support: IE 9 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Behavior in IE 9 is more subtle than in newer versions & it passes
      // some versions of this test; make sure not to make it pass there!
      //
      // Support: Firefox 70+
      // Only Firefox includes border widths
      // in computed dimensions. (gh-4529)
      reliableTrDimensions: function () {
        var table, tr, trChild, trStyle;

        if (reliableTrDimensionsVal == null) {
          table = document.createElement("table");
          tr = document.createElement("tr");
          trChild = document.createElement("div");
          table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
          tr.style.cssText = "border:1px solid"; // Support: Chrome 86+
          // Height set through cssText does not get applied.
          // Computed height then comes back as 0.

          tr.style.height = "1px";
          trChild.style.height = "9px"; // Support: Android 8 Chrome 86+
          // In our bodyBackground.html iframe,
          // display for all div elements is set to "inline",
          // which causes a problem only in Android 8 Chrome 86.
          // Ensuring the div is display: block
          // gets around this issue.

          trChild.style.display = "block";
          documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
          trStyle = window.getComputedStyle(tr);
          reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
          documentElement.removeChild(table);
        }

        return reliableTrDimensionsVal;
      }
    });
  })();

  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        // Support: Firefox 51+
    // Retrieving style before computed somehow
    // fixes an issue with getting wrong values
    // on detached elements
    style = elem.style;
    computed = computed || getStyles(elem); // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, #12537)
    //   .css('--customProperty) (#3144)

    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];

      if (ret === "" && !isAttached(elem)) {
        ret = jQuery.style(elem, name);
      } // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values


      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth; // Put in the new values to get a computed value out

        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width; // Revert the changed values

        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    return ret !== undefined ? // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" : ret;
  }

  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function () {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        } // Hook needed; redefine it so that the support test is not executed again.


        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }

  var cssPrefixes = ["Webkit", "Moz", "ms"],
      emptyStyle = document.createElement("div").style,
      vendorProps = {}; // Return a vendor-prefixed property or undefined

  function vendorPropName(name) {
    // Check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;

    while (i--) {
      name = cssPrefixes[i] + capName;

      if (name in emptyStyle) {
        return name;
      }
    }
  } // Return a potentially-mapped jQuery.cssProps or vendor prefixed property


  function finalPropName(name) {
    var final = jQuery.cssProps[name] || vendorProps[name];

    if (final) {
      return final;
    }

    if (name in emptyStyle) {
      return name;
    }

    return vendorProps[name] = vendorPropName(name) || name;
  }

  var // Swappable if display is none or starts with table
  // except "table", "table-cell", or "table-caption"
  // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rcustomProp = /^--/,
      cssShow = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function setPositiveNumber(_elem, value, subtract) {
    // Any relative (+/-) values have already been
    // normalized at this point
    var matches = rcssNum.exec(value);
    return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
        extra = 0,
        delta = 0; // Adjustment may not be necessary

    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }

    for (; i < 4; i += 2) {
      // Both box models exclude margin
      if (box === "margin") {
        delta += jQuery.css(elem, box + cssExpand[i], true, styles);
      } // If we get here with a content-box, we're seeking "padding" or "border" or "margin"


      if (!isBorderBox) {
        // Add padding
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles); // For "border" or "margin", add border

        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles); // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        } // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"

      } else {
        // For "content", subtract padding
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        } // For "content" or "padding", subtract border


        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    } // Account for positive content-box scroll gutter when requested by providing computedVal


    if (!isBorderBox && computedVal >= 0) {
      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5 // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
      // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }

    return delta;
  }

  function getWidthOrHeight(elem, dimension, extra) {
    // Start with computed style
    var styles = getStyles(elem),
        // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
    // Fake content-box until we know it's needed to know the true value.
    boxSizingNeeded = !support.boxSizingReliable() || extra,
        isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
        valueIsBorderBox = isBorderBox,
        val = curCSS(elem, dimension, styles),
        offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1); // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.

    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }

      val = "auto";
    } // Support: IE 9 - 11 only
    // Use offsetWidth/offsetHeight for when box sizing is unreliable.
    // In those cases, the computed value can be trusted to be border-box.


    if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
    // IE/Edge misreport `getComputedStyle` of table rows with width/height
    // set in CSS while `offset*` properties report correct values.
    // Interestingly, in some cases IE 9 doesn't suffer from this issue.
    !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    val === "auto" || // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
    elem.getClientRects().length) {
      isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box"; // Where available, offsetWidth/offsetHeight approximate border box dimensions.
      // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
      // retrieved value as a content box dimension.

      valueIsBorderBox = offsetProp in elem;

      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    } // Normalize "" and auto


    val = parseFloat(val) || 0; // Adjust for the element's box model

    return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, // Provide the current computed size to request scroll gutter calculation (gh-3589)
    val) + "px";
  }

  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "gridArea": true,
      "gridColumn": true,
      "gridColumnEnd": true,
      "gridColumnStart": true,
      "gridRow": true,
      "gridRowEnd": true,
      "gridRowStart": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},
    // Get and set the style property on a DOM Node
    style: function (elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      } // Make sure that we're working with the right name


      var ret,
          type,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name),
          style = elem.style; // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Gets hook for the prefixed version, then unprefixed version


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // Check if we're setting a value

      if (value !== undefined) {
        type = typeof value; // Convert "+=" or "-=" to relative numbers (#7345)

        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret); // Fixes bug #9237

          type = "number";
        } // Make sure that null and NaN values aren't set (#7116)


        if (value == null || value !== value) {
          return;
        } // If a number was passed in, add the unit (except for certain CSS properties)
        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
        // "px" to a few hardcoded values.


        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        } // background-* props affect original clone's values


        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        } // If a hook was provided, use that value, otherwise just set the specified value


        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        } // Otherwise just get the value from the style object


        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name); // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Try prefixed name followed by the unprefixed name


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there

      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      } // Otherwise, if a way to get the computed value exists, use that


      if (val === undefined) {
        val = curCSS(elem, name, styles);
      } // Convert "normal" to computed value


      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      } // Make numeric if forced or a qualifier was provided and val looks numeric


      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }

      return val;
    }
  });
  jQuery.each(["height", "width"], function (_i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function (elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) && ( // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, dimension, extra);
          }) : getWidthOrHeight(elem, dimension, extra);
        }
      },
      set: function (elem, value, extra) {
        var matches,
            styles = getStyles(elem),
            // Only read styles.position if the test has a chance to fail
        // to avoid forcing a reflow.
        scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
        boxSizingNeeded = scrollboxSizeBuggy || extra,
            isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
            subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0; // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)

        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
        } // Convert to pixels if value adjustment is needed


        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }

        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function () {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  }); // These hooks are used by animate to expand properties

  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0,
            expanded = {},
            // Assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [value];

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }

        return expanded;
      }
    };

    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function (name, value) {
      return access(this, function (elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;

        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }

          return map;
        }

        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }
  });

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }

  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];

      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }

      this.now = (this.end - this.start) * eased + this.start;

      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }

      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }

      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result; // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.

        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        } // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.


        result = jQuery.css(tween.elem, tween.prop, ""); // Empty strings, null, undefined and "auto" are converted to 0.

        return !result || result === "auto" ? 0 : result;
      },
      set: function (tween) {
        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  }; // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes

  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init; // Back compat <1.8 extension point

  jQuery.fx.step = {};
  var fxNow,
      inProgress,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;

  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule);
      } else {
        window.setTimeout(schedule, jQuery.fx.interval);
      }

      jQuery.fx.tick();
    }
  } // Animations created synchronously will run synchronously


  function createFxNow() {
    window.setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = Date.now();
  } // Generate parameters to create a standard animation


  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {
      height: type
    }; // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right

    includeWidth = includeWidth ? 1 : 0;

    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }

    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }

    return attrs;
  }

  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;

    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        // We're done with this property
        return tween;
      }
    }
  }

  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        hooks,
        oldfire,
        propTween,
        restoreDisplay,
        display,
        isBox = "width" in props || "height" in props,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHiddenWithinTree(elem),
        dataShow = dataPriv.get(elem, "fxshow"); // Queue-skipping animations hijack the fx hooks

    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");

      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;

        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }

      hooks.unqueued++;
      anim.always(function () {
        // Ensure the complete handler is called before this completes
        anim.always(function () {
          hooks.unqueued--;

          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    } // Detect show/hide animations


    for (prop in props) {
      value = props[prop];

      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";

        if (value === (hidden ? "hide" : "show")) {
          // Pretend to be hidden if this is a "show" and
          // there is still data from a stopped show/hide
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true; // Ignore all other no-op show/hide data
          } else {
            continue;
          }
        }

        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    } // Bail out if this is a no-op like .hide().hide()


    propTween = !jQuery.isEmptyObject(props);

    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    } // Restrict "overflow" and "display" styles during box animations


    if (isBox && elem.nodeType === 1) {
      // Support: IE <=9 - 11, Edge 12 - 15
      // Record all 3 overflow attributes because IE does not infer the shorthand
      // from identically-valued overflowX and overflowY and Edge just mirrors
      // the overflowX value there.
      opts.overflow = [style.overflow, style.overflowX, style.overflowY]; // Identify a display type, preferring old show/hide data over the CSS cascade

      restoreDisplay = dataShow && dataShow.display;

      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }

      display = jQuery.css(elem, "display");

      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          // Get nonempty value(s) by temporarily forcing visibility
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem]);
        }
      } // Animate inline elements as inline-block


      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {
          // Restore the original display value at the end of pure show/hide animations
          if (!propTween) {
            anim.done(function () {
              style.display = restoreDisplay;
            });

            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }

          style.display = "inline-block";
        }
      }
    }

    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    } // Implement show/hide animations


    propTween = false;

    for (prop in orig) {
      // General show/hide setup for this element animation
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {
            display: restoreDisplay
          });
        } // Store hidden/visible for toggle so `.stop().toggle()` "reverses"


        if (toggle) {
          dataShow.hidden = !hidden;
        } // Show elements before animating them


        if (hidden) {
          showHide([elem], true);
        }
        /* eslint-disable no-loop-func */


        anim.done(function () {
          /* eslint-enable no-loop-func */
          // The final step of a "hide" animation is actually hiding the element
          if (!hidden) {
            showHide([elem]);
          }

          dataPriv.remove(elem, "fxshow");

          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      } // Per-property setup


      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;

        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks; // camelCase, specialEasing and expand cssHook pass

    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];

      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }

      if (index !== name) {
        props[name] = value;
        delete props[index];
      }

      hooks = jQuery.cssHooks[name];

      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"

        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }

  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function () {
      // Don't match elem in the :animated selector
      delete tick.elem;
    }),
        tick = function () {
      if (stopped) {
        return false;
      }

      var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          // Support: Android 2.3 only
      // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
      temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;

      for (; index < length; index++) {
        animation.tweens[index].run(percent);
      }

      deferred.notifyWith(elem, [animation, percent, remaining]); // If there's more to do, yield

      if (percent < 1 && length) {
        return remaining;
      } // If this was an empty animation, synthesize a final progress notification


      if (!length) {
        deferred.notifyWith(elem, [animation, 1, 0]);
      } // Resolve the animation and report its conclusion


      deferred.resolveWith(elem, [animation]);
      return false;
    },
        animation = deferred.promise({
      elem: elem,
      props: jQuery.extend({}, properties),
      opts: jQuery.extend(true, {
        specialEasing: {},
        easing: jQuery.easing._default
      }, options),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function (prop, end) {
        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        animation.tweens.push(tween);
        return tween;
      },
      stop: function (gotoEnd) {
        var index = 0,
            // If we are going to the end, we want to run all the tweens
        // otherwise we skip this part
        length = gotoEnd ? animation.tweens.length : 0;

        if (stopped) {
          return this;
        }

        stopped = true;

        for (; index < length; index++) {
          animation.tweens[index].run(1);
        } // Resolve when we played the last frame; otherwise, reject


        if (gotoEnd) {
          deferred.notifyWith(elem, [animation, 1, 0]);
          deferred.resolveWith(elem, [animation, gotoEnd]);
        } else {
          deferred.rejectWith(elem, [animation, gotoEnd]);
        }

        return this;
      }
    }),
        props = animation.props;

    propFilter(props, animation.opts.specialEasing);

    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);

      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
        }

        return result;
      }
    }

    jQuery.map(props, createTween, animation);

    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    } // Attach callbacks from options


    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation;
  }

  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [function (prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },
    tweener: function (props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }

      var prop,
          index = 0,
          length = props.length;

      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function (callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });

  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    }; // Go to the end state if fx are off

    if (jQuery.fx.off) {
      opt.duration = 0;
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration];
        } else {
          opt.duration = jQuery.fx.speeds._default;
        }
      }
    } // Normalize opt.queue - true/undefined/null -> "fx"


    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    } // Queueing


    opt.old = opt.complete;

    opt.complete = function () {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }

      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };

    return opt;
  };

  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      // Show any hidden elements after setting opacity to 0
      return this.filter(isHiddenWithinTree).css("opacity", 0).show() // Animate to the value specified
      .end().animate({
        opacity: to
      }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function () {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation(this, jQuery.extend({}, prop), optall); // Empty animations, or finishing resolves immediately

        if (empty || dataPriv.get(this, "finish")) {
          anim.stop(true);
        }
      };

      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };

      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }

      if (clearQueue) {
        this.queue(type || "fx", []);
      }

      return this.each(function () {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);

        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }

        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        } // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.


        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function (type) {
      if (type !== false) {
        type = type || "fx";
      }

      return this.each(function () {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0; // Enable finishing flag on private data

        data.finish = true; // Empty the queue first

        jQuery.queue(this, type, []);

        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        } // Look for any active animations, and finish them


        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        } // Look for any animations in the old queue and finish them


        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        } // Turn off finishing flag


        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function (_i, name) {
    var cssFn = jQuery.fn[name];

    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  }); // Generate shortcuts for custom animations

  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];

  jQuery.fx.tick = function () {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = Date.now();

    for (; i < timers.length; i++) {
      timer = timers[i]; // Run the timer and safely remove it when done (allowing for external removal)

      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }

    if (!timers.length) {
      jQuery.fx.stop();
    }

    fxNow = undefined;
  };

  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start();
  };

  jQuery.fx.interval = 13;

  jQuery.fx.start = function () {
    if (inProgress) {
      return;
    }

    inProgress = true;
    schedule();
  };

  jQuery.fx.stop = function () {
    inProgress = null;
  };

  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  }; // Based off of the plugin by Clint Helfers, with permission.
  // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/

  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);

      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };

  (function () {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox"; // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"

    support.checkOn = input.value !== ""; // Support: IE <=11 only
    // Must access selectedIndex to make default options select

    support.optSelected = opt.selected; // Support: IE <=11 only
    // An input loses its value after becoming a radio

    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();

  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function (elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      } // Fallback to prop when attributes are not supported


      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      } // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined


      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }

      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }

        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        elem.setAttribute(name, value + "");
        return value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      ret = jQuery.find.attr(elem, name); // Non-existent attributes return null, we normalize to undefined

      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);

            if (val) {
              elem.value = val;
            }

            return value;
          }
        }
      }
    },
    removeAttr: function (elem, value) {
      var name,
          i = 0,
          // Attribute names can contain non-HTML whitespace characters
      // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
      attrNames = value && value.match(rnothtmlwhite);

      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name);
        }
      }
    }
  }); // Hooks for boolean attributes

  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }

      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;

    attrHandle[name] = function (elem, name, isXML) {
      var ret,
          handle,
          lowercaseName = name.toLowerCase();

      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }

      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function (name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function (elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set properties on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }

      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        return elem[name] = value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          // Use proper attribute retrieval(#12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");

          if (tabindex) {
            return parseInt(tabindex, 10);
          }

          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }

          return -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }); // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop

  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }

        return null;
      },
      set: function (elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent) {
          parent.selectedIndex;

          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }

  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  }); // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace

  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }

  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }

    return [];
  }

  jQuery.fn.extend({
    addClass: function (value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    removeClass: function (value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }

      if (!arguments.length) {
        return this.attr("class", "");
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem); // This expression is here for better compressibility (see addClass)

          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value,
          isValidValue = type === "string" || Array.isArray(value);

      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }

      if (isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }

      return this.each(function () {
        var className, i, self, classNames;

        if (isValidValue) {
          // Toggle individual class names
          i = 0;
          self = jQuery(this);
          classNames = classesToArray(value);

          while (className = classNames[i++]) {
            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          } // Toggle whole class name

        } else if (value === undefined || type === "boolean") {
          className = getClass(this);

          if (className) {
            // Store className if set
            dataPriv.set(this, "__className__", className);
          } // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.


          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function (selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";

      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function (value) {
      var hooks,
          ret,
          valueIsFunction,
          elem = this[0];

      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }

          ret = elem.value; // Handle most common string cases

          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          } // Handle cases where value is null/undef or number


          return ret == null ? "" : ret;
        }

        return;
      }

      valueIsFunction = isFunction(value);
      return this.each(function (i) {
        var val;

        if (this.nodeType !== 1) {
          return;
        }

        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        } // Treat null/undefined as ""; convert numbers to string


        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }

        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting

        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : // Support: IE <=10 - 11 only
          // option.text throws exceptions (#14686, #14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse(jQuery.text(elem));
        }
      },
      select: {
        get: function (elem) {
          var value,
              option,
              i,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one",
              values = one ? null : [],
              max = one ? index + 1 : options.length;

          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          } // Loop through all the selected options


          for (; i < max; i++) {
            option = options[i]; // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (#2551)

            if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
            !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val(); // We don't need an array for one selects

              if (one) {
                return value;
              } // Multi-Selects return an array


              values.push(value);
            }
          }

          return values;
        },
        set: function (elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;

          while (i--) {
            option = options[i];
            /* eslint-disable no-cond-assign */

            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
            /* eslint-enable no-cond-assign */

          } // Force browsers to behave consistently when non-matching value is set


          if (!optionSet) {
            elem.selectedIndex = -1;
          }

          return values;
        }
      }
    }
  }); // Radios and checkboxes getter/setter

  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
        }
      }
    };

    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  }); // Return jQuery for attributes-only inclusion

  support.focusin = "onfocusin" in window;

  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      stopPropagationCallback = function (e) {
    e.stopPropagation();
  };

  jQuery.extend(jQuery.event, {
    trigger: function (event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          lastElement,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document; // Don't do events on text and comment nodes

      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      } // focus/blur morphs to focusin/out; ensure we're not firing them right now


      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }

      if (type.indexOf(".") > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }

      ontype = type.indexOf(":") < 0 && "on" + type; // Caller can pass in a jQuery.Event object, Object, or just an event type string

      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)

      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; // Clean up the event in case it is being reused

      event.result = undefined;

      if (!event.target) {
        event.target = elem;
      } // Clone any incoming data and prepend the event, creating the handler arg list


      data = data == null ? [event] : jQuery.makeArray(data, [event]); // Allow special events to draw outside the lines

      special = jQuery.event.special[type] || {};

      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      } // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)


      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;

        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }

        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        } // Only add window if we got to document (e.g., not plain obj or detached DOM)


        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      } // Fire handlers on the event path


      i = 0;

      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type; // jQuery handler

        handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");

        if (handle) {
          handle.apply(cur, data);
        } // Native handler


        handle = ontype && cur[ontype];

        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);

          if (event.result === false) {
            event.preventDefault();
          }
        }
      }

      event.type = type; // If nobody prevented the default action, do it now

      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];

            if (tmp) {
              elem[ontype] = null;
            } // Prevent re-triggering of the same event, since we already bubbled it above


            jQuery.event.triggered = type;

            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }

            elem[type]();

            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }

            jQuery.event.triggered = undefined;

            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }

      return event.result;
    },
    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function (type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];

      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  }); // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857

  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function (orig, fix) {
      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function (event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };

      jQuery.event.special[fix] = {
        setup: function () {
          // Handle: regular nodes (via `this.ownerDocument`), window
          // (via `this.document`) & document (via `this`).
          var doc = this.ownerDocument || this.document || this,
              attaches = dataPriv.access(doc, fix);

          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }

          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function () {
          var doc = this.ownerDocument || this.document || this,
              attaches = dataPriv.access(doc, fix) - 1;

          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }

  var location = window.location;
  var nonce = {
    guid: Date.now()
  };
  var rquery = /\?/; // Cross-browser xml parsing

  jQuery.parseXML = function (data) {
    var xml, parserErrorElem;

    if (!data || typeof data !== "string") {
      return null;
    } // Support: IE 9 - 11 only
    // IE throws on parseFromString with invalid input.


    try {
      xml = new window.DOMParser().parseFromString(data, "text/xml");
    } catch (e) {}

    parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];

    if (!xml || parserErrorElem) {
      jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function (el) {
        return el.textContent;
      }).join("\n") : data));
    }

    return xml;
  };

  var rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && toType(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  } // Serialize an array of form elements or a set of
  // key/values into a query string


  jQuery.param = function (a, traditional) {
    var prefix,
        s = [],
        add = function (key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
    };

    if (a == null) {
      return "";
    } // If an array was passed in, assume that it is an array of form elements.


    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    } // Return the resulting serialization


    return s.join("&");
  };

  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works

        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function (_i, elem) {
        var val = jQuery(this).val();

        if (val == null) {
          return null;
        }

        if (Array.isArray(val)) {
          return jQuery.map(val, function (val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }

        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  var r20 = /%20/g,
      rhash = /#.*$/,
      rantiCache = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},
      // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*"),
      // Anchor tag for parsing the document origin
  originAnchor = document.createElement("a");
  originAnchor.href = location.href; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport

  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }

      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

      if (isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while (dataType = dataTypes[i++]) {
          // Prepend if requested
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func); // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  } // Base inspection function for prefilters and transports


  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = structure === transports;

    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);

        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }

    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  } // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887


  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }

    if (deep) {
      jQuery.extend(true, target, deep);
    }

    return target;
  }
  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */


  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes; // Remove auto dataType and get content-type in the process

    while (dataTypes[0] === "*") {
      dataTypes.shift();

      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    } // Check if we're dealing with a known content-type


    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    } // Check to see if we have a response for the expected dataType


    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }

        if (!firstDataType) {
          firstDataType = type;
        }
      } // Or just use first one


      finalDataType = finalDataType || firstDataType;
    } // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response


    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }

      return responses[finalDataType];
    }
  }
  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */


  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice(); // Create converters map with lowercased keys

    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }

    current = dataTypes.shift(); // Convert to each sequential dataType

    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      } // Apply the dataFilter if provided


      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }

      prev = current;
      current = dataTypes.shift();

      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === "*") {
          current = prev; // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== "*" && prev !== current) {
          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current]; // If none found, seek a pair

          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(" ");

              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];

                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2]; // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }

                  break;
                }
              }
            }
          } // Apply converter (if not an equivalence)


          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }

    return {
      state: "success",
      data: response
    };
  }

  jQuery.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",

      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": JSON.parse,
        // Parse text as xml
        "text xml": jQuery.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function (target, settings) {
      return settings ? // Building a settings object
      ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : // Extending ajaxSettings
      ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function (url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (typeof url === "object") {
        options = url;
        url = undefined;
      } // Force options to be an object


      options = options || {};
      var transport,
          // URL without anti-cache param
      cacheURL,
          // Response headers
      responseHeadersString,
          responseHeaders,
          // timeout handle
      timeoutTimer,
          // Url cleanup var
      urlAnchor,
          // Request state (becomes false upon send and true upon completion)
      completed,
          // To know if global events are to be dispatched
      fireGlobals,
          // Loop variable
      i,
          // uncached part of the url
      uncached,
          // Create the final options object
      s = jQuery.ajaxSetup({}, options),
          // Callbacks context
      callbackContext = s.context || s,
          // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          // Deferreds
      deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          // Status-dependent callbacks
      statusCode = s.statusCode || {},
          // Headers (they are sent all at once)
      requestHeaders = {},
          requestHeadersNames = {},
          // Default abort message
      strAbort = "canceled",
          // Fake xhr
      jqXHR = {
        readyState: 0,
        // Builds headers hashtable if needed
        getResponseHeader: function (key) {
          var match;

          if (completed) {
            if (!responseHeaders) {
              responseHeaders = {};

              while (match = rheaders.exec(responseHeadersString)) {
                responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
              }
            }

            match = responseHeaders[key.toLowerCase() + " "];
          }

          return match == null ? null : match.join(", ");
        },
        // Raw string
        getAllResponseHeaders: function () {
          return completed ? responseHeadersString : null;
        },
        // Caches the header
        setRequestHeader: function (name, value) {
          if (completed == null) {
            name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
            requestHeaders[name] = value;
          }

          return this;
        },
        // Overrides response content-type header
        overrideMimeType: function (type) {
          if (completed == null) {
            s.mimeType = type;
          }

          return this;
        },
        // Status-dependent callbacks
        statusCode: function (map) {
          var code;

          if (map) {
            if (completed) {
              // Execute the appropriate callbacks
              jqXHR.always(map[jqXHR.status]);
            } else {
              // Lazy-add the new callbacks in a way that preserves old ones
              for (code in map) {
                statusCode[code] = [statusCode[code], map[code]];
              }
            }
          }

          return this;
        },
        // Cancel the request
        abort: function (statusText) {
          var finalText = statusText || strAbort;

          if (transport) {
            transport.abort(finalText);
          }

          done(0, finalText);
          return this;
        }
      }; // Attach deferreds

      deferred.promise(jqXHR); // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (#10093: consistency with old signature)
      // We also use the url parameter if available

      s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"); // Alias method option to type as per ticket #12004

      s.type = options.method || options.type || s.method || s.type; // Extract dataTypes list

      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""]; // A cross-domain request is in order when the origin doesn't match the current origin.

      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a"); // Support: IE <=8 - 11, Edge 12 - 15
        // IE throws exception on accessing the href property if url is malformed,
        // e.g. http://example.com:80x/

        try {
          urlAnchor.href = s.url; // Support: IE <=8 - 11 only
          // Anchor's host property isn't correctly set when s.url is relative

          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          // If there is an error parsing the URL, assume it is crossDomain,
          // it can be rejected by the transport if it is invalid
          s.crossDomain = true;
        }
      } // Convert data if not already a string


      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      } // Apply prefilters


      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR); // If request was aborted inside a prefilter, stop there

      if (completed) {
        return jqXHR;
      } // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)


      fireGlobals = jQuery.event && s.global; // Watch for a new set of requests

      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      } // Uppercase the type


      s.type = s.type.toUpperCase(); // Determine if request has content

      s.hasContent = !rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      // Remove hash to simplify url manipulation

      cacheURL = s.url.replace(rhash, ""); // More options handling for requests with no content

      if (!s.hasContent) {
        // Remember the hash so we can put it back
        uncached = s.url.slice(cacheURL.length); // If data is available and should be processed, append data to url

        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data; // #9682: remove data so that it's not used in an eventual retry

          delete s.data;
        } // Add or update anti-cache param if needed


        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
        } // Put hash and anti-cache on the URL that will be requested (gh-1732)


        s.url = cacheURL + uncached; // Change '%20' to '+' if this is encoded form body content (gh-2658)
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      } // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.


      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }

        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      } // Set the correct header, if data is being sent


      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      } // Set the Accepts header for the server, depending on the dataType


      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]); // Check for headers option

      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      } // Allow custom headers/mimetypes and early abort


      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        // Abort if not done already and return
        return jqXHR.abort();
      } // Aborting is no longer a cancellation


      strAbort = "abort"; // Install callbacks on deferreds

      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error); // Get transport

      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR); // If no transport, we auto-abort

      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1; // Send global event

        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        } // If request was aborted inside ajaxSend, stop there


        if (completed) {
          return jqXHR;
        } // Timeout


        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function () {
            jqXHR.abort("timeout");
          }, s.timeout);
        }

        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Rethrow post-completion exceptions
          if (completed) {
            throw e;
          } // Propagate others as results


          done(-1, e);
        }
      } // Callback for when everything is done


      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText; // Ignore repeat invocations

        if (completed) {
          return;
        }

        completed = true; // Clear timeout if it exists

        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        } // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)


        transport = undefined; // Cache response headers

        responseHeadersString = headers || ""; // Set readyState

        jqXHR.readyState = status > 0 ? 4 : 0; // Determine if successful

        isSuccess = status >= 200 && status < 300 || status === 304; // Get response data

        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        } // Use a noop converter for missing script but not if jsonp


        if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
          s.converters["text script"] = function () {};
        } // Convert no matter what (that way responseXXX fields are always set)


        response = ajaxConvert(s, response, jqXHR, isSuccess); // If successful, handle type chaining

        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");

            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }

            modified = jqXHR.getResponseHeader("etag");

            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          } // if no content


          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent"; // if not modified
          } else if (status === 304) {
            statusText = "notmodified"; // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // Extract error from statusText and normalize for non-aborts
          error = statusText;

          if (status || !statusText) {
            statusText = "error";

            if (status < 0) {
              status = 0;
            }
          }
        } // Set data for the fake xhr object


        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + ""; // Success/Error

        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        } // Status-dependent callbacks


        jqXHR.statusCode(statusCode);
        statusCode = undefined;

        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        } // Complete


        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]); // Handle the global AJAX counter

          if (! --jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }

      return jqXHR;
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function (_i, method) {
    jQuery[method] = function (url, data, callback, type) {
      // Shift arguments if data argument was omitted
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      } // The url can be an options object (which then must have .url)


      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery.ajaxPrefilter(function (s) {
    var i;

    for (i in s.headers) {
      if (i.toLowerCase() === "content-type") {
        s.contentType = s.headers[i] || "";
      }
    }
  });

  jQuery._evalUrl = function (url, options, doc) {
    return jQuery.ajax({
      url: url,
      // Make this explicit, since user can override this through ajaxSetup (#11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      // Only evaluate the response if it is successful (gh-4126)
      // dataFilter is not invoked for failure responses, so using it instead
      // of the default converter is kludgy but it works.
      converters: {
        "text script": function () {}
      },
      dataFilter: function (response) {
        jQuery.globalEval(response, options, doc);
      }
    });
  };

  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        } // The elements to wrap the target around


        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function () {
          var elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },
    wrapInner: function (html) {
      if (isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }

      return this.each(function () {
        var self = jQuery(this),
            contents = self.contents();

        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function (selector) {
      this.parent(selector).not("body").each(function () {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });

  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };

  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };

  var xhrSuccessStatus = {
    // File protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE <=9 only
    // #1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var callback, errorCallback; // Cross domain only allowed if supported through XMLHttpRequest

    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function (headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password); // Apply custom fields if provided

          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          } // Override mime type if needed


          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          } // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.


          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          } // Set headers


          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          } // Callback


          callback = function (type) {
            return function () {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;

                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  // Support: IE <=9 only
                  // On a manual native abort, IE9 throws
                  // errors on any property access that is not readyState
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete( // File: protocol always yields status 0; see #8605, #14207
                    xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, // Support: IE <=9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                    binary: xhr.response
                  } : {
                    text: xhr.responseText
                  }, xhr.getAllResponseHeaders());
                }
              }
            };
          }; // Listen to events


          xhr.onload = callback();
          errorCallback = xhr.onerror = xhr.ontimeout = callback("error"); // Support: IE 9 only
          // Use onreadystatechange to replace onabort
          // to handle uncaught aborts

          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function () {
              // Check readyState before timeout as it changes
              if (xhr.readyState === 4) {
                // Allow onerror to be called first,
                // but that will not handle a native abort
                // Also, save errorCallback to a variable
                // as xhr.onerror cannot be accessed
                window.setTimeout(function () {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          } // Create the abort callback


          callback = callback("abort");

          try {
            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            // #14683: Only rethrow if this hasn't been notified as an error yet
            if (callback) {
              throw e;
            }
          }
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  }); // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)

  jQuery.ajaxPrefilter(function (s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  }); // Install script dataType

  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  }); // Handle cache's special case and crossDomain

  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }

    if (s.crossDomain) {
      s.type = "GET";
    }
  }); // Bind script tag hack transport

  jQuery.ajaxTransport("script", function (s) {
    // This transport only deals with cross domain or forced-by-attrs requests
    if (s.crossDomain || s.scriptAttrs) {
      var script, callback;
      return {
        send: function (_, complete) {
          script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function (evt) {
            script.remove();
            callback = null;

            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          }); // Use native DOM manipulation to avoid our domManip AJAX trickery

          document.head.appendChild(script[0]);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/; // Default jsonp settings

  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
      this[callback] = true;
      return callback;
    }
  }); // Detect, normalize options and install callbacks for jsonp requests

  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set

    if (jsonProp || s.dataTypes[0] === "jsonp") {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback; // Insert callback into url or form data

      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      } // Use data converter to retrieve json after script execution


      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }

        return responseContainer[0];
      }; // Force json dataType


      s.dataTypes[0] = "json"; // Install callback

      overwritten = window[callbackName];

      window[callbackName] = function () {
        responseContainer = arguments;
      }; // Clean-up function (fires after converters)


      jqXHR.always(function () {
        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName); // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        } // Save back as free


        if (s[callbackName]) {
          // Make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback; // Save the callback name for future use

          oldCallbacks.push(callbackName);
        } // Call if it was a function and we have a response


        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }

        responseContainer = overwritten = undefined;
      }); // Delegate to script

      return "script";
    }
  }); // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337

  support.createHTMLDocument = function () {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  }(); // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string


  jQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }

    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }

    var base, parsed, scripts;

    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument(""); // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)

        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }

    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && []; // Single tag

    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }

    return jQuery.merge([], parsed.childNodes);
  };
  /**
   * Load a url into a page
   */


  jQuery.fn.load = function (url, params, callback) {
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");

    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    } // If it's a function


    if (isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined; // Otherwise, build a param string
    } else if (params && typeof params === "object") {
      type = "POST";
    } // If we have elements to modify, make the request


    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function (responseText) {
        // Save response for use in complete callback
        response = arguments;
        self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
        responseText); // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && function (jqXHR, status) {
        self.each(function () {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }

    return this;
  };

  jQuery.expr.pseudos.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  };

  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {}; // Set position first, in-case top/left are set even on static elem

      if (position === "static") {
        elem.style.position = "relative";
      }

      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed

      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }

      if (isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }

      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }

      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }

      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    // offset() relates an element's border box to the document origin
    offset: function (options) {
      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined ? this : this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }

      var rect,
          win,
          elem = this[0];

      if (!elem) {
        return;
      } // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error


      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function () {
      if (!this[0]) {
        return;
      }

      var offsetParent,
          offset,
          doc,
          elem = this[0],
          parentOffset = {
        top: 0,
        left: 0
      }; // position:fixed elements are offset from the viewport, which itself always has zero offset

      if (jQuery.css(elem, "position") === "fixed") {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset(); // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified

        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;

        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode;
        }

        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
        }
      } // Subtract parent offsets and element margins


      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent;

        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || documentElement;
      });
    }
  }); // Create scrollLeft and scrollTop methods

  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = "pageYOffset" === prop;

    jQuery.fn[method] = function (val) {
      return access(this, function (elem, method, val) {
        // Coalesce documents and windows
        var win;

        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }

        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }

        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  }); // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here

  jQuery.each(["top", "left"], function (_i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop); // If curCSS returns percentage, fallback to offset

        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  }); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function (elem, type, value) {
          var doc;

          if (isWindow(elem)) {
            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          } // Get document width or height


          if (elem.nodeType === 9) {
            doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest

            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }

          return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css(elem, type, extra) : // Set width or height on the element
          jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (_i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.fn.extend({
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
    // Handle event binding
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  }); // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP

  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon

  jQuery.proxy = function (fn, context) {
    var tmp, args, proxy;

    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    } // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.


    if (!isFunction(fn)) {
      return undefined;
    } // Simulated bind


    args = slice.call(arguments, 2);

    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    }; // Set the guid of unique handler to the same of original handler, so it can be removed


    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy;
  };

  jQuery.holdReady = function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };

  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;
  jQuery.now = Date.now;

  jQuery.isNumeric = function (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN(obj - parseFloat(obj));
  };

  jQuery.trim = function (text) {
    return text == null ? "" : (text + "").replace(rtrim, "");
  }; // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.
  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon


  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return jQuery;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  var // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,
      // Map over the $ in case of overwrite
  _$ = window.$;

  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  }; // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)


  if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
});

/***/ }),

/***/ 6239:
/*!**************************************************************************!*\
  !*** ./node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js ***!
  \**************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * ScrollMagic v2.0.8 (2020-08-14)
 * The javascript library for magical scroll interactions.
 * (c) 2020 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.8
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */

/**
 * @namespace ScrollMagic
 */
(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  "use strict";

  var ScrollMagic = function () {
    _util.log(2, '(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use \'new ScrollMagic.Controller()\' to create a new controller instance. Use \'new ScrollMagic.Scene()\' to instance a scene.');
  };

  ScrollMagic.version = "2.0.8"; // TODO: temporary workaround for chrome's scroll jitter bug

  if (typeof window !== 'undefined') {
    window.addEventListener("mousewheel", void 0);
  } // global const


  var PIN_SPACER_ATTRIBUTE = "data-scrollmagic-pin-spacer";
  /**
   * The main class that is needed once per scroll container.
   *
   * @class
   *
   * @example
   * // basic initialization
   * var controller = new ScrollMagic.Controller();
   *
   * // passing options
   * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
   *
   * @param {object} [options] - An object containing one or more options for the controller.
   * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
   * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
   * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
   * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
  										 ** `0` => silent
  										 ** `1` => errors
  										 ** `2` => errors, warnings
  										 ** `3` => errors, warnings, debuginfo
   * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
   																										 This interval polls these parameters to fire the necessary events.  
   																										 If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
   *
   */

  ScrollMagic.Controller = function (options) {
    /*
     * ----------------------------------------------------------------
     * settings
     * ----------------------------------------------------------------
     */
    var NAMESPACE = 'ScrollMagic.Controller',
        SCROLL_DIRECTION_FORWARD = 'FORWARD',
        SCROLL_DIRECTION_REVERSE = 'REVERSE',
        SCROLL_DIRECTION_PAUSED = 'PAUSED',
        DEFAULT_OPTIONS = CONTROLLER_OPTIONS.defaults;
    /*
     * ----------------------------------------------------------------
     * private vars
     * ----------------------------------------------------------------
     */

    var Controller = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _sceneObjects = [],
        _updateScenesOnNextCycle = false,
        // can be boolean (true => all scenes) or an array of scenes to be updated
    _scrollPos = 0,
        _scrollDirection = SCROLL_DIRECTION_PAUSED,
        _isDocument = true,
        _viewPortSize = 0,
        _enabled = true,
        _updateTimeout,
        _refreshTimeout;
    /*
     * ----------------------------------------------------------------
     * private functions
     * ----------------------------------------------------------------
     */

    /**
     * Internal constructor function of the ScrollMagic Controller
     * @private
     */


    var construct = function () {
      for (var key in _options) {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      }

      _options.container = _util.get.elements(_options.container)[0]; // check ScrollContainer

      if (!_options.container) {
        log(1, "ERROR creating object " + NAMESPACE + ": No valid scroll container supplied");
        throw NAMESPACE + " init failed."; // cancel
      }

      _isDocument = _options.container === window || _options.container === document.body || !document.body.contains(_options.container); // normalize to window

      if (_isDocument) {
        _options.container = window;
      } // update container size immediately


      _viewPortSize = getViewportSize(); // set event handlers

      _options.container.addEventListener("resize", onChange);

      _options.container.addEventListener("scroll", onChange);

      var ri = parseInt(_options.refreshInterval, 10);
      _options.refreshInterval = _util.type.Number(ri) ? ri : DEFAULT_OPTIONS.refreshInterval;
      scheduleRefresh();
      log(3, "added new " + NAMESPACE + " controller (v" + ScrollMagic.version + ")");
    };
    /**
     * Schedule the next execution of the refresh function
     * @private
     */


    var scheduleRefresh = function () {
      if (_options.refreshInterval > 0) {
        _refreshTimeout = window.setTimeout(refresh, _options.refreshInterval);
      }
    };
    /**
     * Default function to get scroll pos - overwriteable using `Controller.scrollPos(newFunction)`
     * @private
     */


    var getScrollPos = function () {
      return _options.vertical ? _util.get.scrollTop(_options.container) : _util.get.scrollLeft(_options.container);
    };
    /**
     * Returns the current viewport Size (width vor horizontal, height for vertical)
     * @private
     */


    var getViewportSize = function () {
      return _options.vertical ? _util.get.height(_options.container) : _util.get.width(_options.container);
    };
    /**
     * Default function to set scroll pos - overwriteable using `Controller.scrollTo(newFunction)`
     * Make available publicly for pinned mousewheel workaround.
     * @private
     */


    var setScrollPos = this._setScrollPos = function (pos) {
      if (_options.vertical) {
        if (_isDocument) {
          window.scrollTo(_util.get.scrollLeft(), pos);
        } else {
          _options.container.scrollTop = pos;
        }
      } else {
        if (_isDocument) {
          window.scrollTo(pos, _util.get.scrollTop());
        } else {
          _options.container.scrollLeft = pos;
        }
      }
    };
    /**
     * Handle updates in cycles instead of on scroll (performance)
     * @private
     */


    var updateScenes = function () {
      if (_enabled && _updateScenesOnNextCycle) {
        // determine scenes to update
        var scenesToUpdate = _util.type.Array(_updateScenesOnNextCycle) ? _updateScenesOnNextCycle : _sceneObjects.slice(0); // reset scenes

        _updateScenesOnNextCycle = false;
        var oldScrollPos = _scrollPos; // update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)

        _scrollPos = Controller.scrollPos();
        var deltaScroll = _scrollPos - oldScrollPos;

        if (deltaScroll !== 0) {
          // scroll position changed?
          _scrollDirection = deltaScroll > 0 ? SCROLL_DIRECTION_FORWARD : SCROLL_DIRECTION_REVERSE;
        } // reverse order of scenes if scrolling reverse


        if (_scrollDirection === SCROLL_DIRECTION_REVERSE) {
          scenesToUpdate.reverse();
        } // update scenes


        scenesToUpdate.forEach(function (scene, index) {
          log(3, "updating Scene " + (index + 1) + "/" + scenesToUpdate.length + " (" + _sceneObjects.length + " total)");
          scene.update(true);
        });

        if (scenesToUpdate.length === 0 && _options.loglevel >= 3) {
          log(3, "updating 0 Scenes (nothing added to controller)");
        }
      }
    };
    /**
     * Initializes rAF callback
     * @private
     */


    var debounceUpdate = function () {
      _updateTimeout = _util.rAF(updateScenes);
    };
    /**
     * Handles Container changes
     * @private
     */


    var onChange = function (e) {
      log(3, "event fired causing an update:", e.type);

      if (e.type == "resize") {
        // resize
        _viewPortSize = getViewportSize();
        _scrollDirection = SCROLL_DIRECTION_PAUSED;
      } // schedule update


      if (_updateScenesOnNextCycle !== true) {
        _updateScenesOnNextCycle = true;
        debounceUpdate();
      }
    };

    var refresh = function () {
      if (!_isDocument) {
        // simulate resize event. Only works for viewport relevant param (performance)
        if (_viewPortSize != getViewportSize()) {
          var resizeEvent;

          try {
            resizeEvent = new Event('resize', {
              bubbles: false,
              cancelable: false
            });
          } catch (e) {
            // stupid IE
            resizeEvent = document.createEvent("Event");
            resizeEvent.initEvent("resize", false, false);
          }

          _options.container.dispatchEvent(resizeEvent);
        }
      }

      _sceneObjects.forEach(function (scene, index) {
        // refresh all scenes
        scene.refresh();
      });

      scheduleRefresh();
    };
    /**
     * Send a debug message to the console.
     * provided publicly with _log for plugins
     * @private
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */


    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    }; // for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins


    this._options = _options;
    /**
     * Sort scenes in ascending order of their start offset.
     * @private
     *
     * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
     * @return {array} The sorted array of Scenes.
     */

    var sortScenes = function (ScenesArray) {
      if (ScenesArray.length <= 1) {
        return ScenesArray;
      } else {
        var scenes = ScenesArray.slice(0);
        scenes.sort(function (a, b) {
          return a.scrollOffset() > b.scrollOffset() ? 1 : -1;
        });
        return scenes;
      }
    };
    /**
     * ----------------------------------------------------------------
     * public functions
     * ----------------------------------------------------------------
     */

    /**
     * Add one ore more scene(s) to the controller.  
     * This is the equivalent to `Scene.addTo(controller)`.
     * @public
     * @example
     * // with a previously defined scene
     * controller.addScene(scene);
     *
     * // with a newly created scene.
     * controller.addScene(new ScrollMagic.Scene({duration : 0}));
     *
     * // adding multiple scenes
     * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
     *
     * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
     * @return {Controller} Parent object for chaining.
     */


    this.addScene = function (newScene) {
      if (_util.type.Array(newScene)) {
        newScene.forEach(function (scene, index) {
          Controller.addScene(scene);
        });
      } else if (newScene instanceof ScrollMagic.Scene) {
        if (newScene.controller() !== Controller) {
          newScene.addTo(Controller);
        } else if (_sceneObjects.indexOf(newScene) < 0) {
          // new scene
          _sceneObjects.push(newScene); // add to array


          _sceneObjects = sortScenes(_sceneObjects); // sort

          newScene.on("shift.controller_sort", function () {
            // resort whenever scene moves
            _sceneObjects = sortScenes(_sceneObjects);
          }); // insert Global defaults.

          for (var key in _options.globalSceneOptions) {
            if (newScene[key]) {
              newScene[key].call(newScene, _options.globalSceneOptions[key]);
            }
          }

          log(3, "adding Scene (now " + _sceneObjects.length + " total)");
        }
      } else {
        log(1, "ERROR: invalid argument supplied for '.addScene()'");
      }

      return Controller;
    };
    /**
     * Remove one ore more scene(s) from the controller.  
     * This is the equivalent to `Scene.remove()`.
     * @public
     * @example
     * // remove a scene from the controller
     * controller.removeScene(scene);
     *
     * // remove multiple scenes from the controller
     * controller.removeScene([scene, scene2, scene3]);
     *
     * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
     * @returns {Controller} Parent object for chaining.
     */


    this.removeScene = function (Scene) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.removeScene(scene);
        });
      } else {
        var index = _sceneObjects.indexOf(Scene);

        if (index > -1) {
          Scene.off("shift.controller_sort");

          _sceneObjects.splice(index, 1);

          log(3, "removing Scene (now " + _sceneObjects.length + " left)");
          Scene.remove();
        }
      }

      return Controller;
    };
    /**
    * Update one ore more scene(s) according to the scroll position of the container.  
    * This is the equivalent to `Scene.update()`.  
    * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
    * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
    * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
    * @public
    * @example
    * // update a specific scene on next cycle
     * controller.updateScene(scene);
     *
    * // update a specific scene immediately
    * controller.updateScene(scene, true);
     *
    * // update multiple scenes scene on next cycle
    * controller.updateScene([scene1, scene2, scene3]);
    *
    * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
    * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
    										  This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
    * @return {Controller} Parent object for chaining.
    */


    this.updateScene = function (Scene, immediately) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.updateScene(scene, immediately);
        });
      } else {
        if (immediately) {
          Scene.update(true);
        } else if (_updateScenesOnNextCycle !== true && Scene instanceof ScrollMagic.Scene) {
          // if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
          // prep array for next update cycle
          _updateScenesOnNextCycle = _updateScenesOnNextCycle || [];

          if (_updateScenesOnNextCycle.indexOf(Scene) == -1) {
            _updateScenesOnNextCycle.push(Scene);
          }

          _updateScenesOnNextCycle = sortScenes(_updateScenesOnNextCycle); // sort

          debounceUpdate();
        }
      }

      return Controller;
    };
    /**
     * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
     * See `Controller.updateScene()` for more information about what this means.  
     * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
     * The only application for this method is when ScrollMagic fails to detect these events.  
     * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
     * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
     * @public
     * @example
     * // update the controller on next cycle (saves performance due to elimination of redundant updates)
     * controller.update();
     *
     * // update the controller immediately
     * controller.update(true);
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
     * @return {Controller} Parent object for chaining.
     */


    this.update = function (immediately) {
      onChange({
        type: "resize"
      }); // will update size and set _updateScenesOnNextCycle to true

      if (immediately) {
        updateScenes();
      }

      return Controller;
    };
    /**
     * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
     * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
     * @public
     *
     * @since 1.1.0
     * @example
     * // scroll to an offset of 100
     * controller.scrollTo(100);
     *
     * // scroll to a DOM element
     * controller.scrollTo("#anchor");
     *
     * // scroll to the beginning of a scene
     * var scene = new ScrollMagic.Scene({offset: 200});
     * controller.scrollTo(scene);
     *
     * // define a new scroll position modification function (jQuery animate instead of jump)
     * controller.scrollTo(function (newScrollPos) {
     *	$("html, body").animate({scrollTop: newScrollPos});
     * });
     * controller.scrollTo(100); // call as usual, but the new function will be used instead
     *
     * // define a new scroll function with an additional parameter
     * controller.scrollTo(function (newScrollPos, message) {
     *  console.log(message);
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter to the defined custom function
     * controller.scrollTo(100, "my message");
     *
     * // define a new scroll function with an additional parameter containing multiple variables
     * controller.scrollTo(function (newScrollPos, options) {
     *  someGlobalVar = options.a + options.b;
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter containing multiple options
     * controller.scrollTo(100, {a: 1, b: 2});
     *
     * // define a new scroll function with a callback supplied as an additional parameter
     * controller.scrollTo(function (newScrollPos, callback) {
     *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
     * });
     * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
     * controller.scrollTo(100, function() {
     *	console.log("scroll has finished.");
     * });
     *
     * @param {mixed} scrollTarget - The supplied argument can be one of these types:
     * 1. `number` -> The container will scroll to this new scroll offset.
     * 2. `string` or `object` -> Can be a selector or a DOM object.  
     *  The container will scroll to the position of this element.
     * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
     * 4. `function` -> This function will be used for future scroll position modifications.  
     *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
     *  It may also optionally receive an optional additional parameter (see below)  
     *  _**NOTE:**  
     *  All other options will still work as expected, using the new function to scroll._
     * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
     * @returns {Controller} Parent object for chaining.
     */


    this.scrollTo = function (scrollTarget, additionalParameter) {
      if (_util.type.Number(scrollTarget)) {
        // excecute
        setScrollPos.call(_options.container, scrollTarget, additionalParameter);
      } else if (scrollTarget instanceof ScrollMagic.Scene) {
        // scroll to scene
        if (scrollTarget.controller() === Controller) {
          // check if the controller is associated with this scene
          Controller.scrollTo(scrollTarget.scrollOffset(), additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", scrollTarget);
        }
      } else if (_util.type.Function(scrollTarget)) {
        // assign new scroll function
        setScrollPos = scrollTarget;
      } else {
        // scroll to element
        var elem = _util.get.elements(scrollTarget)[0];

        if (elem) {
          // if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
          while (elem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            elem = elem.parentNode;
          }

          var param = _options.vertical ? "top" : "left",
              // which param is of interest ?
          containerOffset = _util.get.offset(_options.container),
              // container position is needed because element offset is returned in relation to document, not in relation to container.
          elementOffset = _util.get.offset(elem);

          if (!_isDocument) {
            // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
            containerOffset[param] -= Controller.scrollPos();
          }

          Controller.scrollTo(elementOffset[param] - containerOffset[param], additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", scrollTarget);
        }
      }

      return Controller;
    };
    /**
     * **Get** the current scrollPosition or **Set** a new method to calculate it.  
     * -> **GET**:
     * When used as a getter this function will return the current scroll position.  
     * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
     * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
     *
     * -> **SET**:
     * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
     * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
     * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
     * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
     * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
     *
     * To change the current scroll position please use `Controller.scrollTo()`.
     * @public
     *
     * @example
     * // get the current scroll Position
     * var scrollPos = controller.scrollPos();
     *
     * // set a new scroll position calculation method
     * controller.scrollPos(function () {
     *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
     * });
     *
     * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
     * @returns {(number|Controller)} Current scroll position or parent object for chaining.
     */


    this.scrollPos = function (scrollPosMethod) {
      if (!arguments.length) {
        // get
        return getScrollPos.call(Controller);
      } else {
        // set
        if (_util.type.Function(scrollPosMethod)) {
          getScrollPos = scrollPosMethod;
        } else {
          log(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.");
        }
      }

      return Controller;
    };
    /**
     * **Get** all infos or one in particular about the controller.
     * @public
     * @example
     * // returns the current scroll position (number)
     * var scrollPos = controller.info("scrollPos");
     *
     * // returns all infos as an object
     * var infos = controller.info();
     *
     * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
     							 Valid options are:
     							 ** `"size"` => the current viewport size of the container
     							 ** `"vertical"` => true if vertical scrolling, otherwise false
     							 ** `"scrollPos"` => the current scroll position
     							 ** `"scrollDirection"` => the last known direction of the scroll
     							 ** `"container"` => the container element
     							 ** `"isDocument"` => true if container element is the document.
     * @returns {(mixed|object)} The requested info(s).
     */


    this.info = function (about) {
      var values = {
        size: _viewPortSize,
        // contains height or width (in regard to orientation);
        vertical: _options.vertical,
        scrollPos: _scrollPos,
        scrollDirection: _scrollDirection,
        container: _options.container,
        isDocument: _isDocument
      };

      if (!arguments.length) {
        // get all as an object
        return values;
      } else if (values[about] !== undefined) {
        return values[about];
      } else {
        log(1, "ERROR: option \"" + about + "\" is not available");
        return;
      }
    };
    /**
     * **Get** or **Set** the current loglevel option value.
     * @public
     *
     * @example
     * // get the current value
     * var loglevel = controller.loglevel();
     *
     * // set a new value
     * controller.loglevel(3);
     *
     * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
     * @returns {(number|Controller)} Current loglevel or parent object for chaining.
     */


    this.loglevel = function (newLoglevel) {
      if (!arguments.length) {
        // get
        return _options.loglevel;
      } else if (_options.loglevel != newLoglevel) {
        // set
        _options.loglevel = newLoglevel;
      }

      return Controller;
    };
    /**
     * **Get** or **Set** the current enabled state of the controller.  
     * This can be used to disable all Scenes connected to the controller without destroying or removing them.
     * @public
     *
     * @example
     * // get the current value
     * var enabled = controller.enabled();
     *
     * // disable the controller
     * controller.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
     * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Controller.updateScene(_sceneObjects, true);
      }

      return Controller;
    };
    /**
     * Destroy the Controller, all Scenes and everything.
     * @public
     *
     * @example
     * // without resetting the scenes
     * controller = controller.destroy();
     *
     * // with scene reset
     * controller = controller.destroy(true);
     *
     * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (resetScenes) {
      window.clearTimeout(_refreshTimeout);
      var i = _sceneObjects.length;

      while (i--) {
        _sceneObjects[i].destroy(resetScenes);
      }

      _options.container.removeEventListener("resize", onChange);

      _options.container.removeEventListener("scroll", onChange);

      _util.cAF(_updateTimeout);

      log(3, "destroyed " + NAMESPACE + " (reset: " + (resetScenes ? "true" : "false") + ")");
      return null;
    }; // INIT


    construct();
    return Controller;
  }; // store pagewide controller options


  var CONTROLLER_OPTIONS = {
    defaults: {
      container: window,
      vertical: true,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100
    }
  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   */

  ScrollMagic.Controller.addOption = function (name, defaultValue) {
    CONTROLLER_OPTIONS.defaults[name] = defaultValue;
  }; // instance extension function for plugins


  ScrollMagic.Controller.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Controller = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Controller, oldClass); // copy properties


    ScrollMagic.Controller.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Controller.prototype.constructor = ScrollMagic.Controller; // restore constructor
  };
  /**
   * A Scene defines where the controller should react and how.
   *
   * @class
   *
   * @example
   * // create a standard scene and add it to a controller
   * new ScrollMagic.Scene()
   *		.addTo(controller);
   *
   * // create a scene with custom options and assign a handler to it.
   * var scene = new ScrollMagic.Scene({
   * 		duration: 100,
   *		offset: 200,
   *		triggerHook: "onEnter",
   *		reverse: false
   * });
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
   							   Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
   							   When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
   * @param {(number|string|function)} [options.duration=0] - The duration of the scene. 
   					Please see `Scene.duration()` for details.
   * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
   * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
   * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
   															  Can also be defined using a string:
   															  ** `"onEnter"` => `1`
   															  ** `"onCenter"` => `0.5`
   															  ** `"onLeave"` => `0`
   * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
   * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
   										  ** `0` => silent
   										  ** `1` => errors
   										  ** `2` => errors, warnings
   										  ** `3` => errors, warnings, debuginfo
   * 
   */


  ScrollMagic.Scene = function (options) {
    /*
     * ----------------------------------------------------------------
     * settings
     * ----------------------------------------------------------------
     */
    var NAMESPACE = 'ScrollMagic.Scene',
        SCENE_STATE_BEFORE = 'BEFORE',
        SCENE_STATE_DURING = 'DURING',
        SCENE_STATE_AFTER = 'AFTER',
        DEFAULT_OPTIONS = SCENE_OPTIONS.defaults;
    /*
     * ----------------------------------------------------------------
     * private vars
     * ----------------------------------------------------------------
     */

    var Scene = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _state = SCENE_STATE_BEFORE,
        _progress = 0,
        _scrollOffset = {
      start: 0,
      end: 0
    },
        // reflects the controllers's scroll position for the start and end of the scene respectively
    _triggerPos = 0,
        _enabled = true,
        _durationUpdateMethod,
        _controller;
    /**
     * Internal constructor function of the ScrollMagic Scene
     * @private
     */


    var construct = function () {
      for (var key in _options) {
        // check supplied options
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      } // add getters/setters for all possible options


      for (var optionName in DEFAULT_OPTIONS) {
        addSceneOption(optionName);
      } // validate all options


      validateOption();
    };
    /*
     * ----------------------------------------------------------------
     * Event Management
     * ----------------------------------------------------------------
     */


    var _listeners = {};
    /**
     * Scene start event.  
     * Fires whenever the scroll position its the starting point of the scene.  
     * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#start
     *
     * @example
     * scene.on("start", function (event) {
     * 	console.log("Hit start point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene end event.  
     * Fires whenever the scroll position its the ending point of the scene.  
     * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#end
     *
     * @example
     * scene.on("end", function (event) {
     * 	console.log("Hit end point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene enter event.  
     * Fires whenever the scene enters the "DURING" state.  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#enter
     *
     * @example
     * scene.on("enter", function (event) {
     * 	console.log("Scene entered.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene - always `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene leave event.  
     * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#leave
     *
     * @example
     * scene.on("leave", function (event) {
     * 	console.log("Scene left.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene update event.  
     * Fires whenever the scene is updated (but not necessarily changes the progress).
     *
     * @event ScrollMagic.Scene#update
     *
     * @example
     * scene.on("update", function (event) {
     * 	console.log("Scene updated.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
     * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
     * @property {number} event.scrollPos - The current scroll position of the container
     */

    /**
     * Scene progress event.  
     * Fires whenever the progress of the scene changes.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#progress
     *
     * @example
     * scene.on("progress", function (event) {
     * 	console.log("Scene progress changed to " + event.progress);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene change event.  
     * Fires whenvever a property of the scene is changed.
     *
     * @event ScrollMagic.Scene#change
     *
     * @example
     * scene.on("change", function (event) {
     * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.what - Indicates what value has been changed
     * @property {mixed} event.newval - The new value of the changed property
     */

    /**
     * Scene shift event.  
     * Fires whenvever the start or end **scroll offset** of the scene change.
     * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
     * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
     * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
     *
     * @event ScrollMagic.Scene#shift
     * @since 1.1.0
     *
     * @example
     * scene.on("shift", function (event) {
     * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.reason - Indicates why the scene has shifted
     */

    /**
     * Scene destroy event.  
     * Fires whenvever the scene is destroyed.
     * This can be used to tidy up custom behaviour used in events.
     *
     * @event ScrollMagic.Scene#destroy
     * @since 1.1.0
     *
     * @example
     * scene.on("enter", function (event) {
     *        // add custom action
     *        $("#my-elem").left("200");
     *      })
     *      .on("destroy", function (event) {
     *        // reset my element to start position
     *        if (event.reset) {
     *          $("#my-elem").left("0");
     *        }
     *      });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
     */

    /**
     * Scene add event.  
     * Fires when the scene is added to a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#add
     * @since 2.0.0
     *
     * @example
     * scene.on("add", function (event) {
     * 	console.log('Scene was added to a new controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.controller - The controller object the scene was added to.
     */

    /**
     * Scene remove event.  
     * Fires when the scene is removed from a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#remove
     * @since 2.0.0
     *
     * @example
     * scene.on("remove", function (event) {
     * 	console.log('Scene was removed from its controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     */

    /**
     * Add one ore more event listener.  
     * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
     * @method ScrollMagic.Scene#on
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update progress start end enter leave", callback);
     *
     * @param {string} names - The name or names of the event the callback should be attached to.
     * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */

    this.on = function (names, callback) {
      if (_util.type.Function(callback)) {
        names = names.trim().split(' ');
        names.forEach(function (fullname) {
          var nameparts = fullname.split('.'),
              eventname = nameparts[0],
              namespace = nameparts[1];

          if (eventname != "*") {
            // disallow wildcards
            if (!_listeners[eventname]) {
              _listeners[eventname] = [];
            }

            _listeners[eventname].push({
              namespace: namespace || '',
              callback: callback
            });
          }
        });
      } else {
        log(1, "ERROR when calling '.on()': Supplied callback for '" + names + "' is not a valid function!");
      }

      return Scene;
    };
    /**
     * Remove one or more event listener.
     * @method ScrollMagic.Scene#off
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update", callback);
     * // remove listeners
     * scene.off("change update", callback);
     *
     * @param {string} names - The name or names of the event that should be removed.
     * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.off = function (names, callback) {
      if (!names) {
        log(1, "ERROR: Invalid event name supplied.");
        return Scene;
      }

      names = names.trim().split(' ');
      names.forEach(function (fullname, key) {
        var nameparts = fullname.split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1] || '',
            removeList = eventname === '*' ? Object.keys(_listeners) : [eventname];
        removeList.forEach(function (remove) {
          var list = _listeners[remove] || [],
              i = list.length;

          while (i--) {
            var listener = list[i];

            if (listener && (namespace === listener.namespace || namespace === '*') && (!callback || callback == listener.callback)) {
              list.splice(i, 1);
            }
          }

          if (!list.length) {
            delete _listeners[remove];
          }
        });
      });
      return Scene;
    };
    /**
     * Trigger an event.
     * @method ScrollMagic.Scene#trigger
     *
     * @example
     * this.trigger("change");
     *
     * @param {string} name - The name of the event that should be triggered.
     * @param {object} [vars] - An object containing info that should be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */


    this.trigger = function (name, vars) {
      if (name) {
        var nameparts = name.trim().split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1],
            listeners = _listeners[eventname];
        log(3, 'event fired:', eventname, vars ? "->" : '', vars || '');

        if (listeners) {
          listeners.forEach(function (listener, key) {
            if (!namespace || namespace === listener.namespace) {
              listener.callback.call(Scene, new ScrollMagic.Event(eventname, listener.namespace, Scene, vars));
            }
          });
        }
      } else {
        log(1, "ERROR: Invalid event name supplied.");
      }

      return Scene;
    }; // set event listeners


    Scene.on("change.internal", function (e) {
      if (e.what !== "loglevel" && e.what !== "tweenChanges") {
        // no need for a scene update scene with these options...
        if (e.what === "triggerElement") {
          updateTriggerElementPosition();
        } else if (e.what === "reverse") {
          // the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
          Scene.update();
        }
      }
    }).on("shift.internal", function (e) {
      updateScrollOffset();
      Scene.update(); // update scene to reflect new position
    });
    /**
     * Send a debug message to the console.
     * @private
     * but provided publicly with _log for plugins
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */

    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    };
    /**
     * Add the scene to a controller.  
     * This is the equivalent to `Controller.addScene(scene)`.
     * @method ScrollMagic.Scene#addTo
     *
     * @example
     * // add a scene to a ScrollMagic Controller
     * scene.addTo(controller);
     *
     * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
     * @returns {Scene} Parent object for chaining.
     */


    this.addTo = function (controller) {
      if (!(controller instanceof ScrollMagic.Controller)) {
        log(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
      } else if (_controller != controller) {
        // new controller
        if (_controller) {
          // was associated to a different controller before, so remove it...
          _controller.removeScene(Scene);
        }

        _controller = controller;
        validateOption();
        updateDuration(true);
        updateTriggerElementPosition(true);
        updateScrollOffset();

        _controller.info("container").addEventListener('resize', onContainerResize);

        controller.addScene(Scene);
        Scene.trigger("add", {
          controller: _controller
        });
        log(3, "added " + NAMESPACE + " to controller");
        Scene.update();
      }

      return Scene;
    };
    /**
     * **Get** or **Set** the current enabled state of the scene.  
     * This can be used to disable this scene without removing or destroying it.
     * @method ScrollMagic.Scene#enabled
     *
     * @example
     * // get the current value
     * var enabled = scene.enabled();
     *
     * // disable the scene
     * scene.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
     * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Scene.update(true);
      }

      return Scene;
    };
    /**
     * Remove the scene from the controller.  
     * This is the equivalent to `Controller.removeScene(scene)`.
     * The scene will not be updated anymore until you readd it to a controller.
     * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
     * @method ScrollMagic.Scene#remove
     * @example
     * // remove the scene from its controller
     * scene.remove();
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.remove = function () {
      if (_controller) {
        _controller.info("container").removeEventListener('resize', onContainerResize);

        var tmpParent = _controller;
        _controller = undefined;
        tmpParent.removeScene(Scene);
        Scene.trigger("remove");
        log(3, "removed " + NAMESPACE + " from controller");
      }

      return Scene;
    };
    /**
     * Destroy the scene and everything.
     * @method ScrollMagic.Scene#destroy
     * @example
     * // destroy the scene without resetting the pin and tween to their initial positions
     * scene = scene.destroy();
     *
     * // destroy the scene and reset the pin and tween
     * scene = scene.destroy(true);
     *
     * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (reset) {
      Scene.trigger("destroy", {
        reset: reset
      });
      Scene.remove();
      Scene.off("*.*");
      log(3, "destroyed " + NAMESPACE + " (reset: " + (reset ? "true" : "false") + ")");
      return null;
    };
    /**
     * Updates the Scene to reflect the current state.  
     * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
     * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
     * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
     * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
     * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
     * @method ScrollMagic.Scene#update
     * @example
     * // update the scene on next tick
     * scene.update();
     *
     * // update the scene immediately
     * scene.update(true);
     *
     * @fires Scene.update
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
     * @returns {Scene} Parent object for chaining.
     */


    this.update = function (immediately) {
      if (_controller) {
        if (immediately) {
          if (_controller.enabled() && _enabled) {
            var scrollPos = _controller.info("scrollPos"),
                newProgress;

            if (_options.duration > 0) {
              newProgress = (scrollPos - _scrollOffset.start) / (_scrollOffset.end - _scrollOffset.start);
            } else {
              newProgress = scrollPos >= _scrollOffset.start ? 1 : 0;
            }

            Scene.trigger("update", {
              startPos: _scrollOffset.start,
              endPos: _scrollOffset.end,
              scrollPos: scrollPos
            });
            Scene.progress(newProgress);
          } else if (_pin && _state === SCENE_STATE_DURING) {
            updatePinState(true); // unpin in position
          }
        } else {
          _controller.updateScene(Scene, false);
        }
      }

      return Scene;
    };
    /**
     * Updates dynamic scene variables like the trigger element position or the duration.
     * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
     * 
     * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
     * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
     *
     * @method ScrollMagic.Scene#refresh
     * @since 1.1.0
     * @example
     * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
     * 
     * // change the position of the trigger
     * $("#trigger").css("top", 500);
     * // immediately let the scene know of this change
     * scene.refresh();
     *
     * @fires {@link Scene.shift}, if the trigger element position or the duration changed
     * @fires {@link Scene.change}, if the duration changed
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.refresh = function () {
      updateDuration();
      updateTriggerElementPosition(); // update trigger element position

      return Scene;
    };
    /**
     * **Get** or **Set** the scene's progress.  
     * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
     * The order in which the events are fired depends on the duration of the scene:
     *  1. Scenes with `duration == 0`:  
     *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
     *  When the trigger position of the scene is passed the events are always fired in this order:  
     *  `enter`, `start`, `progress` when scrolling forward  
     *  and  
     *  `progress`, `start`, `leave` when scrolling in reverse
     *  2. Scenes with `duration > 0`:  
     *  Scenes with a set duration have a defined start and end point.  
     *  When scrolling past the start position of the scene it will fire these events in this order:  
     *  `enter`, `start`, `progress`  
     *  When continuing to scroll and passing the end point it will fire these events:  
     *  `progress`, `end`, `leave`  
     *  When reversing through the end point these events are fired:  
     *  `enter`, `end`, `progress`  
     *  And when continuing to scroll past the start position in reverse it will fire:  
     *  `progress`, `start`, `leave`  
     *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
     * 
     * In short:  
     * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
     * `start` and `end` will always trigger at their respective position.
     * 
     * Please review the event descriptions for details on the events and the event object that is passed to the callback.
     * 
     * @method ScrollMagic.Scene#progress
     * @example
     * // get the current scene progress
     * var progress = scene.progress();
     *
     * // set new scene progress
     * scene.progress(0.3);
     *
     * @fires {@link Scene.enter}, when used as setter
     * @fires {@link Scene.start}, when used as setter
     * @fires {@link Scene.progress}, when used as setter
     * @fires {@link Scene.end}, when used as setter
     * @fires {@link Scene.leave}, when used as setter
     *
     * @param {number} [progress] - The new progress value of the scene `[0-1]`.
     * @returns {number} `get` -  Current scene progress.
     * @returns {Scene} `set` -  Parent object for chaining.
     */


    this.progress = function (progress) {
      if (!arguments.length) {
        // get
        return _progress;
      } else {
        // set
        var doUpdate = false,
            oldState = _state,
            scrollDirection = _controller ? _controller.info("scrollDirection") : 'PAUSED',
            reverseOrForward = _options.reverse || progress >= _progress;

        if (_options.duration === 0) {
          // zero duration scenes
          doUpdate = _progress != progress;
          _progress = progress < 1 && reverseOrForward ? 0 : 1;
          _state = _progress === 0 ? SCENE_STATE_BEFORE : SCENE_STATE_DURING;
        } else {
          // scenes with start and end
          if (progress < 0 && _state !== SCENE_STATE_BEFORE && reverseOrForward) {
            // go back to initial state
            _progress = 0;
            _state = SCENE_STATE_BEFORE;
            doUpdate = true;
          } else if (progress >= 0 && progress < 1 && reverseOrForward) {
            _progress = progress;
            _state = SCENE_STATE_DURING;
            doUpdate = true;
          } else if (progress >= 1 && _state !== SCENE_STATE_AFTER) {
            _progress = 1;
            _state = SCENE_STATE_AFTER;
            doUpdate = true;
          } else if (_state === SCENE_STATE_DURING && !reverseOrForward) {
            updatePinState(); // in case we scrolled backwards mid-scene and reverse is disabled => update the pin position, so it doesn't move back as well.
          }
        }

        if (doUpdate) {
          // fire events
          var eventVars = {
            progress: _progress,
            state: _state,
            scrollDirection: scrollDirection
          },
              stateChanged = _state != oldState;

          var trigger = function (eventName) {
            // tmp helper to simplify code
            Scene.trigger(eventName, eventVars);
          };

          if (stateChanged) {
            // enter events
            if (oldState !== SCENE_STATE_DURING) {
              trigger("enter");
              trigger(oldState === SCENE_STATE_BEFORE ? "start" : "end");
            }
          }

          trigger("progress");

          if (stateChanged) {
            // leave events
            if (_state !== SCENE_STATE_DURING) {
              trigger(_state === SCENE_STATE_BEFORE ? "start" : "end");
              trigger("leave");
            }
          }
        }

        return Scene;
      }
    };
    /**
     * Update the start and end scrollOffset of the container.
     * The positions reflect what the controller's scroll position will be at the start and end respectively.
     * Is called, when:
     *   - Scene event "change" is called with: offset, triggerHook, duration 
     *   - scroll container event "resize" is called
     *   - the position of the triggerElement changes
     *   - the controller changes -> addTo()
     * @private
     */


    var updateScrollOffset = function () {
      _scrollOffset = {
        start: _triggerPos + _options.offset
      };

      if (_controller && _options.triggerElement) {
        // take away triggerHook portion to get relative to top
        _scrollOffset.start -= _controller.info("size") * _options.triggerHook;
      }

      _scrollOffset.end = _scrollOffset.start + _options.duration;
    };
    /**
     * Updates the duration if set to a dynamic function.
     * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.change}, if the duration changed
     * @fires {@link Scene.shift}, if the duration changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateDuration = function (suppressEvents) {
      // update duration
      if (_durationUpdateMethod) {
        var varname = "duration";

        if (changeOption(varname, _durationUpdateMethod.call(Scene)) && !suppressEvents) {
          // set
          Scene.trigger("change", {
            what: varname,
            newval: _options[varname]
          });
          Scene.trigger("shift", {
            reason: varname
          });
        }
      }
    };
    /**
     * Updates the position of the triggerElement, if present.
     * This method is called ...
     *  - ... when the triggerElement is changed
     *  - ... when the scene is added to a (new) controller
     *  - ... in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.shift}, if the position changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateTriggerElementPosition = function (suppressEvents) {
      var elementPos = 0,
          telem = _options.triggerElement;

      if (_controller && (telem || _triggerPos > 0)) {
        // either an element exists or was removed and the triggerPos is still > 0
        if (telem) {
          // there currently a triggerElement set
          if (telem.parentNode) {
            // check if element is still attached to DOM
            var controllerInfo = _controller.info(),
                containerOffset = _util.get.offset(controllerInfo.container),
                // container position is needed because element offset is returned in relation to document, not in relation to container.
            param = controllerInfo.vertical ? "top" : "left"; // which param is of interest ?
            // if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.


            while (telem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
              telem = telem.parentNode;
            }

            var elementOffset = _util.get.offset(telem);

            if (!controllerInfo.isDocument) {
              // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
              containerOffset[param] -= _controller.scrollPos();
            }

            elementPos = elementOffset[param] - containerOffset[param];
          } else {
            // there was an element, but it was removed from DOM
            log(2, "WARNING: triggerElement was removed from DOM and will be reset to", undefined);
            Scene.triggerElement(undefined); // unset, so a change event is triggered
          }
        }

        var changed = elementPos != _triggerPos;
        _triggerPos = elementPos;

        if (changed && !suppressEvents) {
          Scene.trigger("shift", {
            reason: "triggerElementPosition"
          });
        }
      }
    };
    /**
     * Trigger a shift event, when the container is resized and the triggerHook is > 1.
     * @private
     */


    var onContainerResize = function (e) {
      if (_options.triggerHook > 0) {
        Scene.trigger("shift", {
          reason: "containerResize"
        });
      }
    };

    var _validate = _util.extend(SCENE_OPTIONS.validate, {
      // validation for duration handled internally for reference to private var _durationMethod
      duration: function (val) {
        if (_util.type.String(val) && val.match(/^(\.|\d)*\d+%$/)) {
          // percentage value
          var perc = parseFloat(val) / 100;

          val = function () {
            return _controller ? _controller.info("size") * perc : 0;
          };
        }

        if (_util.type.Function(val)) {
          // function
          _durationUpdateMethod = val;

          try {
            val = parseFloat(_durationUpdateMethod.call(Scene));
          } catch (e) {
            val = -1; // will cause error below
          }
        } // val has to be float


        val = parseFloat(val);

        if (!_util.type.Number(val) || val < 0) {
          if (_durationUpdateMethod) {
            _durationUpdateMethod = undefined;
            throw ["Invalid return value of supplied function for option \"duration\":", val];
          } else {
            throw ["Invalid value for option \"duration\":", val];
          }
        }

        return val;
      }
    });
    /**
     * Checks the validity of a specific or all options and reset to default if neccessary.
     * @private
     */


    var validateOption = function (check) {
      check = arguments.length ? [check] : Object.keys(_validate);
      check.forEach(function (optionName, key) {
        var value;

        if (_validate[optionName]) {
          // there is a validation method for this option
          try {
            // validate value
            value = _validate[optionName](_options[optionName]);
          } catch (e) {
            // validation failed -> reset to default
            value = DEFAULT_OPTIONS[optionName];
            var logMSG = _util.type.String(e) ? [e] : e;

            if (_util.type.Array(logMSG)) {
              logMSG[0] = "ERROR: " + logMSG[0];
              logMSG.unshift(1); // loglevel 1 for error msg

              log.apply(this, logMSG);
            } else {
              log(1, "ERROR: Problem executing validation callback for option '" + optionName + "':", e.message);
            }
          } finally {
            _options[optionName] = value;
          }
        }
      });
    };
    /**
     * Helper used by the setter/getters for scene options
     * @private
     */


    var changeOption = function (varname, newval) {
      var changed = false,
          oldval = _options[varname];

      if (_options[varname] != newval) {
        _options[varname] = newval;
        validateOption(varname); // resets to default if necessary

        changed = oldval != _options[varname];
      }

      return changed;
    }; // generate getters/setters for all options


    var addSceneOption = function (optionName) {
      if (!Scene[optionName]) {
        Scene[optionName] = function (newVal) {
          if (!arguments.length) {
            // get
            return _options[optionName];
          } else {
            if (optionName === "duration") {
              // new duration is set, so any previously set function must be unset
              _durationUpdateMethod = undefined;
            }

            if (changeOption(optionName, newVal)) {
              // set
              Scene.trigger("change", {
                what: optionName,
                newval: _options[optionName]
              });

              if (SCENE_OPTIONS.shifts.indexOf(optionName) > -1) {
                Scene.trigger("shift", {
                  reason: optionName
                });
              }
            }
          }

          return Scene;
        };
      }
    };
    /**
     * **Get** or **Set** the duration option value.
     *
     * As a **setter** it accepts three types of parameters:
     * 1. `number`: Sets the duration of the scene to exactly this amount of pixels.  
     *   This means the scene will last for exactly this amount of pixels scrolled. Sub-Pixels are also valid.
     *   A value of `0` means that the scene is 'open end' and no end will be triggered. Pins will never unpin and animations will play independently of scroll progress.
     * 2. `string`: Always updates the duration relative to parent scroll container.  
     *   For example `"100%"` will keep the duration always exactly at the inner height of the scroll container.
     *   When scrolling vertically the width is used for reference respectively.
     * 3. `function`: The supplied function will be called to return the scene duration.
     *   This is useful in setups where the duration depends on other elements who might change size. By supplying a function you can return a value instead of updating potentially multiple scene durations.  
     *   The scene can be referenced inside the callback using `this`.
     *   _**WARNING:** This is an easy way to kill performance, as the callback will be executed every time `Scene.refresh()` is called, which happens a lot. The interval is defined by the controller (see ScrollMagic.Controller option `refreshInterval`).  
     *   It's recomended to avoid calculations within the function and use cached variables as return values.  
     *   This counts double if you use the same function for multiple scenes._
     *
     * @method ScrollMagic.Scene#duration
     * @example
     * // get the current duration value
     * var duration = scene.duration();
     *
     * // set a new duration
     * scene.duration(300);
     *
     * // set duration responsively to container size
     * scene.duration("100%");
     *
     * // use a function to randomize the duration for some reason.
     * var durationValueCache;
     * function durationCallback () {
     *   return durationValueCache;
     * }
     * function updateDuration () {
     *   durationValueCache = Math.random() * 100;
     * }
     * updateDuration(); // set to initial value
     * scene.duration(durationCallback); // set duration callback
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|string|function)} [newDuration] - The new duration setting for the scene.
     * @returns {number} `get` -  Current scene duration.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the offset option value.
     * @method ScrollMagic.Scene#offset
     * @example
     * // get the current offset
     * var offset = scene.offset();
     *
     * // set a new offset
     * scene.offset(100);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {number} [newOffset] - The new offset of the scene.
     * @returns {number} `get` -  Current scene offset.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerElement option value.
     * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
     * @method ScrollMagic.Scene#triggerElement
     * @example
     * // get the current triggerElement
     * var triggerElement = scene.triggerElement();
     *
     * // set a new triggerElement using a selector
     * scene.triggerElement("#trigger");
     * // set a new triggerElement using a DOM object
     * scene.triggerElement(document.getElementById("trigger"));
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
     * @returns {(string|object)} `get` -  Current triggerElement.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerHook option value.
     * @method ScrollMagic.Scene#triggerHook
     * @example
     * // get the current triggerHook value
     * var triggerHook = scene.triggerHook();
     *
     * // set a new triggerHook using a string
     * scene.triggerHook("onLeave");
     * // set a new triggerHook using a number
     * scene.triggerHook(0.7);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
     * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the reverse option value.
     * @method ScrollMagic.Scene#reverse
     * @example
     * // get the current reverse option
     * var reverse = scene.reverse();
     *
     * // set new reverse option
     * scene.reverse(false);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {boolean} [newReverse] - The new reverse setting of the scene.
     * @returns {boolean} `get` -  Current reverse option value.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the loglevel option value.
     * @method ScrollMagic.Scene#loglevel
     * @example
     * // get the current loglevel
     * var loglevel = scene.loglevel();
     *
     * // set new loglevel
     * scene.loglevel(3);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
     * @returns {number} `get` -  Current loglevel.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** the associated controller.
     * @method ScrollMagic.Scene#controller
     * @example
     * // get the controller of a scene
     * var controller = scene.controller();
     *
     * @returns {ScrollMagic.Controller} Parent controller or `undefined`
     */


    this.controller = function () {
      return _controller;
    };
    /**
     * **Get** the current state.
     * @method ScrollMagic.Scene#state
     * @example
     * // get the current state
     * var state = scene.state();
     *
     * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
     */


    this.state = function () {
      return _state;
    };
    /**
     * **Get** the current scroll offset for the start of the scene.  
     * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
     * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
     * @method ScrollMagic.Scene#scrollOffset
     * @example
     * // get the current scroll offset for the start and end of the scene.
     * var start = scene.scrollOffset();
     * var end = scene.scrollOffset() + scene.duration();
     * console.log("the scene starts at", start, "and ends at", end);
     *
     * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
     */


    this.scrollOffset = function () {
      return _scrollOffset.start;
    };
    /**
     * **Get** the trigger position of the scene (including the value of the `offset` option).  
     * @method ScrollMagic.Scene#triggerPosition
     * @example
     * // get the scene's trigger position
     * var triggerPosition = scene.triggerPosition();
     *
     * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
     */


    this.triggerPosition = function () {
      var pos = _options.offset; // the offset is the basis

      if (_controller) {
        // get the trigger position
        if (_options.triggerElement) {
          // Element as trigger
          pos += _triggerPos;
        } else {
          // return the height of the triggerHook to start at the beginning
          pos += _controller.info("size") * Scene.triggerHook();
        }
      }

      return pos;
    };

    var _pin, _pinOptions;

    Scene.on("shift.internal", function (e) {
      var durationChanged = e.reason === "duration";

      if (_state === SCENE_STATE_AFTER && durationChanged || _state === SCENE_STATE_DURING && _options.duration === 0) {
        // if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
        updatePinState();
      }

      if (durationChanged) {
        updatePinDimensions();
      }
    }).on("progress.internal", function (e) {
      updatePinState();
    }).on("add.internal", function (e) {
      updatePinDimensions();
    }).on("destroy.internal", function (e) {
      Scene.removePin(e.reset);
    });
    /**
     * Update the pin state.
     * @private
     */

    var updatePinState = function (forceUnpin) {
      if (_pin && _controller) {
        var containerInfo = _controller.info(),
            pinTarget = _pinOptions.spacer.firstChild; // may be pin element or another spacer, if cascading pins


        if (!forceUnpin && _state === SCENE_STATE_DURING) {
          // during scene or if duration is 0 and we are past the trigger
          // pinned state
          if (_util.css(pinTarget, "position") != "fixed") {
            // change state before updating pin spacer (position changes due to fixed collapsing might occur.)
            _util.css(pinTarget, {
              "position": "fixed"
            }); // update pin spacer


            updatePinDimensions();
          }

          var fixedPos = _util.get.offset(_pinOptions.spacer, true),
              // get viewport position of spacer
          scrollDistance = _options.reverse || _options.duration === 0 ? containerInfo.scrollPos - _scrollOffset.start // quicker
          : Math.round(_progress * _options.duration * 10) / 10; // if no reverse and during pin the position needs to be recalculated using the progress
          // add scrollDistance


          fixedPos[containerInfo.vertical ? "top" : "left"] += scrollDistance; // set new values

          _util.css(_pinOptions.spacer.firstChild, {
            top: fixedPos.top,
            left: fixedPos.left
          });
        } else {
          // unpinned state
          var newCSS = {
            position: _pinOptions.inFlow ? "relative" : "absolute",
            top: 0,
            left: 0
          },
              change = _util.css(pinTarget, "position") != newCSS.position;

          if (!_pinOptions.pushFollowers) {
            newCSS[containerInfo.vertical ? "top" : "left"] = _options.duration * _progress;
          } else if (_options.duration > 0) {
            // only concerns scenes with duration
            if (_state === SCENE_STATE_AFTER && parseFloat(_util.css(_pinOptions.spacer, "padding-top")) === 0) {
              change = true; // if in after state but havent updated spacer yet (jumped past pin)
            } else if (_state === SCENE_STATE_BEFORE && parseFloat(_util.css(_pinOptions.spacer, "padding-bottom")) === 0) {
              // before
              change = true; // jumped past fixed state upward direction
            }
          } // set new values


          _util.css(pinTarget, newCSS);

          if (change) {
            // update pin spacer if state changed
            updatePinDimensions();
          }
        }
      }
    };
    /**
     * Update the pin spacer and/or element size.
     * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
     * @private
     */


    var updatePinDimensions = function () {
      if (_pin && _controller && _pinOptions.inFlow) {
        // no spacerresize, if original position is absolute
        var after = _state === SCENE_STATE_AFTER,
            before = _state === SCENE_STATE_BEFORE,
            during = _state === SCENE_STATE_DURING,
            vertical = _controller.info("vertical"),
            pinTarget = _pinOptions.spacer.firstChild,
            // usually the pined element but can also be another spacer (cascaded pins)
        marginCollapse = _util.isMarginCollapseType(_util.css(_pinOptions.spacer, "display")),
            css = {}; // set new size
        // if relsize: spacer -> pin | else: pin -> spacer


        if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
          if (during) {
            _util.css(_pin, {
              "width": _util.get.width(_pinOptions.spacer)
            });
          } else {
            _util.css(_pin, {
              "width": "100%"
            });
          }
        } else {
          // minwidth is needed for cascaded pins.
          css["min-width"] = _util.get.width(vertical ? _pin : pinTarget, true, true);
          css.width = during ? css["min-width"] : "auto";
        }

        if (_pinOptions.relSize.height) {
          if (during) {
            // the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
            _util.css(_pin, {
              "height": _util.get.height(_pinOptions.spacer) - (_pinOptions.pushFollowers ? _options.duration : 0)
            });
          } else {
            _util.css(_pin, {
              "height": "100%"
            });
          }
        } else {
          // margin is only included if it's a cascaded pin to resolve an IE9 bug
          css["min-height"] = _util.get.height(vertical ? pinTarget : _pin, true, !marginCollapse); // needed for cascading pins

          css.height = during ? css["min-height"] : "auto";
        } // add space for duration if pushFollowers is true


        if (_pinOptions.pushFollowers) {
          css["padding" + (vertical ? "Top" : "Left")] = _options.duration * _progress;
          css["padding" + (vertical ? "Bottom" : "Right")] = _options.duration * (1 - _progress);
        }

        _util.css(_pinOptions.spacer, css);
      }
    };
    /**
     * Updates the Pin state (in certain scenarios)
     * If the controller container is not the document and we are mid-pin-phase scrolling or resizing the main document can result to wrong pin positions.
     * So this function is called on resize and scroll of the document.
     * @private
     */


    var updatePinInContainer = function () {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        updatePinState();
      }
    };
    /**
     * Updates the Pin spacer size state (in certain scenarios)
     * If container is resized during pin and relatively sized the size of the pin might need to be updated...
     * So this function is called on resize of the container.
     * @private
     */


    var updateRelativePinSpacer = function () {
      if (_controller && _pin && // well, duh
      _state === SCENE_STATE_DURING && ( // element in pinned state?
      // is width or height relatively sized, but not in relation to body? then we need to recalc.
      (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) && _util.get.width(window) != _util.get.width(_pinOptions.spacer.parentNode) || _pinOptions.relSize.height && _util.get.height(window) != _util.get.height(_pinOptions.spacer.parentNode))) {
        updatePinDimensions();
      }
    };
    /**
     * Is called, when the mousewhel is used while over a pinned element inside a div container.
     * If the scene is in fixed state scroll events would be counted towards the body. This forwards the event to the scroll container.
     * @private
     */


    var onMousewheelOverPin = function (e) {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        // in pin state
        e.preventDefault();

        _controller._setScrollPos(_controller.info("scrollPos") - ((e.wheelDelta || e[_controller.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || -e.detail * 30));
      }
    };
    /**
     * Pin an element for the duration of the scene.
     * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
     * Make sure only one pin is applied to an element at the same time.
     * An element can be pinned multiple times, but only successively.
     * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
     * @method ScrollMagic.Scene#setPin
     * @example
     * // pin element and push all following elements down by the amount of the pin duration.
     * scene.setPin("#pin");
     *
     * // pin element and keeping all following elements in their place. The pinned element will move past them.
     * scene.setPin("#pin", {pushFollowers: false});
     *
     * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
     * @param {object} [settings] - settings for the pin
     * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
     												   Ignored, when duration is `0`.
     * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.setPin = function (element, settings) {
      var defaultSettings = {
        pushFollowers: true,
        spacerClass: "scrollmagic-pin-spacer"
      };
      var pushFollowersActivelySet = settings && settings.hasOwnProperty('pushFollowers');
      settings = _util.extend({}, defaultSettings, settings); // validate Element

      element = _util.get.elements(element)[0];

      if (!element) {
        log(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
        return Scene; // cancel
      } else if (_util.css(element, "position") === "fixed") {
        log(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.");
        return Scene; // cancel
      }

      if (_pin) {
        // preexisting pin?
        if (_pin === element) {
          // same pin we already have -> do nothing
          return Scene; // cancel
        } else {
          // kill old pin
          Scene.removePin();
        }
      }

      _pin = element;
      var parentDisplay = _pin.parentNode.style.display,
          boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
      _pin.parentNode.style.display = 'none'; // hack start to force css to return stylesheet values instead of calculated px values.

      var inFlow = _util.css(_pin, "position") != "absolute",
          pinCSS = _util.css(_pin, boundsParams.concat(["display"])),
          sizeCSS = _util.css(_pin, ["width", "height"]);

      _pin.parentNode.style.display = parentDisplay; // hack end.

      if (!inFlow && settings.pushFollowers) {
        log(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.");
        settings.pushFollowers = false;
      }

      window.setTimeout(function () {
        // wait until all finished, because with responsive duration it will only be set after scene is added to controller
        if (_pin && _options.duration === 0 && pushFollowersActivelySet && settings.pushFollowers) {
          log(2, "WARNING: pushFollowers =", true, "has no effect, when scene duration is 0.");
        }
      }, 0); // create spacer and insert

      var spacer = _pin.parentNode.insertBefore(document.createElement('div'), _pin),
          spacerCSS = _util.extend(pinCSS, {
        position: inFlow ? "relative" : "absolute",
        boxSizing: "content-box",
        mozBoxSizing: "content-box",
        webkitBoxSizing: "content-box"
      });

      if (!inFlow) {
        // copy size if positioned absolutely, to work for bottom/right positioned elements.
        _util.extend(spacerCSS, _util.css(_pin, ["width", "height"]));
      }

      _util.css(spacer, spacerCSS);

      spacer.setAttribute(PIN_SPACER_ATTRIBUTE, "");

      _util.addClass(spacer, settings.spacerClass); // set the pin Options


      _pinOptions = {
        spacer: spacer,
        relSize: {
          // save if size is defined using % values. if so, handle spacer resize differently...
          width: sizeCSS.width.slice(-1) === "%",
          height: sizeCSS.height.slice(-1) === "%",
          autoFullWidth: sizeCSS.width === "auto" && inFlow && _util.isMarginCollapseType(pinCSS.display)
        },
        pushFollowers: settings.pushFollowers,
        inFlow: inFlow // stores if the element takes up space in the document flow

      };

      if (!_pin.___origStyle) {
        _pin.___origStyle = {};
        var pinInlineCSS = _pin.style,
            copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
        copyStyles.forEach(function (val) {
          _pin.___origStyle[val] = pinInlineCSS[val] || "";
        });
      } // if relative size, transfer it to spacer and make pin calculate it...


      if (_pinOptions.relSize.width) {
        _util.css(spacer, {
          width: sizeCSS.width
        });
      }

      if (_pinOptions.relSize.height) {
        _util.css(spacer, {
          height: sizeCSS.height
        });
      } // now place the pin element inside the spacer	


      spacer.appendChild(_pin); // and set new css

      _util.css(_pin, {
        position: inFlow ? "relative" : "absolute",
        margin: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto"
      });

      if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
        _util.css(_pin, {
          boxSizing: "border-box",
          mozBoxSizing: "border-box",
          webkitBoxSizing: "border-box"
        });
      } // add listener to document to update pin position in case controller is not the document.


      window.addEventListener('scroll', updatePinInContainer);
      window.addEventListener('resize', updatePinInContainer);
      window.addEventListener('resize', updateRelativePinSpacer); // add mousewheel listener to catch scrolls over fixed elements

      _pin.addEventListener("mousewheel", onMousewheelOverPin);

      _pin.addEventListener("DOMMouseScroll", onMousewheelOverPin);

      log(3, "added pin"); // finally update the pin to init

      updatePinState();
      return Scene;
    };
    /**
     * Remove the pin from the scene.
     * @method ScrollMagic.Scene#removePin
     * @example
     * // remove the pin from the scene without resetting it (the spacer is not removed)
     * scene.removePin();
     *
     * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
     * scene.removePin(true);
     *
     * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
     * @returns {Scene} Parent object for chaining.
     */


    this.removePin = function (reset) {
      if (_pin) {
        if (_state === SCENE_STATE_DURING) {
          updatePinState(true); // force unpin at position
        }

        if (reset || !_controller) {
          // if there's no controller no progress was made anyway...
          var pinTarget = _pinOptions.spacer.firstChild; // usually the pin element, but may be another spacer (cascaded pins)...

          if (pinTarget.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // copy margins to child spacer
            var style = _pinOptions.spacer.style,
                values = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"],
                margins = {};
            values.forEach(function (val) {
              margins[val] = style[val] || "";
            });

            _util.css(pinTarget, margins);
          }

          _pinOptions.spacer.parentNode.insertBefore(pinTarget, _pinOptions.spacer);

          _pinOptions.spacer.parentNode.removeChild(_pinOptions.spacer);

          if (!_pin.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // if it's the last pin for this element -> restore inline styles
            // TODO: only correctly set for first pin (when cascading) - how to fix?
            _util.css(_pin, _pin.___origStyle);

            delete _pin.___origStyle;
          }
        }

        window.removeEventListener('scroll', updatePinInContainer);
        window.removeEventListener('resize', updatePinInContainer);
        window.removeEventListener('resize', updateRelativePinSpacer);

        _pin.removeEventListener("mousewheel", onMousewheelOverPin);

        _pin.removeEventListener("DOMMouseScroll", onMousewheelOverPin);

        _pin = undefined;
        log(3, "removed pin (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };

    var _cssClasses,
        _cssClassElems = [];

    Scene.on("destroy.internal", function (e) {
      Scene.removeClassToggle(e.reset);
    });
    /**
     * Define a css class modification while the scene is active.  
     * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
     * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
     * @method ScrollMagic.Scene#setClassToggle
     * @example
     * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
     * scene.setClassToggle("#my-elem", "myclass");
     *
     * // add multiple classes to multiple elements defined by the selector '.classChange'
     * scene.setClassToggle(".classChange", "class1 class2 class3");
     *
     * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
     * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
     *
     * @returns {Scene} Parent object for chaining.
     */

    this.setClassToggle = function (element, classes) {
      var elems = _util.get.elements(element);

      if (elems.length === 0 || !_util.type.String(classes)) {
        log(1, "ERROR calling method 'setClassToggle()': Invalid " + (elems.length === 0 ? "element" : "classes") + " supplied.");
        return Scene;
      }

      if (_cssClassElems.length > 0) {
        // remove old ones
        Scene.removeClassToggle();
      }

      _cssClasses = classes;
      _cssClassElems = elems;
      Scene.on("enter.internal_class leave.internal_class", function (e) {
        var toggle = e.type === "enter" ? _util.addClass : _util.removeClass;

        _cssClassElems.forEach(function (elem, key) {
          toggle(elem, _cssClasses);
        });
      });
      return Scene;
    };
    /**
     * Remove the class binding from the scene.
     * @method ScrollMagic.Scene#removeClassToggle
     * @example
     * // remove class binding from the scene without reset
     * scene.removeClassToggle();
     *
     * // remove class binding and remove the changes it caused
     * scene.removeClassToggle(true);
     *
     * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.removeClassToggle = function (reset) {
      if (reset) {
        _cssClassElems.forEach(function (elem, key) {
          _util.removeClass(elem, _cssClasses);
        });
      }

      Scene.off("start.internal_class end.internal_class");
      _cssClasses = undefined;
      _cssClassElems = [];
      return Scene;
    }; // INIT


    construct();
    return Scene;
  }; // store pagewide scene options


  var SCENE_OPTIONS = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: undefined,
      triggerHook: 0.5,
      reverse: true,
      loglevel: 2
    },
    validate: {
      offset: function (val) {
        val = parseFloat(val);

        if (!_util.type.Number(val)) {
          throw ["Invalid value for option \"offset\":", val];
        }

        return val;
      },
      triggerElement: function (val) {
        val = val || undefined;

        if (val) {
          var elem = _util.get.elements(val)[0];

          if (elem && elem.parentNode) {
            val = elem;
          } else {
            throw ["Element defined in option \"triggerElement\" was not found:", val];
          }
        }

        return val;
      },
      triggerHook: function (val) {
        var translate = {
          "onCenter": 0.5,
          "onEnter": 1,
          "onLeave": 0
        };

        if (_util.type.Number(val)) {
          val = Math.max(0, Math.min(parseFloat(val), 1)); //  make sure its betweeen 0 and 1
        } else if (val in translate) {
          val = translate[val];
        } else {
          throw ["Invalid value for option \"triggerHook\": ", val];
        }

        return val;
      },
      reverse: function (val) {
        return !!val; // force boolean
      },
      loglevel: function (val) {
        val = parseInt(val);

        if (!_util.type.Number(val) || val < 0 || val > 3) {
          throw ["Invalid value for option \"loglevel\":", val];
        }

        return val;
      }
    },
    // holder for  validation methods. duration validation is handled in 'getters-setters.js'
    shifts: ["duration", "offset", "triggerHook"] // list of options that trigger a `shift` event

  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   * TODO: DOC (private for dev)
   */

  ScrollMagic.Scene.addOption = function (name, defaultValue, validationCallback, shifts) {
    if (!(name in SCENE_OPTIONS.defaults)) {
      SCENE_OPTIONS.defaults[name] = defaultValue;
      SCENE_OPTIONS.validate[name] = validationCallback;

      if (shifts) {
        SCENE_OPTIONS.shifts.push(name);
      }
    } else {
      ScrollMagic._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + name + "', because it already exists.");
    }
  }; // instance extension function for plugins
  // TODO: DOC (private for dev)


  ScrollMagic.Scene.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Scene = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Scene, oldClass); // copy properties


    ScrollMagic.Scene.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Scene.prototype.constructor = ScrollMagic.Scene; // restore constructor
  };
  /**
   * TODO: DOCS (private for dev)
   * @class
   * @private
   */


  ScrollMagic.Event = function (type, namespace, target, vars) {
    vars = vars || {};

    for (var key in vars) {
      this[key] = vars[key];
    }

    this.type = type;
    this.target = this.currentTarget = target;
    this.namespace = namespace || '';
    this.timeStamp = this.timestamp = Date.now();
    return this;
  };
  /*
   * TODO: DOCS (private for dev)
   */


  var _util = ScrollMagic._util = function (window) {
    var U = {},
        i;
    /**
     * ------------------------------
     * internal helpers
     * ------------------------------
     */
    // parse float and fall back to 0.

    var floatval = function (number) {
      return parseFloat(number) || 0;
    }; // get current style IE safe (otherwise IE would return calculated values for 'auto')


    var _getComputedStyle = function (elem) {
      return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem);
    }; // get element dimension (width or height)


    var _dimension = function (which, elem, outer, includeMargin) {
      elem = elem === document ? window : elem;

      if (elem === window) {
        includeMargin = false;
      } else if (!_type.DomElement(elem)) {
        return 0;
      }

      which = which.charAt(0).toUpperCase() + which.substr(1).toLowerCase();
      var dimension = (outer ? elem['offset' + which] || elem['outer' + which] : elem['client' + which] || elem['inner' + which]) || 0;

      if (outer && includeMargin) {
        var style = _getComputedStyle(elem);

        dimension += which === 'Height' ? floatval(style.marginTop) + floatval(style.marginBottom) : floatval(style.marginLeft) + floatval(style.marginRight);
      }

      return dimension;
    }; // converts 'margin-top' into 'marginTop'


    var _camelCase = function (str) {
      return str.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };
    /**
     * ------------------------------
     * external helpers
     * ------------------------------
     */
    // extend obj – same as jQuery.extend({}, objA, objB)


    U.extend = function (obj) {
      obj = obj || {};

      for (i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }

      return obj;
    }; // check if a css display type results in margin-collapse or not


    U.isMarginCollapseType = function (str) {
      return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(str) > -1;
    }; // implementation of requestAnimationFrame
    // based on https://gist.github.com/paulirish/1579671


    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];
    var _requestAnimationFrame = window.requestAnimationFrame;
    var _cancelAnimationFrame = window.cancelAnimationFrame; // try vendor prefixes if the above doesn't work

    for (i = 0; !_requestAnimationFrame && i < vendors.length; ++i) {
      _requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
      _cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
    } // fallbacks


    if (!_requestAnimationFrame) {
      _requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!_cancelAnimationFrame) {
      _cancelAnimationFrame = function (id) {
        window.clearTimeout(id);
      };
    }

    U.rAF = _requestAnimationFrame.bind(window);
    U.cAF = _cancelAnimationFrame.bind(window);
    var loglevels = ["error", "warn", "log"],
        console = window.console || {};

    console.log = console.log || function () {}; // no console log, well - do nothing then...
    // make sure methods for all levels exist.


    for (i = 0; i < loglevels.length; i++) {
      var method = loglevels[i];

      if (!console[method]) {
        console[method] = console.log; // prefer .log over nothing
      }
    }

    U.log = function (loglevel) {
      if (loglevel > loglevels.length || loglevel <= 0) loglevel = loglevels.length;
      var now = new Date(),
          time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + ":" + ("00" + now.getMilliseconds()).slice(-3),
          method = loglevels[loglevel - 1],
          args = Array.prototype.splice.call(arguments, 1),
          func = Function.prototype.bind.call(console[method], console);
      args.unshift(time);
      func.apply(console, args);
    };
    /**
     * ------------------------------
     * type testing
     * ------------------------------
     */


    var _type = U.type = function (v) {
      return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };

    _type.String = function (v) {
      return _type(v) === 'string';
    };

    _type.Function = function (v) {
      return _type(v) === 'function';
    };

    _type.Array = function (v) {
      return Array.isArray(v);
    };

    _type.Number = function (v) {
      return !_type.Array(v) && v - parseFloat(v) + 1 >= 0;
    };

    _type.DomElement = function (o) {
      return typeof HTMLElement === "object" || typeof HTMLElement === "function" ? o instanceof HTMLElement || o instanceof SVGElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
    };
    /**
     * ------------------------------
     * DOM Element info
     * ------------------------------
     */
    // always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors


    var _get = U.get = {};

    _get.elements = function (selector) {
      var arr = [];

      if (_type.String(selector)) {
        try {
          selector = document.querySelectorAll(selector);
        } catch (e) {
          // invalid selector
          return arr;
        }
      }

      if (_type(selector) === 'nodelist' || _type.Array(selector) || selector instanceof NodeList) {
        for (var i = 0, ref = arr.length = selector.length; i < ref; i++) {
          // list of elements
          var elem = selector[i];
          arr[i] = _type.DomElement(elem) ? elem : _get.elements(elem); // if not an element, try to resolve recursively
        }
      } else if (_type.DomElement(selector) || selector === document || selector === window) {
        arr = [selector]; // only the element
      }

      return arr;
    }; // get scroll top value


    _get.scrollTop = function (elem) {
      return elem && typeof elem.scrollTop === 'number' ? elem.scrollTop : window.pageYOffset || 0;
    }; // get scroll left value


    _get.scrollLeft = function (elem) {
      return elem && typeof elem.scrollLeft === 'number' ? elem.scrollLeft : window.pageXOffset || 0;
    }; // get element height


    _get.width = function (elem, outer, includeMargin) {
      return _dimension('width', elem, outer, includeMargin);
    }; // get element width


    _get.height = function (elem, outer, includeMargin) {
      return _dimension('height', elem, outer, includeMargin);
    }; // get element position (optionally relative to viewport)


    _get.offset = function (elem, relativeToViewport) {
      var offset = {
        top: 0,
        left: 0
      };

      if (elem && elem.getBoundingClientRect) {
        // check if available
        var rect = elem.getBoundingClientRect();
        offset.top = rect.top;
        offset.left = rect.left;

        if (!relativeToViewport) {
          // clientRect is by default relative to viewport...
          offset.top += _get.scrollTop();
          offset.left += _get.scrollLeft();
        }
      }

      return offset;
    };
    /**
     * ------------------------------
     * DOM Element manipulation
     * ------------------------------
     */


    U.addClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.add(classname);else elem.className += ' ' + classname;
      }
    };

    U.removeClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.remove(classname);else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }; // if options is string -> returns css value
    // if options is array -> returns object with css value pairs
    // if options is object -> set new css values


    U.css = function (elem, options) {
      if (_type.String(options)) {
        return _getComputedStyle(elem)[_camelCase(options)];
      } else if (_type.Array(options)) {
        var obj = {},
            style = _getComputedStyle(elem);

        options.forEach(function (option, key) {
          obj[option] = style[_camelCase(option)];
        });
        return obj;
      } else {
        for (var option in options) {
          var val = options[option];

          if (val == parseFloat(val)) {
            // assume pixel for seemingly numerical values
            val += 'px';
          }

          elem.style[_camelCase(option)] = val;
        }
      }
    };

    return U;
  }(window || {});

  ScrollMagic.Scene.prototype.addIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  return ScrollMagic;
});

/***/ }),

/***/ 4581:
/*!***************************************************!*\
  !*** ./node_modules/svg-injector/svg-injector.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * SVGInjector v1.1.3 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014-2015 Waybury <hello@waybury.com>
 * @license MIT
 */
(function (window, document) {
  'use strict'; // Environment

  var isLocal = window.location.protocol === 'file:';
  var hasSvgSupport = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

  function uniqueClasses(list) {
    list = list.split(' ');
    var hash = {};
    var i = list.length;
    var out = [];

    while (i--) {
      if (!hash.hasOwnProperty(list[i])) {
        hash[list[i]] = 1;
        out.unshift(list[i]);
      }
    }

    return out.join(' ');
  }
  /**
   * cache (or polyfill for <= IE8) Array.forEach()
   * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   */


  var forEach = Array.prototype.forEach || function (fn, scope) {
    if (this === void 0 || this === null || typeof fn !== 'function') {
      throw new TypeError();
    }
    /* jshint bitwise: false */


    var i,
        len = this.length >>> 0;
    /* jshint bitwise: true */

    for (i = 0; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this);
      }
    }
  }; // SVG Cache


  var svgCache = {};
  var injectCount = 0;
  var injectedElements = []; // Request Queue

  var requestQueue = []; // Script running status

  var ranScripts = {};

  var cloneSvg = function (sourceSvg) {
    return sourceSvg.cloneNode(true);
  };

  var queueRequest = function (url, callback) {
    requestQueue[url] = requestQueue[url] || [];
    requestQueue[url].push(callback);
  };

  var processRequestQueue = function (url) {
    for (var i = 0, len = requestQueue[url].length; i < len; i++) {
      // Make these calls async so we avoid blocking the page/renderer

      /* jshint loopfunc: true */
      (function (index) {
        setTimeout(function () {
          requestQueue[url][index](cloneSvg(svgCache[url]));
        }, 0);
      })(i);
      /* jshint loopfunc: false */

    }
  };

  var loadSvg = function (url, callback) {
    if (svgCache[url] !== undefined) {
      if (svgCache[url] instanceof SVGSVGElement) {
        // We already have it in cache, so use it
        callback(cloneSvg(svgCache[url]));
      } else {
        // We don't have it in cache yet, but we are loading it, so queue this request
        queueRequest(url, callback);
      }
    } else {
      if (!window.XMLHttpRequest) {
        callback('Browser does not support XMLHttpRequest');
        return false;
      } // Seed the cache to indicate we are loading this URL already


      svgCache[url] = {};
      queueRequest(url, callback);
      var httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function () {
        // readyState 4 = complete
        if (httpRequest.readyState === 4) {
          // Handle status
          if (httpRequest.status === 404 || httpRequest.responseXML === null) {
            callback('Unable to load SVG file: ' + url);
            if (isLocal) callback('Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver.');
            callback();
            return false;
          } // 200 success from server, or 0 when using file:// protocol locally


          if (httpRequest.status === 200 || isLocal && httpRequest.status === 0) {
            /* globals Document */
            if (httpRequest.responseXML instanceof Document) {
              // Cache it
              svgCache[url] = httpRequest.responseXML.documentElement;
            }
            /* globals -Document */
            // IE9 doesn't create a responseXML Document object from loaded SVG,
            // and throws a "DOM Exception: HIERARCHY_REQUEST_ERR (3)" error when injected.
            //
            // So, we'll just create our own manually via the DOMParser using
            // the the raw XML responseText.
            //
            // :NOTE: IE8 and older doesn't have DOMParser, but they can't do SVG either, so...
            else if (DOMParser && DOMParser instanceof Function) {
              var xmlDoc;

              try {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(httpRequest.responseText, 'text/xml');
              } catch (e) {
                xmlDoc = undefined;
              }

              if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
                callback('Unable to parse SVG file: ' + url);
                return false;
              } else {
                // Cache it
                svgCache[url] = xmlDoc.documentElement;
              }
            } // We've loaded a new asset, so process any requests waiting for it


            processRequestQueue(url);
          } else {
            callback('There was a problem injecting the SVG: ' + httpRequest.status + ' ' + httpRequest.statusText);
            return false;
          }
        }
      };

      httpRequest.open('GET', url); // Treat and parse the response as XML, even if the
      // server sends us a different mimetype

      if (httpRequest.overrideMimeType) httpRequest.overrideMimeType('text/xml');
      httpRequest.send();
    }
  }; // Inject a single element


  var injectElement = function (el, evalScripts, pngFallback, callback) {
    // Grab the src or data-src attribute
    var imgUrl = el.getAttribute('data-src') || el.getAttribute('src'); // We can only inject SVG

    if (!/\.svg/i.test(imgUrl)) {
      callback('Attempted to inject a file with a non-svg extension: ' + imgUrl);
      return;
    } // If we don't have SVG support try to fall back to a png,
    // either defined per-element via data-fallback or data-png,
    // or globally via the pngFallback directory setting


    if (!hasSvgSupport) {
      var perElementFallback = el.getAttribute('data-fallback') || el.getAttribute('data-png'); // Per-element specific PNG fallback defined, so use that

      if (perElementFallback) {
        el.setAttribute('src', perElementFallback);
        callback(null);
      } // Global PNG fallback directoriy defined, use the same-named PNG
      else if (pngFallback) {
        el.setAttribute('src', pngFallback + '/' + imgUrl.split('/').pop().replace('.svg', '.png'));
        callback(null);
      } // um...
      else {
        callback('This browser does not support SVG and no PNG fallback was defined.');
      }

      return;
    } // Make sure we aren't already in the process of injecting this element to
    // avoid a race condition if multiple injections for the same element are run.
    // :NOTE: Using indexOf() only _after_ we check for SVG support and bail,
    // so no need for IE8 indexOf() polyfill


    if (injectedElements.indexOf(el) !== -1) {
      return;
    } // Remember the request to inject this element, in case other injection
    // calls are also trying to replace this element before we finish


    injectedElements.push(el); // Try to avoid loading the orginal image src if possible.

    el.setAttribute('src', ''); // Load it up

    loadSvg(imgUrl, function (svg) {
      if (typeof svg === 'undefined' || typeof svg === 'string') {
        callback(svg);
        return false;
      }

      var imgId = el.getAttribute('id');

      if (imgId) {
        svg.setAttribute('id', imgId);
      }

      var imgTitle = el.getAttribute('title');

      if (imgTitle) {
        svg.setAttribute('title', imgTitle);
      } // Concat the SVG classes + 'injected-svg' + the img classes


      var classMerge = [].concat(svg.getAttribute('class') || [], 'injected-svg', el.getAttribute('class') || []).join(' ');
      svg.setAttribute('class', uniqueClasses(classMerge));
      var imgStyle = el.getAttribute('style');

      if (imgStyle) {
        svg.setAttribute('style', imgStyle);
      } // Copy all the data elements to the svg


      var imgData = [].filter.call(el.attributes, function (at) {
        return /^data-\w[\w\-]*$/.test(at.name);
      });
      forEach.call(imgData, function (dataAttr) {
        if (dataAttr.name && dataAttr.value) {
          svg.setAttribute(dataAttr.name, dataAttr.value);
        }
      }); // Make sure any internally referenced clipPath ids and their
      // clip-path references are unique.
      //
      // This addresses the issue of having multiple instances of the
      // same SVG on a page and only the first clipPath id is referenced.
      //
      // Browsers often shortcut the SVG Spec and don't use clipPaths
      // contained in parent elements that are hidden, so if you hide the first
      // SVG instance on the page, then all other instances lose their clipping.
      // Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=376027
      // Handle all defs elements that have iri capable attributes as defined by w3c: http://www.w3.org/TR/SVG/linking.html#processingIRI
      // Mapping IRI addressable elements to the properties that can reference them:

      var iriElementsAndProperties = {
        'clipPath': ['clip-path'],
        'color-profile': ['color-profile'],
        'cursor': ['cursor'],
        'filter': ['filter'],
        'linearGradient': ['fill', 'stroke'],
        'marker': ['marker', 'marker-start', 'marker-mid', 'marker-end'],
        'mask': ['mask'],
        'pattern': ['fill', 'stroke'],
        'radialGradient': ['fill', 'stroke']
      };
      var element, elementDefs, properties, currentId, newId;
      Object.keys(iriElementsAndProperties).forEach(function (key) {
        element = key;
        properties = iriElementsAndProperties[key];
        elementDefs = svg.querySelectorAll('defs ' + element + '[id]');

        for (var i = 0, elementsLen = elementDefs.length; i < elementsLen; i++) {
          currentId = elementDefs[i].id;
          newId = currentId + '-' + injectCount; // All of the properties that can reference this element type

          var referencingElements;
          forEach.call(properties, function (property) {
            // :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
            referencingElements = svg.querySelectorAll('[' + property + '*="' + currentId + '"]');

            for (var j = 0, referencingElementLen = referencingElements.length; j < referencingElementLen; j++) {
              referencingElements[j].setAttribute(property, 'url(#' + newId + ')');
            }
          });
          elementDefs[i].id = newId;
        }
      }); // Remove any unwanted/invalid namespaces that might have been added by SVG editing tools

      svg.removeAttribute('xmlns:a'); // Post page load injected SVGs don't automatically have their script
      // elements run, so we'll need to make that happen, if requested
      // Find then prune the scripts

      var scripts = svg.querySelectorAll('script');
      var scriptsToEval = [];
      var script, scriptType;

      for (var k = 0, scriptsLen = scripts.length; k < scriptsLen; k++) {
        scriptType = scripts[k].getAttribute('type'); // Only process javascript types.
        // SVG defaults to 'application/ecmascript' for unset types

        if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {
          // innerText for IE, textContent for other browsers
          script = scripts[k].innerText || scripts[k].textContent; // Stash

          scriptsToEval.push(script); // Tidy up and remove the script element since we don't need it anymore

          svg.removeChild(scripts[k]);
        }
      } // Run/Eval the scripts if needed


      if (scriptsToEval.length > 0 && (evalScripts === 'always' || evalScripts === 'once' && !ranScripts[imgUrl])) {
        for (var l = 0, scriptsToEvalLen = scriptsToEval.length; l < scriptsToEvalLen; l++) {
          // :NOTE: Yup, this is a form of eval, but it is being used to eval code
          // the caller has explictely asked to be loaded, and the code is in a caller
          // defined SVG file... not raw user input.
          //
          // Also, the code is evaluated in a closure and not in the global scope.
          // If you need to put something in global scope, use 'window'
          new Function(scriptsToEval[l])(window); // jshint ignore:line
        } // Remember we already ran scripts for this svg


        ranScripts[imgUrl] = true;
      } // :WORKAROUND:
      // IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
      // This trick will trigger IE to read and use any existing SVG <style> tags.
      //
      // Reference: https://github.com/iconic/SVGInjector/issues/23


      var styleTags = svg.querySelectorAll('style');
      forEach.call(styleTags, function (styleTag) {
        styleTag.textContent += '';
      }); // Replace the image with the svg

      el.parentNode.replaceChild(svg, el); // Now that we no longer need it, drop references
      // to the original element so it can be GC'd

      delete injectedElements[injectedElements.indexOf(el)];
      el = null; // Increment the injected count

      injectCount++;
      callback(svg);
    });
  };
  /**
   * SVGInjector
   *
   * Replace the given elements with their full inline SVG DOM elements.
   *
   * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec differs from HTML DOM and
   * can return other unexpected object types when trying to directly access svg properties.
   * ex: "className" returns a SVGAnimatedString with the class value found in the "baseVal" property,
   * instead of simple string like with HTML Elements.
   *
   * @param {mixes} Array of or single DOM element
   * @param {object} options
   * @param {function} callback
   * @return {object} Instance of SVGInjector
   */


  var SVGInjector = function (elements, options, done) {
    // Options & defaults
    options = options || {}; // Should we run the scripts blocks found in the SVG
    // 'always' - Run them every time
    // 'once' - Only run scripts once for each SVG
    // [false|'never'] - Ignore scripts

    var evalScripts = options.evalScripts || 'always'; // Location of fallback pngs, if desired

    var pngFallback = options.pngFallback || false; // Callback to run during each SVG injection, returning the SVG injected

    var eachCallback = options.each; // Do the injection...

    if (elements.length !== undefined) {
      var elementsLoaded = 0;
      forEach.call(elements, function (element) {
        injectElement(element, evalScripts, pngFallback, function (svg) {
          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
          if (done && elements.length === ++elementsLoaded) done(elementsLoaded);
        });
      });
    } else {
      if (elements) {
        injectElement(elements, evalScripts, pngFallback, function (svg) {
          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
          if (done) done(1);
          elements = null;
        });
      } else {
        if (done) done(0);
      }
    }
  };
  /* global module, exports: true, define */
  // Node.js or CommonJS


  if ( true && typeof module.exports === 'object') {
    module.exports = exports = SVGInjector;
  } // AMD support
  else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return SVGInjector;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } // Otherwise, attach to window as global
  else {}
  /* global -module, -exports, -define */

})(window, document);

/***/ }),

/***/ 9801:
/*!************************************************!*\
  !*** ./node_modules/theaterjs/dist/theater.js ***!
  \************************************************/
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/
      // The require function

      /******/

      function __nested_webpack_require_589__(moduleId) {
        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_589__);
        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __nested_webpack_require_589__.m = modules;
      /******/
      // expose the module cache

      /******/

      __nested_webpack_require_589__.c = installedModules;
      /******/
      // __webpack_public_path__

      /******/

      __nested_webpack_require_589__.p = "";
      /******/
      // Load entry module and return exports

      /******/

      return __nested_webpack_require_589__(0);
      /******/
    }
    /************************************************************************/

    /******/
    ([
    /* 0 */

    /***/
    function (module, exports, __nested_webpack_require_2162__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i['return']) _i['return']();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          }
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

          return arr2;
        } else {
          return Array.from(arr);
        }
      }

      function _toArray(arr) {
        return Array.isArray(arr) ? arr : Array.from(arr);
      }

      var _actor = __nested_webpack_require_2162__(1);

      var _actor2 = _interopRequireDefault(_actor);

      var _helpersUtils = __nested_webpack_require_2162__(3);

      var _helpersUtils2 = _interopRequireDefault(_helpersUtils);

      var _helpersType = __nested_webpack_require_2162__(2);

      var _helpersType2 = _interopRequireDefault(_helpersType);

      var _helpersKeyboard = __nested_webpack_require_2162__(4);

      var _helpersKeyboard2 = _interopRequireDefault(_helpersKeyboard);

      var _helpersHtml = __nested_webpack_require_2162__(6);

      var _helpersHtml2 = _interopRequireDefault(_helpersHtml);

      var NAVIGATOR = typeof window !== 'undefined' && window.navigator;
      var DEFAULTS = {
        autoplay: true,
        erase: true,
        minSpeed: {
          erase: 80,
          type: 80
        },
        maxSpeed: {
          erase: 450,
          type: 450
        },
        locale: 'detect'
      };

      function theaterJS() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        /* ------------------------------------------------- *\
          init
        \* ------------------------------------------------- */

        options = _helpersUtils2['default'].merge({}, DEFAULTS, options);

        if (_helpersType2['default'].isNumber(options.minSpeed)) {
          var _options = options;
          var minSpeed = _options.minSpeed;
          options.minSpeed = {
            erase: minSpeed,
            type: minSpeed
          };
        }

        if (_helpersType2['default'].isNumber(options.maxSpeed)) {
          var _options2 = options;
          var maxSpeed = _options2.maxSpeed;
          options.maxSpeed = {
            erase: maxSpeed,
            type: maxSpeed
          };
        }

        if (options.locale === 'detect' && NAVIGATOR) {
          var languages = NAVIGATOR.languages;

          if (_helpersType2['default'].isArray(languages) && _helpersType2['default'].isString(languages[0])) {
            options.locale = languages[0].substr(0, 2);
          }
        }

        if (!_helpersKeyboard2['default'].supports(options.locale)) {
          options.locale = _helpersKeyboard2['default'].defaultLocale;
        }

        var props = {
          options: options,
          casting: {},
          status: 'ready',
          onStage: null,
          currentScene: -1,
          scenario: [],
          events: {}
        };
        setCurrentActor(null);
        /* ------------------------------------------------- *\
          methods
        \* ------------------------------------------------- */

        function addActor(actorName) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var callback = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
          var a = (0, _actor2['default'])(actorName, options, callback);
          props.casting[a.name] = a;
          return this;
        }

        function setCurrentActor(actorName) {
          props.onStage = actorName;
          return this;
        }

        function getCurrentActor() {
          return props.casting[props.onStage] || null;
        }

        function addScene() {
          var sequence = [];

          function addSceneToSequence(scene) {
            if (_helpersType2['default'].isArray(scene)) {
              scene.forEach(function (s) {
                addSceneToSequence(s);
              });
            }

            if (_helpersType2['default'].isString(scene)) {
              var partials = scene.split(':');
              var actorName = undefined;

              if (partials.length > 1 && partials[0].charAt(partials[0].length - 1) !== '\\') {
                actorName = partials.shift();
                addSceneToSequence({
                  name: 'erase',
                  actor: actorName
                });
              }

              var speech = partials.join(':').replace(/\\:/g, ':');
              var sceneObj = {
                name: 'type',
                args: [speech]
              };

              if (actorName != null) {
                sceneObj.actor = actorName;
              }

              addSceneToSequence(sceneObj);
            }

            if (_helpersType2['default'].isFunction(scene)) {
              addSceneToSequence({
                name: 'callback',
                args: [scene]
              });
            }

            if (_helpersType2['default'].isNumber(scene)) {
              if (scene > 0) {
                addSceneToSequence({
                  name: 'wait',
                  args: [scene]
                });
              } else {
                addSceneToSequence({
                  name: 'erase',
                  args: [scene]
                });
              }
            }

            if (_helpersType2['default'].isObject(scene)) {
              if (!_helpersType2['default'].isArray(scene.args)) {
                scene.args = [];
              }

              scene.args.unshift(function () {
                publish(scene.name + ':end', scene);
                playNextScene();
              });
              sequence.push(scene);
            }
          }

          for (var _len = arguments.length, scenes = Array(_len), _key = 0; _key < _len; _key++) {
            scenes[_key] = arguments[_key];
          }

          addSceneToSequence([{
            name: 'publisher',
            args: ['sequence:start']
          }].concat(scenes).concat({
            name: 'publisher',
            args: ['sequence:end']
          }));
          Array.prototype.push.apply(props.scenario, sequence);

          if (props.options.autoplay) {
            play();
          }

          return this;
        }

        function getCurrentSpeech() {
          var currentScene = props.scenario[props.currentScene];
          if (!currentScene || !_helpersType2['default'].isArray(currentScene.args)) return null;

          var _currentScene$args = _slicedToArray(currentScene.args, 2);

          var speech = _currentScene$args[1];
          return speech || null;
        }

        function play() {
          if (props.status === 'stopping') {
            props.status = 'playing';
          }

          if (props.status === 'ready') {
            props.status = 'playing';
            playNextScene();
          }

          return this;
        }

        function replay(done) {
          if (props.status === 'ready' || _helpersType2['default'].isFunction(done)) {
            props.currentScene = -1;
            if (props.status === 'ready') play();else done();
          }

          return this;
        }

        function stop() {
          props.status = 'stopping';
          return this;
        }

        function playNextScene() {
          if (props.status === 'stopping') {
            props.status = 'ready';
            return this;
          }

          if (props.status !== 'playing') return this;

          if (props.currentScene + 1 >= props.scenario.length) {
            props.status = 'ready';
            publish('scenario:end');
            return this;
          }

          var nextScene = props.scenario[++props.currentScene];

          if (props.currentScene === 0) {
            publish('scenario:start');
          }

          if (nextScene.name === 'publisher') {
            var _nextScene$args = _toArray(nextScene.args);

            var done = _nextScene$args[0];

            var args = _nextScene$args.slice(1);

            publish.apply(undefined, _toConsumableArray(args));
            return done();
          }

          if (nextScene.actor) {
            setCurrentActor(nextScene.actor);
          }

          publish(nextScene.name + ':start', nextScene);

          switch (nextScene.name) {
            case 'type':
              typeAction.apply(undefined, _toConsumableArray(nextScene.args));
              break;

            case 'erase':
              eraseAction.apply(undefined, _toConsumableArray(nextScene.args));
              break;

            case 'callback':
              callbackAction.apply(undefined, _toConsumableArray(nextScene.args));
              break;

            case 'wait':
              waitAction.apply(undefined, _toConsumableArray(nextScene.args));
              break;

            default:
              console.debug('No scene handler for ' + nextScene.name);
              break;
          }

          return this;
        }

        function typeAction(done, value) {
          var actor = getCurrentActor();
          var locale = props.options.locale;
          var minSpeed = props.options.minSpeed.type;
          var maxSpeed = props.options.maxSpeed.type;
          var initialValue = actor.displayValue;
          var cursor = -1;
          var isFixing = false;
          var previousMistakeCursor = null;
          var previousFixCursor = null;

          var htmlMap = _helpersHtml2['default'].map(value);

          value = _helpersHtml2['default'].strip(value);

          (function type() {
            var actual = _helpersHtml2['default'].strip(actor.displayValue.substr(initialValue.length));

            if (actual === value) return done();
            var expected = value.substr(0, cursor + 1);
            var isMistaking = actual !== expected;
            var shouldBeMistaken = actor.shouldBeMistaken(actual, value, previousMistakeCursor, previousFixCursor);
            var shouldFix = isFixing || !shouldBeMistaken;

            if (isMistaking && shouldFix) {
              isFixing = true;
              previousMistakeCursor = null;
              actor.displayValue = initialValue + _helpersHtml2['default'].inject(actual.substr(0, actual.length - 1), htmlMap);
              cursor--;
              previousFixCursor = cursor;
            } else {
              isFixing = false;
              var nextChar = value.charAt(++cursor);

              if (shouldBeMistaken) {
                nextChar = _helpersKeyboard2['default'].randomCharNear(nextChar, locale);

                if (previousMistakeCursor == null) {
                  previousMistakeCursor = cursor;
                }
              }

              actor.displayValue = initialValue + _helpersHtml2['default'].inject(actual + nextChar, htmlMap);
            }

            return setTimeout(type, actor.getTypingSpeed(minSpeed, maxSpeed));
          })();

          return this;
        }

        function eraseAction(done, arg) {
          var actor = getCurrentActor(); // erase scenes are added before a type scene
          // so for the first scene, there's no actor yet

          if (actor == null) {
            return done();
          }

          if (options.erase !== true) {
            actor.displayValue = '';
            return done();
          }

          var minSpeed = props.options.minSpeed.erase;
          var maxSpeed = props.options.maxSpeed.erase;
          var value = actor.displayValue;

          var htmlMap = _helpersHtml2['default'].map(value);

          value = _helpersHtml2['default'].strip(value);
          var cursor = value.length;
          var speed = undefined;
          var nbCharactersToErase = 0;

          if (_helpersType2['default'].isNumber(arg)) {
            if (arg > 0) speed = arg;else nbCharactersToErase = value.length + arg;
          }

          (function erase() {
            if (cursor === nbCharactersToErase) return done();
            actor.displayValue = _helpersHtml2['default'].inject(value.substr(0, --cursor), htmlMap);
            return setTimeout(erase, speed || actor.getTypingSpeed(minSpeed, maxSpeed));
          })();

          return this;
        }

        function callbackAction(done, callback) {
          callback.call(this, done);
          return this;
        }

        function waitAction(done, delay) {
          setTimeout(done.bind(this), delay);
          return this;
        }

        function subscribe(events, callback) {
          events.split(',').forEach(function (eventName) {
            eventName = eventName.trim();

            if (!_helpersType2['default'].isArray(props.events[eventName])) {
              props.events[eventName] = [];
            }

            props.events[eventName].push(callback);
          });
          return this;
        }

        function publish() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var eventName = args[0];
          var callbacks = props.events[eventName] || [];

          if (callbacks.length > 0) {
            callbacks.concat(props.events['*'] || []).forEach(function (callback) {
              return callback.apply(undefined, args);
            });
          }

          return this;
        }
        /* ------------------------------------------------- *\
          public api
        \* ------------------------------------------------- */


        return Object.freeze(Object.defineProperties({
          addActor: addActor,
          getCurrentActor: getCurrentActor,
          addScene: addScene,
          getCurrentSpeech: getCurrentSpeech,
          play: play,
          replay: replay,
          stop: stop,
          on: subscribe
        }, {
          options: {
            get: function get() {
              return props.options;
            },
            configurable: true,
            enumerable: true
          },
          status: {
            get: function get() {
              return props.status;
            },
            configurable: true,
            enumerable: true
          }
        }));
      }

      theaterJS.init = function () {
        var actorName = arguments.length <= 0 || arguments[0] === undefined ? 'actor' : arguments[0];
        var theater = theaterJS();
        theater.addActor(actorName, {
          accuracy: 1,
          speed: 0.8
        });
        return theater;
      };

      exports['default'] = theaterJS;
      module.exports = exports['default'];
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __nested_webpack_require_17932__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      var _helpersType = __nested_webpack_require_17932__(2);

      var _helpersType2 = _interopRequireDefault(_helpersType);

      var _helpersUtils = __nested_webpack_require_17932__(3);

      var _helpersUtils2 = _interopRequireDefault(_helpersUtils);

      var DOCUMENT = typeof window !== 'undefined' && window.document;
      var DEFAULTS = {
        speed: 0.6,
        accuracy: 0.6
      };

      exports['default'] = function (actorName) {
        var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var callback = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
        var displayValue = '';
        var $element = undefined;

        if (_helpersType2['default'].isNumber(props)) {
          props = {
            speed: props,
            accuracy: props
          };
        }

        props = _helpersUtils2['default'].merge({}, DEFAULTS, props);

        if (DOCUMENT) {
          if (callback == null) {
            callback = '#' + actorName;
          }

          if (_helpersType2['default'].isString(callback)) {
            var selector = callback;
            var $e = DOCUMENT.querySelector(selector);

            if ($e != null) {
              $element = $e;

              callback = function (newValue) {
                $element.innerHTML = newValue;
              };
            } else {
              throw new Error('no matches for ' + actorName + '\'s selector: ' + selector);
            }
          }
        }

        if (!_helpersType2['default'].isFunction(callback)) {
          callback = console.log.bind(console);
        }

        return Object.defineProperties({
          $element: $element,
          getTypingSpeed: function getTypingSpeed(fastest, slowest) {
            var speed = _helpersUtils2['default'].randomFloat(props.speed, 1);

            return _helpersUtils2['default'].getPercentageOf(slowest, fastest, speed);
          },
          shouldBeMistaken: function shouldBeMistaken(actual, endValue) {
            var previousMistakeCursor = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var previousFixCursor = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
            var accuracy = props.accuracy * 10;

            if (accuracy >= 8) {
              return false;
            }

            if (actual.length <= accuracy) {
              return false;
            }

            if (actual.length === endValue.length) {
              return false;
            }

            if (_helpersType2['default'].isNumber(previousMistakeCursor)) {
              var nbOfCharactersTyped = actual.length - previousMistakeCursor;
              var maxWrongCharactersAllowed = accuracy >= 6 ? 10 - accuracy : 4;

              if (nbOfCharactersTyped >= maxWrongCharactersAllowed) {
                return false;
              }
            }

            if (_helpersType2['default'].isNumber(previousFixCursor)) {
              var nbOfCharactersTyped = actual.length - previousFixCursor;
              var minCharactersBetweenMistakes = Math.max(accuracy, 2) * 2;

              if (nbOfCharactersTyped <= minCharactersBetweenMistakes) {
                return false;
              }
            }

            return _helpersUtils2['default'].randomFloat(0, 0.8) > props.accuracy;
          }
        }, {
          displayValue: {
            get: function get() {
              return displayValue;
            },
            set: function set(value) {
              displayValue = value;
              callback(value);
            },
            configurable: true,
            enumerable: true
          },
          name: {
            get: function get() {
              return actorName;
            },
            configurable: true,
            enumerable: true
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

      function toString(o) {
        return {}.toString.call(o);
      }

      exports['default'] = {
        isNumber: function isNumber(o) {
          return typeof o === 'number';
        },
        isString: function isString(o) {
          return toString(o) === '[object String]';
        },
        isObject: function isObject(o) {
          return toString(o) === '[object Object]';
        },
        isArray: function isArray(o) {
          return toString(o) === '[object Array]';
        },
        isFunction: function isFunction(o) {
          return typeof o === 'function';
        }
      };
      module.exports = exports['default'];
      /***/
    },
    /* 3 */

    /***/
    function (module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = {
        merge: function merge(dst) {
          var objs = [].slice.call(arguments, 1);

          for (var i = 0, len = objs.length; i < len; i++) {
            var obj = objs[i];

            for (var key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              dst[key] = obj[key];
            }
          }

          return dst;
        },
        random: function random(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomFloat: function randomFloat(min, max) {
          return Math.random() * (max - min) + min;
        },
        getPercentageOf: function getPercentageOf(min, max, percentage) {
          return min - min * percentage + max * percentage;
        }
      };
      module.exports = exports["default"];
      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __nested_webpack_require_24036__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      var _type = __nested_webpack_require_24036__(2);

      var _type2 = _interopRequireDefault(_type);

      var _utils = __nested_webpack_require_24036__(3);

      var _utils2 = _interopRequireDefault(_utils);

      var _keyboardsJson = __nested_webpack_require_24036__(5);

      var _keyboardsJson2 = _interopRequireDefault(_keyboardsJson);

      var DEFAULT_LOCALE = 'en';

      for (var locale in _keyboardsJson2['default']) {
        if (!_keyboardsJson2['default'].hasOwnProperty(locale)) continue;
        var keyboard = _keyboardsJson2['default'][locale];
        _keyboardsJson2['default'][locale] = {
          list: keyboard,
          mapped: mapKeyboard(keyboard)
        };
      }

      function mapKeyboard(alphabet) {
        var keyboard = {};

        for (var y = 0, lines = alphabet.length, chars = undefined; y < lines; y++) {
          chars = alphabet[y];

          for (var x = 0, charsLength = chars.length; x < charsLength; x++) {
            keyboard[chars[x]] = {
              x: x,
              y: y
            };
          }
        }

        return keyboard;
      }

      exports['default'] = {
        defaultLocale: DEFAULT_LOCALE,
        supports: function supports(locale) {
          return _type2['default'].isObject(_keyboardsJson2['default'][locale]);
        },
        randomCharNear: function randomCharNear(ch, locale) {
          if (!this.supports(locale)) {
            throw new Error('locale "' + locale + '" is not supported');
          }

          var keyboard = _keyboardsJson2['default'][locale].mapped;
          var threshold = 1;
          var nearbyChars = [];
          var uppercase = /[A-Z]/.test(ch);
          ch = ch.toLowerCase();
          var charPosition = keyboard[ch] || [];
          var p = undefined;

          for (var c in keyboard) {
            if (!keyboard.hasOwnProperty(c) || c === ch) continue;
            p = keyboard[c];

            if (Math.abs(charPosition.x - p.x) <= threshold && Math.abs(charPosition.y - p.y) <= threshold) {
              nearbyChars.push(c);
            }
          }

          var randomChar = nearbyChars.length > 0 ? nearbyChars[_utils2['default'].random(0, nearbyChars.length - 1)] : this.randomChar(locale);

          if (uppercase) {
            randomChar = randomChar.toUpperCase();
          }

          return randomChar;
        },
        randomChar: function randomChar(locale) {
          if (!this.supports(locale)) {
            throw new Error('locale "' + locale + '" is not supported');
          }

          var chars = _keyboardsJson2['default'][locale].list.join('');

          return chars.charAt(_utils2['default'].random(0, chars.length - 1));
        }
      };
      module.exports = exports['default'];
      /***/
    },
    /* 5 */

    /***/
    function (module, exports) {
      module.exports = {
        "en": ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
        "fr": ["azertyuiop", "qsdfghjklm", "wxcvbn"],
        "da": ["qwertyuiopå", "asdfghjklæø", "zxcvbnm"],
        "de": ["qwertzuiopü", "asdfghjklöä", "yxcvbnm"],
        "pl": ["qwertyuiopęó", "asdfghjkląśł", "zxcvbnmżźćń"],
        "pt": ["qwertyuiop", "asdfghjklç", "zxcvbnm"],
        "ru": ["йцукенгшщзх", "фывапролджэ", "ячсмитьбюъ"],
        "es": ["qwertyuiop", "asdfghjklñ", "zxcvbnm"],
        "el": [";ςερτυθιοπ", "ασδφγηξκλ", "ζχψωβνμ"]
      };
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __nested_webpack_require_27718__) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      var _voidElementsJson = __nested_webpack_require_27718__(7);

      var _voidElementsJson2 = _interopRequireDefault(_voidElementsJson);

      function isVoidElement(tag) {
        var tagName = tag.match(/<([^\s>]+)/);
        return Boolean(tagName) && _voidElementsJson2['default'].indexOf(tagName[1].toLowerCase()) > -1;
      }

      exports['default'] = {
        strip: function strip(str) {
          return str.replace(/(<([^>]+)>)/gi, '');
        },
        map: function map(str) {
          var regexp = /<[^>]+>/gi;
          var tags = [];
          var openers = [];
          var result = undefined;
          var tag = undefined;

          while (result = regexp.exec(str)) {
            tag = {
              tagName: result[0],
              position: result.index
            };

            if (tag.tagName.charAt(1) === '/') {
              tag.opener = openers.pop();
            } else if (tag.tagName.charAt(tag.tagName.length - 2) !== '/' && !isVoidElement(tag.tagName)) {
              openers.push(tag);
            }

            tags.push(tag);
          }

          return tags;
        },
        inject: function inject(str, map) {
          for (var i = 0, tag = undefined; i < map.length; i++) {
            tag = map[i];

            if (str.length > 0 && tag.position <= str.length) {
              str = str.substr(0, tag.position) + tag.tagName + str.substr(tag.position);
            } else if (tag.opener && tag.opener.position < str.length) {
              str += tag.tagName;
            }
          }

          return str;
        }
      };
      module.exports = exports['default'];
      /***/
    },
    /* 7 */

    /***/
    function (module, exports) {
      module.exports = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
      /***/
    }
    /******/
    ])
  );
});

;

/***/ }),

/***/ 3164:
/*!*****************************************!*\
  !*** ./node_modules/theaterjs/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/theater.js */ 9801);

/***/ }),

/***/ 9182:
/*!***************************************************!*\
  !*** ./node_modules/velocity-animate/velocity.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! VelocityJS.org (1.5.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

/*************************
 Velocity jQuery Shim
 *************************/

/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */

/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */

/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */
(function (window) {
  "use strict";
  /***************
   Setup
   ***************/

  /* If jQuery is already loaded, there's no point in loading this shim. */

  if (window.jQuery) {
    return;
  }
  /* jQuery base. */


  var $ = function (selector, context) {
    return new $.fn.init(selector, context);
  };
  /********************
   Private Methods
   ********************/

  /* jQuery */


  $.isWindow = function (obj) {
    /* jshint eqeqeq: false */
    return obj && obj === obj.window;
  };
  /* jQuery */


  $.type = function (obj) {
    if (!obj) {
      return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
  };
  /* jQuery */


  $.isArray = Array.isArray || function (obj) {
    return $.type(obj) === "array";
  };
  /* jQuery */


  function isArraylike(obj) {
    var length = obj.length,
        type = $.type(obj);

    if (type === "function" || $.isWindow(obj)) {
      return false;
    }

    if (obj.nodeType === 1 && length) {
      return true;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  /***************
   $ Methods
   ***************/

  /* jQuery: Support removed for IE<9. */


  $.isPlainObject = function (obj) {
    var key;

    if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
      return false;
    }

    try {
      if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }

    for (key in obj) {}

    return key === undefined || hasOwn.call(obj, key);
  };
  /* jQuery */


  $.each = function (obj, callback, args) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj);

    if (args) {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (!obj.hasOwnProperty(i)) {
            continue;
          }

          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      }
    } else {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (!obj.hasOwnProperty(i)) {
            continue;
          }

          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      }
    }

    return obj;
  };
  /* Custom */


  $.data = function (node, key, value) {
    /* $.getData() */
    if (value === undefined) {
      var getId = node[$.expando],
          store = getId && cache[getId];

      if (key === undefined) {
        return store;
      } else if (store) {
        if (key in store) {
          return store[key];
        }
      }
      /* $.setData() */

    } else if (key !== undefined) {
      var setId = node[$.expando] || (node[$.expando] = ++$.uuid);
      cache[setId] = cache[setId] || {};
      cache[setId][key] = value;
      return value;
    }
  };
  /* Custom */


  $.removeData = function (node, keys) {
    var id = node[$.expando],
        store = id && cache[id];

    if (store) {
      // Cleanup the entire store if no keys are provided.
      if (!keys) {
        delete cache[id];
      } else {
        $.each(keys, function (_, key) {
          delete store[key];
        });
      }
    }
  };
  /* jQuery */


  $.extend = function () {
    var src,
        copyIsArray,
        copy,
        name,
        options,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== "object" && $.type(target) !== "function") {
      target = {};
    }

    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      if (options = arguments[i]) {
        for (name in options) {
          if (!options.hasOwnProperty(name)) {
            continue;
          }

          src = target[name];
          copy = options[name];

          if (target === copy) {
            continue;
          }

          if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && $.isArray(src) ? src : [];
            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }

            target[name] = $.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  };
  /* jQuery 1.4.3 */


  $.queue = function (elem, type, data) {
    function $makeArray(arr, results) {
      var ret = results || [];

      if (arr) {
        if (isArraylike(Object(arr))) {
          /* $.merge */
          (function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
              first[i++] = second[j++];
            }

            if (len !== len) {
              while (second[j] !== undefined) {
                first[i++] = second[j++];
              }
            }

            first.length = i;
            return first;
          })(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          [].push.call(ret, arr);
        }
      }

      return ret;
    }

    if (!elem) {
      return;
    }

    type = (type || "fx") + "queue";
    var q = $.data(elem, type);

    if (!data) {
      return q || [];
    }

    if (!q || $.isArray(data)) {
      q = $.data(elem, type, $makeArray(data));
    } else {
      q.push(data);
    }

    return q;
  };
  /* jQuery 1.4.3 */


  $.dequeue = function (elems, type) {
    /* Custom: Embed element iteration. */
    $.each(elems.nodeType ? [elems] : elems, function (i, elem) {
      type = type || "fx";
      var queue = $.queue(elem, type),
          fn = queue.shift();

      if (fn === "inprogress") {
        fn = queue.shift();
      }

      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }

        fn.call(elem, function () {
          $.dequeue(elem, type);
        });
      }
    });
  };
  /******************
   $.fn Methods
   ******************/

  /* jQuery */


  $.fn = $.prototype = {
    init: function (selector) {
      /* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
      if (selector.nodeType) {
        this[0] = selector;
        return this;
      } else {
        throw new Error("Not a DOM node.");
      }
    },
    offset: function () {
      /* jQuery altered code: Dropped disconnected DOM node checking. */
      var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
        top: 0,
        left: 0
      };
      return {
        top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
        left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
      };
    },
    position: function () {
      /* jQuery */
      function offsetParentFn(elem) {
        var offsetParent = elem.offsetParent;

        while (offsetParent && offsetParent.nodeName.toLowerCase() !== "html" && offsetParent.style && offsetParent.style.position.toLowerCase() === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || document;
      }
      /* Zepto */


      var elem = this[0],
          offsetParent = offsetParentFn(elem),
          offset = this.offset(),
          parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? {
        top: 0,
        left: 0
      } : $(offsetParent).offset();
      offset.top -= parseFloat(elem.style.marginTop) || 0;
      offset.left -= parseFloat(elem.style.marginLeft) || 0;

      if (offsetParent.style) {
        parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0;
        parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0;
      }

      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    }
  };
  /**********************
   Private Variables
   **********************/

  /* For $.data() */

  var cache = {};
  $.expando = "velocity" + new Date().getTime();
  $.uuid = 0;
  /* For $.queue() */

  var class2type = {},
      hasOwn = class2type.hasOwnProperty,
      toString = class2type.toString;
  var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");

  for (var i = 0; i < types.length; i++) {
    class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
  }
  /* Makes $(node) possible, without having to call init. */


  $.fn.init.prototype = $.fn;
  /* Globalize Velocity onto the window, and assign its Utilities property. */

  window.Velocity = {
    Utilities: $
  };
})(window);
/******************
 Velocity.js
 ******************/


(function (factory) {
  "use strict";
  /* CommonJS module. */

  if ( true && typeof module.exports === "object") {
    module.exports = factory();
    /* AMD module. */
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* Browser globals. */
  } else {}
})(function () {
  "use strict";

  return function (global, window, document, undefined) {
    /***************
     Summary
     ***************/

    /*
     - CSS: CSS stack that works independently from the rest of Velocity.
     - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
     - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
     - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
     Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
     - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
     - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
     - completeCall(): Handles the cleanup process for each Velocity call.
     */

    /*********************
     Helper Functions
     *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = function () {
      if (document.documentMode) {
        return document.documentMode;
      } else {
        for (var i = 7; i > 4; i--) {
          var div = document.createElement("div");
          div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

          if (div.getElementsByTagName("span").length) {
            div = null;
            return i;
          }
        }
      }

      return undefined;
    }();
    /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */


    var rAFShim = function () {
      var timeLast = 0;
      return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        var timeCurrent = new Date().getTime(),
            timeDelta;
        /* Dynamically set delay on a per-tick basis to match 60fps. */

        /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */

        timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
        timeLast = timeCurrent + timeDelta;
        return setTimeout(function () {
          callback(timeCurrent + timeDelta);
        }, timeDelta);
      };
    }();

    var performance = function () {
      var perf = window.performance || {};

      if (typeof perf.now !== "function") {
        var nowOffset = perf.timing && perf.timing.navigationStart ? perf.timing.navigationStart : new Date().getTime();

        perf.now = function () {
          return new Date().getTime() - nowOffset;
        };
      }

      return perf;
    }();
    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */


    function compactSparseArray(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value) {
          result.push(value);
        }
      }

      return result;
    }
    /**
     * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
     * on host objects like NamedNodeMap, NodeList, and HTMLCollection
     * (technically, since host objects have been implementation-dependent,
     * at least before ES2015, IE hasn't needed to work this way).
     * Also works on strings, fixes IE < 9 to allow an explicit undefined
     * for the 2nd argument (as in Firefox), and prevents errors when
     * called on other DOM objects.
     */


    var _slice = function () {
      var slice = Array.prototype.slice;

      try {
        // Can't be used with DOM elements in IE < 9
        slice.call(document.documentElement);
        return slice;
      } catch (e) {
        // Fails in IE < 9
        // This will work for genuine arrays, array-like objects, 
        // NamedNodeMap (attributes, entities, notations),
        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
        // and will not fail on other DOM objects (as do DOM elements in IE < 9)
        return function (begin, end) {
          var len = this.length;

          if (typeof begin !== "number") {
            begin = 0;
          } // IE < 9 gets unhappy with an undefined end argument


          if (typeof end !== "number") {
            end = len;
          } // For native Array objects, we use the native slice function


          if (this.slice) {
            return slice.call(this, begin, end);
          } // For array like object we handle it ourselves.


          var i,
              cloned = [],
              // Handle negative value for "begin"
          start = begin >= 0 ? begin : Math.max(0, len + begin),
              // Handle negative value for "end"
          upTo = end < 0 ? len + end : Math.min(end, len),
              // Actual expected size of the slice
          size = upTo - start;

          if (size > 0) {
            cloned = new Array(size);

            if (this.charAt) {
              for (i = 0; i < size; i++) {
                cloned[i] = this.charAt(start + i);
              }
            } else {
              for (i = 0; i < size; i++) {
                cloned[i] = this[start + i];
              }
            }
          }

          return cloned;
        };
      }
    }();
    /* .indexOf doesn't exist in IE<9 */


    var _inArray = function () {
      if (Array.prototype.includes) {
        return function (arr, val) {
          return arr.includes(val);
        };
      }

      if (Array.prototype.indexOf) {
        return function (arr, val) {
          return arr.indexOf(val) >= 0;
        };
      }

      return function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === val) {
            return true;
          }
        }

        return false;
      };
    };

    function sanitizeElements(elements) {
      /* Unwrap jQuery/Zepto objects. */
      if (Type.isWrapped(elements)) {
        elements = _slice.call(elements);
        /* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
      } else if (Type.isNode(elements)) {
        elements = [elements];
      }

      return elements;
    }

    var Type = {
      isNumber: function (variable) {
        return typeof variable === "number";
      },
      isString: function (variable) {
        return typeof variable === "string";
      },
      isArray: Array.isArray || function (variable) {
        return Object.prototype.toString.call(variable) === "[object Array]";
      },
      isFunction: function (variable) {
        return Object.prototype.toString.call(variable) === "[object Function]";
      },
      isNode: function (variable) {
        return variable && variable.nodeType;
      },

      /* Determine if variable is an array-like wrapped jQuery, Zepto or similar element, or even a NodeList etc. */

      /* NOTE: HTMLFormElements also have a length. */
      isWrapped: function (variable) {
        return variable && variable !== window && Type.isNumber(variable.length) && !Type.isString(variable) && !Type.isFunction(variable) && !Type.isNode(variable) && (variable.length === 0 || Type.isNode(variable[0]));
      },
      isSVG: function (variable) {
        return window.SVGElement && variable instanceof window.SVGElement;
      },
      isEmptyObject: function (variable) {
        for (var name in variable) {
          if (variable.hasOwnProperty(name)) {
            return false;
          }
        }

        return true;
      }
    };
    /*****************
     Dependencies
     *****************/

    var $,
        isJQuery = false;

    if (global.fn && global.fn.jquery) {
      $ = global;
      isJQuery = true;
    } else {
      $ = window.Velocity.Utilities;
    }

    if (IE <= 8 && !isJQuery) {
      throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    } else if (IE <= 7) {
      /* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
      jQuery.fn.velocity = jQuery.fn.animate;
      /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */

      return;
    }
    /*****************
     Constants
     *****************/


    var DURATION_DEFAULT = 400,
        EASING_DEFAULT = "swing";
    /*************
     State
     *************/

    var Velocity = {
      /* Container for page-wide Velocity state data. */
      State: {
        /* Detect mobile devices to determine if mobileHA should be turned on. */
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),

        /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
        isAndroid: /Android/i.test(window.navigator.userAgent),
        isGingerbread: /Android 2\.3\.[3-7]/i.test(window.navigator.userAgent),
        isChrome: window.chrome,
        isFirefox: /Firefox/i.test(window.navigator.userAgent),

        /* Create a cached element for re-use when checking for CSS property prefixes. */
        prefixElement: document.createElement("div"),

        /* Cache every prefix match to avoid repeating lookups. */
        prefixMatches: {},

        /* Cache the anchor used for animating window scrolling. */
        scrollAnchor: null,

        /* Cache the browser-specific property names associated with the scroll anchor. */
        scrollPropertyLeft: null,
        scrollPropertyTop: null,

        /* Keep track of whether our RAF tick is running. */
        isTicking: false,

        /* Container for every in-progress call to Velocity. */
        calls: [],
        delayedElements: {
          count: 0
        }
      },

      /* Velocity's custom CSS stack. Made global for unit testing. */
      CSS: {
        /* Defined below. */
      },

      /* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
      Utilities: $,

      /* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
      Redirects: {
        /* Manually registered by the user. */
      },
      Easings: {
        /* Defined below. */
      },

      /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
      Promise: window.Promise,

      /* Velocity option defaults, which can be overriden by the user. */
      defaults: {
        queue: "",
        duration: DURATION_DEFAULT,
        easing: EASING_DEFAULT,
        begin: undefined,
        complete: undefined,
        progress: undefined,
        display: undefined,
        visibility: undefined,
        loop: false,
        delay: false,
        mobileHA: true,

        /* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
        _cacheValues: true,

        /* Advanced: Set to false if the promise should always resolve on empty element lists. */
        promiseRejectEmpty: true
      },

      /* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
      init: function (element) {
        $.data(element, "velocity", {
          /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
          isSVG: Type.isSVG(element),

          /* Keep track of whether the element is currently being animated by Velocity.
           This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
          isAnimating: false,

          /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
          computedStyle: null,

          /* Tween data is cached for each animation on the element so that data can be passed across calls --
           in particular, end values are used as subsequent start values in consecutive Velocity calls. */
          tweensContainer: null,

          /* The full root property values of each CSS hook being animated on this element are cached so that:
           1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
           2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
          rootPropertyValueCache: {},

          /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
          transformCache: {}
        });
      },

      /* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
      hook: null,

      /* Defined below. */

      /* Velocity-wide animation time remapping for testing purposes. */
      mock: false,
      version: {
        major: 1,
        minor: 5,
        patch: 2
      },

      /* Set to 1 or 2 (most verbose) to output debug info to console. */
      debug: false,

      /* Use rAF high resolution timestamp when available */
      timestamp: true,

      /* Pause all animations */
      pauseAll: function (queueName) {
        var currentTime = new Date().getTime();
        $.each(Velocity.State.calls, function (i, activeCall) {
          if (activeCall) {
            /* If we have a queueName and this call is not on that queue, skip */
            if (queueName !== undefined && (activeCall[2].queue !== queueName || activeCall[2].queue === false)) {
              return true;
            }
            /* Set call to paused */


            activeCall[5] = {
              resume: false
            };
          }
        });
        /* Pause timers on any currently delayed calls */

        $.each(Velocity.State.delayedElements, function (k, element) {
          if (!element) {
            return;
          }

          pauseDelayOnElement(element, currentTime);
        });
      },

      /* Resume all animations */
      resumeAll: function (queueName) {
        var currentTime = new Date().getTime();
        $.each(Velocity.State.calls, function (i, activeCall) {
          if (activeCall) {
            /* If we have a queueName and this call is not on that queue, skip */
            if (queueName !== undefined && (activeCall[2].queue !== queueName || activeCall[2].queue === false)) {
              return true;
            }
            /* Set call to resumed if it was paused */


            if (activeCall[5]) {
              activeCall[5].resume = true;
            }
          }
        });
        /* Resume timers on any currently delayed calls */

        $.each(Velocity.State.delayedElements, function (k, element) {
          if (!element) {
            return;
          }

          resumeDelayOnElement(element, currentTime);
        });
      }
    };
    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */

    if (window.pageYOffset !== undefined) {
      Velocity.State.scrollAnchor = window;
      Velocity.State.scrollPropertyLeft = "pageXOffset";
      Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
      Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
      Velocity.State.scrollPropertyLeft = "scrollLeft";
      Velocity.State.scrollPropertyTop = "scrollTop";
    }
    /* Shorthand alias for jQuery's $.data() utility. */


    function Data(element) {
      /* Hardcode a reference to the plugin name. */
      var response = $.data(element, "velocity");
      /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */

      return response === null ? undefined : response;
    }
    /**************
     Delay Timer
     **************/


    function pauseDelayOnElement(element, currentTime) {
      /* Check for any delay timers, and pause the set timeouts (while preserving time data)
       to be resumed when the "resume" command is issued */
      var data = Data(element);

      if (data && data.delayTimer && !data.delayPaused) {
        data.delayRemaining = data.delay - currentTime + data.delayBegin;
        data.delayPaused = true;
        clearTimeout(data.delayTimer.setTimeout);
      }
    }

    function resumeDelayOnElement(element, currentTime) {
      /* Check for any paused timers and resume */
      var data = Data(element);

      if (data && data.delayTimer && data.delayPaused) {
        /* If the element was mid-delay, re initiate the timeout with the remaining delay */
        data.delayPaused = false;
        data.delayTimer.setTimeout = setTimeout(data.delayTimer.next, data.delayRemaining);
      }
    }
    /**************
     Easing
     **************/

    /* Step easing generator. */


    function generateStep(steps) {
      return function (p) {
        return Math.round(p * steps) * (1 / steps);
      };
    }
    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */


    function generateBezier(mX1, mY1, mX2, mY2) {
      var NEWTON_ITERATIONS = 4,
          NEWTON_MIN_SLOPE = 0.001,
          SUBDIVISION_PRECISION = 0.0000001,
          SUBDIVISION_MAX_ITERATIONS = 10,
          kSplineTableSize = 11,
          kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
          float32ArraySupported = ("Float32Array" in window);
      /* Must contain four arguments. */

      if (arguments.length !== 4) {
        return false;
      }
      /* Arguments must be numbers. */


      for (var i = 0; i < 4; ++i) {
        if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
          return false;
        }
      }
      /* X values must be in the [0, 1] range. */


      mX1 = Math.min(mX1, 1);
      mX2 = Math.min(mX2, 1);
      mX1 = Math.max(mX1, 0);
      mX2 = Math.max(mX2, 0);
      var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

      function A(aA1, aA2) {
        return 1.0 - 3.0 * aA2 + 3.0 * aA1;
      }

      function B(aA1, aA2) {
        return 3.0 * aA2 - 6.0 * aA1;
      }

      function C(aA1) {
        return 3.0 * aA1;
      }

      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }

      function getSlope(aT, aA1, aA2) {
        return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
      }

      function newtonRaphsonIterate(aX, aGuessT) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);

          if (currentSlope === 0.0) {
            return aGuessT;
          }

          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }

        return aGuessT;
      }

      function calcSampleValues() {
        for (var i = 0; i < kSplineTableSize; ++i) {
          mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }

      function binarySubdivide(aX, aA, aB) {
        var currentX,
            currentT,
            i = 0;

        do {
          currentT = aA + (aB - aA) / 2.0;
          currentX = calcBezier(currentT, mX1, mX2) - aX;

          if (currentX > 0.0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

        return currentT;
      }

      function getTForX(aX) {
        var intervalStart = 0.0,
            currentSample = 1,
            lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }

        --currentSample;
        var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
            guessForT = intervalStart + dist * kSampleStepSize,
            initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT);
        } else if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
      }

      var _precomputed = false;

      function precompute() {
        _precomputed = true;

        if (mX1 !== mY1 || mX2 !== mY2) {
          calcSampleValues();
        }
      }

      var f = function (aX) {
        if (!_precomputed) {
          precompute();
        }

        if (mX1 === mY1 && mX2 === mY2) {
          return aX;
        }

        if (aX === 0) {
          return 0;
        }

        if (aX === 1) {
          return 1;
        }

        return calcBezier(getTForX(aX), mY1, mY2);
      };

      f.getControlPoints = function () {
        return [{
          x: mX1,
          y: mY1
        }, {
          x: mX2,
          y: mY2
        }];
      };

      var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";

      f.toString = function () {
        return str;
      };

      return f;
    }
    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */

    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
     then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */


    var generateSpringRK4 = function () {
      function springAccelerationForState(state) {
        return -state.tension * state.x - state.friction * state.v;
      }

      function springEvaluateStateWithDerivative(initialState, dt, derivative) {
        var state = {
          x: initialState.x + derivative.dx * dt,
          v: initialState.v + derivative.dv * dt,
          tension: initialState.tension,
          friction: initialState.friction
        };
        return {
          dx: state.v,
          dv: springAccelerationForState(state)
        };
      }

      function springIntegrateState(state, dt) {
        var a = {
          dx: state.v,
          dv: springAccelerationForState(state)
        },
            b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
            c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
            d = springEvaluateStateWithDerivative(state, dt, c),
            dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
            dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);
        state.x = state.x + dxdt * dt;
        state.v = state.v + dvdt * dt;
        return state;
      }

      return function springRK4Factory(tension, friction, duration) {
        var initState = {
          x: -1,
          v: 0,
          tension: null,
          friction: null
        },
            path = [0],
            time_lapsed = 0,
            tolerance = 1 / 10000,
            DT = 16 / 1000,
            have_duration,
            dt,
            last_state;
        tension = parseFloat(tension) || 500;
        friction = parseFloat(friction) || 20;
        duration = duration || null;
        initState.tension = tension;
        initState.friction = friction;
        have_duration = duration !== null;
        /* Calculate the actual time it takes for this animation to complete with the provided conditions. */

        if (have_duration) {
          /* Run the simulation without a duration. */
          time_lapsed = springRK4Factory(tension, friction);
          /* Compute the adjusted time delta. */

          dt = time_lapsed / duration * DT;
        } else {
          dt = DT;
        }

        while (true) {
          /* Next/step function .*/
          last_state = springIntegrateState(last_state || initState, dt);
          /* Store the position. */

          path.push(1 + last_state.x);
          time_lapsed += 16;
          /* If the change threshold is reached, break. */

          if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
            break;
          }
        }
        /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
         computed path and returns a snapshot of the position according to a given percentComplete. */


        return !have_duration ? time_lapsed : function (percentComplete) {
          return path[percentComplete * (path.length - 1) | 0];
        };
      };
    }();
    /* jQuery easings. */


    Velocity.Easings = {
      linear: function (p) {
        return p;
      },
      swing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      },

      /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
      spring: function (p) {
        return 1 - Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6);
      }
    };
    /* CSS3 and Robert Penner easings. */

    $.each([["ease", [0.25, 0.1, 0.25, 1.0]], ["ease-in", [0.42, 0.0, 1.00, 1.0]], ["ease-out", [0.00, 0.0, 0.58, 1.0]], ["ease-in-out", [0.42, 0.0, 0.58, 1.0]], ["easeInSine", [0.47, 0, 0.745, 0.715]], ["easeOutSine", [0.39, 0.575, 0.565, 1]], ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]], ["easeInQuad", [0.55, 0.085, 0.68, 0.53]], ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]], ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]], ["easeInCubic", [0.55, 0.055, 0.675, 0.19]], ["easeOutCubic", [0.215, 0.61, 0.355, 1]], ["easeInOutCubic", [0.645, 0.045, 0.355, 1]], ["easeInQuart", [0.895, 0.03, 0.685, 0.22]], ["easeOutQuart", [0.165, 0.84, 0.44, 1]], ["easeInOutQuart", [0.77, 0, 0.175, 1]], ["easeInQuint", [0.755, 0.05, 0.855, 0.06]], ["easeOutQuint", [0.23, 1, 0.32, 1]], ["easeInOutQuint", [0.86, 0, 0.07, 1]], ["easeInExpo", [0.95, 0.05, 0.795, 0.035]], ["easeOutExpo", [0.19, 1, 0.22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [0.6, 0.04, 0.98, 0.335]], ["easeOutCirc", [0.075, 0.82, 0.165, 1]], ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]], function (i, easingArray) {
      Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
    });
    /* Determine the appropriate easing type given an easing input. */

    function getEasing(value, duration) {
      var easing = value;
      /* The easing option can either be a string that references a pre-registered easing,
       or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */

      if (Type.isString(value)) {
        /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
        if (!Velocity.Easings[value]) {
          easing = false;
        }
      } else if (Type.isArray(value) && value.length === 1) {
        easing = generateStep.apply(null, value);
      } else if (Type.isArray(value) && value.length === 2) {
        /* springRK4 must be passed the animation's duration. */

        /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
         function generated with default tension and friction values. */
        easing = generateSpringRK4.apply(null, value.concat([duration]));
      } else if (Type.isArray(value) && value.length === 4) {
        /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
        easing = generateBezier.apply(null, value);
      } else {
        easing = false;
      }
      /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
       if the Velocity-wide default has been incorrectly modified. */


      if (easing === false) {
        if (Velocity.Easings[Velocity.defaults.easing]) {
          easing = Velocity.defaults.easing;
        } else {
          easing = EASING_DEFAULT;
        }
      }

      return easing;
    }
    /*****************
     CSS Stack
     *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
     It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */

    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */


    var CSS = Velocity.CSS = {
      /*************
       RegEx
       *************/
      RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,

        /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,

        /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
      },

      /************
       Lists
       ************/
      Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
        units: ["%", // relative
        "em", "ex", "ch", "rem", // font relative
        "vw", "vh", "vmin", "vmax", // viewport relative
        "cm", "mm", "Q", "in", "pc", "pt", "px", // absolute lengths
        "deg", "grad", "rad", "turn", // angles
        "s", "ms" // time
        ],
        colorNames: {
          "aliceblue": "240,248,255",
          "antiquewhite": "250,235,215",
          "aquamarine": "127,255,212",
          "aqua": "0,255,255",
          "azure": "240,255,255",
          "beige": "245,245,220",
          "bisque": "255,228,196",
          "black": "0,0,0",
          "blanchedalmond": "255,235,205",
          "blueviolet": "138,43,226",
          "blue": "0,0,255",
          "brown": "165,42,42",
          "burlywood": "222,184,135",
          "cadetblue": "95,158,160",
          "chartreuse": "127,255,0",
          "chocolate": "210,105,30",
          "coral": "255,127,80",
          "cornflowerblue": "100,149,237",
          "cornsilk": "255,248,220",
          "crimson": "220,20,60",
          "cyan": "0,255,255",
          "darkblue": "0,0,139",
          "darkcyan": "0,139,139",
          "darkgoldenrod": "184,134,11",
          "darkgray": "169,169,169",
          "darkgrey": "169,169,169",
          "darkgreen": "0,100,0",
          "darkkhaki": "189,183,107",
          "darkmagenta": "139,0,139",
          "darkolivegreen": "85,107,47",
          "darkorange": "255,140,0",
          "darkorchid": "153,50,204",
          "darkred": "139,0,0",
          "darksalmon": "233,150,122",
          "darkseagreen": "143,188,143",
          "darkslateblue": "72,61,139",
          "darkslategray": "47,79,79",
          "darkturquoise": "0,206,209",
          "darkviolet": "148,0,211",
          "deeppink": "255,20,147",
          "deepskyblue": "0,191,255",
          "dimgray": "105,105,105",
          "dimgrey": "105,105,105",
          "dodgerblue": "30,144,255",
          "firebrick": "178,34,34",
          "floralwhite": "255,250,240",
          "forestgreen": "34,139,34",
          "fuchsia": "255,0,255",
          "gainsboro": "220,220,220",
          "ghostwhite": "248,248,255",
          "gold": "255,215,0",
          "goldenrod": "218,165,32",
          "gray": "128,128,128",
          "grey": "128,128,128",
          "greenyellow": "173,255,47",
          "green": "0,128,0",
          "honeydew": "240,255,240",
          "hotpink": "255,105,180",
          "indianred": "205,92,92",
          "indigo": "75,0,130",
          "ivory": "255,255,240",
          "khaki": "240,230,140",
          "lavenderblush": "255,240,245",
          "lavender": "230,230,250",
          "lawngreen": "124,252,0",
          "lemonchiffon": "255,250,205",
          "lightblue": "173,216,230",
          "lightcoral": "240,128,128",
          "lightcyan": "224,255,255",
          "lightgoldenrodyellow": "250,250,210",
          "lightgray": "211,211,211",
          "lightgrey": "211,211,211",
          "lightgreen": "144,238,144",
          "lightpink": "255,182,193",
          "lightsalmon": "255,160,122",
          "lightseagreen": "32,178,170",
          "lightskyblue": "135,206,250",
          "lightslategray": "119,136,153",
          "lightsteelblue": "176,196,222",
          "lightyellow": "255,255,224",
          "limegreen": "50,205,50",
          "lime": "0,255,0",
          "linen": "250,240,230",
          "magenta": "255,0,255",
          "maroon": "128,0,0",
          "mediumaquamarine": "102,205,170",
          "mediumblue": "0,0,205",
          "mediumorchid": "186,85,211",
          "mediumpurple": "147,112,219",
          "mediumseagreen": "60,179,113",
          "mediumslateblue": "123,104,238",
          "mediumspringgreen": "0,250,154",
          "mediumturquoise": "72,209,204",
          "mediumvioletred": "199,21,133",
          "midnightblue": "25,25,112",
          "mintcream": "245,255,250",
          "mistyrose": "255,228,225",
          "moccasin": "255,228,181",
          "navajowhite": "255,222,173",
          "navy": "0,0,128",
          "oldlace": "253,245,230",
          "olivedrab": "107,142,35",
          "olive": "128,128,0",
          "orangered": "255,69,0",
          "orange": "255,165,0",
          "orchid": "218,112,214",
          "palegoldenrod": "238,232,170",
          "palegreen": "152,251,152",
          "paleturquoise": "175,238,238",
          "palevioletred": "219,112,147",
          "papayawhip": "255,239,213",
          "peachpuff": "255,218,185",
          "peru": "205,133,63",
          "pink": "255,192,203",
          "plum": "221,160,221",
          "powderblue": "176,224,230",
          "purple": "128,0,128",
          "red": "255,0,0",
          "rosybrown": "188,143,143",
          "royalblue": "65,105,225",
          "saddlebrown": "139,69,19",
          "salmon": "250,128,114",
          "sandybrown": "244,164,96",
          "seagreen": "46,139,87",
          "seashell": "255,245,238",
          "sienna": "160,82,45",
          "silver": "192,192,192",
          "skyblue": "135,206,235",
          "slateblue": "106,90,205",
          "slategray": "112,128,144",
          "snow": "255,250,250",
          "springgreen": "0,255,127",
          "steelblue": "70,130,180",
          "tan": "210,180,140",
          "teal": "0,128,128",
          "thistle": "216,191,216",
          "tomato": "255,99,71",
          "turquoise": "64,224,208",
          "violet": "238,130,238",
          "wheat": "245,222,179",
          "whitesmoke": "245,245,245",
          "white": "255,255,255",
          "yellowgreen": "154,205,50",
          "yellow": "255,255,0"
        }
      },

      /************
       Hooks
       ************/

      /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
       (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */

      /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
       tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
      Hooks: {
        /********************
         Registration
         ********************/

        /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */

        /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
        templates: {
          "textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
          "boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
          "clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
          "backgroundPosition": ["X Y", "0% 0%"],
          "transformOrigin": ["X Y Z", "50% 50% 0px"],
          "perspectiveOrigin": ["X Y", "50% 50%"]
        },

        /* A "registered" hook is one that has been converted from its template form into a live,
         tweenable property. It contains data to associate it with its root property. */
        registered: {
          /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
           which consists of the subproperty's name, the associated root property's name,
           and the subproperty's position in the root's value. */
        },

        /* Convert the templates into individual hooks then append them to the registered object above. */
        register: function () {
          /* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
           currently set to "transparent" default to their respective template below when color-animated,
           and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
           which is almost always set closer to black than white. */
          for (var i = 0; i < CSS.Lists.colors.length; i++) {
            var rgbComponents = CSS.Lists.colors[i] === "color" ? "0 0 0 1" : "255 255 255 1";
            CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
          }

          var rootProperty, hookTemplate, hookNames;
          /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
           Thus, we re-arrange the templates accordingly. */

          if (IE) {
            for (rootProperty in CSS.Hooks.templates) {
              if (!CSS.Hooks.templates.hasOwnProperty(rootProperty)) {
                continue;
              }

              hookTemplate = CSS.Hooks.templates[rootProperty];
              hookNames = hookTemplate[0].split(" ");
              var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

              if (hookNames[0] === "Color") {
                /* Reposition both the hook's name and its default value to the end of their respective strings. */
                hookNames.push(hookNames.shift());
                defaultValues.push(defaultValues.shift());
                /* Replace the existing template for the hook's root property. */

                CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
              }
            }
          }
          /* Hook registration. */


          for (rootProperty in CSS.Hooks.templates) {
            if (!CSS.Hooks.templates.hasOwnProperty(rootProperty)) {
              continue;
            }

            hookTemplate = CSS.Hooks.templates[rootProperty];
            hookNames = hookTemplate[0].split(" ");

            for (var j in hookNames) {
              if (!hookNames.hasOwnProperty(j)) {
                continue;
              }

              var fullHookName = rootProperty + hookNames[j],
                  hookPosition = j;
              /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
               and the hook's position in its template's default value string. */

              CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
            }
          }
        },

        /*****************************
         Injection and Extraction
         *****************************/

        /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */

        /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
        getRoot: function (property) {
          var hookData = CSS.Hooks.registered[property];

          if (hookData) {
            return hookData[0];
          } else {
            /* If there was no hook match, return the property name untouched. */
            return property;
          }
        },
        getUnit: function (str, start) {
          var unit = (str.substr(start || 0, 5).match(/^[a-z%]+/) || [])[0] || "";

          if (unit && _inArray(CSS.Lists.units, unit)) {
            return unit;
          }

          return "";
        },
        fixColors: function (str) {
          return str.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function ($0, $1, $2) {
            if (CSS.Lists.colorNames.hasOwnProperty($2)) {
              return ($1 ? $1 : "rgba(") + CSS.Lists.colorNames[$2] + ($1 ? "" : ",1)");
            }

            return $1 + $2;
          });
        },

        /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
         the targeted hook can be injected or extracted at its standard position. */
        cleanRootPropertyValue: function (rootProperty, rootPropertyValue) {
          /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
          if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
            rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
          }
          /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
           default to the root's default value as defined in CSS.Hooks.templates. */

          /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
           zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */


          if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
            rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
          }

          return rootPropertyValue;
        },

        /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
        extractValue: function (fullHookName, rootPropertyValue) {
          var hookData = CSS.Hooks.registered[fullHookName];

          if (hookData) {
            var hookRoot = hookData[0],
                hookPosition = hookData[1];
            rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);
            /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */

            return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
          } else {
            /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
            return rootPropertyValue;
          }
        },

        /* Inject the hook's value into its root property's value. This is used to piece back together the root property
         once Velocity has updated one of its individually hooked values through tweening. */
        injectValue: function (fullHookName, hookValue, rootPropertyValue) {
          var hookData = CSS.Hooks.registered[fullHookName];

          if (hookData) {
            var hookRoot = hookData[0],
                hookPosition = hookData[1],
                rootPropertyValueParts,
                rootPropertyValueUpdated;
            rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);
            /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
             then reconstruct the rootPropertyValue string. */

            rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
            rootPropertyValueParts[hookPosition] = hookValue;
            rootPropertyValueUpdated = rootPropertyValueParts.join(" ");
            return rootPropertyValueUpdated;
          } else {
            /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
            return rootPropertyValue;
          }
        }
      },

      /*******************
       Normalizations
       *******************/

      /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
       and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
      Normalizations: {
        /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
         the targeted element (which may need to be queried), and the targeted property value. */
        registered: {
          clip: function (type, element, propertyValue) {
            switch (type) {
              case "name":
                return "clip";

              /* Clip needs to be unwrapped and stripped of its commas during extraction. */

              case "extract":
                var extracted;
                /* If Velocity also extracted this value, skip extraction. */

                if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                  extracted = propertyValue;
                } else {
                  /* Remove the "rect()" wrapper. */
                  extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);
                  /* Strip off commas. */

                  extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                }

                return extracted;

              /* Clip needs to be re-wrapped during injection. */

              case "inject":
                return "rect(" + propertyValue + ")";
            }
          },
          blur: function (type, element, propertyValue) {
            switch (type) {
              case "name":
                return Velocity.State.isFirefox ? "filter" : "-webkit-filter";

              case "extract":
                var extracted = parseFloat(propertyValue);
                /* If extracted is NaN, meaning the value isn't already extracted. */

                if (!(extracted || extracted === 0)) {
                  var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                  /* If the filter string had a blur component, return just the blur value and unit type. */

                  if (blurComponent) {
                    extracted = blurComponent[1];
                    /* If the component doesn't exist, default blur to 0. */
                  } else {
                    extracted = 0;
                  }
                }

                return extracted;

              /* Blur needs to be re-wrapped during injection. */

              case "inject":
                /* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
                if (!parseFloat(propertyValue)) {
                  return "none";
                } else {
                  return "blur(" + propertyValue + ")";
                }

            }
          },

          /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
          opacity: function (type, element, propertyValue) {
            if (IE <= 8) {
              switch (type) {
                case "name":
                  return "filter";

                case "extract":
                  /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                  var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                  if (extracted) {
                    /* Convert to decimal value. */
                    propertyValue = extracted[1] / 100;
                  } else {
                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                    propertyValue = 1;
                  }

                  return propertyValue;

                case "inject":
                  /* Opacified elements are required to have their zoom property set to a non-zero value. */
                  element.style.zoom = 1;
                  /* Setting the filter property on elements with certain font property combinations can result in a
                   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */

                  if (parseFloat(propertyValue) >= 1) {
                    return "";
                  } else {
                    /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                    return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                  }

              }
              /* With all other browsers, normalization is not required; return the same values that were passed in. */

            } else {
              switch (type) {
                case "name":
                  return "opacity";

                case "extract":
                  return propertyValue;

                case "inject":
                  return propertyValue;
              }
            }
          }
        },

        /*****************************
         Batched Registrations
         *****************************/

        /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
        register: function () {
          /*****************
           Transforms
           *****************/

          /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
           so that they can be referenced in a properties map by their individual names. */

          /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
           setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
           Transform setting is batched in this way to improve performance: the transform style only needs to be updated
           once when multiple transform subproperties are being animated simultaneously. */

          /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
           transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
           from being normalized for these browsers so that tweening skips these properties altogether
           (since it will ignore them as being unsupported by the browser.) */
          if ((!IE || IE > 9) && !Velocity.State.isGingerbread) {
            /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
             share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
            CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
          }

          for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
            /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
             paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
            (function () {
              var transformName = CSS.Lists.transformsBase[i];

              CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
                switch (type) {
                  /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                  case "name":
                    return "transform";

                  /* Transform values are cached onto a per-element transformCache object. */

                  case "extract":
                    /* If this transform has yet to be assigned a value, return its null value. */
                    if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                      /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                      return /^scale/i.test(transformName) ? 1 : 0;
                      /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                       Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                    }

                    return Data(element).transformCache[transformName].replace(/[()]/g, "");

                  case "inject":
                    var invalid = false;
                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                     Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */

                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */

                    switch (transformName.substr(0, transformName.length - 1)) {
                      /* Whitelist unit types for each transform. */
                      case "translate":
                        invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                        break;

                      /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */

                      case "scal":
                      case "scale":
                        /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                         value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                         and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                        if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                          propertyValue = 1;
                        }

                        invalid = !/(\d)$/i.test(propertyValue);
                        break;

                      case "skew":
                        invalid = !/(deg|\d)$/i.test(propertyValue);
                        break;

                      case "rotate":
                        invalid = !/(deg|\d)$/i.test(propertyValue);
                        break;
                    }

                    if (!invalid) {
                      /* As per the CSS spec, wrap the value in parentheses. */
                      Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                    }
                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */


                    return Data(element).transformCache[transformName];
                }
              };
            })();
          }
          /*************
           Colors
           *************/

          /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
           Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */


          for (var j = 0; j < CSS.Lists.colors.length; j++) {
            /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
             (Otherwise, all functions would take the final for loop's colorName.) */
            (function () {
              var colorName = CSS.Lists.colors[j];
              /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */

              CSS.Normalizations.registered[colorName] = function (type, element, propertyValue) {
                switch (type) {
                  case "name":
                    return colorName;

                  /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */

                  case "extract":
                    var extracted;
                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */

                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                      extracted = propertyValue;
                    } else {
                      var converted,
                          colorNames = {
                        black: "rgb(0, 0, 0)",
                        blue: "rgb(0, 0, 255)",
                        gray: "rgb(128, 128, 128)",
                        green: "rgb(0, 128, 0)",
                        red: "rgb(255, 0, 0)",
                        white: "rgb(255, 255, 255)"
                      };
                      /* Convert color names to rgb. */

                      if (/^[A-z]+$/i.test(propertyValue)) {
                        if (colorNames[propertyValue] !== undefined) {
                          converted = colorNames[propertyValue];
                        } else {
                          /* If an unmatched color name is provided, default to black. */
                          converted = colorNames.black;
                        }
                        /* Convert hex values to rgb. */

                      } else if (CSS.RegEx.isHex.test(propertyValue)) {
                        converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                        /* If the provided color doesn't match any of the accepted color formats, default to black. */
                      } else if (!/^rgba?\(/i.test(propertyValue)) {
                        converted = colorNames.black;
                      }
                      /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                       repeated spaces (in case the value included spaces to begin with). */


                      extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }
                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */


                    if ((!IE || IE > 8) && extracted.split(" ").length === 3) {
                      extracted += " 1";
                    }

                    return extracted;

                  case "inject":
                    /* If we have a pattern then it might already have the right values */
                    if (/^rgb/.test(propertyValue)) {
                      return propertyValue;
                    }
                    /* If this is IE<=8 and an alpha component exists, strip it off. */


                    if (IE <= 8) {
                      if (propertyValue.split(" ").length === 4) {
                        propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                      }
                      /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */

                    } else if (propertyValue.split(" ").length === 3) {
                      propertyValue += " 1";
                    }
                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                     on all values but the fourth (R, G, and B only accept whole numbers). */


                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                }
              };
            })();
          }
          /**************
           Dimensions
           **************/


          function augmentDimension(name, element, wantInner) {
            var isBorderBox = CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() === "border-box";

            if (isBorderBox === (wantInner || false)) {
              /* in box-sizing mode, the CSS width / height accessors already give the outerWidth / outerHeight. */
              var i,
                  value,
                  augment = 0,
                  sides = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"],
                  fields = ["padding" + sides[0], "padding" + sides[1], "border" + sides[0] + "Width", "border" + sides[1] + "Width"];

              for (i = 0; i < fields.length; i++) {
                value = parseFloat(CSS.getPropertyValue(element, fields[i]));

                if (!isNaN(value)) {
                  augment += value;
                }
              }

              return wantInner ? -augment : augment;
            }

            return 0;
          }

          function getDimension(name, wantInner) {
            return function (type, element, propertyValue) {
              switch (type) {
                case "name":
                  return name;

                case "extract":
                  return parseFloat(propertyValue) + augmentDimension(name, element, wantInner);

                case "inject":
                  return parseFloat(propertyValue) - augmentDimension(name, element, wantInner) + "px";
              }
            };
          }

          CSS.Normalizations.registered.innerWidth = getDimension("width", true);
          CSS.Normalizations.registered.innerHeight = getDimension("height", true);
          CSS.Normalizations.registered.outerWidth = getDimension("width");
          CSS.Normalizations.registered.outerHeight = getDimension("height");
        }
      },

      /************************
       CSS Property Names
       ************************/
      Names: {
        /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
         Camelcasing is used to normalize property names between and across calls. */
        camelCase: function (property) {
          return property.replace(/-(\w)/g, function (match, subMatch) {
            return subMatch.toUpperCase();
          });
        },

        /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
        SVGAttribute: function (property) {
          var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
          /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */

          if (IE || Velocity.State.isAndroid && !Velocity.State.isChrome) {
            SVGAttributes += "|transform";
          }

          return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
        },

        /* Determine whether a property should be set with a vendor prefix. */

        /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
         If the property is not at all supported by the browser, return a false flag. */
        prefixCheck: function (property) {
          /* If this property has already been checked, return the cached value. */
          if (Velocity.State.prefixMatches[property]) {
            return [Velocity.State.prefixMatches[property], true];
          } else {
            var vendors = ["", "Webkit", "Moz", "ms", "O"];

            for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
              var propertyPrefixed;

              if (i === 0) {
                propertyPrefixed = property;
              } else {
                /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                propertyPrefixed = vendors[i] + property.replace(/^\w/, function (match) {
                  return match.toUpperCase();
                });
              }
              /* Check if the browser supports this property as prefixed. */


              if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                /* Cache the match. */
                Velocity.State.prefixMatches[property] = propertyPrefixed;
                return [propertyPrefixed, true];
              }
            }
            /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */


            return [property, false];
          }
        }
      },

      /************************
       CSS Property Values
       ************************/
      Values: {
        /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
        hexToRgb: function (hex) {
          var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
              rgbParts;
          hex = hex.replace(shortformRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
          });
          rgbParts = longformRegex.exec(hex);
          return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
        },
        isCSSNullValue: function (value) {
          /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
           Thus, we check for both falsiness and these special strings. */

          /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
           templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */

          /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
          return !value || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value);
        },

        /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
        getUnitType: function (property) {
          if (/^(rotate|skew)/i.test(property)) {
            return "deg";
          } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
            /* The above properties are unitless. */
            return "";
          } else {
            /* Default to px for all other properties. */
            return "px";
          }
        },

        /* HTML elements default to an associated display type when they're not set to display:none. */

        /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
        getDisplayType: function (element) {
          var tagName = element && element.tagName.toString().toLowerCase();

          if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
            return "inline";
          } else if (/^(li)$/i.test(tagName)) {
            return "list-item";
          } else if (/^(tr)$/i.test(tagName)) {
            return "table-row";
          } else if (/^(table)$/i.test(tagName)) {
            return "table";
          } else if (/^(tbody)$/i.test(tagName)) {
            return "table-row-group";
            /* Default to "block" when no match is found. */
          } else {
            return "block";
          }
        },

        /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
        addClass: function (element, className) {
          if (element) {
            if (element.classList) {
              element.classList.add(className);
            } else if (Type.isString(element.className)) {
              // Element.className is around 15% faster then set/getAttribute
              element.className += (element.className.length ? " " : "") + className;
            } else {
              // Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
              var currentClass = element.getAttribute(IE <= 7 ? "className" : "class") || "";
              element.setAttribute("class", currentClass + (currentClass ? " " : "") + className);
            }
          }
        },
        removeClass: function (element, className) {
          if (element) {
            if (element.classList) {
              element.classList.remove(className);
            } else if (Type.isString(element.className)) {
              // Element.className is around 15% faster then set/getAttribute
              // TODO: Need some jsperf tests on performance - can we get rid of the regex and maybe use split / array manipulation?
              element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
            } else {
              // Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
              var currentClass = element.getAttribute(IE <= 7 ? "className" : "class") || "";
              element.setAttribute("class", currentClass.replace(new RegExp("(^|\s)" + className.split(" ").join("|") + "(\s|$)", "gi"), " "));
            }
          }
        }
      },

      /****************************
       Style Getting & Setting
       ****************************/

      /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
      getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {
        /* Get an element's computed property value. */

        /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
         style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
         *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
        function computePropertyValue(element, property) {
          /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
           element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
           offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
           We subtract border and padding to get the sum of interior + scrollbar. */
          var computedValue = 0;
          /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
           of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
           codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
           Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */

          if (IE <= 8) {
            computedValue = $.css(element, property);
            /* GET */

            /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
             associated element so that it does not need to be refetched upon every GET. */
          } else {
            /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
             toggle display to the element type's default value. */
            var toggleDisplay = false;

            if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
              toggleDisplay = true;
              CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
            }

            var revertDisplay = function () {
              if (toggleDisplay) {
                CSS.setPropertyValue(element, "display", "none");
              }
            };

            if (!forceStyleLookup) {
              if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                revertDisplay();
                return contentBoxHeight;
              } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                revertDisplay();
                return contentBoxWidth;
              }
            }

            var computedStyle;
            /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
             of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */

            if (Data(element) === undefined) {
              computedStyle = window.getComputedStyle(element, null);
              /* GET */

              /* If the computedStyle object has yet to be cached, do so now. */
            } else if (!Data(element).computedStyle) {
              computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null);
              /* GET */

              /* If computedStyle is cached, use it. */
            } else {
              computedStyle = Data(element).computedStyle;
            }
            /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
             Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
             So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */


            if (property === "borderColor") {
              property = "borderTopColor";
            }
            /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
             instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */


            if (IE === 9 && property === "filter") {
              computedValue = computedStyle.getPropertyValue(property);
              /* GET */
            } else {
              computedValue = computedStyle[property];
            }
            /* Fall back to the property's style value (if defined) when computedValue returns nothing,
             which can happen when the element hasn't been painted. */


            if (computedValue === "" || computedValue === null) {
              computedValue = element.style[property];
            }

            revertDisplay();
          }
          /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
           defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
           effect as being set to 0, so no conversion is necessary.) */

          /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
           property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
           to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */


          if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
            var position = computePropertyValue(element, "position");
            /* GET */

            /* For absolute positioning, jQuery's $.position() only returns values for top and left;
             right and bottom will have their "auto" value reverted to 0. */

            /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
             Not a big deal since we're currently in a GET batch anyway. */

            if (position === "fixed" || position === "absolute" && /top|left/i.test(property)) {
              /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
              computedValue = $(element).position()[property] + "px";
              /* GET */
            }
          }

          return computedValue;
        }

        var propertyValue;
        /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
         extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */

        if (CSS.Hooks.registered[property]) {
          var hook = property,
              hookRoot = CSS.Hooks.getRoot(hook);
          /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
           query the DOM for the root property's value. */

          if (rootPropertyValue === undefined) {
            /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
            rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]);
            /* GET */
          }
          /* If this root has a normalization registered, peform the associated normalization extraction. */


          if (CSS.Normalizations.registered[hookRoot]) {
            rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
          }
          /* Extract the hook's value. */


          propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);
          /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
           normalize the property's name and value, and handle the special case of transforms. */

          /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
           numerical and therefore do not require normalization extraction. */
        } else if (CSS.Normalizations.registered[property]) {
          var normalizedPropertyName, normalizedPropertyValue;
          normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);
          /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
           At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
           This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
           thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */

          if (normalizedPropertyName !== "transform") {
            normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]);
            /* GET */

            /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */

            if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
              normalizedPropertyValue = CSS.Hooks.templates[property][1];
            }
          }

          propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
        }
        /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */


        if (!/^[\d-]/.test(propertyValue)) {
          /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
           their HTML attribute values instead of their CSS style values. */
          var data = Data(element);

          if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
            /* Since the height/width attribute values must be set manually, they don't reflect computed values.
             Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
            if (/^(height|width)$/i.test(property)) {
              /* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
              try {
                propertyValue = element.getBBox()[property];
              } catch (error) {
                propertyValue = 0;
              }
              /* Otherwise, access the attribute value directly. */

            } else {
              propertyValue = element.getAttribute(property);
            }
          } else {
            propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]);
            /* GET */
          }
        }
        /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
         convert CSS null-values to an integer of value 0. */


        if (CSS.Values.isCSSNullValue(propertyValue)) {
          propertyValue = 0;
        }

        if (Velocity.debug >= 2) {
          console.log("Get " + property + ": " + propertyValue);
        }

        return propertyValue;
      },

      /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
      setPropertyValue: function (element, property, propertyValue, rootPropertyValue, scrollData) {
        var propertyName = property;
        /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */

        if (property === "scroll") {
          /* If a container option is present, scroll the container instead of the browser window. */
          if (scrollData.container) {
            scrollData.container["scroll" + scrollData.direction] = propertyValue;
            /* Otherwise, Velocity defaults to scrolling the browser window. */
          } else {
            if (scrollData.direction === "Left") {
              window.scrollTo(propertyValue, scrollData.alternateValue);
            } else {
              window.scrollTo(scrollData.alternateValue, propertyValue);
            }
          }
        } else {
          /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
           Thus, for now, we merely cache transforms being SET. */
          if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
            /* Perform a normalization injection. */

            /* Note: The normalization logic handles the transformCache updating. */
            CSS.Normalizations.registered[property]("inject", element, propertyValue);
            propertyName = "transform";
            propertyValue = Data(element).transformCache[property];
          } else {
            /* Inject hooks. */
            if (CSS.Hooks.registered[property]) {
              var hookName = property,
                  hookRoot = CSS.Hooks.getRoot(property);
              /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */

              rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot);
              /* GET */

              propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
              property = hookRoot;
            }
            /* Normalize names and values. */


            if (CSS.Normalizations.registered[property]) {
              propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
              property = CSS.Normalizations.registered[property]("name", element);
            }
            /* Assign the appropriate vendor prefix before performing an official style update. */


            propertyName = CSS.Names.prefixCheck(property)[0];
            /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
             Try/catch is avoided for other browsers since it incurs a performance overhead. */

            if (IE <= 8) {
              try {
                element.style[propertyName] = propertyValue;
              } catch (error) {
                if (Velocity.debug) {
                  console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
                }
              }
              /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */

              /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */

            } else {
              var data = Data(element);

              if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
                /* Note: For SVG attributes, vendor-prefixed property names are never used. */

                /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
                element.setAttribute(property, propertyValue);
              } else {
                element.style[propertyName] = propertyValue;
              }
            }

            if (Velocity.debug >= 2) {
              console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
            }
          }
        }
        /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */


        return [propertyName, propertyValue];
      },

      /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */

      /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
      flushTransformCache: function (element) {
        var transformString = "",
            data = Data(element);
        /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
         (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */

        if ((IE || Velocity.State.isAndroid && !Velocity.State.isChrome) && data && data.isSVG) {
          /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
           Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
          var getTransformFloat = function (transformProperty) {
            return parseFloat(CSS.getPropertyValue(element, transformProperty));
          };
          /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
           we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */


          var SVGTransforms = {
            translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
            skewX: [getTransformFloat("skewX")],
            skewY: [getTransformFloat("skewY")],

            /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
             (this behavior mimics the result of animating all these properties at once on HTML elements). */
            scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],

            /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
             defining the rotation's origin point. We ignore the origin values (default them to 0). */
            rotate: [getTransformFloat("rotateZ"), 0, 0]
          };
          /* Iterate through the transform properties in the user-defined property map order.
           (This mimics the behavior of non-SVG transform animation.) */

          $.each(Data(element).transformCache, function (transformName) {
            /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
             properties so that they match up with SVG's accepted transform properties. */
            if (/^translate/i.test(transformName)) {
              transformName = "translate";
            } else if (/^scale/i.test(transformName)) {
              transformName = "scale";
            } else if (/^rotate/i.test(transformName)) {
              transformName = "rotate";
            }
            /* Check that we haven't yet deleted the property from the SVGTransforms container. */


            if (SVGTransforms[transformName]) {
              /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
              transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";
              /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
               re-insert the same master property if we encounter another one of its axis-specific properties. */

              delete SVGTransforms[transformName];
            }
          });
        } else {
          var transformValue, perspective;
          /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */

          $.each(Data(element).transformCache, function (transformName) {
            transformValue = Data(element).transformCache[transformName];
            /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */

            if (transformName === "transformPerspective") {
              perspective = transformValue;
              return true;
            }
            /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */


            if (IE === 9 && transformName === "rotateZ") {
              transformName = "rotate";
            }

            transformString += transformName + transformValue + " ";
          });
          /* If present, set the perspective subproperty first. */

          if (perspective) {
            transformString = "perspective" + perspective + " " + transformString;
          }
        }

        CSS.setPropertyValue(element, "transform", transformString);
      }
    };
    /* Register hooks and normalizations. */

    CSS.Hooks.register();
    CSS.Normalizations.register();
    /* Allow hook setting in the same fashion as jQuery's $.css(). */

    Velocity.hook = function (elements, arg2, arg3) {
      var value;
      elements = sanitizeElements(elements);
      $.each(elements, function (i, element) {
        /* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
        if (Data(element) === undefined) {
          Velocity.init(element);
        }
        /* Get property value. If an element set was passed in, only return the value for the first element. */


        if (arg3 === undefined) {
          if (value === undefined) {
            value = CSS.getPropertyValue(element, arg2);
          }
          /* Set property value. */

        } else {
          /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
          var adjustedSet = CSS.setPropertyValue(element, arg2, arg3);
          /* Transform properties don't automatically set. They have to be flushed to the DOM. */

          if (adjustedSet[0] === "transform") {
            Velocity.CSS.flushTransformCache(element);
          }

          value = adjustedSet;
        }
      });
      return value;
    };
    /*****************
     Animation
     *****************/


    var animate = function () {
      var opts;
      /******************
       Call Chain
       ******************/

      /* Logic for determining what to return to the call stack when exiting out of Velocity. */

      function getChain() {
        /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
         default to null instead of returning the targeted elements so that utility function's return value is standardized. */
        if (isUtility) {
          return promiseData.promise || null;
          /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
        } else {
          return elementsWrapped;
        }
      }
      /*************************
       Arguments Assignment
       *************************/

      /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
       objects are defined on a container object that's passed in as Velocity's sole argument. */

      /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */


      var syntacticSugar = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || Type.isString(arguments[0].properties)),

      /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
      isUtility,

      /* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
       passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
      elementsWrapped,
          argumentIndex;
      var elements, propertiesMap, options;
      /* Detect jQuery/Zepto elements being animated via the $.fn method. */

      if (Type.isWrapped(this)) {
        isUtility = false;
        argumentIndex = 0;
        elements = this;
        elementsWrapped = this;
        /* Otherwise, raw elements are being animated via the utility function. */
      } else {
        isUtility = true;
        argumentIndex = 1;
        elements = syntacticSugar ? arguments[0].elements || arguments[0].e : arguments[0];
      }
      /***************
       Promises
       ***************/


      var promiseData = {
        promise: null,
        resolver: null,
        rejecter: null
      };
      /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
       promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
       method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
       call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */

      /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
       triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
       grouped together for the purposes of resolving and rejecting a promise. */

      if (isUtility && Velocity.Promise) {
        promiseData.promise = new Velocity.Promise(function (resolve, reject) {
          promiseData.resolver = resolve;
          promiseData.rejecter = reject;
        });
      }

      if (syntacticSugar) {
        propertiesMap = arguments[0].properties || arguments[0].p;
        options = arguments[0].options || arguments[0].o;
      } else {
        propertiesMap = arguments[argumentIndex];
        options = arguments[argumentIndex + 1];
      }

      elements = sanitizeElements(elements);

      if (!elements) {
        if (promiseData.promise) {
          if (!propertiesMap || !options || options.promiseRejectEmpty !== false) {
            promiseData.rejecter();
          } else {
            promiseData.resolver();
          }
        }

        return;
      }
      /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
       single raw DOM element is passed in (which doesn't contain a length property). */


      var elementsLength = elements.length,
          elementsIndex = 0;
      /***************************
       Argument Overloading
       ***************************/

      /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
       Overloading is detected by checking for the absence of an object being passed into options. */

      /* Note: The stop/finish/pause/resume actions do not accept animation options, and are therefore excluded from this check. */

      if (!/^(stop|finish|finishAll|pause|resume)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
        /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
        var startingArgumentPosition = argumentIndex + 1;
        options = {};
        /* Iterate through all options arguments */

        for (var i = startingArgumentPosition; i < arguments.length; i++) {
          /* Treat a number as a duration. Parse it out. */

          /* Note: The following RegEx will return true if passed an array with a number as its first item.
           Thus, arrays are skipped from this check. */
          if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
            options.duration = arguments[i];
            /* Treat strings and arrays as easings. */
          } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
            options.easing = arguments[i];
            /* Treat a function as a complete callback. */
          } else if (Type.isFunction(arguments[i])) {
            options.complete = arguments[i];
          }
        }
      }
      /*********************
       Action Detection
       *********************/

      /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
       or they can be started, stopped, paused, resumed, or reversed . If a literal or referenced properties map is passed in as Velocity's
       first argument, the associated action is "start". Alternatively, "scroll", "reverse", "pause", "resume" or "stop" can be passed in 
       instead of a properties map. */


      var action;

      switch (propertiesMap) {
        case "scroll":
          action = "scroll";
          break;

        case "reverse":
          action = "reverse";
          break;

        case "pause":
          /*******************
           Action: Pause
           *******************/
          var currentTime = new Date().getTime();
          /* Handle delay timers */

          $.each(elements, function (i, element) {
            pauseDelayOnElement(element, currentTime);
          });
          /* Pause and Resume are call-wide (not on a per element basis). Thus, calling pause or resume on a 
           single element will cause any calls that containt tweens for that element to be paused/resumed
           as well. */

          /* Iterate through all calls and pause any that contain any of our elements */

          $.each(Velocity.State.calls, function (i, activeCall) {
            var found = false;
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */

            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function (k, activeElement) {
                var queueName = options === undefined ? "" : options;

                if (queueName !== true && activeCall[2].queue !== queueName && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }
                /* Iterate through the calls targeted by the stop command. */


                $.each(elements, function (l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {
                    /* Set call to paused */
                    activeCall[5] = {
                      resume: false
                    };
                    /* Once we match an element, we can bounce out to the next call entirely */

                    found = true;
                    return false;
                  }
                });
                /* Proceed to check next call if we have already matched */

                if (found) {
                  return false;
                }
              });
            }
          });
          /* Since pause creates no new tweens, exit out of Velocity. */

          return getChain();

        case "resume":
          /*******************
           Action: Resume
           *******************/

          /* Handle delay timers */
          $.each(elements, function (i, element) {
            resumeDelayOnElement(element, currentTime);
          });
          /* Pause and Resume are call-wide (not on a per elemnt basis). Thus, calling pause or resume on a 
           single element will cause any calls that containt tweens for that element to be paused/resumed
           as well. */

          /* Iterate through all calls and pause any that contain any of our elements */

          $.each(Velocity.State.calls, function (i, activeCall) {
            var found = false;
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */

            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function (k, activeElement) {
                var queueName = options === undefined ? "" : options;

                if (queueName !== true && activeCall[2].queue !== queueName && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }
                /* Skip any calls that have never been paused */


                if (!activeCall[5]) {
                  return true;
                }
                /* Iterate through the calls targeted by the stop command. */


                $.each(elements, function (l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {
                    /* Flag a pause object to be resumed, which will occur during the next tick. In
                     addition, the pause object will at that time be deleted */
                    activeCall[5].resume = true;
                    /* Once we match an element, we can bounce out to the next call entirely */

                    found = true;
                    return false;
                  }
                });
                /* Proceed to check next call if we have already matched */

                if (found) {
                  return false;
                }
              });
            }
          });
          /* Since resume creates no new tweens, exit out of Velocity. */

          return getChain();

        case "finish":
        case "finishAll":
        case "stop":
          /*******************
           Action: Stop
           *******************/

          /* Clear the currently-active delay on each targeted element. */
          $.each(elements, function (i, element) {
            if (Data(element) && Data(element).delayTimer) {
              /* Stop the timer from triggering its cached next() function. */
              clearTimeout(Data(element).delayTimer.setTimeout);
              /* Manually call the next() function so that the subsequent queue items can progress. */

              if (Data(element).delayTimer.next) {
                Data(element).delayTimer.next();
              }

              delete Data(element).delayTimer;
            }
            /* If we want to finish everything in the queue, we have to iterate through it
             and call each function. This will make them active calls below, which will
             cause them to be applied via the duration setting. */


            if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
              /* Iterate through the items in the element's queue. */
              $.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {
                /* The queue array can contain an "inprogress" string, which we skip. */
                if (Type.isFunction(item)) {
                  item();
                }
              });
              /* Clearing the $.queue() array is achieved by resetting it to []. */

              $.queue(element, Type.isString(options) ? options : "", []);
            }
          });
          var callsToStop = [];
          /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
           been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
           is stopped, the next item in its animation queue is immediately triggered. */

          /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
           or a custom queue string can be passed in. */

          /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
           regardless of the element's current queue state. */

          /* Iterate through every active call. */

          $.each(Velocity.State.calls, function (i, activeCall) {
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function (k, activeElement) {
                /* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
                 clear calls associated with the relevant queue. */

                /* Call stopping logic works as follows:
                 - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
                 - options === undefined --> stop current queue:"" call and all queue:false calls.
                 - options === false --> stop only queue:false calls.
                 - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
                var queueName = options === undefined ? "" : options;

                if (queueName !== true && activeCall[2].queue !== queueName && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }
                /* Iterate through the calls targeted by the stop command. */


                $.each(elements, function (l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {
                    /* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
                     due to the queue-clearing above. */
                    if (options === true || Type.isString(options)) {
                      /* Iterate through the items in the element's queue. */
                      $.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {
                        /* The queue array can contain an "inprogress" string, which we skip. */
                        if (Type.isFunction(item)) {
                          /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                           (Specifically, the queue will resolve the call's associated promise then abort.)  */
                          item(null, true);
                        }
                      });
                      /* Clearing the $.queue() array is achieved by resetting it to []. */

                      $.queue(element, Type.isString(options) ? options : "", []);
                    }

                    if (propertiesMap === "stop") {
                      /* Since "reverse" uses cached start values (the previous call's endValues), these values must be
                       changed to reflect the final value that the elements were actually tweened to. */

                      /* Note: If only queue:false/queue:"custom" animations are currently running on an element, it won't have a tweensContainer
                       object. Also, queue:false/queue:"custom" animations can't be reversed. */
                      var data = Data(element);

                      if (data && data.tweensContainer && (queueName === true || queueName === "")) {
                        $.each(data.tweensContainer, function (m, activeTween) {
                          activeTween.endValue = activeTween.currentValue;
                        });
                      }

                      callsToStop.push(i);
                    } else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
                      /* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
                       they finish upon the next rAf tick then proceed with normal call completion logic. */
                      activeCall[2].duration = 1;
                    }
                  }
                });
              });
            }
          });
          /* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
           that the complete callback and display:none setting should be skipped since we're completing prematurely. */

          if (propertiesMap === "stop") {
            $.each(callsToStop, function (i, j) {
              completeCall(j, true);
            });

            if (promiseData.promise) {
              /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
              promiseData.resolver(elements);
            }
          }
          /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */


          return getChain();

        default:
          /* Treat a non-empty plain object as a literal properties map. */
          if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
            action = "start";
            /****************
             Redirects
             ****************/

            /* Check if a string matches a registered redirect (see Redirects above). */
          } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
            opts = $.extend({}, options);
            var durationOriginal = opts.duration,
                delayOriginal = opts.delay || 0;
            /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */

            if (opts.backwards === true) {
              elements = $.extend(true, [], elements).reverse();
            }
            /* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */


            $.each(elements, function (elementIndex, element) {
              /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
              if (parseFloat(opts.stagger)) {
                opts.delay = delayOriginal + parseFloat(opts.stagger) * elementIndex;
              } else if (Type.isFunction(opts.stagger)) {
                opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
              }
              /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
               the duration of each element's animation, using floors to prevent producing very short durations. */


              if (opts.drag) {
                /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);
                /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                 B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                 The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */

                opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
              }
              /* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
               reduce the opts checking logic required inside the redirect. */


              Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
            });
            /* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
             (The performance overhead up to this point is virtually non-existant.) */

            /* Note: The jQuery call chain is kept intact by returning the complete element set. */

            return getChain();
          } else {
            var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

            if (promiseData.promise) {
              promiseData.rejecter(new Error(abortError));
            } else if (window.console) {
              console.log(abortError);
            }

            return getChain();
          }

      }
      /**************************
       Call-Wide Variables
       **************************/

      /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
       being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
       avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
       conversion metrics across Velocity animations that are not immediately consecutively chained. */


      var callUnitConversionData = {
        lastParent: null,
        lastPosition: null,
        lastFontSize: null,
        lastPercentToPxWidth: null,
        lastPercentToPxHeight: null,
        lastEmToPx: null,
        remToPx: null,
        vwToPx: null,
        vhToPx: null
      };
      /* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
       Velocity.State.calls array that is processed during animation ticking. */

      var call = [];
      /************************
       Element Processing
       ************************/

      /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
       1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
       2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
       3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
       `elementArrayIndex` allows passing index of the element in the original array to value functions.
       If `elementsIndex` were used instead the index would be determined by the elements' per-element queue.
       */

      function processElement(element, elementArrayIndex) {
        /*************************
         Part I: Pre-Queueing
         *************************/

        /***************************
         Element-Wide Variables
         ***************************/
        var
        /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
        opts = $.extend({}, Velocity.defaults, options),

        /* A container for the processed data associated with each property in the propertyMap.
         (Each property in the map produces its own "tween".) */
        tweensContainer = {},
            elementUnitConversionData;
        /******************
         Element Init
         ******************/

        if (Data(element) === undefined) {
          Velocity.init(element);
        }
        /******************
         Option: Delay
         ******************/

        /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */

        /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
         (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */


        if (parseFloat(opts.delay) && opts.queue !== false) {
          $.queue(element, opts.queue, function (next, clearQueue) {
            if (clearQueue === true) {
              /* Do not continue with animation queueing. */
              return true;
            }
            /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */


            Velocity.velocityQueueEntryFlag = true;
            /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
             The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command, and
             delayBegin/delayTime is used to ensure we can "pause" and "resume" a tween that is still mid-delay. */

            /* Temporarily store delayed elements to facilite access for global pause/resume */

            var callIndex = Velocity.State.delayedElements.count++;
            Velocity.State.delayedElements[callIndex] = element;

            var delayComplete = function (index) {
              return function () {
                /* Clear the temporary element */
                Velocity.State.delayedElements[index] = false;
                /* Finally, issue the call */

                next();
              };
            }(callIndex);

            Data(element).delayBegin = new Date().getTime();
            Data(element).delay = parseFloat(opts.delay);
            Data(element).delayTimer = {
              setTimeout: setTimeout(next, parseFloat(opts.delay)),
              next: delayComplete
            };
          });
        }
        /*********************
         Option: Duration
         *********************/

        /* Support for jQuery's named durations. */


        switch (opts.duration.toString().toLowerCase()) {
          case "fast":
            opts.duration = 200;
            break;

          case "normal":
            opts.duration = DURATION_DEFAULT;
            break;

          case "slow":
            opts.duration = 600;
            break;

          default:
            /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
            opts.duration = parseFloat(opts.duration) || 1;
        }
        /************************
         Global Option: Mock
         ************************/


        if (Velocity.mock !== false) {
          /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
           Alternatively, a multiplier can be passed in to time remap all delays and durations. */
          if (Velocity.mock === true) {
            opts.duration = opts.delay = 1;
          } else {
            opts.duration *= parseFloat(Velocity.mock) || 1;
            opts.delay *= parseFloat(Velocity.mock) || 1;
          }
        }
        /*******************
         Option: Easing
         *******************/


        opts.easing = getEasing(opts.easing, opts.duration);
        /**********************
         Option: Callbacks
         **********************/

        /* Callbacks must functions. Otherwise, default to null. */

        if (opts.begin && !Type.isFunction(opts.begin)) {
          opts.begin = null;
        }

        if (opts.progress && !Type.isFunction(opts.progress)) {
          opts.progress = null;
        }

        if (opts.complete && !Type.isFunction(opts.complete)) {
          opts.complete = null;
        }
        /*********************************
         Option: Display & Visibility
         *********************************/

        /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */

        /* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */


        if (opts.display !== undefined && opts.display !== null) {
          opts.display = opts.display.toString().toLowerCase();
          /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */

          if (opts.display === "auto") {
            opts.display = Velocity.CSS.Values.getDisplayType(element);
          }
        }

        if (opts.visibility !== undefined && opts.visibility !== null) {
          opts.visibility = opts.visibility.toString().toLowerCase();
        }
        /**********************
         Option: mobileHA
         **********************/

        /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
         on animating elements. HA is removed from the element at the completion of its animation. */

        /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */

        /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */


        opts.mobileHA = opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread;
        /***********************
         Part II: Queueing
         ***********************/

        /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
         In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */

        /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
         the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */

        function buildQueue(next) {
          var data, lastTweensContainer;
          /*******************
           Option: Begin
           *******************/

          /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */

          if (opts.begin && elementsIndex === 0) {
            /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
            try {
              opts.begin.call(elements, elements);
            } catch (error) {
              setTimeout(function () {
                throw error;
              }, 1);
            }
          }
          /*****************************************
           Tween Data Construction (for Scroll)
           *****************************************/

          /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */


          if (action === "scroll") {
            /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
            var scrollDirection = /^x$/i.test(opts.axis) ? "Left" : "Top",
                scrollOffset = parseFloat(opts.offset) || 0,
                scrollPositionCurrent,
                scrollPositionCurrentAlternate,
                scrollPositionEnd;
            /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
             as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */

            if (opts.container) {
              /* Ensure that either a jQuery object or a raw DOM element was passed in. */
              if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
                /* Extract the raw DOM element from the jQuery wrapper. */
                opts.container = opts.container[0] || opts.container;
                /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                 (due to the user's natural interaction with the page). */

                scrollPositionCurrent = opts.container["scroll" + scrollDirection];
                /* GET */

                /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                 -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                 the scroll container's current scroll position. */

                scrollPositionEnd = scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()] + scrollOffset;
                /* GET */

                /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
              } else {
                opts.container = null;
              }
            } else {
              /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
               the appropriate cached property names (which differ based on browser type). */
              scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]];
              /* GET */

              /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */

              scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]];
              /* GET */

              /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
               and therefore end values do not need to be compounded onto current values. */

              scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset;
              /* GET */
            }
            /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */


            tweensContainer = {
              scroll: {
                rootPropertyValue: false,
                startValue: scrollPositionCurrent,
                currentValue: scrollPositionCurrent,
                endValue: scrollPositionEnd,
                unitType: "",
                easing: opts.easing,
                scrollData: {
                  container: opts.container,
                  direction: scrollDirection,
                  alternateValue: scrollPositionCurrentAlternate
                }
              },
              element: element
            };

            if (Velocity.debug) {
              console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
            }
            /******************************************
             Tween Data Construction (for Reverse)
             ******************************************/

            /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
             that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
             the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */

            /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */

            /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
             there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
             as reverting to the element's values as they were prior to the previous *Velocity* call. */

          } else if (action === "reverse") {
            data = Data(element);
            /* Abort if there is no prior animation data to reverse to. */

            if (!data) {
              return;
            }

            if (!data.tweensContainer) {
              /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
              $.dequeue(element, opts.queue);
              return;
            } else {
              /*********************
               Options Parsing
               *********************/

              /* If the element was hidden via the display option in the previous call,
               revert display to "auto" prior to reversal so that the element is visible again. */
              if (data.opts.display === "none") {
                data.opts.display = "auto";
              }

              if (data.opts.visibility === "hidden") {
                data.opts.visibility = "visible";
              }
              /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
               Further, remove the previous call's callback options; typically, users do not want these to be refired. */


              data.opts.loop = false;
              data.opts.begin = null;
              data.opts.complete = null;
              /* Since we're extending an opts object that has already been extended with the defaults options object,
               we remove non-explicitly-defined properties that are auto-assigned values. */

              if (!options.easing) {
                delete opts.easing;
              }

              if (!options.duration) {
                delete opts.duration;
              }
              /* The opts object used for reversal is an extension of the options object optionally passed into this
               reverse call plus the options used in the previous Velocity call. */


              opts = $.extend({}, data.opts, opts);
              /*************************************
               Tweens Container Reconstruction
               *************************************/

              /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */

              lastTweensContainer = $.extend(true, {}, data ? data.tweensContainer : null);
              /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */

              for (var lastTween in lastTweensContainer) {
                /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                if (lastTweensContainer.hasOwnProperty(lastTween) && lastTween !== "element") {
                  var lastStartValue = lastTweensContainer[lastTween].startValue;
                  lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                  lastTweensContainer[lastTween].endValue = lastStartValue;
                  /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */

                  if (!Type.isEmptyObject(options)) {
                    lastTweensContainer[lastTween].easing = opts.easing;
                  }

                  if (Velocity.debug) {
                    console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                  }
                }
              }

              tweensContainer = lastTweensContainer;
            }
            /*****************************************
             Tween Data Construction (for Start)
             *****************************************/

          } else if (action === "start") {
            /*************************
             Value Transferring
             *************************/

            /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
             while the element was in the process of being animated by Velocity, then this current call is safe to use
             the end values from the prior call as its start values. Velocity attempts to perform this value transfer
             process whenever possible in order to avoid requerying the DOM. */

            /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
             then the DOM is queried for the element's current values as a last resort. */

            /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
            data = Data(element);
            /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
             to transfer over end values to use as start values. If it's set to true and there is a previous
             Velocity call to pull values from, do so. */

            if (data && data.tweensContainer && data.isAnimating === true) {
              lastTweensContainer = data.tweensContainer;
            }
            /***************************
             Tween Data Calculation
             ***************************/

            /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */

            /* Property map values can either take the form of 1) a single value representing the end value,
             or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
             The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
             the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */


            var parsePropertyValue = function (valueData, skipResolvingEasing) {
              var endValue, easing, startValue;
              /* If we have a function as the main argument then resolve it first, in case it returns an array that needs to be split */

              if (Type.isFunction(valueData)) {
                valueData = valueData.call(element, elementArrayIndex, elementsLength);
              }
              /* Handle the array format, which can be structured as one of three potential overloads:
               A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */


              if (Type.isArray(valueData)) {
                /* endValue is always the first item in the array. Don't bother validating endValue's value now
                 since the ensuing property cycling logic does that. */
                endValue = valueData[0];
                /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                 start value since easings can only be non-hex strings or arrays. */

                if (!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1]) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                  startValue = valueData[1];
                  /* Two or three-item array: If the second item is a non-hex string easing name or an array, treat it as an easing. */
                } else if (Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1]) && Velocity.Easings[valueData[1]] || Type.isArray(valueData[1])) {
                  easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);
                  /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */

                  startValue = valueData[2];
                } else {
                  startValue = valueData[1] || valueData[2];
                }
                /* Handle the single-value format. */

              } else {
                endValue = valueData;
              }
              /* Default to the call's easing if a per-property easing type was not defined. */


              if (!skipResolvingEasing) {
                easing = easing || opts.easing;
              }
              /* If functions were passed in as values, pass the function the current element as its context,
               plus the element's index and the element set's size as arguments. Then, assign the returned value. */


              if (Type.isFunction(endValue)) {
                endValue = endValue.call(element, elementArrayIndex, elementsLength);
              }

              if (Type.isFunction(startValue)) {
                startValue = startValue.call(element, elementArrayIndex, elementsLength);
              }
              /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */


              return [endValue || 0, easing, startValue];
            };

            var fixPropertyValue = function (property, valueData) {
              /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
              var rootProperty = CSS.Hooks.getRoot(property),
                  rootPropertyValue = false,

              /* Parse out endValue, easing, and startValue from the property's data. */
              endValue = valueData[0],
                  easing = valueData[1],
                  startValue = valueData[2],
                  pattern;
              /**************************
               Start Value Sourcing
               **************************/

              /* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
               inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
               Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */

              /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
               there is no way to check for their explicit browser support, and so we skip skip this check for them. */

              if ((!data || !data.isSVG) && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                if (Velocity.debug) {
                  console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
                }

                return;
              }
              /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
               animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
               a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */


              if ((opts.display !== undefined && opts.display !== null && opts.display !== "none" || opts.visibility !== undefined && opts.visibility !== "hidden") && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                startValue = 0;
              }
              /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
               for all of the current call's properties that were *also* animated in the previous call. */

              /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */


              if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                if (startValue === undefined) {
                  startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                }
                /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                 instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                 attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */


                rootPropertyValue = data.rootPropertyValueCache[rootProperty];
                /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
              } else {
                /* Handle hooked properties. */
                if (CSS.Hooks.registered[property]) {
                  if (startValue === undefined) {
                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty);
                    /* GET */

                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                     getPropertyValue() will extract the hook from rootPropertyValue. */

                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                    /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                     just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                     root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                     to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                  } else {
                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                  }
                  /* Handle non-hooked properties that haven't already been defined via forcefeeding. */

                } else if (startValue === undefined) {
                  startValue = CSS.getPropertyValue(element, property);
                  /* GET */
                }
              }
              /**************************
               Value Data Extraction
               **************************/


              var separatedValue,
                  endValueUnitType,
                  startValueUnitType,
                  operator = false;
              /* Separates a property value into its numeric value and its unit type. */

              var separateValue = function (property, value) {
                var unitType, numericValue;
                numericValue = (value || "0").toString().toLowerCase()
                /* Match the unit type at the end of the value. */
                .replace(/[%A-z]+$/, function (match) {
                  /* Grab the unit type. */
                  unitType = match;
                  /* Strip the unit type off of value. */

                  return "";
                });
                /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */

                if (!unitType) {
                  unitType = CSS.Values.getUnitType(property);
                }

                return [numericValue, unitType];
              };

              if (startValue !== endValue && Type.isString(startValue) && Type.isString(endValue)) {
                pattern = "";
                var iStart = 0,
                    // index in startValue
                iEnd = 0,
                    // index in endValue
                aStart = [],
                    // array of startValue numbers
                aEnd = [],
                    // array of endValue numbers
                inCalc = 0,
                    // Keep track of being inside a "calc()" so we don't duplicate it
                inRGB = 0,
                    // Keep track of being inside an RGB as we can't use fractional values
                inRGBA = 0; // Keep track of being inside an RGBA as we must pass fractional for the alpha channel

                startValue = CSS.Hooks.fixColors(startValue);
                endValue = CSS.Hooks.fixColors(endValue);

                while (iStart < startValue.length && iEnd < endValue.length) {
                  var cStart = startValue[iStart],
                      cEnd = endValue[iEnd];

                  if (/[\d\.-]/.test(cStart) && /[\d\.-]/.test(cEnd)) {
                    var tStart = cStart,
                        // temporary character buffer
                    tEnd = cEnd,
                        // temporary character buffer
                    dotStart = ".",
                        // Make sure we can only ever match a single dot in a decimal
                    dotEnd = "."; // Make sure we can only ever match a single dot in a decimal

                    while (++iStart < startValue.length) {
                      cStart = startValue[iStart];

                      if (cStart === dotStart) {
                        dotStart = ".."; // Can never match two characters
                      } else if (!/\d/.test(cStart)) {
                        break;
                      }

                      tStart += cStart;
                    }

                    while (++iEnd < endValue.length) {
                      cEnd = endValue[iEnd];

                      if (cEnd === dotEnd) {
                        dotEnd = ".."; // Can never match two characters
                      } else if (!/\d/.test(cEnd)) {
                        break;
                      }

                      tEnd += cEnd;
                    }

                    var uStart = CSS.Hooks.getUnit(startValue, iStart),
                        // temporary unit type
                    uEnd = CSS.Hooks.getUnit(endValue, iEnd); // temporary unit type

                    iStart += uStart.length;
                    iEnd += uEnd.length;

                    if (uStart === uEnd) {
                      // Same units
                      if (tStart === tEnd) {
                        // Same numbers, so just copy over
                        pattern += tStart + uStart;
                      } else {
                        // Different numbers, so store them
                        pattern += "{" + aStart.length + (inRGB ? "!" : "") + "}" + uStart;
                        aStart.push(parseFloat(tStart));
                        aEnd.push(parseFloat(tEnd));
                      }
                    } else {
                      // Different units, so put into a "calc(from + to)" and animate each side to/from zero
                      var nStart = parseFloat(tStart),
                          nEnd = parseFloat(tEnd);
                      pattern += (inCalc < 5 ? "calc" : "") + "(" + (nStart ? "{" + aStart.length + (inRGB ? "!" : "") + "}" : "0") + uStart + " + " + (nEnd ? "{" + (aStart.length + (nStart ? 1 : 0)) + (inRGB ? "!" : "") + "}" : "0") + uEnd + ")";

                      if (nStart) {
                        aStart.push(nStart);
                        aEnd.push(0);
                      }

                      if (nEnd) {
                        aStart.push(0);
                        aEnd.push(nEnd);
                      }
                    }
                  } else if (cStart === cEnd) {
                    pattern += cStart;
                    iStart++;
                    iEnd++; // Keep track of being inside a calc()

                    if (inCalc === 0 && cStart === "c" || inCalc === 1 && cStart === "a" || inCalc === 2 && cStart === "l" || inCalc === 3 && cStart === "c" || inCalc >= 4 && cStart === "(") {
                      inCalc++;
                    } else if (inCalc && inCalc < 5 || inCalc >= 4 && cStart === ")" && --inCalc < 5) {
                      inCalc = 0;
                    } // Keep track of being inside an rgb() / rgba()


                    if (inRGB === 0 && cStart === "r" || inRGB === 1 && cStart === "g" || inRGB === 2 && cStart === "b" || inRGB === 3 && cStart === "a" || inRGB >= 3 && cStart === "(") {
                      if (inRGB === 3 && cStart === "a") {
                        inRGBA = 1;
                      }

                      inRGB++;
                    } else if (inRGBA && cStart === ",") {
                      if (++inRGBA > 3) {
                        inRGB = inRGBA = 0;
                      }
                    } else if (inRGBA && inRGB < (inRGBA ? 5 : 4) || inRGB >= (inRGBA ? 4 : 3) && cStart === ")" && --inRGB < (inRGBA ? 5 : 4)) {
                      inRGB = inRGBA = 0;
                    }
                  } else {
                    inCalc = 0; // TODO: changing units, fixing colours

                    break;
                  }
                }

                if (iStart !== startValue.length || iEnd !== endValue.length) {
                  if (Velocity.debug) {
                    console.error("Trying to pattern match mis-matched strings [\"" + endValue + "\", \"" + startValue + "\"]");
                  }

                  pattern = undefined;
                }

                if (pattern) {
                  if (aStart.length) {
                    if (Velocity.debug) {
                      console.log("Pattern found \"" + pattern + "\" -> ", aStart, aEnd, "[" + startValue + "," + endValue + "]");
                    }

                    startValue = aStart;
                    endValue = aEnd;
                    endValueUnitType = startValueUnitType = "";
                  } else {
                    pattern = undefined;
                  }
                }
              }

              if (!pattern) {
                /* Separate startValue. */
                separatedValue = separateValue(property, startValue);
                startValue = separatedValue[0];
                startValueUnitType = separatedValue[1];
                /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */

                separatedValue = separateValue(property, endValue);
                endValue = separatedValue[0].replace(/^([+-\/*])=/, function (match, subMatch) {
                  operator = subMatch;
                  /* Strip the operator off of the value. */

                  return "";
                });
                endValueUnitType = separatedValue[1];
                /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */

                startValue = parseFloat(startValue) || 0;
                endValue = parseFloat(endValue) || 0;
                /***************************************
                 Property-Specific Value Conversion
                 ***************************************/

                /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */

                if (endValueUnitType === "%") {
                  /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                   which is identical to the em unit's behavior, so we piggyback off of that. */
                  if (/^(fontSize|lineHeight)$/.test(property)) {
                    /* Convert % into an em decimal value. */
                    endValue = endValue / 100;
                    endValueUnitType = "em";
                    /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                  } else if (/^scale/.test(property)) {
                    endValue = endValue / 100;
                    endValueUnitType = "";
                    /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                  } else if (/(Red|Green|Blue)$/i.test(property)) {
                    endValue = endValue / 100 * 255;
                    endValueUnitType = "";
                  }
                }
              }
              /***************************
               Unit Ratio Calculation
               ***************************/

              /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
               %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
               for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
               from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
               1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
               2) Converting startValue into the same unit of measurement as endValue based on these ratios. */

              /* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
               setting values with the target unit type then comparing the returned pixel value. */

              /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
               of batching the SETs and GETs together upfront outweights the potential overhead
               of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */

              /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */


              var calculateUnitRatios = function () {
                /************************
                 Same Ratio Checks
                 ************************/

                /* The properties below are used to determine whether the element differs sufficiently from this call's
                 previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
                 of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
                 this is done to minimize DOM querying. */
                var sameRatioIndicators = {
                  myParent: element.parentNode || document.body,

                  /* GET */
                  position: CSS.getPropertyValue(element, "position"),

                  /* GET */
                  fontSize: CSS.getPropertyValue(element, "fontSize")
                  /* GET */

                },

                /* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
                samePercentRatio = sameRatioIndicators.position === callUnitConversionData.lastPosition && sameRatioIndicators.myParent === callUnitConversionData.lastParent,

                /* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
                sameEmRatio = sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize;
                /* Store these ratio indicators call-wide for the next element to compare against. */

                callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                callUnitConversionData.lastPosition = sameRatioIndicators.position;
                callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;
                /***************************
                 Element-Specific Units
                 ***************************/

                /* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                 of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */

                var measurement = 100,
                    unitRatios = {};

                if (!sameEmRatio || !samePercentRatio) {
                  var dummy = data && data.isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");
                  Velocity.init(dummy);
                  sameRatioIndicators.myParent.appendChild(dummy);
                  /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                   Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */

                  /* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */

                  $.each(["overflow", "overflowX", "overflowY"], function (i, property) {
                    Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                  });
                  Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                  Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                  Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");
                  /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */

                  $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (i, property) {
                    Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                  });
                  /* paddingLeft arbitrarily acts as our proxy property for the em ratio. */

                  Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");
                  /* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */

                  unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement;
                  /* GET */

                  unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement;
                  /* GET */

                  unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement;
                  /* GET */

                  sameRatioIndicators.myParent.removeChild(dummy);
                } else {
                  unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                  unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                  unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                }
                /***************************
                 Element-Agnostic Units
                 ***************************/

                /* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
                 once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
                 that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
                 so we calculate it now. */


                if (callUnitConversionData.remToPx === null) {
                  /* Default to browsers' default fontSize of 16px in the case of 0. */
                  callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16;
                  /* GET */
                }
                /* Similarly, viewport units are %-relative to the window's inner dimensions. */


                if (callUnitConversionData.vwToPx === null) {
                  callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100;
                  /* GET */

                  callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100;
                  /* GET */
                }

                unitRatios.remToPx = callUnitConversionData.remToPx;
                unitRatios.vwToPx = callUnitConversionData.vwToPx;
                unitRatios.vhToPx = callUnitConversionData.vhToPx;

                if (Velocity.debug >= 1) {
                  console.log("Unit ratios: " + JSON.stringify(unitRatios), element);
                }

                return unitRatios;
              };
              /********************
               Unit Conversion
               ********************/

              /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */


              if (/[\/*]/.test(operator)) {
                endValueUnitType = startValueUnitType;
                /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                 is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                 on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                 would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */

                /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
              } else if (startValueUnitType !== endValueUnitType && startValue !== 0) {
                /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */

                /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                 match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                 which remains past the point of the animation's completion. */
                if (endValue === 0) {
                  endValueUnitType = startValueUnitType;
                } else {
                  /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                  elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();
                  /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */

                  /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */

                  var axis = /margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x" ? "x" : "y";
                  /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */

                  switch (startValueUnitType) {
                    case "%":
                      /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                       Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                       to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                      startValue *= axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight;
                      break;

                    case "px":
                      /* px acts as our midpoint in the unit conversion process; do nothing. */
                      break;

                    default:
                      startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                  }
                  /* Invert the px ratios to convert into to the target unit. */


                  switch (endValueUnitType) {
                    case "%":
                      startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                      break;

                    case "px":
                      /* startValue is already in px, do nothing; we're done. */
                      break;

                    default:
                      startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                  }
                }
              }
              /*********************
               Relative Values
               *********************/

              /* Operator logic must be performed last since it requires unit-normalized start and end values. */

              /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
               to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
               50 points is added on top of the current % value. */


              switch (operator) {
                case "+":
                  endValue = startValue + endValue;
                  break;

                case "-":
                  endValue = startValue - endValue;
                  break;

                case "*":
                  endValue = startValue * endValue;
                  break;

                case "/":
                  endValue = startValue / endValue;
                  break;
              }
              /**************************
               tweensContainer Push
               **************************/

              /* Construct the per-property tween object, and push it to the element's tweensContainer. */


              tweensContainer[property] = {
                rootPropertyValue: rootPropertyValue,
                startValue: startValue,
                currentValue: startValue,
                endValue: endValue,
                unitType: endValueUnitType,
                easing: easing
              };

              if (pattern) {
                tweensContainer[property].pattern = pattern;
              }

              if (Velocity.debug) {
                console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
              }
            };
            /* Create a tween out of each property, and append its associated data to tweensContainer. */


            for (var property in propertiesMap) {
              if (!propertiesMap.hasOwnProperty(property)) {
                continue;
              }
              /* The original property name's format must be used for the parsePropertyValue() lookup,
               but we then use its camelCase styling to normalize it for manipulation. */


              var propertyName = CSS.Names.camelCase(property),
                  valueData = parsePropertyValue(propertiesMap[property]);
              /* Find shorthand color properties that have been passed a hex string. */

              /* Would be quicker to use CSS.Lists.colors.includes() if possible */

              if (_inArray(CSS.Lists.colors, propertyName)) {
                /* Parse the value data for each shorthand. */
                var endValue = valueData[0],
                    easing = valueData[1],
                    startValue = valueData[2];

                if (CSS.RegEx.isHex.test(endValue)) {
                  /* Convert the hex strings into their RGB component arrays. */
                  var colorComponents = ["Red", "Green", "Blue"],
                      endValueRGB = CSS.Values.hexToRgb(endValue),
                      startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;
                  /* Inject the RGB component tweens into propertiesMap. */

                  for (var i = 0; i < colorComponents.length; i++) {
                    var dataArray = [endValueRGB[i]];

                    if (easing) {
                      dataArray.push(easing);
                    }

                    if (startValueRGB !== undefined) {
                      dataArray.push(startValueRGB[i]);
                    }

                    fixPropertyValue(propertyName + colorComponents[i], dataArray);
                  }
                  /* If we have replaced a shortcut color value then don't update the standard property name */


                  continue;
                }
              }

              fixPropertyValue(propertyName, valueData);
            }
            /* Along with its property data, store a reference to the element itself onto tweensContainer. */


            tweensContainer.element = element;
          }
          /*****************
           Call Push
           *****************/

          /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
           being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */


          if (tweensContainer.element) {
            /* Apply the "velocity-animating" indicator class. */
            CSS.Values.addClass(element, "velocity-animating");
            /* The call array houses the tweensContainers for each element being animated in the current call. */

            call.push(tweensContainer);
            data = Data(element);

            if (data) {
              /* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
              if (opts.queue === "") {
                data.tweensContainer = tweensContainer;
                data.opts = opts;
              }
              /* Switch on the element's animating flag. */


              data.isAnimating = true;
            }
            /* Once the final element in this call's element set has been processed, push the call array onto
             Velocity.State.calls for the animation tick to immediately begin processing. */


            if (elementsIndex === elementsLength - 1) {
              /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
               Anything on this call container is subjected to tick() processing. */
              Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver, null, 0]);
              /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */

              if (Velocity.State.isTicking === false) {
                Velocity.State.isTicking = true;
                /* Start the tick loop. */

                tick();
              }
            } else {
              elementsIndex++;
            }
          }
        }
        /* When the queue option is set to false, the call skips the element's queue and fires immediately. */


        if (opts.queue === false) {
          /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
           we manually inject the delay property here with an explicit setTimeout. */
          if (opts.delay) {
            /* Temporarily store delayed elements to facilitate access for global pause/resume */
            var callIndex = Velocity.State.delayedElements.count++;
            Velocity.State.delayedElements[callIndex] = element;

            var delayComplete = function (index) {
              return function () {
                /* Clear the temporary element */
                Velocity.State.delayedElements[index] = false;
                /* Finally, issue the call */

                buildQueue();
              };
            }(callIndex);

            Data(element).delayBegin = new Date().getTime();
            Data(element).delay = parseFloat(opts.delay);
            Data(element).delayTimer = {
              setTimeout: setTimeout(buildQueue, parseFloat(opts.delay)),
              next: delayComplete
            };
          } else {
            buildQueue();
          }
          /* Otherwise, the call undergoes element queueing as normal. */

          /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */

        } else {
          $.queue(element, opts.queue, function (next, clearQueue) {
            /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
             so it's fine if this is repeatedly triggered for each element in the associated call.) */
            if (clearQueue === true) {
              if (promiseData.promise) {
                promiseData.resolver(elements);
              }
              /* Do not continue with animation queueing. */


              return true;
            }
            /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
             See completeCall() for further details. */


            Velocity.velocityQueueEntryFlag = true;
            buildQueue(next);
          });
        }
        /*********************
         Auto-Dequeuing
         *********************/

        /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
         must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
         for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
         queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
         first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */

        /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
         each one of the elements in the set has reached the end of its individually pre-existing queue chain. */

        /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
         Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */


        if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
          $.dequeue(element);
        }
      }
      /**************************
       Element Set Iteration
       **************************/

      /* If the "nodeType" property exists on the elements variable, we're animating a single element.
       Place it in an array so that $.each() can iterate over it. */


      $.each(elements, function (i, element) {
        /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
        if (Type.isNode(element)) {
          processElement(element, i);
        }
      });
      /******************
       Option: Loop
       ******************/

      /* The loop option accepts an integer indicating how many times the element should loop between the values in the
       current call's properties map and the element's property values prior to this call. */

      /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
       to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
       which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */

      opts = $.extend({}, Velocity.defaults, options);
      opts.loop = parseInt(opts.loop, 10);
      var reverseCallsCount = opts.loop * 2 - 1;

      if (opts.loop) {
        /* Double the loop count to convert it into its appropriate number of "reverse" calls.
         Subtract 1 from the resulting value since the current call is included in the total alternation count. */
        for (var x = 0; x < reverseCallsCount; x++) {
          /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
           isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
           call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
          var reverseOptions = {
            delay: opts.delay,
            progress: opts.progress
          };
          /* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
           so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */

          if (x === reverseCallsCount - 1) {
            reverseOptions.display = opts.display;
            reverseOptions.visibility = opts.visibility;
            reverseOptions.complete = opts.complete;
          }

          animate(elements, "reverse", reverseOptions);
        }
      }
      /***************
       Chaining
       ***************/

      /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */


      return getChain();
    };
    /* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */


    Velocity = $.extend(animate, Velocity);
    /* For legacy support, also expose the literal animate method. */

    Velocity.animate = animate;
    /**************
     Timing
     **************/

    /* Ticker function. */

    var ticker = window.requestAnimationFrame || rAFShim;
    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
     To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
     devices to avoid wasting battery power on inactive tabs. */

    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */

    if (!Velocity.State.isMobile && document.hidden !== undefined) {
      var updateTicker = function () {
        /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
        if (document.hidden) {
          ticker = function (callback) {
            /* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
            return setTimeout(function () {
              callback(true);
            }, 16);
          };
          /* The rAF loop has been paused by the browser, so we manually restart the tick. */


          tick();
        } else {
          ticker = window.requestAnimationFrame || rAFShim;
        }
      };
      /* Page could be sitting in the background at this time (i.e. opened as new tab) so making sure we use correct ticker from the start */


      updateTicker();
      /* And then run check again every time visibility changes */

      document.addEventListener("visibilitychange", updateTicker);
    }
    /************
     Tick
     ************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */


    function tick(timestamp) {
      /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
       We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
       the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
       calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
       the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
       by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
      if (timestamp) {
        /* We normally use RAF's high resolution timestamp but as it can be significantly offset when the browser is
         under high stress we give the option for choppiness over allowing the browser to drop huge chunks of frames.
         We use performance.now() and shim it if it doesn't exist for when the tab is hidden. */
        var timeCurrent = Velocity.timestamp && timestamp !== true ? timestamp : performance.now();
        /********************
         Call Iteration
         ********************/

        var callsLength = Velocity.State.calls.length;
        /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
         when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
         has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */

        if (callsLength > 10000) {
          Velocity.State.calls = compactSparseArray(Velocity.State.calls);
          callsLength = Velocity.State.calls.length;
        }
        /* Iterate through each active call. */


        for (var i = 0; i < callsLength; i++) {
          /* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
          if (!Velocity.State.calls[i]) {
            continue;
          }
          /************************
           Call-Wide Variables
           ************************/


          var callContainer = Velocity.State.calls[i],
              call = callContainer[0],
              opts = callContainer[2],
              timeStart = callContainer[3],
              firstTick = !timeStart,
              tweenDummyValue = null,
              pauseObject = callContainer[5],
              millisecondsEllapsed = callContainer[6];
          /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
           We assign timeStart now so that its value is as close to the real animation start time as possible.
           (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
           between that time and now would cause the first few frames of the tween to be skipped since
           percentComplete is calculated relative to timeStart.) */

          /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
           first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
           same style value as the element's current value. */

          if (!timeStart) {
            timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
          }
          /* If a pause object is present, skip processing unless it has been set to resume */


          if (pauseObject) {
            if (pauseObject.resume === true) {
              /* Update the time start to accomodate the paused completion amount */
              timeStart = callContainer[3] = Math.round(timeCurrent - millisecondsEllapsed - 16);
              /* Remove pause object after processing */

              callContainer[5] = null;
            } else {
              continue;
            }
          }

          millisecondsEllapsed = callContainer[6] = timeCurrent - timeStart;
          /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
           (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
           Accordingly, we ensure that percentComplete does not exceed 1. */

          var percentComplete = Math.min(millisecondsEllapsed / opts.duration, 1);
          /**********************
           Element Iteration
           **********************/

          /* For every call, iterate through each of the elements in its set. */

          for (var j = 0, callLength = call.length; j < callLength; j++) {
            var tweensContainer = call[j],
                element = tweensContainer.element;
            /* Check to see if this element has been deleted midway through the animation by checking for the
             continued existence of its data cache. If it's gone, or the element is currently paused, skip animating this element. */

            if (!Data(element)) {
              continue;
            }

            var transformPropertyExists = false;
            /**********************************
             Display & Visibility Toggling
             **********************************/

            /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
             (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */

            if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
              if (opts.display === "flex") {
                var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                $.each(flexValues, function (i, flexValue) {
                  CSS.setPropertyValue(element, "display", flexValue);
                });
              }

              CSS.setPropertyValue(element, "display", opts.display);
            }
            /* Same goes with the visibility option, but its "none" equivalent is "hidden". */


            if (opts.visibility !== undefined && opts.visibility !== "hidden") {
              CSS.setPropertyValue(element, "visibility", opts.visibility);
            }
            /************************
             Property Iteration
             ************************/

            /* For every element, iterate through each property. */


            for (var property in tweensContainer) {
              /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
              if (tweensContainer.hasOwnProperty(property) && property !== "element") {
                var tween = tweensContainer[property],
                    currentValue,

                /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                 on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;
                /******************************
                 Current Value Calculation
                 ******************************/

                if (Type.isString(tween.pattern)) {
                  var patternReplace = percentComplete === 1 ? function ($0, index, round) {
                    var result = tween.endValue[index];
                    return round ? Math.round(result) : result;
                  } : function ($0, index, round) {
                    var startValue = tween.startValue[index],
                        tweenDelta = tween.endValue[index] - startValue,
                        result = startValue + tweenDelta * easing(percentComplete, opts, tweenDelta);
                    return round ? Math.round(result) : result;
                  };
                  currentValue = tween.pattern.replace(/{(\d+)(!)?}/g, patternReplace);
                } else if (percentComplete === 1) {
                  /* If this is the last tick pass (if we've reached 100% completion for this tween),
                   ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                  currentValue = tween.endValue;
                } else {
                  /* Otherwise, calculate currentValue based on the current delta from startValue. */
                  var tweenDelta = tween.endValue - tween.startValue;
                  currentValue = tween.startValue + tweenDelta * easing(percentComplete, opts, tweenDelta);
                  /* If no value change is occurring, don't proceed with DOM updating. */
                }

                if (!firstTick && currentValue === tween.currentValue) {
                  continue;
                }

                tween.currentValue = currentValue;
                /* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
                 it can be passed into the progress callback. */

                if (property === "tween") {
                  tweenDummyValue = currentValue;
                } else {
                  /******************
                   Hooks: Part I
                   ******************/
                  var hookRoot;
                  /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                   for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                   rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                   updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                   subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */

                  if (CSS.Hooks.registered[property]) {
                    hookRoot = CSS.Hooks.getRoot(property);
                    var rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                    if (rootPropertyValueCache) {
                      tween.rootPropertyValue = rootPropertyValueCache;
                    }
                  }
                  /*****************
                   DOM Update
                   *****************/

                  /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */

                  /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */


                  var adjustedSetData = CSS.setPropertyValue(element,
                  /* SET */
                  property, tween.currentValue + (IE < 9 && parseFloat(currentValue) === 0 ? "" : tween.unitType), tween.rootPropertyValue, tween.scrollData);
                  /*******************
                   Hooks: Part II
                   *******************/

                  /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */

                  if (CSS.Hooks.registered[property]) {
                    /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                    if (CSS.Normalizations.registered[hookRoot]) {
                      Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                    } else {
                      Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                    }
                  }
                  /***************
                   Transforms
                   ***************/

                  /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */


                  if (adjustedSetData[0] === "transform") {
                    transformPropertyExists = true;
                  }
                }
              }
            }
            /****************
             mobileHA
             ****************/

            /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
             It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */


            if (opts.mobileHA) {
              /* Don't set the null transform hack if we've already done so. */
              if (Data(element).transformCache.translate3d === undefined) {
                /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                Data(element).transformCache.translate3d = "(0px, 0px, 0px)";
                transformPropertyExists = true;
              }
            }

            if (transformPropertyExists) {
              CSS.flushTransformCache(element);
            }
          }
          /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
           Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */


          if (opts.display !== undefined && opts.display !== "none") {
            Velocity.State.calls[i][2].display = false;
          }

          if (opts.visibility !== undefined && opts.visibility !== "hidden") {
            Velocity.State.calls[i][2].visibility = false;
          }
          /* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */


          if (opts.progress) {
            opts.progress.call(callContainer[1], callContainer[1], percentComplete, Math.max(0, timeStart + opts.duration - timeCurrent), timeStart, tweenDummyValue);
          }
          /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */


          if (percentComplete === 1) {
            completeCall(i);
          }
        }
      }
      /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */


      if (Velocity.State.isTicking) {
        ticker(tick);
      }
    }
    /**********************
     Call Completion
     **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */


    function completeCall(callIndex, isStopped) {
      /* Ensure the call exists. */
      if (!Velocity.State.calls[callIndex]) {
        return false;
      }
      /* Pull the metadata from the call. */


      var call = Velocity.State.calls[callIndex][0],
          elements = Velocity.State.calls[callIndex][1],
          opts = Velocity.State.calls[callIndex][2],
          resolver = Velocity.State.calls[callIndex][4];
      var remainingCallsExist = false;
      /*************************
       Element Finalization
       *************************/

      for (var i = 0, callLength = call.length; i < callLength; i++) {
        var element = call[i].element;
        /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */

        /* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */

        /* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */

        if (!isStopped && !opts.loop) {
          if (opts.display === "none") {
            CSS.setPropertyValue(element, "display", opts.display);
          }

          if (opts.visibility === "hidden") {
            CSS.setPropertyValue(element, "visibility", opts.visibility);
          }
        }
        /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
         a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
         an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
         we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
         is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */


        var data = Data(element);

        if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
          /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
          if (data) {
            data.isAnimating = false;
            /* Clear the element's rootPropertyValueCache, which will become stale. */

            data.rootPropertyValueCache = {};
            var transformHAPropertyExists = false;
            /* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */

            $.each(CSS.Lists.transforms3D, function (i, transformName) {
              var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                  currentValue = data.transformCache[transformName];

              if (data.transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                transformHAPropertyExists = true;
                delete data.transformCache[transformName];
              }
            });
            /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */

            if (opts.mobileHA) {
              transformHAPropertyExists = true;
              delete data.transformCache.translate3d;
            }
            /* Flush the subproperty removals to the DOM. */


            if (transformHAPropertyExists) {
              CSS.flushTransformCache(element);
            }
            /* Remove the "velocity-animating" indicator class. */


            CSS.Values.removeClass(element, "velocity-animating");
          }
        }
        /*********************
         Option: Complete
         *********************/

        /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */

        /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */


        if (!isStopped && opts.complete && !opts.loop && i === callLength - 1) {
          /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
          try {
            opts.complete.call(elements, elements);
          } catch (error) {
            setTimeout(function () {
              throw error;
            }, 1);
          }
        }
        /**********************
         Promise Resolving
         **********************/

        /* Note: Infinite loops don't return promises. */


        if (resolver && opts.loop !== true) {
          resolver(elements);
        }
        /****************************
         Option: Loop (Infinite)
         ****************************/


        if (data && opts.loop === true && !isStopped) {
          /* If a rotateX/Y/Z property is being animated by 360 deg with loop:true, swap tween start/end values to enable
           continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
          $.each(data.tweensContainer, function (propertyName, tweenContainer) {
            if (/^rotate/.test(propertyName) && (parseFloat(tweenContainer.startValue) - parseFloat(tweenContainer.endValue)) % 360 === 0) {
              var oldStartValue = tweenContainer.startValue;
              tweenContainer.startValue = tweenContainer.endValue;
              tweenContainer.endValue = oldStartValue;
            }

            if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
              tweenContainer.endValue = 0;
              tweenContainer.startValue = 100;
            }
          });
          Velocity(element, "reverse", {
            loop: true,
            delay: opts.delay
          });
        }
        /***************
         Dequeueing
         ***************/

        /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
         which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
         $.dequeue() must still be called in order to completely clear jQuery's animation queue. */


        if (opts.queue !== false) {
          $.dequeue(element, opts.queue);
        }
      }
      /************************
       Calls Array Cleanup
       ************************/

      /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
       (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */


      Velocity.State.calls[callIndex] = false;
      /* Iterate through the calls array to determine if this was the final in-progress animation.
       If so, set a flag to end ticking and clear the calls array. */

      for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
        if (Velocity.State.calls[j] !== false) {
          remainingCallsExist = true;
          break;
        }
      }

      if (remainingCallsExist === false) {
        /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
        Velocity.State.isTicking = false;
        /* Clear the calls array so that its length is reset. */

        delete Velocity.State.calls;
        Velocity.State.calls = [];
      }
    }
    /******************
     Frameworks
     ******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
     If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
     also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
     accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
     (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */


    global.Velocity = Velocity;

    if (global !== window) {
      /* Assign the element function to Velocity's core animate() method. */
      global.fn.velocity = animate;
      /* Assign the object function's defaults to Velocity's global defaults object. */

      global.fn.velocity.defaults = Velocity.defaults;
    }
    /***********************
     Packaged Redirects
     ***********************/

    /* slideUp, slideDown */


    $.each(["Down", "Up"], function (i, direction) {
      Velocity.Redirects["slide" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
            begin = opts.begin,
            complete = opts.complete,
            inlineValues = {},
            computedValues = {
          height: "",
          marginTop: "",
          marginBottom: "",
          paddingTop: "",
          paddingBottom: ""
        };

        if (opts.display === undefined) {
          /* Show the element before slideDown begins and hide the element after slideUp completes. */

          /* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
          opts.display = direction === "Down" ? Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block" : "none";
        }

        opts.begin = function () {
          /* If the user passed in a begin callback, fire it now. */
          if (elementsIndex === 0 && begin) {
            begin.call(elements, elements);
          }
          /* Cache the elements' original vertical dimensional property values so that we can animate back to them. */


          for (var property in computedValues) {
            if (!computedValues.hasOwnProperty(property)) {
              continue;
            }

            inlineValues[property] = element.style[property];
            /* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
             use forcefeeding to start from computed values and animate down to 0. */

            var propertyValue = CSS.getPropertyValue(element, property);
            computedValues[property] = direction === "Down" ? [propertyValue, 0] : [0, propertyValue];
          }
          /* Force vertical overflow content to clip so that sliding works as expected. */


          inlineValues.overflow = element.style.overflow;
          element.style.overflow = "hidden";
        };

        opts.complete = function () {
          /* Reset element to its pre-slide inline values once its slide animation is complete. */
          for (var property in inlineValues) {
            if (inlineValues.hasOwnProperty(property)) {
              element.style[property] = inlineValues[property];
            }
          }
          /* If the user passed in a complete callback, fire it now. */


          if (elementsIndex === elementsSize - 1) {
            if (complete) {
              complete.call(elements, elements);
            }

            if (promiseData) {
              promiseData.resolver(elements);
            }
          }
        };

        Velocity(element, computedValues, opts);
      };
    });
    /* fadeIn, fadeOut */

    $.each(["In", "Out"], function (i, direction) {
      Velocity.Redirects["fade" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
            complete = opts.complete,
            propertiesMap = {
          opacity: direction === "In" ? 1 : 0
        };
        /* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
         callbacks by firing them only when the final element has been reached. */

        if (elementsIndex !== 0) {
          opts.begin = null;
        }

        if (elementsIndex !== elementsSize - 1) {
          opts.complete = null;
        } else {
          opts.complete = function () {
            if (complete) {
              complete.call(elements, elements);
            }

            if (promiseData) {
              promiseData.resolver(elements);
            }
          };
        }
        /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */

        /* Note: We allow users to pass in "null" to skip display setting altogether. */


        if (opts.display === undefined) {
          opts.display = direction === "In" ? "auto" : "none";
        }

        Velocity(this, propertiesMap, opts);
      };
    });
    return Velocity;
  }(window.jQuery || window.Zepto || window, window, window ? window.document : undefined);
});
/******************
 Known Issues
 ******************/

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
 Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
 will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */

/***/ }),

/***/ 6582:
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[3].use[2]!./node_modules/typeface-roboto/index.css ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/noSourceMaps.js */ 8309);
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ 2856);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css-loader/dist/runtime/getUrl.js */ 6656);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100.woff2 */ 9309), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100.woff */ 1456), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100italic.woff2 */ 8394), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100italic.woff */ 2252), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300.woff2 */ 9527), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300.woff */ 7243), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300italic.woff2 */ 8197), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300italic.woff */ 4126), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400.woff2 */ 4829), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400.woff */ 8255), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400italic.woff2 */ 7125), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400italic.woff */ 5483), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500.woff2 */ 9802), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500.woff */ 4028), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500italic.woff2 */ 404), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500italic.woff */ 7074), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700.woff2 */ 2766), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700.woff */ 6991), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700italic.woff2 */ 4828), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700italic.woff */ 7086), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_20___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900.woff2 */ 9960), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_21___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900.woff */ 8396), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_22___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900italic.woff2 */ 9824), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_23___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900italic.woff */ 224), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_19___);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_20___);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_21___);
var ___CSS_LOADER_URL_REPLACEMENT_22___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_22___);
var ___CSS_LOADER_URL_REPLACEMENT_23___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_23___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* roboto-100normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 100;\n  src:\n    local('Roboto Thin '),\n    local('Roboto-Thin'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-100italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 100;\n  src:\n    local('Roboto Thin italic'),\n    local('Roboto-Thinitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-300normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src:\n    local('Roboto Light '),\n    local('Roboto-Light'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-300italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 300;\n  src:\n    local('Roboto Light italic'),\n    local('Roboto-Lightitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-400normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src:\n    local('Roboto Regular '),\n    local('Roboto-Regular'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-400italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 400;\n  src:\n    local('Roboto Regular italic'),\n    local('Roboto-Regularitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-500normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src:\n    local('Roboto Medium '),\n    local('Roboto-Medium'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-500italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 500;\n  src:\n    local('Roboto Medium italic'),\n    local('Roboto-Mediumitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-700normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src:\n    local('Roboto Bold '),\n    local('Roboto-Bold'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-700italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 700;\n  src:\n    local('Roboto Bold italic'),\n    local('Roboto-Bolditalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_19___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-900normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 900;\n  src:\n    local('Roboto Black '),\n    local('Roboto-Black'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-900italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 900;\n  src:\n    local('Roboto Black italic'),\n    local('Roboto-Blackitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_22___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_23___ + ") format('woff'); /* Modern Browsers */\n}\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8947:
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[3]!./src/scss/main.scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ 8309);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ 2856);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ 6656);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/pen.svg */ 4627), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/pe-icon-social.eot */ 9618), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/pe-icon-social.woff */ 6479), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/pe-icon-social.ttf */ 4025), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/pe-icon-social.svg */ 2663), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body{font-family:\"Roboto\", Arial, sans-serif;-webkit-tap-highlight-color:transparent;letter-spacing:3px;margin:0}img.inject-me{display:none}a{text-decoration:none;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-rendering:optimizeLegibility;-webkit-transition:all 0.3s ease;-moz-transition:all 0.3s ease;transition:all 0.3s ease}.img-responsive{width:100%;height:100%}.handy{right:45px;position:relative;font-size:28px;color:#919193;top:40px;display:none}#page-home{text-align:center;height:100%;color:#e9ece5;background-color:#000000}#page-home .brand-logo{padding:65px 0 80px 0}#page-home .brand-logo #brand-logo{width:210px;border:solid #e3b673 5px}#page-home .brand-logo #brand-logo *{position:relative;fill:#e3b673;transform-origin:center top;transition:all 0.4s ease}#page-home .brand-logo #circle{height:240px}#page-home .h-01{color:#e3b673;margin-bottom:50px}#page-home .copy-02{color:#e3b673;margin-bottom:180px;padding-top:90px;text-shadow:-1px 0 rgba(0,0,0,0.31),0 1px rgba(0,0,0,0.31),1px 0 rgba(0,0,0,0.31),0 -1px rgba(0,0,0,0.31)}#page-uses{text-align:left;min-height:100vh;color:#e9ece5;background-color:#000000;padding:0 20%;height:100%;display:flex;flex-direction:column}#page-uses .title{margin-top:30px;display:flex;flex-direction:row;align-items:center}#page-uses .title h1{color:#e3b673;text-align:left;font-size:30px;margin:0}#page-uses .title span{font-size:12px;padding-left:10px}#page-uses .uses-list{color:#e3b673;margin-bottom:180px;padding-top:90px;text-shadow:-1px 0 rgba(0,0,0,0.31),0 1px rgba(0,0,0,0.31),1px 0 rgba(0,0,0,0.31),0 -1px rgba(0,0,0,0.31)}#page-uses .uses-list h1{font-size:25px;color:#e9ece5}#page-uses .uses-list ul{list-style:none;padding:0}#page-uses .uses-list ul li{text-align:left;margin-bottom:5px;letter-spacing:3px}#page-about .copy-01{text-align:center;margin-bottom:25px;padding:0 20px}#page-about .h-01{padding-top:35px;text-align:center}#page-about .h-03{text-align:center}@media (max-width: 760px){#page-about .h-03{margin-bottom:10px}}@media (min-width: 760px){#page-about .h-03{margin-bottom:18px}}#page-about .columns{align-items:stretch;flex-direction:row;justify-content:flex-start;margin-left:50px;margin-right:50px}@media (max-width: 760px){#page-about .columns{display:block}}@media (min-width: 760px){#page-about .columns{display:flex}}#page-about aside{float:none;width:100%;padding:0 20px;margin:0 0 30px 0;text-align:center;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}@media (min-width: 760px){#page-about aside{flex:1;width:285px;float:left;margin-right:20px}}#page-about aside:last-child{margin:0}.me-img{max-width:100px;height:128px;padding-bottom:30px;margin:auto}#page-work{position:relative;text-align:center;background-color:#454648;min-height:1210px;height:auto}#page-work .grid-box{margin:auto}#page-work .h-01{color:#e3b673;margin-bottom:50px}#page-work .h-02{color:#e9ece5;margin:5px 0 -25px 0}#page-work .copy-03,#page-work .filter-link{color:#e3b673}#page-work .shuffle__sizer{display:none;width:270px;margin-left:15px}#page-work .mobile-filter-select{display:none}#page-work #work-filter{margin-bottom:40px}#page-work .filter-link{color:#e3b673}#page-work .work-item figure{filter:sepia(100%);-webkit-filter:sepia(100%);-moz-filter:sepia(100%);-o-filter:sepia(100%)}#page-work .work-item figure:hover{filter:blur(15px);-webkit-filter:blur(15px);-moz-filter:blur(15px);-ms-filter:blur(15px);-o-filter:blur(15px)}#page-work .work-item figure img{-webkit-transition:all 1s ease;-moz-transition:all 1s ease;transition:all 1s ease;display:block;height:100%;width:100%}#page-work .work-item:hover img{-webkit-transform:scale(1.1) translateX(5px);-moz-transform:scale(1.1) translateX(5px);-ms-transform:scale(1.1) translateX(5px);-o-transform:scale(1.1) translateX(5px);transform:scale(1.1) translateX(5px)}#page-work .button{margin-top:40px}#page-work #work-detail{display:none;background:#89bdd3;text-align:left;position:absolute;top:0;right:0;bottom:0;left:0;height:100%;width:100%}#page-work #work-detail .close-icon{cursor:pointer;display:block;font-family:\"Roboto-bold\", Arial, Helvetica, sans-serif;font-size:40px;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-rendering:optimizeLegibility;height:40px;width:40px;position:absolute;top:0;right:0;color:#e3b673}#page-work #work-detail .inner{padding:70px 0}#page-contactform{text-align:center}#page-contactform .h-01{margin-bottom:43px}#page-contactform .copy-01{margin-bottom:50px;padding:0 60px;color:#e9ece5}#page-contactform .button{margin-top:66px;padding:23px 48px}#page-contactform input,#page-contactform textarea,#page-contactform .heading{color:#919193}#hidden-contactform{width:100%;height:0;z-index:5;display:none;position:absolute;top:135px;left:0;background-color:#fffeff}.hidden-email-title{width:50px;height:50px;-webkit-border-radius:25px;-moz-border-radius:25px;border-radius:25px;background-color:#454648}.hidden-email-message{line-height:25px;font-size:18px;max-width:600px;margin:auto;padding-top:65px}.hidden-email-image{width:125px;padding-top:130px;padding-bottom:40px}#page-footer{background:#454648;text-align:center;padding-bottom:35px}#page-footer h2{color:#888a8b;text-transform:uppercase;font-size:13px}#page-footer .social-links{display:inline-block;margin:90px 0}#page-footer .social-links:after{content:\"\";display:table;clear:both}#page-footer .social-links svg{height:50px;width:50px}#page-footer .social-links svg *{fill:#dbdbdb;-webkit-transition:all 0.4s ease;-moz-transition:all 0.4s ease;transition:all 0.4s ease}#page-footer .social-links #icon-twitter:hover *{fill:#00b0f0}#page-footer .social-links #icon-instagram:hover *{fill:#30648e}#page-footer .copy-02{margin-bottom:12px;font-size:12px}.view{width:270px;height:180px;overflow:hidden;cursor:pointer;background:#e9ece5;margin-top:15px}.view .mask,.view .content{width:270px;height:180px;position:absolute;overflow:hidden;top:0;left:0}.view img{display:block;position:relative}.view h2{text-transform:uppercase;color:#919193;text-align:center;position:relative;font-size:17px;padding:10px 10px 5px 10px;background:rgba(0,0,0,0.8);margin:20px 0 0 0}.view p{min-height:50px;font-size:11px;position:relative;color:#e9ece5;padding:0 5px 5px;text-align:center}.view a.info{display:inline-block;text-decoration:none;padding:7px 14px;background:#000;color:#919193;text-transform:uppercase;-webkit-box-shadow:0 0 1px #000;-moz-box-shadow:0 0 1px #000;box-shadow:0 0 1px #000}.view a.info:hover{-webkit-box-shadow:0 0 5px #000;-moz-box-shadow:0 0 5px #000;box-shadow:0 0 5px #000}.view-second img{transition:all 0.2s ease-in}.view-second .mask{background-color:rgba(145,145,147,0.9);width:300px;padding:60px;height:300px;opacity:0;transform:translate(265px, 145px) rotate(45deg);transition:all 0.2s ease-in-out}.view-second h2{background:transparent;margin:20px 40px 0 40px;transform:translate(200px, -200px);transition:all 0.2s ease-in-out}.view-second p{transform:translate(-200px, 200px);transition:all 0.2s ease-in-out;border-top:1px solid rgba(0,0,0,0.3);padding-top:10px}.view-second a.info{transform:translate(0px, 100px);transition:all 0.2s 0.1s ease-in-out}.view-second:hover .mask{opacity:1;transform:translate(-80px, -125px) rotate(45deg)}.view-second:hover h2{transform:translate(0px, 0px);transition-delay:0.3s}.view-second:hover p{transform:translate(0px, 0px);transition-delay:0.4s}.view-second:hover a.info{transform:translate(0px, 0px);transition-delay:0.5s}.work-button-mobile{transform:translate(0px, 0px);transition-delay:0.5s;opacity:0.7}.overlay{position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(227,182,115,0.9);z-index:99}.overlay-container{margin-top:70px;background-color:#fffeff;padding-left:10%;padding-right:10%;min-height:550px;height:100%}@media (max-width: 760px){.overlay-container{overflow:auto}}.overlay-container .overlay__subtitle{padding-top:35px;padding-bottom:50px}.project-link{display:block;width:auto;margin:auto;padding-top:20px}.overlay-title{width:100%;padding-top:30px;font-size:30px;padding-bottom:50px;opacity:0}.overlay-title-text{font-size:23px;display:block;padding:15px 20px;margin:auto auto 25px auto;position:relative;width:100%;max-width:450px}.overlay-title-text::after{content:\"\";display:block;vertical-align:baseline;opacity:0.8;width:0;height:2px;background:#e3b673;transition:0.7s ease;margin-top:15px}.overlay-description{max-width:55%;width:100%;float:left;opacity:0}@media (max-width: 760px){.overlay-description{max-width:100%;width:100%}}.overlay-imagecontainer{max-width:40%;width:100%;float:right;opacity:0;overflow:auto}@media (max-width: 760px){.overlay-imagecontainer{max-width:100%;width:100%;display:block;float:left}}.overlay-icons{display:block;margin-top:20px;width:100%;height:60px}.icon-skill{font-size:45px}.overlay-close{position:absolute;display:inline-block;width:50px;height:50px;overflow:hidden;right:10px;top:10px;cursor:pointer}.overlay-close:hover::before,.overlay-close:hover::after{background:#919193}.overlay-close::before,.overlay-close::after{content:\"\";position:absolute;height:2px;width:100%;top:50%;left:0;margin-top:-1px;background:#000}.overlay-close::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.overlay-close::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.overlay-door{visibility:hidden;width:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-transition:width 0.5s 0.3s, visibility 0s 0.8s;transition:width 0.5s 0.3s, visibility 0s 0.8s}.overlay-door.open{visibility:visible;width:100%;-webkit-transition:width 0.5s;transition:width 0.5s}.overlay-door.open .overlay-description,.overlay-door.open .overlay-title,.overlay-door.open .overlay-imagecontainer{opacity:1;transition:opacity 1s ease-in-out;-moz-transition:opacity 1s ease-in-out;-webkit-transition:opacity 1s ease-in-out}.overlay-door.open .overlay-title-effect{color:#000;animation:1.5s 0.7s float infinite ease;height:auto;min-height:40px;display:block}.overlay-door.open .overlay-title-effect::after{width:100%;opacity:1;transition-delay:1.5s;-webkit-transition-delay:1.5s}.overlay-door nav{position:absolute;left:50%;-webkit-transform:translateY(-50%) translateX(-50%);transform:translateY(-50%) translateX(-50%);opacity:0;-webkit-transition:opacity 0.3s 0.5s;transition:opacity 0.3s 0.5s}.overlay-door .overlay-close{opacity:0;-webkit-transition:opacity 0.3s 0.5s;transition:opacity 0.3s 0.5s}.overlay-door.open nav,.overlay-door.open .overlay-close{opacity:1;-webkit-transition-delay:0.5s;transition-delay:0.5s}.overlay-door.close nav,.overlay-door.close .overlay-close{-webkit-transition-delay:0s;transition-delay:0s}@media screen and (max-height: 30.5em){.overlay nav{height:70%;font-size:34px}}.move-pen{animation:move-pen 1s ease-in infinite alternate}@keyframes move-pen{from{transform:translateX(-4px) rotate(6deg)}to{transform:translateX(4px) rotate(-3deg)}}[class*=\"iconicfill-\"]:before{display:block;content:\" \";background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");background-size:20px 20px;height:20px;width:20px}.wrap-label{min-height:30px}.iconicfill-pen-alt2{font-size:26px;float:left;visibility:hidden;margin-left:5%}@-webkit-keyframes bounce{from{-webkit-transform:translateY(10px)}to{-webkit-transform:translateY(0)}}@-moz-keyframes bounce{from{-moz-transform:translateY(10px)}to{-moz-transform:translateY(0)}}@keyframes bounce{from{-webkit-transform:translateY(10px);-moz-transform:translateY(10px);-ms-transform:translateY(10px);-o-transform:translateY(10px);transform:translateY(10px)}to{-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}#arrow-down{margin-bottom:50px;height:48px;width:48px;-webkit-animation:bounce 3s infinite ease alternate;-moz-animation:bounce 3s infinite ease alternate;animation:bounce 3s infinite ease alternate}#arrow-down *{fill:#e3b673}#arrow-down #arrow{-webkit-transition:all 0.4s ease;-moz-transition:all 0.4s ease;transition:all 0.4s ease;-webkit-transform-origin:center top;-moz-transform-origin:center top;-ms-transform-origin:center top;-o-transform-origin:center top;transform-origin:center top}#arrow-down:hover #arrow{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5)}::-webkit-input-placeholder{opacity:0.5;-webkit-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:-moz-placeholder,::-moz-placeholder{opacity:0.5;-moz-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:-ms-input-placeholder{opacity:0.5;-ms-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:hover::-webkit-input-placeholder{opacity:0.75;-webkit-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:hover:-moz-placeholder,:hover::-moz-placeholder{opacity:0.75;-moz-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:hover:-ms-input-placeholder{opacity:0.75;-ms-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:focus::-webkit-input-placeholder{opacity:0;-webkit-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:focus:-moz-placeholder,:focus::-moz-placeholder{opacity:0;-moz-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}:focus:-ms-input-placeholder{opacity:0;-ms-transition:opacity 0.35s ease-in-out;transition:opacity 0.35s ease-in-out}#contact-form{max-width:600px;margin:auto}#message{resize:none;height:150px !important}.form-label{font-size:14px;color:#888a8b;padding-top:5px;display:block;opacity:1;transition:0.333s ease top, 0.333s ease opacity}.form-control{outline:none !important;border-radius:0;border-color:#ccc;border-width:0 0 2px;border-style:none none solid;box-shadow:none;width:90%;height:40px;line-height:40px;background-color:transparent;margin:0 5% 15px}.form-control:focus{box-shadow:none;border-color:#e3b673}.js-hide-label{opacity:0}.hidden-email{opacity:0;margin:auto}.hidden-email-image{width:125px;padding-top:130px}#mail-loader{position:relative;width:180px;height:180px;margin:65px auto auto auto}#mail-loader:after,#mail-loader:before{position:absolute;content:\"\"}#mail-loader:after{height:10px;width:100px;background-color:#454648;border-radius:5px;top:110px;left:40px;animation:loader-swing 0.8s ease-in-out infinite;animation-direction:alternate}#mail-loader:before{height:20px;width:20px;background-color:#454648;border-radius:50%;top:30px;left:78px;animation:loader-bounce 0.4s ease-in-out infinite;animation-direction:alternate}@keyframes loader-bounce{0%{height:24px;transform:translateY(0px)}75%{height:20px;width:20px}100%{height:10px;width:24px;transform:translateY(74px)}}@keyframes loader-swing{0%{transform:rotate(-45deg)}100%{transform:rotate(45deg)}}.hexagon-wrapper{text-align:center;margin:20px;position:relative;display:inline-block;width:40px;height:40px}.hexagon{background-color:#e3b673;border:1px solid #000000;height:100%;width:calc(100% * 0.57735);display:inline-block}.hexagon:before{position:absolute;top:0;right:calc((100% / 2) - ((100% * 0.57735) / 2));background-color:inherit;height:inherit;width:inherit;content:\"\";transform:rotateZ(60deg);z-index:3;border-top:1px solid black;border-bottom:1px solid #000000}.hexagon:after{position:absolute;top:0;right:calc((100% / 2) - ((100% * 0.57735) / 2));background-color:inherit;height:inherit;width:inherit;content:\"\";transform:rotateZ(-60deg);z-index:3;border-top:1px solid black;border-bottom:1px solid #000000}.hexagon-icon-position{color:#000;position:relative;z-index:4;top:12px;-webkit-transition:-webkid-transform 0.25s ease;-moz-transition:-moz-transform 0.25s ease;-ms-transition:-ms-transform 0.25s ease;-o-transition:-o-transform 0.25s ease;transition:transform 0.25s ease}.hexagon-hover-rotate{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);-webkit-transition:-webkid-transform 0.25s ease;-moz-transition:-moz-transform 0.25s ease;-ms-transition:-ms-transform 0.25s ease;-o-transition:-o-transform 0.25s ease;transition:transform 0.25s ease}.ripple-effect{position:absolute;border-radius:50%;width:10px;height:10px;background:#cccccc;animation:ripple-animation 2s}@keyframes ripple-animation{from{transform:scale(1);opacity:0.8}to{transform:scale(100);opacity:0}}.spot{position:absolute;width:100%;height:100%;top:0;left:0}.svg-wrapper{margin-top:40px;position:relative;width:150px;height:40px;display:inline-block;margin-left:5px;margin-right:5px;overflow:hidden;cursor:pointer}.shape{display:block;stroke-width:4px;fill:transparent;stroke:#ccc;stroke-dasharray:85 400;stroke-dashoffset:-220;transition:1.5s all ease}.text{display:block;margin-top:-35px;text-align:center}.text a{color:#454648;text-decoration:none;text-rendering:optimizeLegibility;font-family:\"Roboto\", Arial, sans-serif;font-size:14px;line-height:1}.svg-wrapper:hover .shape{stroke-dasharray:50 0;stroke-width:3px;stroke-dashoffset:0;stroke:#e3b673}.active .shape{stroke-dasharray:50 0;stroke-width:3px;stroke-dashoffset:0;stroke:#ffefff}@font-face{font-family:\"pe-icon-social\", sans-serif;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");src:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"embedded-opentype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"truetype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"svg\");font-weight:normal;font-style:normal}[class^=\"pe-so-\"],[class*=\" pe-so-\"]{left:1px;display:inline-block;font-family:\"pe-icon-social\", sans-serif;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.pe-so-facebook:before{content:\"\\e617\"}.pe-so-github:before{content:\"\\e61e\"}.pe-so-google-plus:before{content:\"\\e620\"}.pe-so-instagram:before{content:\"\\e626\"}.pe-so-linkedin:before{content:\"\\e62c\"}.pe-so-stack-overflow:before{content:\"\\e649\"}.pe-so-twitter:before{content:\"\\e651\"}.pe-so-codepen:before{content:\"\\e60b\"}.site-inner{position:relative;margin-left:auto;margin-right:auto;height:100%}.site-inner-abs{position:absolute;top:0;left:50%;width:58.75em;margin-left:-29.375em}.heading{color:#919193;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-rendering:optimizeLegibility;min-height:50px}.heading.h-01{font-family:\"Roboto-bold\", Arial, sans-serif;font-size:60px;font-weight:700;line-height:1;text-transform:uppercase;min-height:90px}.heading.h-02{font-family:\"Roboto\", Arial, sans-serif;font-size:19px;font-weight:normal;line-height:1}.heading.h-03{font-family:\"Roboto-bold\", Arial, sans-serif;font-size:18px;font-weight:700;line-height:1}.copy-01{text-rendering:optimizeLegibility;font-family:\"Roboto\", Arial, sans-serif;font-size:27px;color:#464b4f;line-height:42px}.copy-02{text-rendering:optimizeLegibility;font-family:\"Roboto\", Arial, sans-serif;font-size:18px;color:#888a8b;line-height:30px;text-align:center}.copy-03,#page-work .filter-link{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-rendering:optimizeLegibility;font-family:\"Roboto\", Arial, sans-serif;font-size:14px;line-height:1}.button{display:inline-block;padding:23px 63px;-webkit-transition:all 0.3s ease-in-out;-moz-transition:all 0.3s ease-in-out;transition:all 0.3s ease-in-out}.button.main{background:#7b77c9;color:#e3b673;font-family:\"Roboto\", Arial, sans-serif;font-size:14px}.button.white{background:#e3b673;color:#888a8b;font-family:\"Roboto\", Arial, sans-serif;font-size:14px}.button.rounded{border-radius:3px}.button:hover{opacity:0.7;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=” $value * 100 “)\";filter:alpha(opacity=70);zoom:1}.section{padding:65px 0}.section .h-01{text-align:center}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6492:
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ 3379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ 7795);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ 569);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ 3565);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ 9216);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ 4589);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[2]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[5].use[3]!./main.scss */ 8947);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_0_oneOf_5_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ 3379:
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 9216:
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 3565:
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 7795:
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 4589:
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ 1456:
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a45108d3b34af91f9113.woff";

/***/ }),

/***/ 9309:
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c2aa4ab115bf9c6057cb.woff2";

/***/ }),

/***/ 2252:
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "451d4e559d6f57cdf6a1.woff";

/***/ }),

/***/ 8394:
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7f839a8652da29745ce4.woff2";

/***/ }),

/***/ 7243:
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "865f928cbabcc9f8f2b5.woff";

/***/ }),

/***/ 9527:
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "37a7069dc30fc663c878.woff2";

/***/ }),

/***/ 4126:
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bd5b7a13f2c52b531a2a.woff";

/***/ }),

/***/ 8197:
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c64e7e354c88e613c77c.woff2";

/***/ }),

/***/ 8255:
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "49ae34d4cc6b98c00c69.woff";

/***/ }),

/***/ 4829:
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "176f8f5bd5f02b3abfcf.woff2";

/***/ }),

/***/ 5483:
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b1d9d9904bfca8802a63.woff";

/***/ }),

/***/ 7125:
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d022bc70dc1bf7b3425d.woff2";

/***/ }),

/***/ 4028:
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cea99d3e3e13a3a599a0.woff";

/***/ }),

/***/ 9802:
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f5b74d7ffcdf85b9dd60.woff2";

/***/ }),

/***/ 7074:
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "18d00f739ff1e1c52db1.woff";

/***/ }),

/***/ 404:
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0d8bb5b3ee5f5dac9e44.woff2";

/***/ }),

/***/ 6991:
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2267169ee7270a22a963.woff";

/***/ }),

/***/ 2766:
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c18ee39fb002ad58b6dc.woff2";

/***/ }),

/***/ 7086:
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9360531f9bb817f917f0.woff";

/***/ }),

/***/ 4828:
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7d8125ff7f707231fd89.woff2";

/***/ }),

/***/ 8396:
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bac8362e7a6ea60b6983.woff";

/***/ }),

/***/ 9960:
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "870c8c1486f76054301a.woff2";

/***/ }),

/***/ 224:
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c20d916c1a1b094c1cec.woff";

/***/ }),

/***/ 9824:
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cb5ad999740e9d8a8bd1.woff2";

/***/ }),

/***/ 4627:
/*!***********************************!*\
  !*** ./src/assets/images/pen.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "97caeb358cf8e5f12bb0.svg";

/***/ }),

/***/ 9618:
/*!*******************************************!*\
  !*** ./src/scss/fonts/pe-icon-social.eot ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "17fe72512a0db9961db8.eot";

/***/ }),

/***/ 2663:
/*!*******************************************!*\
  !*** ./src/scss/fonts/pe-icon-social.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "777b73751d4fc2c93bc8.svg";

/***/ }),

/***/ 4025:
/*!*******************************************!*\
  !*** ./src/scss/fonts/pe-icon-social.ttf ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "07607538a69f3875339e.ttf";

/***/ }),

/***/ 6479:
/*!********************************************!*\
  !*** ./src/scss/fonts/pe-icon-social.woff ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6566bf2c77ee75ce278b.woff";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			143: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************!*\
  !*** ./src/index.js + 3 modules ***!
  \**********************************/

;// CONCATENATED MODULE: ./node_modules/shufflejs/dist/shuffle.esm.js
var tinyEmitter = {
  exports: {}
};

function E() {// Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });
    return this;
  },
  once: function (name, callback, ctx) {
    var self = this;

    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },
  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    } // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};
tinyEmitter.exports = E;
tinyEmitter.exports.TinyEmitter = E;

var arrayParallel = function parallel(fns, context, callback) {
  if (!callback) {
    if (typeof context === 'function') {
      callback = context;
      context = null;
    } else {
      callback = noop;
    }
  }

  var pending = fns && fns.length;
  if (!pending) return callback(null, []);
  var finished = false;
  var results = new Array(pending);
  fns.forEach(context ? function (fn, i) {
    fn.call(context, maybeDone(i));
  } : function (fn, i) {
    fn(maybeDone(i));
  });

  function maybeDone(i) {
    return function (err, result) {
      if (finished) return;

      if (err) {
        callback(err, results);
        finished = true;
        return;
      }

      results[i] = result;
      if (! --pending) callback(null, results);
    };
  }
};

function noop() {}
/**
 * Always returns a numeric value, given a value. Logic from jQuery's `isNumeric`.
 * @param {*} value Possibly numeric value.
 * @return {number} `value` or zero if `value` isn't numeric.
 */


function getNumber(value) {
  return parseFloat(value) || 0;
}

class Point {
  /**
   * Represents a coordinate pair.
   * @param {number} [x=0] X.
   * @param {number} [y=0] Y.
   */
  constructor(x, y) {
    this.x = getNumber(x);
    this.y = getNumber(y);
  }
  /**
   * Whether two points are equal.
   * @param {Point} a Point A.
   * @param {Point} b Point B.
   * @return {boolean}
   */


  static equals(a, b) {
    return a.x === b.x && a.y === b.y;
  }

}

class Rect {
  /**
   * Class for representing rectangular regions.
   * https://github.com/google/closure-library/blob/master/closure/goog/math/rect.js
   * @param {number} x Left.
   * @param {number} y Top.
   * @param {number} w Width.
   * @param {number} h Height.
   * @param {number} id Identifier
   * @constructor
   */
  constructor(x, y, w, h, id) {
    this.id = id;
    /** @type {number} */

    this.left = x;
    /** @type {number} */

    this.top = y;
    /** @type {number} */

    this.width = w;
    /** @type {number} */

    this.height = h;
  }
  /**
   * Returns whether two rectangles intersect.
   * @param {Rect} a A Rectangle.
   * @param {Rect} b A Rectangle.
   * @return {boolean} Whether a and b intersect.
   */


  static intersects(a, b) {
    return a.left < b.left + b.width && b.left < a.left + a.width && a.top < b.top + b.height && b.top < a.top + a.height;
  }

}

var Classes = {
  BASE: 'shuffle',
  SHUFFLE_ITEM: 'shuffle-item',
  VISIBLE: 'shuffle-item--visible',
  HIDDEN: 'shuffle-item--hidden'
};
let id$1 = 0;

class ShuffleItem {
  constructor(element, isRTL) {
    id$1 += 1;
    this.id = id$1;
    this.element = element;
    /**
     * Set correct direction of item
     */

    this.isRTL = isRTL;
    /**
     * Used to separate items for layout and shrink.
     */

    this.isVisible = true;
    /**
     * Used to determine if a transition will happen. By the time the _layout
     * and _shrink methods get the ShuffleItem instances, the `isVisible` value
     * has already been changed by the separation methods, so this property is
     * needed to know if the item was visible/hidden before the shrink/layout.
     */

    this.isHidden = false;
  }

  show() {
    this.isVisible = true;
    this.element.classList.remove(Classes.HIDDEN);
    this.element.classList.add(Classes.VISIBLE);
    this.element.removeAttribute('aria-hidden');
  }

  hide() {
    this.isVisible = false;
    this.element.classList.remove(Classes.VISIBLE);
    this.element.classList.add(Classes.HIDDEN);
    this.element.setAttribute('aria-hidden', true);
  }

  init() {
    this.addClasses([Classes.SHUFFLE_ITEM, Classes.VISIBLE]);
    this.applyCss(ShuffleItem.Css.INITIAL);
    this.applyCss(this.isRTL ? ShuffleItem.Css.DIRECTION.rtl : ShuffleItem.Css.DIRECTION.ltr);
    this.scale = ShuffleItem.Scale.VISIBLE;
    this.point = new Point();
  }

  addClasses(classes) {
    classes.forEach(className => {
      this.element.classList.add(className);
    });
  }

  removeClasses(classes) {
    classes.forEach(className => {
      this.element.classList.remove(className);
    });
  }

  applyCss(obj) {
    Object.keys(obj).forEach(key => {
      this.element.style[key] = obj[key];
    });
  }

  dispose() {
    this.removeClasses([Classes.HIDDEN, Classes.VISIBLE, Classes.SHUFFLE_ITEM]);
    this.element.removeAttribute('style');
    this.element = null;
  }

}

ShuffleItem.Css = {
  INITIAL: {
    position: 'absolute',
    top: 0,
    visibility: 'visible',
    willChange: 'transform'
  },
  DIRECTION: {
    ltr: {
      left: 0
    },
    rtl: {
      right: 0
    }
  },
  VISIBLE: {
    before: {
      opacity: 1,
      visibility: 'visible'
    },
    after: {
      transitionDelay: ''
    }
  },
  HIDDEN: {
    before: {
      opacity: 0
    },
    after: {
      visibility: 'hidden',
      transitionDelay: ''
    }
  }
};
ShuffleItem.Scale = {
  VISIBLE: 1,
  HIDDEN: 0.001
};
let value = null;

var testComputedSize = () => {
  if (value !== null) {
    return value;
  }

  const element = document.body || document.documentElement;
  const e = document.createElement('div');
  e.style.cssText = 'width:10px;padding:2px;box-sizing:border-box;';
  element.appendChild(e);
  const {
    width
  } = window.getComputedStyle(e, null); // Fix for issue #314

  value = Math.round(getNumber(width)) === 10;
  element.removeChild(e);
  return value;
};
/**
 * Retrieve the computed style for an element, parsed as a float.
 * @param {Element} element Element to get style for.
 * @param {string} style Style property.
 * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
 *     use instead of asking for them again.
 * @return {number} The parsed computed value or zero if that fails because IE
 *     will return 'auto' when the element doesn't have margins instead of
 *     the computed style.
 */


function getNumberStyle(element, style) {
  let styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.getComputedStyle(element, null);
  let value = getNumber(styles[style]); // Support IE<=11 and W3C spec.

  if (!testComputedSize() && style === 'width') {
    value += getNumber(styles.paddingLeft) + getNumber(styles.paddingRight) + getNumber(styles.borderLeftWidth) + getNumber(styles.borderRightWidth);
  } else if (!testComputedSize() && style === 'height') {
    value += getNumber(styles.paddingTop) + getNumber(styles.paddingBottom) + getNumber(styles.borderTopWidth) + getNumber(styles.borderBottomWidth);
  }

  return value;
}
/**
 * Fisher-Yates shuffle.
 * http://stackoverflow.com/a/962890/373422
 * https://bost.ocks.org/mike/shuffle/
 * @param {Array} array Array to shuffle.
 * @return {Array} Randomly sorted array.
 */


function randomize(array) {
  let n = array.length;

  while (n) {
    n -= 1;
    const i = Math.floor(Math.random() * (n + 1));
    const temp = array[i];
    array[i] = array[n];
    array[n] = temp;
  }

  return array;
}

const defaults = {
  // Use array.reverse() to reverse the results
  reverse: false,
  // Sorting function
  by: null,
  // Custom sort function
  compare: null,
  // If true, this will skip the sorting and return a randomized order in the array
  randomize: false,
  // Determines which property of each item in the array is passed to the
  // sorting method.
  key: 'element'
};
/**
 * You can return `undefined` from the `by` function to revert to DOM order.
 * @param {Array<T>} arr Array to sort.
 * @param {SortOptions} options Sorting options.
 * @return {Array<T>}
 */

function sorter(arr, options) {
  const opts = { ...defaults,
    ...options
  };
  const original = Array.from(arr);
  let revert = false;

  if (!arr.length) {
    return [];
  }

  if (opts.randomize) {
    return randomize(arr);
  } // Sort the elements by the opts.by function.
  // If we don't have opts.by, default to DOM order


  if (typeof opts.by === 'function') {
    arr.sort((a, b) => {
      // Exit early if we already know we want to revert
      if (revert) {
        return 0;
      }

      const valA = opts.by(a[opts.key]);
      const valB = opts.by(b[opts.key]); // If both values are undefined, use the DOM order

      if (valA === undefined && valB === undefined) {
        revert = true;
        return 0;
      }

      if (valA < valB || valA === 'sortFirst' || valB === 'sortLast') {
        return -1;
      }

      if (valA > valB || valA === 'sortLast' || valB === 'sortFirst') {
        return 1;
      }

      return 0;
    });
  } else if (typeof opts.compare === 'function') {
    arr.sort(opts.compare);
  } // Revert to the original array if necessary


  if (revert) {
    return original;
  }

  if (opts.reverse) {
    arr.reverse();
  }

  return arr;
}

const transitions = {};
const eventName = 'transitionend';
let count = 0;

function uniqueId() {
  count += 1;
  return eventName + count;
}

function cancelTransitionEnd(id) {
  if (transitions[id]) {
    transitions[id].element.removeEventListener(eventName, transitions[id].listener);
    transitions[id] = null;
    return true;
  }

  return false;
}

function onTransitionEnd(element, callback) {
  const id = uniqueId();

  const listener = evt => {
    if (evt.currentTarget === evt.target) {
      cancelTransitionEnd(id);
      callback(evt);
    }
  };

  element.addEventListener(eventName, listener);
  transitions[id] = {
    element,
    listener
  };
  return id;
}

function arrayMax(array) {
  return Math.max(...array);
}

function arrayMin(array) {
  return Math.min(...array);
}
/**
 * Determine the number of columns an items spans.
 * @param {number} itemWidth Width of the item.
 * @param {number} columnWidth Width of the column (includes gutter).
 * @param {number} columns Total number of columns
 * @param {number} threshold A buffer value for the size of the column to fit.
 * @return {number}
 */


function getColumnSpan(itemWidth, columnWidth, columns, threshold) {
  let columnSpan = itemWidth / columnWidth; // If the difference between the rounded column span number and the
  // calculated column span number is really small, round the number to
  // make it fit.

  if (Math.abs(Math.round(columnSpan) - columnSpan) < threshold) {
    // e.g. columnSpan = 4.0089945390298745
    columnSpan = Math.round(columnSpan);
  } // Ensure the column span is not more than the amount of columns in the whole layout.


  return Math.min(Math.ceil(columnSpan), columns);
}
/**
 * Retrieves the column set to use for placement.
 * @param {number} columnSpan The number of columns this current item spans.
 * @param {number} columns The total columns in the grid.
 * @return {Array.<number>} An array of numbers represeting the column set.
 */


function getAvailablePositions(positions, columnSpan, columns) {
  // The item spans only one column.
  if (columnSpan === 1) {
    return positions;
  } // The item spans more than one column, figure out how many different
  // places it could fit horizontally.
  // The group count is the number of places within the positions this block
  // could fit, ignoring the current positions of items.
  // Imagine a 2 column brick as the second item in a 4 column grid with
  // 10px height each. Find the places it would fit:
  // [20, 10, 10, 0]
  //  |   |   |
  //  *   *   *
  //
  // Then take the places which fit and get the bigger of the two:
  // max([20, 10]), max([10, 10]), max([10, 0]) = [20, 10, 10]
  //
  // Next, find the first smallest number (the short column).
  // [20, 10, 10]
  //      |
  //      *
  //
  // And that's where it should be placed!
  //
  // Another example where the second column's item extends past the first:
  // [10, 20, 10, 0] => [20, 20, 10] => 10


  const available = []; // For how many possible positions for this item there are.

  for (let i = 0; i <= columns - columnSpan; i++) {
    // Find the bigger value for each place it could fit.
    available.push(arrayMax(positions.slice(i, i + columnSpan)));
  }

  return available;
}
/**
 * Find index of short column, the first from the left where this item will go.
 *
 * @param {Array.<number>} positions The array to search for the smallest number.
 * @param {number} buffer Optional buffer which is very useful when the height
 *     is a percentage of the width.
 * @return {number} Index of the short column.
 */


function getShortColumn(positions, buffer) {
  const minPosition = arrayMin(positions);

  for (let i = 0, len = positions.length; i < len; i++) {
    if (positions[i] >= minPosition - buffer && positions[i] <= minPosition + buffer) {
      return i;
    }
  }

  return 0;
}
/**
 * Determine the location of the next item, based on its size.
 * @param {Object} itemSize Object with width and height.
 * @param {Array.<number>} positions Positions of the other current items.
 * @param {number} gridSize The column width or row height.
 * @param {number} total The total number of columns or rows.
 * @param {number} threshold Buffer value for the column to fit.
 * @param {number} buffer Vertical buffer for the height of items.
 * @return {Point}
 */


function getItemPosition(_ref) {
  let {
    itemSize,
    positions,
    gridSize,
    total,
    threshold,
    buffer
  } = _ref;
  const span = getColumnSpan(itemSize.width, gridSize, total, threshold);
  const setY = getAvailablePositions(positions, span, total);
  const shortColumnIndex = getShortColumn(setY, buffer); // Position the item

  const point = new Point(gridSize * shortColumnIndex, setY[shortColumnIndex]); // Update the columns array with the new values for each column.
  // e.g. before the update the columns could be [250, 0, 0, 0] for an item
  // which spans 2 columns. After it would be [250, itemHeight, itemHeight, 0].

  const setHeight = setY[shortColumnIndex] + itemSize.height;

  for (let i = 0; i < span; i++) {
    positions[shortColumnIndex + i] = setHeight;
  }

  return point;
}
/**
 * This method attempts to center items. This method could potentially be slow
 * with a large number of items because it must place items, then check every
 * previous item to ensure there is no overlap.
 * @param {Array.<Rect>} itemRects Item data objects.
 * @param {number} containerWidth Width of the containing element.
 * @return {Array.<Point>}
 */


function getCenteredPositions(itemRects, containerWidth) {
  const rowMap = {}; // Populate rows by their offset because items could jump between rows like:
  // a   c
  //  bbb

  itemRects.forEach(itemRect => {
    if (rowMap[itemRect.top]) {
      // Push the point to the last row array.
      rowMap[itemRect.top].push(itemRect);
    } else {
      // Start of a new row.
      rowMap[itemRect.top] = [itemRect];
    }
  }); // For each row, find the end of the last item, then calculate
  // the remaining space by dividing it by 2. Then add that
  // offset to the x position of each point.

  let rects = [];
  const rows = [];
  const centeredRows = [];
  Object.keys(rowMap).forEach(key => {
    const itemRects = rowMap[key];
    rows.push(itemRects);
    const lastItem = itemRects[itemRects.length - 1];
    const end = lastItem.left + lastItem.width;
    const offset = Math.round((containerWidth - end) / 2);
    let finalRects = itemRects;
    let canMove = false;

    if (offset > 0) {
      const newRects = [];
      canMove = itemRects.every(r => {
        const newRect = new Rect(r.left + offset, r.top, r.width, r.height, r.id); // Check all current rects to make sure none overlap.

        const noOverlap = !rects.some(r => Rect.intersects(newRect, r));
        newRects.push(newRect);
        return noOverlap;
      }); // If none of the rectangles overlapped, the whole group can be centered.

      if (canMove) {
        finalRects = newRects;
      }
    } // If the items are not going to be offset, ensure that the original
    // placement for this row will not overlap previous rows (row-spanning
    // elements could be in the way).


    if (!canMove) {
      let intersectingRect;
      const hasOverlap = itemRects.some(itemRect => rects.some(r => {
        const intersects = Rect.intersects(itemRect, r);

        if (intersects) {
          intersectingRect = r;
        }

        return intersects;
      })); // If there is any overlap, replace the overlapping row with the original.

      if (hasOverlap) {
        const rowIndex = centeredRows.findIndex(items => items.includes(intersectingRect));
        centeredRows.splice(rowIndex, 1, rows[rowIndex]);
      }
    }

    rects = rects.concat(finalRects);
    centeredRows.push(finalRects);
  }); // Reduce array of arrays to a single array of points.
  // https://stackoverflow.com/a/10865042/373422
  // Then reset sort back to how the items were passed to this method.
  // Remove the wrapper object with index, map to a Point.

  return centeredRows.flat().sort((a, b) => a.id - b.id).map(itemRect => new Point(itemRect.left, itemRect.top));
}
/**
 * Hyphenates a javascript style string to a css one. For example:
 * MozBoxSizing -> -moz-box-sizing.
 * @param {string} str The string to hyphenate.
 * @return {string} The hyphenated string.
 */


function hyphenate(str) {
  return str.replace(/([A-Z])/g, (str, m1) => `-${m1.toLowerCase()}`);
}

function arrayUnique(x) {
  return Array.from(new Set(x));
} // Used for unique instance variables


let id = 0;

class Shuffle extends tinyEmitter.exports {
  /**
   * Categorize, sort, and filter a responsive grid of items.
   *
   * @param {Element} element An element which is the parent container for the grid items.
   * @param {Object} [options=Shuffle.options] Options object.
   * @constructor
   */
  constructor(element) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super();
    this.options = { ...Shuffle.options,
      ...options
    };
    this.lastSort = {};
    this.group = Shuffle.ALL_ITEMS;
    this.lastFilter = Shuffle.ALL_ITEMS;
    this.isEnabled = true;
    this.isDestroyed = false;
    this.isInitialized = false;
    this._transitions = [];
    this.isTransitioning = false;
    this._queue = [];

    const el = this._getElementOption(element);

    if (!el) {
      throw new TypeError('Shuffle needs to be initialized with an element.');
    }

    this.element = el;
    this.id = `shuffle_${id}`;
    id += 1;

    this._init();

    this.isInitialized = true;
  }

  _init() {
    this.items = this._getItems();
    this.sortedItems = this.items;
    this.options.sizer = this._getElementOption(this.options.sizer); // Add class and invalidate styles

    this.element.classList.add(Shuffle.Classes.BASE); // Set initial css for each item

    this._initItems(this.items); // If the page has not already emitted the `load` event, call layout on load.
    // This avoids layout issues caused by images and fonts loading after the
    // instance has been initialized.


    if (document.readyState !== 'complete') {
      const layout = this.layout.bind(this);
      window.addEventListener('load', function onLoad() {
        window.removeEventListener('load', onLoad);
        layout();
      });
    } // Get container css all in one request. Causes reflow


    const containerCss = window.getComputedStyle(this.element, null);
    const containerWidth = Shuffle.getSize(this.element).width; // Add styles to the container if it doesn't have them.

    this._validateStyles(containerCss); // We already got the container's width above, no need to cause another
    // reflow getting it again... Calculate the number of columns there will be


    this._setColumns(containerWidth); // Kick off!


    this.filter(this.options.group, this.options.initialSort); // Bind resize events

    this._rafId = null; // This is true for all supported browsers, but just to be safe, avoid throwing
    // an error if ResizeObserver is not present. You can manually add a window resize
    // event and call `update()` if ResizeObserver is missing, or use Shuffle v5.

    if ('ResizeObserver' in window) {
      this._resizeObserver = new ResizeObserver(this._handleResizeCallback.bind(this));

      this._resizeObserver.observe(this.element);
    } // The shuffle items haven't had transitions set on them yet so the user
    // doesn't see the first layout. Set them now that the first layout is done.
    // First, however, a synchronous layout must be caused for the previous
    // styles to be applied without transitions.


    this.element.offsetWidth; // eslint-disable-line no-unused-expressions

    this.setItemTransitions(this.items);
    this.element.style.transition = `height ${this.options.speed}ms ${this.options.easing}`;
  }
  /**
   * Retrieve an element from an option.
   * @param {string|jQuery|Element} option The option to check.
   * @return {?Element} The plain element or null.
   * @private
   */


  _getElementOption(option) {
    // If column width is a string, treat is as a selector and search for the
    // sizer element within the outermost container
    if (typeof option === 'string') {
      return this.element.querySelector(option);
    } // Check for an element


    if (option && option.nodeType && option.nodeType === 1) {
      return option;
    } // Check for jQuery object


    if (option && option.jquery) {
      return option[0];
    }

    return null;
  }
  /**
   * Ensures the shuffle container has the css styles it needs applied to it.
   * @param {Object} styles Key value pairs for position and overflow.
   * @private
   */


  _validateStyles(styles) {
    // Position cannot be static.
    if (styles.position === 'static') {
      this.element.style.position = 'relative';
    } // Overflow has to be hidden.


    if (styles.overflow !== 'hidden') {
      this.element.style.overflow = 'hidden';
    }
  }
  /**
   * Filter the elements by a category.
   * @param {string|string[]|function(Element):boolean} [category] Category to
   *     filter by. If it's given, the last category will be used to filter the items.
   * @param {Array} [collection] Optionally filter a collection. Defaults to
   *     all the items.
   * @return {{visible: ShuffleItem[], hidden: ShuffleItem[]}}
   * @private
   */


  _filter() {
    let category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastFilter;
    let collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.items;

    const set = this._getFilteredSets(category, collection); // Individually add/remove hidden/visible classes


    this._toggleFilterClasses(set); // Save the last filter in case elements are appended.


    this.lastFilter = category; // This is saved mainly because providing a filter function (like searching)
    // will overwrite the `lastFilter` property every time its called.

    if (typeof category === 'string') {
      this.group = category;
    }

    return set;
  }
  /**
   * Returns an object containing the visible and hidden elements.
   * @param {string|string[]|function(Element):boolean} category Category or function to filter by.
   * @param {ShuffleItem[]} items A collection of items to filter.
   * @return {{visible: ShuffleItem[], hidden: ShuffleItem[]}}
   * @private
   */


  _getFilteredSets(category, items) {
    let visible = [];
    const hidden = []; // category === 'all', add visible class to everything

    if (category === Shuffle.ALL_ITEMS) {
      visible = items; // Loop through each item and use provided function to determine
      // whether to hide it or not.
    } else {
      items.forEach(item => {
        if (this._doesPassFilter(category, item.element)) {
          visible.push(item);
        } else {
          hidden.push(item);
        }
      });
    }

    return {
      visible,
      hidden
    };
  }
  /**
   * Test an item to see if it passes a category.
   * @param {string|string[]|function():boolean} category Category or function to filter by.
   * @param {Element} element An element to test.
   * @return {boolean} Whether it passes the category/filter.
   * @private
   */


  _doesPassFilter(category, element) {
    if (typeof category === 'function') {
      return category.call(element, element, this);
    } // Check each element's data-groups attribute against the given category.


    const attr = element.dataset[Shuffle.FILTER_ATTRIBUTE_KEY];
    const keys = this.options.delimiter ? attr.split(this.options.delimiter) : JSON.parse(attr);

    function testCategory(category) {
      return keys.includes(category);
    }

    if (Array.isArray(category)) {
      if (this.options.filterMode === Shuffle.FilterMode.ANY) {
        return category.some(testCategory);
      }

      return category.every(testCategory);
    }

    return keys.includes(category);
  }
  /**
   * Toggles the visible and hidden class names.
   * @param {{visible, hidden}} Object with visible and hidden arrays.
   * @private
   */


  _toggleFilterClasses(_ref) {
    let {
      visible,
      hidden
    } = _ref;
    visible.forEach(item => {
      item.show();
    });
    hidden.forEach(item => {
      item.hide();
    });
  }
  /**
   * Set the initial css for each item
   * @param {ShuffleItem[]} items Set to initialize.
   * @private
   */


  _initItems(items) {
    items.forEach(item => {
      item.init();
    });
  }
  /**
   * Remove element reference and styles.
   * @param {ShuffleItem[]} items Set to dispose.
   * @private
   */


  _disposeItems(items) {
    items.forEach(item => {
      item.dispose();
    });
  }
  /**
   * Updates the visible item count.
   * @private
   */


  _updateItemCount() {
    this.visibleItems = this._getFilteredItems().length;
  }
  /**
   * Sets css transform transition on a group of elements. This is not executed
   * at the same time as `item.init` so that transitions don't occur upon
   * initialization of a new Shuffle instance.
   * @param {ShuffleItem[]} items Shuffle items to set transitions on.
   * @protected
   */


  setItemTransitions(items) {
    const {
      speed,
      easing
    } = this.options;
    const positionProps = this.options.useTransforms ? ['transform'] : ['top', 'left']; // Allow users to transtion other properties if they exist in the `before`
    // css mapping of the shuffle item.

    const cssProps = Object.keys(ShuffleItem.Css.HIDDEN.before).map(k => hyphenate(k));
    const properties = positionProps.concat(cssProps).join();
    items.forEach(item => {
      item.element.style.transitionDuration = `${speed}ms`;
      item.element.style.transitionTimingFunction = easing;
      item.element.style.transitionProperty = properties;
    });
  }

  _getItems() {
    return Array.from(this.element.children).filter(el => el.matches(this.options.itemSelector)).map(el => new ShuffleItem(el, this.options.isRTL));
  }
  /**
   * Combine the current items array with a new one and sort it by DOM order.
   * @param {ShuffleItem[]} items Items to track.
   * @return {ShuffleItem[]}
   */


  _mergeNewItems(items) {
    const children = Array.from(this.element.children);
    return sorter(this.items.concat(items), {
      by(element) {
        return children.indexOf(element);
      }

    });
  }

  _getFilteredItems() {
    return this.items.filter(item => item.isVisible);
  }

  _getConcealedItems() {
    return this.items.filter(item => !item.isVisible);
  }
  /**
   * Returns the column size, based on column width and sizer options.
   * @param {number} containerWidth Size of the parent container.
   * @param {number} gutterSize Size of the gutters.
   * @return {number}
   * @private
   */


  _getColumnSize(containerWidth, gutterSize) {
    let size; // If the columnWidth property is a function, then the grid is fluid

    if (typeof this.options.columnWidth === 'function') {
      size = this.options.columnWidth(containerWidth); // columnWidth option isn't a function, are they using a sizing element?
    } else if (this.options.sizer) {
      size = Shuffle.getSize(this.options.sizer).width; // if not, how about the explicitly set option?
    } else if (this.options.columnWidth) {
      size = this.options.columnWidth; // or use the size of the first item
    } else if (this.items.length > 0) {
      size = Shuffle.getSize(this.items[0].element, true).width; // if there's no items, use size of container
    } else {
      size = containerWidth;
    } // Don't let them set a column width of zero.


    if (size === 0) {
      size = containerWidth;
    }

    return size + gutterSize;
  }
  /**
   * Returns the gutter size, based on gutter width and sizer options.
   * @param {number} containerWidth Size of the parent container.
   * @return {number}
   * @private
   */


  _getGutterSize(containerWidth) {
    let size;

    if (typeof this.options.gutterWidth === 'function') {
      size = this.options.gutterWidth(containerWidth);
    } else if (this.options.sizer) {
      size = getNumberStyle(this.options.sizer, 'marginLeft');
    } else {
      size = this.options.gutterWidth;
    }

    return size;
  }
  /**
   * Calculate the number of columns to be used. Gets css if using sizer element.
   * @param {number} [containerWidth] Optionally specify a container width if
   *    it's already available.
   */


  _setColumns() {
    let containerWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Shuffle.getSize(this.element).width;

    const gutter = this._getGutterSize(containerWidth);

    const columnWidth = this._getColumnSize(containerWidth, gutter);

    let calculatedColumns = (containerWidth + gutter) / columnWidth; // Widths given from getStyles are not precise enough...

    if (Math.abs(Math.round(calculatedColumns) - calculatedColumns) < this.options.columnThreshold) {
      // e.g. calculatedColumns = 11.998876
      calculatedColumns = Math.round(calculatedColumns);
    }

    this.cols = Math.max(Math.floor(calculatedColumns || 0), 1);
    this.containerWidth = containerWidth;
    this.colWidth = columnWidth;
  }
  /**
   * Adjust the height of the grid
   */


  _setContainerSize() {
    this.element.style.height = `${this._getContainerSize()}px`;
  }
  /**
   * Based on the column heights, it returns the biggest one.
   * @return {number}
   * @private
   */


  _getContainerSize() {
    return arrayMax(this.positions);
  }
  /**
   * Get the clamped stagger amount.
   * @param {number} index Index of the item to be staggered.
   * @return {number}
   */


  _getStaggerAmount(index) {
    return Math.min(index * this.options.staggerAmount, this.options.staggerAmountMax);
  }
  /**
   * Emit an event from this instance.
   * @param {string} name Event name.
   * @param {Object} [data={}] Optional object data.
   */


  _dispatch(name) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.isDestroyed) {
      return;
    }

    data.shuffle = this;
    this.emit(name, data);
  }
  /**
   * Zeros out the y columns array, which is used to determine item placement.
   * @private
   */


  _resetCols() {
    let i = this.cols;
    this.positions = [];

    while (i) {
      i -= 1;
      this.positions.push(0);
    }
  }
  /**
   * Loops through each item that should be shown and calculates the x, y position.
   * @param {ShuffleItem[]} items Array of items that will be shown/layed
   *     out in order in their array.
   */


  _layout(items) {
    const itemPositions = this._getNextPositions(items);

    let count = 0;
    items.forEach((item, i) => {
      function callback() {
        item.applyCss(ShuffleItem.Css.VISIBLE.after);
      } // If the item will not change its position, do not add it to the render
      // queue. Transitions don't fire when setting a property to the same value.


      if (Point.equals(item.point, itemPositions[i]) && !item.isHidden) {
        item.applyCss(ShuffleItem.Css.VISIBLE.before);
        callback();
        return;
      }

      item.point = itemPositions[i];
      item.scale = ShuffleItem.Scale.VISIBLE;
      item.isHidden = false; // Clone the object so that the `before` object isn't modified when the
      // transition delay is added.

      const styles = this.getStylesForTransition(item, ShuffleItem.Css.VISIBLE.before);
      styles.transitionDelay = `${this._getStaggerAmount(count)}ms`;

      this._queue.push({
        item,
        styles,
        callback
      });

      count += 1;
    });
  }
  /**
   * Return an array of Point instances representing the future positions of
   * each item.
   * @param {ShuffleItem[]} items Array of sorted shuffle items.
   * @return {Point[]}
   * @private
   */


  _getNextPositions(items) {
    // If position data is going to be changed, add the item's size to the
    // transformer to allow for calculations.
    if (this.options.isCentered) {
      const itemsData = items.map((item, i) => {
        const itemSize = Shuffle.getSize(item.element, true);

        const point = this._getItemPosition(itemSize);

        return new Rect(point.x, point.y, itemSize.width, itemSize.height, i);
      });
      return this.getTransformedPositions(itemsData, this.containerWidth);
    } // If no transforms are going to happen, simply return an array of the
    // future points of each item.


    return items.map(item => this._getItemPosition(Shuffle.getSize(item.element, true)));
  }
  /**
   * Determine the location of the next item, based on its size.
   * @param {{width: number, height: number}} itemSize Object with width and height.
   * @return {Point}
   * @private
   */


  _getItemPosition(itemSize) {
    return getItemPosition({
      itemSize,
      positions: this.positions,
      gridSize: this.colWidth,
      total: this.cols,
      threshold: this.options.columnThreshold,
      buffer: this.options.buffer
    });
  }
  /**
   * Mutate positions before they're applied.
   * @param {Rect[]} itemRects Item data objects.
   * @param {number} containerWidth Width of the containing element.
   * @return {Point[]}
   * @protected
   */


  getTransformedPositions(itemRects, containerWidth) {
    return getCenteredPositions(itemRects, containerWidth);
  }
  /**
   * Hides the elements that don't match our filter.
   * @param {ShuffleItem[]} collection Collection to shrink.
   * @private
   */


  _shrink() {
    let collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._getConcealedItems();
    let count = 0;
    collection.forEach(item => {
      function callback() {
        item.applyCss(ShuffleItem.Css.HIDDEN.after);
      } // Continuing would add a transitionend event listener to the element, but
      // that listener would not execute because the transform and opacity would
      // stay the same.
      // The callback is executed here because it is not guaranteed to be called
      // after the transitionend event because the transitionend could be
      // canceled if another animation starts.


      if (item.isHidden) {
        item.applyCss(ShuffleItem.Css.HIDDEN.before);
        callback();
        return;
      }

      item.scale = ShuffleItem.Scale.HIDDEN;
      item.isHidden = true;
      const styles = this.getStylesForTransition(item, ShuffleItem.Css.HIDDEN.before);
      styles.transitionDelay = `${this._getStaggerAmount(count)}ms`;

      this._queue.push({
        item,
        styles,
        callback
      });

      count += 1;
    });
  }
  /**
   * Resize handler.
   * @param {ResizeObserverEntry[]} entries
   */


  _handleResizeCallback(entries) {
    // If shuffle is disabled, destroyed, don't do anything.
    // You can still manually force a shuffle update with shuffle.update({ force: true }).
    if (!this.isEnabled || this.isDestroyed) {
      return;
    } // The reason ESLint disables this is because for..of generates a lot of extra
    // code using Babel, but Shuffle no longer supports browsers that old, so
    // nothing to worry about.
    // eslint-disable-next-line no-restricted-syntax


    for (const entry of entries) {
      if (Math.round(entry.contentRect.width) !== Math.round(this.containerWidth)) {
        // If there was already an animation waiting, cancel it.
        cancelAnimationFrame(this._rafId); // Offload updating the DOM until the browser is ready.

        this._rafId = requestAnimationFrame(this.update.bind(this));
      }
    }
  }
  /**
   * Returns styles which will be applied to the an item for a transition.
   * @param {ShuffleItem} item Item to get styles for. Should have updated
   *   scale and point properties.
   * @param {Object} styleObject Extra styles that will be used in the transition.
   * @return {!Object} Transforms for transitions, left/top for animate.
   * @protected
   */


  getStylesForTransition(item, styleObject) {
    // Clone the object to avoid mutating the original.
    const styles = { ...styleObject
    };

    if (this.options.useTransforms) {
      const sign = this.options.isRTL ? '-' : '';
      const x = this.options.roundTransforms ? Math.round(item.point.x) : item.point.x;
      const y = this.options.roundTransforms ? Math.round(item.point.y) : item.point.y;
      styles.transform = `translate(${sign}${x}px, ${y}px) scale(${item.scale})`;
    } else {
      if (this.options.isRTL) {
        styles.right = `${item.point.x}px`;
      } else {
        styles.left = `${item.point.x}px`;
      }

      styles.top = `${item.point.y}px`;
    }

    return styles;
  }
  /**
   * Listen for the transition end on an element and execute the itemCallback
   * when it finishes.
   * @param {Element} element Element to listen on.
   * @param {function} itemCallback Callback for the item.
   * @param {function} done Callback to notify `parallel` that this one is done.
   */


  _whenTransitionDone(element, itemCallback, done) {
    const id = onTransitionEnd(element, evt => {
      itemCallback();
      done(null, evt);
    });

    this._transitions.push(id);
  }
  /**
   * Return a function which will set CSS styles and call the `done` function
   * when (if) the transition finishes.
   * @param {Object} opts Transition object.
   * @return {function} A function to be called with a `done` function.
   */


  _getTransitionFunction(opts) {
    return done => {
      opts.item.applyCss(opts.styles);

      this._whenTransitionDone(opts.item.element, opts.callback, done);
    };
  }
  /**
   * Execute the styles gathered in the style queue. This applies styles to elements,
   * triggering transitions.
   * @private
   */


  _processQueue() {
    if (this.isTransitioning) {
      this._cancelMovement();
    }

    const hasSpeed = this.options.speed > 0;
    const hasQueue = this._queue.length > 0;

    if (hasQueue && hasSpeed && this.isInitialized) {
      this._startTransitions(this._queue);
    } else if (hasQueue) {
      this._styleImmediately(this._queue);

      this._dispatch(Shuffle.EventType.LAYOUT); // A call to layout happened, but none of the newly visible items will
      // change position or the transition duration is zero, which will not trigger
      // the transitionend event.

    } else {
      this._dispatch(Shuffle.EventType.LAYOUT);
    } // Remove everything in the style queue


    this._queue.length = 0;
  }
  /**
   * Wait for each transition to finish, the emit the layout event.
   * @param {Object[]} transitions Array of transition objects.
   */


  _startTransitions(transitions) {
    // Set flag that shuffle is currently in motion.
    this.isTransitioning = true; // Create an array of functions to be called.

    const callbacks = transitions.map(obj => this._getTransitionFunction(obj));
    arrayParallel(callbacks, this._movementFinished.bind(this));
  }

  _cancelMovement() {
    // Remove the transition end event for each listener.
    this._transitions.forEach(cancelTransitionEnd); // Reset the array.


    this._transitions.length = 0; // Show it's no longer active.

    this.isTransitioning = false;
  }
  /**
   * Apply styles without a transition.
   * @param {Object[]} objects Array of transition objects.
   * @private
   */


  _styleImmediately(objects) {
    if (objects.length) {
      const elements = objects.map(obj => obj.item.element);

      Shuffle._skipTransitions(elements, () => {
        objects.forEach(obj => {
          obj.item.applyCss(obj.styles);
          obj.callback();
        });
      });
    }
  }

  _movementFinished() {
    this._transitions.length = 0;
    this.isTransitioning = false;

    this._dispatch(Shuffle.EventType.LAYOUT);
  }
  /**
   * The magic. This is what makes the plugin 'shuffle'
   * @param {string|string[]|function(Element):boolean} [category] Category to filter by.
   *     Can be a function, string, or array of strings.
   * @param {SortOptions} [sortOptions] A sort object which can sort the visible set
   */


  filter(category, sortOptions) {
    if (!this.isEnabled) {
      return;
    }

    if (!category || category && category.length === 0) {
      category = Shuffle.ALL_ITEMS; // eslint-disable-line no-param-reassign
    }

    this._filter(category); // Shrink each hidden item


    this._shrink(); // How many visible elements?


    this._updateItemCount(); // Update transforms on visible elements so they will animate to their new positions.


    this.sort(sortOptions);
  }
  /**
   * Gets the visible elements, sorts them, and passes them to layout.
   * @param {SortOptions} [sortOptions] The options object to pass to `sorter`.
   */


  sort() {
    let sortOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastSort;

    if (!this.isEnabled) {
      return;
    }

    this._resetCols();

    const items = sorter(this._getFilteredItems(), sortOptions);
    this.sortedItems = items;

    this._layout(items); // `_layout` always happens after `_shrink`, so it's safe to process the style
    // queue here with styles from the shrink method.


    this._processQueue(); // Adjust the height of the container.


    this._setContainerSize();

    this.lastSort = sortOptions;
  }
  /**
   * Reposition everything.
   * @param {object} options options object
   * @param {boolean} [options.recalculateSizes=true] Whether to calculate column, gutter, and container widths again.
   * @param {boolean} [options.force=false] By default, `update` does nothing if the instance is disabled. Setting this
   *    to true forces the update to happen regardless.
   */


  update() {
    let {
      recalculateSizes = true,
      force = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.isEnabled || force) {
      if (recalculateSizes) {
        this._setColumns();
      } // Layout items


      this.sort();
    }
  }
  /**
   * Use this instead of `update()` if you don't need the columns and gutters updated
   * Maybe an image inside `shuffle` loaded (and now has a height), which means calculations
   * could be off.
   */


  layout() {
    this.update({
      recalculateSizes: true
    });
  }
  /**
   * New items have been appended to shuffle. Mix them in with the current
   * filter or sort status.
   * @param {Element[]} newItems Collection of new items.
   */


  add(newItems) {
    const items = arrayUnique(newItems).map(el => new ShuffleItem(el, this.options.isRTL)); // Add classes and set initial positions.

    this._initItems(items); // Determine which items will go with the current filter.


    this._resetCols();

    const allItems = this._mergeNewItems(items);

    const sortedItems = sorter(allItems, this.lastSort);

    const allSortedItemsSet = this._filter(this.lastFilter, sortedItems);

    const isNewItem = item => items.includes(item);

    const applyHiddenState = item => {
      item.scale = ShuffleItem.Scale.HIDDEN;
      item.isHidden = true;
      item.applyCss(ShuffleItem.Css.HIDDEN.before);
      item.applyCss(ShuffleItem.Css.HIDDEN.after);
    }; // Layout all items again so that new items get positions.
    // Synchonously apply positions.


    const itemPositions = this._getNextPositions(allSortedItemsSet.visible);

    allSortedItemsSet.visible.forEach((item, i) => {
      if (isNewItem(item)) {
        item.point = itemPositions[i];
        applyHiddenState(item);
        item.applyCss(this.getStylesForTransition(item, {}));
      }
    });
    allSortedItemsSet.hidden.forEach(item => {
      if (isNewItem(item)) {
        applyHiddenState(item);
      }
    }); // Cause layout so that the styles above are applied.

    this.element.offsetWidth; // eslint-disable-line no-unused-expressions
    // Add transition to each item.

    this.setItemTransitions(items); // Update the list of items.

    this.items = this._mergeNewItems(items); // Update layout/visibility of new and old items.

    this.filter(this.lastFilter);
  }
  /**
   * Disables shuffle from updating dimensions and layout on resize
   */


  disable() {
    this.isEnabled = false;
  }
  /**
   * Enables shuffle again
   * @param {boolean} [isUpdateLayout=true] if undefined, shuffle will update columns and gutters
   */


  enable() {
    let isUpdateLayout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.isEnabled = true;

    if (isUpdateLayout) {
      this.update();
    }
  }
  /**
   * Remove 1 or more shuffle items.
   * @param {Element[]} elements An array containing one or more
   *     elements in shuffle
   * @return {Shuffle} The shuffle instance.
   */


  remove(elements) {
    if (!elements.length) {
      return;
    }

    const collection = arrayUnique(elements);
    const oldItems = collection.map(element => this.getItemByElement(element)).filter(item => !!item);

    const handleLayout = () => {
      this._disposeItems(oldItems); // Remove the collection in the callback


      collection.forEach(element => {
        element.parentNode.removeChild(element);
      });

      this._dispatch(Shuffle.EventType.REMOVED, {
        collection
      });
    }; // Hide collection first.


    this._toggleFilterClasses({
      visible: [],
      hidden: oldItems
    });

    this._shrink(oldItems);

    this.sort(); // Update the list of items here because `remove` could be called again
    // with an item that is in the process of being removed.

    this.items = this.items.filter(item => !oldItems.includes(item));

    this._updateItemCount();

    this.once(Shuffle.EventType.LAYOUT, handleLayout);
  }
  /**
   * Retrieve a shuffle item by its element.
   * @param {Element} element Element to look for.
   * @return {?ShuffleItem} A shuffle item or undefined if it's not found.
   */


  getItemByElement(element) {
    return this.items.find(item => item.element === element);
  }
  /**
   * Dump the elements currently stored and reinitialize all child elements which
   * match the `itemSelector`.
   */


  resetItems() {
    // Remove refs to current items.
    this._disposeItems(this.items);

    this.isInitialized = false; // Find new items in the DOM.

    this.items = this._getItems(); // Set initial styles on the new items.

    this._initItems(this.items);

    this.once(Shuffle.EventType.LAYOUT, () => {
      // Add transition to each item.
      this.setItemTransitions(this.items);
      this.isInitialized = true;
    }); // Lay out all items.

    this.filter(this.lastFilter);
  }
  /**
   * Destroys shuffle, removes events, styles, and classes
   */


  destroy() {
    this._cancelMovement();

    if (this._resizeObserver) {
      this._resizeObserver.unobserve(this.element);

      this._resizeObserver = null;
    } // Reset container styles


    this.element.classList.remove('shuffle');
    this.element.removeAttribute('style'); // Reset individual item styles

    this._disposeItems(this.items);

    this.items.length = 0;
    this.sortedItems.length = 0;
    this._transitions.length = 0; // Null DOM references

    this.options.sizer = null;
    this.element = null; // Set a flag so if a debounced resize has been triggered,
    // it can first check if it is actually isDestroyed and not doing anything

    this.isDestroyed = true;
    this.isEnabled = false;
  }
  /**
   * Returns the outer width of an element, optionally including its margins.
   *
   * There are a few different methods for getting the width of an element, none of
   * which work perfectly for all Shuffle's use cases.
   *
   * 1. getBoundingClientRect() `left` and `right` properties.
   *   - Accounts for transform scaled elements, making it useless for Shuffle
   *   elements which have shrunk.
   * 2. The `offsetWidth` property.
   *   - This value stays the same regardless of the elements transform property,
   *   however, it does not return subpixel values.
   * 3. getComputedStyle()
   *   - This works great Chrome, Firefox, Safari, but IE<=11 does not include
   *   padding and border when box-sizing: border-box is set, requiring a feature
   *   test and extra work to add the padding back for IE and other browsers which
   *   follow the W3C spec here.
   *
   * @param {Element} element The element.
   * @param {boolean} [includeMargins=false] Whether to include margins.
   * @return {{width: number, height: number}} The width and height.
   */


  static getSize(element) {
    let includeMargins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false; // Store the styles so that they can be used by others without asking for it again.

    const styles = window.getComputedStyle(element, null);
    let width = getNumberStyle(element, 'width', styles);
    let height = getNumberStyle(element, 'height', styles);

    if (includeMargins) {
      const marginLeft = getNumberStyle(element, 'marginLeft', styles);
      const marginRight = getNumberStyle(element, 'marginRight', styles);
      const marginTop = getNumberStyle(element, 'marginTop', styles);
      const marginBottom = getNumberStyle(element, 'marginBottom', styles);
      width += marginLeft + marginRight;
      height += marginTop + marginBottom;
    }

    return {
      width,
      height
    };
  }
  /**
   * Change a property or execute a function which will not have a transition
   * @param {Element[]} elements DOM elements that won't be transitioned.
   * @param {function} callback A function which will be called while transition
   *     is set to 0ms.
   * @private
   */


  static _skipTransitions(elements, callback) {
    const zero = '0ms'; // Save current duration and delay.

    const data = elements.map(element => {
      const {
        style
      } = element;
      const duration = style.transitionDuration;
      const delay = style.transitionDelay; // Set the duration to zero so it happens immediately

      style.transitionDuration = zero;
      style.transitionDelay = zero;
      return {
        duration,
        delay
      };
    });
    callback(); // Cause forced synchronous layout.

    elements[0].offsetWidth; // eslint-disable-line no-unused-expressions
    // Put the duration back

    elements.forEach((element, i) => {
      element.style.transitionDuration = data[i].duration;
      element.style.transitionDelay = data[i].delay;
    });
  }

}

Shuffle.ShuffleItem = ShuffleItem;
Shuffle.ALL_ITEMS = 'all';
Shuffle.FILTER_ATTRIBUTE_KEY = 'groups';
/** @enum {string} */

Shuffle.EventType = {
  LAYOUT: 'shuffle:layout',
  REMOVED: 'shuffle:removed'
};
/** @enum {string} */

Shuffle.Classes = Classes;
/** @enum {string} */

Shuffle.FilterMode = {
  ANY: 'any',
  ALL: 'all'
}; // Overrideable options

Shuffle.options = {
  // Initial filter group.
  group: Shuffle.ALL_ITEMS,
  // Transition/animation speed (milliseconds).
  speed: 250,
  // CSS easing function to use.
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  // e.g. '.picture-item'.
  itemSelector: '*',
  // Element or selector string. Use an element to determine the size of columns
  // and gutters.
  sizer: null,
  // A static number or function that tells the plugin how wide the gutters
  // between columns are (in pixels).
  gutterWidth: 0,
  // A static number or function that returns a number which tells the plugin
  // how wide the columns are (in pixels).
  columnWidth: 0,
  // If your group is not json, and is comma delimited, you could set delimiter
  // to ','.
  delimiter: null,
  // Useful for percentage based heights when they might not always be exactly
  // the same (in pixels).
  buffer: 0,
  // Reading the width of elements isn't precise enough and can cause columns to
  // jump between values.
  columnThreshold: 0.01,
  // Shuffle can be initialized with a sort object. It is the same object
  // given to the sort method.
  initialSort: null,
  // Transition delay offset for each item in milliseconds.
  staggerAmount: 15,
  // Maximum stagger delay in milliseconds.
  staggerAmountMax: 150,
  // Whether to use transforms or absolute positioning.
  useTransforms: true,
  // Affects using an array with filter. e.g. `filter(['one', 'two'])`. With "any",
  // the element passes the test if any of its groups are in the array. With "all",
  // the element only passes if all groups are in the array.
  // Note, this has no effect if you supply a custom filter function.
  filterMode: Shuffle.FilterMode.ANY,
  // Attempt to center grid items in each row.
  isCentered: false,
  // Attempt to align grid items to right.
  isRTL: false,
  // Whether to round pixel values used in translate(x, y). This usually avoids
  // blurriness.
  roundTransforms: true
};
Shuffle.Point = Point;
Shuffle.Rect = Rect; // Expose for testing. Hack at your own risk.

Shuffle.__sorter = sorter;
Shuffle.__getColumnSpan = getColumnSpan;
Shuffle.__getAvailablePositions = getAvailablePositions;
Shuffle.__getShortColumn = getShortColumn;
Shuffle.__getCenteredPositions = getCenteredPositions;

;// CONCATENATED MODULE: ./src/js/application.js
var $ = __webpack_require__(/*! jquery */ 3836);

var SVGInjector = __webpack_require__(/*! svg-injector */ 4581);

var fastClick = __webpack_require__(/*! fastclick */ 1489);


var app = {
  loadApplication: function loadApplication() {
    var that = this;
    var touch = !!("ontouchstart" in document.documentElement || navigator.msMaxTouchPoints > 0);
    $(".view").on("click", function (e) {
      e.preventDefault();
      return false;
    });

    if (touch) {
      return fastClick.attach(document.body);
    }

    this.centerGrid();
    window.addEventListener("resize", function () {
      that.centerGrid();
    }, true);
  },
  svgInjector: function svgInjector() {
    var mySVGsToInject = document.querySelectorAll("img.inject-me");
    return SVGInjector(mySVGsToInject);
  },
  worksFilter: function worksFilter() {
    var grid = document.getElementById("work-grid");
    var sizer = document.getElementsByClassName("shuffle__sizer")[0];
    var btns = document.getElementsByClassName("svg-wrapper");

    if (grid) {
      var shfl = new Shuffle(grid, {
        itemSelector: ".work-item",
        easing: "ease-in-out",
        sizer: sizer,
        speed: 600
      });
      Array.from(btns).forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          var group, isActive;
          e.preventDefault();
          isActive = btn.classList.contains("active");

          if (isActive) {
            return false;
          } else {
            group = btn.getElementsByTagName("a")[0].getAttribute("data-group");
            $(".active").removeClass("active");
            btn.classList.toggle("active");
            shfl.filter(group);
          }
        });
      });
    }
  },
  centerGrid: function centerGrid() {
    var width = window.innerWidth;
    var count = 0;
    var margin = (count - 1) * 15;
    var total = 1127;

    if (width < total) {
      count = Math.floor(width / 270);
      margin = (count - 1) * 15;
      total = count * 270 + margin;
    }

    if (document.getElementById("work-grid")) {
      document.getElementById("work-grid").style.width = total + "px";
    }

    if (document.getElementById("grid-box-container")) {
      document.getElementById("grid-box-container").style.width = total + "px";
    }
  }
};
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(3379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(3565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(9216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(4589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].oneOf[3].use[2]!./node_modules/typeface-roboto/index.css
var typeface_roboto = __webpack_require__(6582);
;// CONCATENATED MODULE: ./node_modules/typeface-roboto/index.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(typeface_roboto/* default */.Z, options);




       /* harmony default export */ const node_modules_typeface_roboto = (typeface_roboto/* default */.Z && typeface_roboto/* default.locals */.Z.locals ? typeface_roboto/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/index.js
__webpack_require__(/*! ./scss/main.scss */ 6492);



var workViewer = __webpack_require__(/*! ./js/work-viewer.js */ 9086);

var animate = __webpack_require__(/*! ./js/animate.js */ 3001);


document.addEventListener("DOMContentLoaded", function () {
  app.loadApplication();
  app.svgInjector();
  workViewer.init();
  animate.scrollArrow(); // if (window.innerWidth === "1920") {
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
})();

/******/ })()
;