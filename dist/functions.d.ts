export declare let canvas: HTMLCanvasElement;
export declare let ctx: CanvasRenderingContext2D;
export declare let chosenPowerUp: string;
/**
 *
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480"
 * @param height - The height of the Canvas as a string "480"
 */
export declare function makeCanvas(width?: string, height?: string): HTMLCanvasElement;
export declare let clickHandler: () => void;
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
export declare function getPowers(): void;
/**
 * Sets up Loop Call Backs
 * @param name - is the name of the call back function you want to use!
 */
export declare function gameLoop(name: FrameRequestCallback): void;
/**
 * @function drawBackground
 * @description - Draws The Background of the level using the Theme selected By the Player
 */
export declare function drawBackground(): void;
//# sourceMappingURL=functions.d.ts.map