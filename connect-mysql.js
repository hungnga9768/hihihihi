const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hungnga123", // điền mật khẩu nếu có
  database: "web_hoctiengtrung", // đổi thành tên database bạn tạo
});

connection.connect((err) => {
  if (err) {
    console.error(" Kết nối thất bại:", err);
    return;
  }
  console.log(" Kết nối thành công tới MySQL");
});

// connection.query("SELECT * FROM users", (err, results) => {
//   if (err) {
//     console.error(" Lỗi truy vấn:", err);
//     return;
//   }
//   console.log(" Kết quả truy vấn:", results);
// });
module.exports = connection;
