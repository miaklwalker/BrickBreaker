declare let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, ball: Ball, brick: Brick, player: Paddle, clicked: number, keyPressed: string, ai: Ai, keyRel: string, PaddleSpeed: number, hit: boolean, title: HTMLSpanElement, color: number, iterator: number, chosenPowerUp: string, displayed: boolean, modernColors: number[][], brickStyle: any[] | string[];
declare let clickHandler: () => void;
declare function setup(): void;
declare function draw(): void;
