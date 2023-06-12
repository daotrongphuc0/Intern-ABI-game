import { Container, Texture, Sprite } from "pixi.js";
import { manifest } from "../gameload/assets";
import dataGame from "../../assets/jsondata/dataGame.json"


export class Bg extends Container {

    constructor(x = 0, y = 0) {
        super()
        this.x = x
        this.y = y
        const bgBundle = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture = Texture.from(bgBundle.assets['bgGame']);
        this.sprite = new Sprite(texture)
        this.sprite.height = dataGame.game.height - y
        this.sprite.width = dataGame.game.width - x
        this.sprite.x = 0
        this.sprite.y = 0
        this.addChild(this.sprite)
    }

}