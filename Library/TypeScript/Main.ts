import { Ball } from './Ball';

import { Brick } from './Brick';

import { Paddle } from './Paddle';

import { Ai } from './Ai';

import { makeCanvas } from './Functions';

import { game, level, gameLogic } from './Objects';

declare let canvas: HTMLCanvasElement,
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
    brickStyle: any[] | string[]
 ;
 modernColors = [
    [218, 247, 166],
    [255, 195, 0],
    [255, 87, 51],
    [199, 0, 57],
    [133, 193, 233],
    [46, 204, 113]];
let clickHandler = () => canvas.addEventListener("click", () => true, false);


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
                    } else {
                        game.active = true;
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