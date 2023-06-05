import { Container, Sprite, interaction } from "pixi.js";

export class Scene extends Container {
    constructor(screenWidth, screenHeight) {
        super();
        this.clampy = Sprite.from("../assets/images/clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;
        this.addChild(this.clampy);

        // Lắng nghe sự kiện keydown
        window.addEventListener("keydown", this.onKeyDown.bind(this));


    }


    onKeyDown(e) {
        console.log("Bạn đã nhấn phím:", e.key);
    }
}
