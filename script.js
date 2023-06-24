/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH =  canvas.width = 600;
CANVAS_HEIGHT = canvas.height = 400;

const counter = document.getElementById('counter');
counter.textContent = 0;
const userInput = document.getElementById('userInput');
let g = 9.8;
let velocity = 500;
let angle = 50;
let velocityCounter = document.getElementById('velocity');
velocityCounter.textContent = 'Velocity = 0'
let angleCounter = document.getElementById('angle');
angleCounter.textContent = 'Angle = 0'

const frame = document.getElementById('userInput');
const dragger = document.getElementById('userBall');
dragger.addEventListener('mousedown', (element) => {
    let startX = element.x;
    let startY = element.y;
    console.log(startX);
    frame.onmousemove = dragBall;
    frame.onmouseup = endInput;
    function dragBall (e) {
        let currentX = e.x;
        let currentY = e.y;
        dragger.style.right = (startX - currentX) + 'px';
        velocity = (startX - currentX);
        dragger.style.bottom = (startY - currentY) + 'px';
        angle = (startY - currentY);
        angleCounter.textContent = 'Angle = ' + angle;
        velocityCounter.textContent = 'Velocity = ' + velocity;
        console.log('test velocity', velocity);
        console.log('test angle', angle);
    }
    function endInput() {
        frame.onmousemove = null;
        dragger.onmouseup = null;
        dragger.style.right = 0 + 'px';
        dragger.style.bottom = 0 + 'px';
    }
})


//how to make an element that can be dragged to determine a number and angle?

// //this calculates the distance and trajectory of the throw based on the 
// //velocity and angle given by the user
// function movement(v, a) {
//     //determine the curve of the trajectory by plotting the object's position
//     //at different time intervals along the parabolic path.
    
//     //1.split velocity into its horizontal, vx, and vertical, vy, components &
//     //calculate the initial vertical and horizontal velocitys
//     let vy = v * Math.sin(a);
//     let vx = v * Math.cos(a);
//     console.log ('testing vy & vx. vy = ', vy, 'vx=', vx);
//     //2.calculate time(t) of flight
//     let t = (2 * vy)/g
//     console.log('testing t =', t);
//     //3.calculate max height, h, reached by the object
//     let h = (vy * vy)/(2*g);
//     console.log('testing h =', h);
//     //4.calculate the horizontal distance, d, traveled by the object
//     let d = vx * t;
//     console.log('testing d =', d);
//     //5.calculate the range, r, which is the horizontal distance
//     //traveled by the object when it returns to the same height as launch point
//     let r = 2 * d;
//     console.log('testing r =', r);
//     console.log('testing movement function. r.floor =', Math.floor(r)/100, 'h.floor =', Math.floor(h)/100);
// }

const teabag = {
    x: 10,
    y: 300,
     update() {           
       if (this.x < velocity && this.y > angle) {
        this.x++;
        this.y--;
       } else if (this.x < velocity && this.y <= angle) {
        this.x++;
        this.y++;
        console.log('testing y', this.y);
       }
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

