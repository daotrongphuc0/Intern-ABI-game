import { Container } from "pixi.js";

// install: npm i @pixi/sound --save
import { Sound } from "@pixi/sound";


export class Scene extends Container {
    constructor(screenWidth, screenHeight) {
        super();

        /*
        - play(): Phương thức này được sử dụng để phát âm thanh. 
        Khi gọi .play(), âm thanh sẽ được phát từ đầu hoặc tiếp tục từ vị trí đã tạm dừng
         (nếu đã gọi .pause() trước đó).

        - stop(): Phương thức này được sử dụng để dừng phát âm thanh ngay lập tức. 
        Nếu bạn muốn phát lại từ đầu, bạn sẽ cần gọi .play().

        - isPlaying: Thuộc tính chỉ đọc (boolean) này cho biết liệu âm thanh có đang phát hay không.

        - pause(): Phương thức này được sử dụng để tạm dừng phát âm thanh. Nếu gọi .play() sau khi đã tạm dừng, âm thanh sẽ tiếp tục từ vị trí đã tạm dừng.

        - resume(): Phương thức này được sử dụng để tiếp tục phát âm thanh từ vị trí đã tạm dừng.

        - paused: Thuộc tính chỉ đọc (boolean) này cho biết liệu âm thanh có đang tạm dừng hay không.

        - volume: Thuộc tính này được sử dụng để đặt hoặc nhận giá trị âm lượng âm thanh. Giá trị nằm trong khoảng từ 0 (tắt âm) đến 1 (âm lượng tối đa).

        - muted: Thuộc tính này được sử dụng để đặt hoặc nhận giá trị tắt/bật tiếng. Khi muted là true, âm thanh sẽ không được nghe thấy dù volume có giá trị bất kỳ.

        - loop: Thuộc tính này được sử dụng để đặt hoặc nhận giá trị vòng lặp âm thanh. Khi loop là true, âm thanh sẽ được phát lại từ đầu sau khi kết thúc.

        - filters: Thuộc tính này cho phép bạn áp dụng các bộ lọc âm thanh cho âm thanh đang phát. Bạn có thể sử dụng các bộ lọc có sẵn hoặc tạo bộ lọc tùy chỉnh để điều chỉnh âm thanh theo ý muốn. 
        */
        const whistly = Sound.from("../assets/sound/mp3.mp3");
        whistly.volume = 0.5;
        whistly.play();

    }
}