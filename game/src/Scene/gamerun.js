import { Container, Ticker, Graphics, Text, TextStyle } from "pixi.js";
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
        this.score = 0
        this.score_increase = data.game_bg.score_increase
        this.time = 0
        this.width = dataGame.game.width
        this.height = dataGame.game.height

        this.quantity_fish = data.game_bg.limit_small_fish
        console.log('game run')
        console.log(this.getBounds())

        this.bg = new Bg(0, 50)
        this.addChild(this.bg);

        this.fish = new Fish(data.mainFish.x, data.mainFish.y, data.game_bg.x_bg, data.game_bg.y_bg,
            data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
        this.addChild(this.fish)

        this.listSmallFish = []
        for (var i = 0; i < this.quantity_fish; i++) {
            var tmp = new SmallFish(data.smallFish[i].x, data.smallFish[i].y, data.game_bg.x_bg, data.game_bg.y_bg,
                data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
            this.listSmallFish.push(tmp)
            this.addChild(tmp)
        }

        this.listBigFish = []
        for (var i = 0; i < data.bigFish.length; i++) {
            var tmp = new BigFish(data.bigFish[i].x, data.bigFish[i].y, data.game_bg.x_bg, data.game_bg.y_bg,
                data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
            this.listBigFish.push(tmp)
            this.addChild(tmp)
        }



        this.header = new Container()
        this.header.x = 0
        this.header.y = 0

        this.score_bg = new Graphics()
        this.score_bg.beginFill('0xFFFFFF')
        this.score_bg.drawRect(0, 0, data.game_bg.width, 50)
        this.score_bg.endFill()
        this.header.addChild(this.score_bg)

        const style = new TextStyle({
            fontFamily: "Comic Sans MS",
            fontSize: 42,
            fontVariant: "small-caps",
            fontWeight: 500
        });
        this.text_score_name = new Text('score:', style);
        this.header.addChild(this.text_score_name)

        this.text_score = new Text(this.score + '/100', style);
        this.text_score.anchor.set(1, 0)
        this.text_score.x = 275
        this.header.addChild(this.text_score)

        this.text_time_name = new Text('Time:', style);
        this.text_time_name.x = 900
        this.header.addChild(this.text_time_name)



        this.text_time = new Text('00:00', style);
        this.text_time.x = 1020
        this.header.addChild(this.text_time)

        this.addChild(this.header)



        Ticker.shared.add(this.update, this)

    }

    update(deltaTime) {
        for (var i = 0; i < this.listSmallFish.length; i++) {
            if (this.listSmallFish[i].isActive) {
                this.listSmallFish[i].checkLocation(this.fish)

                if (this.checkCollision(this.fish.container, this.listSmallFish[i].container)) {
                    var tmp = this.listSmallFish[i]
                    this.listSmallFish[i].isActive = false
                    this.listSmallFish.splice(i, 1)
                    this.removeChild(tmp)


                    console.log("destroy fish")
                    this.score += this.score_increase
                    this.text_score.text = this.score + '/100'
                    tmp.destroy_this()
                }

            }
        }

        for (var i = 0; i < this.listBigFish.length; i++) {
            //if (this.listBigFish[i].isActive) {
            this.listBigFish[i].checkLocation(this.fish)
            if (this.checkCollision(this.fish.container, this.listBigFish[i].container)) {
                Game.chanceScene(new GameOver());
                // this.listBigFish[i].isActive = false
                // this.listBigFish = []
                // this.destroy_this()

            }
            // }

        }

        this.time += Ticker.shared.deltaMS
        this.update_time()

    }

    update_time() {
        // Lấy giá trị phút và giây
        let minutes = Math.floor(this.time / 60000);
        let seconds = Math.floor((this.time % 60000) / 1000);

        // Định dạng lại giá trị phút và giây thành hai chữ số
        let formattedMinutes = ("0" + minutes).slice(-2);
        let formattedSeconds = ("0" + seconds).slice(-2);

        // Tạo đối tượng Text với giá trị đã định dạng
        this.text_time.text = formattedMinutes + ':' + formattedSeconds
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

    add_small_fish() {
        if (this.quantity_fish >= data.smallFish.length) return
        var number = Math.floor(Math.random() * 4)
        var tmp = new SmallFish(data.smallFish[this.quantity_fish].x, data.smallFish[this.quantity_fish].y, data.game_bg.x_bg,
            data.game_bg.y_bg, data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
        switch (number) {
            case 0:
                tmp.x = - tmp.width
                break
            case 1:
                tmp.x = - tmp.width
                break
            case 2:
                tmp.x = - tmp.width
                break
            case 3:
                tmp.x = - tmp.width
                break
        }

        this.quantity_fish += 1

    }

    destroy_this() {
        // Xóa các đối tượng con
        this.removeChild(this.bg);
        this.removeChild(this.fish);
        this.fish.destroy_this()
        this.listSmallFish.forEach((fish) => {
            this.removeChild(fish);
            fish.destroy_this()
        });
        this.listBigFish.forEach((fish) => {
            this.removeChild(fish);
            fish.destroy_this()
        });

        // Xóa các đối tượng con khỏi mảng
        this.listSmallFish = [];
        this.listBigFish = [];

        // Xóa các đối tượng con khỏi header
        this.header.removeChild(this.score_bg);
        this.header.removeChild(this.text_score_name);
        this.header.removeChild(this.text_score);
        this.header.removeChild(this.text_time_name);
        this.header.removeChild(this.text_time);
        this.score_bg.destroy()
        this.text_score_name.destroy()
        this.text_score.destroy()
        this.text_time_name.destroy()
        this.text_time.destroy

        // Xóa header
        this.removeChild(this.header);
        this.header.destroy()

        // Ngừng cập nhật
        Ticker.shared.remove(this.update, this);

        // Xóa chính class GameRun
        this.destroy();
    }

}