class Ai {
    constructor (){
        this.position = createVector()
        this.control = true;
    }
    logic(ball){
        let right = 0;
        let left = 0;
        level.bricks.forEach( brick => brick.position.x >width/2 ? right++ : left++ )
        this.position.x =  right>left ?  ball.position.x - 30 : ball.position.x + 30;
    }
}