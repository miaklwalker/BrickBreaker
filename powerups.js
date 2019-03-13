const powerUps = function () {
    return {

    }
}
const doubler = new powerUps()
doubler.effect = (paddle) => {
    paddle.width *= 2
}
doubler.loseDoubler = (paddle) =>(
    paddle.width = 84
)