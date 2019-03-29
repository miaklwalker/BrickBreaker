// This is the Brick Class it contains all of the functions possible for the bricks of the game.
// e.g health , whether is has an effect e.t.c.

class Brick {
	constructor(x, y, health) {
		this.position = createVector(x, y);
		this.width = width/10;
		this.height = height/20;
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
				rect(this.position.x, this.position.y, this.width, this.height,20);
			} else {
				fill(52, (this.health) * 51, (this.health + 15) * 51, 255);
				rect(this.position.x, this.position.y, this.width, this.height,20);
			}
		}
	}
}