# hihihihi

//là phần đăng nhập
// controllers/authController.js
const bcrypt = require('bcrypt'); // Nếu bạn lưu password đã mã hóa
const db = require('../../config/db'); // file kết nối MySQL

exports.login = (req, res) => {
const { username, password } = req.body;

const query = 'SELECT \* FROM Users WHERE username = ?';
db.query(query, [username], async (err, results) => {
if (err) return res.status(500).send('Lỗi server');

    if (results.length === 0) {
      return res.status(401).send('Tài khoản không tồn tại');
    }

    const user = results[0];

    // So sánh mật khẩu (nếu đã mã hóa bằng bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Sai mật khẩu');
    }

    // Nếu đăng nhập thành công:
    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role, // nếu có
    };

    res.redirect('/admin/dashboard'); // hoặc về trang nào đó

});
};
