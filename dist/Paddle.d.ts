import { Ai } from "./AI.js";
import { Vector } from "./Vector.js";
/**
 * @class Paddle
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
export declare class Paddle {
    width: number;
    height: number;
    position: Vector;
    velocity: Vector;
    constructor(x: number, y: number);
    /**
     * @method show -Shows the Paddle object based on the currently selected Style!
     */
    show(): void;
    /**
     * @method move -Allows the user to use the Left & Right Arrow keys to control the paddle!
     */
    move(): void;
    /**
     * @method demo -When the first loads this lets the computer control the game while the player watches and picks themes
     * @param ai
     */
    demo(ai: Ai): void;
}
//# sourceMappingURL=Paddle.d.ts.map