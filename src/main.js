import animatedBackground from "./animatedBackground.js";
import { makeCanvas, drawBackground, gameLoop } from "./functions.js";
import Ai from "./AI.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import { level } from "./Level.js";
import { gameLogic } from "./GameLogic.js";
import { addControls } from "./controls.js";

// Global Variables
// Contains All Varibles that occupy the global scope of the project
// these are used to pass information to other parts of the program!

export let ball;
export let player;

export let ai;

export let PaddleSpeed = 6;

export let cracks = new animatedBackground(5);
cracks.addSprites(
    "https://raw.githubusercontent.com/miaklwalker/BrickBreaker/master/docs/cracks/crack0",
    ".png",
);

export const keyBoard = {
    ArrowLeft: false,
    ArrowRight: false,
};

/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself!
 */
export const game = {
    lives: 3,
    balls: 1,
    active: false,
    powerActive: false,
    over: false,
    hit: false,
};

// Anonymous IIFE to load Everything!
(() => {
    makeCanvas();
    window.onload = function() {
        addControls()
        let clicked = () => {
            if (ai.control) {
                ai.control = false;
                level.reset();
            }
        };
        canvas.addEventListener("click", clicked, {
            once: true,
        });
        setup();
    };
})();

function setup() {
    ai = new Ai();
    ball = new Ball(canvas.width / 2, canvas.height / 2);
    player = new Paddle(canvas.width / 2, canvas.height - canvas.height * 0.2);
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
