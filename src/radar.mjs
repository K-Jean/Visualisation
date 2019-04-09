var w = 200;
var h = 200;

export default class {

    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;
    }

    setup(p5) {
        var c = p5.createCanvas(this.h, this.w);
        c.parent("canvas2");
    };

    draw(p5) {
        p5.background(0, 255, 0);
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
}
