// Global Variables
let canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    ball: Ball,
    brick: Brick,
    player: Paddle,
    clicked: number,
    keyPressed: string,
    ai: Ai,
    keyRel: string,
    PaddleSpeed: number = 6,
    hit: boolean = false,
    title: HTMLSpanElement,
    color:number = 0,
    iterator:number = 0,
    chosenPowerUp:string,
    displayed:boolean,
    modernColors:number[][],
    brickStyle: { [x: string]: number[][]; set1: number[][]; set2: number[][]; },
    paddleStyle: string[],
    textStyle:string[],
    ballStyle:string[],
    fontStyle:string[],
    backgroundStyle:string
 ;


let clickHandler = () => canvas.addEventListener("click", () => true, false);

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
            this.div(Math.sqrt(mSq)); //normalize it
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
        this.health -= 1;
        return true;
    }
    show() {                               
        if (this.effect) {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0,  `rgb(${brickStyle['set1'][0][0]},${brickStyle['set1'][0][1]},${brickStyle['set1'][0][2]}`);
            myGradient.addColorStop(.6, `rgb(${this.health * brickStyle['set1'][1][0]},${brickStyle['set1'][1][1]},${brickStyle['set1'][1][2]}`);
            myGradient.addColorStop(1,  `rgb(${this.health * brickStyle['set1'][2][0]},${brickStyle['set1'][2][1]},${brickStyle['set1'][2][2]}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        } else {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0,  `rgb(${brickStyle["set2"][0][0]},${brickStyle["set2"][0][1]},${brickStyle["set2"][0][2]}`)
            myGradient.addColorStop(.6, `rgb(${brickStyle["set2"][1][0]},${brickStyle["set2"][1][1]},${this.health *brickStyle["set2"][1][2]}`);
            myGradient.addColorStop(1,  `rgb(${brickStyle["set2"][2][0]},${brickStyle["set2"][2][1]},${this.health *brickStyle["set2"][2][2]}`);
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
    speedLimit: number;
    ballLost: boolean;
    constructor(x: number, y: number) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(1, 7);
        this.radius = (canvas.width / 1.3 * canvas.height) * .00003443;
        this.speedLimit = 6;
        this.ballLost = false;
    }
    contact(paddle: Paddle) {
        if (!(this.position.y > paddle.position.y + paddle.height)) {
            if (this.position.y > paddle.position.y - this.radius &&
                this.position.x > paddle.position.x - this.radius &&
                this.position.x < paddle.position.x + paddle.width + this.radius) {
                if (this.velocity.y > 0) {
                    let ballMap: number = (this.position.x - paddle.position.x) / ((paddle.position.x + paddle.width) - paddle.position.x) * (2 - (-2)) - 2;
                    this.acceleration.x += ballMap;
                    this.velocity.y *= -1
                }
            }

        }
    }
    move() {
        if (game.active) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.velocity.limit(6);
            this.acceleration.mult(0);
        }
    }
    hitWall() {
        if (this.position.y >= canvas.height - this.radius) {
            this.ballLost = true;
        }
        if (this.position.y <= this.radius) {
            this.velocity.y *= -1;
        }
        if (this.position.x >= canvas.width - this.radius || this.position.x <= this.radius) {
            this.velocity.x *= -1;
        }
    }
    show() {
        let myGradient = ctx.createRadialGradient(this.position.x, this.position.y, this.radius * .14, this.position.x, this.position.y, this.radius);
        myGradient.addColorStop(0, `${ballStyle[0]}`);
        myGradient.addColorStop(1,`${ballStyle[1]}` );
        ctx.fillStyle = myGradient;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
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
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
    }
    show() {
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, `${paddleStyle[0]}`);
        myGradient.addColorStop(.6, `${paddleStyle[1]}`);
        myGradient.addColorStop(1, `${paddleStyle[2]}`);
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    move() {
        if (!ai.control) {
            if (keyBoard.ArrowLeft) {
                this.velocity.x = -PaddleSpeed;
            } else if (keyBoard.ArrowRight) {
                this.velocity.x = PaddleSpeed
            } else {
                this.velocity.x = 0;
            }
            this.velocity.limit(4);
            this.position.add(this.velocity);
            if (this.position.x <= 0) {
                this.position.x = 0;
            } else if (this.position.x + this.width >= canvas.width) {
                this.position.x = canvas.width - this.width;
            }
        } else {
            this.demo(ai);
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
        let offset = 0;
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
    let w:string = width || (window.innerWidth*.75).toString();
    let h:string = height || (3*window.innerHeight/4).toString();
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
    chosenPowerUp = powerUpList[Random % powerUpList.length];
    if (game.powerActive) {
        PowerUps[chosenPowerUp].effect();
    } else if (!game.powerActive) {
        PowerUps.doubler.loseEffect();
    }
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
    if (distance <= radius / 2 + .4) {
        if (topBottom && leftRight) {
            circle.velocity.x *= -1;
            circle.velocity.y *= -1;
            rectangle.hit();
            hit = true
        } else {
            if (topBottom) {
                rectangle.hit();
                hit = true;
                circle.velocity.y *= -1;
            }
            if (leftRight) {
                rectangle.hit();
                hit = true;
                circle.velocity.x *= -1;
            }
        }
    }

}

function gameLoop(name: FrameRequestCallback) {
    requestAnimationFrame(name);
}

function drawBackground() {
    ctx.fillStyle = backgroundStyle;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function styler() {
    let styleSelect = <HTMLSelectElement>document.getElementById("colorSelect")
    let selectedStyle = styleSelect.selectedIndex;
    modernColors = styles[index[selectedStyle]].color
    brickStyle = styles[index[selectedStyle]].brick
    textStyle = styles[index[selectedStyle]].text
    ballStyle = styles[index[selectedStyle]].ball
    paddleStyle = styles[index[selectedStyle]].paddle
    fontStyle = styles[index[selectedStyle]].font
    backgroundStyle = styles[index[selectedStyle]].background

}

// Objects
interface styles {
    brick:{
        set1:number[][],
        set2:number[][],
    }
    ball: string[];
    text: string[];
    color: number[][];
    paddle:string[];
    font:string[];
    background:string;
}
interface styleList {
    [index: string]: styles
}

let index = ['PacMan', 'Retro', 'Classic', 'Modern','PacMan'];
let styles = <styleList>{
    Modern: <styles>{
        brick: {
            set1:[[255,255,255],[85,0,0],[85,55,55]],
            set2:[[255,255,255],[50,50,85],[50,50,85]],
               },
        ball: ["white","red"],
        text: [`36px 'Eternal Knight Laser Itallic'`],
        color:  [
                [218, 247, 166],
                [255, 195, 0],
                [255, 87, 51],
                [199, 0, 57],
                [133, 193, 233],
                [46, 204, 113]],
        font: ['Eternal Knight Laser Itallic','30px'],
        paddle:["lightgrey","black","black"],
    },
    Retro: <styles>{
        brick: {
            set1:[[47,79,79],[47,79,79],[47,79,79]],
            set2:[[0,0,0],[0,0,0],[0,0,0]],
        },
        ball: ["grey","grey"],
        text: [`24px 'Press Start 2P'`],
        color:  [
                [255, 255, 255],
                [255, 255, 255],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [255, 255, 255]],
        font: ["'Press Start 2P'","15px"],
        paddle:["black","black","black"],
        background: 'white'
    },
    Classic: <styles>{
        brick: {
            set1: [[67, 176, 71], [67, 176, 71], [67, 176, 71]],
            set2: [[229, 37, 33], [229, 37, 33], [229, 37, 33]],
        },
        ball: ["orange","orange"],
        text: [`48px 'SNES'`],
        color:  [
                [247, 249, 249],
                [34, 101, 226],
                [190 ,216 ,212],
                [120 ,213 ,215],
                [99 ,210 ,255],
                [255, 255, 255]],
        font: ['SNES','45px'],
        paddle:["blue","blue","blue"],
        background:'rgb(44,176,26)'
    },
    PacMan: <styles>{
        brick: {
            set1: [[255, 184, 82], [255, 184, 82], [255, 184, 82]],
            set2: [[25, 25, 166], [25, 25, 166], [25, 25, 166]],
        },
        ball: ["rgb(255,255,0)", "rgb(255,255,0)"],
        text: [`48px 'PacFont'`],
        color: [
            [255, 0, 0],
            [255, 184, 255],
            [0, 255, 255],
            [255, 184, 82],
            [255, 255, 0],
            [0,0,0]],
        font: ['PacFont', '45px'],
        paddle: ["rgb(33,33,222)", "rgb(33,33,222)", "rgb(33,33,222)"],
        background:`rgb(0, 0,0)`
    }
}

interface keyBoard {
    [index: string]: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
}
const keyBoard:keyBoard = {
    ArrowLeft: false,
    ArrowRight: false,
};

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
        let ScoreBoard = < HTMLDivElement > document.getElementById("ScoreBoard");
        let span = ScoreBoard.children;
        ScoreBoard.style.fontFamily = `${fontStyle[0]}`
        ScoreBoard.style.fontSize   = `${fontStyle[1]}`
        span[0].innerHTML = `score : ${level.score}  `;
        span[1].innerHTML = `Level : ${level.levelNum}`;
        span[2].innerHTML = `----BRICK BREAKER!----`;
        span[3].innerHTML = `Lives : ${game.lives}`;
        span[4].innerHTML = `balls : ${level.balls.length}`;
           ctx.font =`${textStyle}`;
           iterator++
               if(iterator%5===0)color++;
               ctx.fillStyle = `rgb(${modernColors[color % 6][0]},${modernColors[color % 6][1]},${modernColors[color % 6][2]})`;

           if(!game.active) {
               ctx.fillText(`Welcome To Level ${level.levelNum}`, canvas.width / 2 - 150, canvas.height / 2);
               ctx.fillText(`Press Enter To Begin `, canvas.width / 2 - 2000, canvas.height / 2+50);
           }
           if(ai.control) {
               ctx.fillText("Start Game", canvas.width / 2-150, canvas.height / 2);
               ctx.fillText("Click Anywhere!", canvas.width / 2-170, canvas.height / 2 + 50);
           }else {
               if (game.powerActive) {
                   if (!displayed) {
                       ctx.fillText(`${chosenPowerUp}`, canvas.width / 2 - 100, canvas.height / 2)
                       setTimeout(() => displayed = true, 2000);
                   }
               }
           }
        if (hit) {
            function hitAnimate() {
                let title = < HTMLSpanElement > document.getElementById("gameName");
                title.style.animation = "brickHit .3s 5";
                setTimeout(reload, 600);
            }
            hitAnimate();

            function reload() {
                let title = < HTMLSpanElement > document.getElementById("gameName");
                let child = < HTMLSpanElement > title.cloneNode(false);
                ScoreBoard.replaceChild(child, title);
                child.style.animation = "color 2s infinite";
                hit = false;
            }

        }
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
        level.bricks = [];
        game.powerActive = false;
        getPowers();
        level.balls.splice(0, level.balls.length - 1);
        level.balls.forEach(ball => {
            ball.position.x = canvas.width / 2;
            ball.position.y = canvas.height / 2;
        });
        player.position.x = canvas.width / 2 - player.width / 2;
        game.active = false;
        level.numOfPowers = 1;
        level.makeBricks();
    },
};

interface game {
    lives: number;
    balls: number;
    active: boolean;
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
    active: false,
    powerActive: false,
    over: false,
};


/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */

interface gameLogic {
    ballLoop: () => any;
    ends: () => any;
    win: () => any;
    demo: () => any;
    gameOver: () => any;
    loseLife: () => any;
}
const gameLogic: gameLogic = {
    ballLoop() {
        level.balls.forEach((orb: Ball) => {
            orb.show();
            orb.contact(player);
            orb.move();
            orb.hitWall();
            ai.logic(orb);
            for (let i = level.balls.length; i > 0; i--) {
                if (level.balls[i - 1].ballLost) level.balls.splice(i - 1, 1);
            }
        })
    },
    ends() {
        if (level.bricks.length === 0) {
            this.win();
        }
        if (level.balls.length < 1) {
            this.loseLife();
        }
        if (game.lives === 0) {
            this.gameOver();
        }
    },
    win() {
        level.balls.splice(0, level.balls.length - 1);
        level.levelNum += 1;
        level.numOfPowers += 1;
        level.numOfRows += 1;
        level.weakestBrick += 1;
        level.balls.forEach((ball: Ball) => {
            ball.position.x = canvas.width / 2;
            ball.position.y = canvas.height / 2;    
        });
        level.numOfPowers = level.levelNum;
        if (!ai.control) game.active = false;
        level.makeBricks();
    },
    gameOver() {
        if (!game.active) {
            game.active = false;
            game.powerActive = false;
            game.over = true;
            if (clickHandler) {
                level.numOfPowers = 1;
                level.bricks = [];
                level.makeBricks();
                level.score = 0;
                level.levelNum = 1;
                game.lives += 3;
                game.over = false;
                player.position.x = canvas.width / 2 - player.width / 2;
            }
        }
    },
    demo() {
        // While demo is running controls demo elements
        // allows players to start game
        if (ai.control) {
            //ctx.fillStyle = "black";
            //ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2);
            //ctx.fillText("Click Anywhere!", canvas.width / 2, canvas.height / 2 + 24)
            game.active = true;
            player.demo(ai)
        } else {
            player.move();
        }
    },
    loseLife() {
        level.balls.push(new Ball(canvas.width / 2, canvas.height / 2));
        game.lives--;
        game.powerActive = false;
        game.active = false;
        getPowers();
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
    loseEffect: () => any;
}
interface doubler {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
interface extraLife {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}

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
        loseEffect(paddle: Paddle = player) {
            paddle.width = canvas.width / 5;
        }
    },
    multiBall: < multiBall > {
        counter: < number > 0,
        maxBall: < number > 10,
        effect(numOfBalls: number = 5) {
            this.maxBall = numOfBalls;
            for (this.counter; this.counter < this.maxBall; this.counter++) {
                level.balls.push(new Ball(level.balls[0].position.x + this.counter * 3, level.balls[0].position.y));
                level.balls.push(new Ball(level.balls[0].position.x - this.counter * 3, level.balls[0].position.y));
            }
            this.counter = 0;
        },
        loseEffect() {
            game.powerActive = false;
        },
    },

    extraLife: < extraLife > {
        effect() {
            game.lives += 1;
        },
        loseEffect() {
            game.powerActive = false;
        },
    }
};
// Game Setup..

(() => {
    makeCanvas("canvas");
    window.onload = function () {
        
        document.addEventListener("keydown", (event) => {
                keyPressed = event.key;
                if (keyPressed === "ArrowLeft") keyBoard.ArrowLeft = true;
                if (keyPressed === "ArrowRight") keyBoard.ArrowRight = true;
                if (keyPressed === "Enter" && !ai.control) {
                    if (!game.active) {
                        game.active = true
                    }
                }
                if (["Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].indexOf(event.code) > -1) {
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
        let clicked = () => {
            if (ai.control) {
                ai.control = false;
                level.reset()
            }
        };
        canvas.addEventListener("click", clicked, {
            once: true
        });

    };
    setup();
})();

function setup() {

    ai = new Ai();
    ball = new Ball(240, 240);
    player = new Paddle(canvas.width / 2, canvas.height - canvas.height * .2);
    level.makeBricks();
    level.balls.push(ball);
    ai.control = true;
    game.active = false;
    draw()
}


function draw() {
    styler();
     drawBackground();
     level.showBricks();
     gameLogic.ballLoop();
     level.scoreboard();
     gameLogic.ends();
     gameLogic.demo();
     player.move();
     player.show();
     gameLoop(draw);


}