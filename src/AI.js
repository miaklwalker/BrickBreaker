

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
    /**
     * @method logic - a very simple AI implementation , Checks what side of the screen has the most bricks and tries to angle the paddle so it hits the ball to that side
     * it also follows the balls x-position
     * @param ball - Pass a ball to the logic so it can track the x position
     */

    logic(ball) {
        let right  = 0;
        let left = 0;
        level.bricks.forEach((brick) => brick.position.x > canvas.width / 2 ? right++ : left++);
        if (right > left) {
            this.choose("left")
        } else if (left > right) {
            this.choose("right")
        } else {
            this.choose("middle")
        }
        this.position.x = ball.position.x;
    }
    /**
     * @method choice -This is the function that decides how the paddles angles to hit the bricks on the side with the most bricks
     * @param choice 
     */
    choose(choice) {
        let offset = 0;
        switch (choice) {
            case "left":
                for (offset; offset >= -50; offset -= 1) {
                    this.position.x += ball.position.x + offset
                }
                break;

            case "right":
                for (offset; offset <= 50; offset += 1) {
                    this.position.x += ball.position.x + offset
                }
                break;
            default:
                this.offset = 0;
                this.position.x += ball.position.x + offset;
        }
    }
}