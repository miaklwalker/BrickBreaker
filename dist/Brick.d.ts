import { Vector } from "./Vector.js";
/**
 * @class Brick
 * @classdesc Creates a Brick Object{} That has a position and Health!
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
export declare class Brick {
    position: Vector;
    width: number;
    height: number;
    health: number;
    startingHealth: number;
    effect: boolean;
    cracked: boolean;
    constructor(x: number, y: number, health: number);
    /**
     * @method hit -Decrements The Brick Objects Health When Hit.
     */
    hit(): void;
    /**
     * @method show -Shows the Brick object based on the Current Style
     */
    show(): void;
}
//# sourceMappingURL=Brick.d.ts.map