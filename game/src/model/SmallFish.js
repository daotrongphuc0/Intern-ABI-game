import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { manifest } from "../gameload/assets";
import dataGame from "../../assets/jsondata/dataGame.json"

export class SmallFish extends Container {
    constructor(x, y, width, height, gameWidth, gameHeight, smallFish) {
        super();

        this.height = height
        this.width = width
        this.gameWidth = dataGame.game.width
        this.gameHeight = dataGame.game.height

        this.speed = 1

        this.timeLoop = 3000
        this.dangerous = 0
        this.timedan = 0

        const smallFishBundle = manifest.bundles.find(bundle => bundle.name === 'smallFish'); // Tìm bundle 'bigFish'
        const texture = Texture.from(smallFishBundle.assets['smallFish01']); // Lấy đường dẫn của texture 'bigFish01' từ assets
        this.fish = new Sprite(texture)
        this.fish.scale.x = -1
        this.fish.height = 80;
        this.fish.width = 80;
        this.fish.x = x
        this.fish.y = y
        this.fish.anchor.set(0.5)

        this.goLeft = true;
        this.goRight = false;
        this.goDown = false;
        this.goUp = false;
        this.currentTime = 0;

        this.randomDirection()

        this.addChild(this.fish)
        Ticker.shared.add(this.update, this);


    }

    update(deltaTime) {

        if (this.goLeft) {
            this.fish.scale.x = 1
            this.fish.height = 80;
            this.fish.width = 80;
            this.fish.x = this.fish.x - (this.speed * deltaTime);
            if (this.fish.x + this.width / 2 < 0) this.fish.x = this.gameWidth + this.width / 2
        }

        if (this.goRight) {
            this.fish.scale.x = -1
            this.fish.height = 80;
            this.fish.width = 80;
            this.fish.x = this.fish.x + (this.speed * deltaTime);
            if (this.fish.x - this.width / 2 > this.gameWidth) this.fish.x = 0 - this.width / 2
        }

        if (this.goUp) {
            this.fish.y = this.fish.y - (this.speed * deltaTime);
            if (this.fish.y - this.height / 2 < 0 - this.height / 2) this.fish.y = this.gameWidth
        }

        if (this.goDown) {
            this.fish.y = this.fish.y + (this.speed * deltaTime);
            if (this.fish.y - this.height / 2 > this.gameHeight) this.fish.y = 0
        }

        if (this.dangerous) {
            if (this.timedan < 4000) {
                this.speed = 1
                if (this.timedan < 0) {
                    this.dangerous = false
                }
            }

        } else {
            if (this.timeLoop <= 0) {
                this.randomDirection()
                this.timeLoop = 3000;
            } else {
                this.timeLoop -= Ticker.shared.deltaMS
            }
        }

        this.timedan -= Ticker.shared.deltaMS


        //console.log(1000 / Ticker.shared.deltaMS);
    }

    randomDirection() {
        var randomNumberX = Math.floor(Math.random() * 3)
        switch (randomNumberX) {
            case 0:
                this.goRight = false
                this.goLeft = false
                break
            case 1:
                this.goRight = true
                this.goLeft = false
                break
            case 2:
                this.goRight = false
                this.goLeft = true
                break
        }
        var randomNumberY = Math.floor(Math.random() * 3)
        if (randomNumberY === 0 && randomNumberX == 0) randomNumberY = 1

        switch (randomNumberY) {
            case 0:
                this.goDown = false
                this.goUp = false
                break
            case 1:
                this.goDown = true
                this.goUp = false
                break
            case 2:
                this.goDown = false
                this.goUp = true
                break
        }

    }

    checkLocation(obj) {
        var kc = Math.sqrt(Math.pow(obj.animated.x - this.fish.x, 2) + Math.pow(obj.animated.y - this.fish.y, 2))
        //console.log(kc)
        if (kc < 300 && this.timedan < 0) {
            this.dangerous = true
            this.timedan = 5000
            this.speed = 3
            if (obj.animated.x > this.fish.x) {
                this.goLeft = true
                this.goRight = false
            } else {
                this.goLeft = false
                this.goRight = true
            }

            if (obj.animated.y > this.fish.y) {
                this.goUp = true
                this.goDown = false
            } else {
                this.goUp = false
                this.goDown = true
            }

        }
    }

}
