interface gameLogic {
    ballLoop: () => any;
    ends: () => any;
    win: () => any;
    demo: () => any;
    gameOver: () => any;
    loseLife: () => any;
}

interface level {
    levelNum: number;
    numOfPowers: number;
    numOfRows: number;
    weakestBrick: number;
    score: number;
    bricks: Array < Brick > ;
    balls: Array < Ball > ;
    fortifier: number;
    GameText: () => any;
    makeEffect: () => any;
    fortifyBricks: () => any;
    makeBricks: () => any;
    showBricks: () => any;
    reset: () => any;
}

interface keyBoard {
    [index: string]: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
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

interface game {
    lives: number;
    balls: number;
    active: boolean;
    powerActive: boolean;
    over: boolean;
}

interface brickStyle {
      set1:string[][][];
      set2:string[][][];
    }

interface style{
    brick:brickStyle,
    ball: {},
    text: [],
    textLocation: [],
    color: [],
    font: [],
    paddle: [],
    background: string
}
interface gameStyle{
    Modern:style,
    Retro:style,
    Classic:style,
    PacMan:style,
}
interface BrickBreaker {
    Credits: Credits;
    Classes: Classes;
    Styles: gameStyle;
}

interface Credits {
    GameTitle: string;
    LeadCoder: string;
    OriginalIdea: string;
    thisProject: string;
}
interface Classes {
    Ball: string;
    Paddle: string;
    Brick: string;
    Ai: string;
  }
