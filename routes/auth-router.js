const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router = express.Router();


router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { fullName, email, originalPassword } = req.body;

  // THIS IS WHERE WE WILL CHECK THE PASSWORD RULES

  // encrypt the submitted password before saving
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(userDoc => {
      res.redirect("/");
    })
    .catch(err => next(err));
});


module.exports = router;
