let tool = "pen";
let isPressed = false;

const canvas = document.getElementById('box');
const ctx = canvas.getContext('2d');
const elementPen = document.getElementById("pen");
const elementErase = document.getElementById('eraser');
const palette = document.querySelectorAll('.color');
const tools = document.querySelectorAll('.tools');
const firstColor = document.getElementById('black');

//Select new cursor : 
function ChangeCursor(cursor) {
    document.body.style.cursor = `url('./img/${cursor}.png'), auto`;
}

//Get mouse pos : 
function getMousePos(mouse) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: mouse.x - rect.left,
        y: mouse.y - rect.top
    };
}

//This function allow us to load all the stuff on begin :  
function OnBegin() {
    //Some default value : 
    let lastColor = null;
    let lastTool = null;
    bMouseDown = false;
    firstColor.style.border = '1px solid white';
    elementPen.style.border = '1px solid white';
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ChangeCursor("pen_cursor");


    //Loop for each color item : 
    palette.forEach(element => {
        element.addEventListener('click', function() {
            if (lastColor) lastColor.style.border = '1px solid black';
            ctx.strokeStyle = this.id;
            firstColor.style.border = '1px solid black';
            this.style.border = '1px solid white';
            lastColor = this;
        })
    });

    //Loop for each tool item : 
    tools.forEach(element => {
        element.addEventListener('click', function() {
            if (lastTool) lastTool.style.border = 'none';
            elementPen.style.border = 'none';
            this.style.border = '1px solid white';
            lastTool = this;
        })
    });
}


//Here we draw the line and erase depending on the tool selected : 
function draw(e) {
    e.preventDefault();

    if (tool == "pen")
        ctx.globalCompositeOperation = "source-over";
    else
        ctx.globalCompositeOperation = "destination-out";

    ctx.lineTo(getMousePos(e).x, getMousePos(e).y);
    ctx.stroke();
}


//Event :
window.addEventListener('load', () => {
    OnBegin();
})

canvas.addEventListener("mouseover", () => {
    ctx.beginPath();
    isPressed = false;
})

canvas.addEventListener('mouseup', () => {
    isPressed = false;
    ctx.beginPath();
})

elementPen.addEventListener('click', () => {
    tool = "pen";
    ChangeCursor("pen_cursor");
})
elementErase.addEventListener('click', () => {
    tool = "eraser";
    ChangeCursor("eraser_cursor");
})


canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    draw(e);
})

canvas.addEventListener("mousemove", (e) => {
    if (!isPressed) return;
    draw(e);
})