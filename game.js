class Game {
    constructor() {
        this.gameContainer = document.getElementById("game-container")
        this.level = document.getElementById("level")
        this.currentLevel = 1
        this.levelsTotal = 20
        this.gameIsOver = false
        this.oddCircle = null
        this.circleSize = 0

    }

    amountOfCircles() {
        if (this.currentLevel <= 5) {
            this.circleSize = 16
            return 4
        } else if (this.currentLevel <= 10) {
            this.circleSize = 11
            return 9
        } else {
            this.circleSize = 7.5
            return 16
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
        } else {
            oddColor = color.slice(0, color.length - 4) + "58%)"   
        }
        return oddColor
    }

    addCircles(amount) {
        let baseColor = this.generateRandomColor()
        let oddColor = this.generateOddColor(baseColor)
        let randomIndex = Math.floor(Math.random() * amount)
        const baseProcedure = () => {
            let baseCircle = document.createElement("div")
            baseCircle.classList.add("game-circle")
            baseCircle.style.backgroundColor = baseColor
            baseCircle.style.width = this.circleSize + "rem"
            baseCircle.style.height = this.circleSize + "rem"
            this.gameContainer.appendChild(baseCircle)
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
        })
    }
}
