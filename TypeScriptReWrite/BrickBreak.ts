// Global Variables 
let canvas: HTMLCanvasElement, 
ctx: CanvasRenderingContext2D, 
ball: Ball, 
brick: Brick, 
player: Paddle, 
clicked: number, 
keyPressed: string, 
ai: Ai,
keyRel:string,
PaddleSpeed:number = 6
;

// Classes
/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 */
class Vector {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(v: Vector) {
        this.x += v.x;
        this.y += v.y
    }
    mult(factor: Vector | number) {
        if (factor instanceof Vector) {
            this.x *= factor.x;
            this.y *= factor.y;
        } else {
            this.x *= factor;
            this.y *= factor;
            return this;
        }
    }

    div(divisor: Vector | number) {
        if (divisor instanceof Vector) {
            this.x /= divisor.x;
            this.y /= divisor.y;
        } else {
            this.x /= divisor;
            this.y /= divisor;
        }
    }

    limit(max: number) {
        let mSq: number = (this.x * this.x) + (this.y * this.y);
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)) //normalize it
            this.mult(max);
        }
        return this
    }

}


/**
 * @class Brick
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
class Brick {
    position: Vector;
    width: number;
    height: number;
    health: number;
    startingHealth: number;
    effect: boolean;

    constructor(x: number, y: number, health: number) {
        this.position = new Vector(x, y);
        this.width = (canvas.width / 10) - 2.5;
        this.height = (canvas.height / 20) - 4;
        this.health = health;
        this.startingHealth = health;
        this.effect = false
    }
    hit() {
        this.health -= 1

    }
    show() {
        if (this.effect) {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0, "white");
            myGradient.addColorStop(.6, `rgb(${this.health * 85},50,50`);
            myGradient.addColorStop(1, `rgb(${this.health * 85},50,50`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        } else {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0, "white");
            myGradient.addColorStop(.6, `rgb(50, 50,${this.health * 85}`);
            myGradient.addColorStop(1, `rgb(50, 50,${this.health*85}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}


/**
 * @class Ball
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
class Ball {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    radius: number;
    speedMultiplier: number;
    speedLimit: number;
    ballLost: boolean;
    constructor(x: number, y: number) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(1, 7);
        this.radius = (canvas.width / 1.3 * canvas.height) * .00003443;
        this.speedMultiplier = (canvas.width * canvas.height) * .000052577;
        this.speedLimit = 6;
        this.ballLost = false;
    }
    contact(paddle: Paddle) {
        if (!(this.position.y > paddle.position.y + paddle.height)) {
            if (this.position.y > paddle.position.y - this.radius &&
                this.position.x > paddle.position.x - this.radius &&
                this.position.x < paddle.position.x + paddle.width + this.radius) {
                if (this.velocity.y > 0) {
                    let map: number = 1
                    let ballMap: number = (this.position.x - paddle.position.x) / ((paddle.position.x + paddle.width) - paddle.position.x) * (1 - (-1)) - 1;
                    this.acceleration.x += ballMap
                    this.velocity.y *= -1

                }
            }
        }
    }
    move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(6);
        this.acceleration.mult(0);
    }
    hitWall() {
        if (this.position.y >= canvas.height - this.radius || this.position.y <= this.radius) {
            this.velocity.y *= -1;
        }
        if (this.position.x >= canvas.width - this.radius || this.position.x <= this.radius) {
            this.velocity.x *= -1;
        }
    }
    show() {
        let myGradient = ctx.createRadialGradient(this.position.x, this.position.y, this.radius * .14, this.position.x, this.position.y, this.radius);
        myGradient.addColorStop(0, "white");
        myGradient.addColorStop(1, "red");
        ctx.fillStyle = myGradient;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    start() {

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
    velocity: Vector;

    constructor(x: number, y: number) {
        this.width = canvas.width / 5;
        this.height = canvas.height * .02474;
        this.position = new Vector(x, y)
        this.velocity = new Vector(0,0);
    }
    show() {
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, "lightgrey");
        myGradient.addColorStop(.6, "black");
        myGradient.addColorStop(1, "black");
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    move() {
        if (keyBoard.ArrowLeft){
             this.velocity.x = -PaddleSpeed;
        }
        else if (keyBoard.ArrowRight){
             this.velocity.x =  PaddleSpeed 
        }
        else {
            this.velocity.x = 0;
        }
        this.velocity.limit(4);
        this.position.add(this.velocity);
        if (this.position.x <= 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width >= canvas.width) {
            this.position.x = canvas.width - this.width;
        }
    }
    demo(ai: Ai) {
        this.position.x = ai.position.x - this.width / 2;
        if (this.position.x <= 0) this.position.x = 0;
        else if (this.position.x + this.width >= canvas.width) this.position.x = canvas.width - this.width;

    }
}
/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
class Ai {
    position: Vector;
    control: boolean;
    offset: number;
    constructor() {
        this.position = new Vector();
        this.control = true;
        this.offset = 0;
    }

    logic(ball: Ball) {
        let right: number = 0;
        let left: number = 0;
        level.bricks.forEach((brick: Brick) => brick.position.x > canvas.width / 2 ? right++ : left++);
        if (right > left) {
            this.choose("left")
        } else if (left > right) {
            this.choose("right")
        } else {
            this.choose("middle")
        }
        this.position.x = ball.position.x;
    }

    choose(choice: string) {
        let offset = 0
        switch (choice) {
            case "left":
                for (offset; offset >= -30; offset -= .1) {
                    this.position.x += ball.position.x + offset
                }
                break;

            case "right":
                for (offset; offset <= 30; offset += .1) {
                    this.position.x += ball.position.x + offset
                }
                break;
            default:
                this.offset = 0;
                this.position.x += ball.position.x + offset;
        }
    }
}

// Functions

/**
 * 
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480" 
 * @param height - The height of the Canvas as a string "480" 
 */
function makeCanvas(name: string, width ? : string, height ? : string) {
    let w = width || window.innerWidth.toString();
    let h = height || window.innerHeight.toString();
    canvas = < HTMLCanvasElement > document.getElementById("canvas");
    ctx = < CanvasRenderingContext2D > canvas.getContext("2d");
    canvas.setAttribute("id", name);
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;

}
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds 
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
function getPowers() {
    let Random: number = (Math.floor(Math.random() * 100));
    let powerUpList: string[] = Object.keys(PowerUps);
    let chosenPowerUp: string = powerUpList[Random % powerUpList.length];
    game.powerActive = true;
    PowerUps[chosenPowerUp].effect();
}


/**
 *
 * @param tempBrick
 */
function collisionsDetect(tempBrick: Brick) {
    level.balls.forEach((orb: Ball) => collisions(orb, tempBrick));
}

function collisions(circle: Ball, rectangle: Brick) {
    let circleX: number = circle.position.x;
    let circleY: number = circle.position.y;
    let radius: number = circle.radius;

    let rectangleX: number = rectangle.position.x;
    let rectangleY: number = rectangle.position.y;
    let rectangleWidth: number = rectangle.width;
    let rectangleHeight: number = rectangle.height;

    let leftRight: boolean = false;
    let topBottom: boolean = false;

    let testX = circleX;
    let testY = circleY;
    // Left Side
    if (circleX < rectangleX) {
        testX = rectangleX + 0.02;
        leftRight = true;
    } //Right Side
    else if (circleX > rectangleX + rectangleWidth) {
        testX = rectangleX + rectangleWidth;
        leftRight = true;
    }
    // Top Side
    if (circleY < rectangleY) {
        testY = rectangleY;
        topBottom = true;
    } // Bottom Side
    else if (circleY > rectangleY + rectangleHeight) {
        testY = rectangleY + rectangleHeight;
        topBottom = true;
    }
    let distX: number = circleX - testX;
    let distY: number = circleY - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= radius / 2 + .2) {
        if (topBottom && leftRight) {
            circle.velocity.x *= -1;
            circle.velocity.y *= -1;
            rectangle.hit();
        } else {
            if (topBottom) {
                rectangle.hit();
                circle.velocity.y *= -1;
            }
            if (leftRight) {
                rectangle.hit();
                circle.velocity.x *= -1;
            }
        }
    }

}

function gameLoop(name: FrameRequestCallback) {
    requestAnimationFrame(name);
}

function drawBackground() {
    ctx.fillStyle = "darkGrey";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



// Objects
interface keyBoard{
    [index:string]:boolean;
    ArrowLeft:boolean;
    ArrowRight:boolean;
}
const keyBoard = {
    ArrowLeft:false,
    ArrowRight:false,
}

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
    levelNum: number;
    numOfPowers: number;
    numOfRows: number;
    weakestBrick: number;
    score: number;
    bricks: Array < Brick > ;
    balls: Array < Ball > ;
    fortifier: number;
    scoreboard: () => any;
    makeEffect: () => any;
    fortifyBricks: () => any;
    makeBricks: () => any;
    showBricks: () => any;
    reset: () => any;

}
const level: level = {
    levelNum: < number > 1,
    numOfPowers: < number > 1,
    numOfRows: < number > 3,
    weakestBrick: < number > 1,
    score: < number > 0,
    bricks: < Brick[] > [],
    balls: < Ball[] > [],
    fortifier: < number > 0,
    scoreboard() {
        let ScoreBoard =<HTMLDivElement>document.getElementById("ScoreBoard");
        ScoreBoard.innerHTML = `<span id="score">Score:${this.score}</span>  
        <span id="level" >Level:${this.levelNum}</span>
        <span id="gameName">----BRICK BREAKER!----</span>     
        <span id="lives" >Lives:${game.lives}</span>  
        <span id ="balls">Balls:${this.balls.length}</span>`;
    },
    makeEffect() {
        return (level.numOfPowers > 0 && Math.random() > .7)
    },
    fortifyBricks() {
        if (level.levelNum % 5 === 0) this.fortifier += 1
    },
    makeBricks() {
        this.fortifyBricks();
        let rowPosition: number = (level.numOfRows * canvas.height / 20 + canvas.height / 20);
        level.weakestBrick = 1 + this.fortifier;
        for (rowPosition; rowPosition > canvas.height / 20; rowPosition -= canvas.height / 20) {
            for (let i = 10 - 1; i > -1; i--) {
                if (this.makeEffect()) {
                    brick = new Brick(i * canvas.width / 10, rowPosition, level.weakestBrick);
                    level.numOfPowers--;
                    brick.effect = true;
                    level.bricks.push(brick);
                } else {
                    level.bricks.push(new Brick(i * canvas.width / 10, rowPosition, level.weakestBrick));
                }
            }
            level.weakestBrick++
        }
    },
    showBricks() {
        for (let i = 0; i < level.bricks.length; i++) {
            level.bricks[i].show();
            collisionsDetect(level.bricks[i]);
            if (level.bricks[i].health <= 0) {
                let broke: Array < Brick > = level.bricks.splice(i, 1);
                if (broke[0].effect) {
                    game.powerActive = true;
                    getPowers();

                }
                level.score += broke[0].startingHealth * 500;
            }
        }
    },
    reset() {

    },
};

interface game {
    lives: number;
    balls: number;
    powerActive: boolean;
    over: boolean;
}
/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself! 
 */
const game: game = {
    lives: 3,
    balls: 1,
    powerActive: false,
    over: false,
};


/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */

interface gameLogic {
    ballLoop: () => any;
    endConditions: () => any;
    wins: () => any;
    demo: () => any;
}
const gameLogic: gameLogic = {
    ballLoop() {
        level.balls.forEach((orb: Ball) => {
            orb.show();
            orb.move();
            orb.hitWall();
            orb.contact(player);
            ai.logic(orb);
        })
    },
    endConditions() {

    },
    wins() {

    },
    demo() {

    },

};

// Power-Ups 
interface PowerUps {
    [index: string]: any;
    doubler: doubler;
    multiBall: multiBall;
    extraLife: extraLife;
}
interface multiBall {
    [index: string]: any;
    counter: number;
    maxBall: number;
    effect: () => any;
}
interface doubler {
    [index: string]: any;
    effect: () => any;
    loseDoubler: () => any;
}
interface extraLife {
    [index: string]: any;
    effect: () => any;
}

/**
 * @name PowerUps
 * @property doubler
 * @description - doubles the width of the paddle
 * @property multiBall
 * @description - Adds Multiple Balls to the GameScreen
 * @property extraLife
 * @description - Gives the player a extra life
 */

const PowerUps: PowerUps = {
    doubler: < doubler > {
        effect(paddle: Paddle = player) {
            if (paddle.width < canvas.width / 4) {
                paddle.width *= 2;
            } else if (paddle.width < canvas.width / 2) {
                paddle.width *= 1.5;
            } else {
                PowerUps.multiBall.effect();
            }
        },
        loseDoubler(paddle: Paddle) {
            paddle.width = canvas.width / 5;
        }
    },
    multiBall: < multiBall > {
        counter: < number > 0,
        maxBall: < number > 10,
        effect(numOfBalls:number = 5) {
            this.maxBall = numOfBalls;
            for (this.counter; this.counter < this.maxBall; this.counter++) {
                level.balls.push(new Ball(level.balls[0].position.x + this.counter * 3, level.balls[0].position.y));
                level.balls.push(new Ball(level.balls[0].position.x - this.counter * 3, level.balls[0].position.y));
            }
            this.counter = 0;
        },
    },

    extraLife: < extraLife > {
        effect() {
            game.lives += 1;
        },
    }
};
// Game Setup..

(() => {
    makeCanvas("canvas");
    window.onload = function () {
        document.addEventListener("keydown", (event) => {
             keyPressed = event.key;
            if (keyPressed === "ArrowLeft")  keyBoard.ArrowLeft = true;
            if (keyPressed === "ArrowRight") keyBoard.ArrowRight = true;
            if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }
        },
            false
        );
        document.addEventListener("keyup", (event) => {
             keyRel = event.key;
            if (keyRel === "ArrowLeft") keyBoard.ArrowLeft = false;
            if (keyRel === "ArrowRight") keyBoard.ArrowRight = false;
        },
            false
        );
        document.addEventListener("click", function (mEvent) {
            let clicked: number = mEvent.button;
            console.log(clicked);
        },
            false
        );
    };
    setup();
})();

function setup() {
    level.makeBricks();
    ai = new Ai();
    ball = new Ball(240, 240);
    level.balls.push(ball);
    player = new Paddle(canvas.width / 2, canvas.height - canvas.height * .2);
    draw()
}


function draw() {
    drawBackground();
    level.scoreboard();
    //level.showBricks();
    //gameLogic.ballLoop();
    gameLoop(draw);
    //player.move();
 //player.demo(ai);
    //player.show();

}