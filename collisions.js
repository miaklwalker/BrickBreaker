function collision(circle, rectangle) {

    let circleX = circle.position.x;
    let circleY = circle.position.y;
    let radius = circle.radius;

    let rectangleX = rectangle.position.x;
    let rectangleY = rectangle.position.y;
    let rectangleWidth = rectangle.width;
    let rectangleHieght = rectangle.height;

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
        testX = rectangleX + rectangleWidth + .02;
        leftRight = true;
    } else false;
    // top
    if (circleY < rectangleY) { 
        testY = rectangleY;
        topBottom = true;
    }// bottom
     else if (circleY > rectangleY + rectangleHieght) { 
        testY = rectangleY + rectangleHieght + .01;
        topBottom = true;
    } else false;

    let distX = circleX - testX;
    let distY = circleY - testY;
    let distance = sqrt((distX * distX) + (distY * distY));

    if (distance <= radius) {
        if (topBottom) {
            rectangle.hit();
            circle.speed.y *= -1;
        }
        if (leftRight) {
            rectangle.hit();
            circle.speed.x *= -1;
        }
    }
}