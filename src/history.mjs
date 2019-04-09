var authorCount = [];
var datarows;
var minAuthorCount;
var maxAuthorCount;
var titleLength = [];
var minTitleLength;
var maxTitleLength;
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
        c.parent("canvas1");
    };

    draw(p5) {
        p5.background(255, 0, 0);
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
}