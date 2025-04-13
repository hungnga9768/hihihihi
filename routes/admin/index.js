const express = require("express");
const router = express.Router();

const khoahoc = require("./khoahoc");
const baihoc = require("./baihoc");

router.use("/khoahoc", khoahoc); // /user/profile/...
router.use("/baihoc", baihoc); // /user/profile/...

module.exports = router;
