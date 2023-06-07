export const assets = [  // tạo danh sách đối tượng cần tải
    { name: "Clampy the clamp", url: "./clampy.png" },
    { name: "another image", url: "./monster.png" },
    { name: "whistle", url: "./whistle.mp3" },
]
Loader.shared.add(assets);  // thêm vào danh sách load

// bắt đầu load
Loader.shared.load();

// lấy dữ liệu
Loader.shared.resources["whistle"];