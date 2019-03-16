const doubler = {
	effect(paddle) {
		if (paddle.width < width / 4) {
			paddle.width *= 2;
		}else if(paddle.width < width / 2){
			paddle.width *= 1.5;
		}else{
			multiBall.effect();
		}
	},
	loseDoubler(paddle) {
		paddle.width = 84;
	}
}
const multiBall = {
	counter : 0,
	maxBall : 10,
	effect(numOfBalls=5){
		this.maxBall = numOfBalls
		for(this.counter ; this.counter < this.maxBall ; this.counter++){
			level.Balls.push(new Ball(balls[0].position.x + this.counter*3,balls[0].position.y ));
			level.Balls.push(new Ball(balls[0].position.x - this.counter*3,balls[0].position.y ));
		}
	},
}

