const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

const mouse = {
    x: undefined,
    y: undefined
}

const colorArray = [
    'red',
    'blue',
    'green',
    'pink',
    'yellow'
]

const maxRadius = 40
const minRadius = Math.random() * 2 + 1

window.addEventListener('mousemove', function( event ) {
    mouse.x = event.x
    mouse.y = event.y
})

function Circle( x, y, radius, speedX, speedY) {
    this.x = x
    this.y = y
    this.radius = radius
    this.speedX = speedX
    this.speedY = speedY
    this.maxRadius = maxRadius
    this.minRadius = minRadius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function() {
        if( this.x + this.radius > canvas.width || this.x - this.radius < 0 ) {
            this.speedX = -this.speedX
        }
    
        if( this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY
        }
    
        this.x += this.speedX
        this.y += this.speedY  

        // interactivity

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            this.radius += 1
        } 
        else if ( this.radius > this.minRadius ){
            this.radius -= 1
        }

        this.draw()

    }
}

const circleArray = []

function init() {
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * window.innerWidth
        let y = Math.random() * window.innerHeight
        let radius = Math.floor(Math.random() * 50)  
        let speedX = (Math.random() - 0.5) * 4
        let speedY = (Math.random() - 0.5) * 4
        circleArray.push(new Circle(x, y, radius, speedX, speedY))
    }
}



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}
animate()

init()



