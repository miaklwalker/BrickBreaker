class Ball {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.direction = createVector(1, 1);
		this.radius = 15;
		this.speedMultiplier = 6;
		this.speed = createVector(0, 0);
		this.ballLost = false
	}
	contact(Paddle) {
		if (this.position.y > Paddle.position.y - this.radius / 2 &&
			this.position.x > Paddle.position.x - this.radius / 2 &&
			this.position.x < Paddle.position.x + Paddle.width + this.radius) {
			if (this.direction.y > 0) {
				let ballMap = map(this.position.x, Paddle.position.x, Paddle.position.x + Paddle.width, -1, 1);
			
				let roundBallX = Number(Math.round(ballMap + "e" + 2) + "e-" + 2);
				this.direction.y *= -1;
				this.speed.x = (this.speed.x == 0) ? this.speed.x + 1 : this.speed.x;
				this.direction.x += roundBallX * (abs(roundBallX) * 2);
			}
		}else false

	}
	move() {
		this.position.x += this.direction.x * this.speed.x;
		this.position.y += this.direction.y * this.speed.y;
		if (this.position.y <= 0) {
			this.direction.y *= -1;
		} else if (this.position.x >= width || this.position.x <= 0) {
			this.direction.x *= -1;
		} else if (this.position.y >= height) {
				this.ballLost = true
			}
	}
	show() {
		let col = frameCount % 255;
		colorMode(HSB);
		fill(col, col, col);
		ellipse(this.position.x, this.position.y, this.radius);
	}
	start() {
		if (game.active) {
			if (!game.over) {
				this.speed.y = 1 * this.speedMultiplier
			}
		}
	}
}