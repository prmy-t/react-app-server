const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  date: String,
  name: String,
  email: String,
  serviceType: String,
  vehicleType: String,
  engineType: String,
  contact: Number,
  description: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
