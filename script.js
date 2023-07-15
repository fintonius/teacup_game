/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH =  canvas.width = 1000;
CANVAS_HEIGHT = canvas.height = 400;

let cursorPos = document.addEventListener('click', (e) => {
    console.log('x = ', e.x, 'y = ', e.y)
})

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
    // console.log(startY);
    frame.onmousemove = dragBall;
    frame.onmouseup = endInput;
    function dragBall (e) {
        let currentX = e.x;
        let currentY = e.y;
        dragger.style.right = (startX - currentX) + 'px';
        velocity = Math.floor(startX - currentX)/100;
        dragger.style.bottom = (startY - currentY) + 'px';
        angle = (startY - currentY) * -1;
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
    // console.log('test v = ', v, 'test a=', a )
    vy = v * Math.sin(a);
    vx = v * Math.cos(a);

    if(vy < 0) vy * -1;
    if(vx < 0) vx * -1;
    // console.log ('testing vy & vx. vy = ', vy, 'vx=', vx);
    //2.calculate time(t) of flight
     t = (2 * vy)/g
    if(t < 0) t * -1;
    // console.log('testing t =', t);

    //3.calculate max height, h, reached by the object
    h = (vy * vy)/(2*g) * 1000;
    
    if(h < 0) h * -1;
    // console.log('testing h =', h);
    //4.calculate the horizontal distance, d, traveled by the object
     d = (vx * t) * 5000;
    
    if (d<0) d * -1;
    // console.log('testing d =', d);
    //5.calculate the range, r, which is the horizontal distance
    //traveled by the object when it returns to the same height as launch point
     r = 2 * d;
     if(r < 0) r = r * -1;
    // console.log('testing r =', r);
}

// console.log(movement(velocity, angle));
// vy = velocity * Math.sin(angle);
// let time = (2 * vy)/g;
const teabag = {
    x: 10,
    y: 300,
    width: 10,
    height: 10,
    currentY: 0,
    maxY: CANVAS_HEIGHT/2 + angle,
    angle: angle,
    angleSpeed: 1,
    curve: 1,
    
     update() {          
        // this.angle += this.angleSpeed;
        if (this.x + this.width  >= CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.width;
            this.y += velocity * 3;
            if (this.y + this.height >= CANVAS_HEIGHT) {
                this.y = CANVAS_HEIGHT - this.height;
               } 
           } else if (this.x < r && this.y > 0) {
        this.x += velocity * 5;
        this.y -= velocity;      
       } else if(this.x >= r && this.y < CANVAS_HEIGHT - 10) {
        this.y += velocity;     
        this.x += velocity * 5; 
       } else if (this.x === r) {
            this.x = this.x;           
       };

       if(cupSide1.x  > teabag.x + teabag.width -6 ||
        cupSide1.x + cupSide1.width -6 < teabag.x ||
        cupSide1.y + 6 > teabag.y + teabag.height ||
        cupSide1.y + cupSide1.height + 6 < teabag.y)
        { 
            // console.log('no collision');
        } else {
                console.log('BANG!!!');
                this.x = cupSide1.x - this.width;
                this.y += velocity * 3;
                // teabag.collide();
            } 

            if(     cupSide2.x  > teabag.x + teabag.width -6 ||
                    cupSide2.x + cupSide2.width -6 < teabag.x ||
                    cupSide2.y + 6 > teabag.y + teabag.height ||
                    cupSide2.y + cupSide2.height + 6 < teabag.y)
                { 
                    // console.log('no collision');
                } else {
                        console.log('BANG!!!');
                        this.x = cupSide2.x - this.width;
                        this.y += velocity * 3;
                        // teabag.collide();
                    } 
            
        //     else {
        //     console.log('BANG!!!');
        //     this.x = cupSide1.x - this.width;
        //     this.y += velocity * 3;
        //     // teabag.collide();
        // }
        // ;
       if(cupBottom.x  > teabag.x + teabag.width -6 ||
        cupBottom.x + cupBottom.width -6 < teabag.x ||
        cupBottom.y + 6 > teabag.y + teabag.height ||
        cupBottom.y + cupBottom.height + 6 < teabag.y)
        { 
            console.log('no collision');
        } else {
            console.log('BANG!!!');
            teabag.collide();
        };

    },
     draw() {
        ctx.beginPath();
        // ctx.rect(this.x, this.y, this.width, this.height)
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);        
        ctx.stroke();
     },
     collide() {
        alert('you scored!')
     }
}

const cupBottom = {
    x: 905,
    y: 390,
    width: 50,
    height: 15,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "red";
        ctx.stroke();
    },
}

const cupSide1 = {
    x: 900,
    y: 335,
    width: 5,
    height: 155,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    },
}

const cupSide2 = {
    x: 956,
    y: 285,
    width: 5,
    height: 155,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    },
}

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        teabag.draw();
        cupSide1.draw();
        cupSide2.draw();
        cupBottom.draw();
        teabag.update();
        
        requestAnimationFrame(animate);
};


// console.log('cup x and width', cup.x, cup.width);
// console.log('cup.x + width', (cup.x + cup.width));
// console.log('teabag x and width', teabag.x, teabag.width);
// console.log('teabag.x + width', (teabag.x + teabag.width));