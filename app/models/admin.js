const db = require("../../connect-mysql");
const util = require("util");
const query = util.promisify(db.query).bind(db);
module.exports = {
  // 检查有电子邮箱吗
  async check_emaill(email) {
    const sql = "SELECT * FROM Admins WHERE email = ?";
    return await query(sql, [email]);
  },
};
