import { Vector } from "./Vector.js";
import { Paddle } from "./Paddle.js";
/**
 * @class Ball
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
export declare class Ball {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    radius: number;
    speedLimit: number;
    ballLost: boolean;
    constructor(x: number, y: number);
    /**
     * @method contact -controls the Balls actions upon hitting the paddle
     * @param paddle
     */
    contact(paddle: Paddle): void;
    /**
     * @method move - Controls how the Ball moves every animation frame
     */
    move(): void;
    /**
     * @method hitWall - controls the Ball's actions up hitting the wall of the game area
     *
     */
    hitWall(): void;
    /**
     * @method show -Shows the Brick object based on the currently Selected Style!
     */
    show(): void;
}
//# sourceMappingURL=Ball.d.ts.map