
let brick, player, ball,LevelNumber;
LevelNumber = 1;

function setup() {
	let canvas = createCanvas(485, 480);
	level.makeBricks();
	ball = new Ball(width / 2, height / 2);
	player = new Paddle(width / 2.45, 450);
}



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
	if(game.lives === 0 ){
	gameOver();
	}
}