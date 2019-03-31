declare class Ball {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    radius: number;
    speedLimit: number;
    ballLost: boolean;
    constructor(x: number, y: number);
    contact(paddle: Paddle): void;
    move(): void;
    hitWall(): void;
    show(): void;
}
