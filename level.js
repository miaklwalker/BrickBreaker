const level = {
    levelNum: 1,
    numOfPowers: 0,
    numOfRows:3,
    weakestBrick: 1,
    score:0,
    bricks: [],
    winboo:false,
    makeBricks() {
        let h = (level.numOfRows * 24 +24);
        for (h; h > 24; h -= 24) {
            for (let i = 10 - 1; i > -1; i--) {
                level.bricks.push(new Brick(i * 48, h, level.weakestBrick));
            }
            level.weakestBrick+=1
        }
        return level.bricks
    },
    show() {
        let LevText = text("Level: " + level.levelNum, 10, 20);
        let lScore  = text("score: " + level.score , 10,40 )
        for (let i = 0; i < level.bricks.length; i++) {
            level.bricks[i].show()
            level.bricks[i].collision(ball)
            if (level.bricks[i].health <= 0) {
                let broke = level.bricks.splice(i, 1)
                console.log(broke[0].SHealth)
                level.score += broke[0].SHealth*500
            }
        }
    },
    win(ball){
        if(level.bricks.length === 0){
        level.levelNum += 1;
        level.numOfPowers += 1;
        level.numOfRows += 1;
        level.weakestBrick += 1;
        ball.position.x = width / 2;
        ball.position.y = height / 2;
        ball.speed.x = 0;
        ball.speed.y = 0;
        level.makeBricks();
        //level.test();
        }
    },
    test( ){
        level.bricks.push(new Brick(24,48,1))
    }
}

