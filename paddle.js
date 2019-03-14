class Paddle {
	constructor(x, y) {
		this.acceleration = createVector();
		this.width = 84;
		this.height = 12;
		this.position = createVector(x, y);
	}
	show() {
		fill(0);
		rect(this.position.x, this.position.y, this.width, this.height);
	}
	move() {
		if (keyIsDown(LEFT_ARROW)) {
			player.position.x -= 5;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			player.position.x += 5;
		}
		if (player.position.x <= 0) {
			player.position.x = 0;
		} else if (player.position.x + player.width >= width) {
			player.position.x = width - player.width;
		}
	}
}