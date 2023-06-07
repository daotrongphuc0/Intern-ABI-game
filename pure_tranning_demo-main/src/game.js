import { Application, Container, Sprite, Point, Graphics, TextStyle, Texture } from "pixi.js";
import { Scene } from "./bitmaptext";


export class Game {
    static init() {
        this.app = new Application({
            resolution: 1,
            width: 720,
            height: 1280,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);

        // let sceneAnimation = new Scene(this.app.screen.width, this.app.screen.height);
        // this.app.stage.addChild(sceneAnimation);

        let sceneAnimation = new Scene();
        this.app.stage.addChild(sceneAnimation);

    }

}

window.onload = function () {
    Game.init();
}
