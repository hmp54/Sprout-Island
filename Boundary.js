//COLLISION DETECTION 
class Boundary{
    static width = 64
    static height = 64
    constructor({position}){
        this.position = position 
        this.width = 64
        this.height = 64
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -1570,
    y: -970
}

//COLLISION DETECTION (player, boundary)
function rectangularCollision({ rectangle1, rectangle2 }){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}