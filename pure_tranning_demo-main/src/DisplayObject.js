import { Application, Container, Sprite, Point, Graphics, TextStyle, Texture, DisplayObject } from "pixi.js";
import { Scene } from "./ticker";
import TWEEN from '@tweenjs/tween.js';
/*
- các đối tượng muốn hiển  thị trên màn hình đều phải là con của Display Object
- các đối tượng cùng cha sẽ xuất hiện lồng lên nhau theo thứ thự,( trừ khi sử dụng zOrder)

*/
export class Dp extends Container {
    constructor() {
        super()
        this.conty = new Container();
        this.conty.x = 200;
        this.conty.y = 0;
        this.addChild(this.conty);

        /**
         * Sprite là 1 lớp dối tượng hiển thị hình ảnh. có thể lấy ảnh từ nguồn hoặc texture
         * .tint = 0xFF0000: pha màu của sprite vs màu của tint
         * .anchor là đặt tâm của sprite có thể dùng .anchor(0.5) hoặc .anchor.x =0.5
         */
        this.clampy = Sprite.from("../assets/images/clampy.png");
        this.clampy.x = 100;
        this.clampy.y = 100;
        this.conty.addChild(this.clampy);

        /*
        - `addChild(...)`: thêm 1 phần tử con
        - `removeChild(...)`: xoá 1 phần tử
        - `children`: danh sách đối tượng con
        - `position` vị ví,=> position.x và position.y có thể viết thành .x và .y
         `scale` phóng ảnh, có thể dùng để lật ảnh nếu đặt giá trị âm (cần phải làm theo trục)
         `skew`: nghiêng ảnh (cần phải làm theo trục)             
        - `rotation` and `angle`: Rotation xoay theo Pi, angle xoay theo độ.
        - `width` and `height`: kích thước đối tượng
        - `interactive`, : container.interactive = true; - cho phép nghe sự kiện trên container
        - `on(...)` and `off(...)` Vd: container.on('click', handleClick); nghe sự  kiện click bằng hàm handleClick và off()  gỡ hàm xử lí sự kiện
        - `getBounds(...)`: lấy khung đối tượng, trả về 1 hcn bounds.x, bounds.y, bounds.width, bounds.height
        - `destroy()` phá huỷ nó, xoá nó ra khỏi các lớp cha
        */
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

        /** Graphic là đối tượng hiển thị hình vẽ
         * giữa câu lệnh beginFill và andFill thì các đối tượng trong đó sẽ được tô màu theo màu theo beginFill
         */
        this.graphy.beginFill(0xFF00FF);
        this.graphy.lineStyle(10, 0x00FF00); //  vẽ viền
        this.graphy.drawCircle(0, 0, 25); // vẽ hình tròn tâm 0,0  bk 25
        this.graphy.endFill();

        // Here we set it at 100,100
        this.graphy.x = 100;
        this.graphy.y = 100;
        this.addChild(this.graphy); //I can add it before setting position, nothing bad will happen.

    }

}