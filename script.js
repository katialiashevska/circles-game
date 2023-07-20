const startPage = document.getElementById("start-page")
const gamePage = document.getElementById("game-page")
const playButton = document.querySelector(".play-button")
const playAgainButton = document.querySelector(".play-again")
const tryAgainButton = document.querySelector(".try-again")
const clickSound = document.getElementById("click-sound")

let game

playButton.addEventListener("click", () => {
    clickSound.play()
    startPage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

playAgainButton.addEventListener("click", () => {
    clickSound.play()
    game.winPage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

tryAgainButton.addEventListener("click", () => {
    clickSound.play()
    game.losePage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

const startGame = () => {
    game = new Game()
    game.currentLevel = 1
    game.newLevel()
    game.loseGame()
    game.winGame()
}

// I implemented an extra feature of custom cursor but after testing I wasn't sure about it anymore
// I felt like it had some weird behaviours in my game and slowed things down a bit
// So i decided to comment it out for now and maybe come back to it later
// The feature is fully functional though!

// const cursor = document.getElementById("cursor")
// const positionElement = (e) => {
//   const mouseY = e.clientY
//   const mouseX = e.clientX
//   cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
// }
// window.addEventListener("mousemove", positionElement)
