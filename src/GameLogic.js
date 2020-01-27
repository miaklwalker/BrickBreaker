import { level } from "./Level.js";
import { player, ai,game} from "./main.js";
import Ball from "./Ball.js";
import { clickHandler } from "./functions.js";
import { getPowers } from "./getPowers.js";
import {canvas} from "./functions.js";


/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */

export const gameLogic = {
    ballLoop() {
        level.balls.forEach(orb => {
            orb.show();
            orb.contact(player);
            orb.move();
            orb.hitWall();
            ai.logic(orb);
            for (let i = level.balls.length; i > 0; i--) {
                if (level.balls[i - 1].ballLost) level.balls.splice(i - 1, 1);
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
        level.balls.forEach(ball => {
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
                level.numOfRows=3;
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
        } else {
            player.move();
        }
    },
    loseLife() {
        level.balls = [];
        level.balls.push(new Ball(canvas.width / 2, canvas.height / 2));
        game.lives--;
        game.powerActive = false;
        game.active = false;
        getPowers();
    },
};
