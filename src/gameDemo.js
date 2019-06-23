import {ai} from "./main.js"
import {level} from "./Level.js"
let gameDemo=()=>{
    canvas.addEventListener(
        "click",
        () => {
            if (ai.control) {
                ai.control = false;
                level.reset();
            }
        },
        {
            once: true,
        },
    );
}
export default gameDemo