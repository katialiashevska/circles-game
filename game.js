class Game {
    constructor() {
        this.gameContainer = document.getElementById("game-container")
        this.level = document.getElementById("level")
        this.winPage = document.querySelector(".end-page.win")
        this.losePage = document.querySelector(".end-page.lose")
        this.currentLevel = 1
        this.levelsTotal = 30
        this.baseCircle = null
        this.oddCircle = null
        this.circleSize = 0
        this.gameIsOver = false
    }

    amountOfCircles() {
        if (this.currentLevel <= 5) {
            this.circleSize = 16
            return 4
        } else if (this.currentLevel <= 10) {
            this.circleSize = 11
            return 9
        } else if (this.currentLevel <= 20) {
            this.circleSize = 7.5
            return 16
        } else {
            this.circleSize = 6
            return 25
        }
    }

    generateRandomColor() {
        let randomColor
        let hue = Math.floor(Math.random() * 360)
        let saturation = 50
        let lightness = 50
        randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        return randomColor
    }

    generateOddColor(color) {
        let oddColor
        if (this.currentLevel <= 5) {
            oddColor = color.slice(0, color.length - 4) + "70%)"
        } else if (this.currentLevel <= 10) {
            oddColor = color.slice(0, color.length - 4) + "65%)"
        } else if (this.currentLevel <= 15) {
            oddColor = color.slice(0, color.length - 4) + "60%)"
        } else if (this.currentLevel <= 25) {
            oddColor = color.slice(0, color.length - 4) + "58%)"
        } else {
            oddColor = color.slice(0, color.length - 4) + "55%)"
        }
        return oddColor
    }

    addCircles(amount) {
        let baseColor = this.generateRandomColor()
        let oddColor = this.generateOddColor(baseColor)
        let randomIndex = Math.floor(Math.random() * amount)
        const baseProcedure = () => {
            this.baseCircle = document.createElement("div")
            this.baseCircle.classList.add("game-circle")
            this.baseCircle.style.backgroundColor = baseColor
            this.baseCircle.style.width = this.circleSize + "rem"
            this.baseCircle.style.height = this.circleSize + "rem"
            this.gameContainer.appendChild(this.baseCircle)
            this.loseLevel()
        }
        const oddProcedure = () => {
            this.oddCircle = document.createElement("div")
            this.oddCircle.classList.add("game-circle")
            this.oddCircle.style.backgroundColor = oddColor
            this.oddCircle.style.width = this.circleSize + "rem"
            this.oddCircle.style.height = this.circleSize + "rem"
            this.gameContainer.appendChild(this.oddCircle)
        }
        for (let i = 0; i < amount; i++) {
            if (i === randomIndex) {
                oddProcedure()
            } else {
                baseProcedure()
            }
        }
    }

    newLevel() {
        this.addCircles(this.amountOfCircles())
        this.winLevel()
    }

    winLevel() {
        this.oddCircle.addEventListener("click", () => {
            this.currentLevel++
            this.level.textContent = "Level " + this.currentLevel
            this.gameContainer.innerHTML = ""
            this.newLevel()
            this.winGame()
        })
    }

    loseLevel() {
        this.baseCircle.addEventListener("click", () => {
            this.gameIsOver = true
            // this.losePage.classList.replace("inactive", "active")
            alert("You lost!")
        })
    }

    winGame() {
        if (this.currentLevel === 31) {
            // this.winPage.classList.replace("inactive", "active")
            alert("You won!")
        }
    }
}
