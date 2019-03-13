
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
let brick, player, ball,LevelNumber;
LevelNumber = 1;
// eslint-disable-next-line no-unused-vars
function setup() {
	createCanvas(485, 480);
	level.makeBricks();
	ball = new Ball(width / 2, height / 2);
	player = new Paddle(width / 2.45, 450);
}


// eslint-disable-next-line no-unused-vars
function draw() {
	colorMode(RGB);
	background(205);
	text("lives: " + game.lives, 100, 20);
	level.show();
	level.win(ball);
	ball.show();
	ball.start();
	player.show();
	player.move();
	ball.move();
	ball.contact(player);
	gameOver();
}