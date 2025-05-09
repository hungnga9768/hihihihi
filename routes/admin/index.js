const express = require("express");
const router = express.Router();
const admins = require("../../app/controllers/admin/admins.controller");
const khoahoc = require("./khoahoc");
const baihoc = require("./baihoc");
const user = require("./user");
const admin = require("./admins");
const baitap = require("./baitap");
const authMiddleware = require("../../middlewares/auth");
router.get("/", (req, res) => {
  res.render("home");
});
router.get("/login", admins.showLogin);
router.post("/login", admins.checkLogin);
router.get("/logout", admins.Logout);
// router.use(authMiddleware);
router.use("/khoahoc", khoahoc); // /user/profile/...
router.use("/baihoc", baihoc); // /user/profile/...
router.use("/user", user); // /user/profile/...
router.use("/admins", admin); // /user/profile/...
router.use("/baitap", baitap); // /user/profile/...

module.exports = router;
