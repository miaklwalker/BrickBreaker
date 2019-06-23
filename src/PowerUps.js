import {game} from './game.js'
import { player } from "./main.js";
import Ball from "./Ball.js";
import {level} from "./Level.js"

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

export const PowerUps = {
    doubler: {
        effect(paddle = player) {
            if (paddle.width < canvas.width / 4) {
                paddle.width *= 2;
            } else if (paddle.width < canvas.width / 2) {
                paddle.width *= 1.5;
            } else {
                PowerUps.multiBall.effect();
            }
        },
        loseEffect(paddle = player) {
            paddle.width = canvas.width / 5;
        },
    },
    multiBall: {
        counter: 0,
        maxBall: 10,
        effect(numOfBalls = 5) {
            this.maxBall = numOfBalls;
            for (this.counter; this.counter < this.maxBall; this.counter++) {
                level.balls.push(
                    new Ball(
                        level.balls[0].position.x + this.counter * 3,
                        level.balls[0].position.y,
                    ),
                );
                level.balls.push(
                    new Ball(
                        level.balls[0].position.x - this.counter * 3,
                        level.balls[0].position.y,
                    ),
                );
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
    },
};
