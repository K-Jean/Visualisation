import Node from "./node.mjs";
import Spring from "./spring.mjs";


var w = 200;
var h = 200;


var bigSize = 60;
var medSize = 50;
var smallSize= 35;

var node = 0;
var desktop = 1;
var android = 2;
var web =3;


var shortdistance = 50;
var distmult = 3;

export default class {


    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;

        this.nodes = [];
        this.springs = [];
    }

    setup(p5) {
        var c = p5.createCanvas(this.w, this.h);
        c.parent("canvas3");
        this.nodes.push(new Node((this.w/2),(this.h/2),'Dark Vador',true,smallSize,node,p5));

        this.nodes.push(new Node((this.nodes[0].location.x+Math.random()*100),(this.nodes[0].location.y+Math.random()*100),'Rafael Naciri',false,smallSize,android,p5));
        this.addConnection(0,p5.random(shortdistance,shortdistance*distmult));

        this.nodes.push(new Node((this.nodes[0].location.x+Math.random()*100),(this.nodes[0].location.y+Math.random()*100),'Mathieu Hirel',false,smallSize,web,p5));
        this.addConnection(0,p5.random(shortdistance,shortdistance*distmult));

        this.nodes.push(new Node((this.nodes[1].location.x+Math.random()*100),(this.nodes[1].location.y+Math.random()*100),'Winnie L\'ourson',false,smallSize,desktop,p5));
        this.addConnection(1,p5.random(shortdistance,shortdistance*distmult));

    };

    draw(p5) {
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
        p5.background(0);

        for (var i = 0 ; i < this.springs.length ; i++){
            this.springs[i].update(p5);
            this.springs[i].display(p5);
        }

        for (var i = 0 ; i < this.nodes.length ; i++){
            this.nodes[i].update(p5);
            this.nodes[i].display(p5);

            for (var j = 0 ; j < this.nodes.length ; j++){
                if (i!=j) this.nodes[i].attract(this.nodes[j],p5);
            }
        }

        p5.noFill();
        p5.stroke(255);
    }


    addConnection(index,l){
        this.springs.push( new Spring(this.nodes[index], this.nodes[this.nodes.length-1],l));
    }
}