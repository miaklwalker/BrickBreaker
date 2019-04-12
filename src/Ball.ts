/**
 * @class Ball
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
class Ball {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    radius: number;
    speedLimit: number;
    ballLost: boolean;
    constructor(x: number, y: number) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(1, 7);
        this.radius = (canvas.width / 1.3 * canvas.height) * .00003443;
        this.speedLimit = 6;
        this.ballLost = false;
    }
    /**
     * @method contact -controls the Balls actions upon hitting the paddle
     * @param paddle 
     */
    contact(paddle: Paddle) {
        if (!(this.position.y > paddle.position.y + paddle.height)) {
            if (this.position.y > paddle.position.y - this.radius &&
                this.position.x > paddle.position.x - this.radius &&
                this.position.x < paddle.position.x + paddle.width + this.radius) {
                if (this.velocity.y > 0) {
                    let ballMap: number = (this.position.x - paddle.position.x) / ((paddle.position.x + paddle.width) - paddle.position.x) * (2 - (-2)) - 2;
                    this.acceleration.x += ballMap*1.5;
                    this.velocity.y *= -1
                }
            }

        }
    }
    /**
     * @method move - Controls how the Ball moves every animation frame
     */
    move() {
        if (game.active) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.velocity.limit(6);
            this.acceleration.mult(0);
        }
    }
    /**
     * @method hitWall - controls the Ball's actions up hitting the wall of the game area
     * 
     */
    hitWall() {
        
        if (this.position.y >= canvas.height - this.radius) {
            this.ballLost = true;
        }
        // * if ball hits top of the canvas reverse direction
        if (this.position.y <= this.radius) {
            this.velocity.y *= -1;
        }
        // * if ball hits the right side of the canvas reverse direction
        if (this.position.x >= canvas.width - (this.radius+this.radius*.01)){
            this.velocity.x *= -1;
            this.position.x - 2
        }
        //  * if ball hits the left side of the canvas reverse direction
        if(this.position.x <= (this.radius+this.radius*.01)) {
            this.velocity.x *= -1;
            this.position.x + 2
        }
    }
    /**
     * @method show -Shows the Brick object based on the currently Selected Style!
     */
    show() {
        let myGradient = ctx.createRadialGradient(this.position.x, this.position.y, this.radius * .14, this.position.x, this.position.y, this.radius);
        myGradient.addColorStop(0, `${ballStyle[0]}`);
        myGradient.addColorStop(1, `${ballStyle[1]}`);
        ctx.fillStyle = myGradient;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
