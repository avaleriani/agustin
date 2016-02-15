$(document).ready(function () {
    /*
     var controller = new ScrollMagic.Controller();

     new ScrollMagic.Scene({
     duration: 100,  // the scene should last for a scroll distance of 100px
     offset: 50      // start this scene after scrolling for 50px
     })
     ;
     var scene = new ScrollMagic.Scene({
     triggerElement: "#page-about"
     })
     .setTween("#animate1", 0.5, {backgroundColor: "green", scale: 2.5}) // trigger a TweenMax.to tween
     .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
     .addTo(controller);
     */

    var p1 = {x: 510, y: 560};
    var p2 = {x: 1365, y: 560};
    var p3 = {x: 1365, y: 900};

    var p4 = {x: 420, y: 1053};
    var p5 = {x: 420, y: 1120};
    var p6 = {x: 390, y: 1120};

    var duration = 1400,
        c1 = 'red',
        c2 = 'white';

    createLine(p1, p2, c1)
        .appendTo('body')
        .animate({width: calculateLenght(p1, p2)}, duration);

    createLine(p2, p3, c1)
        .appendTo('body')
        .animate({height: calculateLenght(p2, p3)}, duration);

    /*createLine(p3, p4)
     .appendTo('body')
     .animate({width: calculateLenght(p3, p4)}, duration);

     createLine(p4, p5)
     .appendTo('body')
     .animate({width: calculateLenght(p4, p5)}, duration);*/


});


function createLineElement(point, color) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid ' + color + '; '
        + 'width: 0px; '
        + 'height: 0px; '
        + 'position: absolute; '
        + 'top: ' + point.y + 'px; '
        + 'left: ' + point.x + 'px; ';
    line.setAttribute('style', styles);

    return $(line);
}

function createLine(pointA, pointB, color) {
    var length = calculateLenght(pointA, pointB);

    var sx = (pointA.x + pointB.x) / 2,
        sy = (pointA.y + pointB.y) / 2;

    var point = {x: sx - length / 2, y: sy};

    return createLineElement(point, color);
}

function calculateLenght(p1, p2) {
    var pa = p1.x - p2.x,
        pb = p1.y - p2.y;
    return Math.sqrt(pa * pa + pb * pb);
}


//TODO::borrar
document.onmousemove = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    document.title = x + "-" + y;
};
