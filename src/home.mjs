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


    var posX = windowWidth/splitfactor;


    var inp = createInput('');
    inp.input(myInputEvent);
    inp.position(0,0);


    var history = new History(200,800,0, inp.height);
    var radar = new Radar(200,200,0, inp.height + 200);
    var spider = new Spider(200,200,0, inp.height + 400);

    var div = createDiv();
    div.position(posX*2,div.height);
    div.child(createImg('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00d7051ab900532c076d12bc6bfcda24b7bfd427_full.jpg'));

    console.log(history);
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

window.setup = setup;