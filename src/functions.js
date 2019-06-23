import animatedBackground from "./animatedBackground.js";
export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");



// Registers an Event if user click the canvas
export let clickHandler = () =>
    canvas.addEventListener("click", () => true, false);

export let zelda = new animatedBackground(31);
zelda.addSprites(
    "https://raw.githubusercontent.com/miaklwalker/BrickBreaker/master/docs/zelda/tile",
    ".jpg",
);

