/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class Brick {
	constructor(x, y, health) {
		this.position = createVector(x, y);
		this.width = 48.5;
		this.height = 19.2;
		this.health = health;
		this.StartingHealth = health;
		this.effect = false;
	}
	hit() {
		this.health -= 1;
	}
	show() {
		if (this.health > 0) {
			stroke(255);
			colorMode(RGB);
			if (this.effect) {
				fill((this.health) * 51, 0, 0, 255);
				rect(this.position.x, this.position.y, this.width, this.height);
			} else {
				fill(52, (this.health) * 51, (this.health + 15) * 51, 255);
				rect(this.position.x, this.position.y, this.width, this.height);
			}
		}
	}
	collision(ball) {
		let cx, cy, radius, rx, ry, rw, rh;
		cx = ball.position.x;
		cy = ball.position.y;
		radius = ball.radius;
		rx = this.position.x;
		ry = this.position.y;
		rw = this.width;
		rh = this.height;

		let lr, tb;
		let testX = cx;
		let testY = cy;
		if (cx < rx) { // left
			testX = rx;
			lr = true;
		} else if (cx > rx + rw) { // right
			testX = rx + rw;
			lr = true;
		} else false;

		if (cy < ry) { //  top
			testY = ry;
			tb = true;
		} else if (cy > ry + rh) { // bottom
			testY = ry + rh;
			tb = true;
		} else false;

		let distX = cx - testX;
		let distY = cy - testY;
		let distance = sqrt((distX * distX) + (distY * distY));
		if (distance <= radius / 2) {
			if (tb) {
				this.hit();
				ball.speed.y *= -1;
			}
			if (lr) {
				this.hit();
				ball.speed.x *= -1;
			}
		}
	}
}