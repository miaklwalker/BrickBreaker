"use strict";
/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
class Ai {
    constructor() {
        this.position = new Vector();
        this.control = true;
        this.offset = 0;
    }
    logic(ball) {
        let right = 0;
        let left = 0;
        level.bricks.forEach((brick) => brick.position.x > canvas.width / 2 ? right++ : left++);
        if (right > left) {
            this.choose("left");
        }
        else if (left > right) {
            this.choose("right");
        }
        else {
            this.choose("middle");
        }
        this.position.x = ball.position.x;
    }
    choose(choice) {
        let offset = 0;
        switch (choice) {
            case "left":
                for (offset; offset >= -30; offset -= .1) {
                    this.position.x += ball.position.x + offset;
                }
                break;
            case "right":
                for (offset; offset <= 30; offset += .1) {
                    this.position.x += ball.position.x + offset;
                }
                break;
            default:
                this.offset = 0;
                this.position.x += ball.position.x + offset;
        }
    }
}
