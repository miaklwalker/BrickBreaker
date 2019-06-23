/**
 * 
 * @param name   - This Value Becomes The id for the Canvas.
 * @param width  - The Width of the Canvas as a string "480" 
 * @param height - The height of the Canvas as a string "480" 
 */
export default function canvasConfig(width=(window.innerWidth /1).toString(), height=(3 * window.innerHeight/3.2).toString()) {
    let w = width 
    let h = height;
    let canvas =document.getElementById("canvas");
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas
}