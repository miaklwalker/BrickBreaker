let game = {
    lives: 3,
    balls: 1,
    powerActive: false,
}

const getPower = () => game.powerActive ? doubler.effect(player):doubler.loseDoubler(player)



function gameOver() {
    if(game.lives === 0){
    ball.position.x = width / 2;
    ball.position.y = height / 2;
    ball.speed.x = 0;
    ball.speed.y = 0;
    level.levelNum = 1;
    level.score = 0;
    player.start()
    }
}