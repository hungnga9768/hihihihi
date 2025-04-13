const Course = require("../models/baihoc");
const dsKhoahoc = require("../models/khoahoc");
module.exports = {
  // Trang danh sách khóa học với phân trang & tìm kiếm
  async index(req, res) {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const totalRow = await Course.getTotalRow(search);
    const totalPage = Math.ceil(totalRow / limit);
    const baihocPage = Math.min(Math.max(page, 1), totalPage);
    const offset = (baihocPage - 1) * limit;

    const data = await Course.getAll(search, offset, limit);
    console.log(data);
    res.render("ds-baihoc", {
      data,
      totalPage,
      baihocPage,
      search,
    });
  },

  // Trang form thêm khóa học
  async showAddForm(req, res) {
    const courses = await Course.getDs();
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
      res.redirect("/admin/khoahoc/danhsach");
    } catch (err) {
      console.error("Lỗi thêm khóa học:", err);
      res.send("Lỗi thêm khóa học");
    }
  },

  // Trang form chỉnh sửa khóa học
  async showEditForm(req, res) {
    const id = req.params.id;
    const course = await Course.getById(id);
    if (!course) {
      return res.render("error", { message: "Không tìm thấy khóa học" });
    }
    res.render("edit-khoahoc", { title: "Chỉnh sửa khóa học", course });
  },

  // Xử lý cập nhật khóa học
  async update(req, res) {
    try {
      const id = req.params.id;
      const {
        title,
        description,
        difficulty_level,
        estimated_duration,
        is_free,
        price,
        instructor_id,
      } = req.body;

      const isDuplicate = await Course.checkDuplicateTitle(title, id);
      if (isDuplicate) {
        return res.send("Khóa học với tiêu đề này đã tồn tại.");
      }

      const dataUpdate = {
        title,
        description,
        difficulty_level,
        estimated_duration,
        is_free,
        price,
        instructor_id,
      };

      if (req.file) {
        dataUpdate.thumbnail_url = "/images/" + req.file.filename;
      }

      await Course.update(id, dataUpdate);
      res.redirect("/admin/khoahoc/danhsach");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      res.send("Cập nhật thất bại");
    }
  },

  // Xử lý xóa khóa học
  async remove(req, res) {
    const id = req.params.id;
    try {
      await Course.delete(id);
      console.log("Đã xóa khóa học ID:", id);
      res.redirect("/admin/khoahoc/danhsach");
    } catch (err) {
      console.error("Lỗi xóa:", err);
      res.status(500).send("Xóa thất bại");
    }
  },
};
