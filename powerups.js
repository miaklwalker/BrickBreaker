const powerUps = function(){
    return {
        duration:1800,
        active: false,
}
}
const doubler = new powerUps()
doubler.effect = (paddle) =>{
paddle.width *=2
}
const multiball = new powerUps()
let by = 200
multiball.effect = (ranx) =>{
    let by = 200
    for(let i = 0 ;i < 10 ; i ++){
        let pball = new Ball(ranx,by);
        balls.push(pball);
    }
    balls.forEach(ball=> ball.show())
    
}