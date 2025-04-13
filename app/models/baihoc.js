// Kết nối MySQL
const db = require("../../connect-mysql");

// Dùng util để hỗ trợ async/await cho truy vấn
const util = require("util");
const query = util.promisify(db.query).bind(db);

// Export object chứa các hàm xử lý database liên quan đến Courses
module.exports = {
  //  Lấy danh sách khóa học (có phân trang và tìm kiếm)
  async getAll(search, offset, limit) {
    let sql = "SELECT * FROM Lessons";
    if (search) sql += ` WHERE title LIKE '%${search}%'`; // nếu có từ khóa
    sql += ` ORDER BY lesson_id DESC LIMIT ${offset}, ${limit}`; // phân trang
    return await query(sql);
  },
  async getDs() {
    let sql = "SELECT * FROM Lessons";
    return await query(sql);
  },

  //  Lấy tổng số dòng (dùng để phân trang)
  async getTotalRow(search) {
    let sql = "SELECT COUNT(*) AS totalRow FROM Lessons";
    if (search) sql += ` WHERE title LIKE '%${search}%'`; // điều kiện tìm kiếm
    const result = await query(sql);
    return result[0].totalRow; // trả về tổng số dòng
  },

  //  Lấy chi tiết 1 khóa học theo ID
  async getById(id) {
    const result = await query("SELECT * FROM Courses WHERE course_id = ?", [
      id,
    ]);
    return result[0]; // trả về 1 object duy nhất
  },

  //  Thêm khóa học mới
  async create(lesson) {
    const sql = `
      INSERT INTO Lessons (course_id, title, description, content_type,content_url, duration, display_order, is_preview) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      lesson.course_id,
      lesson.title,
      lesson.description,
      lesson.content_type,
      lesson.content_url,
      lesson.duration,
      lesson.display_order,
      lesson.is_preview,
    ];
    return await query(sql, values);
  },

  //  Cập nhật khóa học
  async update(id, data) {
    const sql = `UPDATE Courses SET ? WHERE course_id = ?`;
    return await query(sql, [data, id]);
  },

  // Xóa khóa học
  async delete(id) {
    return await query("DELETE FROM Courses WHERE course_id = ?", [id]);
  },

  // Kiểm tra trùng tiêu đề khi sửa
  async checkDuplicateTitle(title, id) {
    const result = await query(
      `SELECT * FROM Courses WHERE title = ? AND course_id != ?`,
      [title, id]
    );
    return result.length > 0;
  },
};
