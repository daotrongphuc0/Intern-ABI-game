import { Application, Assets, Ticker, Container } from "pixi.js";
import { Fish } from "./animation";
import { SmallFish } from "./SmallFish";
import data from "../assets/jsondata/dataLv1.json"
import { Bg } from "./bg";
import { GameRun } from "./gamerun";
import { GameOver } from "./gameOver";
//import { Platform } from "./platform";


export class Game {
    static async init() {
        this.app = new Application({
            width: 1280,
            height: 720,
            backgroundColor: data.game.backgroundColor,
        });


        document.body.appendChild(this.app.view);

        this.gameRun = 1

        const bg = await Assets.load('../assets/images/bg.png');
        const fish = await Assets.load('../assets/images/fish.png');
        const eat = await Assets.load('../assets/images/eat.png');
        const smallFish = await Assets.load('../assets/images/ca.png');
        const bigFish = await Assets.load('../assets/images/Shark.png');
        const gameOver = await Assets.load('../assets/images/gameOver.png');
        this.dataGame = []
        this.dataGame.push(bg)
        this.dataGame.push(fish)
        this.dataGame.push(eat)
        this.dataGame.push(smallFish)
        this.dataGame.push(bigFish)
        this.dataGame.push(gameOver)
        this.mainContainer = new GameRun(1280, 720, this.dataGame, this)
        this.app.stage.addChild(this.mainContainer)
        // this.app.stage.addChild(new GameOver(this))
        // this.app.stage.removeChild(this)

    }

    static gameOver(
        thi
    )

}

window.onload = function () {
    Game.init();
}
