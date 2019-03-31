// Functions
export function makeCanvas(name, width, height) {
    let w = width || window.innerWidth.toString();
    let h = height || window.innerHeight.toString();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.setAttribute("id", name);
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
}
/**
 * @function getPowers
 * @description - Chooses a random number between 1 - 100, iterates through the powerUps object and adds
 * all powerUps keys to an array, Then using the modulas function on the randomNumber divided by
 * the PowerUps list.length , we are left with a index, that index is then used to call the powerUps "Effect()"
 * method.
 */
function getPowers() {
    let Random = (Math.floor(Math.random() * 100));
    let powerUpList = Object.keys(PowerUps);
    chosenPowerUp = powerUpList[Random % powerUpList.length];
    if (game.powerActive) {
        PowerUps[chosenPowerUp].effect();
    }
    else if (!game.powerActive) {
        PowerUps.doubler.loseEffect();
    }
}
/**
 *
 * @param tempBrick
 */
function collisionsDetect(tempBrick) {
    level.balls.forEach((orb) => collisions(orb, tempBrick));
}
function collisions(circle, rectangle) {
    let circleX = circle.position.x;
    let circleY = circle.position.y;
    let radius = circle.radius;
    let rectangleX = rectangle.position.x;
    let rectangleY = rectangle.position.y;
    let rectangleWidth = rectangle.width;
    let rectangleHeight = rectangle.height;
    let leftRight = false;
    let topBottom = false;
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
    let distX = circleX - testX;
    let distY = circleY - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= radius / 2 + .4) {
        if (topBottom && leftRight) {
            circle.velocity.x *= -1;
            circle.velocity.y *= -1;
            rectangle.hit();
            hit = true;
        }
        else {
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
function gameLoop(name) {
    requestAnimationFrame(name);
}
function drawBackground() {
    ctx.fillStyle = "darkGrey";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
const keyBoard = {
    ArrowLeft: false,
    ArrowRight: false,
};
//# sourceMappingURL=Functions.js.map