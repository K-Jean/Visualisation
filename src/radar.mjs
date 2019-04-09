var w = 200;
var h = 200;

export default function (p5) {
    p5.setup = function () {
        var c = p5.createCanvas(w, h);
        c.position(0, h);
    };

    p5.draw = function () {
        p5.background(0,255,0);
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
}
