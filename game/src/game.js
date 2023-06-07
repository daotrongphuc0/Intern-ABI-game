import { Application, Sprite, Ticker } from "pixi.js";
import { Fish } from "./animation";
import { SmallFish } from "./SmallFish";
import data from "../assets/jsondata/dataLv1.json"
//import { Platform } from "./platform";


export class Game {
    static init() {
        this.app = new Application({
            width: data.game.width,
            height: data.game.height,
            backgroundColor: data.game.backgroundColor,

        });
        document.body.appendChild(this.app.view);
        this.bg = Sprite.from(data.game.backgroundImage);
        this.bg.anchor.set(0)
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.app.screen.height
        this.bg.width = this.app.screen.width
        this.app.stage.addChild(this.bg);

        this.fish = new Fish(200, 200, 100, 100, this.app.screen.width, this.app.screen.height)
        this.app.stage.addChild(this.fish)

        this.listSmallFish = []
        for (var i = 0; i < data.smallFish.length; i++) {
            var tmp = new SmallFish(data.smallFish[i].x, data.smallFish[i].y, data.smallFish[i].width, data.smallFish[i].height, this.app.screen.width, this.app.screen.height)
            this.listSmallFish.push(tmp)
            this.app.stage.addChild(tmp)
        }

        Ticker.shared.add(this.update, this)
    }

    static update() {
        for (var i = 0; i < this.listSmallFish.length; i++) {
            if (this.checkCollision(this.fish, this.listSmallFish[i])) {
                var tmp = this.listSmallFish[i]
                this.listSmallFish.splice(i, 1)
                this.app.stage.removeChild(tmp)
                //tmp.destroy()
            }
        }

        console.log("hi")
    }

    static checkCollision(objA, objB) {
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

window.onload = function () {
    Game.init();
}
