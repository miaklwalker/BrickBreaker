// Game State is a collection of different properties and functions for determining the "State" of the game.
let game = {
	lives: 3,
	balls: 1,
	powerActive: false,
	active: false,
	over: false,
};
// chooses and adds a power up to a brick
function getPower() {
	let random = Math.random();
	let randomNumber1 = random >= .49 ? 1 : 0;
	let randomNumber2 = random % 2 === 0 ? 1 : 0;
	let randomNumber = (randomNumber1 === 0 ? (random >= .73 ? 0 : 2) :(randomNumber1+randomNumber2));
	let powers = [doubler, multiBall,extraLife];
	let ranPower = powers[randomNumber];
	if (ai.control) {
		if (game.powerActive) {
			doubler.effect(player);
		}
	} else {
		if (game.powerActive) {
			switch (ranPower) {
				case powers[0]:
					doubler.effect(player);
					break;
				case powers[1]:
					multiBall.effect();
					break;
					case powers[2]:
					extraLife.effect();
					break;
					
			}
		}
		if (!game.powerActive) {
			doubler.loseDoubler(player);
		}
	}
}

function gameOver() {
	if (!game.active) {
		game.active = false;
		game.powerActive = false;
		game.over = true;
		textSize(24);
		text("GAME OVER", width / 2 - 30, height / 2 - 40);
		text("Click anywhere to continue", width / 2 - 30, height / 2);
		if (mouseIsPressed) {
			level.numOfPowers = 1;
			level.bricks = [];
			level.makeBricks();
			level.score = 0;
			level.levelNum = 1;
			game.lives += 3;
			game.over = false;
            player.position.x = width / 2 - player.width / 2;
		}
	}
}

function loseLife() {
	balls.push(new Ball(width / 2, height / 2));
	game.lives -= 1;
	game.powerActive = false;
	game.active = false;
	getPower();
}