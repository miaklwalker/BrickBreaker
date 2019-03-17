class Ai {
    constructor (){
        this.position = createVector()
        this.control = true;
    }
    logic(ball){
        console.log("is this thing on ")
        this.position.x = ball.position.x
        console.log(this.position.x)
    }
}