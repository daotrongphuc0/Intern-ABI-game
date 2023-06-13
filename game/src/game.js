import { Application, Assets, Ticker, Container } from "pixi.js";
import { LoadGame } from "./gameload/loadgame";
import data from "../assets/jsondata/dataLv1.json"
import dataGame from "../assets/jsondata/dataGame.json";
import { GameRun } from "./Scene/gamerun";
import { GameOver } from "./Scene/gameOver";
import { GameMenu } from "./Scene/gameMenu";
//import { Platform } from "./platform";


export class Game {
    static init() {
        this.app = new Application({
            width: dataGame.game.width,
            height: dataGame.game.height,
            backgroundColor: dataGame.game.backgroundColor,
        });


        document.body.appendChild(this.app.view);

        this.gameRun = 1

        this.current_scene = null

        this.mainContainer = new Container()
        this.mainContainer.x = 0
        this.mainContainer.y = 0

        this.loadGame = new LoadGame()

    }

    static chanceScene(scene) {
        if (this.current_scene) {
            this.current_scene.destroy_this();
            this.mainContainer.removeChild(this.current_scene);
        }

        // let tmp = this.current_scene
        // this.mainContainer.removeChild(tmp)
        // tmp.destroy_this()
        this.mainContainer.addChild(scene);
        this.current_scene = scene;
    }

    static finishLoad() {
        this.current_scene = new GameMenu()
        this.mainContainer.addChild(this.current_scene)
        this.app.stage.addChild(this.mainContainer)
    }

}

window.onload = function () {
    Game.init();
}
