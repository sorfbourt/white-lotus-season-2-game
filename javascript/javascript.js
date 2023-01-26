const gameSplash = document.querySelector('#game-splash')
const gameIntro = document.querySelector('#game-intro')
const game = document.querySelector('#game')
const gameOverScreen = document.querySelector('#game-over')


game.style.display ="none"
gameIntro.style.display ="none"
gameOverScreen.style.display ="none"

let firstAttempt = true
let animateId
let gameId = 0



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
const audioPeppaPig = new Audio('./audio/peppapig.mp3')
audioPeppaPig.preload
const audioHighEndGays = new Audio('./audio/jennifer-coolidge-high-end-gays.mp3')
audioHighEndGays.preload


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
let canvasBorder = 1

const playerWidth = 80
const playerHeight = 90

let playerX = canvas.width / 2 - playerWidth
let playerY = 400

let attackers = []
let lifelines = []
let extraPoints = []
let collisions = []



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
    
    //console.log("animateId: ", animateId, "gameId: ", gameId)

//ATTACKERS timings

    if (gameId > 0 && gameId < 2000) {
      
      if (gameId % 500 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 1, attacker1Img))
      }

      if (gameId % 200 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 1, attacker2Img))
      }
    }

    if (gameId > 499 && gameId < 2000) {
      
      if (gameId % 500 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 2, attacker3Img))
      }
    }

    if(isSpoilerVersion === true && gameId === 700){
      audioHighEndGays.play()

    }



    if (gameId > 2000 && gameId < 5000) {
      
      if (gameId % 500 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 3, attacker1Img))
      }

      if (gameId % 200 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 3, attacker2Img))
      }

      if (gameId % 100 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 5, attacker3Img))
      }
    }

    if (gameId > 5000) {
      
      if (gameId % 250 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 8, attacker1Img))
      }

      if (gameId % 150 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 5, attacker2Img))
      }

      if (gameId % 100 === 0) {
        attackers.push(new Attackers(canvas.width, canvas.height * Math.random(), 60, 60, 7, attacker3Img))
      }
    }


    
//LIFELINES timings

if (gameId === 1250 || gameId % 2200 === 0) {
    lifelines.push(new Lifelines(canvas.width * Math.random(), 0, 30, 50, 8))
}


//EXTRA POINTS timings

//spaghetti
if (gameId === 500 || gameId % 1200 === 0) {
  extraPoints.push(new ExtraPoints(canvas.width * Math.random(), 0, 50, 50, 5, extraPoints1Img, 1000))
}

//wine
if (gameId === 20 || gameId % 750 === 0) {
  extraPoints.push(new ExtraPoints(canvas.width * Math.random(), 0, 50, 70, 4, extraPoints2Img, 250))
}


  //score bar
  document.querySelector('#score').innerText = scoring.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  document.querySelector('#lives').innerText = livesLeft
  document.querySelector('#extraPoints').innerText = extraPointsScoring.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  scoring = parseInt(gameId * 0.1)

    
//game over
if (gameOver === true) {
    if(isSpoilerVersion === true){
      audioCrying.play()
    }
    document.querySelector('#collisions').innerHTML = collisions.reduce((acc, image) => {return acc + "<img src='"+ image + "'>"},"")
    saveScore()
    showHighScores()
    //animateId = 0
    gameId = 0
    cancelAnimationFrame(animateId)
    game.style.display ="none"
    gameOverScreen.style.display ="block"
    document.querySelector('#time-score').innerText = (scoring).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    document.querySelector('#extra-score').innerText = (extraPointsScoring).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    document.querySelector('#final-score').innerText = (scoring + extraPointsScoring).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  } else {
    animateId = requestAnimationFrame(animate)
  }

  
}


 //Save score

 const saveScore =()=>{
  nameForCurrentGame = document.forms["nameForHighestScore"]["name"].value
  document.querySelector('#nameForHighestScore').innerText = document.forms["nameForHighestScore"]["name"].value

  const maxHighScores = 10
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
    return `<li class="high-score"><b>${score.name}: </b>${score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>`

  }).join(""))
}
 

//could not make animateId = 0 on restart so created this as a workaround but seems each time restart it gets harder the first restart and then obstacles don't come at all. - if i want to revert, game gameId to animateID in the obstacle creation
function addSeconds(){
  gameId = gameId + 1
}


//Start game
const startGame = () => {
  setInterval(addSeconds, 16)

  gameId = 0
    audioThemeSong.play()
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
/*       firstAttempt = false
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
      lifelines = []
      extraPoints = []
      collisions = []
      startGame() */
      window.location.reload();
    }

        //arrow keys
        //keydown
    document.addEventListener('keydown',event => {
        if(event.key === "ArrowRight"){
          isMovingRight = true
        }
        if(event.key === "ArrowLeft"){
          isMovingLeft = true
        }
        if(event.key === "ArrowUp"){
          isMovingUp = true
        }
        if(event.key === "ArrowDown"){
          isMovingDown = true
      }
    })
    //arrow keys
    
    //keyup
    document.addEventListener('keyup',event => {
      if(event.key === "ArrowRight"){
        isMovingRight = false
      }

      if(event.key === "ArrowLeft"){
        isMovingLeft = false
      }

      if(event.key === "ArrowUp"){
        isMovingUp = false
      }

      if(event.key === "ArrowDown"){
        isMovingDown = false
      }
    })
        
    //Spoiler variables


    //splash
    GameSplashNameOfGameSpoiler = "PLEASE, THESE GAYS, THEY'RE TRYING TO MURDER ME"
    GameSplashNameOfGameSpoilerFree = "PLEASE, THESE GUYS, THEY'RE TRYING TO ROB ME"

    GameSplashInstructionsSpoiler = "<p><b>How to play</b></p><p>Use the arrow keys to run away from 'these gays'. They are trying to murder you!</p><p>You have 3 lives. Each time one of these 'high-end gays' run into you, you'll lose a life.</p><p>See how long you can last before you are murdered. The longer you last, the higher your score.</p>"

    GameSplashInstructionsSpoilerFree = "<p><b>How to play</b></p><p>Use the arrow keys to run away from robbers trying to steal your money.</p><p>You <i>only</i> have 3 trillion dollars. Each time a robber runs into you, they'll rob you and you'll lose 1 trillion dollars.</p><p>See how long you can last before all your money runs out. The longer you last, the higher your score.</p>"

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

    GameLivesLeftSpoiler = "<b>Lives Left: </b>"
    GameLivesLeftSpoilerFree = "<b>Triillion $ Left: </b>"
    

    const SpoilerVersion = () =>{
      audioIntro.play();
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
       document.querySelector('#livesleft').innerHTML = GameLivesLeftSpoiler
      attacker1Img.src = attacker1ImgSpoiler
      attacker2Img.src = attacker2ImgSpoiler
      attacker3Img.src = attacker3ImgSpoiler

      lifeline1Img.src = lifelineImgSpoiler
/*       extraPoints1Img.src = 
      extraPoints2Img.src =  */

    }

    const SpoilerFreeVersion = () =>{
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
       document.querySelector('#livesleft').innerHTML = GameLivesLeftSpoilerFree
       /* playerImg.src = playerImgSpoilerFree */
      attacker1Img.src = attacker1ImgSpoilerFree
      attacker2Img.src = attacker2ImgSpoilerFree
      attacker3Img.src = attacker3ImgSpoilerFree
      lifeline1Img.src = lifelineImgSpoilerFree
      /*       extraPoints1Img.src = 
      extraPoints2Img.src =  */
    }
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
      //key p - secret button - peppapig
        
      document.addEventListener('keydown',event => {
        if((event.code == "KeyP" || event.key=="p") && game.style.display === "block" ){

          if(isPeppaPigVersion == false){
            audioPeppaPig.play()
            playerImg.src = './images/peppapig.png'

          } else {
            playerImg.src = './images/player-tanya.png'
          }
        }
      })
 

      
 

})
