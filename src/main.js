import animatedBackground from "./animatedBackground.js";
import { gameLoop } from "./functions.js";
import { drawBackground } from "./drawBackground.js";
import Ai from "./AI.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import { level } from "./Level.js";
import { gameLogic } from "./GameLogic.js";
import { addControls } from "./controls.js";
import gameDemo from "./gameDemo.js";
import {game} from "./game.js"
import canvasConfig from "./canvasConfig.js";


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



setup();
function setup() {
    canvasConfig();
    gameDemo();
    addControls();
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
