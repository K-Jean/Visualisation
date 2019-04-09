import history from "./history.mjs";
import radar from "./radar.mjs";
import spider from "./spider.mjs";

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

    var div = createDiv();
    div.position(posX*2,div.height);
    div.child(createImg('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00d7051ab900532c076d12bc6bfcda24b7bfd427_full.jpg'));

    console.log(history);
    var s1 = new p5(history);
    var s2 = new p5(radar);
    var s3 = new p5(spider);
}

function myInputEvent() {
    console.log('you are typing: ', this.value());
    saveCanvas();
}


function draw() {

}

window.setup = setup;
window.draw = draw;