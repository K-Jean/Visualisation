var w = 200;
var h = 200;
var author_name;
let table;
function preload() {
    table = loadTable("data/authors-affiliations-cleaned-March-25-2019.csv","csv","header");
}

let updateWorks = function () {

};

function setup() {
    loadTable('data/IEEE VIS papers 1990-2018 - Main dataset.csv', 'csv', 'header', function (t) {
        updateWorks = (author_name) => {
            spider.change_autor(author_name);
            wordCloud.setAuthor(author_name);
            document.getElementById("works").childNodes.forEach((child) => {
                child.remove();
            });
            const authRows = t.getColumn("AuthorNames");
            const authDRows = t.getColumn("AuthorNames-Deduped");
            const authors = authRows.map((authors, i) => {
                return authors.split(";").concat(authDRows[i].split(";"));
            });
            const authorIndexes = authors.map((authors, i) => {
                return i;
            }).filter((i) => {
                return authors[i].includes(author_name);
            });
            for (let i = 0; i < Math.min(15,authorIndexes.length); i++) {
                const li = document.createElement("li");
                li.innerText = `${t.getString(i, "Title")} -- ${t.getString(authorIndexes[i], "Year")}`;
                li.style.color = "black";
                li.classList.add("collection-item");
                document.getElementById("works").append(li);
            }
        };
    });
    createCanvas(0,0);

    var autor_list = table.getColumn(2);
    autor_list = [...new Set(autor_list)];
    var autocomplete = {};
    autor_list.forEach(function(item, index, array) {
        autocomplete[item] = 'assets/author-head.png';
    });

    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {data:autocomplete, limit:10});

    var input = document.getElementById( 'search' );
    var label = document.getElementById( 'label-search' ); // create new textarea
    input.parentNode.insertBefore( label, input.nextSibling );

    var widthCanvas =document.getElementById("canvas").offsetWidth - 5;
    var wordCloud = new WordCloud(400,widthCanvas,0, 0);
    var spider = new Spider(700,document.getElementById("container").clientWidth - 30,0, 200);

    var s2 = new p5(function(p5){
        p5.preload = function() {
            wordCloud.preload(p5);
        };
        p5.setup = function(){
            wordCloud.setup(p5);
        };
        p5.draw = function(){
            wordCloud.draw(p5);
        }
    });
    var s3 = new p5(function(p5){
        p5.preload = function(){
            spider.preload(p5);
        }
        p5.setup = function(){
            spider.setup(p5);
        };
        p5.draw = function(){
            spider.draw(p5);
        }
        p5.mousePressed = function () {
            spider.mousePressed(p5);
        }
    });

    var input =  document.querySelector("#search");
    input.addEventListener("change", (event) => {
        author_name = input.value;
        if(autor_list.includes(author_name)){
            refreshEverything(author_name);
        }
    });
}

function refreshEverything(author_name){
    document.querySelector("#autor").innerText = author_name;
    updateWorks(author_name);
}

function draw() {
}

window.setup = setup;
window.preload = preload;
window.draw = draw;
