let frame = 0
let counter = 0

// Functions
/**
 * 
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480" 
 * @param height - The height of the Canvas as a string "480" 
 */
function makeCanvas(name: string, width ? : string, height ? : string) {
    let w: string = width || (window.innerWidth * .75).toString();
    let h: string = height || (3 * window.innerHeight / 4).toString();
    canvas = < HTMLCanvasElement > document.getElementById("canvas");
    ctx = < CanvasRenderingContext2D > canvas.getContext("2d");
    canvas.setAttribute("id", name);
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
}

// Registers an Event if user click the canvas
let clickHandler = () => canvas.addEventListener("click", () => true, false);

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
let zelda = new animatedSprites(31)
zelda.addSprites("../docs/zelda/tile",".jpg");
/**
 * Sets up Loop Call Backs
 * @param name - is the name of the call back function you want to use!
 */
function gameLoop(name: FrameRequestCallback) {
    requestAnimationFrame(name);
}
/**
 * @function drawBackground
 * @description - Draws The Background of the level using the Theme selected By the Player
 */
function drawBackground() {
    if (backgroundStyle[1] === false) {
        ctx.fillStyle = backgroundStyle[0];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }else{
        let img = zelda.Sprite(8);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    }
}
