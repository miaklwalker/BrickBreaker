// This is the level object
// this is used to store all the information for the level of the game 

const level = {
	// level properties
	levelNum: 1,
	numOfPowers: 1,
	numOfRows: 3,
	weakestBrick: 1,
	score: 0,
	bricks: [],
	Balls: [],
	fortifier: 0,


	scoreboard() {
		textSize(14);
		textAlign();
		textSize(14)
		text("Level: " + level.levelNum, 50, 20);
		text("score: " + level.score, 50, 40);
		text("lives: " + game.lives, 130, 20);
		text("Ball : " + balls.length, 130, 40)
		if (!game.active) {
			textSize(20)
			text("LEVEL:" + this.levelNum, width / 2, height / 2-60)
			text("Press Enter To Start!", width/2,height/2 -30);
		};

	},
	makeEffect() {
		if (level.numOfPowers > 0 && Math.random() > .7) {
			return true;
		} else {
			return false;
		}
	},
	fortifyBricks() {
		if (level.levelNum % 5 === 0) {
			this.fortifier += 1;
		}
	},

	makeBricks() {
		this.fortifyBricks();
		let h = (level.numOfRows * height / 20 + height / 20);
		level.weakestBrick = 1 + this.fortifier;
		for (h; h > height / 20; h -= height / 20) {
			for (let i = 10 - 1; i > -1; i--) {
				if (this.makeEffect()) {
					brick = new Brick(i * width / 10, h, level.weakestBrick);
					level.numOfPowers--;
					brick.effect = true;
					level.bricks.push(brick);
				} else {
					level.bricks.push(new Brick(i * width / 10, h, level.weakestBrick));
				}
			}
			level.weakestBrick += 1;
		}
		return level.bricks;
	},

	show() {
		for (let i = 0; i < level.bricks.length; i++) {
			level.bricks[i].show();
			collisionDetect(level.bricks[i]);
			if (level.bricks[i].health <= 0) {
				let broke = level.bricks.splice(i, 1);
				if (broke[0].effect) {
					game.powerActive = true;
					getPower();
				}
				level.score += broke[0].StartingHealth * 500;
			}
		}
	},

	reset() {
		level.bricks = [];
		game.powerActive = false;
		getPower();
		level.Balls.splice(0, balls.length);
		balls.forEach(ball => {
			ball.position.x = width / 2;
			ball.position.y = height / 2;
			ball.speed.x = 0;
			ball.speed.y = 0;
			ball.direction.y = 1
		});
		player.position.x = width / 2 - player.width / 2;
		game.active = false;
		level.numOfPowers = 1;
		level.makeBricks();

	}
};