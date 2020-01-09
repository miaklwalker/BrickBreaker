import {styles} from  "./styles.js"
let textLocation;
let modernColors;
let brickStyle;
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
    const{color,brick,text,ball,paddle,font,background,textLocation:tl} = styleSheet.Styles[index[selectedStyle]];
    modernColors    = color;
    brickStyle      = brick;
    textStyle       = text;
    ballStyle       = ball;
    paddleStyle     = paddle;
    fontStyle       = font;
    backgroundStyle = background;
    textLocation    = tl;
}

export {textLocation,modernColors,brickStyle,paddleStyle,textStyle,ballStyle,fontStyle,backgroundStyle}