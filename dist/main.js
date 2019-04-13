"use strict";
/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
class Ai {
    constructor() {
        this.position = new Vector();
        this.control = true;
        this.offset = 0;
    }
    /**
     * @method logic - a very simple AI implementation , Checks what side of the screen has the most bricks and tries to angle the paddle so it hits the ball to that side
     * it also follows the balls x-position
     * @param ball - Pass a ball to the logic so it can track the x position
     */
    logic(ball) {
        let right = 0;
        let left = 0;
        level.bricks.forEach((brick) => brick.position.x > canvas.width / 2 ? right++ : left++);
        if (right > left) {
            this.choose("left");
        }
        else if (left > right) {
            this.choose("right");
        }
        else {
            this.choose("middle");
        }
        this.position.x = ball.position.x;
    }
    /**
     * @method choice -This is the function that decides how the paddles angles to hit the bricks on the side with the most bricks
     * @param choice
     */
    choose(choice) {
        let offset = 0;
        switch (choice) {
            case "left":
                for (offset; offset >= -30; offset -= 1) {
                    this.position.x += ball.position.x + offset;
                }
                break;
            case "right":
                for (offset; offset <= 30; offset += 1) {
                    this.position.x += ball.position.x + offset;
                }
                break;
            default:
                this.offset = 0;
                this.position.x += ball.position.x + offset;
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
    constructor(x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(1, 7);
        this.radius = (canvas.width / 1.3 * canvas.height) * .00003443;
        this.speedLimit = 6;
        this.ballLost = false;
    }
    /**
     * @method contact -controls the Balls actions upon hitting the paddle
     * @param paddle
     */
    contact(paddle) {
        if (!(this.position.y > paddle.position.y + paddle.height)) {
            if (this.position.y > paddle.position.y - this.radius &&
                this.position.x > paddle.position.x - this.radius &&
                this.position.x < paddle.position.x + paddle.width + this.radius) {
                if (this.velocity.y > 0) {
                    let ballMap = (this.position.x - paddle.position.x) / ((paddle.position.x + paddle.width) - paddle.position.x) * (2 - (-2)) - 2;
                    this.acceleration.x += ballMap * 1.5;
                    this.velocity.y *= -1;
                }
            }
        }
    }
    /**
     * @method move - Controls how the Ball moves every animation frame
     */
    move() {
        if (game.active) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.velocity.limit(6);
            this.acceleration.mult(0);
        }
    }
    /**
     * @method hitWall - controls the Ball's actions up hitting the wall of the game area
     *
     */
    hitWall() {
        if (this.position.y >= canvas.height - this.radius) {
            this.ballLost = true;
        }
        // * if ball hits top of the canvas reverse direction
        if (this.position.y <= this.radius) {
            this.velocity.y *= -1;
        }
        // * if ball hits the right side of the canvas reverse direction
        if (this.position.x >= canvas.width - (this.radius + this.radius * .01)) {
            this.velocity.x *= -1;
            this.position.x - 2;
        }
        //  * if ball hits the left side of the canvas reverse direction
        if (this.position.x <= (this.radius + this.radius * .01)) {
            this.velocity.x *= -1;
            this.position.x + 2;
        }
    }
    /**
     * @method show -Shows the Brick object based on the currently Selected Style!
     */
    show() {
        let myGradient = ctx.createRadialGradient(this.position.x, this.position.y, this.radius * .14, this.position.x, this.position.y, this.radius);
        myGradient.addColorStop(0, `${ballStyle[0]}`);
        myGradient.addColorStop(1, `${ballStyle[1]}`);
        ctx.fillStyle = myGradient;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
/**
 * @class Brick
 * @classdesc Creates a Brick Object{} That has a position and Health!
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
class Brick {
    constructor(x, y, health) {
        this.position = new Vector(x, y);
        this.width = (canvas.width / 10) - 2.5;
        this.height = (canvas.height / 20) - 4;
        this.health = health;
        this.startingHealth = health;
        this.effect = false;
        this.cracked = false;
    }
    /**
     * @method hit -Decrements The Brick Objects Health When Hit.
     */
    hit() {
        this.health -= 1;
        this.cracked = true;
    }
    /**
     * @method show -Shows the Brick object based on the Current Style
     */
    show() {
        let crack = cracks.staticSprite(this.health);
        let setOne = brickStyle.set1[this.health - 1];
        let setTwo = brickStyle.set2[this.health - 1];
        if (this.effect) {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0, `${setOne[0][0]}`);
            myGradient.addColorStop(.6, `${setOne[1][0]}`);
            myGradient.addColorStop(1, `${setOne[2][0]}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        else {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0, `${setTwo[0][0]}`);
            myGradient.addColorStop(.6, `${setTwo[1][0]}`);
            myGradient.addColorStop(1, `${setTwo[2][0]}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        if (this.cracked === true) {
            ctx.drawImage(crack, this.position.x, this.position.y, this.width, this.height);
        }
    }
}
/**
 *@function collisionDetect
 * @param tempBrick
 * @desc Hands The Collision Function Each Ball Object and tests Each Brick for collision;
 */
function collisionsDetect(tempBrick) {
    level.balls.forEach((orb) => collisions(orb, tempBrick));
}
/**
 * @function Collision
 * @param circle
 * @param rectangle
 * @description - Accepts a Ball and a Brick as Arguements then tests if a collision occurs for either
 */
function collisions(circle, rectangle) {
    let circleX = circle.position.x;
    let circleY = circle.position.y;
    let radius = circle.radius;
    let rectangleX = rectangle.position.x;
    let rectangleY = rectangle.position.y;
    let rectangleWidth = rectangle.width;
    let rectangleHeight = rectangle.height;
    let leftRight = false;
    let topBottom = false;
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
    let distX = circleX - testX;
    let distY = circleY - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= (radius / 2) + radius * .6) {
        if (topBottom && leftRight) {
            circle.velocity.x *= -1;
            circle.velocity.y *= -1;
            rectangle.hit();
            hit = true;
        }
        else {
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
/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */
const gameLogic = {
    ballLoop() {
        level.balls.forEach((orb) => {
            orb.show();
            orb.contact(player);
            orb.move();
            orb.hitWall();
            ai.logic(orb);
            for (let i = level.balls.length; i > 0; i--) {
                if (level.balls[i - 1].ballLost)
                    level.balls.splice(i - 1, 1);
            }
        });
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
        level.balls.forEach((ball) => {
            ball.position.x = canvas.width / 2;
            ball.position.y = canvas.height / 2;
        });
        level.numOfPowers = level.levelNum;
        if (!ai.control)
            game.active = false;
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
            game.active = true;
            player.demo(ai);
        }
        else {
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
const level = {
    levelNum: 1,
    numOfPowers: 1,
    numOfRows: 3,
    weakestBrick: 1,
    score: 0,
    bricks: [],
    balls: [],
    fortifier: 0,
    GameText() {
        let _scoreBoard = new scoreBoard();
        if (!_scoreBoard.drawn) {
            _scoreBoard.drawScoreBoard();
        }
        _scoreBoard.drawGameName;
        iterator++;
        ctx.font = `${textStyle}`;
        if (iterator % 5 === 0)
            color++;
        ctx.fillStyle = `rgb(${modernColors[color % 6][0]},${modernColors[color % 6][1]},${modernColors[color % 6][2]})`;
        if (!game.active) {
            ctx.fillText(`Welcome To Level ${level.levelNum}`, canvas.width / 2 - textLocation[0], canvas.height / 2);
            ctx.fillText(`Press Enter To Begin `, canvas.width / 2 - textLocation[0], canvas.height / 2 + textLocation[1]);
        }
        if (ai.control) {
            ctx.fillText("Start Game", canvas.width / 2 - textLocation[0], canvas.height / 2);
            ctx.fillText("Click Anywhere!", canvas.width / 2 - textLocation[0], canvas.height / 2 + textLocation[1]);
        }
        else {
            if (game.powerActive) {
                if (!displayed) {
                    ctx.fillText(`${chosenPowerUp}`, canvas.width / 2 - 100, canvas.height / 2);
                    setTimeout(() => displayed = true, 2000);
                }
            }
        }
        if (hit) {
            function hitAnimate() {
                let title = document.getElementById("gameName");
                title.style.animation = "brickHit .3s 5";
                setTimeout(reload, 600);
            }
            hitAnimate();
            function reload() {
                let title = document.getElementById("gameName");
                let child = title.cloneNode(false);
                _scoreBoard.scoreboard.replaceChild(child, title);
                child.style.animation = "color 2s infinite";
                hit = false;
            }
        }
    },
    makeEffect() {
        return (level.numOfPowers > 0 && Math.random() > .7);
    },
    fortifyBricks() {
        if (level.levelNum % 5 === 0)
            this.fortifier += 1;
    },
    makeBricks() {
        // Sets a Health Limit for Bricks
        const LIMIT = 5;
        let limitBricks = level.weakestBrick > LIMIT ? LIMIT : level.weakestBrick;
        this.fortifyBricks();
        // Sets up the row the bricks are drawn on
        let rowPosition = (level.numOfRows * canvas.height / 20 + canvas.height / 20);
        level.weakestBrick = 1 + this.fortifier;
        for (rowPosition; rowPosition > canvas.height / 20; rowPosition -= canvas.height / 20) {
            let limitBricks = level.weakestBrick > LIMIT ? LIMIT : level.weakestBrick;
            for (let i = 10 - 1; i > -1; i--) {
                if (this.makeEffect()) {
                    brick = new Brick(i * canvas.width / 10, rowPosition, limitBricks);
                    level.numOfPowers--;
                    brick.effect = true;
                    level.bricks.push(brick);
                }
                else {
                    level.bricks.push(new Brick(i * canvas.width / 10, rowPosition, limitBricks));
                }
            }
            level.weakestBrick++;
        }
    },
    showBricks() {
        for (let i = 0; i < level.bricks.length; i++) {
            level.bricks[i].show();
            collisionsDetect(level.bricks[i]);
            if (level.bricks[i].health <= 0) {
                let img = cracks.Sprite(5);
                ctx.drawImage(img, level.bricks[i].position.x, level.bricks[i].position.y, level.bricks[i].width, level.bricks[i].height);
                let broke = level.bricks.splice(i, 1);
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
/**
 * @class Paddle
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
class Paddle {
    constructor(x, y) {
        this.width = canvas.width / 5;
        this.height = canvas.height * .02474;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
    }
    /**
     * @method show -Shows the Paddle object based on the currently selected Style!
     */
    show() {
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, `${paddleStyle[0]}`);
        myGradient.addColorStop(.45, `${paddleStyle[1]}`);
        myGradient.addColorStop(1, `${paddleStyle[2]}`);
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    /**
     * @method move -Allows the user to use the Left & Right Arrow keys to control the paddle!
     */
    move() {
        if (!ai.control) {
            if (keyBoard.ArrowLeft) {
                this.velocity.x = -PaddleSpeed;
            }
            else if (keyBoard.ArrowRight) {
                this.velocity.x = PaddleSpeed;
            }
            else {
                this.velocity.x = 0;
            }
            this.velocity.limit(4);
            this.position.add(this.velocity);
            if (this.position.x <= 0) {
                this.position.x = 0;
            }
            else if (this.position.x + this.width >= canvas.width) {
                this.position.x = canvas.width - this.width;
            }
        }
        else {
            this.demo(ai);
        }
    }
    /**
     * @method demo -When the first loads this lets the computer control the game while the player watches and picks themes
     * @param ai
     */
    demo(ai) {
        this.position.x = ai.position.x - this.width / 2;
        if (this.position.x <= 0)
            this.position.x = 0;
        else if (this.position.x + this.width >= canvas.width)
            this.position.x = canvas.width - this.width;
    }
}
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
const PowerUps = {
    doubler: {
        effect(paddle = player) {
            if (paddle.width < canvas.width / 4) {
                paddle.width *= 2;
            }
            else if (paddle.width < canvas.width / 2) {
                paddle.width *= 1.5;
            }
            else {
                PowerUps.multiBall.effect();
            }
        },
        loseEffect(paddle = player) {
            paddle.width = canvas.width / 5;
        }
    },
    multiBall: {
        counter: 0,
        maxBall: 10,
        effect(numOfBalls = 5) {
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
    extraLife: {
        effect() {
            game.lives += 1;
        },
        loseEffect() {
            game.powerActive = false;
        },
    }
};
class scoreBoard {
    constructor() {
        this.scoreboard = document.getElementById("ScoreBoard");
        this.div = this.scoreboard.children;
        this.drawn = false;
    }
    drawScoreBoard() {
        this.scoreboard.style.fontFamily = `${fontStyle[0]}`;
        this.scoreboard.style.fontSize = `${fontStyle[1]}`;
        this.div[1].innerHTML = `${level.score}  `;
        this.div[3].innerHTML = `${level.levelNum}`;
        this.div[4].innerHTML = `----BRICK BREAKER!----`;
        this.div[6].innerHTML = `${game.lives}`;
        this.div[8].innerHTML = `${level.balls.length}`;
    }
    drawScore() {
        this.div[1].innerHTML = `${level.score}  `;
    }
    drawLevelNum() {
        this.div[3].innerHTML = `${level.levelNum}`;
    }
    drawGameName() {
        this.div[5].innerHTML = `----BRICK BREAKER!----`;
    }
    drawLives() {
        this.div[6].innerHTML = `${game.lives}`;
    }
    drawBalls() {
        this.div[8].innerHTML = `${level.balls.length}`;
    }
}
let index = ['Zelda', 'Retro', 'Zelda', 'Modern', 'PacMan'];
let styleSelect = document.getElementById("colorSelect");
let selectedStyle = styleSelect.selectedIndex;
let selectionWatcher = document.querySelector('.styleSelector');
selectionWatcher.addEventListener('change', (event) => {
    selectedStyle = event.target.selectedIndex;
    styler(stylesJson);
});
/**
 * @function styler
 * @description - gets the players choice of theme and then passes that arguement to the style sheet
 * which returns values for Ball , Brick , Fonts , TextSize, Paddle and Background Styles
 */
function styler(styleSheet) {
    modernColors = styleSheet.Styles[index[selectedStyle]].color;
    brickStyle = styleSheet.Styles[index[selectedStyle]].brick;
    textStyle = styleSheet.Styles[index[selectedStyle]].text;
    ballStyle = styleSheet.Styles[index[selectedStyle]].ball;
    paddleStyle = styleSheet.Styles[index[selectedStyle]].paddle;
    fontStyle = styleSheet.Styles[index[selectedStyle]].font;
    backgroundStyle = styleSheet.Styles[index[selectedStyle]].background;
    textLocation = styleSheet.Styles[index[selectedStyle]].textLocation;
}
// Classes
/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 * @method add - Adds Two Vectors Together X+X Y+Y
 * @method mult - Multiplies Either Two Vecors (X * X , Y * Y) or by a scala (X * S , Y * S)
 * @method div - The inverse of Mult Divides Either by a Vector or a Scala!
 * @method limit -Forces the Magnatude of the vector to a specified number if it is greater
 */
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    mult(factor) {
        if (factor instanceof Vector) {
            this.x *= factor.x;
            this.y *= factor.y;
        }
        else {
            this.x *= factor;
            this.y *= factor;
            return this;
        }
    }
    div(divisor) {
        if (divisor instanceof Vector) {
            this.x /= divisor.x;
            this.y /= divisor.y;
        }
        else {
            this.x /= divisor;
            this.y /= divisor;
        }
    }
    limit(max) {
        let mSq = (this.x * this.x) + (this.y * this.y);
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)); //normalize it
            this.mult(max);
        }
        return this;
    }
}
class animatedSprites {
    constructor(numberOfSprites) {
        this.frame = 0;
        this.counter = 0;
        this.sprites = [];
        this.numberOfSprites = numberOfSprites;
    }
    addSprites(url, format) {
        for (let i = 0; i < this.numberOfSprites; i++) {
            let img = new Image();
            img.src = `${url}${i}${format}`;
            this.sprites.push(img);
        }
    }
    Sprite(fr) {
        this.counter++;
        if (this.counter % fr === 0) {
            this.frame++;
        }
        return this.sprites[this.frame % this.numberOfSprites];
    }
    staticSprite(index) {
        return this.sprites[index];
    }
}
let frame = 0;
let counter = 0;
// Functions
/**
 *
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480"
 * @param height - The height of the Canvas as a string "480"
 */
function makeCanvas(name, width, height) {
    let w = width || (window.innerWidth * .75).toString();
    let h = height || (3 * window.innerHeight / 4).toString();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.setAttribute("id", name);
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
}
// Registers an Event if user click the canvas
let clickHandler = () => canvas.addEventListener("click", () => true, false);
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
function getPowers() {
    let Random = (Math.floor(Math.random() * 100));
    let powerUpList = Object.keys(PowerUps);
    chosenPowerUp = powerUpList[Random % powerUpList.length];
    if (game.powerActive) {
        PowerUps[chosenPowerUp].effect();
    }
    else if (!game.powerActive) {
        PowerUps.doubler.loseEffect();
    }
}
let zelda = new animatedSprites(31);
zelda.addSprites("../docs/zelda/tile", ".jpg");
/**
 * Sets up Loop Call Backs
 * @param name - is the name of the call back function you want to use!
 */
function gameLoop(name) {
    requestAnimationFrame(name);
}
/**
 * @function drawBackground
 * @description - Draws The Background of the level using the Theme selected By the Player
 */
function drawBackground() {
    if (backgroundStyle[1] === false) {
        ctx.fillStyle = backgroundStyle[0];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else {
        let img = zelda.Sprite(8);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
// Global Variables
// Contains All Varibles that occupy the global scope of the project
// these are used to pass information to other parts of the program!
let canvas;
let ctx;
let ball;
let brick;
let player;
let clicked;
let keyPressed;
let ai;
let keyRel;
let PaddleSpeed = 6;
let hit = false;
let title;
let color = 0;
let iterator = 0;
let chosenPowerUp;
let displayed;
let stylesJson;
let textLocation;
let modernColors;
let brickStyle;
let paddleStyle;
let textStyle;
let ballStyle;
let fontStyle;
let backgroundStyle;
let cracks = new animatedSprites(5);
cracks.addSprites("../docs/cracks/crack0", ".png");
async function GetJson() {
    let response = await fetch("../lib/JSON/BrickBreaker.json");
    let styleSheet = await response.json();
    return styleSheet;
}
GetJson()
    .then(Json => stylesJson = Json)
    .then(() => styler(stylesJson));
const keyBoard = {
    ArrowLeft: false,
    ArrowRight: false,
};
/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself!
 */
const game = {
    lives: 3,
    balls: 1,
    active: false,
    powerActive: false,
    over: false,
};
// Anonymous IIFE to load Everything!
(() => {
    makeCanvas("canvas");
    window.onload = function () {
        document.addEventListener("keydown", (event) => {
            keyPressed = event.key;
            if (keyPressed === "ArrowLeft")
                keyBoard.ArrowLeft = true;
            if (keyPressed === "ArrowRight")
                keyBoard.ArrowRight = true;
            if (keyPressed === "Enter" && !ai.control) {
                if (!game.active) {
                    game.active = true;
                }
            }
            if (["Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].indexOf(event.code) > -1) {
                event.preventDefault();
            }
        }, false);
        document.addEventListener("keyup", (event) => {
            keyRel = event.key;
            if (keyRel === "ArrowLeft")
                keyBoard.ArrowLeft = false;
            if (keyRel === "ArrowRight")
                keyBoard.ArrowRight = false;
        }, false);
        let clicked = () => {
            if (ai.control) {
                ai.control = false;
                level.reset();
            }
        };
        canvas.addEventListener("click", clicked, {
            once: true
        });
        setup();
    };
})();
function setup() {
    ai = new Ai();
    ball = new Ball(canvas.width / 2, canvas.height / 2);
    player = new Paddle(canvas.width / 2, canvas.height - canvas.height * .2);
    level.makeBricks();
    level.balls.push(ball);
    ai.control = true;
    game.active = false;
    draw();
}
function draw() {
    drawBackground();
    level.showBricks();
    gameLogic.ballLoop();
    level.GameText();
    gameLogic.ends();
    gameLogic.demo();
    player.move();
    player.show();
    gameLoop(draw);
}
//# sourceMappingURL=main.js.map