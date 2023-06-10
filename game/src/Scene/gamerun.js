import { Container, Ticker } from "pixi.js";
import { Fish } from "../model/mainFish";
import { SmallFish } from "../model/SmallFish";
import { BigFish } from "../model/BigFish"
import data from "../../assets/jsondata/dataLv1.json"
import { Bg } from "../model/bg";
import { Game } from "../game";
import dataGame from "../../assets/jsondata/dataGame.json"
import { GameOver } from "./gameOver";


export class GameRun extends Container {
    constructor() {
        super()


        this.x = 0
        this.y = 0
        this.width = dataGame.game.width
        this.height = dataGame.game.height
        console.log('game run')
        console.log(this.getBounds())

        this.leverGameOver = false

        this.bg = new Bg()
        this.addChild(this.bg);

        this.fish = new Fish(200, 200, 100, 100)
        this.addChild(this.fish)

        this.listSmallFish = []
        for (var i = 0; i < data.smallFish.length; i++) {
            var tmp = new SmallFish(data.smallFish[i].x, data.smallFish[i].y, data.smallFish[i].width, data.smallFish[i].height)
            this.listSmallFish.push(tmp)
            this.addChild(tmp)
        }

        this.listBigFish = []
        for (var i = 0; i < data.bigFish.length; i++) {
            var tmp = new BigFish(data.bigFish[i].x, data.bigFish[i].y, data.bigFish[i].width, data.bigFish[i].height)
            this.listBigFish.push(tmp)
            this.addChild(tmp)
        }

        Ticker.shared.add(this.update, this)

    }

    update(deltaTime) {
        for (var i = 0; i < this.listSmallFish.length; i++) {

            this.listSmallFish[i].checkLocation(this.fish)

            if (this.checkCollision(this.fish, this.listSmallFish[i])) {
                var tmp = this.listSmallFish[i]
                this.listSmallFish.splice(i, 1)
                this.removeChild(tmp)
                console.log("destroy fish")
                //tmp.destroy()
            }

        }

        for (var i = 0; i < this.listBigFish.length; i++) {
            this.listBigFish[i].checkLocation(this.fish)
            if (this.checkCollision(this.fish, this.listBigFish[i])) {
                // this.app.app.stage.mainContainer.addChild(new GameOver(this.app))
                // this.app.app.stage.mainContainer.removeChild(this)
                Game.chanceScene(new GameOver())
                this.destroy()
            }

        }


    }

    checkCollision(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();

        var rightmostLeft = a.left < b.left ? b.left : a.left;
        var leftmostRight = a.right > b.right ? b.right : a.right;

        if (leftmostRight <= rightmostLeft) {
            return false;
        }

        var bottommostTop = a.top < b.top ? b.top : a.top;
        var topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

        return topmostBottom > bottommostTop;
    }



}