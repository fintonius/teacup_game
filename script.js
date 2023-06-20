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
let power = 0;
let angle = 0;
let clicked = false;
let move = false;
let startPosition = [20, 180];

canvas.addEventListener('mousedown', (e) => {
    testClick = e.offsetX;
    angleClick = e.offsetY;
    console.log('click', e.offsetY)
    clicked = true;
    counter.textContent = 0;
});

canvas.addEventListener('mousemove', (e) => {
   if (clicked == true) {
     power = testClick - e.offsetX;
     angle = angleClick + e.offsetY;
     
    counter.textContent = power + ' & ' + angle; 
   };
})

canvas.addEventListener('mouseup', (e) => {
    console.log('angle =', angle);
    move = true;
    clicked = false;
    
})



function movement() {

}

const teabag = {
    x: startPosition[0],
    y: startPosition[1],
     update() {           
        // if (this.x >= power + 50) {
        //     move = false;
        // } else if (move == true) {       
        //     // console.log(teabag.y) 
        //         this.x += 15;
        //         counter.textContent = this.x;
        //         if (this.y < angle) {
        //             this.y += 2;
        //         } else if (this.y >angle) {
        //             this.y -= 2;
        //             console.log
        //         }
        //     }
            // (this.y <= angle) ? this.y += 2 : this.y -= 2;
     },
     draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        
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