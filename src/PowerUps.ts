
// Power-Ups 

/**
 * @name PowerUps
 * @property doubler
 * @description - doubles the width of the paddle
 * @property multiBall
 * @description - Adds Multiple Balls to the GameScreen
 * @property extraLife
 * @description - Gives the player a extra life
 * 
 */

const PowerUps: PowerUps = {
    doubler: <doubler>{
        effect(paddle: Paddle = player) {
            if (paddle.width < canvas.width / 4) {
                paddle.width *= 2;
            } else if (paddle.width < canvas.width / 2) {
                paddle.width *= 1.5;
            } else {
                PowerUps.multiBall.effect();
            }
        },
        loseEffect(paddle: Paddle = player) {
            paddle.width = canvas.width / 5;
        }
    },
    multiBall: <multiBall>{
        counter: <number>0,
        maxBall: <number>10,
        effect(numOfBalls: number = 5) {
            this.maxBall = numOfBalls;
            for (this.counter; this.counter < this.maxBall; this.counter++) {
                level.balls.push(new Ball(level.balls[0].position.x + this.counter * 3, level.balls[0].position.y));
                level.balls.push(new Ball(level.balls[0].position.x - this.counter * 3, level.balls[0].position.y));
            }
            this.counter = 0;
        },
        loseEffect() {
            game.powerActive = false;
        },
    },

    extraLife: <extraLife>{
        effect() {
            game.lives += 1;
        },
        loseEffect() {
            game.powerActive = false;
        },
    }
};