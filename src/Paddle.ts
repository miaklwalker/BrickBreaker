/**
 * @class Paddle
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
class Paddle {
    width: number;
    height: number;
    position: Vector;
    velocity: Vector;

    constructor(x: number, y: number) {
        this.width = canvas.width / 5;
        this.height = canvas.height * .02474;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
    }
    /**
     * @method show -Shows the Paddle object based on the currently selected Style!
     */
    show() {
        let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
        myGradient.addColorStop(0, `${paddleStyle[0]}`);
        myGradient.addColorStop(.45, `${paddleStyle[1]}`);
        myGradient.addColorStop(1, `${paddleStyle[2]}`);
        ctx.fillStyle = myGradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    /**
     * @method move -Allows the user to use the Left & Right Arrow keys to control the paddle!
     */
    move() {
        if (!ai.control) {
            if (keyBoard.ArrowLeft) {
                this.velocity.x = -PaddleSpeed;
            } else if (keyBoard.ArrowRight) {
                this.velocity.x = PaddleSpeed
            } else {
                this.velocity.x = 0;
            }
            this.velocity.limit(4);
            this.position.add(this.velocity);
            if (this.position.x <= 0) {
                this.position.x = 0;
            } else if (this.position.x + this.width >= canvas.width) {
                this.position.x = canvas.width - this.width;
            }
        } else {
            this.demo(ai);
        }
    }
    /**
     * @method demo -When the first loads this lets the computer control the game while the player watches and picks themes
     * @param ai 
     */
    demo(ai: Ai) {
        this.position.x = ai.position.x - this.width / 2;
        if (this.position.x <= 0) this.position.x = 0;
        else if (this.position.x + this.width >= canvas.width) this.position.x = canvas.width - this.width;

    }
}