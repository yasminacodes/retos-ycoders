document.addEventListener("DOMContentLoaded", ()=>{
    const gameWindow = document.getElementById("game-window")
    const gameWindowWidth = 450
    const gameWindowHeight = 600

    let level = 0
    let numEnemies = 10
    let enemyTime = 2000

    const player = new Player(50, 50, gameWindowWidth/2 + 50, gameWindowHeight - 20, 4, 0, gameWindow)

    const objectArray = {
        "player": [player],
        "enemies": [],
        "shoots": []
    }

    function createEnemies() {
        console.log("enemy")
        const enemyOptions = [5, 1]
        const x = Math.floor(Math.random() * (gameWindowWidth - 50 + 1))
        const spritey = Math.floor(Math.random() * (enemyOptions[0] + 1))
        const spritex = Math.floor(Math.random() * (enemyOptions[1] + 1))
        const enemy = new Enemy(50, 50, x + 50, 50, spritex, spritey, gameWindow)
        enemy.init()
        objectArray.enemies.push(enemy)
    }

    let currentEnemies = 0
    const enemyInterval = setInterval(()=>{
        createEnemies()
        currentEnemies += 1
        if(currentEnemies >= numEnemies) {
            level += 1
            document.getElementById('user-level').innerText = level
            currentEnemies = 0
            numEnemies *= 2
            enemyTime *= 1/4
        }
    }, enemyTime)

    const gameLoop = setInterval(()=>{
        objectArray.shoots = player.getShoots()

        const removeFromArray = []
        for(let i = 0; i < objectArray.enemies.length; i++) {
            if(objectArray.enemies[i].getElement() === undefined) {
                removeFromArray.push(i)
            }
        }
        
        for(let i = 0; i < removeFromArray.length; i++) {
            objectArray.enemies.slice(this.removeFromArray[i])
        }

        for(let i = 0; i < objectArray.enemies.length; i++) {
            for(let j = 0; j < objectArray.shoots.length; j++) {
                if(objectArray.shoots[j].collides(objectArray.enemies[i]) === true) {
                    objectArray.shoots[j].removeElement()
                    objectArray.enemies[i].removeElement()
                    const score = document.getElementById("user-score")
                    score.innerText = parseInt(score.innerText) + 10
                }
            }

            if(objectArray.enemies[i].collides(objectArray.player[0]) === true) {
                document.getElementById("game-over").classList.remove("yc-body__game-over--hidden")
                objectArray.player[0].stop()
                for(let i = 0; i < objectArray.enemies.length; i++) {
                    objectArray.enemies[i].stop()
                }
                for(let i = 0; i < objectArray.shoots.length; i++) {
                    objectArray.shoots[i].stop()
                }
                clearInterval(enemyInterval)
            }
        }
    }, 300)

    player.init()

    function restartGame() {
        const score = document.getElementById("user-score")
        score.innerText = 0
        for(let i = 0; i < objectArray.enemies.length; i++) {
            objectArray.enemies[i].removeElement()
        }
        for(let i = 0; i < objectArray.shoots.length; i++) {
            objectArray.shoots[i].removeElement()
        }
        objectArray.player[0].restart()
        objectArray.player[0].resume()

        clearInterval(enemyInterval)
        enemyInterval = setInterval(()=>{
            createEnemies()
        }, enemyTime)

        document.getElementById("game-over").classList.add("yc-body__game-over--hidden")

        level = 0
        numEnemies = 10
        enemyTime = 2000
        document.getElementById('user-level').innerText = level
    }

    document.getElementById("play-again").addEventListener("click", restartGame)
})