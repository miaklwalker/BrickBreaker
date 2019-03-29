const gameLogic = {
    ballLoop() {
		// The Ball loop , This checks , draws, and can Delete any and every ball
		balls.forEach(orb => {
			orb.start();
			orb.show();
			orb.contact(player);
			orb.move();
			orb.hitWall();
			ai.logic(orb);
			for (let i = balls.length; i > 0; i--) {
				if (balls[i - 1].ballLost) {
					balls.splice(i - 1, 1);
				}
			}
		})
    },
    
    ends() {
		// These are level and life end conditions
		if (level.bricks.length === 0) {
			gameLogic.win();
		}
		if (balls.length < 1) {
			loseLife();
		}
		if (game.lives === 0) {
			gameOver();
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
		});
		level.numOfPowers = level.levelNum;
		game.active = false;
	
		level.makeBricks();

    },
    

	demo() {
		// While demo is running controls demo elements
		// allows players to start game
		if (ai.control) {
			fill(052)
			textAlign(CENTER,CENTER)
			textSize(24)
			text("Start Game", width / 2, height / 2);
			text("Click Anywhere!", width / 2, height / 2+24)
			game.active = true;
			player.demo(ai)
		} else {
			player.move();
		}
		// If Mouse is clicked then it gives control to player and resets the game for player
		if (mouseIsPressed) {
			if (ai.control) {
				ai.control = false;
				level.reset()
			}
		}
		if (keyIsDown(ENTER)) {
			game.active = true;
		}
	},
};