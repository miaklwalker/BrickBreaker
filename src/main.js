

// Global Variables
// Contains All Varibles that occupy the global scope of the project
// these are used to pass information to other parts of the program!

let ball;
let brick;
let player;
let clicked;
let keyPressed;
let ai;
let keyRel;
let PaddleSpeed = 6;
let title;


let cracks = new animatedBackground(5);
cracks.addSprites("../docs/cracks/crack0",".png");





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
    hit:false,
};


// Anonymous IIFE to load Everything!
 (()=>{
    makeCanvas();
    window.onload = function () {

        document.addEventListener("keydown", (event) => {
            keyPressed = event.key;
            if (keyPressed === "ArrowLeft") keyBoard.ArrowLeft = true;
            if (keyPressed === "ArrowRight") keyBoard.ArrowRight = true;
            if (keyPressed === "Enter" && !ai.control) {
                if (!game.active) { game.active = true }
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
     setup()
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
    draw()
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