const playButton = document.getElementById("play-button")
const startPage = document.getElementById("start-page")
const gamePage = document.getElementById("game-page")
let game

playButton.addEventListener("click", () => {
    startPage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    startGame()
})

const startGame = () => {
    console.log("start game")
    game = new Game()
    game.newLevel()
}
