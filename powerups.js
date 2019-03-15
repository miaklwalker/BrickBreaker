const doubler = {
	effect(paddle) {
		if (paddle.width < width / 4) {
			paddle.width *= 2;
		}
	},
	loseDoubler(paddle) {
		paddle.width = 84;
	}
}
const multiBall = {
	counter : 0,
	maxBall : 10,
	effect(){
		for(this.counter ; this.counter<this.maxBall;this.counter++){
			level.Balls.push(new Ball(random(width),height/2));
		}
	},
}
