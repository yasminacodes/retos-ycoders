class Base {
    constructor(width, height, x, y, spritex, spritey, parent) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.spritex = spritex;
        this.spritey = spritey;
        this.tile = 16;
        this.element = null
        this.parent = parent
    }

    create() {
        const widthFactor = this.width / this.tile
        const heightFactor = this.height / this.tile

        this.element = document.createElement("div")
        this.element.className = "yc-base"
        this.element.style.width = this.width + "px"
        this.element.style.height = this.height + "px"
        this.element.style.backgroundSize = `${112 * widthFactor}px ${80 * heightFactor}px`
        this.element.style.backgroundPosition = `-${this.spritex * this.tile * widthFactor}px -${this.spritey * this.tile * heightFactor}px`
        this.element.style.left = (this.x - this.width) + "px"
        this.element.style.top = (this.y - this.height) + "px"
    }

    restart() {
        this.element.style.left = (this.x - this.width) + "px"
        this.element.style.top = (this.y - this.height) + "px"
    }

    moveX(x) {
        this.element.style.left = x + "px"
    }

    moveY(y) {
        this.element.style.top = y + "px"
    }

    getElement() {
        return this.element
    }
    
    collides(obj) {
        const elBox = this.element.getBoundingClientRect()
        const objBox = obj.getElement().getBoundingClientRect()

        return (
            elBox.left < objBox.right &&
            elBox.right > objBox.left &&
            elBox.top < objBox.bottom &&
            elBox.bottom > objBox.top
        )
    }

    removeElement() {
        const widthFactor = this.width / this.tile
        const heightFactor = this.height / this.tile
        this.element.style.backgroundPosition = `-${2 * this.tile * widthFactor}px -${3 * this.tile * heightFactor}px`

        const removeTimeout = setTimeout(()=>{
            this.element.remove()
        },100)
    }
}