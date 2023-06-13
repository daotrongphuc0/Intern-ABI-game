import { Container, Sprite, Texture, Ticker, Graphics } from "pixi.js";
import { manifest } from "../gameload/assets";
import dataGame from "../../assets/jsondata/dataGame.json"

export class SmallFish extends Container {
    constructor(x, y, x_bg, y_bg, bg_width, bg_height) {
        super();
        this.isActive = true
        this.x = x
        this.y = y
        this.x_bg = x_bg
        this.y_bg = y_bg
        this.bg_width = bg_width
        this.bg_height = bg_height

        this.speed = 1

        this.timeLoop = 3000
        this.dangerous = 0
        this.time_dangerous = 0

        const smallFishBundle = manifest.bundles.find(bundle => bundle.name === 'smallFish'); // Tìm bundle 'bigFish'
        const texture = Texture.from(smallFishBundle.assets['smallFish01']); // Lấy đường dẫn của texture 'bigFish01' từ assets
        this.fish = new Sprite(texture)
        this.fish.anchor.set(0.5)
        this.fish.x = this.fish.width / 2
        this.fish.y = this.fish.height / 2
        this.addChild(this.fish)


        this.container = new Graphics()
        this.container.x = 0
        this.container.y = 0
        this.container.beginFill('0xFFFFFF')
        this.container.drawRect(-this.fish.width / 2 * 0.6, -this.fish.height / 2 * 0.65, this.fish.width * 0.6, this.fish.height * 0.5)
        this.container.endFill()
        this.container.alpha = 0.5
        this.fish.addChild(this.container)

        this.goLeft = false;
        this.goRight = false;
        this.goDown = false;
        this.goUp = true;
        this.currentTime = 0;

        this.randomDirection()

        this.fish.scale.set(0.8)


        Ticker.shared.add(this.update, this);


    }

    update(deltaTime) {

        if (this.goLeft) {
            this.fish.scale.x = 0.8
            this.x = this.x - (this.speed * deltaTime);
            if (this.x + this.fish.width < 0) this.x = this.bg_width
        }

        if (this.goRight) {
            this.fish.scale.x = -0.8
            this.x = this.x + (this.speed * deltaTime);
            if (this.x > this.bg_width) this.x = - this.fish.width
        }

        if (this.goUp) {
            this.y = this.y - (this.speed * deltaTime);
            if (this.y < this.y_bg - this.fish.height) this.y = this.bg_height
        }

        if (this.goDown) {
            this.y = this.y + (this.speed * deltaTime);
            if (this.y > this.bg_height) this.y = 0 - this.fish.height + this.y_bg
        }

        if (this.dangerous) {
            if (this.time_dangerous < 4000) {
                this.speed = 1
                if (this.time_dangerous < 0) {
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

        this.time_dangerous -= Ticker.shared.deltaMS


        //console.log(1000 / Ticker.shared.deltaMS);
    }

    randomDirection() {
        var randomNumberX = Math.floor(Math.random() * 3)
        var randomNumberY = Math.floor(Math.random() * 3)
        if (randomNumberY === 0 && randomNumberX == 0) randomNumberX = 1
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
        var kc = Math.sqrt(Math.pow(obj.x - this.x, 2)
            + Math.pow(obj.y - this.y, 2))
        //console.log(kc)
        if (kc < 200 && this.time_dangerous < 0) {
            this.dangerous = true
            this.time_dangerous = 5000
            this.speed = 3
            if (obj.x > this.x) {
                this.goLeft = true
                this.goRight = false
            } else {
                this.goLeft = false
                this.goRight = true
            }

            if (obj.y > this.y) {
                this.goUp = true
                this.goDown = false
            } else {
                this.goUp = false
                this.goDown = true
            }

        }
    }

    destroy_this() {
        // Hủy đăng ký cập nhật
        Ticker.shared.remove(this.update, this);

        // Xóa đối tượng con
        this.removeChild(this.fish);
        this.fish.removeChild(this.container);

        this.container.destroy()
        this.fish.destroy()

        // Xóa chính class SmallFish khỏi đối tượng cha
        this.destroy();
    }

}
