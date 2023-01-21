const gameSplash = document.querySelector('#game-splash')
const gameIntro = document.querySelector('#game-intro')
const game = document.querySelector('#game')
const gameOver = document.querySelector('#game-over')

game.style.display ="none"
gameIntro.style.display ="none"
gameOver.style.display ="none"




const btnStart = document.querySelector('#btnStart')
const btnToggleSpoilerVersion = document.querySelector('#btnToggleSpoilerVersion')


//audio
/* const audioIntro = new Audio('./audio/please-these-gays-are-trying-to-murder-me.mp3')
audioIntro.preload */



//Spoiler version variables
let isSpoilerVersion = false
const title = document.querySelector('title')
const nameOfGame = document.querySelector('#name-of-game h1').innerText
const instructionsText = document.querySelector('#instructionsText').innerHTML
const introImageCtn = document.querySelector('#intro-image-ctn img').src
const mainImageCtn = document.querySelector('#main-image-ctn img').src



//game variables
let animateId
//let gameOver = false
isMovingLeft = false
isMovingRight = false
isMovingUp = false
isMovingDown = false

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gameBackground = new Image()
gameBackground.src = 'https://media.architecturaldigest.com/photos/6386579956d3de6551010f47/master/w_1600%2Cc_limit/AD090119_GARCIA_03.jpg'
const gameBackgroundSpoiler = new Image()
gameBackground.src = 'https://media.architecturaldigest.com/photos/6386579956d3de6551010f47/master/w_1600%2Cc_limit/AD090119_GARCIA_03.jpg'

const playerImg = new Image()
playerImg.src = '../images/player-tanya.png'

const attacker1Img = new Image()
attacker1Img.src = '../images/attacker-quentin.png'

const playerWidth = 60
const playerHeight = 80

let playerX = 40
let playerY = 400

let canvasBorder = 20


//Attackers
let attackers = []

const generateRandomNumber = () => {
  const randomAttackerX = Math.floor(100 + Math.random() * (canvas.width - 100))
  return randomAttackerX
}

class Attackers {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
  }

  draw() {

    ctx.beginPath()
    ctx.drawImage(attacker1Img, this.xPos, this.yPos, this.width, this.height)
    this.xPos -= 1
    ctx.closePath()
  }

  checkCollision() {
    if (
        playerX < this.xPos + this.width &&
        playerX + playerWidth > this.xPos &&
        playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
      gameOver = true
    }
  }
}





const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(gameBackground, 0, 0, canvas.width, canvas.height)

    ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight)

    attackers.forEach(attacker => {
        attacker.draw()
        attacker.checkCollision()
      })
    
      attackers = attackers.filter(attackers => attackers.xPos > 0)

    
    if (isMovingLeft && playerX > canvasBorder) {
        playerX -= 5
    }
    if (isMovingRight && playerX <  canvas.width - canvasBorder - playerWidth) {
        playerX += 5
    }
    if (isMovingUp && playerY > canvasBorder) {
        playerY -= 5
    }
    if (isMovingDown && playerY <  canvas.height - canvasBorder - playerWidth) {
        playerY += 5
    }


    //in first 2000 frames
    if (animateId > 0 && animateId < 2000) {
        //every 200 frames, add random attacker
        if (animateId % 200 === 0) {
            attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 50, 50))
        }
    
  
    }
    
    console.log(attackers)
    console.log(animateId)

if (gameOver === true) {
    cancelAnimationFrame(animateId)
  } else {
    animateId = requestAnimationFrame(animate)
  }

  
}

const startGame = () => {

    
    console.log("game started")


    /* let skipIntervalId =  */setTimeout(()=>{
    gameIntro.style.display = "none"  
    game.style.display = "block" 
    // audioIntro.play();
    }, 3000)
    animate()
}


window.addEventListener('load', () => {

    
    btnStart.onclick = () => {
        gameSplash.style.display = "none"
        gameIntro.style.display = "block"
        startGame()
    }





//add key event listeners here

//arrow keys
//keydown
    document.addEventListener('keydown',event => {
        if(event.key === "ArrowRight"){
        isMovingRight = true
        document.querySelector("#keys-right").classList.add("keys-pushed")
        console.log("right", "isMovingRight:", isMovingRight, event)
        }
        if(event.key === "ArrowLeft"){
        isMovingLeft = true
        document.querySelector("#keys-left").classList.add("keys-pushed")
        console.log("left", "isMovingLeft:", isMovingLeft, event)
        }
        if(event.key === "ArrowUp"){
        isMovingUp = true
        document.querySelector("#keys-up").classList.add("keys-pushed")
        console.log("right", "isMovingUp:", isMovingUp, event)
        }
        if(event.key === "ArrowDown"){
        isMovingDown = true
        document.querySelector("#keys-down").classList.add("keys-pushed")
        console.log("left", "isMovingDown:", isMovingDown, event)
        }
    })
//keyup
    document.addEventListener('keyup',event => {
        if(event.key === "ArrowRight"){
            isMovingRight = false
            document.querySelector("#keys-right").classList.remove("keys-pushed")
            console.log("right", "isMovingRight:", isMovingRight, event)
        }
        if(event.key === "ArrowLeft"){
            isMovingLeft = false
            document.querySelector("#keys-left").classList.remove("keys-pushed")
            console.log("left", "isMovingLeft:", isMovingLeft, event)
        }
        if(event.key === "ArrowUp"){
            isMovingUp = false
            document.querySelector("#keys-up").classList.remove("keys-pushed")
            console.log("right", "isMovingUp:", isMovingUp, event)
        }
        if(event.key === "ArrowDown"){
            isMovingDown = false
            document.querySelector("#keys-down").classList.remove("keys-pushed")
            console.log("left", "isMovingDown:", isMovingDown, event)
            }
    })
 /*    document.addEventListener('keydown',event => {
        if(event.key === "ArrowUp"){
        isMovingUp = true
        console.log("up", "isMovingUp:", isMovingUp, event)
        }
    })
    document.addEventListener('keydown',event => {
        if(event.key === "ArrowDown"){
        isMovingDown = true
        console.log("down", "isMovingDown:", isMovingDown, event)
        }
    }) */




    //space bar
    btnToggleSpoilerVersion.addEventListener('click', () => {
        if(isSpoilerVersion === false){
            isSpoilerVersion = true
            //Splash
            document.querySelector('#name-of-game h1').innerText = "Please, These Gays, They're Trying To Murder Me"
            document.querySelector('#name-of-game h1').style.color = "red"
            btnToggleSpoilerVersion.classList.toggle("toggle")
            document.querySelector('#instructionsText').innerHTML ="<p><b>Instructions</b></p><p>Use the arrow keys to run away from 'these gays'. They are trying to murder you!</p><p>You have 3 lives. Each time one of 'these are some high-end gays', you'll lose a life.</p><p>See how long you can last before you are murdered. The longer you last, the higher your score.</p>"
            document.querySelector('#main-image-ctn img').src = "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-10/aubrey-plaza-adam-dimarco-the-white-lotus-zz-221026-06-cf4122.jpg"
             //Intro
            document.querySelector('#intro-image-ctn img').src = "./images/ref-images/gif-gays.gif"
             //Game
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(gameBackgroundSpoiler, 0, 0, canvas.width, canvas.height)
            
        } else{
            isSpoilerVersion = false
             //Splash
            document.querySelector('#name-of-game h1').innerText = "Please, These Guys, They're Trying To Rob Me"
            document.querySelector('#name-of-game h1').style.color = "black"
            btnToggleSpoilerVersion.classList.toggle("toggle")
            document.querySelector('#instructionsText').innerHTML ="<p><b>Instructions</b></p><p>Use the arrow keys to run away from people trying to steal your money.</p><p>You <i>only</i> have 3 billion dollars. Each time a robber runs into you, they'll rob you and you'll lose 1 billion dollars.</p><p>See how long you can last before all your money runs out. The longer you last, the higher your score.</p>"
            document.querySelector('#main-image-ctn img').src = "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-10/aubrey-plaza-adam-dimarco-the-white-lotus-zz-221026-06-cf4122.jpg"
             //Intro
            document.querySelector('#intro-image-ctn img').src = "./images/ref-images/gif-guys.gif"
        }

    })
    btnSkip.addEventListener('click', () => {
        console.log("skip Btn")
        gameIntro.style.display = "none"
        game.style.display = "block"
        })


})

