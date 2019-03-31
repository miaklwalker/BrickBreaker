"use strict";
/**
 * @class Brick
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
class Brick {
    constructor(x, y, health) {
        this.position = new Vector(x, y);
        this.width = (canvas.width / 10) - 2.5;
        this.height = (canvas.height / 20) - 4;
        this.health = health;
        this.startingHealth = health;
        this.effect = false;
    }
    hit() {
        this.health -= 1;
        return true;
    }
    show() {
        if (this.effect) {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0, `white`);
            myGradient.addColorStop(.6, `rgb(${this.health * 85},55,55`);
            myGradient.addColorStop(1, `rgb(${this.health * 85},50,50`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        else {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop(0, "white");
            myGradient.addColorStop(.6, `rgb(50, 50,${this.health * 85}`);
            myGradient.addColorStop(1, `rgb(50, 50,${this.health * 85}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}
