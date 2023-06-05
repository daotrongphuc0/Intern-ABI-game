import { AnimatedSprite, Container, Texture } from "pixi.js";

export class Scene extends Container {
    constructor() {
        super();

        // This is an array of strings, we need an array of Texture
        var clampyFrames = [
            "../assets/images/cat.png",
            "../assets/images/mouse.png",
        ];

        // `array.map()` creates an array from another array by doing something to each element.
        // `(stringy) => Texture.from(stringy)` means
        // "A function that takes a string and returns a Texture.from(that String)"
        var animatedClampy = new AnimatedSprite(clampyFrames.map((stringy) => Texture.from(stringy)));
        // (if this javascript is too much, you can do a simple for loop and create a new array with Texture.from())
        this.addChild(animatedClampy); // we just add it to the scene
        animatedClampy.play();
        animatedClampy.animationSpeed = 0.2
        // Now... what did we learn about assigning functions...
        animatedClampy.onFrameChange = this.onClampyFrameChange.bind(this);
    }

    onClampyFrameChange(currentFrame) {
        console.log("Clampy's current frame is", currentFrame);
    }
}