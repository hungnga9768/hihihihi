const express = require("express");
const router = express.Router();

const khoahoc = require("../api/khoahoc");
const baihoc = require("../api/baihoc");

router.use("/khoahoc", khoahoc); // /user/profile/...
router.use("/baihoc", baihoc); // /user/profile/...

module.exports = router;
