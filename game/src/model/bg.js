import { Container, Texture, Sprite } from "pixi.js";
import { manifest } from "../gameload/assets";
import dataGame from "../../assets/jsondata/dataGame.json"


export class Bg extends Container {
    constructor() {
        super()
        this.x = 0
        this.y = 0
        const bgBundle = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture = Texture.from(bgBundle.assets['bgGame']);
        this.sprite = new Sprite(texture)
        this.sprite.height = dataGame.game.height
        this.sprite.width = dataGame.game.width
        this.sprite.x = 0
        this.sprite.y = 0
        this.addChild(this.sprite)
    }

}