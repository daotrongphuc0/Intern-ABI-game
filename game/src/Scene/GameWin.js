import { Container, Sprite, BlurFilter, Rectangle, Graphics, Texture } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { Bg } from "../model/bg"
import { GameRun } from "./gamerun";
import { manifest } from "../gameload/assets";
import { Game } from "../game";
import { GameMenu } from "./gameMenu";
import confetti from "canvas-confetti";




export class GameWin extends Container {
    constructor(name_img = 'bgGame') {
        super()

        this.x = 0
        this.y = 0

        this.bg = new Bg(0, 0, name_img)
        this.addChild(this.bg);

        this.duration = 15 * 1000;
        this.animationEnd = Date.now() + this.duration;
        this.defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };



        this.interval = setInterval(function () {
            var timeLeft = this.animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / this.duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, this.defaults, { particleCount, origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, this.defaults, { particleCount, origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);


    }

    randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }



}