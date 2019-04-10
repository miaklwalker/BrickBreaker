class scoreBoard {
    scoreboard: HTMLDivElement;
    div: HTMLCollection;
    drawn: boolean;
    constructor() {
        this.scoreboard = <HTMLDivElement>document.getElementById("ScoreBoard");
        this.div = this.scoreboard.children as HTMLCollection;
        this.drawn = false;
    }
    drawScoreBoard() {
        this.scoreboard.style.fontFamily = `${fontStyle[0]}`
        this.scoreboard.style.fontSize = `${fontStyle[1]}`
        this.div[1].innerHTML = `${level.score}  `;
        this.div[3].innerHTML = `${level.levelNum}`;
        this.div[4].innerHTML = `----BRICK BREAKER!----`;
        this.div[6].innerHTML = `${game.lives}`;
        this.div[8].innerHTML = `${level.balls.length}`;
    }
    drawScore() {
        this.div[1].innerHTML = `${level.score}  `;
    }
    drawLevelNum() {
        this.div[3].innerHTML = `${level.levelNum}`;
    }
    drawGameName() {
        this.div[5].innerHTML = `----BRICK BREAKER!----`;
    }
    drawLives() {
        this.div[6].innerHTML = `${game.lives}`;
    }
    drawBalls() {
        this.div[8].innerHTML = `${level.balls.length}`;
    }
}