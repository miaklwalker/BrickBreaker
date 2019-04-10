const level: level = {
    levelNum: < number > 1,
    numOfPowers: < number > 1,
    numOfRows: < number > 3,
    weakestBrick: < number > 1,
    score: < number > 0,
    bricks: < Brick[] > [],
    balls: < Ball[] > [],
    fortifier: < number > 0,
    GameText() {
        let _scoreBoard = new scoreBoard();
        if (!_scoreBoard.drawn) {
            _scoreBoard.drawScoreBoard();
        }
        _scoreBoard.drawGameName
        iterator++
        ctx.font = `${textStyle}`;
        if (iterator % 5 === 0) color++;
        ctx.fillStyle = `rgb(${modernColors[color % 6][0]},${modernColors[color % 6][1]},${modernColors[color % 6][2]})`;

        if (!game.active) {
            ctx.fillText(`Welcome To Level ${level.levelNum}`, canvas.width / 2 - textLocation[0], canvas.height / 2);
            ctx.fillText(`Press Enter To Begin `, canvas.width / 2 - textLocation[0], canvas.height / 2 + textLocation[1]);
        }
        if (ai.control) {
            ctx.fillText("Start Game", canvas.width / 2 - textLocation[0], canvas.height / 2);
            ctx.fillText("Click Anywhere!", canvas.width / 2 - textLocation[0], canvas.height / 2 + textLocation[1]);
        } else {
            if (game.powerActive) {
                if (!displayed) {
                    ctx.fillText(`${chosenPowerUp}`, canvas.width / 2 - 100, canvas.height / 2)
                    setTimeout(() => displayed = true, 2000);
                }
            }
        }
        if (hit) {
            function hitAnimate() {
                let title = < HTMLDivElement > document.getElementById("gameName");
                title.style.animation = "brickHit .3s 5";
                setTimeout(reload, 600);
            }
            hitAnimate();

            function reload() {
                let title = < HTMLDivElement > document.getElementById("gameName");
                let child = < HTMLDivElement > title.cloneNode(false);
                _scoreBoard.scoreboard.replaceChild(child, title);
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
        // Sets a Health Limit for Bricks
        const LIMIT = 5;
        let limitBricks = level.weakestBrick > LIMIT ? LIMIT : level.weakestBrick as number;
        this.fortifyBricks();
        // Sets up the row the bricks are drawn on
        let rowPosition: number = (level.numOfRows * canvas.height / 20 + canvas.height / 20);
        level.weakestBrick = 1 + this.fortifier;
        for (rowPosition; rowPosition > canvas.height / 20; rowPosition -= canvas.height / 20) {
            let limitBricks = level.weakestBrick > LIMIT ? LIMIT : level.weakestBrick as number;
            for (let i = 10 - 1; i > -1; i--) {
                if (this.makeEffect()) {
                    brick = new Brick(i * canvas.width / 10, rowPosition, limitBricks);
                    level.numOfPowers--;
                    brick.effect = true;
                    level.bricks.push(brick);
                } else {
                    level.bricks.push(new Brick(i * canvas.width / 10, rowPosition, limitBricks));
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