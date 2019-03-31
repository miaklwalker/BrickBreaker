import { PowerUps, game, level } from './Objects';
import { Brick } from './Brick';
import { Ball } from './Ball';

// Functions

/**
 * 
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480" 
 * @param height - The height of the Canvas as a string "480" 
 */
declare function makeCanvas(name: string, width ? : string, height ? : string) {
    let w = width || window.innerWidth.toString();
    let h = height || window.innerHeight.toString();
    canvas = < HTMLCanvasElement > document.getElementById("canvas");
    ctx = < CanvasRenderingContext2D > canvas.getContext("2d");
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
    let Random: number = (Math.floor(Math.random() * 100));
    let powerUpList: string[] = Object.keys(PowerUps);
    chosenPowerUp = powerUpList[Random % powerUpList.length];
    if (game.powerActive) {
        PowerUps[chosenPowerUp].effect();
    } else if (!game.powerActive) {
        PowerUps.doubler.loseEffect();
    }
}

/**
 *
 * @param tempBrick
 */
function collisionsDetect(tempBrick: Brick) {
    level.balls.forEach((orb: Ball) => collisions(orb, tempBrick));
}

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
    if (distance <= radius / 2 + .4) {
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

function gameLoop(name: FrameRequestCallback) {
    requestAnimationFrame(name);
}

function drawBackground() {
    ctx.fillStyle = "darkGrey";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
interface keyBoard {
    [index: string]: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
}
const keyBoard:keyBoard = {
    ArrowLeft: false,
    ArrowRight: false,
};
