"use strict";
function styler() {
    let styleSelect = document.getElementById("colorSelect");
    let selectedStyle = styleSelect.selectedIndex;
    console.log(index[selectedStyle]);
    console.log(selectedStyle);
    modernColors = styles[index[selectedStyle]].color;
    brickStyle = styles[index[selectedStyle]].brick;
}
let index = ['Retro', 'Retro', 'Classic', 'Modern'];
let styles = {
    Modern: {
        brick: [`white`, 50, 50],
        ball: [],
        text: [],
        color: [
            [218, 247, 166],
            [255, 195, 0],
            [255, 87, 51],
            [199, 0, 57],
            [133, 193, 233],
            [46, 204, 113]
        ],
        font: []
    },
    Retro: {
        brick: [],
        ball: [],
        text: [],
        color: [
            [255, 255, 255],
            [0, 0, 0],
            [255, 255, 255],
            [0, 0, 0],
            [255, 255, 255],
            [0, 0, 0]
        ],
        font: []
    },
    Classic: {
        brick: [],
        ball: [],
        text: [],
        color: [],
        font: []
    }
};
