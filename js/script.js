const startPage = document.getElementById("start-page")
const gamePage = document.getElementById("game-page")
const playButton = document.querySelector(".play-button")
const playAgainButton = document.querySelector(".play-again")
const tryAgainButton = document.querySelector(".try-again")
const clickSound = document.getElementById("click-sound")
const soundButton = document.getElementById("sound-button")

// Variable to store the game instance
let game

const startGame = () => {
    game = new Game()
    game.currentLevel = 1
    game.newLevel()
    game.loseGame()
    game.winGame()
}

// One function to handle several button click events in a more concise way
const handleButtonClick = (hidePage, showPage) => {
    clickSound.play()
    hidePage.classList.replace("active", "inactive")
    showPage.classList.replace("inactive", "active")
    startGame()
}

playButton.addEventListener("click", () =>
    handleButtonClick(startPage, gamePage)
)

playAgainButton.addEventListener("click", () =>
    handleButtonClick(game.winPage, gamePage)
)

tryAgainButton.addEventListener("click", () =>
    handleButtonClick(game.losePage, gamePage)
)

// Function to mute each separate sound element in the game
const muteMe = (sound) => {
    if (!sound.muted) {
        sound.muted = true
        sound.pause()
        soundButton.textContent = "🔊"
    } else {
        sound.muted = false
        soundButton.textContent = "🔇"
    }
}

// Function to mute all audio elements on the page
const mutePage = () => {
    document.querySelectorAll("audio").forEach((sound) => muteMe(sound))
}

soundButton.addEventListener("click", () => {
    mutePage()
    clickSound.play()
})

// I implemented an extra feature of custom cursor, but after testing I wasn't sure about it anymore
// I felt like it had some weird behaviours in the game and slowed things down a bit
// So I decided to comment it out for now and maybe come back to it later
// The feature is fully functional though!
//
// const cursor = document.getElementById("cursor")
// const positionElement = (e) => {
//   const mouseY = e.clientY
//   const mouseX = e.clientX
//   cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
// }
// window.addEventListener("mousemove", positionElement)
