const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // Sử dụng biến môi trường nếu có

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Chỉ rõ thư mục views

// Middleware quan trọng
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Đường dẫn tuyệt đối

// Xử lý favicon (tránh request không cần thiết)
app.get("/favicon.ico", (req, res) => res.status(204));

// Routes
const routes = require("./routes");
app.use("/", routes);

// // Xử lý 404
// app.use((req, res, next) => {
//   res.status(404).render("404", { title: "Không tìm thấy trang" });
// });

// // Xử lý lỗi chung
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).render("500", { title: "Lỗi server" });
// });
app.use((req, res, next) => {
  console.log("Đang truy cập:", req.path);
  next();
});
// Khởi động server
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
