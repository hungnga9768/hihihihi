const admin = require("../../models/admin");
const adminMd = require("../../models/admin");
const bcrypt = require("bcrypt"); // thư viện mã hóa mật khẩu
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
    //check mật khẩu đã được mã hóa
    const storedPassword = user[0].password_hash;
    const isMatch = await bcrypt.compare(password_hash, storedPassword);
    if (!isMatch) {
      return res.render("Admin-login", {
        message: "Mật khẩu không chính xác",
      });
    }

    // Đăng nhập Thành công
    req.session.admins = user;
    res.redirect("/admin");
  },
  // Chức năng đăng xuất
  async Logout(req, res) {
    fd;
  },
  async index(req, res) {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const totalRow = await adminMd.getTotalRow(search);
    const totalPage = Math.ceil(totalRow / limit);
    const baihocPage = Math.min(Math.max(page, 1), totalPage);
    const offset = (baihocPage - 1) * limit;
    const data = await adminMd.getAll(search, offset, limit);
    res.render("ds-admins", {
      data,
      totalPage,
      baihocPage,
      search,
    });
  },
  //show form thêm
  async showAddForm(req, res) {
    res.render("add-admin", { title: "thêm admin", message: null });
  },

  // Xử lý thêm admin
  async create(req, res) {
    try {
      const { username, email, full_name, status, role } = req.body;
      const saltRounds = 10; // độ dài mã hóa
      const password_hash = await bcrypt.hash(
        req.body.password_hash,
        saltRounds
      );
      const avatar = req.file
        ? "/images/" + req.file.filename
        : "/dist/img/avatar4.png";
      const newCourse = {
        username,
        email,
        password_hash,
        full_name,
        status,
        role,
        avatar,
      };
      const isDuplicate = await adminMd.checkDuplicateUsernameOrEmail(
        username,
        email
      );
      if (isDuplicate) {
        return res.render("add-admin", {
          title: "thêm admin",
          message: "Tên tài khoản hoặc emaill đã có trên hệ thống",
        });
      }
      await adminMd.create(newCourse);
      res.redirect("/admin/admins/danhsach");
    } catch (err) {
      console.error("Lỗi thêm khóa học:", err);
      return res.render("error", {
        message: "Lỗi thêm khóa học",
      });
    }
  },
  // Xử lý xóa user
  async remove(req, res) {
    const id = req.params.id; //lấy req id trên urlurl
    try {
      await adminMd.delete(id); //gọi model xử lí
      console.log("Đã xóa bài hoc ID:", id);
      res.redirect("/admin/admins/danhsach");
    } catch (err) {
      console.error("Lỗi xóa:", err);
      res.status(500).send("Xóa thất bại");
    }
  },
  async showEditForm(req, res) {
    const id = req.params.id;
    const admin = await adminMd.getById(id);
    if (!admin) {
      return res.render("error", { message: "Không tìm thấy bài học" });
    }
    res.render("edit-admin", { title: "Sửa thông tin người dùng", admin });
  },
  // Trang form update admin
  async update(req, res) {
    try {
      const id = req.params.id;
      const { username, email, full_name, status, role } = req.body;
      const isDuplicate = await adminMd.checkDuplicateUsernameOrEmailUpdate(
        username,
        email,
        id
      );
      if (isDuplicate) {
        return res.send(
          "Tên đăng nhập hoặc email đã tồn tại bởi người dùng khác."
        );
      }
      const dataUpdate = {
        username,
        email,
        full_name,
        status,
        role,
      };

      if (req.file) {
        dataUpdate.avatar = "/images/" + req.file.filename;
      }
      console.log(dataUpdate);
      await adminMd.update(id, dataUpdate);
      res.redirect("/admin/user/danhsach");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      res.send("Cập nhật thất bại");
    }
  },
};
