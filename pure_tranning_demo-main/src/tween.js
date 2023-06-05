import { Application, Container, Sprite, Texture } from "pixi.js";
import TWEEN from '@tweenjs/tween.js';

export class Scene extends Container {
    constructor() {
        super();

        // Tạo một đối tượng PIXI.Sprite
        this.texture = Texture.from("../assets/images/clampy.png");
        this.sprite = new Sprite(this.texture);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.addChild(this.sprite); // Thêm sprite vào container

        // Định nghĩa tween để di chuyển sprite từ vị trí hiện tại đến vị trí mới
        this.tween = new TWEEN.Tween(this.sprite.position)
            .to({ x: 100, y: 200 }, 1000) // Di chuyển đến vị trí (100, 200) trong 1 giây
            .easing(TWEEN.Easing.Linear.None) // Áp dụng hàm easing (có thể thay đổi)
            .start(); // Bắt đầu tween

        // Cập nhật tweens trong vòng lặp chính của ứng dụng
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        TWEEN.update();
    }
}
