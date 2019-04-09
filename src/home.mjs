import History from "./history.mjs";
import Radar from "./radar.mjs";
import Spider from "./spider.mjs";

var w = 200;
var h = 200;
var authorCount = [];
var datarows;
var minAuthorCount;
var maxAuthorCount;
var titleLength = [];
var minTitleLength;
var maxTitleLength;
var splitfactor = 3;

function setup() {

    createCanvas(0,0);

    var posX = windowWidth/splitfactor;


    var history = new History(200,800,0, 0);
    var radar = new Radar(300,1000,0, 200);
    var spider = new Spider(400,800,0, 400);

    var s1 = new p5(function(p5){
        p5.preload = function(){
            history.preload(p5);
        }
        p5.setup = function(){
            history.setup(p5);
        }
        p5.draw = function(){
            history.draw(p5);
        }
    });

    var s2 = new p5(function(p5){
        p5.setup = function(){
            radar.setup(p5);
        }
        p5.draw = function(){
            radar.draw(p5);
        }
    });
    var s3 = new p5(function(p5){
        p5.setup = function(){
            spider.setup(p5);
        }
        p5.draw = function(){
            spider.draw(p5);
        }
    });
}

function myInputEvent() {
    console.log('you are typing: ', this.value());
    saveCanvas();
}


function draw() {
}

window.setup = setup;
window.draw = draw;