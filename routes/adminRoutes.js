const adminController = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.post("/admin-login", adminController.postLogin);

module.exports = router;
