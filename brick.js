class Brick {
	constructor(x, y, health) {
		this.position = createVector(x, y);
		this.width = 47;
		this.height = 22;
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
			testX = rx +.02;
			lr = true;
		} else if (cx > rx + rw) { // right
			testX = rx + rw +.02;
			lr = true;
		} else false;

		if (cy < ry) { //  top
			testY = ry;
			tb = true;
		} else if (cy > ry + rh) { // bottom
			testY = ry + rh+.01;
			tb = true;
		} else false;
		line(testX,testY,cx,cy)
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
			if(tb&&lr){
				ball.speed.x *= -1;
				ball.speed.y *= -1;
			}
		}
	}
}