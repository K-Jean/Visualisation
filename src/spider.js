/* adapted from :
// M_6_1_01.pde
// Node.pde
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/

var smallSize = 35;

var node = 0;


var shortdistance = 100;
var distmult = 3;

class Spider {


    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;

        this.nodes = [];
        this.springs = [];
        this.autor = "";
    }

    change_autor(new_autor) {
        this.autor = new_autor;
        this.nodes = [];
        this.springs = [];
        this.setup(this.p5);
    }

    preload(p5) {
        this.p5 = p5;
        this.autor_citation = {};
        this.co_autor = {};
        p5.loadTable("data/IEEE VIS papers 1990-2018 - Main dataset.csv", "csv", "header", table => {
            for (let r = 0; r < table.getRowCount(); r++) {
                let elem = table.getString(r,"AuthorNames-Deduped");
                var list_co = elem.split(";");
                list_co.forEach(autor => {
                    if (!this.co_autor.hasOwnProperty(autor)) {
                        this.co_autor[autor] = {};
                    }
                    list_co.forEach(autor2 => {
                        if (autor !== autor2) {
                            if (!this.co_autor[autor].hasOwnProperty(autor2)) {
                                this.co_autor[autor][autor2] = {};
                                this.co_autor[autor][autor2].ecrit = [];
                                this.co_autor[autor][autor2].id = 0;
                            }
                            this.co_autor[autor][autor2].id += 1;
                            this.co_autor[autor][autor2].ecrit.push(table.getString(r,"Title"));
                        }
                    });
                });
            }
        });
        p5.loadTable("data/Author_Citation.csv", "csv", "header", table => {
            for (let r = 0; r < table.getRowCount(); r++) {
                var autors = table.getString(r, 0);
                var list_co = autors.split(";");
                list_co.forEach(autor => {
                    this.autor_citation[autor] = (this.autor_citation[autor] || 0) + (parseInt(table.getString(r, 1)) || 0);
                })
            }
        });

    }

    setup(p5) {
        var c = p5.createCanvas(this.w, this.h);
        c.parent("canvas3");

        this.nodes.push(new Node((this.w / 2), (this.h / 2), this.w, this.h, this.autor, true, smallSize, node, p5, true));

        for (let key in this.co_autor[this.autor]) {
            this.nodes.push(new Node((this.nodes[0].location.x + Math.random() * 100), (this.nodes[0].location.y + Math.random() * 100), this.w, this.h, key, false, (this.autor_citation[key] / 2500) * 30 + 20, 2, p5, false));
            this.addConnection(0, p5.random(shortdistance, shortdistance * distmult), this.co_autor[this.autor][key].id);
        }
    };

    draw(p5) {
        p5.background(255);
        //p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
        p5.fill(255);
        p5.stroke(0);
        p5.rect(0, 0, this.w - 2, this.h - 2, 20);
        p5.stroke(0, 0, 0);

        for (let i = 0; i < this.springs.length; i++) {
            this.springs[i].update(p5);
            this.springs[i].display(p5);
        }

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].update(p5);
            this.nodes[i].display(p5);

            for (let j = 0; j < this.nodes.length; j++) {
                if (i != j) this.nodes[i].attract(this.nodes[j], p5);
            }
        }

        p5.noFill();
        p5.stroke(255);
        this.nodes.forEach(node => {
            if (node.isInside(p5.mouseX, p5.mouseY)) {
                this.drawTooltip(p5,5,5, node);
            }
        });
    }

    drawTooltip(p5, x, y, node) {
        if(this.co_autor[this.autor].hasOwnProperty(node.id)) {
            p5.fill(255);
            p5.stroke(0);
            let hRect = 20 + 25 * (this.co_autor[this.autor][node.id].ecrit.length + 1);
            let wRect = p5.textWidth(node.id) + 20;
            this.co_autor[this.autor][node.id].ecrit.forEach((pub) => {
                wRect = Math.max(wRect, p5.textWidth(pub) + 20);
            });
            p5.rect(x + 10, y + 5, wRect, hRect, 5);
            p5.fill(0);
            p5.noStroke();
            p5.textAlign(p5.LEFT, p5.CENTER);
            p5.text(node.id, x + wRect / 2 - p5.textWidth(node.id), y + 25);
            this.co_autor[this.autor][node.id].ecrit.forEach((pub, index) => {
                p5.text(pub, x + 20, y + 25 * (index + 2));
                wRect = Math.max(wRect, p5.textWidth(pub) + 20);
            });
        }
    }

    addConnection(index, l, lineWeight) {
        this.springs.push(new Spring(this.nodes[index], this.nodes[this.nodes.length - 1], l, lineWeight));
    }

    mousePressed(p5) {
        // Check if mouse is inside the circle
        this.nodes.forEach(node => {
            if (node.isInside(p5.mouseX, p5.mouseY)) {
                refreshEverything(node.id);
            }
        });
    }
}
