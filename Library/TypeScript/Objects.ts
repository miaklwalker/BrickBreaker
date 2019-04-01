
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
        span[0].innerHTML = `score : ${level.score}  `;
        span[1].innerHTML = `Level : ${level.levelNum}`;
        span[2].innerHTML = `----BRICK BREAKER!----`;
        span[3].innerHTML = `Lives : ${game.lives}`;
        span[4].innerHTML = `balls : ${level.balls.length}`;
           ctx.font =`24px 'Press Start 2P'`;
           iterator++;
               if(iterator%5===0)color++;
               ctx.fillStyle = `rgb(${modernColors[color % 6][0]},${modernColors[color % 6][1]},${modernColors[color % 6][2]})`;

           if(!game.active) {
               ctx.fillText(`Welcome To Level ${level.levelNum}`, canvas.width / 2 - 100, canvas.height / 2);
               ctx.fillText(`Press Enter To Begin `, canvas.width / 2 - 100, canvas.height / 2+24);
           }
           if(ai.control) {
               ctx.fillText("Start Game", canvas.width / 2-100, canvas.height / 2);
               ctx.fillText("Click Anywhere!", canvas.width / 2-100, canvas.height / 2 + 24);
           }else {
               if (game.powerActive) {
                   if (!displayed) {
                       ctx.fillText(`${chosenPowerUp}`, canvas.width / 2 - 100, canvas.height / 2);
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



/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself!
 */
export const game: game = {
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


export const gameLogic: gameLogic = {
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
            ai.control ? ball.velocity.x = 1 : ball.velocity.x = 0;
            ai.control ? ball.velocity.y = 7 : ball.velocity.y = 0;
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

export const PowerUps: PowerUps = {
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