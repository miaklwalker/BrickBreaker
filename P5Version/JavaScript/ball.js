// The Ball Class contains all the components of the Game Ball
class Ball {
	constructor(x, y) {
		this.position = createVector(x, y); // stores the balls current position
		this.direction = createVector(0, 3); // is the arrow that points Where the ball is headed
		this.speed = createVector(2, 2); // is the direction component of velocity
		this.radius = (width/1.3 * height) * .00004443;
		this.speedMultiplier = (width * height) * .000052577;
		this.velocity = this.direction.mult(this.speed);
		this.speedLimit = 6
		this.ballLost = false
	}
	contact(Paddle) {
		if (!(this.position.y > Paddle.position.y + Paddle.height)) {
			if (this.position.y > Paddle.position.y - this.radius / 2 &&
				this.position.x > Paddle.position.x - this.radius / 2 &&
				this.position.x < Paddle.position.x + Paddle.width + this.radius) {
				if (this.direction.y > 0) {
					let ballMap = map(this.position.x, Paddle.position.x, Paddle.position.x + Paddle.width, -3, 3);
					this.velocity.y *= -1;
					this.direction.x += ballMap
				}
			}
		}
	}

	move() {
		if (game.active) {
			this.velocity.mult(this.speedMultiplier / 5)
			this.velocity.setMag(this.speedLimit)
			this.position.add(this.velocity);
		}
	}
	hitWall() {
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
				this.speed.y *= this.speedMultiplier

			}
		}
	}
}