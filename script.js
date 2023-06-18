/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH =  canvas.width = 600;
CANVAS_HEIGHT = canvas.height = 400;



const counter = document.getElementById('counter');
counter.textContent = 0;
let frameCounter = document.getElementById('frameCounter');
let frameCount = 0;
let testClick = 0;
let heightClick = 0;
let distance = 0;
let height = 0;
let clicked = false;
let move = false;

canvas.addEventListener('mousedown', (e) => {
    testClick = e.offsetX;
    heightClick = e.offsetY;
    console.log(heightClick, teabag.y)
    clicked = true;
    counter.textContent = 0;
});

canvas.addEventListener('mousemove', (e) => {
   if (clicked == true) {
     distance = testClick - e.offsetX;
     height = heightClick + e.offsetY;
    counter.textContent = distance + ' & ' + height; 
   };
})

canvas.addEventListener('mouseup', (e) => {
    move = true;
    clicked = false;
})



const teabag = {
    x: 50,
    y: 300,
     update() {           
        if (this.x >= 400 || this.y >= 400) {
            move = false;
        } else if (move == true) {       
            // console.log(teabag.y) 
                this.x = Math.floor(this.x + distance/10);
                this.y = Math.floor(this.y - height/100);
                counter.textContent = this.x;
            }
     },
     draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
        ctx.stroke();
     },
}

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        teabag.draw();
        teabag.update();
    //     frameCount++
    // frameCounter.textContent = frameCount;
    requestAnimationFrame(animate);
}
animate();