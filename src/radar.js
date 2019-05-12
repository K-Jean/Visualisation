let datalabels = ["Mechanics", "Bio", "Info", "Something", "Other", "Nothing"];
let datapoints1 = [20,50,60,10, 5, 20];
let datapoints2 = [30, 50, 65, 20, 10, 30];

function drawRadar(p5, datapoints, rangeMin, rangeMax) {
    let angle = p5.TWO_PI / datapoints.length;
    p5.beginShape();
    let i = 0;
    for (let a = 0; a < p5.TWO_PI; a += angle) {
        let r = p5.map(datapoints[i], 0, 100, rangeMin, rangeMax);
        let sx = p5.cos(a) * r;
        let sy = p5.sin(a) * r;
        p5.vertex(sx, sy);
        i++;
    }
    p5.endShape(p5.CLOSE);
}

function drawRadarLabels(p5, labels, rangeMin, rangeMax) {
    let angle = p5.TWO_PI / labels.length;
    p5.beginShape();
    let i = 0;
    for (let a = 0; a < p5.TWO_PI; a += angle) {
        let r = p5.map(101, 0, 100, rangeMin, rangeMax);
        let sx = p5.cos(a) * r;
        let sy = p5.sin(a) * r;
        if(p5.cos(a) < 0) {
            sx -= labels[i].length * 4;
        }
        p5.text(labels[i], sx, sy);
        i++;
    }
    p5.endShape(p5.CLOSE);
}

function drawRadarAxes(p5, n, rangeMin, rangeMax) {
    let angle = p5.TWO_PI / n;
    let i = 0;
    for (let a = 0; a < p5.TWO_PI; a += angle) {
        let r = p5.map(100, 0, 100, rangeMin, rangeMax);
        let sx = p5.cos(a) * r;
        let sy = p5.sin(a) * r;
        p5.line(0,0, sx, sy);
        i++;
    }
}

class Radar {

    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;
    }

    setup(p5) {
        const c = p5.createCanvas(this.w, this.h);
        c.parent("canvas2");
        const d1 = p5.createInput("2018-01-01", "date");
        const d2 = p5.createInput("2019-01-01", "date");
        d1.elt.classList.add("date-input");
        d2.elt.classList.add("date-input");
        d1.elt.style.backgroundColor = "red";
        d2.elt.style.backgroundColor = "yellow";
        d1.position(c.position().x + 10, 250 + c.position().y + this.h / 4 - d1.elt.offsetHeight);
        d2.position(c.position().x + 10, 250 + c.position().y + this.h * 3/4 - d2.elt.offsetHeight);
    };

    draw(p5) {
        p5.background(255);
        p5.rect(0,0,this.w - 10,this.h-2,20);
        p5.stroke(0);
        p5.noFill();
        p5.translate(this.w / 2, this.h / 2);
        drawRadarLabels(p5, datalabels, 0, this.h / 2 - 20);
        p5.stroke(255, 255, 0);
        p5.fill(255, 255, 0);
        drawRadar(p5, datapoints2, 0, this.h/2 - 20);
        p5.stroke(255, 0, 0);
        p5.fill(255, 0, 0);
        drawRadar(p5,datapoints1, 0, this.h/2 - 20);
        p5.stroke(0);
        p5.noFill();
        for (let i = 0; i < 10; i++) {
            drawRadar(p5, Array(datapoints2.length).fill(10 * i), 0, this.h/2-20);
        }
        drawRadarAxes(p5, datapoints1.length, 0, this.h / 2 - 20);
    }
}
