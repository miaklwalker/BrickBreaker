import { Ball } from "./Ball.js";
import { Vector } from "./Vector.js";
/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
export declare class Ai {
    position: Vector;
    control: boolean;
    offset: number;
    constructor();
    /**
     * @method logic - a very simple AI implementation , Checks what side of the screen has the most bricks and tries to angle the paddle so it hits the ball to that side
     * it also follows the balls x-position
     * @param ball - Pass a ball to the logic so it can track the x position
     */
    logic(ball: Ball): void;
    /**
     * @method choice -This is the function that decides how the paddles angles to hit the bricks on the side with the most bricks
     * @param choice
     */
    choose(choice: string): void;
}
//# sourceMappingURL=AI.d.ts.map