class Ai {
    constructor (){
        this.position = createVector()
        this.control = true;
    }
    logic(ball){
        this.position.x = ball.position.x +15
    }
}