class Spring {
    constructor(fNode, tNode, len, lineWeight) {
        this.fromNode = fNode;
        this.toNode = tNode;

        this.length = len;
        this.stiffness = 0.15;
        this.damping = 0.55;

        this.step = 0.0075;
        this.lineWeight = lineWeight;
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
        p5.stroke(0);
        p5.strokeWeight(this.lineWeight);

        p5.line(this.fromNode.location.x, this.fromNode.location.y, this.toNode.location.x, this.toNode.location.y);

        p5.pop();
    }
}
