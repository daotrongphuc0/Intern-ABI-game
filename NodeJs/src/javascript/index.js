
console.log('xin chào DTP')

import { Application, Sprite, Graphics, Container, Text } from 'pixi.js'

// const app = new Application({
//     width: 720,
//     height: 1280
// });

// document.body.appendChild(app.view);
// var clampy = Sprite.from("../javascript/clampy.png");
// clampy.anchor.set(0.5);
// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;
// app.stage.addChild(clampy);

let app = new Application({ width: 640, height: 360 });
document.body.appendChild(app.view);
// Create window frame
let frame = new Graphics();
frame.beginFill(0x666666); // tô màu xám
frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });  // vẽ viền
frame.drawRect(0, 0, 208, 208);  // vẽ hcn bên trong 
frame.position.set(320 - 104, 180 - 104); // vị trí hiển thị trong app
app.stage.addChild(frame);   // thêm vào

// vùng chứa chữ
let mask = new Graphics();
// Add the rectangular area to show
mask.beginFill(0xffffff);
mask.drawRect(0, 0, 200, 200); // khung hiển thị chữ
mask.endFill();


let maskContainer = new Container();  // container chứa text
maskContainer.mask = mask; // chỉ nội dung trong vùng mask mới được hiển thị.
maskContainer.addChild(mask);  // thêm vào container
// Offset by the window's frame width
maskContainer.position.set(4, 4);  // set vị trí đối với container cha
// And add the container to the window!
frame.addChild(maskContainer);

// Create contents for the masked container
let text = new Text(
    'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
    'You can put anything in the container and it will be masked!',
    {  // cái này có thể thay thế bằng 1 đối tượng new TextStyle({})
        fontSize: 24,
        fill: 0x1010ff,
        wordWrap: true,  // tự động ngắt dòng
        wordWrapWidth: 180 // độ rộng tối đa cho việc ngắt dòng
    }
);
text.x = 10; // đặt vị trí x trong trục toạ độ là 10
maskContainer.addChild(text);

// Add a ticker callback to scroll the text up and down
let elapsed = 0.0;  // đếm thời gian
app.ticker.add((delta) => {   // callback của ứng dụng, gọi liên tục trong khi chạy app
    //  tham số delta được sử dụng để tính toán thời gian đã trôi qua
    // Giá trị của delta phụ thuộc vào tốc độ khung hình (frame rate) của ứng dụng
    // Với frame rate ổn định, giá trị delta thường là giá trị cố định (ví dụ: 16.67 ms cho frame rate 60 FPS).
    elapsed += delta;
    text.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100.0;
});

