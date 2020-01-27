import {fontStyle} from "./styler.js";
import {game} from './main.js'
import {level} from "./Level.js";


export default class scoreBoard {

    constructor() {
        this.scoreboard = document.getElementById("ScoreBoard");
        this.div = this.scoreboard.children;
        this.drawn = false;
    }
    drawScoreBoard() {
        this.scoreboard.style.fontFamily = `${fontStyle[0]}`;
        this.scoreboard.style.fontSize = `${fontStyle[1]}`;
        this.div[1].innerHTML = `${level.score}  `;
        this.div[3].innerHTML = `${level.levelNum}`;
        this.div[4].innerHTML = `----BRICK BREAKER!----`;
        this.div[6].innerHTML = `${game.lives}`;
        this.div[8].innerHTML = `${level.balls.length}`;
    }

}