const powerUps = function () {
    return {

    }
}
const doubler = new powerUps()
doubler.effect = (paddle) => {
    paddle.width *= 2
}