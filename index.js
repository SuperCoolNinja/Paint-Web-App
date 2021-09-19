let canvas = document.getElementById('box');
let ctx = canvas.getContext('2d');
let tool = "pen";
var isPressed = false;
var elementPen = document.getElementById("pen");
var elementErase = document.getElementById('eraser');

elementPen.addEventListener('click', () => {
    tool = "pen";
    document.body.style.cursor = "url('./img/pen_cursor.png'), auto";

})
elementErase.addEventListener('click', (e) => {
    tool = "eraser";
    document.body.style.cursor = "url('./img/eraser_cursor.png'), auto";
})

//Get mouse pos : 
function getMousePos(mouse) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: mouse.x - rect.left,
        y: mouse.y - rect.top
    };
}

//Event :
window.addEventListener('load', () => {
    const palette = document.querySelectorAll('.color');
    const tool = document.querySelectorAll('.tools');

    bMouseDown = false;
    ctx.lineWidth = 5;
    let lastColor = null;
    let lastTool = null;


    //Loop for each color item : 
    palette.forEach(element => {
        element.style.border = '1px solid black';
        element.addEventListener('click', function() {
            if (lastColor) lastColor.style.border = '1px solid black';
            ctx.strokeStyle = this.id;
            this.style.border = '1px solid white';
            lastColor = this;
        })
    });


    //Loop for each tool item : 
    tool.forEach(element => {
        element.style.border = 'none';
        element.addEventListener('click', function() {
            if (lastTool) lastTool.style.border = 'none';
            this.style.border = '1px solid white';
            lastTool = this;
        })
    });
})

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    draw(e);
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    ctx.beginPath();
})

canvas.addEventListener("mousemove", (e) => {
    if (!isPressed) return;
    draw(e);
})

function draw(e) {
    e.preventDefault();

    if (tool == "pen")
        ctx.globalCompositeOperation = "source-over";
    else
        ctx.globalCompositeOperation = "destination-out";

    ctx.lineCap = "round";
    ctx.lineTo(getMousePos(e).x, getMousePos(e).y);
    ctx.stroke();
}