const express = require("express");
const router = express.Router();
const baitapCtrl = require("../../app/controllers/api/baitap.controller");
const tailieuCtrl = require("../../app/controllers/api/tailieu.controller");
const khoahoc = require("../api/khoahoc");
const baihoc = require("../api/baihoc");

router.use("/khoahoc", khoahoc);
router.use("/baihoc", baihoc);
router.get("/tailieu/", tailieuCtrl.index);
router.get("/tailieu/:id", tailieuCtrl.getID);
router.get("/baitap/", baitapCtrl.index);
module.exports = router;
