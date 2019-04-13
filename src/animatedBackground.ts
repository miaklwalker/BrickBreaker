class animatedSprites{
    frame:number
    counter:number
    sprites:HTMLImageElement[]
    numberOfSprites:number
    constructor(numberOfSprites:number){
        this.frame   =  0;
        this.counter =  0;
        this.sprites = [];
        this.numberOfSprites = numberOfSprites
    }
    addSprites(url:string,format:string){
        for(let i = 0 ; i < this.numberOfSprites ; i++){
        let img = new Image()
            img.src = `${url}${i}${format}`
            this.sprites.push(img)
        }
    }
    Sprite(fr:number){
       this.counter++
       if(this.counter%fr === 0 ){
           this.frame++
       }
       return this.sprites[this.frame%this.numberOfSprites]
    }
    staticSprite(index:number){
        return this.sprites[index]
    }

}
