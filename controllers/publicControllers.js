const User = require("../models/user");
const Appointment = require("../models/appointment");
const url = require("url");
const jwt = require("jsonwebtoken");
exports.postSignup = (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then((user) => {
      if (user) res.send("exist");
      else {
        const user = new User({
          firstName: fName,
          lastName: lName,
          email,
          password,
        });
        user
          .save()
          .then(() => {
            res.send("saved");
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        const token = jwt.sign(email, process.env.JWT_KEY);
        res.send({ user, token });
      } else
        res.send({ status: "none", error: "Email or password is wrong !" });
    })
    .catch((err) => console.log(err));
};
exports.postCreatAppointment = (req, res) => {
  const date = req.body.date;
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const serviceType = req.body.serviceType;
  const vehicleType = req.body.vehicleType;
  const engineType = req.body.engineType;
  const description = req.body.description;

  Appointment.find({ date, email })
    .then((data) => {
      if (data.length > 0) {
        res.send({
          error:
            "You have already ordered one service on this date. (no more then one service allowed on single a day)",
        });
      } else {
        Appointment.find({ date })
          .then((appo) => {
            if (appo.length < 4) {
              const appointment = new Appointment({
                name,
                email,
                serviceType,
                vehicleType,
                engineType,
                contact,
                description,
                date,
                status: "Booked",
              });
              appointment
                .save()
                .then(() => res.send({ success: "appointment created" }))
                .catch((err) => console.log(err));
            } else
              res.send({
                error: "Selected date is full, please select different date.",
              });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.getAppointments = (req, res) => {
  const token = req.headers["authorization"];
  const email = jwt.verify(token, process.env.JWT_KEY);
  console.log(email);
  Appointment.find({ email })
    .then((appo) => {
      console.log(appo);
      res.send(appo);
    })
    .catch((err) => console.log(err));
};

exports.verify = (req, res, next) => {
  console.log("hey");
  const token = req.headers["authorization"];
  let verified = "";
  console.log("token: > ", token);
  if (token !== "undefined") {
    verified = jwt.verify(token, process.env.JWT_KEY);
    console.log("verified: >", verified);
    if (verified) {
      req.token = token;
      return next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(201).send("not verified");
  }
};
