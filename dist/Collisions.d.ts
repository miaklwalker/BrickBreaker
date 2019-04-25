import { Brick } from "./Brick.js";
import { Ball } from "./Ball.js";
export declare let hit: boolean;
/**
 *@function collisionDetect
 * @param tempBrick
 * @desc Hands The Collision Function Each Ball Object and tests Each Brick for collision;
 */
export declare function collisionsDetect(tempBrick: Brick): void;
/**
 * @function Collision
 * @param circle
 * @param rectangle
 * @description - Accepts a Ball and a Brick as Arguements then tests if a collision occurs for either
 */
export declare function collisions(circle: Ball, rectangle: Brick): void;
//# sourceMappingURL=Collisions.d.ts.map