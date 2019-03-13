let brick, player, ball, hc, lvNum;
let balls = []
lvNum = 1

function setup() {
	createCanvas(485, 480);
	level.makeBricks();
	ball = new Ball(width / 2, height / 2);
	player = new Paddle(width / 2.45, 450);
}



function draw() {
	colorMode(RGB)
	background(205);
	level.show();
	level.win(ball);
	ball.show()
	ball.start();
	player.show();
	player.move();
	ball.move();
	ball.contact(player)
}