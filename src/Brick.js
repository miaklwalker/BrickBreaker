import Vector from "./Vector.js"
import {cracks} from "./main.js"
import {brickStyle} from "./Styler.js"
import {ctx} from './functions.js'
import uniqueid from "./CreateId.js";
/**
 * @class Brick
 * @classdesc Creates a Brick Object{} That has a position and Health!
 * @param x - number - Represents position on the X axis
 * @param y - number - Represents position on the Y axis
 * @param health - The number of hits the brick can take.
 */
export default class Brick {

    constructor(x, y, health) {
        this.id= uniqueid();
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
    onMessage(){}
    /**
     * @method show -Shows the Brick object based on the Current Style
     */
    show() {
        const{position,health,effect,height,width}=this;
        const {x,y} = position;

         let crack = cracks.staticSprite(health);
         let set = effect ? brickStyle.set1[health-1]:brickStyle.set2[health-1];

            let myGradient = ctx.createLinearGradient(x, y, x, y + height);
            myGradient.addColorStop( 0, `${set[0][0]}`);
            myGradient.addColorStop(.6, `${set[1][0]}`);
            myGradient.addColorStop( 1, `${set[2][0]}`);
            ctx.fillStyle = myGradient;

            ctx.fillRect(position.x, position.y, width, height);

        if(this.cracked===true){ctx.drawImage(crack,x,y,width,height)}
    }
}
