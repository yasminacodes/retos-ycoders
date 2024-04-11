let R = 0
let G = 0
let B = 0
let score = 0

function randomColor(ctx) {
    R = Math.floor(Math.random() * 256)
    G = Math.floor(Math.random() * 256)
    B = Math.floor(Math.random() * 256)
    ctx.fillStyle = `rgb(${R}, ${G}, ${B})`
    ctx.fillRect(0, 0, 480, 480)
}

document.addEventListener("DOMContentLoaded", ()=>{
    const canvas = document.getElementById("canvas-color")
    const ctx = canvas.getContext("2d")
    randomColor(ctx)

    const form = document.getElementById("user-form")
    const red = form.querySelector('input[name="red"]')
    const green = form.querySelector('input[name="green"]')
    const blue = form.querySelector('input[name="blue"]')
    const userResult = document.getElementById("user-result")

    function reloadGame(evt=null) {
        randomColor(ctx)
        red.value = 0
        green.value = 0
        blue.value = 0
        userResult.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`
    }

    const btn = document.getElementById("reload-button")
    btn.addEventListener("click", reloadGame)

    function updateUserResult(evt) {
        userResult.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`
    }

    red.addEventListener("change", updateUserResult)
    green.addEventListener("change", updateUserResult)
    blue.addEventListener("change", updateUserResult)

    function submitUser(evt) {
        evt.preventDefault()

        const difR = Math.abs(R - red.value)
        const difG = Math.abs(G - green.value)
        const difB = Math.abs(B - blue.value)
        const mean = (difR + difG + difB) / 3
        const currentScore = (1/mean)  * 100
        const userScore = document.getElementById("user-score")
        score += currentScore
        userScore.innerText = `Puntuación: ${Math.floor(score)}`
        reloadGame()
    }
    form.addEventListener("submit", submitUser)
})