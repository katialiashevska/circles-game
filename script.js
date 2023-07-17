const playButton = document.getElementById("play-button")
const startPage = document.getElementById("start-page")
const gamePage = document.getElementById("game-page")
const gameContainer = document.getElementById("game-container")

playButton.addEventListener("click", () => {
    startPage.classList.replace("active", "inactive")
    gamePage.classList.replace("inactive", "active")
    addCircles(4)
})

const generateRandomColor = () => {
    let randomColor
    let hue = Math.floor(Math.random() * 360)
    let saturation = 50
    let lightness = 50
    randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    return randomColor
}

const generateOddColor = (color) => {
    let oddColor = color.slice(0, color.length - 4) + "70%)"
    return oddColor
}

const addCircles = (amount) => {
    let baseColor = generateRandomColor()
    let oddColor = generateOddColor(baseColor)
    for (let i = 0; i < amount - 1; i++) {
        let baseCircle = document.createElement("div")
        baseCircle.classList.add("game-circle")
        baseCircle.style.backgroundColor = baseColor
        gameContainer.appendChild(baseCircle)
    }
    let oddCircle = document.createElement("div")
    oddCircle.classList.add("game-circle")
    oddCircle.style.backgroundColor = oddColor
    gameContainer.appendChild(oddCircle)
}
