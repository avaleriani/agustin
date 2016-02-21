var lines = [];
var cont = 0;

$(document).ready(function () {

    if (window.innerWidth == '1920') { //todo:: fix mobile
        createAllLines();
        scrollAnimate();
    } else {
        alert(window.innerWidth); //todo: borrar esto
    }
});

function createAllLines() {

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
    var p22 = {x: 380, y: 2405};
    var p23 = {x: 1500, y: 2405};
    var p24 = {x: 380, y: 3400};
    var p25 = {x: 1500, y: 3400};
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
    var p38 = {x: 890, y: 4500};
    var p39 = {x: 1005, y: 4500};

    var c1 = '#000000',
        c2 = '#ffffff';

    var appendId = '#lines-container';

    createLine(p1, p2, c2).appendTo(appendId);
    createLine(p2, p3, c2).appendTo(appendId);
    createLine(p3, p4, c1).appendTo(appendId);
    createLine(p4, p5, c1).appendTo(appendId);
    createLine(p5, p6, c1).appendTo(appendId);
    createLine(p6, p7, c1).appendTo(appendId);
    createLine(p7, p8, c1).appendTo(appendId);
    createLine(p8, p9, c1).appendTo(appendId);
    createLine(p9, p10, c1).appendTo(appendId);
    createLine(p10, p11, c1).appendTo(appendId);
    /* lines */
    createLine(p13, p14, c1).appendTo(appendId);
    createLine(p15, p16, c1).appendTo(appendId);
    createLine(p17, p18, c1).appendTo(appendId);
    /* lines end */
    createLine(p11, p12, c1).appendTo(appendId);
    createLine(p12, p19, c2).appendTo(appendId);
    createLine(p19, p20, c2).appendTo(appendId);
    createLine(p20, p21, c2).appendTo(appendId);
    createLine(p21, p22, c2).appendTo(appendId);
    createLine(p21, p23, c2).appendTo(appendId);
    createLine(p22, p24, c2).appendTo(appendId);
    createLine(p23, p25, c2).appendTo(appendId);
    createLine(p24, p26, c2).appendTo(appendId);
    createLine(p23, p25, c2).appendTo(appendId);
    createLine(p26, p27, c2).appendTo(appendId);
    createLine(p27, p28, c2).appendTo(appendId);
    createLine(p28, p29, c2).appendTo(appendId);
    createLine(p29, p30, c1).appendTo(appendId);
    createLine(p30, p31, c1).appendTo(appendId);
    createLine(p31, p32, c1).appendTo(appendId);
    createLine(p25, p33, c2).appendTo(appendId);
    createLine(p33, p34, c1).appendTo(appendId);
    createLine(p34, p35, c1).appendTo(appendId);
    createLine(p35, p36, c1).appendTo(appendId);
    createLine(p36, p37, c2).appendTo(appendId);
    createLine(p37, p38, c2).appendTo(appendId);
    createLine(p37, p39, c2).appendTo(appendId);

}
// TODO:: ver como hacer para que las lineas sean mobile, supongo que multiplicando por un numero magico que de 0 en la resolucion que lo hice

function createLine(pointA, pointB, color) {

    var length, height, width, float = 'left';
    var line = document.createElement("div");
    var pointX = pointA.x;

    length = calculateLenght(pointA, pointB);
    if (calculateDirection(pointA, pointB) == 'horizontal') {
        height = '2px';
        width = length;
    } else {
        height = length;
        width = '2px';
    }
    if (calculateLor(pointA, pointB) == 'right') {
        float = 'right';
        if (pointA.x > pointB.x) {
            float = 'right';
            console.log(pointA.x, width, window.innerWidth);
            pointX = window.innerWidth - width - pointB.x - 19;
        }
    }

    var styles = 'border: 1px solid ' + color + '; '
        + 'width: ' + width + 'px; '
        + 'height: ' + height + 'px;'
        + 'top: ' + pointA.y + 'px; '
        + float + ': ' + pointX + 'px; '
        + 'float: ' + float + '; ';
    line.setAttribute('style', styles);
    line.setAttribute('id', "point_" + cont);
    line.setAttribute('class', 'drawed_line');
    lines.push($(line));
    cont = cont + 1;

    return $(line);
}
//test
document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
    $('title').html('x:' + cursorX + ' - y:' + cursorY);
}

//test

function calculateLenght(p1, p2) {
    var pa = p1.x - p2.x,
        pb = p1.y - p2.y;
    return Math.sqrt(pa * pa + pb * pb);
}

function calculateDirection(p1, p2) {
    var pa = p1.x - p2.x;
    if (pa == 0) {
        return 'vertical';
    } else {
        return 'horizontal';
    }
}

function calculateLor(p1, p2) {
    if (p1.x > p2.x) {
        return 'right';
    } else {
        return 'left';
    }
}

function scrollAnimate() {
    var duration = 600;
    var counter = 0;
    var controller = new ScrollMagic.Controller();

    $.each(lines, function (e) {
        var $obj = $("#point_" + counter);
        var height = $obj.css('height');
        var width = $obj.css('width');
        $obj.css('height', '0');
        $obj.css('width', '0');
        var scene = new ScrollMagic.Scene({triggerElement: '#trigger' + counter})
            .setVelocity("#point_" + counter, {'opacity': 1, width: width, height: height}, {duration: duration})
            // .addIndicators()
            .addTo(controller);
        counter = counter + 1;
    });

}