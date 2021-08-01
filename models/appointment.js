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
  status: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
