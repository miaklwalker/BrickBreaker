// This is a basic collision detection system that allows you to check if the ball is touching a brick and where it was collided with.


function collision(circle, rectangle) {
    let circleX = circle.position.x;
    let circleY = circle.position.y;
    let radius = circle.radius;

    let rectangleX = rectangle.position.x;
    let rectangleY = rectangle.position.y;
    let rectangleWidth = rectangle.width;
    let rectangleHeight = rectangle.height;

    let leftRight;
    let topBottom;

    let testX = circleX;
    let testY = circleY;
    // left
    if (circleX < rectangleX) {
        testX = rectangleX + .02;
        leftRight = true;
    }
    // right
    else if (circleX > rectangleX + rectangleWidth) {
        testX = rectangleX + rectangleWidth;
        leftRight = false;
    } else leftRight = false;
    // top
    if (circleY < rectangleY) {
        testY = rectangleY;
        topBottom = true;
    } // bottom
    else if (circleY > rectangleY + rectangleHeight) {
        testY = rectangleY + rectangleHeight;
        topBottom = true;
    } else topBottom = false;
//line(circleX,circleY,testX,testY)
    let distX = circleX - testX;
    let distY = circleY - testY;
    let distance = sqrt((distX * distX) + (distY * distY));

    if (distance <= radius / 2) {
        if (topBottom && leftRight) {
            circle.direction.x *= -1
            circle.direction.y *= -1
            rectangle.hit();
        } else {
            if (topBottom&& !leftRight) {
                rectangle.hit();
                circle.direction.y *= -1;
            }
            if (leftRight && !topBottom) {
                rectangle.hit();
                circle.direction.x *= -1;
            }
        }
    }
}


function collisionDetect(tempBrick) {
    level.Balls.forEach(ball => collision(ball, tempBrick))
}