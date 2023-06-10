import { Container, Graphics, Assets } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { manifest } from "./assets";
import { Game } from "../game"

export class LoadGame extends Container {
    constructor() {
        super()

        this.background = new Graphics()
        this.background.beginFill('0xFFFFFF')
        this.background.x = 0
        this.background.y = 0
        this.background.drawRect(0, 0, dataGame.game.width, dataGame.game.height)
        this.background.endFill()
        this.addChild(this.background)
        this.init().then(() => {
            Game.finishLoad()
            this.destroy()
        })

    }
    async init() {
        await Assets.init({ manifest: manifest })

        const bundleIds = manifest.bundles.map(bundle => bundle.name);

        await Assets.loadBundle(bundleIds);
        console.log('load xong')
    }
}