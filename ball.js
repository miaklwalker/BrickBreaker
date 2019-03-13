/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class Ball {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.direction = createVector(1, 1);
		this.radius = 15;
		this.speedMultiplier = 6;
		this.speed = createVector(0, 0);
	}
	contact(Paddle) {
		if (this.position.y > Paddle.position.y - this.radius / 2 &&
            this.position.x > Paddle.position.x - this.radius / 2 &&
            this.position.x < Paddle.position.x + Paddle.width + this.radius) {
			if (ball.direction.y > 0) {
				let bmap = map(ball.position.x, player.position.x, player.position.x + player.width, -1, 1);
				let round = Number(Math.round(bmap + "e" + 2) + "e-" + 2);
				ball.speed.y *= -1;
				ball.speed.x = 0;
				ball.speed.x += round * (abs(round) * 3);
			}
		} else false;

	}
	move() {
		this.position.x += this.direction.x * this.speed.x;
		this.position.y += this.direction.y * this.speed.y;
		if (this.position.y <= 0) {
			this.speed.y *= -1;
		} else if (this.position.x >= width || this.position.x <= 0) {
			this.speed.x *= -1;
		}else if(this.position.y >= height){
			ball.position.x = width / 2;
			ball.position.y = height / 2;
			ball.speed.x = 0;
			ball.speed.y = 0;
			game.lives -= 1;
			game.powerActive=false;
			getPower();
		}

	}
	show() {
		let col = frameCount % 255;
		colorMode(HSB);
		fill(col, col, col);
		ellipse(this.position.x, this.position.y, this.radius);
	}
	start() {
		keyIsDown(ENTER) ? this.speed.y = 1 * this.speedMultiplier : false;
	}
}