
import { Application, BitmapText, BitmapFont } from 'pixi.js'

const app = new Application({
    resolution: 1,
    backgroundColor: 0x6495ed,
    width: 720,
    height: 1280
});
document.body.appendChild(app.view);
/**
 * Hiển thị chữ dưới dạng hình ảnh nên có nhiều kiểu chữ đặc biệt, hình ảnh hoặc hiệu ứng lạ
 * yêu cầu tài nguyên cao hơn
 */
BitmapFont.from("comic 32", {   // tạo font
    fill: "#ffffff",
    fontFamily: "Comic Sans MS",
    fontSize: 32
})

// Remember, this font only has letters and numbers. No commas or any other symbol.
var bitmapTexty = new BitmapText("I love baking, my family, and my friends",
    {
        fontName: "comic 32",
        fontSize: 32,
        tint: 0xFF0000
    });

bitmapTexty.text = "This is cheap";
bitmapTexty.text = "Change it as much as you want";  // từ xuất hiện

app.stage.addChild(bitmapTexty);