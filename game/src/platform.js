import { Container, Sprite, Ticker, Graphics } from "pixi.js";

export class Platform extends Container {

    constructor(x, y, wigth, screenHeight) {
        super();


        this.plVelocity = 5;

        this.pl = Sprite.from("../assets/images/platform.png");
        this.pl.anchor.set(0)
        this.pl.x = x;
        this.pl.y = y;
        this.pl.height = screenHeight - y
        this.pl.width = wigth
        this.addChild(this.pl)



        // See the `, this` thingy there? That is another way of binding the context!
        Ticker.shared.add(this.update, this);

        // If you want, you can do it the bind way
        // Ticker.shared.add(this.update.bind(this));
    }

    update(deltaTime) {
        this.pl.x = this.pl.x - this.plVelocity * deltaTime;

    }
}