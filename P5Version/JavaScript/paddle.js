// This is the Paddle Class , This contains all of the paddle functions and properties
class Paddle {
	constructor(x, y) {
		this.width = width/5;
		this.height = height*.02474;
		this.position = createVector(x, y);
	}
	show() {
		fill(0);
		rect(this.position.x, this.position.y, this.width, this.height);
	}
	move() {
			if (keyIsDown(LEFT_ARROW)) {
				this.position.x -= width*.01041667;
			}
			if (keyIsDown(RIGHT_ARROW)) {
				this.position.x += width * .01041667;
			}
			if (this.position.x <= 0) {
				this.position.x = 0;
			} else if (this.position.x + this.width >= width) {
				this.position.x = width - this.width;
			}
		}
	demo(ai){ 
		this.position.x = ai.position.x - this.width/2;
		if (this.position.x <= 0) {
			this.position.x = 0;
		} else if (this.position.x + this.width >= width) {
			this.position.x = width - this.width;
		}
	}
}