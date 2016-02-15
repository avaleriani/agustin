$(document).ready(function () {

    var controller = new ScrollMagic.Controller();

    var p1 = {x: 510, y: 560};
    var p2 = {x: 1365, y: 560};
    var p3 = {x: 1365, y: 960};
    var p4 = {x: 1365, y: 1000};
    var p5 = {x: 505, y: 1000};

    var p6 = {x: 505, y: 1020};
    var p7 = {x: 460, y: 1020};
    var p8 = {x: 460, y: 1045};
    var p9 = {x: 430, y: 1046};
    var p10 = {x: 430, y: 1700};
    var p11 = {x: 1520, y: 1700};

    var p12 = {x: 1520, y: 2055};

    /* lines */
    var p13 = {x: 470, y: 1701};
    var p14 = {x: 470, y: 1720};

    var p15 = {x: 810, y: 1701};
    var p16 = {x: 810, y: 1720};

    var p17 = {x: 1165, y: 1701};
    var p18 = {x: 1165, y: 1720};
    /* lines end */

    var p19 = {x: 1520, y: 2300};
    var p20 = {x: 950, y: 2300};
    var p21 = {x: 950, y: 2405};

    /* separated */
    var p22 = {x: 380, y: 2405};
    var p23 = {x: 1500, y: 2405};

    var p24 = {x: 380, y: 3400};
    var p25 = {x: 1500, y: 3400};

    /* end separated */


    var p26 = {x: 485, y: 3400};

    var p27 = {x: 485, y: 3445};

    var p28 = {x: 700, y: 3445};
    var p29 = {x: 700, y: 3495};


    var p30 = {x: 700, y: 3530};
    var p31 = {x: 1499, y: 3530};
    var p32 = {x: 700, y: 3530};

    var p33 = {x: 1500, y: 3493};
    var p34 = {x: 1500, y: 4400};
    var p35 = {x: 950, y: 4400};

    var p36 = {x: 950, y: 4462};
    var p37 = {x: 950, y: 4550};
    var p38 = {x: 890, y: 4525};
    var p39 = {x: 1005, y: 4525};


    var duration = 1400,
        c1 = '#000000',
        c2 = '#ffffff';


    createLine(p1, p2, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p1, p2) + "px"
        }, duration);

    createLine(p2, p3, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p2, p3) + "px"
        }, duration);

    createLine(p3, p4, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p3, p4) + "px"
        }, duration);

    createLine(p4, p5, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p4, p5) + "px"
        }, duration);

    createLine(p5, p6, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p5, p6) + "px"
        }, duration);

    createLine(p6, p7, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p6, p7) + "px"
        }, duration);

    createLine(p7, p8, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p7, p8) + "px"
        }, duration);

    createLine(p8, p9, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p8, p9) + "px"
        }, duration);

    createLine(p9, p10, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p9, p10) + "px"
        }, duration);

    createLine(p10, p11, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p10, p11) + "px"
        }, duration);

    createLine(p11, p12, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p11, p12) + "px"
        }, duration);

    /* lines */
    createLine(p13, p14, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p13, p14) + "px"
        }, duration);

    createLine(p15, p16, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p15, p16) + "px"
        }, duration);

    createLine(p17, p18, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p17, p18) + "px"
        }, duration);

    /* lines end */

    createLine(p12, p19, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p12, p19) + "px"
        }, duration);

    createLine(p19, p20, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p19, p20) + "px"
        }, duration);

    createLine(p20, p21, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p20, p21) + "px"
        }, duration);

    createLine(p21, p22, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p21, p22) + "px"
        }, duration);

    createLine(p21, p23, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p21, p23) + "px"
        }, duration);

    createLine(p22, p24, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p22, p24) + "px"
        }, duration);

    createLine(p23, p25, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p23, p25) + "px"
        }, duration);


    createLine(p24, p26, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p24, p26) + "px"
        }, duration);


    createLine(p23, p25, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p23, p25) + "px"
        }, duration);

    createLine(p26, p27, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p26, p27) + "px"
        }, duration);

    createLine(p27, p28, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p27, p28) + "px"
        }, duration);

    createLine(p28, p29, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p28, p29) + "px"
        }, duration);


    createLine(p29, p30, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p29, p30) + "px"
        }, duration);


    createLine(p30, p31, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p30, p31) + "px"
        }, duration);


    createLine(p31, p32, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p31, p32) + "px"
        }, duration);

    createLine(p25, p33, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p25, p33) + "px"
        }, duration);

    createLine(p33, p34, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p33, p34) + "px"
        }, duration);


    createLine(p34, p35, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p34, p35) + "px"
        }, duration);

    createLine(p35, p36, c1)
        .appendTo('body')
        .animate({
            width: calculateLenght(p35, p36) + "px"
        }, duration);

    createLine(p36, p37, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p36, p37) + "px"
        }, duration);

    createLine(p37, p38, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p37, p38) + "px"
        }, duration);
    createLine(p37, p39, c2)
        .appendTo('body')
        .animate({
            width: calculateLenght(p37, p39) + "px"
        }, duration);

});


function createLineElement(point, color, angle, lenght) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid ' + color + '; '
        + 'width: ' + lenght + 'px; '
        + 'height: 0px; '
        + 'position: absolute; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'top: ' + point.y + 'px; '
        + 'left: ' + point.x + 'px; '
        + 'opacity: 0.5';
    line.setAttribute('style', styles);

    return $(line);
}

function createLine(pointA, pointB, color) {
    var length = calculateLenght(pointA, pointB);

    var sx = (pointA.x + pointB.x) / 2,
        sy = (pointA.y + pointB.y) / 2;

    var point = {x: sx - length / 2, y: sy};


    var a = pointA.x - pointB.x,
        b = pointA.y - pointB.y;
    var angle = Math.PI - Math.atan2(-b, a);


    return createLineElement(point, color, angle, lenght);
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
