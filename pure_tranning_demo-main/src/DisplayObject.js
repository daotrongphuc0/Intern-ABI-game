import { Application, Container, Sprite, Point, Graphics, TextStyle, Texture, DisplayObject } from "pixi.js";
import { Scene } from "./ticker";
import TWEEN from '@tweenjs/tween.js';

export class Dp extends Container {
    constructor() {
        super()
        this.conty = new Container();
        this.conty.x = 200;
        this.conty.y = 0;
        this.addChild(this.conty);

        this.clampy = Sprite.from("../assets/images/clampy.png");
        this.clampy.x = 100;
        this.clampy.y = 100;
        this.conty.addChild(this.clampy);

        this.bigConty = new Container();
        this.bigConty.scale.set(2); // You can use set and only one value to set x and y
        this.bigConty.position.x = 100;
        this.bigConty.y = 200; // this is a shortcut for .position.y and it also exists one for .position.x
        this.addChild(this.bigConty);

        this.littleConty = new Container();
        // position has a copy setter. It won't use your reference but copy the values from it!
        this.littleConty.position = new Point(300, 200);
        this.bigConty.addChild(this.littleConty);

        this.graphy = new Graphics();

        // we give instructions in order. begin fill, line style, draw circle, end filling
        this.graphy.beginFill(0xFF00FF);
        this.graphy.lineStyle(10, 0x00FF00);
        this.graphy.drawCircle(0, 0, 25); // See how I set the drawing at 0,0? NOT AT 100, 100!
        this.graphy.endFill();

        // Here we set it at 100,100
        this.graphy.x = 100;
        this.graphy.y = 100;
        this.addChild(this.graphy); //I can add it before setting position, nothing bad will happen.

    }

}