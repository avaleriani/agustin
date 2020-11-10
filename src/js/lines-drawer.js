//TODO: deprecated in favor of library lines-draw. This file will be deleted.

var $ = require("../node_modules/jquery");
var shortid = require("../node_modules/shortid");
var scrollMagic = require("../node_modules/scrollmagic");
var linesDrawer = {
  lines: [],

  createAllLines: function (appendId) {
    var p1 = { x: 510, y: 560 };
    var p2 = { x: 1365, y: 560 };
    var p3 = { x: 1365, y: 960 };
    var p4 = { x: 1365, y: 1000 };
    var p5 = { x: 505, y: 1000 };
    var p6 = { x: 505, y: 1020 };
    var p7 = { x: 460, y: 1020 };
    var p8 = { x: 460, y: 1045 };
    var p9 = { x: 430, y: 1046 };
    var p10 = { x: 430, y: 1700 };
    var p11 = { x: 1520, y: 1700 };
    var p12 = { x: 1520, y: 2055 };
    /* lines */
    var p13 = { x: 470, y: 1701 };
    var p14 = { x: 470, y: 1720 };
    var p15 = { x: 810, y: 1701 };
    var p16 = { x: 810, y: 1720 };
    var p17 = { x: 1165, y: 1701 };
    var p18 = { x: 1165, y: 1720 };
    /* lines end */
    var p19 = { x: 1520, y: 2300 };
    var p20 = { x: 950, y: 2300 };
    var p21 = { x: 950, y: 2405 };
    var p22 = { x: 380, y: 2405 };
    var p23 = { x: 1500, y: 2405 };
    var p24 = { x: 380, y: 3400 };
    var p25 = { x: 1500, y: 3400 };
    var p26 = { x: 485, y: 3400 };
    var p27 = { x: 485, y: 3445 };
    var p28 = { x: 700, y: 3445 };
    var p29 = { x: 700, y: 3495 };
    var p30 = { x: 700, y: 3530 };
    var p31 = { x: 1499, y: 3530 };
    var p32 = { x: 700, y: 3530 };
    var p33 = { x: 1500, y: 3493 };
    var p34 = { x: 1500, y: 4400 };
    var p35 = { x: 950, y: 4400 };
    var p36 = { x: 950, y: 4462 };
    var p37 = { x: 950, y: 4550 };
    var p38 = { x: 890, y: 4500 };
    var p39 = { x: 1005, y: 4500 };

    var c1 = "#000000",
      c2 = "#ffffff";

    this.createLine(p1, p2, c2).appendTo(appendId);
    this.createLine(p2, p3, c2).appendTo(appendId);
    this.createLine(p3, p4, c1).appendTo(appendId);
    this.createLine(p4, p5, c1).appendTo(appendId);
    this.createLine(p5, p6, c1).appendTo(appendId);
    this.createLine(p6, p7, c1).appendTo(appendId);
    this.createLine(p7, p8, c1).appendTo(appendId);
    this.createLine(p8, p9, c1).appendTo(appendId);
    this.createLine(p9, p10, c1).appendTo(appendId);
    this.createLine(p10, p11, c1).appendTo(appendId);
    /* triple lines */
    this.createLine(p13, p14, c1).appendTo(appendId);
    this.createLine(p15, p16, c1).appendTo(appendId);
    this.createLine(p17, p18, c1).appendTo(appendId);
    /* triple lines end */
    this.createLine(p11, p12, c1).appendTo(appendId);
    this.createLine(p12, p19, c2).appendTo(appendId);
    this.createLine(p19, p20, c2).appendTo(appendId);
    this.createLine(p20, p21, c2).appendTo(appendId);
    this.createLine(p21, p22, c2).appendTo(appendId);
    this.createLine(p21, p23, c2).appendTo(appendId);
    this.createLine(p22, p24, c2).appendTo(appendId);
    this.createLine(p23, p25, c2).appendTo(appendId);
    this.createLine(p24, p26, c2).appendTo(appendId);
    this.createLine(p23, p25, c2).appendTo(appendId);
    this.createLine(p26, p27, c2).appendTo(appendId);
    this.createLine(p27, p28, c2).appendTo(appendId);
    this.createLine(p28, p29, c2).appendTo(appendId);
    this.createLine(p29, p30, c1).appendTo(appendId);
    this.createLine(p30, p31, c1).appendTo(appendId);
    this.createLine(p31, p32, c1).appendTo(appendId);
    this.createLine(p25, p33, c2).appendTo(appendId);
    this.createLine(p33, p34, c1).appendTo(appendId);
    this.createLine(p34, p35, c1).appendTo(appendId);
    this.createLine(p35, p36, c1).appendTo(appendId);
    this.createLine(p36, p37, c2).appendTo(appendId);
    this.createLine(p37, p38, c2).appendTo(appendId);
    this.createLine(p37, p39, c2).appendTo(appendId);
  },

  createLine: function (pointA, pointB, color) {
    var uuid = shortid.generate();
    var length,
      height,
      width,
      float = "left";
    var line = document.createElement("div");
    var pointX = pointA.x;

    length = this.calculateLenght(pointA, pointB);
    if (this.calculateDirection(pointA, pointB) == "horizontal") {
      height = "2px";
      width = length;
    } else {
      height = length;
      width = "2px";
    }
    if (this.calculateLoR(pointA, pointB) == "right") {
      float = "right";
      if (pointA.x > pointB.x) {
        float = "right";
        pointX = window.innerWidth - width - pointB.x - 19;
      }
    }

    var styles =
      "border: 1px solid " +
      color +
      "; " +
      "width: " +
      width +
      "px; " +
      "height: " +
      height +
      "px;" +
      "top: " +
      pointA.y +
      "px; " +
      float +
      ": " +
      pointX +
      "px; " +
      "float: " +
      float +
      "; ";
    line.setAttribute("style", styles);
    line.setAttribute("id", "point_" + uuid);
    line.setAttribute("class", "drawed_line");
    this.lines.push($(line));

    return $(line);
  },

  calculateLenght: function (p1, p2) {
    var pa = p1.x - p2.x,
      pb = p1.y - p2.y;
    return Math.sqrt(pa * pa + pb * pb);
  },

  calculateDirection: function (p1, p2) {
    var pa = p1.x - p2.x;
    if (pa == 0) {
      return "vertical";
    } else {
      return "horizontal";
    }
  },

  //Calculate if line direction is left or right
  calculateLoR: function (p1, p2) {
    if (p1.x > p2.x) {
      return "right";
    } else {
      return "left";
    }
  },

  //calculate if line direction is up or down
  calculateUoD: function (p1, p2) {
    if (p1.y > p2.y) {
      return "up";
    } else {
      return "down";
    }
  },

  scrollAnimate: function () {
    var duration = 400;
    var counter = 0;
    var controller = new scrollMagic.ScrollMagic.Controller();

    $.each(linesDrawer.lines, function () {
      var $obj = $("#point_" + counter);
      var height = $obj.css("height");
      var width = $obj.css("width");
      $obj.css("height", "0");
      $obj.css("width", "0");
      new scrollMagic.ScrollMagic.Scene({ triggerElement: "#trigger" + counter })
        .setVelocity("#point_" + counter, { opacity: 1, width: width, height: height }, { duration: duration })
        .addTo(controller);
      counter = counter + 1;
    });
  },

  mouseCoordenatesOnTitle: function () {
    document.onmousemove = function (e) {
      var cursorX = e.pageX;
      var cursorY = e.pageY;
      $("title").html("x:" + cursorX + " - y:" + cursorY);
    };
  },
};

module.exports = linesDrawer;
