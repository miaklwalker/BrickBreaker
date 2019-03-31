import { Vector } from './Vector';
import { Ball } from './Ball';
import { level } from './Objects';
import { Brick } from './Brick';


/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
declare class Ai {
    position: Vector;
    control: boolean;
    offset: number;
    constructor() {
        this.position = new Vector();
        this.control = true;
        this.offset = 0;
    }

    logic(ball: Ball) {
        let right: number = 0;
        let left: number = 0;
        level.bricks.forEach((brick: Brick) => brick.position.x > canvas.width / 2 ? right++ : left++);
        if (right > left) {
            this.choose("left")
        } else if (left > right) {
            this.choose("right")
        } else {
            this.choose("middle")
        }
        this.position.x = ball.position.x;
    }

    choose(choice: string) {
        let offset = 0;
        switch (choice) {
            case "left":
                for (offset; offset >= -30; offset -= .1) {
                    this.position.x += ball.position.x + offset
                }
                break;

            case "right":
                for (offset; offset <= 30; offset += .1) {
                    this.position.x += ball.position.x + offset
                }
                break;
            default:
                this.offset = 0;
                this.position.x += ball.position.x + offset;
        }
    }
}
