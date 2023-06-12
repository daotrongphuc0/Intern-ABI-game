import { Application, Assets, Ticker, Container } from "pixi.js";
import { LoadGame } from "./gameload/loadgame";
import data from "../assets/jsondata/dataLv1.json"
import dataGame from "../assets/jsondata/dataGame.json";
import { GameRun } from "./Scene/gamerun";
import { GameOver } from "./Scene/gameOver";
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



        this.mainContainer = new Container()
        this.mainContainer.x = 0
        this.mainContainer.y = 0

        this.loadGame = new LoadGame()

    }

    static chanceScene(scene) {
        try {
            this.mainContainer.children[0].destroy()
            //this.mainContainer.removeChild(this.mainContainer.children[0])
        }
        catch (e) { }
        this.mainContainer.addChild(scene)
    }

    static finishLoad() {
        this.mainContainer.addChild(new GameRun())
        this.app.stage.addChild(this.mainContainer)
    }

}

window.onload = function () {
    Game.init();
}
