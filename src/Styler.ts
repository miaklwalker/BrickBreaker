import { BrickBreaker, BrickStyle } from "./Interfaces.js";
import {styles} from "./styles.js"
export let textLocation:number[]
export let modernColors: number[][];
export let brickStyle:BrickStyle
export let paddleStyle: string[];
export let textStyle: string[];
export let ballStyle: string[];
export let fontStyle: string[];
export let backgroundStyle: [string,boolean];
let index = ['Zelda', 'Retro', 'Zelda', 'Modern', 'PacMan'];
let styleSelect = <HTMLSelectElement>document.getElementById("colorSelect")
let selectedStyle = styleSelect.selectedIndex;
console.log(index);
console.log(styles.Styles[index[selectedStyle]].background)
styler(styles);
let selectionWatcher = document.querySelector('.styleSelector') as HTMLSelectElement;
selectionWatcher.addEventListener('change',(event:any) =>{
   selectedStyle = event.target.selectedIndex
styler(styles);
})
/**
 * @function styler
 * @description - gets the players choice of theme and then passes that arguement to the style sheet
 * which returns values for Ball , Brick , Fonts , TextSize, Paddle and Background Styles
 */
export function styler(styleSheet:any) {
    modernColors    = styleSheet.Styles[index[selectedStyle]].color
    brickStyle      = styleSheet.Styles[index[selectedStyle]].brick
    textStyle       = styleSheet.Styles[index[selectedStyle]].text
    ballStyle       = styleSheet.Styles[index[selectedStyle]].ball
    paddleStyle     = styleSheet.Styles[index[selectedStyle]].paddle
    fontStyle       = styleSheet.Styles[index[selectedStyle]].font
    backgroundStyle = styleSheet.Styles[index[selectedStyle]].background
    textLocation    = styleSheet.Styles[index[selectedStyle]].textLocation
}

