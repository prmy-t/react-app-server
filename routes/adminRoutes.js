const adminController = require("../controllers/adminController");

const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicControllers");

router.get("/get-orders", publicController.verify, adminController.getOrders);
router.post("/admin-login", adminController.postLogin);
router.post("/personal-orders", adminController.postPersonalOrders);
router.post("/change-status", adminController.postChangeStatus);

module.exports = router;
