const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Thư mục lưu trữ ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Khởi tạo multer với cấu hình storage
const upload = multer({ storage: storage });

// ✅ Export đúng
module.exports = upload;
