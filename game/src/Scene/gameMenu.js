import { Container, Sprite, TextStyle, Rectangle, Text, Texture } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { Game } from "../game";
import { GameRun } from "./gamerun";
import { GameRunLv2 } from "./gamerunlv2";

import { manifest } from "../gameload/assets";
import { GameWin } from "./GameWin";

export class GameMenu extends Container {
    constructor() {
        super()
        this.x = 0
        this.y = 0

        const bgGameMenu = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture = Texture.from(bgGameMenu.assets['bgGameMenu']);
        this.bg = new Sprite(texture)
        this.bg.x = 0
        this.bg.y = 0
        this.bg.width = dataGame.game.width
        this.bg.height = dataGame.game.height
        this.addChild(this.bg)

        const style = new TextStyle({
            fontFamily: "Arial, sans-serif",
            fontSize: 75,
            fontWeight: "bold",
            fill: ["#ffcc00", "#ff6600"], // Gradient màu từ vàng đến cam
            stroke: "#333333", // Màu viền chữ
            strokeThickness: 3, // Độ dày viền chữ
            dropShadow: true, // Hiệu ứng bóng đổ
            dropShadowColor: "#000000", // Màu bóng đổ
            dropShadowBlur: 4, // Độ mờ bóng đổ
            dropShadowAngle: Math.PI / 4, // Góc bóng đổ
            dropShadowDistance: 4, // Khoảng cách bóng đổ
        });
        this.name_game = new Text('King of the Fish', style);
        this.name_game.x = dataGame.game.width / 2 - this.name_game.width / 2
        this.name_game.y = dataGame.game.height * 0.2
        this.addChild(this.name_game)

        // cat chu start
        const bg_button_gamemenu = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture_item = Texture.from(bg_button_gamemenu.assets['item_bg_menu']);
        this.container_button = new Container()
        this.container_button.x = dataGame.game.width / 2
        this.container_button.y = dataGame.game.height / 2

        this.start_sprite = new Sprite(texture_item.clone())
        this.start_sprite.texture.frame = new Rectangle(0, 0, this.start_sprite.width, this.start_sprite.height / 3 + 45);
        this.start_sprite.scale.set(0.1)
        this.start_sprite.anchor.set(0.5)
        this.start_sprite.x = 0
        this.start_sprite.y = 0
        this.container_button.addChild(this.start_sprite)

        this.start_sprite.interactive = true;
        this.start_sprite.on('pointerover', this.onPointerOver.bind(this.start_sprite));
        this.start_sprite.on('pointerout', this.onPointerOut.bind(this.start_sprite));
        this.start_sprite.on('click', this.onClickStart.bind(this.start_sprite))


        this.option_sprite = new Sprite(texture_item.clone())
        this.option_sprite.texture.frame = new Rectangle(0, this.option_sprite.height * 2 / 3 - 45, this.option_sprite.width, this.option_sprite.height / 3 + 45);
        this.option_sprite.scale.set(0.1)
        this.option_sprite.anchor.set(0.5)
        this.option_sprite.x = 0
        this.option_sprite.y = 90
        this.container_button.addChild(this.option_sprite)

        this.option_sprite.interactive = true;
        this.option_sprite.on('pointerover', this.onPointerOver.bind(this.option_sprite));
        this.option_sprite.on('pointerout', this.onPointerOut.bind(this.option_sprite));
        this.option_sprite.on('click', this.onclickOption.bind(this.option_sprite))

        this.addChild(this.container_button)
    }

    onPointerOver() {
        //this.tint = 0x00FF00;
        this.scale.set(0.12)
    }

    onPointerOut() {
        // this.tint = 0xFFFFFF;
        this.scale.set(0.1)
    }

    onClickStart() {
        Game.chanceScene(new GameWin())
        //this.destroy()
    }

    onclickOption() {

    }

    destroy_this() {
        super.destroy()
        this.start_sprite.interactive = false
        this.option_sprite.interactive = false
        this.bg.destroy()
        this.name_game.destroy()
        this.container_button.destroy()
        this.start_sprite.destroy()
        this.option_sprite.destroy()
        this.destroy()
    }

}