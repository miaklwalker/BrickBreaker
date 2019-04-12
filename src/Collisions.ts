/**
 *@function collisionDetect
 * @param tempBrick
 * @desc Hands The Collision Function Each Ball Object and tests Each Brick for collision;
 */
function collisionsDetect(tempBrick: Brick) {
    level.balls.forEach((orb: Ball) => collisions(orb, tempBrick));
}
/**
 * @function Collision
 * @param circle 
 * @param rectangle 
 * @description - Accepts a Ball and a Brick as Arguements then tests if a collision occurs for either
 */
function collisions(circle: Ball, rectangle: Brick) {
    let circleX: number = circle.position.x;
    let circleY: number = circle.position.y;
    let radius: number = circle.radius;

    let rectangleX: number = rectangle.position.x;
    let rectangleY: number = rectangle.position.y;
    let rectangleWidth: number = rectangle.width;
    let rectangleHeight: number = rectangle.height;

    let leftRight: boolean = false;
    let topBottom: boolean = false;

    let testX = circleX;
    let testY = circleY;
    // Left Side
    if (circleX < rectangleX) {
        testX = rectangleX + 0.02;
        leftRight = true;
    } //Right Side
    else if (circleX > rectangleX + rectangleWidth) {
        testX = rectangleX + rectangleWidth;
        leftRight = true;
    }
    // Top Side
    if (circleY < rectangleY) {
        testY = rectangleY;
        topBottom = true;
    } // Bottom Side
    else if (circleY > rectangleY + rectangleHeight) {
        testY = rectangleY + rectangleHeight;
        topBottom = true;
    }
    let distX: number = circleX - testX;
    let distY: number = circleY - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= (radius / 2)+radius*.6) {
        if (topBottom && leftRight) {
            circle.velocity.x *= -1;
            circle.velocity.y *= -1;
            rectangle.hit();
            hit = true
        } else {
            if (topBottom) {
                rectangle.hit();
                hit = true;
                circle.velocity.y *= -1;
            }
            if (leftRight) {
                rectangle.hit();
                hit = true;
                circle.velocity.x *= -1;
            }
        }
    }
}