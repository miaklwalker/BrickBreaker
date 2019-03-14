const doubler = {
	effect(paddle) {
		if (paddle.width < width / 2) {
			paddle.width *= 2;
		}
	},
	loseDoubler(paddle) {
		paddle.width = 84;
	}
}
