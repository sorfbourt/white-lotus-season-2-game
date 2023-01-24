const gameSplash = document.querySelector('#game-splash')
const gameIntro = document.querySelector('#game-intro')
const game = document.querySelector('#game')
const gameOverScreen = document.querySelector('#game-over')


game.style.display ="none"
gameIntro.style.display ="none"
gameOverScreen.style.display ="none"

let firstAttempt = true
let animateId
let gameOver = false

let livesLeft = 3
let scoring = 0
let extraPointsScoring = 0
let nameForHighestScore = document.forms["nameForHighestScore"]["name"].value
    
const btnStart = document.querySelector('#btnStart')
const btnRestart = document.querySelector('#btnRestart')
const btnToggleSpoilerVersion = document.querySelector('#btnToggleSpoilerVersion')

//audio
const audioIntro = new Audio('./audio/please-these-gays-are-trying-to-murder-me.mp3')
audioIntro.preload
const audioCrying = new Audio('./audio/jennifer-coolidge-crying.mp3')
audioCrying.preload
const audioOMG = new Audio('./audio/jennifer-coolidge-omg.mp3')
audioOMG.preload
const audioOMG2 = new Audio('./audio/jennifer-coolidge-omg-v2.mp3')
audioOMG2.preload
const audioOuttaHere = new Audio('./audio/jennifer-coolidge-we-gotta-get-the-fuck-outta-here.mp3')
audioOuttaHere.preload
const audioWow = new Audio('./audio/jennifer-coolidge-wow.mp3')
audioWow.preload
const audioThemeSong = new Audio('./audio/white-lotus-theme-song.mp3')
audioThemeSong.preload
audioThemeSong.volume = 0.2
audioThemeSong.play()

//Spoiler version variables
let isSpoilerVersion = false
let isPeppaPigVersion = false



//game variables
isMovingLeft = false
isMovingRight = false
isMovingUp = false
isMovingDown = false

//image declarations
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gameBackground = new Image()
gameBackground.src = './images/game-background.jpeg' // credit: architecturaldigest.com

const playerImg = new Image()
playerImg.src = './images/player-tanya.png'

const attacker1Img = new Image()
attacker1Img.src = './images/attacker-1.png'

const attacker2Img = new Image()
attacker2Img.src = './images/attacker-2.png'

const attacker3Img = new Image()
attacker3Img.src = './images/attacker-3.png'

const lifeline1Img = new Image()
lifeline1Img.src = './images/extralife.png'

const extraPoints1Img = new Image()
extraPoints1Img.src = './images/spaghetti.png'

const extraPoints2Img = new Image()
extraPoints2Img.src = './images/wine.png'

//player variables
let canvasBorder = 0

const playerWidth = 80
const playerHeight = 90

let playerX = canvas.width / 2 - playerWidth
let playerY = 400

let attackers = []
let attackers2 = []
let attackers3 = []
let lifelines = []
let extraPoints = []
let extraPoints2 = []
let collisions = []

//Attackers - Quentin
class Attackers {
  constructor(xPos, yPos, width, height, speed, image=attacker1Img) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
    this.speed = speed
    this.collided = false
    this.image = image
  }

  draw() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)
    this.xPos -= this.speed
    ctx.closePath()
  }

  checkCollision() {
    if (
      playerX < this.xPos + this.width &&
      playerX + playerWidth > this.xPos &&
      playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
      this.collided = true
      collisions.push(this.image.src)  
        audioOuttaHere.play()
        attackers = attackers.filter(attackers => attackers.collided === false) 
        livesLeft = livesLeft - 1
        playerImg.src = '../images/player-tanya-omg.png'
        setTimeout(()=>{
            playerImg.src = '../images/player-tanya.png'
            }, 1000)
        
      if(livesLeft === 0){
        gameOver = true
      }
    }
  }
}

//Attackers - Didier
class Attackers2 extends Attackers {
  constructor(xPos, yPos, width, height, speed, image=attacker2Img) {
    super(xPos, yPos, width, height, speed)
    this.image = image
  }

  draw() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)
    this.xPos -= this.speed
    ctx.closePath()
  }

  checkCollision() {
    if (
      playerX < this.xPos + this.width &&
      playerX + playerWidth > this.xPos &&
      playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
        this.collided = true  
        collisions.push(this.image.src)  
        audioOMG.play()  
        attackers2 = attackers2.filter(attackers => attackers.collided === false) 
        livesLeft = livesLeft - 1
        playerImg.src = '../images/player-tanya-omg.png'
        setTimeout(()=>{
            playerImg.src = '../images/player-tanya.png'
            }, 1000)
        
      if(livesLeft === 0){
          gameOver = true
      }
    }
  }
}
//Attackers - Matteo
class Attackers3 extends Attackers {
  constructor(xPos, yPos, width, height, speed, image=attacker3Img) {
    super(xPos, yPos, width, height, speed)
    this.image = image
  }

  draw() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)
    this.xPos -= this.speed
    ctx.closePath()
  }

  checkCollision() {
    if (
      playerX < this.xPos + this.width &&
      playerX + playerWidth > this.xPos &&
      playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
        this.collided = true  
        collisions.push(this.image.src)  
        audioOMG2.play()  
        attackers3 = attackers3.filter(attackers => attackers.collided === false) 
        livesLeft = livesLeft - 1
        playerImg.src = '../images/player-tanya-omg.png'
        setTimeout(()=>{
            playerImg.src = '../images/player-tanya.png'
            }, 1000)
        
      if(livesLeft === 0){
          gameOver = true
      }
    }
  }
}
//Lifelines - ladders/money
class Lifelines extends Attackers {
    constructor(xPos, yPos, width, height, speed, image=lifeline1Img) {
        super(xPos, yPos, width, height, speed)
        this.image = image
    }
  
    draw() {
      ctx.beginPath()
      ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)
      this.yPos += this.speed
      ctx.closePath()
    }
  
    checkCollision() {
      if (
        playerX < this.xPos + this.width &&
        playerX + playerWidth > this.xPos &&
        playerY < this.yPos + this.height &&
        playerHeight + playerY > this.yPos
      ) {
          this.collided = true  
          collisions.push(this.image.src)    
          audioWow.play()
          lifelines = lifelines.filter(lifelines => lifelines.collided === false) 
          livesLeft = livesLeft + 1
          playerImg.src = '../images/player-tanya-wow.png'
          setTimeout(()=>{
              playerImg.src = '../images/player-tanya.png'
              }, 1000)
      }
    }
  }

//Extra points - spaghetti
class ExtraPoints extends Lifelines {
  constructor(xPos, yPos, width, height, speed, image=extraPoints1Img) {
      super(xPos, yPos, width, height, speed)
      this.image = image
  }

  draw() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)
    this.yPos += this.speed
    ctx.closePath()
  }

  checkCollision() {
    if (
      playerX < this.xPos + this.width &&
      playerX + playerWidth > this.xPos &&
      playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
        this.collided = true  
        collisions.push(this.image.src)    
        audioWow.play()
        extraPoints = extraPoints.filter(extraPoints => extraPoints.collided === false) 
        extraPointsScoring = extraPointsScoring + 1000
        playerImg.src = '../images/player-tanya-wow.png'

        setTimeout(()=>{
            playerImg.src = '../images/player-tanya.png'
            }, 1000)
    }
  }
}

//Extra points - wine
class ExtraPoints2 extends ExtraPoints {
  constructor(xPos, yPos, width, height, speed, image=extraPoints2Img) {
      super(xPos, yPos, width, height, speed)
      this.image = image
  }

  draw() {
    ctx.beginPath()
    ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height)
    this.yPos += this.speed
    ctx.closePath()
  }

  checkCollision() {
    if (
      playerX < this.xPos + this.width &&
      playerX + playerWidth > this.xPos &&
      playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
        this.collided = true    
        collisions.push(this.image.src)  
        audioWow.play()
        extraPoints2 = extraPoints2.filter(extraPoints => extraPoints.collided === false) 
        extraPointsScoring = extraPointsScoring + 250
        playerImg.src = '../images/player-tanya-wow.png'

        setTimeout(()=>{
            playerImg.src = '../images/player-tanya.png'
            }, 1000)
    }
  }
}


//ANIMATION
const animate = () => {
  //draw player, background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(gameBackground, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight)
    

    //player controls
        
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


    // draw obstacles and objects
    attackers.forEach(attacker => {
      attacker.draw()
      attacker.checkCollision()
    })
  
    attackers = attackers.filter(attackers => attackers.xPos > 0)
    
    attackers2.forEach(attacker => {
      attacker.draw()
      attacker.checkCollision()
    })
  
    attackers2 = attackers2.filter(attackers => attackers.xPos > 0)
    
    attackers3.forEach(attacker => {
      attacker.draw()
      attacker.checkCollision()
    })
  
    attackers3 = attackers3.filter(attackers => attackers.xPos > 0) 

    lifelines.forEach(lifeline => {
      lifeline.draw()
      lifeline.checkCollision()
    })
    
    lifelines = lifelines.filter(lifelines => lifelines.yPos < canvas.height)
    
    extraPoints.forEach(extraPoint => {
      extraPoint.draw()
      extraPoint.checkCollision()
    })
    
    extraPoints = extraPoints.filter(extraPoints => extraPoints.yPos < canvas.height)
    
    extraPoints2.forEach(extraPoint => {
      extraPoint.draw()
      extraPoint.checkCollision()
    })
    
    extraPoints2 = extraPoints2.filter(extraPoints => extraPoints.yPos < canvas.height)
    
    console.log(animateId)

//ATTACKERS timings

    if (animateId > 0 && animateId < 2000) {
      
      if (animateId % 500 === 0) {
        attackers2.push(new Attackers2(canvas.width, canvas.height * Math.random(), 50, 50, 1))
      }

      if (animateId % 200 === 0) {
        attackers3.push(new Attackers3(canvas.width, canvas.height * Math.random(), 50, 50, 1))
      }
    }

    if (animateId > 499 && animateId < 2000) {
      
      if (animateId % 500 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 50, 50, 1))
      }
    }
    
    if (animateId > 2000 && animateId < 4000) {

      if (animateId % 150 === 0) {
        attackers2.push(new Attackers2(canvas.width, canvas.height * Math.random(), 50, 50, 2))
      }

      if (animateId % 300 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 50, 50, 2))
      }

      if (animateId % 300 === 0) {
        attackers3.push(new Attackers3(canvas.width, canvas.height * Math.random(), 50, 50, 2))
      }
    }

    if (animateId > 4000 && animateId < 6000) {
      if (animateId % 100 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 50, 50, 3))
      }

      if (animateId % 300 === 0) {
        attackers2.push(new Attackers2(canvas.width, canvas.height * Math.random(), 50, 50, 3))
      }
    }

    if (animateId > 6000 && animateId < 50000) {

        if (animateId % 150 === 0) {
          attackers2.push(new Attackers2(canvas.width, canvas.height * Math.random(), 50, 50, 5))
        }
        if (animateId % 300 === 0) {
          attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 50, 50, 5))
        }   
        if (animateId % 700 === 0) {
          attackers3.push(new Attackers3(canvas.width, canvas.height * Math.random(), 50, 50, 8))
        }   
        if (animateId % 1000 === 0) {
          attackers3.push(new Attackers3(canvas.width, canvas.height * Math.random(), 50, 50, 12))
        }      
    }
    
//LIFELINES timings

if (animateId === 1000 || animateId % 2000 === 0) {
    lifelines.push(new Lifelines(canvas.width * Math.random(), 0, 30, 50, 8))
}


//EXTRA POINTS timings

if (animateId === 500 || animateId % 1000 === 0) {
  extraPoints.push(new ExtraPoints(canvas.width * Math.random(), 0, 50, 50, 4))
}

if (animateId === 20 || animateId % 500 === 0) {
  extraPoints2.push(new ExtraPoints2(canvas.width * Math.random(), 0, 50, 50, 4))
}


  //score bar
  document.querySelector('#score').innerText = scoring
  document.querySelector('#lives').innerText = livesLeft
  document.querySelector('#extraPoints').innerText = extraPointsScoring
  scoring = parseInt(animateId * 0.1)

    
//game over
if (gameOver === true) {
    if(isSpoilerVersion === true){
      audioCrying.play()
    }
    document.querySelector('#collisions').innerHTML = collisions.reduce((acc, image) => {acc + "<img src='"+ image + "'>"},"")
    console.log(collisions)
    saveScore()
    showHighScores()
    cancelAnimationFrame(animateId)
    game.style.display ="none"
    gameOverScreen.style.display ="block"
    document.querySelector('#final-score').innerText = (scoring + extraPointsScoring).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  } else {
    animateId = requestAnimationFrame(animate)
  }

  
}

 //Save score

 const saveScore =()=>{
  nameForCurrentGame = document.forms["nameForHighestScore"]["name"].value
  document.querySelector('#nameForHighestScore').innerText = document.forms["nameForHighestScore"]["name"].value

  const maxHighScores = 5
  const highScores = JSON.parse(window.localStorage.getItem('highScores')) || []

const mostRecentScore = {
  name: nameForCurrentGame,
  score: scoring + extraPointsScoring
}

highScores.push(mostRecentScore)
highScores.sort((a, b)=>b.score - a.score)
highScores.splice(maxHighScores)

window.localStorage.setItem('highScores', JSON.stringify(highScores))

}

 //Show high scores

 const showHighScores =()=>{
  const highScoresList = document.querySelector('#high-score-list')
  const highScores = JSON.parse(window.localStorage.getItem('highScores')) || []

  document.querySelector('#high-score-list').innerHTML = 
  (highScores.map(score =>{
    return `<li class="high-score">${score.name}: ${score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>`

  }).join(""))
}
 

//Start game
const startGame = () => {
    
    /* let skipIntervalId =  */setTimeout(()=>{
    gameIntro.style.display = "none"  
    game.style.display = "block" 
    gameOverScreen.style.display = "none"
    if(isSpoilerVersion === true){
      audioIntro.play();
    }
    }, firstAttempt? 3000 : 0)
    animate()
}

//ON LOAD

window.addEventListener('load', () => {
  
  //EVENT LISTENERS
//Start button

    btnStart.onclick = () => {
        if(document.forms["nameForHighestScore"]["name"].value !== ""){
          gameSplash.style.display = "none"
          gameIntro.style.display = "block"
          startGame()
        }
    }


    
    //skip intro button
    btnSkip.addEventListener('click', () => {
      gameIntro.style.display = "none"
      game.style.display = "block"
        })
    
      

    //Restart button
    btnRestart.onclick = () => {
      firstAttempt = false
      animateId = 0
      gameOver = false

      livesLeft = 3
      scoring = 0
      extraPointsScoring = 0

      isMovingLeft = false
      isMovingRight = false
      isMovingUp = false
      isMovingDown = false

      playerX = canvas.width / 2 - playerWidth
      playerY = 400

      attackers = []
      attackers2 = []
      attackers3 = []
      lifelines = []
      extraPoints = []
      extraPoints2 = []
      collisions = []
      //window.location.reload();
      startGame()
    }

        //arrow keys
        //keydown
    document.addEventListener('keydown',event => {
        if(event.key === "ArrowRight"){
          isMovingRight = true
          //document.querySelector("#keys-right").classList.add("keys-pushed")
        }
        if(event.key === "ArrowLeft"){
          isMovingLeft = true
         // document.querySelector("#keys-left").classList.add("keys-pushed")
        }
        if(event.key === "ArrowUp"){
          isMovingUp = true
         // document.querySelector("#keys-up").classList.add("keys-pushed")
        }
        if(event.key === "ArrowDown"){
          isMovingDown = true
          //document.querySelector("#keys-down").classList.add("keys-pushed")
      }
    })
    //arrow keys
    
    //keyup
    document.addEventListener('keyup',event => {
      if(event.key === "ArrowRight"){
        isMovingRight = false
        //document.querySelector("#keys-right").classList.remove("keys-pushed") 
      }

      if(event.key === "ArrowLeft"){
        isMovingLeft = false
        //document.querySelector("#keys-left").classList.remove("keys-pushed")
      }

      if(event.key === "ArrowUp"){
        isMovingUp = false
        //document.querySelector("#keys-up").classList.remove("keys-pushed")
      }

      if(event.key === "ArrowDown"){
        isMovingDown = false
        //document.querySelector("#keys-down").classList.remove("keys-pushed")
      }
    })
        
    //Spoiler variables


    //splash
    GameSplashNameOfGameSpoiler = "PLEASE, THESE GAYS, THEY'RE TRYING TO MURDER ME"
    GameSplashNameOfGameSpoilerFree = "PLEASE, THESE GUYS, THEY'RE TRYING TO ROB ME"

    GameSplashInstructionsSpoiler = "<p><b>Instructions</b></p><p>Use the arrow keys to run away from 'these gays'. They are trying to murder you!</p><p>You have 3 lives. Each time one of 'these are some high-end gays', you'll lose a life.</p><p>See how long you can last before you are murdered. The longer you last, the higher your score.</p>"

    GameSplashInstructionsSpoilerFree = "<p><b>Instructions</b></p><p>Use the arrow keys to run away from robbers trying to steal your money.</p><p>You <i>only</i> have 3 trillion dollars. Each time a robber runs into you, they'll rob you and you'll lose 1 trillion dollars.</p><p>See how long you can last before all your money runs out. The longer you last, the higher your score.</p>"

    gameTitleSpoiler = "These Gays, They're Trying to Murder Me"
    gameTitleSpoilerFree = "These Guys, They're Trying to Rob Me"

    GameSplashAttackersSpoiler = '"High-End Gays"'
    GameSplashAttackersSpoilerFree = 'Robbers'

    GameSplashAttackersWorthSpoiler = '-1 murdered life'
    GameSplashAttackersWorthSpoilerFree = '-1 trillion dollars'

    GameSplashAttacker1ImageSpoiler = './images/attacker-quentin.png'
    GameSplashAttacker1ImageSpoilerFree = './images/attacker-1.png'

    GameSplashAttacker2ImageSpoiler = './images/attacker-matteo.png'
    GameSplashAttacker2ImageSpoilerFree = './images/attacker-2.png'

    GameSplashAttacker3ImageSpoiler = './images/attacker-didier.png'
    GameSplashAttacker3ImageSpoilerFree = './images/attacker-3.png'

    GameSplashExtraLifeSpoiler = 'Yacht Ladder'
    GameSplashExtraLifeSpoilerFree = 'Money Bag'

    GameSplashExtraLifeWorthSpoiler = '+1 life (if you use it right)'
    GameSplashExtraLifeWorthSpoilerFree = '+1 trillion dollars'

    GameSplashExtraLifeImageSpoiler = './images/ladder.png'
    GameSplashExtraLifeImageSpoilerFree = './images/extralife.png'

    // intro
    GameIntroImageSpoiler = "./images/gif-gays.gif"
    GameIntroImageSpoilerFree = "./images/gif-guys.gif"

    //game

    gameBackgroundSpoiler = './images/game-background-spoiler.jpg' // credit: https://www.luxurychartergroup.com/cms/uploads/luxury-charter-yacht-invader-30.jpg
    gameBackgroundSpoilerFree = './images/game-background.jpeg' // credit: https://media.architecturaldigest.com/photos/6386579956d3de6551010f47/master/w_1600%2Cc_limit/AD090119_GARCIA_03.jpg

/*     playerImgSpoiler ='./images/player-tanya.png'
    playerImgSpoilerFree = './images/player-tanya.png' */

    attacker1ImgSpoiler =GameSplashAttacker1ImageSpoiler
    attacker1ImgSpoilerFree =GameSplashAttacker1ImageSpoilerFree

    attacker2ImgSpoiler =GameSplashAttacker2ImageSpoiler
    attacker2ImgSpoilerFree =GameSplashAttacker2ImageSpoilerFree

    
    attacker3ImgSpoiler =GameSplashAttacker3ImageSpoiler
    attacker3ImgSpoilerFree =GameSplashAttacker3ImageSpoilerFree

  
    lifelineImgSpoiler =GameSplashExtraLifeImageSpoiler
    lifelineImgSpoilerFree =GameSplashExtraLifeImageSpoilerFree

    
  /*   extraPoints1ImgSpoiler ='./images/spaghetti.png'
    extraPoints1ImgSpoilerFree ='./images/spaghetti.png'

    extraPoints2ImgSpoiler = './images/wine.png'
    extraPoints2ImgSpoilerFree ='./images/wine.png' */

    

    const SpoilerVersion = () =>{
      console.log("SPOILER VERSION")
      document.querySelector('title').innerText = gameTitleSpoiler
      //splash
      document.querySelector('#name-of-game h1').innerText = GameSplashNameOfGameSpoiler
      btnToggleSpoilerVersion.classList.toggle("toggle")
      document.querySelector('#instructionsText').innerHTML = GameSplashInstructionsSpoiler
      document.querySelector('.pointsObjects#attackers span').innerText = GameSplashAttackersSpoiler
      document.querySelector('.pointsObjects#attackers span:nth-of-type(2)').innerText = GameSplashAttackersWorthSpoiler
      document.querySelector('#attacker1Img').src = GameSplashAttacker1ImageSpoiler
      document.querySelector('#attacker2Img').src = GameSplashAttacker2ImageSpoiler
      document.querySelector('#attacker3Img').src = GameSplashAttacker3ImageSpoiler

      document.querySelector('.pointsObjects#extraLife span').innerText = GameSplashExtraLifeSpoiler
      document.querySelector('.pointsObjects#extraLife span:nth-of-type(2)').innerText = GameSplashExtraLifeWorthSpoiler
      document.querySelector('#extraLifeImg').src = GameSplashExtraLifeImageSpoiler
       //intro
       document.querySelector('#intro-image-ctn img').src = GameIntroImageSpoiler
       //game
       gameBackground.src = gameBackgroundSpoiler
      /*  playerImg.src = playerImgSpoiler */
      attacker1Img.src = attacker1ImgSpoiler
      attacker2Img.src = attacker2ImgSpoiler
      attacker3Img.src = attacker3ImgSpoiler

      lifeline1Img.src = lifelineImgSpoiler
/*       extraPoints1Img.src = 
      extraPoints2Img.src =  */

    }

    const SpoilerFreeVersion = () =>{
      console.log("SPOILER FREE VERSION")
      document.querySelector('title').innerText = gameTitleSpoilerFree
      //splash
      document.querySelector('#name-of-game h1').innerText = GameSplashNameOfGameSpoilerFree
      btnToggleSpoilerVersion.classList.toggle("toggle")
      document.querySelector('#instructionsText').innerHTML = GameSplashInstructionsSpoilerFree
      document.querySelector('.pointsObjects#attackers span').innerText = GameSplashAttackersSpoilerFree
      document.querySelector('.pointsObjects#attackers span:nth-of-type(2)').innerText = GameSplashAttackersWorthSpoilerFree
      document.querySelector('#attacker1Img').src = GameSplashAttacker1ImageSpoilerFree
      document.querySelector('#attacker2Img').src = GameSplashAttacker2ImageSpoilerFree
      document.querySelector('#attacker3Img').src = GameSplashAttacker3ImageSpoilerFree
      document.querySelector('.pointsObjects#extraLife span').innerText = GameSplashExtraLifeSpoilerFree
      document.querySelector('.pointsObjects#extraLife span:nth-of-type(2)').innerText = GameSplashExtraLifeWorthSpoilerFree
      document.querySelector('#extraLifeImg').src = GameSplashExtraLifeImageSpoilerFree
        //intro
        document.querySelector('#intro-image-ctn img').src = GameIntroImageSpoilerFree
        //game
       gameBackground.src = gameBackgroundSpoilerFree
       /* playerImg.src = playerImgSpoilerFree */
      attacker1Img.src = attacker1ImgSpoilerFree
      attacker2Img.src = attacker2ImgSpoilerFree
      attacker3Img.src = attacker3ImgSpoilerFree
      lifeline1Img.src = lifelineImgSpoilerFree
      /*       extraPoints1Img.src = 
      extraPoints2Img.src =  */
    }
      //key p - secret button - peppapig
        
      document.addEventListener('keydown',event => {
        if((event.code == "KeyP" || event.key=="p") && game.style.display === "block" ){
          console.log("P", event)

          if(isPeppaPigVersion == false){
            playerImg.src = './images/peppapig.png'

          } else {
            playerImg.src = './images/player-tanya.png'
          }
        }
      })

      
 
    //TOGGLE BUTTON - SPOILER VERSION
    btnToggleSpoilerVersion.addEventListener('click', () => {
        if(isSpoilerVersion === false){
            isSpoilerVersion = true
            SpoilerVersion()
    //TOGGLE BUTTON - SPOILER-FREE VERSION
  } else{
            isSpoilerVersion = false
             SpoilerFreeVersion()
          }

    })

})
