/* eslint-disable no-undef */
let game = {
	lives: 3,
	balls: 1,
	powerActive: false,
	active: false,
	over: false,
};
//const getPower = () => game.powerActive ? multiBall.effect() : false;
const getPower = () => game.powerActive ? doubler.effect(player) : doubler.loseDoubler(player);

function gameOver() {
	if (!game.active) {
		game.active = false;
		game.over = true;
		text("GAME OVER", width / 2 - 30, height / 2 - 40);
		text("Click anywhere to continue", width / 2 - 30, height / 2)
		if (mouseIsPressed) {
			game.lives += 3;
			level.score = 0;
			level.levelNum = 1
			game.over = false;
			player.position.x = width / 2 - player.width / 2;
		}
	}
}

function loseLife() {
    balls.push(new Ball(width/2,height/2))
	game.lives -= 1;
	game.powerActive = false;
	game.active = false;
	getPower();
}