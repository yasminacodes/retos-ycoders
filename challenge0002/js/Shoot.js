class Shoot extends Base {
    init() {
        this.create()
        this.parent.appendChild(this.element)

        this.movementInterval = setInterval(()=>{
            const originalPos = this.element.offsetTop
            const nextPos = originalPos - 25
            if(nextPos < 0) {
                this.element.remove()
                clearInterval(this.movementInterval)
            } else {
                this.moveY(nextPos)
            }
        }, 300)
    }

    stop() {
        clearInterval(this.movementInterval)
    }
}