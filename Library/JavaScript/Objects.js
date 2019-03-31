"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const level = {
    levelNum: 1,
    numOfPowers: 1,
    numOfRows: 3,
    weakestBrick: 1,
    score: 0,
    bricks: [],
    balls: [],
    fortifier: 0,
    scoreboard() {
        let ScoreBoard = document.getElementById("ScoreBoard");
        let span = ScoreBoard.children;
        span[0].innerHTML = `score : ${level.score}  `;
        span[1].innerHTML = `Level : ${level.levelNum}`;
        span[2].innerHTML = `----BRICK BREAKER!----`;
        span[3].innerHTML = `Lives : ${exports.game.lives}`;
        span[4].innerHTML = `balls : ${level.balls.length}`;
        ctx.font = `24px 'Press Start 2P'`;
        iterator++;
        if (iterator % 5 === 0)
            color++;
        ctx.fillStyle = `rgb(${modernColors[color % 6][0]},${modernColors[color % 6][1]},${modernColors[color % 6][2]})`;
        if (!exports.game.active) {
            ctx.fillText(`Welcome To Level ${level.levelNum}`, canvas.width / 2 - 100, canvas.height / 2);
            ctx.fillText(`Press Enter To Begin `, canvas.width / 2 - 100, canvas.height / 2 + 24);
        }
        if (ai.control) {
            ctx.fillText("Start Game", canvas.width / 2 - 100, canvas.height / 2);
            ctx.fillText("Click Anywhere!", canvas.width / 2 - 100, canvas.height / 2 + 24);
        }
        else {
            if (exports.game.powerActive) {
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
                ScoreBoard.replaceChild(child, title);
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
        this.fortifyBricks();
        let rowPosition = (level.numOfRows * canvas.height / 20 + canvas.height / 20);
        level.weakestBrick = 1 + this.fortifier;
        for (rowPosition; rowPosition > canvas.height / 20; rowPosition -= canvas.height / 20) {
            for (let i = 10 - 1; i > -1; i--) {
                if (this.makeEffect()) {
                    brick = new Brick(i * canvas.width / 10, rowPosition, level.weakestBrick);
                    level.numOfPowers--;
                    brick.effect = true;
                    level.bricks.push(brick);
                }
                else {
                    level.bricks.push(new Brick(i * canvas.width / 10, rowPosition, level.weakestBrick));
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
                let broke = level.bricks.splice(i, 1);
                if (broke[0].effect) {
                    exports.game.powerActive = true;
                    getPowers();
                }
                level.score += broke[0].startingHealth * 500;
            }
        }
    },
    reset() {
        level.bricks = [];
        exports.game.powerActive = false;
        getPowers();
        level.balls.splice(0, level.balls.length - 1);
        level.balls.forEach(ball => {
            ball.position.x = canvas.width / 2;
            ball.position.y = canvas.height / 2;
        });
        player.position.x = canvas.width / 2 - player.width / 2;
        exports.game.active = false;
        level.numOfPowers = 1;
        level.makeBricks();
    },
};
/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself!
 */
exports.game = {
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
exports.gameLogic = {
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
        if (exports.game.lives === 0) {
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
            ai.control ? ball.velocity.x = 1 : ball.velocity.x = 0;
            ai.control ? ball.velocity.y = 7 : ball.velocity.y = 0;
        });
        level.numOfPowers = level.levelNum;
        if (!ai.control)
            exports.game.active = false;
        level.makeBricks();
    },
    gameOver() {
        if (!exports.game.active) {
            exports.game.active = false;
            exports.game.powerActive = false;
            exports.game.over = true;
            if (clickHandler) {
                level.numOfPowers = 1;
                level.bricks = [];
                level.makeBricks();
                level.score = 0;
                level.levelNum = 1;
                exports.game.lives += 3;
                exports.game.over = false;
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
            exports.game.active = true;
            player.demo(ai);
        }
        else {
            player.move();
        }
    },
    loseLife() {
        level.balls.push(new Ball(canvas.width / 2, canvas.height / 2));
        exports.game.lives--;
        exports.game.powerActive = false;
        exports.game.active = false;
        getPowers();
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
exports.PowerUps = {
    doubler: {
        effect(paddle = player) {
            if (paddle.width < canvas.width / 4) {
                paddle.width *= 2;
            }
            else if (paddle.width < canvas.width / 2) {
                paddle.width *= 1.5;
            }
            else {
                exports.PowerUps.multiBall.effect();
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
            exports.game.powerActive = false;
        },
    },
    extraLife: {
        effect() {
            exports.game.lives += 1;
        },
        loseEffect() {
            exports.game.powerActive = false;
        },
    }
};
// Game Setup..
