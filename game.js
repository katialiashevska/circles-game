class Game {
    constructor() {
        this.gamePage = document.getElementById("game-page")
        this.gameContainer = document.getElementById("game-container")
        this.level = document.getElementById("level")
        this.progressBar = document.getElementById("progress-bar-fill")
        this.winPage = document.querySelector(".end-page.win")
        this.losePage = document.querySelector(".end-page.lose")
        this.popSound = document.getElementById("pop-sound")
        this.winSound = document.getElementById("win-sound")
        this.loseSound = document.getElementById("lose-sound")
        this.scoreWin = document.querySelector(".score.win")
        this.scoreLose = document.querySelector(".score.lose")

        this.currentLevel = 1
        this.levelsTotal = 30
        this.baseCircle = null
        this.oddCircle = null
        this.circleSize = 0
        this.gameIsOver = false
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
            this.loseGame()
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

    loseGame() {
        this.baseCircle.addEventListener("click", () => {
            this.popSound.play()
            setTimeout(() => {
                this.loseSound.play()
              }, 500)
            this.gameIsOver = true
            this.gamePage.classList.replace("active", "inactive")
            this.losePage.classList.replace("inactive", "active")
            this.scoreLose.textContent = `${this.currentLevel - 1}/${this.levelsTotal}`
            this.level.textContent = "Level 1"
            this.currentLevel = 1
        })
    }

    winGame() {
        if (this.currentLevel === 31) {
            setTimeout(() => {
                this.winSound.play()
              }, 500)
            this.gamePage.classList.replace("active", "inactive")
            this.winPage.classList.replace("inactive", "active")
            this.scoreWin.textContent = `${this.levelsTotal}/${this.levelsTotal}`
            this.level.textContent = "Level 1"
            this.currentLevel = 1
        }
    }

    updateProgressBar() {
        const progress = ((this.currentLevel - 1) / this.levelsTotal) * 100
        this.progressBar.style.width = progress + "%"
    }
}
