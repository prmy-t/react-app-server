const jwt = require("jsonwebtoken");
exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "admin" && password === "qwer") {
    const token = jwt.sign(email, process.env.JWT_KEY);
    res.send({
      status: "success",
      token,
      user: { email: "admin", name: "admin" },
    });
  } else {
    res.send({
      status: "error",
      error: "email or password is wrong",
    });
  }
};
