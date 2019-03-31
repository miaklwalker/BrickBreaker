/**
 * @class Paddle
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
export class Paddle {
    constructor(x, y) {
        this.width = canvas.width / 5;
        this.height = canvas.height * .02474;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
    }
    show() {
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, "lightgrey");
        myGradient.addColorStop(.6, "black");
        myGradient.addColorStop(1, "black");
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    move() {
        if (!ai.control) {
            if (keyBoard.ArrowLeft) {
                this.velocity.x = -PaddleSpeed;
            }
            else if (keyBoard.ArrowRight) {
                this.velocity.x = PaddleSpeed;
            }
            else {
                this.velocity.x = 0;
            }
            this.velocity.limit(4);
            this.position.add(this.velocity);
            if (this.position.x <= 0) {
                this.position.x = 0;
            }
            else if (this.position.x + this.width >= canvas.width) {
                this.position.x = canvas.width - this.width;
            }
        }
        else {
            this.demo(ai);
        }
    }
    demo(ai) {
        this.position.x = ai.position.x - this.width / 2;
        if (this.position.x <= 0)
            this.position.x = 0;
        else if (this.position.x + this.width >= canvas.width)
            this.position.x = canvas.width - this.width;
    }
}
//# sourceMappingURL=Paddle.js.map