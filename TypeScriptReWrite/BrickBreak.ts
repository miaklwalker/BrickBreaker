// Global Variables 
let canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,ball:Ball,brick:Brick,player:Paddle;

// Game Loop


// Classes
/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 */
class Vector {
    x:number;
    y:number;
    constructor(x:number=0,y:number=0){
        this.x = x||0;
        this.y = y||0;
    }
    add(v:Vector){
    this.x += v.x;
    this.y += v.y
    }
    mult(factor:Vector|number){
        if(factor instanceof Vector){
            this.x *= factor.x;
            this.y *= factor.y;
        }else{
            this.x *= factor;
            this.y *= factor;
        }
    }
}


/**
 * @class Brick
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
class Brick{
    position:Vector;
    width:number;
    height:number;
    health:number;
    startingHealth:number;
    effect:boolean;

    constructor(x:number,y:number,health:number){
    this.position = new Vector(x,y);
    this.width = (canvas.width/10)-3;
    this.height = (canvas.height/20)-4;
    this.health = health;
    this.startingHealth = health;
    this.effect = false
    }
    hit(){
        this.health -= 1

    }
    show(){
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, "white");
        myGradient.addColorStop(.6, "blue");
        myGradient.addColorStop(1, "darkBlue");
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
                        
    }
}


/**
 * @class Ball
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
class Ball{
    position: Vector;
    direction: Vector;
    speed: Vector;
    radius: number;
    speedMultiplier: number;
    velocity: Vector;
    speedLimit: number;
    ballLost: boolean;
    constructor(x:number,y:number){
        this.position = new Vector(x,y);
        this.direction = new Vector(0,3);
        this.speed = new Vector(2,4);
        this.radius = (canvas.width/1.3*canvas.height)*.00004443;
        this.speedMultiplier = (canvas.width*canvas.height)*.000052577;
        this.velocity = new Vector(0,0);
        this.speedLimit = 6;
        this.ballLost = false;
    }
    contact(){

    }
    move(){
        this.position.add(this.speed);
    }
    hitWall(){
    if(this.position.y >= canvas.height-this.radius || this.position.y <= this.radius){
        this.speed.y *= -1;
    } 
     if (this.position.x >= canvas.width - this.radius || this.position.x <= this.radius) {
        this.speed.x *= -1;
    }
    }
    show(){
        let myGradient = ctx.createRadialGradient(this.position.x, this.position.y, this.radius *.14, this.position.x, this.position.y, this.radius);
        myGradient.addColorStop(0,"white");
        myGradient.addColorStop(1,"red");
        ctx.fillStyle = myGradient;
        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);       
        ctx.fill();
    }
    start(){

    }
}


/**
 * @class Ball
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
class Paddle {
    width: number;
    height: number;
    position: Vector;

    constructor(x: number, y: number) {
        this.width = canvas.width / 5;
        this.height = canvas.height * .02474;
        this.position = new Vector(x, y)
    }

    /**
     *
     */
    show() {
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, "lightgrey");
        myGradient.addColorStop(.6, "black");
        myGradient.addColorStop(1, "black");
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    /**
     *
     */
    move() {

    }
}
/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
class Ai{
    position: Vector;
    control: boolean;
    constructor(){
        this.position = new Vector();
        this.control = true;
    }

    /**
     *
     */
    logic(){

    }
}





// Functions

/**
 * 
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480" 
 * @param height - The height of the Canvas as a string "480" 
 */
function makeCanvas (name:string,width?:string,height?:string){
    let w = width || window.innerWidth.toString();
    let h = height || window.innerHeight.toString();
    canvas = <HTMLCanvasElement> document.getElementById("canvas");
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    canvas.setAttribute("id",name);
    canvas.setAttribute("width",w);
    canvas.setAttribute("height",h);
    return canvas;
    
}
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds 
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
function getPowers(){
    let Random:number = (Math.random()*100);
    let powerUpList = <string[]>Object.keys(PowerUps);
    let chosenPowerUp =<string>powerUpList[Random%powerUpList.length];

}

/**
 *
 * @param tempBrick
 */
function collisionsDetect(tempBrick:Brick){
level.balls.forEach((orb:Ball) => collisions(orb,tempBrick));
}
function collisions(circle:Ball,rectangle:Brick){
let circleX:number = circle.position.x;
let circleY:number = circle.position.y;
let radius:number  = circle.radius;

let rectangleX:number = rectangle.position.x;
let rectangleY:number = rectangle.position.y;
let rectangleWidth:number = rectangle.width;
let rectangleHeight:number = rectangle.height;

let leftRight:boolean = false;
let topBottom:boolean = false;

let testX = circleX;
let testY = circleY;
                        // Left Side
if(circleX<rectangleX){
    testX = rectangleX + 0.02;
    leftRight = true;
}                       //Right Side
else if(circleX>rectangleX+rectangleWidth){ 
testX = rectangleX + rectangleWidth;
leftRight = true;
}
                        // Top Side
if(circleY<rectangleY){
testY = rectangleY;
topBottom = true;
}                       // Bottom Side
else if(circleY>rectangleY+rectangleHeight){
    testY = rectangleY + rectangleHeight;
    topBottom = true;
}
let distX:number = circleX-testX;
let distY:number = circleY-testY;
let distance = Math.sqrt((distX*distX)+(distY*distY));
if(distance <= radius / 2){
    if(topBottom && leftRight){
        circle.speed.x *= -1;
        circle.speed.y *= -1;
        rectangle.hit();
    }else{
        if(topBottom && !leftRight){
            rectangle.hit();
            circle.speed.y *= -1;
        }
        if(leftRight && !topBottom){
            rectangle.hit();
            circle.speed.x *= -1;
        }
    }
}

}

function gameLoop(name:FrameRequestCallback){ 
    requestAnimationFrame(name);
}

function drawBackground(color:string){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}






// Objects
/**
 * @name level
 * @description - The Level Object contains Methods and Properties for defining the level.
 * @property levelNum
 * @property numOfPower
 * @property numOfRows
 * @property weakestBrick
 * @property score
 * @property bricks
 * @property balls
 * @property fortifier
 */
interface level {
    levelNum:number;
    numOfPowers:number;
    numOfRows:number;
    weakestBrick:number;
    score:number;
    bricks:Array<Brick>;
    balls:Array<Ball>;
    fortifier:number;
    scoreboard:()=>any;
    makeEffect:()=>any;
    fortifyBricks:()=>any;
    makeBricks:()=>any;
    showBricks:()=>any;
    reset:()=>any;

}
const level:level ={
    levelNum:<number>1,
    numOfPowers:<number>1,
    numOfRows:<number>3,
    weakestBrick:<number>1,
    score:<number>0,
    bricks:<Brick[]>[],
    balls:<Ball[]>[],
    fortifier:<number>0,
    scoreboard(){

    },
    makeEffect(){
        return (level.numOfPowers > 0 && Math.random() > .7)
    },
    fortifyBricks(){
        if(level.levelNum % 5 ) this.fortifier += 1
    },
    makeBricks(){
        this.fortifyBricks();
        let h = (level.numOfRows * canvas.height / 20 + canvas.height / 20);
        level.weakestBrick = 1 + this.fortifier;
        for( h ; h > canvas.height / 20 ; h -= canvas.height / 20 ){
            for( let i = 10 - 1 ; i > -1 ; i--){
                if(this.makeEffect()){
                    brick = new Brick( i * canvas.width / 10 , h , level.weakestBrick );
                    level.numOfPowers--;
                    brick.effect = true;
                    level.bricks.push(brick);
                }else{
                    level.bricks.push(new Brick( i * canvas.width / 10, h , level.weakestBrick));
                }
            }
        }
    },
    showBricks(){
        for ( let i = 0 ; i < level.bricks.length ; i++){
        level.bricks[i].show();
        collisionsDetect(level.bricks[i]);
        if(level.bricks[i].health <= 0 ){
            let broke:Array<Brick> = level.bricks.splice(i,1);
                if(broke[0].effect){
                    game.powerActive = true;
                    getPowers();
            } 
            level.score += broke[0].startingHealth * 500;
        }
    }
    },
    reset(){

    },
};

    interface game {
        lives:number;
        balls:number;
        powerActive:boolean;
        over:boolean;
    }
/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself! 
 */
    const game:game = {
    lives:3,
    balls:1,
    powerActive:false,
    over:false,
    };


/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */

 interface gameLogic {
     ballLoop: () => any;
     endConditions:()=>any;
     wins: ()=> any;
     demo:()=> any;
 }
const gameLogic:gameLogic ={
    ballLoop(){
    level.balls.forEach((orb:Ball)=>{
        orb.show();
        orb.move();
        orb.hitWall();
    })
    },
    endConditions(){

    },
    wins(){

    },
    demo(){

    },

};

// Power-Ups 

/**
 * @name PowerUps
 * @property doubler
 * @description - doubles the width of the paddle
 * @property multiBall
 * @description - Adds Multiple Balls to the GameScreen
 * @property extraLife
 * @description - Gives the player a extra life
 * 
 */
const PowerUps ={

doubler:<object>{

},

multiBall:<object>{

},

extraLife:<object>{

}
};





// Game Setup..
(() => {
    makeCanvas("canvas");
         window.onload = function () {
             document.addEventListener('keydown', (event) => {
                let keyPressed = event.key;
                 alert(keyPressed);
                 }, false);

             document.addEventListener('mousedown', function (mEvent) {
                 let clicked = mEvent.button;
                 alert(clicked);
                 }, false);
            };
         setup();
})();

function setup(){
    level.makeBricks();
    ball = new Ball(240,240);
    level.balls.push(ball);
    player = new Paddle(canvas.width / 2 ,canvas.height - canvas.height *.2 );
    draw()
}


function draw() {
    drawBackground("light-grey");
    level.showBricks();
    gameLogic.ballLoop();
    player.show();
    player.move();
    gameLoop(draw);
 }


