let brick, player, ball, LevelNumber;
LevelNumber = 1;
let balls = level.Balls;

function setup() {
	createCanvas(485, 480);
	level.makeBricks();
	balls.push(new Ball(width / 2, height / 2));
	console.log(balls);
	player = new Paddle(width / 2.45, 450);
	game.active = false
}



function draw() {
	colorMode(RGB);
	background(205);
	text("Level: " + level.levelNum, 10, 20);
	text("score: " + level.score, 10, 40);
	text("lives: " + game.lives, 100, 20);
	text("Ball : " + balls.length, 100, 40)
	if (keyIsDown(ENTER)) {
		game.active = true;
		//multiBall.effect()
	}
	balls.forEach(orb => {
		orb.start();
		orb.show();
		orb.contact(player)
		orb.move();
		TestBalls(orb)
		for (let i = balls.length; i > 0; i--) {
			if (balls[i - 1].ballLost) {
				balls.splice(i - 1, 1)
				console.log(balls.length)
			}
		}
	})
	
	level.show();
	level.win(ball);
	player.show();
	player.move();
	if (balls.length < 1) {
		loseLife();
	}
	if (game.lives === 0) {
		gameOver();
	}
}