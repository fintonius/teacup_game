/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH =  canvas.width = 600;
CANVAS_HEIGHT = canvas.height = 400;

const counter = document.getElementById('counter');
counter.textContent = 0;
const userInput = document.getElementById('userInput');
let g = 9.8;
let velocity = 0;
let angle = 0;
let t = 0;
let d = 0;
let r = 0;
let h = 0; 
let vx = 0;
let vy = 0;
let velocityCounter = document.getElementById('velocity');
velocityCounter.textContent = 'Velocity = 0'
let angleCounter = document.getElementById('angle');
angleCounter.textContent = 'Angle = 0'

const frame = document.getElementById('userInput');
const dragger = document.getElementById('userBall');
dragger.addEventListener('mousedown', (element) => {
    let startX = element.x;
    let startY = element.y;
    console.log(startY);
    frame.onmousemove = dragBall;
    frame.onmouseup = endInput;
    function dragBall (e) {
        let currentX = e.x;
        let currentY = e.y;
        dragger.style.right = (startX - currentX) + 'px';
        velocity = (startX - currentX)/50;
        dragger.style.bottom = (startY - currentY) + 'px';
        angle = (startY - currentY);
        angleCounter.textContent = 'Angle = ' + angle;
        velocityCounter.textContent = 'Velocity = ' + velocity;
        // console.log('test velocity', velocity);
        // console.log('test angle', angle);
    }
    function endInput() {
        movement(velocity, angle);
        animate();
        frame.onmousemove = null;
        dragger.onmouseup = null;
        dragger.style.right = 0 + 'px';
        dragger.style.bottom = 0 + 'px';
    }
})


//how to make an element that can be dragged to determine a number and angle?

// //this calculates the distance and trajectory of the throw based on the 
// //velocity and angle given by the user
function movement(v, a) {
    //determine the curve of the trajectory by plotting the object's position
    //at different time intervals along the parabolic path.
    
    //1.split velocity into its horizontal, vx, and vertical, vy, components &
    //calculate the initial vertical and horizontal velocitys
    console.log('test v = ', v, 'test a=', a )
    vy = v * Math.sin(a);
    vx = v * Math.cos(a);
    console.log ('testing vy & vx. vy = ', vy, 'vx=', vx);
    //2.calculate time(t) of flight
     t = (2 * vy)/g
    console.log('testing t =', t);
    //3.calculate max height, h, reached by the object
    h = (vy * vy)/(2*g);
    console.log('testing h =', h);
    //4.calculate the horizontal distance, d, traveled by the object
     d = vx * t;
    console.log('testing d =', d);
    //5.calculate the range, r, which is the horizontal distance
    //traveled by the object when it returns to the same height as launch point
     r = 2 * d;
    console.log('testing r =', r);
    console.log('testing movement function. r =', Math.floor(r*1000), 'h =', Math.floor(h * 1000));
}

// console.log(movement(velocity, angle));
// vy = velocity * Math.sin(angle);
// let time = (2 * vy)/g;
const teabag = {
    x: 1,
    y: 300,
   curve: Math.random() * 7,
    angle: 50,
    
     update() {  
        this.x += vx * 10;
        // console.log('testing');
    //     this.y = Math.floor((2 * vy)/g);
    //     this.angle = Math.floor(time/1000);
    // //     // console.log(this.y)
    //    if (this.x < d) {
    //     this.x += vx;
    //    } else {
    //     this.x = 30;
    //    }
    //    this.y += this.curve * Math.sin(this.angle); 
    //    else if (this.x < velocity && this.y <= angle) {
    //     this.x++;
    //     this.y++;
    //     console.log('testing y', this.y);
    //    }
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
// animate();

