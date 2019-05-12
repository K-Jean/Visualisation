class Spring {
    constructor(fNode, tNode, len) {
        this.fromNode = fNode;
        this.toNode = tNode;

        this.length = len;
        console.log(len);
        this.stiffness = 0.15;
        this.damping = 0.55;

        this.noiseFx = random(500);
        this.noiseFy = random(500);
        this.step = 0.0075;

        this.c1XNoise;
        this.c1YNoise;
        this.c2XNoise;
        this.c2YNoise;
    }

    update(p5) {
        // calculate the target position
        // target = normalize(to - from) * length + from
        var diff = p5.createVector(this.toNode.location.x,this.toNode.location.y,0);
        diff.sub(this.fromNode.location);
        diff.normalize();
        diff.mult(this.length);

        var target = p5.createVector(this.fromNode.location.x,this.fromNode.location.y,0);
        target.add(diff);

        var force = p5.createVector(target.x,target.y);
        force.sub(this.toNode.location);
        force.mult(0.5);
        force.mult(this.stiffness);
        force.mult(1 - this.damping);

        this.toNode.velocity.add(force);
        force.mult(-1);
        this.fromNode.velocity.add(force);
    }

    display(p5) {
        p5.push();
        p5.fill(0,0,0);
        p5.stroke(255);
        this.noiseFx += this.step;
        this.noiseFy += this.step;

        this.c1XNoise = p5.map(p5.noise(this.noiseFx, 10, 20), 0, 1, -150, 150);
        this.c1YNoise = p5.map(p5.noise(this.noiseFy, 2, 87), 0, 1, -150, 150);
        this.c2XNoise = p5.map(p5.noise(this.noiseFx, 5, 12), 0, 1, -150, 150);
        this.c2YNoise = p5.map(p5.noise(this.noiseFy, 15, 30), 0, 1, -150, 150);

        p5.curve(this.fromNode.location.x + this.c1XNoise, this.fromNode.location.y + this.c1YNoise,
            this.fromNode.location.x, this.fromNode.location.y,
            this.toNode.location.x, this.toNode.location.y,
            this.toNode.location.x + this.c2XNoise, this.toNode.location.y + this.c2YNoise);
        p5.pop();
    }
}
