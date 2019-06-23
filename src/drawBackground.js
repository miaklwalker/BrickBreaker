import { backgroundStyle } from "./styler.js";
import { ctx, canvas, zelda } from "./functions.js";
/**
 * @function drawBackground
 * @description - Draws The Background of the level using the Theme selected By the Player
 */
export function drawBackground() {
    if (!backgroundStyle[1]) {
        ctx.fillStyle = backgroundStyle[0];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else {
        let img = zelda.Sprite(8);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}