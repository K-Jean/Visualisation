export default class {

    constructor(x, y, id, anchor, diam, type, p5) {
        // ------   properties ------
        // if needed, an ID for the node
        this.id = id;
        this.diameter = diam || 25;
        this.type = type || 0;

        this.minX = 0;
        this.maxX = 800;
        this.minY = 0;
        this.maxY = 400;
        this.maxVelocity = 2;

        this.velocity = p5.createVector(0, 0, 0);
        this.pVelocity = p5.createVector(0,0,0);

        this.damping = 0.5;
        // radius of impact
        this.radius = diam * 1.1;
        // strength: positive for attraction, negative for repulsion (default for Nodes)
        this.strength = 15;
        // parameter that influences the form of the function
        this.ramp = 1.0;

        this.location = p5.createVector(x, y, 0);

        this.overMe = false;
        this.page;

        this.displayLabel = true;
        this.anchor = anchor;

        this.alpha = 50;
        this.highlight = false;
    }

    attract(theNode,p5) {
        var d = p5.dist(this.location.x, this.location.y, theNode.location.x, theNode.location.y);

        if (d > 0 && d < this.radius) {
            var s = p5.pow(d / this.radius, 1 / this.ramp);
            var f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
            var df = p5.createVector(this.location.x, this.location.y);
            df.sub(theNode.location);
            df.mult(f);

            this.velocity.x += df.x;
            this.velocity.y += df.y;
            this.velocity.z += df.z;
        }
    }

    display(p5) {
        p5.push();


        if (this.type == 0) {
            p5.noStroke();
            p5.fill(248, 252, 193);
            p5.ellipse(this.location.x, this.location.y, this.diameter / 4, this.diameter / 4);
            p5.fill(248, 252, 193, this.alpha);
            p5.ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
            p5.fill(248, 252, 193);
            if (this.displayLabel == true) {
                p5.textSize(20)
                p5.text(this.id, this.location.x - this.diameter / 2, this.location.y - this.diameter);
            }
        } else if (this.type == 1) {
            p5.rectMode(p5.CENTER);
            p5.noStroke();
            p5.fill(44, 147 * 2, 167 * 2);
            p5.rect(this.location.x, this.location.y, this.diameter / 4, this.diameter / 4);
            p5.fill(22 * 2, 147 * 2, 167 * 2, this.alpha);
            p5.rect(this.location.x, this.location.y, this.diameter * 2 / 3, this.diameter * 2 / 3);
            p5.fill(22 * 2, 147 * 2, 167 * 2);
            if (this.displayLabel == true) {
                p5.textSize(20)
                p5.text(this.id, this.location.x - this.diameter / 2, this.location.y - this.diameter);
            }
        } else if (this.type == 2) {
            p5.noStroke();
            p5.fill(230, 120, 30);
            this.tri(this.location.x, this.location.y, this.diameter / 3, this.diameter / 3, p5);
            p5.fill(230, 120, 30, this.alpha + 25);
            this.tri(this.location.x, this.location.y, this.diameter, this.diameter, p5);
            p5.fill(230, 120, 30);
            if (this.displayLabel == true) {
                p5.textSize(20)
                p5.text(this.id, this.location.x - this.diameter / 2, this.location.y - this.diameter, p5);
            }
        } else if (this.type == 3) {
            p5.rectMode(CENTER);
            p5.noStroke();
            p5.fill(204, 24, 100);
            this.star(this.location.x, this.location.y, this.diameter / 3, this.diameter / 3, p5);
            p5.fill(204, 24, 100, this.alpha + 25);
            this.star(this.location.x, this.location.y, this.diameter * 0.8, this.diameter * 0.8, p5);
            p5.fill(204, 24, 100);
            if (this.displayLabel == true) {
                p5.textSize(20)
                p5.text(this.id, this.location.x - this.diameter / 2, this.location.y - this.diameter);
            }
        }
        p5.pop();
    }

    tri(x, y, w, h, p5) {
        p5.beginShape();
        for (var i = -p5.PI / 2; i < p5.PI / 2 + 2 * p5.PI; i += 2 * p5.PI / 3) {
            var xpos = x + w / 2 * p5.cos(i);
            var ypos = y + w / 2 * p5.sin(i);
            p5.vertex(xpos, ypos);
        }
        p5.endShape();

    }

    star(x, y, w, h, p5) {
        p5.beginShape();
        for (var i = -p5.PI / 2; i < p5.PI / 2 + 2 * p5.PI; i += 2 * p5.PI / 6) {
            var xpos = x + 2 * w * p5.cos(i);
            var ypos = y + 2 * w * p5.sin(i);
            var xin1 = x + 2 * w / 3.5 * p5.cos(i);
            var yin1 = y + 2 * w / 3.5 * p5.sin(i);
            var xin2 = x - 2 * w / 3.5 * p5.cos(i);
            var yin2 = y - 2 * w / 3.5 * p5.sin(i);
            p5.curveVertex(xin2, yin2);
            p5.curveVertex(xpos, ypos);
            p5.curveVertex(xin1, yin1);
        }
        p5.endShape();

    }

    update() {
        this.velocity.limit(this.maxVelocity);

        this.pVelocity.set(this.velocity);

        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
        this.location.z += this.velocity.z;


        if (this.location.x < this.minX) {
            this.location.x = this.minX - (this.location.x - this.minX);
            this.velocity.x = -this.velocity.x;
        }
        if (this.location.x > this.maxX) {
            this.location.x = this.maxX - (this.location.x - this.maxX);
            this.velocity.x = -this.velocity.x;
        }

        if (this.location.y < this.minY) {
            this.location.y = this.minY - (this.location.y - this.minY);
            this.velocity.y = -this.velocity.y;
        }
        if (this.location.y > this.maxY) {
            this.location.y = this.maxY - (this.location.y - this.maxY);
            this.velocity.y = -this.velocity.y;
        }
        /*
        if (this.location.z < this.minZ) {
          this.location.z = this.minZ - (this.location.z - this.minZ);
          this.velocity.z = -this.velocity.z;
        }
        if (this.location.z > this.maxZ) {
          this.location.z = this.maxZ - (this.location.z - this.maxZ);
          this.velocity.z = -this.velocity.z;
        } */

        this.velocity.mult(1 - this.damping);
    }

}