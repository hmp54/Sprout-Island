//SPRITE
class Sprite{
    constructor({position, velocity, image, frames = {max: 1}, direction}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.direction = direction

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.max
        }
        this.moving = false
    }

    draw(){
        c.drawImage( //src, xCropStart, yCropStart, xCropEnd, yCropEnd, xPosition, yPostion
            this.image, 
            this.frames.val * this.width,
            this.direction * (this.height),/////
            this.image.width/this.frames.max,
            this.image.height/this.frames.max,////
            this.position.x,
            this.position.y, 
            (this.image.width / this.frames.max),
            (this.image.height / this.frames.max)
        )

        if(!this.moving) return 

        //controls the movement animation for a sprite
        if(this.frames.max > 1){
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 10 === 0){
            if(this.frames.val < this.frames.max - 1)
                this.frames.val++
            else
                this.frames.val = 0 
        }
    }
}


