/**
 * @class Brick
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
declare class Brick {
    position: Vector;
    width: number;
    height: number;
    health: number;
    startingHealth: number;
    effect: boolean;
    constructor(x: number, y: number, health: number);
    hit(): boolean;
    show(): void;
}
