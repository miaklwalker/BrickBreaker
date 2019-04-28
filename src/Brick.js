

/**
 * @class Brick
 * @classdesc Creates a Brick Object{} That has a position and Health!
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
class Brick {

    constructor(x, y, health) {
        this.position = new Vector(x, y);
        this.width = (canvas.width / 10) - 2.5;
        this.height = (canvas.height / 20) - 4;
        this.health = health;
        this.startingHealth = health;
        this.effect = false;
        this.cracked = false;
    }
    /**
     * @method hit -Decrements The Brick Objects Health When Hit.
     */
    hit() {
        this.health -= 1;
        this.cracked = true;
    }
    /**
     * @method show -Shows the Brick object based on the Current Style
     */
    show() {
        let crack = cracks.staticSprite(this.health)
        let setOne= brickStyle.set1[this.health-1];
        let setTwo= brickStyle.set2[this.health-1];
        if (this.effect) {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
            myGradient.addColorStop( 0, `${setOne[0][0]}`);
            myGradient.addColorStop(.6, `${setOne[1][0]}`);
            myGradient.addColorStop( 1, `${setOne[2][0]}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        } else {
            let myGradient = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x, this.position.y + this.height);
             myGradient.addColorStop( 0, `${setTwo[0][0]}`);
             myGradient.addColorStop(.6, `${setTwo[1][0]}`);
             myGradient.addColorStop( 1, `${setTwo[2][0]}`);
            ctx.fillStyle = myGradient;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        if(this.cracked===true){ctx.drawImage(crack,this.position.x,this.position.y,this.width,this.height)}
    }
}
