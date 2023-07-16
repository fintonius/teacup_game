/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH =  canvas.width = 1000;
CANVAS_HEIGHT = canvas.height = 600;

let handImage = new Image();
handImage.src = 'images/hand-holding.png'; 

let cupFront = new Image();
cupFront.src = 'images/cup-front-fill.png';

let cursorPos = document.addEventListener('click', (e) => {
    console.log('x = ', e.x, 'y = ', e.y)
})

let mousePosition = null;
let handAngle = null;

//monitors when user moves mouse over canvas
canvas.addEventListener('mousemove', e => {
    mousePosition = {
        //using .offset to calculate cursor position in relation to 
        //the canvas and not the viewport which is what e.client refers to
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
    }
});
let power = 0;
// canvas.addEventListener('mousedown', e => {

// })

let velocityCounter = document.getElementById('velocity');
velocityCounter.textContent = 'Power = 0'

canvas.addEventListener('mousedown', (element) => {
    let startX = element.x;
    let velocity = 0;
    canvas.onmousemove = dragBall;
    canvas.onmouseup = endInput;
    function dragBall (e) {
        let currentX = e.x;
        velocity = Math.floor(startX - currentX)/40;
        velocityCounter.textContent = 'Power = ' + velocity;

    }
    function endInput() {
       power = velocity;
       console.log('power is', power);

       if(handAngle < -2 || handAngle > 0.5) return;

    let teaBagPos = teabagPosition(hand.x, hand.y)
    teaBags.push(
        new singleTeaBag(handAngle, teaBagPos.x, teaBagPos.y)
    );
        canvas.onmousemove = null;
    }
})

// canvas.addEventListener('mouseup', e => {
//     if(handAngle < -2 || handAngle > 0.5) return;

//     let teaBagPos = teabagPosition(hand.x, hand.y)
//     teaBags.push(
//         new singleTeaBag(handAngle, teaBagPos.x, teaBagPos.y)
//     );
// })



const cupBottom = {
    x: 749,
    y: 525,
    width: 90,
    height: 15,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "red";
        ctx.stroke();
    },
}

const cupSide1 = {
    x: 752,
    y: 458,
    width: 5,
    height: 100,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    },
}

const cupSide2 = {
    x: 828,
    y:458,
    width: 5,
    height: 100,
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    },
}


//to calculate the correct starting position for the teabag when the user clicks
function teabagPosition(x, y) {
    let rotatedAngle = handAngle;
//works out distance between rotation point and tip of hand
    let dx = x - (hand.x + 57);
    let dy = y - (hand.y - 118);
    let distance = Math.sqrt(dx * dx + dy * dy);
    let originalAngle = Math.atan2(dy, dx);
//works out the new position for teabag starting point
    let newX = (hand.x + 57) + distance * Math.cos(originalAngle + rotatedAngle);
    let newY = (hand.y - 118) + distance * Math.sin(originalAngle + rotatedAngle);

    return {
        x: newX,
        y: newY
    }
}

class Hand {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(){
//ctx.save is to save the canvas state before the canvas is rotated 
//and ctx.restore is invoked in the animate function immediately after
//hand.draw so the canvas is restored to the saved state so it looks like
//only the hand has moved
        ctx.save();
        this.rotateHand();
        ctx.drawImage(handImage, this.x - 60, this.y - 115, 115, 236);
    }

    rotateHand() {
        if(mousePosition) {
            handAngle = Math.atan2(mousePosition.y - this.y,
            mousePosition.x - this.x);
//the below rotates the canvas around the hand image based on the position
//of the cursor. First the canvas has to be offset in relation to the
//hand image so the rotation happens around its position rather than the 0,0
//coordinates of the canvas top which is what normally happens. The canvas
//position is then reset to normal so it doesn't look like it's moved.
//I don't know why this is the way to animate rotation! I will need to study
//it further. 
            ctx.translate(this.x -60, this.y +115);
            ctx.rotate(handAngle);
            ctx.translate(-this.x +60, -this.y - 115);
        }
    }
}

let hand = new Hand(81, 309);

class singleTeaBag {
    constructor(angle, x, y) {
        this.radius = 15;
        this.height = 15;
        this.width = 15;
        this.mass = this.radius;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.dx = Math.cos(angle) * power;
        this.dy = Math.sin(angle) * 7;
        this.gravity = 0.08;
        this.elasticity = 0.5;
        this.friction = 0.008;
    }

    move() {
//factors gravity into the teabags movement
        // if(collisionDetected) {
        //     this.dx = 0;
        //     this.dy = 0;
        //     this.y += 0;
        //     this.x += 0;
        // }
        if(this.y + this.gravity < 600){
            this.dy += this.gravity;
        }

        this.dx = this.dx - (this.dx * this.friction);
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.fillStyle = 'grey';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

let teaBags = [];
let collisionDetected = false;

function teaBagCollision(bag){
    // console.log('x pos is', bag.x, 'y pos is', bag.y);
    //detecting collision with canvas edge
    if(bag.x + bag.radius > 982 ||
        bag.x - bag.radius < 20 ||
        bag.y + bag.radius > 542 ||
        bag.y - bag.radius < 20) {

            bag.dy = (bag.dy * bag.elasticity);
            

            //right side of bag hits right side of canvas
            if(bag.x  > 985) {
                bag.x = 985;
                bag.dy *= -1;
            //left side of bag hits left side of canvas
            } else if (bag.x - bag.radius < 20) {
                bag.x = 20 + bag.radius;
                

            //top of
            } else if (bag.y + bag.radius > 542) {
                // console.log('collided with bottom');
                bag.y = 542 + bag.radius;
                bag.dy *= -1;
            } else if (bag.y - bag.radius < 20) {
                bag.y = 20 + bag.radius;
                bag.dy *= -1;
            }
        }

//     if (bag.x + bag.width  >= CANVAS_WIDTH) {
//         bag.x = CANVAS_WIDTH - bag.width;
//         bag.y += velocity * 3;
//         if (bag.y + bag.height >= CANVAS_HEIGHT) {
//             bag.y = CANVAS_HEIGHT - bag.height;
//            } 
     
//        } else if (bag.x < r && bag.y > 0) {
//     bag.x += velocity * 5;
//     bag.y -= velocity;      
//    } else if(bag.x >= r && bag.y < CANVAS_HEIGHT - 8) {
//     bag.y += velocity;     
//     bag.x += velocity * 5; 
//    } else if (bag.x === r) {
//         bag.x = bag.x;           
//    };

   //detecting collision with cup
   if(cupSide1.x  > bag.x + bag.width -6 ||
    cupSide1.x + cupSide1.width -6 < bag.x ||
    cupSide1.y + 6 > bag.y + bag.height ||
    cupSide1.y + cupSide1.height + 6 < bag.y)
    { 
        // console.log('no collision');
    } else {
    // console.log('BANG!!!');
    bag.x = cupSide1.x - bag.width;
    bag.y += bag.gravity * 3;
    // collide();
    } 

    if(cupSide2.x  > bag.x + bag.width -6 ||
        cupSide2.x + cupSide2.width -6 < bag.x ||
        cupSide2.y + 6 > bag.y + bag.height ||
        cupSide2.y + cupSide2.height + 6 < bag.y)
    { 
// console.log('no collision');
    } else {
// console.log('BANG!!!');
        bag.x = cupSide2.x - bag.width;
        bag.y += bag.gravity * 3;
        // collide();
    } 
   if(cupBottom.x  > bag.x + bag.width -6 ||
    cupBottom.x + cupBottom.width -6 < bag.x ||
    cupBottom.y + 6 > bag.y + bag.height ||
    cupBottom.y + cupBottom.height + 6 < bag.y)
    { 
        // console.log('no collision');
    } else {
        // console.log('BANG!!!');
        collisionDetected = true;
        collide();
    };
    function collide() {
        bag.x = 804;
        bag.y = 522;
        console.log('you scored!')
    };
};



function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    hand.draw();
    ctx.restore();
    teaBags.forEach(teabag => {
        teabag.move();
        teaBagCollision(teabag);
        teabag.draw();
    })
        // teabag.draw();
        cupSide1.draw();
        cupSide2.draw();
        cupBottom.draw();
        
        // teabag.update();
        ctx.drawImage(cupFront, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        requestAnimationFrame(animate);
};

animate();












//OLD GUFF
// hand.onload = renderImages;

//the image wasn't loading before the canvas so this solved the problem
//taken from Qixotl LFC youtube video
// let imgCount = 1;
// function renderImages() {
//     if(--imgCount > 0){return}
//     call animate() when all images have loaded
//     animate();
// }

//how to make an element that can be dragged to determine a number and angle?
// const userInput = document.getElementById('userInput');
// let g = 9.8;
// let velocity = 0;
// let angle = 0;
// let t = 0;
// let d = 0;
// let r = 0;
// let h = 0; 
// let vx = 0;
// let vy = 0;
// let velocityCounter = document.getElementById('velocity');
// velocityCounter.textContent = 'Velocity = 0'
// let angleCounter = document.getElementById('angle');
// angleCounter.textContent = 'Angle = 0';

// const frame = document.getElementById('userInput');
// const dragger = document.getElementById('userBall');
// dragger.addEventListener('mousedown', (element) => {
//     let startX = element.x;
//     let startY = element.y;
//     // console.log(startY);
//     frame.onmousemove = dragBall;
//     frame.onmouseup = endInput;
//     function dragBall (e) {
//         let currentX = e.x;
//         let currentY = e.y;
//         dragger.style.right = (startX - currentX) + 'px';
//         velocity = Math.floor(startX - currentX)/100;
//         dragger.style.bottom = (startY - currentY) + 'px';
//         angle = (startY - currentY) * -1;
//         angleCounter.textContent = 'Angle = ' + angle;
//         velocityCounter.textContent = 'Velocity = ' + velocity;
//         // console.log('test velocity', velocity);
//         // console.log('test angle', angle);
//     }
//     function endInput() {
//         movement(velocity, angle);
//         animate();
//         frame.onmousemove = null;
//         dragger.onmouseup = null;
//         dragger.style.right = 0 + 'px';
//         dragger.style.bottom = 0 + 'px';
//     }
// })


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
    console.log('testing r =', r);
}

// console.log(movement(velocity, angle));
// vy = velocity * Math.sin(angle);
// let time = (2 * vy)/g;
const teabag = {
    x: 86,
    y: 230,
    width: 15,
    height: 15,
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
       } else if(this.x >= r && this.y < CANVAS_HEIGHT - 8) {
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
                // console.log('BANG!!!');
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
                        // console.log('BANG!!!');
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
            // console.log('no collision');
        } else {
            // console.log('BANG!!!');
            teabag.collide();
        };

    },
     draw() {
        ctx.beginPath();
        // ctx.rect(this.x, this.y, this.width, this.height)
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);        
        ctx.stroke();
     },
    //  collide() {
    //     teabag.x = 804;
    //     teabag.y = 522;
    //     console.log('you scored!')
    //  }
}

