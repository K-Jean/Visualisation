var w = 1300;
var h = 1000;
var authorCount = [];
var datarows;
var minAuthorCount;
var maxAuthorCount;
var titleLength = [];
var minTitleLength;
var maxTitleLength;

function preload(){
    table = loadTable("../data/authors-affiliations-cleaned-March-25-2019.csv","csv","header");
}

function setup() {

    var inp = createInput('');
    inp.input(myInputEvent);


    // put setup code here
    var can = createCanvas(w,h);
    can.position(0, inp.height);
    background(210);

    console.log("Total row: ", table.getRowCount());
    console.log("Total column: ", table.getColumnCount());

    datarows = table.findRows("2018","Year");
    console.log(datarows);
    console.log("2018 paper count : ", datarows.length);

    calculateAuthorCounts();
    calculateTitleLength()
}

function draw() {
    // put drawing code here
    var pubDrawingSize = max(textWidth("InfoVis"),textWidth("VAST"),textWidth("SciVis"))+5;
    var x = 0;
    var y = pubDrawingSize * 0.5;
    var margin = 50;
    for(var i=0;i<datarows.length;i++){
        if(i!= 0 ){
            x = x + pubDrawingSize + margin;
        }else{
            x = x + pubDrawingSize;
        }
        if(x>w - pubDrawingSize){
            x=pubDrawingSize;
            y = y +pubDrawingSize + margin;
        }
        drawPublication(x,y,pubDrawingSize,datarows[i].obj.Conference,i);

    }
}

function drawPublication(x,y,size,label,pubIndex){
    stroke(255);
    var mouseOver = testMouseOver(x,y,size*0.5);

    if(mouseOver){
        fill(110);
    }else{
        fill(210);
    }
    ellipse(x,y,size);


    stroke(0);
    drawingAngle = 30;
    lineLength = map(authorCount[pubIndex],minAuthorCount,maxAuthorCount,3,size);
    drawLineAtAngle(x+size*0.5*cos(drawingAngle),y+size*0.5*sin(drawingAngle),lineLength,drawingAngle)

    stroke(150);
    drawingTitleAngle = 60;
    lineTitleLength = map(titleLength[pubIndex],minTitleLength,maxTitleLength,3,size);
    drawLineAtAngle(x+size*0.5*cos(drawingTitleAngle),y+size*0.5*sin(drawingTitleAngle),lineTitleLength,drawingTitleAngle)

    fill(255);
    noStroke();
    textAlign(CENTER,CENTER)
    text(label,x,y);


}

function calculateAuthorCounts(){
    authorCount=[];
    for(var i = 0;i<datarows.length;i++){
        authorCount.push(split(datarows[i].get("AuthorNames-Deduped"),";").length);
    }
    minAuthorCount = min(authorCount);
    maxAuthorCount = max(authorCount);
}

function calculateTitleLength(){
    titleLength=[];
    for(var i = 0;i<datarows.length;i++){
        titleLength.push(datarows[i].get("Year").length);
    }
    minTitleLength = min(titleLength);
    maxTitleLength = max(titleLength);
}

function drawLineAtAngle(startx,starty,length,angle){
    angleMode(DEGREES);
    endx = startx+length*cos(angle);
    endy = starty+length*sin(angle);
    line(startx,starty,endx,endy);
}

function testMouseOver(x,y,rad){
    if(dist(mouseX,mouseY,x,y)<rad){
        return true;
    }
    return false;
}
function myInputEvent() {
    console.log('you are typing: ', this.value());
}
