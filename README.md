# "Please, These Gays, They're Trying To Murder Me"
![image](https://user-images.githubusercontent.com/120404332/213864371-a10e3a21-74e0-4091-b50f-73dc657e5af9.png)

[Click here to see deployed game](https://sorfbourt.github.io/white-lotus-season-2-game/)


## Description
"Please, These Gays, They're Trying To Murder Me" is a HTML/CSS/Javascript game, based on the quote Jennifer Coolidge's character in White Lotus Season 2. 

>"These Gays, They’re Trying To Murder Me" is a phrase said by Tanya in the finale of the 2022 HBO show The White Lotus. The phrase has become a sarcastic expression and image macro used by fans and the LGBTQ+ community on Twitter. ([Know Your Meme - These Gays, They’re Trying To Murder Me](https://knowyourmeme.com/memes/these-gays-theyre-trying-to-murder-me)[^1])

In the game, the player (Tanya Mcquoid) controlled by keyboard arrows has to move horizontally and vertically to avoid the ["high-end gays"](https://www.tiktok.com/@gr1ndr/video/7173059119690124550?lang=en). Tanya starts with 3 chances but she can gain lives and extra points by collecting certain objects. The game ends when Tanya has lost all her chances. After that, a score is calculated based on the objects collected and the amount of time the game lasted.


## MVP
_MVP definition here, list of minimum features_
### Player functionality and collisions
- Player moves in all directions
- Player must avoid at least 2 different classes of collisions
- If hit 3 times, you lose 
### Player functionality
- As time goes on, gets faster
### Score calculation
- After game ends, score is based on duration of game
### Spoiler / Spoiler-free version
- Toggle to change to spoiler-free version ("These Guys, They're Trying To Rob Me") (Same game that can be changed anytime during the game)


## Backlog
_List of features you might implement after the MVP_
### Collecting extra points and lives
- Player can prolong the game and get more points if collecting certain objects
- Scorebar reflects the addition above
- Lives left shown visually in score panel
### Local storage
- Player must input name on splash page
- High scores are shown on game over page
### Extra design
- Player animated as walks
- Keyboard on splash page changes colour based key presses
### Easter eggs
- Press Q to force end of game
- Adhoc fun ideas


## Data structure
_List of classes and methods_
- Attackers
     - draw()
     - checkCollision()
- Lifelines
     - draw()
     - checkCollision()
- ExtraPoints
     - draw()
     - checkCollision()

## States y States Transitions
_List of states (views) of your game_
- gameSplash
- gameIntro
- game
- gameOverScreen

## Task
_List of tasks in order of priority_
- Player
- Attackers
- Scoreboard
- Spoiler free version
- Lifelines
- ExtraPoints
- Local storage
- Easter eggs

## Links
- [Trello Link](https://trello.com/b/mq5yk2KP/white-lotus-season-2-game)
- [Slides Link](https://docs.google.com/presentation/d/1J5lAjnExh4wpC5CnucCLvv1B6jP6P4LnrIo8J4v4d9k/edit?usp=sharing)
- [Github repository Link](https://github.com/sorfbourt/white-lotus-season-2-game)
- [Deployment Link ](https://sorfbourt.github.io/white-lotus-season-2-game/)

## Context Links
- [IronHack Web Development Bootcamp Brief](https://docs.google.com/presentation/d/1_mVDkbM7i0YFSzImKCzcmYNInOa2v9Cj/edit#slide=id.p1)
- [YouTube Clip - "Please, these gays are trying to murder me! - Tanya The White Lotus S2 E7"](https://www.youtube.com/watch?v=Sbt-N9IOPfc)

[^1]: [Know Your Meme - These Gays, They’re Trying To Murder Me](https://knowyourmeme.com/memes/these-gays-theyre-trying-to-murder-me)
