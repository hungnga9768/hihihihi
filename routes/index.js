const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin");
// const userRoutes = require('./user');
// const apiRoutes = require('./api');
router.get("/", (req, res) => {
  res.render("home");
});
router.use("/admin", adminRoutes); // Trang admin
// router.use('/user', userRoutes);    // Trang người dùng
// router.use('/api', apiRoutes);      // API cho mobile/web client

module.exports = router;
