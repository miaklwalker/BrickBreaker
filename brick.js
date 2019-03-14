class Brick {
	constructor(x, y, health) {
		this.position = createVector(x, y);
		this.width = 48.5;
		this.height = 21;
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
}