/**
 * @class Ai
 * @classdesc Controls the Paddle for the Game Demo Screen
 */
declare class Ai {
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
/**
 * @class Ball
 * @classdesc Creates a ball Object{} That has a position and a speed
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 */
declare class Ball {
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
/**
 * @class Brick
 * @classdesc Creates a Brick Object{} That has a position and Health!
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
    /**
     * @method hit -Decrements The Brick Objects Health When Hit.
     */
    hit(): boolean;
    /**
     * @method show -Shows the Brick object based on the Current Style
     */
    show(): void;
}
/**
 *@function collisionDetect
 * @param tempBrick
 * @desc Hands The Collision Function Each Ball Object and tests Each Brick for collision;
 */
declare function collisionsDetect(tempBrick: Brick): void;
/**
 * @function Collision
 * @param circle
 * @param rectangle
 * @description - Accepts a Ball and a Brick as Arguements then tests if a collision occurs for either
 */
declare function collisions(circle: Ball, rectangle: Brick): void;
/**
 * @name gameLogic
 * @description - Contains the logic for various conditions such as GameOver(),LoseLife();
 */
declare const gameLogic: gameLogic;
interface gameLogic {
    ballLoop: () => any;
    ends: () => any;
    win: () => any;
    demo: () => any;
    gameOver: () => any;
    loseLife: () => any;
}
interface level {
    levelNum: number;
    numOfPowers: number;
    numOfRows: number;
    weakestBrick: number;
    score: number;
    bricks: Array<Brick>;
    balls: Array<Ball>;
    fortifier: number;
    GameText: () => any;
    makeEffect: () => any;
    fortifyBricks: () => any;
    makeBricks: () => any;
    showBricks: () => any;
    reset: () => any;
}
interface keyBoard {
    [index: string]: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
}
interface PowerUps {
    [index: string]: any;
    doubler: doubler;
    multiBall: multiBall;
    extraLife: extraLife;
}
interface multiBall {
    [index: string]: any;
    counter: number;
    maxBall: number;
    effect: () => any;
    loseEffect: () => any;
}
interface doubler {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
interface extraLife {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
interface game {
    lives: number;
    balls: number;
    active: boolean;
    powerActive: boolean;
    over: boolean;
}
interface brickStyle {
    set1: string[][][];
    set2: string[][][];
}
interface style {
    brick: brickStyle;
    ball: {};
    text: [];
    textLocation: [];
    color: [];
    font: [];
    paddle: [];
    background: string;
}
interface gameStyle {
    Modern: style;
    Retro: style;
    Classic: style;
    PacMan: style;
}
interface BrickBreaker {
    Credits: Credits;
    Classes: Classes;
    Styles: gameStyle;
}
interface Credits {
    GameTitle: string;
    LeadCoder: string;
    OriginalIdea: string;
    thisProject: string;
}
interface Classes {
    Ball: string;
    Paddle: string;
    Brick: string;
    Ai: string;
}
declare const level: level;
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
declare const PowerUps: PowerUps;
declare class scoreBoard {
    scoreboard: HTMLDivElement;
    div: HTMLCollection;
    drawn: boolean;
    constructor();
    drawScoreBoard(): void;
    drawScore(): void;
    drawLevelNum(): void;
    drawGameName(): void;
    drawLives(): void;
    drawBalls(): void;
}
declare let index: string[];
declare let styleSelect: HTMLSelectElement;
declare let selectedStyle: number;
declare let selectionWatcher: HTMLSelectElement;
/**
 * @function styler
 * @description - gets the players choice of theme and then passes that arguement to the style sheet
 * which returns values for Ball , Brick , Fonts , TextSize, Paddle and Background Styles
 */
declare function styler(styleSheet: any): void;
/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 * @method add - Adds Two Vectors Together X+X Y+Y
 * @method mult - Multiplies Either Two Vecors (X * X , Y * Y) or by a scala (X * S , Y * S)
 * @method div - The inverse of Mult Divides Either by a Vector or a Scala!
 * @method limit -Forces the Magnatude of the vector to a specified number if it is greater
 */
declare class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(v: Vector): void;
    mult(factor: Vector | number): this | undefined;
    div(divisor: Vector | number): void;
    limit(max: number): this;
}
declare class animatedBackground {
    frame: number;
    counter: number;
    sprites: HTMLImageElement[];
    numberOfSprites: number;
    constructor(numberOfSprites: number);
    addSprites(url: string, format: string): void;
    Sprite(): HTMLImageElement;
}
declare let frame: number;
declare let counter: number;
/**
 *
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480"
 * @param height - The height of the Canvas as a string "480"
 */
declare function makeCanvas(name: string, width?: string, height?: string): HTMLCanvasElement;
declare let clickHandler: () => void;
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
declare function getPowers(): void;
declare let zelda: animatedBackground;
/**
 * Sets up Loop Call Backs
 * @param name - is the name of the call back function you want to use!
 */
declare function gameLoop(name: FrameRequestCallback): void;
/**
 * @function drawBackground
 * @description - Draws The Background of the level using the Theme selected By the Player
 */
declare function drawBackground(): void;
declare let canvas: HTMLCanvasElement;
declare let ctx: CanvasRenderingContext2D;
declare let ball: Ball;
declare let brick: Brick;
declare let player: Paddle;
declare let clicked: number;
declare let keyPressed: string;
declare let ai: Ai;
declare let keyRel: string;
declare let PaddleSpeed: number;
declare let hit: boolean;
declare let title: HTMLSpanElement;
declare let color: number;
declare let iterator: number;
declare let chosenPowerUp: string;
declare let displayed: boolean;
declare let stylesJson: BrickBreaker;
declare let textLocation: number[];
declare let modernColors: number[][];
declare let brickStyle: brickStyle;
declare let paddleStyle: string[];
declare let textStyle: string[];
declare let ballStyle: string[];
declare let fontStyle: string[];
declare let backgroundStyle: [string, boolean];
declare function GetJson(): Promise<BrickBreaker>;
declare const keyBoard: keyBoard;
/**
 * @name game
 * @description - Game contains the information regarding the player as opposed to the level itself!
 */
declare const game: game;
declare function setup(): void;
declare function draw(): void;
//# sourceMappingURL=main.d.ts.map