/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH =  canvas.width = 1000;
CANVAS_HEIGHT = canvas.height = 400;

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
angleCounter.textContent = 'Angle = 0';

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
        velocity = Math.floor(startX - currentX)/100;
        dragger.style.bottom = (startY - currentY) + 'px';
        angle = (startY - currentY);
        angleCounter.textContent = 'Angle = ' + angle;
        velocityCounter.textContent = 'Velocity = ' + velocity;
        console.log('test velocity', velocity);
        console.log('test angle', angle);
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
    h = (vy * vy)/(2*g) * 1000;
    console.log('testing h =', h);
    //4.calculate the horizontal distance, d, traveled by the object
     d = (vx * t) * 5000;
    console.log('testing d =', d);
    //5.calculate the range, r, which is the horizontal distance
    //traveled by the object when it returns to the same height as launch point
     r = 2 * d;
    console.log('testing r =', r);
}

// console.log(movement(velocity, angle));
// vy = velocity * Math.sin(angle);
// let time = (2 * vy)/g;
const teabag = {
    x: 10,
    y: 300,
    currentY: 0,
    maxY: CANVAS_HEIGHT/2 + angle,
    angle: angle,
    angleSpeed: 1,
    curve: 1,
    
     update() {  

        
        // this.angle += this.angleSpeed;
       if (this.x < r && this.y > 0) {
        this.x += velocity * 5;
        // this.y = Math.sin(this.x * 0.1) * angle;
        // this.y -= this.curve * Math.sin(this.angle);
        this.y--;
        // this.startY += this.maxY - this.currentY;
        // console.log('testing y', this.y);
       
       } else if(this.x >= r && this.y < CANVAS_HEIGHT - 10) {
        // console.log('this is working');
        // this.y -= this.curve * Math.sin(this.angle);
        // this.y-= velocity  * 5;
        // this.y += this.curve * Math.sin(this.angle);
        this.y++;     
        this.x += velocity * 5; 
        // this.y += velocity * 2;
        // this.y += this.curve * Math.sin(this.angle);
        // this.angle += this.angleSpeed;
        // this.y = Math.sin(this.x * 0.1) * angle;
       } else if (this.x === r) {
        this.x = this.x;
       }

       if(this.x > cup.x + cup.width ||
        this.x + this.width < cup.x ||
        this.y > cup.y + cup.height ||
        this.y + this.height < cup.y)
        { 
            console.log('BANG!!!');
            this.collide();
        } else {
            console.log('no collision');
 
        }

     },
     draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);        
        ctx.stroke();
     },
     collide() {
        this.x = cup.x;
     }
}

const cup = {
    x: 900,
    y: 385,
    width: 55,
    height: 150,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    },
}

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        teabag.draw();
        cup.draw();
        teabag.update();
        requestAnimationFrame(animate);
};

// this.angle = 0;
//         this.angleSpeed = Math.random() * 0.2;
//         this.curve = Math.random() * 7;
//     }
//     update(){
//         this.x -= this.speed;

//         //this is to create a wave pattern that the enemy follows on the y axis
//         //to create up & down movement

//         if(this.x + this.width <0) this.x = canvas.width;
//         //animate sprites
//         if (gameFrame % this.flapSpeed == 0){
//         this.frame > 4 ? this.frame = 0 : this.frame++;
//         }
//     }