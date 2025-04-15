const express = require("express");
const router = express.Router();
const admins = require("../../app/controllers/admin/admins.controller");
const khoahoc = require("./khoahoc");
const baihoc = require("./baihoc");
const user = require("./user");
const authMiddleware = require("../../middlewares/auth");
router.get("/", authMiddleware, (req, res) => {
  res.render("home");
});
router.get("/login", admins.showLogin);
router.post("/login", admins.checkLogin);
router.get("/logout", admins.Logout);
router.use("/khoahoc", khoahoc); // /user/profile/...
router.use("/baihoc", baihoc); // /user/profile/...
router.use("/user", user); // /user/profile/...

module.exports = router;
