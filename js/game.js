class Game {
    constructor() {
        this.gamePage = document.getElementById("game-page")
        this.gameContainer = document.getElementById("game-container")
        this.level = document.getElementById("level")
        this.progressBar = document.getElementById("progress-bar-fill")
        this.winPage = document.querySelector(".end-page.win")
        this.losePage = document.querySelector(".end-page.lose")
        this.scoreWin = document.querySelector(".score.win")
        this.scoreLose = document.querySelector(".score.lose")
        this.popSound = document.getElementById("pop-sound")
        this.winSound = document.getElementById("win-sound")
        this.loseSound = document.getElementById("lose-sound")

        this.currentLevel = 1
        this.levelsTotal = 30
        this.circleSize = 0
        this.baseCircle = null
        this.oddCircle = null
    }

    amountOfCircles() {
        if (this.currentLevel <= 5) {
            this.circleSize = 14
            return 4
        } else if (this.currentLevel <= 10) {
            this.circleSize = 9
            return 9
        } else if (this.currentLevel <= 20) {
            this.circleSize = 7
            return 16
        } else {
            this.circleSize = 5.8
            return 25
        }
    }

    generateRandomBaseColor() {
        let hue = Math.floor(Math.random() * 360)
        let saturation = 50
        let lightness = 50
        let randomBaseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        return randomBaseColor
    }

    generateOddColor(color) {
        let oddColor
        let baseColorSliced = color.slice(0, color.length - 4)
        if (this.currentLevel <= 5) {
            oddColor = baseColorSliced + "70%)"
        } else if (this.currentLevel <= 10) {
            oddColor = baseColorSliced + "65%)"
        } else if (this.currentLevel <= 15) {
            oddColor = baseColorSliced + "60%)"
        } else if (this.currentLevel <= 25) {
            oddColor = baseColorSliced + "58%)"
        } else {
            oddColor = baseColorSliced + "55%)"
        }
        return oddColor
    }

    // Function to create and style each new circle to be added to the game container
    eachCircleProcedure(isOdd, color) {
        let circle = document.createElement("div")
        circle.classList.add("game-circle")
        circle.style.backgroundColor = color
        circle.style.width = this.circleSize + "rem"
        circle.style.height = this.circleSize + "rem"
        this.gameContainer.appendChild(circle)

        if (isOdd) {
            this.oddCircle = circle
        } else {
            this.baseCircle = circle
            this.loseGame()
        }
    }

    // Function to add circles to the game container
    addCircles(amount) {
        let baseColor = this.generateRandomBaseColor()
        let oddColor = this.generateOddColor(baseColor)
        let randomIndex = Math.floor(Math.random() * amount)

        for (let i = 0; i < amount; i++) {
            if (i === randomIndex) {
                this.eachCircleProcedure(true, oddColor)
            } else {
                this.eachCircleProcedure(false, baseColor)
            }
        }
    }

    newLevel() {
        this.gameContainer.innerHTML = ""
        this.updateProgressBar()
        this.addCircles(this.amountOfCircles())
        this.winLevel()
    }

    winLevel() {
        this.oddCircle.addEventListener("click", () => {
            this.popSound.play()
            this.currentLevel++
            this.level.textContent = "Level " + this.currentLevel
            this.gameContainer.innerHTML = ""
            this.updateProgressBar()
            this.newLevel()
            this.winGame()
        })
    }

    // Function to handle winning or losing the game that takes the sound to play 
    // as a parameter to avoid code repetition
    endGame(isWin, sound) {
        this.popSound.play()
        setTimeout(() => {
            sound.play()
        }, 500)
        this.gamePage.classList.replace("active", "inactive")
        this.currentLevel = 1
        this.level.textContent = "Level 1"

        if (isWin) {
            this.winPage.classList.replace("inactive", "active")
            this.scoreWin.textContent = `${this.levelsTotal}/${this.levelsTotal}`
        } else {
            this.losePage.classList.replace("inactive", "active")
            this.scoreLose.textContent = `${this.currentLevel - 1}/${this.levelsTotal}`
        }
    }

    loseGame() {
        this.baseCircle.addEventListener("click", () => {
            this.endGame(false, this.loseSound)
        })
    }

    winGame() {
        if (this.currentLevel === 31) {
            this.endGame(true, this.winSound)
        }
    }

    updateProgressBar() {
        const progress = ((this.currentLevel - 1) / this.levelsTotal) * 100
        this.progressBar.style.width = progress + "%"
    }
}
