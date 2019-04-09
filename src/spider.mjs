import Node from "./node.mjs";
import Spring from "./spring.mjs";


const paddingRight = 100;

var w = 200;
var h = 200;


var bigSize = 60;
var medSize = 50;
var smallSize = 35;

var node = 0;
var desktop = 1;
var android = 2;
var web = 3;


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
        this.table = undefined;
        this.autor = "Donna J. Cox";
    }

    change_autor(new_autor) {
        this.autor = new_autor;
        this.nodes = [];
        this.springs = [];
        this.setup(this.p5);
    }

    preload(p5) {
        this.table = p5.loadTable("../data/IEEE VIS papers 1990-2018 - Main dataset.csv", "csv", "header");
    }

    setup(p5) {
        this.p5 = p5;
        var autor_list = this.table.getColumn("AuthorNames-Deduped");
        var co_autors = [];
        autor_list.forEach(elem => {
            var list_co = elem.split(";");
            if (list_co.includes(this.autor)) {
                list_co.forEach(autor => {
                    if (autor !== this.autor) {
                        co_autors.push(autor);
                    }
                })
            }
        });

        var c = p5.createCanvas(this.w, this.h);
        c.parent("canvas3");

        this.nodes.push(new Node((this.w / 2), (this.h / 2), this.autor, true, smallSize, node, p5));

        co_autors.forEach(elem => {
            this.nodes.push(new Node((this.nodes[0].location.x + Math.random() * 100), (this.nodes[0].location.y + Math.random() * 100), elem, false, Math.random() * (60 - 25) + 25, 2, p5));
            this.addConnection(0, p5.random(shortdistance, shortdistance * distmult));
        });
    };

    draw(p5) {
        p5.background(255);
        //p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
        p5.fill(255);
        p5.stroke(0);
        p5.rect(0, 0, this.w - 2 - paddingRight, this.h - 2, 20);
        p5.stroke(0, 0, 0);

        for (var i = 0; i < this.springs.length; i++) {
            this.springs[i].update(p5);
            this.springs[i].display(p5);
        }

        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].update(p5);
            this.nodes[i].display(p5);

            for (var j = 0; j < this.nodes.length; j++) {
                if (i != j) this.nodes[i].attract(this.nodes[j], p5);
            }
        }

        p5.noFill();
        p5.stroke(255);
    }


    addConnection(index, l) {
        this.springs.push(new Spring(this.nodes[index], this.nodes[this.nodes.length - 1], l));
    }
}