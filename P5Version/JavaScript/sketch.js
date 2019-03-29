// A Working Demo Of The Library

// Global Scope Varibles


let brick, player, ball, LevelNumber, ai;
LevelNumber = 1;
let balls = level.Balls;

// Setup Initiates the code and is ran Once
function setup() {
	createCanvas(windowWidth,windowHeight);
	level.makeBricks();
	balls.push(new Ball(width / 2, height / 2));
	player = new Paddle(width / 2, height - height*.2);
	ai = new Ai();
	game.active = false;
	ai.control = true;
}
// Draw is a loop Commonly called a "Game Loop".
// This is where all elements are Drawn to the screen.
// This is also where the Game Conditions such as life is tested.
// The Draw loop is ran every Frame
function draw() {
	colorMode(RGB);
	background(205);
	level.scoreboard();
    gameLogic.ballLoop();
	gameLogic.demo();
	level.show();
	player.show();
    gameLogic.ends()
}


function resizeWindow(){
	createCanvas(windowWidth,windowHeight);
}