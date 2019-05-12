let wordCloud = [];
let years = [];

async function dlWords(p5) {

}

async function getWords() {
    wordCloud.sort((a, b) => {
        return a.weight - b.weight;
    });
    return wordCloud.filter((value, index) => {
        return index < 10;
    });
}

function rectsIntersect(x0, y0, w0, h0, x1, y1, w1, h1) {
    const X1 = Math.max(x0 - w0, x1 - w1);
    const X2 = Math.min(x0 + w0, x1 + w1);
    const Y1 = Math.max(y0 - h0, y1 - h1);
    const Y2 = Math.min(y0 + h0, y1 + h1);
    return X1 < X2 && Y1 < Y2;
}

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Word {
    constructor(x, y, w, h, text, weight) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.weight = weight;
    }

    push(word) {
        if (ellipseEllipse(this.x, this.y, this.w, this.h, word.x, word.y, word.w, word.h)) {

        }
        return new Vector(0, 0, 0);
    }
}

class WordCloud {
    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;
    }

    preload(p5) {
        this.table = p5.loadTable("../data/IEEE VIS papers 1990-2018 - Main dataset.csv", "csv", 'header');
    }

    setup(p5) {
        this.years = this.table.getColumn("Year").filter((value, index, array) => {
            return array.lastIndexOf(value) === index;
        });
        this.years.sort();
        const c = p5.createCanvas(this.w, this.h);
        c.parent("canvas2");
        this.slider = document.getElementById("slider");
        this.ticks = document.getElementById("ticks");
        //this.slider.style('width', `${this.w - 2}px`);
    }

    setAuthor(author) {
        const years = [];
        this.author = author;
        const keywords = [];
        const weightedKeywords = {};
        for (let year of this.years) {
            const rows = this.table.findRows(year, "Year");
            for (let row of rows) {
                let authors = row.getString("AuthorNames-Deduped").split(";").concat(row.getString("AuthorNames").split(";"));
                if(!authors.includes(author)) {
                    continue;
                }
                if(years.indexOf(year) === -1) {
                    years.push(year);
                }
                let abstract = row.getString('Abstract');
                abstract = abstract.replace(".", " ").replace(",", " ");
                const words = abstract.split(/(\s|\W)+/i);
                for (const word of words) {
                    if (word.length > 3) {
                        if (word.match(/^(either|which|while|have|were|where|them|they|their|these|those|very|also|during|thought|although|through|three|four|five|seven|eight|nine|eleven|twelve)$/i) === null) {
                            keywords.push(word.toLowerCase());
                        }
                    }
                }
                const weightedKeywordsPerYear = [];
                for (const word of keywords) {
                    let count = 0;
                    for (let dupe of keywords) {
                        if (dupe === word) {
                            count++;
                        }
                    }
                    const index = keywords.findIndex(value => {
                        return value.word === word;
                    });
                    if (index === -1) {
                        weightedKeywordsPerYear.push({word: word, weight: count / keywords.length, authors: authors});
                    }
                }
                weightedKeywords[year] = weightedKeywordsPerYear;
            }
        }
        this.slider.min = years[0];
        this.slider.max = years[years.length - 1];
        this.slider.value = years[years.length - 1];
        this.ticks.childNodes.forEach(value => {
            this.ticks.removeChild(value);
        });
        for(const year of years) {
            const option = document.createElement("option");
            option.innerHTML = year;
            this.ticks.append(option);
        }
        this.words = weightedKeywords;
        this.year = 0;
        this.update(years[years.length - 1]);
    }

    update(year) {
        if(year === undefined || year === this.year) {
            return
        }
        this.year = year;
        document.getElementById("slider-label").innerText = year;
        wordCloud = [];
        let words = [];
        for(const y in this.words) {
            if(this.words.hasOwnProperty(y) && y <= year) {
                words = words.concat(this.words[y]);
            }
        }
        if(!words) {
            return;
        }
        for (let word of words) {
            if (!word.word) {
                continue;
            }
            const index = wordCloud.findIndex(value => {
                return value.text === word.word;
            });
            if (index > -1) {
                wordCloud[index].weight += word.weight;
            } else {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                wordCloud.push(new Word(x, y, 0, 0, word.word, word.weight));
            }
        }
    }

    draw(p5) {
        p5.background(255);
        p5.rect(0, 0, this.w - 2, this.h - 2, 20);
        p5.stroke(0);
        p5.noFill();
        const year = this.slider.value;
        this.update(year);
        getWords().then(words => {
            p5.textAlign(p5.CENTER);
            let width = 0;
            const drawnWords = [];
            for (let data of words) {
                if (!data.text) {
                    continue;
                }
                const size = p5.map(data.weight, 0, 1, 50, 150);
                p5.textSize(size);
                width = p5.textWidth(data.text);
                const x = p5.map(data.x, 0, 100, width + 2, this.w - 2 - width);
                const y = p5.map(data.y, 0, 100, size + 2, this.h - 2 - size);
                const word = Object.assign({}, data);
                word.x = x;
                word.y = y;
                word.w = width;
                word.h = size;
                /*p5.stroke('red');
                p5.text(word.text, word.x, word.y);*/
                const velocity = p5.createVector(0, 0);
                let overlap = false;
                const newWord = Object.assign({}, word);
                for (let other of drawnWords) {
                    let iterations = 0;
                    do {
                        iterations++;
                        //rectsIntersect(newWord.x, newWord.y, newWord.w, newWord.h, other.x, other.y, other.w, other.h)
                        if (p5.dist(newWord.x, newWord.y, other.x, other.y) < (newWord.h + newWord.w)) {
                            overlap = true;
                            const df = p5.createVector(newWord.x, newWord.y);
                            df.sub(p5.createVector(other.x, other.y));
                            df.mult(0.2);
                            velocity.x += df.x;
                            velocity.y += df.y;
                        } else {
                            overlap = false;
                        }
                        if (p5.dist(0, 0, velocity.x, velocity.y) > 1) {
                            if (newWord.x + velocity.x < this.w - 2 - word.w) {
                                newWord.oldX = word.x;
                                newWord.x += velocity.x;
                            }
                            if (newWord.y + velocity.y < this.h - 2 - word.h) {
                                newWord.oldY = word.y;
                                newWord.y += velocity.y;
                            }
                            /*p5.stroke('red');
                            p5.text(newWord.text, newWord.x, newWord.y);*/
                        } else {
                            overlap = false;
                        }
                    } while (overlap && iterations < 100);
                }
                if (velocity.x > 0 || velocity.y > 0) {
                    if (word.x + velocity.x < this.w - 2 - word.w) {
                        word.oldX = word.x;
                        word.x += velocity.x;
                    }
                    if (word.y + velocity.y < this.h - 2 - word.h) {
                        word.oldY = word.y;
                        word.y += velocity.y;
                    }
                }
                if (word.x !== Infinity && word.y !== Infinity) {
                    p5.stroke(0);
                    p5.text(word.text, word.x, word.y);
                    const padding = 10;
                    //p5.ellipse(word.x - padding / 4, word.y - word.h / 2.5, word.w + padding, word.h * 2);
                    drawnWords.push(word);
                }
                if (Math.abs(word.oldX) !== Infinity && Math.abs(word.x) === Infinity || Math.abs(word.oldY) !== Infinity && Math.abs(word.y) === Infinity) {
                    console.log("Something went wrong", word);
                    word.oldX = Infinity;
                    word.oldY = Infinity;
                }
            }
        });
    }
}