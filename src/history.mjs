let maxKeyMoments = 6;
let widthHistory = 0;
let heightHistory = 0;
let startingPointX = 0;
let startingPointY = 0;
let widthColonne = 0;
const paddingRight = 100;

export default class {

    constructor(h, w, x, y) {
        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;
    }

    preload(p5){
        this.images = {
            article : p5.loadImage('../assets/article.png'),
            nothing : p5.loadImage('../assets/more.png'),
            diploma : p5.loadImage('../assets/diploma.png'),
        }
    }

    setup(p5) {
        let c = p5.createCanvas(this.w, this.h);
        c.position(this.x, this.y);
        widthHistory = this.x+this.w-20-paddingRight;
        heightHistory = this.y+this.h-60;
        startingPointX = 10;
        startingPointY = this.y+this.h-50;
        widthColonne = widthHistory/maxKeyMoments;
    }

    draw(p5) {
        p5.background(255);
        //p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
        p5.fill(255);
        p5.stroke(0);
        p5.rect(0,0,this.w-2-paddingRight,this.h-2,20);
        p5.stroke(0, 0, 0);
        p5.line(startingPointX,startingPointY,startingPointX+widthHistory,startingPointY,6);
        p5.line(startingPointX,startingPointY,startingPointX,startingPointY-heightHistory,6);
        p5.line(startingPointX+widthHistory,startingPointY,startingPointX+widthHistory,startingPointY-heightHistory,6);
        //
        // TODO : read csv to build history array
        let historyArray = ["article","diploma","article","nothing","article","article"];
        let historyDescriptionArray = [
            "First article",
            "My PhD in something",
            "My most quoted article",
            "",
            "A new topic",
            "My last article",
        ];
        // MAX 6 key moments
        let currentXpos = startingPointX;
        let xPosLabel = 0;
        let yPosLabel = startingPointY+15;
        let xPosIcone = 0;
        let yPosIcone = startingPointY-heightHistory/2;
        let taille = widthColonne/2-5;
        for(let i=0;i<maxKeyMoments;i++){
            xPosLabel = currentXpos+widthColonne/2;
            xPosIcone = currentXpos+widthColonne/2;
            currentXpos += widthColonne;
            p5.stroke(0, 0, 0);
            p5.line(currentXpos,startingPointY,currentXpos,startingPointY-heightHistory,6);
            // Creation du label
            let date = 2016;
            p5.fill(0);
            p5.noStroke();
            p5.textAlign(CENTER,CENTER);
            p5.text(date+i,xPosLabel,yPosLabel);
            // Creation de l'icone
            p5.stroke(0);
            p5.fill(255);
            p5.circle(xPosIcone, yPosIcone, taille);
            p5.imageMode(CENTER);
            p5.image(this.images[historyArray[i]], xPosIcone, yPosIcone,taille, taille);
        }
        currentXpos = startingPointX;
        for(let i=0;i<maxKeyMoments;i++){
            // hovering of the icone
            xPosIcone = currentXpos+widthColonne/2;
            currentXpos += widthColonne;
            let mouseOver = this.testMouseOver(xPosIcone,yPosIcone+taille/2,taille);
            if(mouseOver) {
                if (historyDescriptionArray[i] !== "") {
                    p5.fill(255);
                    p5.stroke(0);
                    let hRect = 20;
                    let wRect = p5.textWidth(historyDescriptionArray[i]) + 5;
                    p5.rect(xPosIcone, yPosIcone - taille - hRect - 10, wRect, hRect, 5);
                    p5.fill(0);
                    p5.noStroke();
                    p5.textAlign(LEFT, CENTER);
                    p5.text(historyDescriptionArray[i], xPosIcone + 2, yPosIcone - taille - hRect);
                }
            }
        }
    }

    testMouseOver(x,y,rad){
        if(dist(mouseX,mouseY,x,y)<rad){
            return true;
        }
        return false;
    }
}