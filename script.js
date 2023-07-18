const startPage = document.getElementById("start-page")
const gamePage = document.getElementById("game-page")
const playButton = document.querySelector(".play-button")
const playAgainButton = document.querySelector(".play-again")
const tryAgainButton = document.querySelector(".try-again")
let game

playButton.addEventListener("click", () => {
    startPage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

playAgainButton.addEventListener("click", () => {
    game.winPage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

tryAgainButton.addEventListener("click", () => {
    game.losePage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

const startGame = () => {
    game = new Game()
    game.currentLevel = 1
    game.newLevel()
    game.loseLevel()
    game.winGame()
}
