console.log("Hello, world!");
let canvas;
let context;

class Circle {
    constructor(color, radius, xpos){
        this.color = color;
        this.radius = radius;
        this.xpos = xpos;
    }

    draw(ypos){
        setColor(this.color, 2);
        drawCircle({x:this.xpos, y:ypos}, this.radius);
    }
}


function start(){
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    console.log("canvas", canvas, "context", context);
    
}

function drawLine(start, stop){
    context.moveTo(start.x, start.y);
    context.lineTo(stop.x, stop.y);
    context.stroke();
}

function drawCircle(start, radius){
    context.beginPath();
    const xpos = start.x;
    const ypos = start.y;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    context.arc(xpos, ypos, radius, startAngle, endAngle, false);
    context.stroke();
    context.closePath();

}

function setColor(color, width){
    context.strokeStyle = color;
    context.lineWidth = width;
}

let startTime = Date.now();
function draw(){
    whiteScreen();

    const timeElapsed = Date.now() - startTime;
    //1000ms in a second, 16ms in a frame
    const ypos = timeElapsed / 100 % 200;
    circles.forEach((circle) => {circle.draw(ypos)})
    window.requestAnimationFrame(draw);
}

function whiteScreen(){
    //clears screen
    setColor("#FFFFFF", 2);
    context.fillRect(0, 0, 200, 200);
    setColor("#FFC300", 2);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const circles = [];
function init(){
    for (let i = 0; i < 11; i++){
        const radius = getRandomInt(5, 35);
        const xpos = getRandomInt(5, 195);
        const color = i % 2 === 0 ? "#C9E5FF":"#1F5DBC";
        const circle = new Circle (color, radius, xpos);
        circles.push(circle);
    }
}

window.onload = function(){
    start();
    init()
    window.requestAnimationFrame(draw);
    /*setColor("#FF0000", 2);
    drawLine({x:0, y:0}, {x:200, y:200});
    setColor("#0000ff", 5);
    drawCircle({x:50, y:100}, 25);
    */
}