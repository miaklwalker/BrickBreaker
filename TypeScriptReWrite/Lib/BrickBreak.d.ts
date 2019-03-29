declare let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, ball: Ball, brick: Brick, player: Paddle;
/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 */
declare class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(v: Vector): void;
    mult(factor: Vector | number): void;
}
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
    hit(): void;
    show(): void;
}
/**
 * @class Ball
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
declare class Ball {
    position: Vector;
    direction: Vector;
    speed: Vector;
    radius: number;
    speedMultiplier: number;
    velocity: Vector;
    speedLimit: number;
    ballLost: boolean;
    constructor(x: number, y: number);
    contact(): void;
    move(): void;
    hitWall(): void;
    show(): void;
    start(): void;
}
/**
 * @class Ball
 * @classdesc Creates a Paddle Object{} That has a position
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
declare class Paddle {
    width: number;
    height: number;
    position: Vector;
    constructor(x: number, y: number);
    show(): void;
    move(): void;
}
/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
declare class Ai {
    position: Vector;
    control: boolean;
    constructor();
    logic(): void;
}
/**
 *
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480"
 * @param height - The height of the Canvas as a string "480"
 */
declare function makeCanvas(name: string, width?: string, height?: string): HTMLCanvasElement;
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
declare function getPowers(): void;
declare function collisionsDetect(tempBrick: Brick): void;
declare function collisions(circle: Ball, rectangle: Brick): void;
declare function gameLoop(name: FrameRequestCallback): void;
declare function drawBackground(color: string): void;
/**
 * @name level
 * @description - The Level Object contains Methods and Properties for defining the level.
 * @property levelNum
 * @property numOfPower
 * @property numOfRows
 * @property weakestBrick
 * @property score
 * @property bricks
 * @property balls
 * @property fortifier
 */
interface level {
    levelNum: number;
    numOfPowers: number;
    numOfRows: number;
    weakestBrick: number;
    score: number;
    bricks: Array<Brick>;
    balls: Array<Ball>;
    fortifier: number;
    scoreboard: () => any;
    makeEffect: () => any;
    fortifyBricks: () => any;
    makeBricks: () => any;
    showBricks: () => any;
    reset: () => any;
}
declare const level: level;
interface game {
    lives: number;
    balls: number;
    powerActive: boolean;
    over: boolean;
}
/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself!
 */
declare const game: game;
/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */
interface gameLogic {
    ballLoop: () => any;
    endConditions: () => any;
    wins: () => any;
    demo: () => any;
}
declare const gameLogic: gameLogic;
/**
 * @name PowerUps
 * @property doubler
 * @description - doubles the width of the paddle
 * @property multiBall
 * @description - Adds Multiple Balls to the GameScreen
 * @property extraLife
 * @description - Gives the player a extra life
 *
 */
declare const PowerUps: {
    doubler: object;
    multiBall: object;
    extraLife: object;
};
declare function setup(): void;
declare function draw(): void;