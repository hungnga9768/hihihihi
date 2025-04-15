module.exports = (req, res, next) => {
  if (req.session.admin) {
    // Kiểm tra session nếu có
    return next(); // Nếu đã đăng nhập, tiếp tục xử lý
  } else {
    res.redirect("/admin/login"); // Nếu chưa đăng nhập, chuyển về trang login
  }
};
