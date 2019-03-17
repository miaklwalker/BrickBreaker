// A Working Demo Of The Library

// Global Scope Varibles
let brick, player, ball, LevelNumber, ai;
LevelNumber = 1;
let balls = level.Balls;

// Setup Initates the code and is ran Once
function setup() {
	createCanvas(485, 480);
	level.makeBricks();
	balls.push(new Ball(width / 2, height / 2));
	console.log(balls);
	player = new Paddle(width / 2.45, 450);
	ai = new Ai();
	game.active = false
	ai.control = true

}


// Draw is a loop Commonly called a "Game Loop".
// This is where all elements are Drawn to the screen.
// This is also where the Game Conditions such as life is tested.
// The Draw loop is ran every Frame

function draw() {
	colorMode(RGB);
	background(205);
	text("Level: " + level.levelNum, 10, 20);
	text("score: " + level.score, 10, 40);
	text("lives: " + game.lives, 100, 20);
	text("Ball : " + balls.length, 100, 40)
	// Starts The Game for the player
	// Starts the players Game
	if (mouseIsPressed) {
		if(ai.control){
		ai.control = false;
		level.reset()
		}
	}
	if (keyIsDown(ENTER)) {
		game.active = true;
	}
	if(ai.control === true) {
		text("Start Game", width / 2, height / 2)
		game.active = true;
        player.demo(ai)
	}else{
     player.move();
	}
    level.ballLoop()
	level.show();
	player.show();
	
    level.logic()
	
}