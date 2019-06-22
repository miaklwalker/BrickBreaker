import {styles} from  "./styles.js"
let textLocation;
let modernColors;
let brickStyle
let paddleStyle;
let textStyle;
let ballStyle;
let fontStyle;
let backgroundStyle;
let index = ['Zelda', 'Retro', 'Zelda', 'Modern', 'PacMan'];
let styleSelect = document.getElementById("colorSelect")
let selectedStyle = styleSelect.selectedIndex;
styler(styles);
let selectionWatcher = document.querySelector('.styleSelector');
selectionWatcher.addEventListener('change',(event) =>{
   selectedStyle = event.target.selectedIndex
styler(styles);
})
/**
 * @function styler
 * @description - gets the players choice of theme and then passes that arguement to the style sheet
 * which returns values for Ball , Brick , Fonts , TextSize, Paddle and Background Styles
 */
 function styler(styleSheet) {
    modernColors    = styleSheet.Styles[index[selectedStyle]].color
    brickStyle      = styleSheet.Styles[index[selectedStyle]].brick
    textStyle       = styleSheet.Styles[index[selectedStyle]].text
    ballStyle       = styleSheet.Styles[index[selectedStyle]].ball
    paddleStyle     = styleSheet.Styles[index[selectedStyle]].paddle
    fontStyle       = styleSheet.Styles[index[selectedStyle]].font
    backgroundStyle = styleSheet.Styles[index[selectedStyle]].background
    textLocation    = styleSheet.Styles[index[selectedStyle]].textLocation
}

export {textLocation,modernColors,brickStyle,paddleStyle,textStyle,ballStyle,fontStyle,backgroundStyle}