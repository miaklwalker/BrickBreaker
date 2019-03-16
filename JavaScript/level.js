const level = {
	levelNum: 1,
	numOfPowers: 1,
	numOfRows: 3,
	weakestBrick: 1,
	score: 0,
	bricks: [],
	Balls: [],
	fortifier: 0,

	makeEffect() {
		if (level.numOfPowers > 0 && Math.random() > .7) {
			return true;
		} else {
			false;
		}
	},
	fortifyBricks() {
		if (level.levelNum % 5 === 0) {
			this.fortifier + 1;
		}
	},

	makeBricks() {
		let h = (level.numOfRows * 24 + 24);
		level.weakestBrick = 1 + this.fortifier;
		for (h; h > 24; h -= 24) {
			for (let i = 10 - 1; i > -1; i--) {
				if (this.makeEffect()) {
					brick = new Brick(i * 48, h, level.weakestBrick);
					level.numOfPowers--
					brick.effect = true;
					level.bricks.push(brick);
				} else {
					level.bricks.push(new Brick(i * 48, h, level.weakestBrick));
				}
			}
			level.weakestBrick += 1;
		}
		this.fortifyBricks();
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

	win() {
		level.Balls.splice(0, balls.length - 1);
		level.levelNum += 1;
		level.numOfPowers += 1;
		level.numOfRows += 1;
		level.weakestBrick += 1;
		balls.forEach(ball => {
			ball.position.x = width / 2;
			ball.position.y = height / 2;
			ball.speed.x = 0;
			ball.speed.y = 0;
		})
		level.numOfPowers = level.levelNum
		game.active = false;
		level.makeBricks();
	},
};