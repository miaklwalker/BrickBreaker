/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
declare class Ai {
    position: Vector;
    control: boolean;
    offset: number;
    constructor();
    logic(ball: Ball): void;
    choose(choice: string): void;
}
