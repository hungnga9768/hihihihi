const adminMd = require("../../models/admin");
module.exports = {
  // Chức năng đăng nhập
  async showLogin(req, res) {
    res.render("Admin-login", {
      message: null,
    });
  },
  async checkLogin(req, res) {
    const { email, password_hash } = req.body;
    const user = await adminMd.check_emaill(email);

    if (!user.length) {
      res.render("Admin-login", {
        message: "Tài khoản không tồn tại",
      });
    }
    if (password_hash !== user[0].password_hash) {
      return res.render("Admin-login", {
        message: "Mật khẩu không chính xác",
      });
    }
    // Đăng nhập Thành công
    req.session.admin = user;
    res.redirect("/admin");
  },
  // Chức năng đăng xuất
  async Logout(req, res) {
    fd;
  },

  async showAddForm(req, res) {
    const courses = await dsKhoahoc.getDs();
    res.render("add-baihoc", { courses });
  },

  // Xử lý thêm khóa học
  async create(req, res) {
    try {
      const {
        course_id,
        title,
        description,
        content_type,
        content_url,
        duration,
        display_order,
      } = req.body;
      const is_preview = req.body.is_preview === "1" ? true : false;

      const newCourse = {
        course_id,
        title,
        description,
        content_type,
        content_url,
        duration,
        display_order,
        is_preview,
      };

      await Course.create(newCourse);
      res.redirect("/admin/baihoc/danhsach");
    } catch (err) {
      console.error("Lỗi thêm khóa học:", err);
      return res.render("error", {
        message: "Lỗi thêm khóa học",
      });
    }
  },
};
