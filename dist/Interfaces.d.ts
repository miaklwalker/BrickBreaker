import { Brick } from "./Brick.js";
import { Ball } from "./Ball.js";
export interface GameLogic {
    ballLoop: () => any;
    ends: () => any;
    win: () => any;
    demo: () => any;
    gameOver: () => any;
    loseLife: () => any;
}
export interface Level {
    levelNum: number;
    numOfPowers: number;
    numOfRows: number;
    weakestBrick: number;
    score: number;
    bricks: Array<Brick>;
    balls: Array<Ball>;
    fortifier: number;
    GameText: () => any;
    makeEffect: () => any;
    fortifyBricks: () => any;
    makeBricks: () => any;
    showBricks: () => any;
    reset: () => any;
}
export interface KeyBoard {
    [index: string]: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
}
export interface powerUps {
    [index: string]: any;
    doubler: doubler;
    multiBall: multiBall;
    extraLife: extraLife;
}
export interface multiBall {
    [index: string]: any;
    counter: number;
    maxBall: number;
    effect: () => any;
    loseEffect: () => any;
}
export interface doubler {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
export interface extraLife {
    [index: string]: any;
    effect: () => any;
    loseEffect: () => any;
}
export interface Game {
    lives: number;
    balls: number;
    active: boolean;
    powerActive: boolean;
    over: boolean;
}
export interface BrickStyle {
    set1: string[][][];
    set2: string[][][];
}
export interface style {
    brick: BrickStyle;
    ball: {};
    text: string[];
    textLocation: number[];
    color: number[][];
    font: string[];
    paddle: string[];
    background: [string, boolean];
}
export interface gameStyle {
    Modern: style;
    Retro: style;
    Zelda: style;
    PacMan: style;
}
export interface BrickBreaker {
    Credits: Credits;
    Classes: Classes;
    Styles: gameStyle;
}
export interface Credits {
    GameTitle: string;
    LeadCoder: string;
    OriginalIdea: string;
    thisProject: string;
}
export interface Classes {
    Ball: string;
    Paddle: string;
    Brick: string;
    Ai: string;
}
//# sourceMappingURL=Interfaces.d.ts.map