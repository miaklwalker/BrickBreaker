let brick, player, ball, LevelNumber;
LevelNumber = 1;
let balls = level.Balls;

function setup() {
	let canvas = createCanvas(485, 480);
	level.makeBricks();
	level.Balls.push(ball = new Ball(width / 2, height / 2));
	player = new Paddle(width / 2.45, 450);
}



function draw() {
	colorMode(RGB);
	background(205);
	text("Level: " + level.levelNum, 10, 20);
	text("score: " + level.score, 10, 40);
	text("lives: " + game.lives, 100, 20);
	balls.forEach(ball => {
		ball.show();
		ball.start();
		ball.move();
		ball.contact(player);
	})
	level.show();
	level.win(ball);
	player.show();
	player.move();

	if (game.lives === 0) {
		gameOver();
	}
}