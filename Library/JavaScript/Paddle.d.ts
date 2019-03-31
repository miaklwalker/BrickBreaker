/**
 * @class Paddle
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
declare class Paddle {
    width: number;
    height: number;
    position: Vector;
    velocity: Vector;
    constructor(x: number, y: number);
    show(): void;
    move(): void;
    demo(ai: Ai): void;
}
