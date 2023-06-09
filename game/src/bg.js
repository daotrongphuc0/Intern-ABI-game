import { Container, Texture, Sprite } from "pixi.js";

export class Bg extends Container {
    constructor(width, height, bg) {
        super()
        this.x = 0
        this.y = 0
        //this.texture = Texture.from(link)
        this.sprite = new Sprite(bg)
        this.sprite.height = height
        this.sprite.width = width
        this.sprite.x = 0
        this.sprite.y = 0
        this.addChild(this.sprite)
    }

}