interface level {
    levelNum: number;
    numOfPowers: number;
    numOfRows: number;
    weakestBrick: number;
    score: number;
    bricks: Array<Brick>;
    balls: Array<Ball>;
    fortifier: number;
    scoreboard: () => any;
    makeEffect: () => any;
    fortifyBricks: () => any;
    makeBricks: () => any;
    showBricks: () => any;
    reset: () => any;
}
interface game {
    lives: number;
    balls: number;
    active: boolean;
    powerActive: boolean;
    over: boolean;
}
interface gameLogic {
    ballLoop: () => any;
    ends: () => any;
    win: () => any;
    demo: () => any;
    gameOver: () => any;
    loseLife: () => any;
}
interface PowerUps {
    [index: string]: any;
    doubler: doubler;
    multiBall: multiBall;
    extraLife: extraLife;
}
interface multiBall {
    [index: string]: any;
    counter: number;
    maxBall: number;
    effect: () => any;
    loseEffect: () => any;
}
interface doubler {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
interface extraLife {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
