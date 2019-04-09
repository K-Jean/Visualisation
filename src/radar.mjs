const w = 200;
const h = 200;
let datapoints1 = [20,50,60,10, 5, 20, 80, 50];
let datapoints2 = [30, 50, 65, 20, 10, 30, 80, 50];

function drawRadar(p5, datapoints) {
    let angle = p5.TWO_PI / datapoints.length;
    p5.beginShape();
    let i = 0;
    for (let a = 0; a < p5.TWO_PI; a += angle) {
        let sx = p5.cos(a) * datapoints[i];
        let sy = p5.sin(a) * datapoints[i];
        p5.vertex(sx, sy);
        i++;
    }
    p5.endShape(p5.CLOSE);
}

export default class {

    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;
    }

    setup(p5) {
        const c = p5.createCanvas(this.w, this.h);
        c.position(this.x, this.y);
    };

    draw(p5) {
        p5.background(0, 255, 0);
        p5.stroke(0);
        p5.noFill();
        p5.translate(w / 2, h / 2);
        for (let i = 0; i < 10; i++) {
            drawRadar(p5, Array(datapoints2.length).fill(10 * i));
        }
        p5.stroke(255, 0, 0);
        drawRadar(p5,datapoints1);
        p5.stroke(255, 255, 0);
        drawRadar(p5, datapoints2);
    }
}
