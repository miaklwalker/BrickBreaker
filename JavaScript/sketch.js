// A Working Demo Of The Library

// Global Scope Varibles
let brick, player, ball, LevelNumber;
LevelNumber = 1;
let balls = level.Balls;

// Setup Initates the code and is ran Once
function setup() {
	createCanvas(485, 480);
	level.makeBricks();
	balls.push(new Ball(width / 2, height / 2));
	console.log(balls);
	player = new Paddle(width / 2.45, 450);
	game.active = false
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
	if (keyIsDown(ENTER)) {
		game.active = true;
	}
	// The Ball loop , This checks , draws, and can Delete any and every ball
	balls.forEach(orb => {
		orb.start();
		orb.show();
		orb.contact(player)
		orb.move();
		for (let i = balls.length; i > 0; i--) {
			if (balls[i - 1].ballLost) {
				balls.splice(i - 1, 1)
				console.log(balls.length)
			}
		}
	})
	
	level.show();
	player.show();
	player.move();

	// These are level and life end conditions
	if (level.bricks.length === 0) {
	level.win();
	}
	if (balls.length < 1) {
		loseLife();
	}
	if (game.lives === 0) {
		gameOver();
	}
}