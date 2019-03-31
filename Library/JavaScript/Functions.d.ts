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
/**
 *
 * @param tempBrick
 */
declare function collisionsDetect(tempBrick: Brick): void;
declare function collisions(circle: Ball, rectangle: Brick): void;
declare function gameLoop(name: FrameRequestCallback): void;
declare function drawBackground(): void;
interface keyBoard {
    [index: string]: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
}
declare const keyBoard: keyBoard;
