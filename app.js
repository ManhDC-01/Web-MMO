const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Cấu hình EJS
app.set('view engine', 'ejs');
// Thiết lập đường dẫn tuyệt đối cho thư mục 'views'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Cấu hình thư mục public để chứa ảnh/video
app.use(express.static('public'));
// Thiết lập đường dẫn tuyệt đối cho thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Đọc danh sách ảnh từ thư mục public/images
app.get('/', (req, res) => {
    const imageDir = path.join(__dirname, 'public/images');

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error('Lỗi đọc thư mục:', err);
            return res.status(500).send('Lỗi server');
        }

        // Tạo danh sách ảnh có đường dẫn đúng
        const videos = files.map(file => ({
            title: file.replace(/\.[^/.]+$/, ""), // Xoá đuôi file (VD: video1.jpg -> video1)
            thumbnail: `/images/${file}` // Đường dẫn đến ảnh
        }));
        // console.log(videos); // Kiểm tra dữ liệu
        // Render ra trang index.ejs và truyền danh sách ảnh vào
        res.render('index', { videos });
    });
});

// Chạy server
// app.listen(PORT, () => {
//     console.log(`Server chạy tại: http://localhost:${PORT}`);
// });
// ✅ Export app
module.exports = app;
