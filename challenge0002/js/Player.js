class Player extends Base {
    control(evt) {
        if(evt.keyCode === 39) {
            this.move(this.width)
        } else if(evt.keyCode === 37) {
            this.move(-this.width)
        } else if(evt.keyCode === 32) {
            this.shoot()
        }
    }

    move(dx) {
        if(this.element.offsetLeft + dx > this.parent.clientWidth - this.width) {
            this.element.style.left = (this.parent.clientWidth - this.width) + "px"
        } else if(this.element.offsetLeft + dx < 0) {
            this.element.style.left = 0 + "px"
        } else {
            this.element.style.left = (this.element.offsetLeft + dx) + "px"
        }
    }

    shoot() {
        const shoot = new Shoot(50, 50, this.element.offsetLeft + this.width, this.y - this.height/2, 2, 0, this.parent)
        shoot.init()
        this.shootsArray.push(shoot)
    }

    getShoots() {
        const removeFromArray = []
        for(let i = 0; i < this.shootsArray.length; i++) {
            if(this.shootsArray[i].getElement() === undefined) {
                removeFromArray.push(i)
            }
        }

        for(let i = 0; i < removeFromArray.length; i++) {
            this.shootsArray.slice(this.removeFromArray[i])
        }

        return this.shootsArray
    }

    init() {
        this.stopped = false
        this.create()
        this.parent.appendChild(this.element)

        this.shootsArray = []

        this.boundControl = this.control.bind(this)
        document.addEventListener('keydown', this.boundControl)
    }

    stop() {
        document.removeEventListener('keydown', this.boundControl)
        this.stopped = true
    }

    resume() {
        if(this.stopped === true) {
            document.addEventListener('keydown', this.boundControl)
        }
    }
}