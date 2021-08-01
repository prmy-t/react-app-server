const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointment");
exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "admin" && password === "qwer") {
    const token = jwt.sign(email, process.env.JWT_KEY);
    res.send({
      status: "success",
      token,
      user: { email: "admin", firstName: "admin" },
    });
  } else {
    res.send({
      status: "error",
      error: "email or password is wrong",
    });
  }
};

exports.getOrders = (req, res) => {
  Appointment.aggregate([{ $group: { _id: "$email", orders: { $sum: +1 } } }])
    .then((info) => {
      res.send(info);
    })
    .catch((err) => console.log(err));
};
exports.postPersonalOrders = (req, res) => {
  const email = req.body.email;
  Appointment.find({ email })
    .sort("date")
    .then((info) => {
      res.send(info);
    })
    .catch((err) => console.log(err));
};
exports.postChangeStatus = (req, res) => {
  const id = req.body.id;
  const newStatus = req.body.newStatus;
  Appointment.findByIdAndUpdate(id, { $set: { status: newStatus } })

    .then(() => {
      res.send("saved");
    })
    .catch((err) => console.log(err));
};
