import { AnimatedSprite, Assets, Container, Graphics, Texture, Ticker } from "pixi.js";
import data from "../../assets/jsondata/dataGame.json"
import { manifest } from "../gameload/assets";
export class Fish extends Container {
    constructor(x, y, width, height) {
        super();

        this.height = height
        this.width = width
        this.gameWidth = data.game.width
        this.gameHeight = data.game.height
        this.speed = 5

        // var frames = [
        //     "../assets/images/eat.png",
        //     "../assets/images/fish.png",
        // ];
        // this.textures = []
        // for (var i = 0; i < data.animation.length; i++) {
        //     this.textures.push(Texture.from(data.animation[i]))
        // }

        const mainFishBundle = manifest.bundles.find(bundle => bundle.name === 'mainFish'); // Tìm bundle 'mainFish'
        const mainFishTextures = mainFishBundle.assets.map(asset => Texture.from(asset.srcs)); // Tạo mảng textures từ danh sách assets
        this.animated = new AnimatedSprite(mainFishTextures);

        this.animated.height = height;
        this.animated.width = width;
        this.animated.x = x
        this.animated.y = y
        this.animated.anchor.set(0.5)

        this.goLeft = false;
        this.goRight = false;
        this.goDown = false;
        this.goUp = false;

        //this.addChild(this.animated);
        this.animated.play();
        this.animated.animationSpeed = 0.1;
        this.addChild(this.animated)
        Ticker.shared.add(this.update, this);

        window.addEventListener("keydown", this.onKeyDown.bind(this))
        window.addEventListener("keyup", this.onKeyUp.bind(this))
    }

    update(deltaTime) {
        if (this.goLeft) {
            this.animated.scale.x = -1
            this.animated.height = 100;
            this.animated.width = 100;
            this.animated.x = Math.max(this.animated.x - (this.speed * deltaTime), this.width / 2);
        }

        if (this.goRight) {
            this.animated.scale.x = 1
            this.animated.height = 100;
            this.animated.width = 100;
            this.animated.x = Math.min(this.animated.x + (this.speed * deltaTime), this.gameWidth - (this.width / 2));
        }

        if (this.goUp) {
            this.animated.y = Math.max(this.animated.y - (this.speed * deltaTime), 0);
        }

        if (this.goDown) {
            this.animated.y = Math.min(this.animated.y + (this.speed * deltaTime), this.gameHeight);
        }
    }



    onKeyDown(event) {
        //console.log(this.animated.position)
        switch (event.keyCode) {
            case 37:
                this.goLeft = true
                break
            case 38:
                this.goUp = true
                break
            case 39:
                this.goRight = true
                break
            case 40:
                this.goDown = true
                break
        }
    }

    onKeyUp(event) {

        switch (event.keyCode) {
            case 37:
                this.goLeft = false
                break
            case 38:
                this.goUp = false
                break
            case 39:
                this.goRight = false
                break
            case 40:
                this.goDown = false
                break
        }
    }

}