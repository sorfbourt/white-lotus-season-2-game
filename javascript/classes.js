//Attackers - horizontal - remove life
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
      if(this.image === attacker1Img){
        audioOuttaHere.play()
      }
      if(this.image === attacker2Img){
        audioOMG.play()
      }
      if(this.image === attacker3Img){
        audioOMG2.play()
      }
      attackers = attackers.filter(attackers => attackers.collided === false) 
      livesLeft = livesLeft - 1
      playerImg.src = './images/player-tanya-omg.png'
      setTimeout(()=>{
          playerImg.src = './images/player-tanya.png'
          }, 1000)
        
      if(livesLeft === 0){
        gameOver = true
      }
    }
  }
}


//Lifelines - ladders/money - vertical - add life
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
          playerImg.src = './images/player-tanya-wow.png'
          setTimeout(()=>{
              playerImg.src = './images/player-tanya.png'
              }, 1000)
      }
    }
  }

//Extra points - spaghetti/wine - vertical - add points
class ExtraPoints extends Lifelines {
  constructor(xPos, yPos, width, height, speed, image=extraPoints1Img, points) {
      super(xPos, yPos, width, height, speed)
      this.image = image
      this.points = points
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
        extraPointsScoring = extraPointsScoring + this.points
        playerImg.src = './images/player-tanya-wow.png'

        setTimeout(()=>{
            playerImg.src = './images/player-tanya.png'
            }, 1000)
    }
  }
}
