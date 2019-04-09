let datalabels = ["Tardis", "Time Lord", "Companion", "Master", "Gallifrey", "River Song", "Timey-Wimey", "Weeping Angels"];
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

function drawRadarLabels(p5, labels) {
    let angle = p5.TWO_PI / labels.length;
    p5.beginShape();
    let i = 0;
    for (let a = 0; a < p5.TWO_PI; a += angle) {
        let sx = p5.cos(a) * 101;
        let sy = p5.sin(a) * 101;
        if(p5.cos(a) < 0) {
            sx -= labels[i].length * 4;
        }
        p5.text(labels[i], sx, sy);
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
        const d1 = p5.createInput("2018-01-01", "date");
        const d2 = p5.createInput("2019-01-01", "date");
        d1.position(this.x, this.y + this.h / 4);
        d2.position(this.x, this.y + this.h * 3/4);
    };

    draw(p5) {
        p5.background(0, 255, 0);
        p5.stroke(0);
        p5.noFill();
        p5.translate(this.w / 2, this.h / 2);
        for (let i = 0; i < 10; i++) {
            drawRadar(p5, Array(datapoints2.length).fill(10 * i));
        }
        drawRadarLabels(p5, datalabels);
        p5.stroke(255, 0, 0);
        drawRadar(p5,datapoints1);
        p5.stroke(255, 255, 0);
        drawRadar(p5, datapoints2);
    }
}
