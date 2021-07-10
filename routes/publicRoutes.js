const express = require("express");

const publicController = require("../controllers/publicControllers");
const router = express.Router();

router.get(
  "/get-appointments",
  publicController.verify,
  publicController.getAppointments
);

router.post("/signup", publicController.postSignup);
router.post("/login", publicController.postLogin);
router.post("/create-appointment", publicController.postCreatAppointment);

module.exports = router;
