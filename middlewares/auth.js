// middlewares/auth.js
module.exports = function (req, res, next) {
  if (req.session && req.session.admins) {
    next(); // Cho phép đi tiếp nếu đã đăng nhập
  } else {
    res.redirect("/admin/login"); // Hoặc trả về lỗi nếu chưa đăng nhập
  }
};
