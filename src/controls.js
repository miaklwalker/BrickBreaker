let keyPressed;
let keyRel;
import {ai} from "./main.js";
import {game} from './game.js'

export const keyBoard = {
    ArrowLeft: false,
    ArrowRight: false,
};

export function addControls() {
    document.addEventListener(
        "keydown",
        event => {
            keyPressed = event.key;
            if (keyPressed === "ArrowLeft") keyBoard.ArrowLeft = true;
            if (keyPressed === "ArrowRight") keyBoard.ArrowRight = true;
            if (keyPressed === "Enter" && !ai.control) {
                if (!game.active) {
                    game.active = true;
                }
            }
            if (
                [
                    "Space",
                    "ArrowLeft",
                    "ArrowUp",
                    "ArrowRight",
                    "ArrowDown",
                ].includes(event.code)) {
                event.preventDefault();
            }
        },
        false,
    );
    document.addEventListener(
        "keyup",
        event => {
            keyRel = event.key;
            if (keyRel === "ArrowLeft") keyBoard.ArrowLeft = false;
            if (keyRel === "ArrowRight") keyBoard.ArrowRight = false;
        },
        false,
    );
}
