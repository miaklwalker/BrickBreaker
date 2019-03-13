/* eslint-disable no-undef */
let game = {
	lives: 3,
	balls: 1,
	powerActive: false,
};

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const getPower = () => game.powerActive ? doubler.effect(player):doubler.loseDoubler(player);



// eslint-disable-next-line no-unused-vars
function gameOver() {
	if(game.lives === 0){
		ball.position.x = width / 2;
		ball.position.y = height / 2;
		ball.speed.x = 0;
		ball.speed.y = 0;
		level.levelNum = 1;
		level.score = 0;
		player.start();
	}
}