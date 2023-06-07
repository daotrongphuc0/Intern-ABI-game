import { Container, FederatedPointerEvent, Sprite } from "pixi.js";

export class Scene extends Container {
    constructor(screenWidth, screenHeight) {
        super();
        this.clampy = Sprite.from("../assets/images/clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;
        this.addChild(this.clampy);

        /*
        Mouse only      Touch only          Mouse + Touch
        click               tap                pointertap
        mousedown       touchstart             pointerdown
        mouseup         touchend               pointerup
        mousemove       touchmove              pointermove
        */
        this.clampy.on("mouseup", this.onClicky, this);

        // .interactive và .pointer 
        //đối tượng có thể tương tác với chuột và sẽ 
        //phản ứng với các sự kiện chuột như "click", "mousemove" và "mouseover"
        //.interactive còn cho phép bạn đặt các trình xử lý sự kiện tùy chỉnh cho đối tượng đó.
        this.clampy.interactive = true;
    }

    onClicky(event) {
        console.log("You interacted with Clampy!")
        console.log("The data of your interaction is super interesting", event)

        // Lấy tọa độ chuột trong khung cửa sổ trình duyệt
        const mousePosition = app.view.getBoundingClientRect();

        // Lấy vị trí con trỏ chuột trong container PixiJS
        const mousePosX = event.clientX - mousePosition.left;
        const mousePosY = event.clientY - mousePosition.top;

        // Global position of the interaction
        // e.global

        // Local (inside clampy) position of the interaction
        // clampy.toLocal(e.global)
        // or the "unsafe" way:
        // (e.target as DisplayObject).toLocal(e.global)
        // Remember Clampy has the 0,0 in its center because we set the anchor to 0.5!
    }

}