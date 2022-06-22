const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');  //is responsible for drawing 2d on the canvas
const spriteSpeed = 3; 
const spriteSize = 64; 
canvas.width = 1024;
canvas.height = 576;

//RENDER ISLAND MAP
const image = new Image()
image.src = './img/sproutIsland.png' 

//RENDER PLAYER
const playerImage = new Image()
playerImage.src = './img/playerSpriteSheet.png'

const player = new Sprite({
    position: {
        x:(canvas.width/2)-32,
        y:(canvas.height/2)-32
    },
    image: playerImage,
    frames:{
        max: 4
    },
    direction: 0,
})

//Create a new sprite that acts as island background 
const background = new Sprite({position:{
        x: offset.x,
        y: offset.y
    },
    image: image,
    direction: 0,
})


//takes collision data from collisions.js and turns into array
const collisionsMap = []
for(let i = 0; i < islandCollisions.length; i += 70){
    console.log('Slice at ' + i + ' ' + islandCollisions.slice(i, 70 + i))
    collisionsMap.push(islandCollisions.slice(i, 70 + i))
} 

//creates collisions
collisionsMap.forEach((row, i) =>{
    row.forEach((symbol, j) => {
       if(symbol === 0)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})


//items that should move with the background when the player moves
const movables = [background, ...boundaries]


//PLAYER MOVEMENT KEYS
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

//ISLAND ANIMATION LOOP
function renderIsland(){
    window.requestAnimationFrame(renderIsland)
    background.draw()

    boundaries.forEach(boundary =>{
        boundary.draw()
    })
    player.draw(); 

    let moving = true; 
    player.moving = false; 
    player.direction = 0; 

    if(keys.w.pressed && lastKey === 'w') {
        player.moving = true; 
        player.direction = 1; 
        for(let i = 0; i <  boundaries.length; i++){
            const boundary = boundaries[i]
            if( 
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x:boundary.position.x,
                        y: boundary.position.y + spriteSpeed
                    }}
                })
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable =>{
                movable.position.y += spriteSpeed
            })
    } if(keys.a.pressed && lastKey === 'a') {
        player.moving = true; 
        player.direction = 2; 
        for(let i = 0; i <  boundaries.length; i++){
            const boundary = boundaries[i]
            if( 
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x:boundary.position.x + spriteSpeed,
                        y: boundary.position.y
                    }}
                })
            ){
                moving = false
                break
            }
        }

        if(moving)
            movables.forEach(movable =>{
                movable.position.x += spriteSpeed
            })
    } if(keys.s.pressed && lastKey === 's') {
        player.moving = true; 
        for(let i = 0; i <  boundaries.length; i++){
            const boundary = boundaries[i]
            if( 
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x:boundary.position.x,
                        y: boundary.position.y - spriteSpeed
                    }}
                })
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable =>{
                movable.position.y -= spriteSpeed
            })
    } if(keys.d.pressed && lastKey === 'd') {
        player.moving = true; 
        player.direction = 3; 
        for(let i = 0; i <  boundaries.length; i++){
            const boundary = boundaries[i]
            if( 
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - spriteSpeed,
                        y: boundary.position.y
                    }}
                })
            ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable =>{
                movable.position.x -= spriteSpeed
            })
    }
}


//PLAYER MOVEMENT EVENT LISTENERS
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = true 
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break                            
    }
    console.log(keys);
})

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = false 
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break                            
    }
    console.log(keys);
})

