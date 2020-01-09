/**
 * 
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480" 
 * @param height - The height of the Canvas as a string "480" 
 */
export default function canvasConfig(width=(window.innerWidth /1), height=(3 * window.innerHeight/3.2)) {
    let w = width ;
    let h = height;
    let canvas =document.getElementById("canvas");
    canvas.width  = w;
    canvas.height = h;
    return canvas
}