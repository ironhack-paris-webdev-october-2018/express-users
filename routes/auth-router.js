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

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-form.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  // search the database for a user with that email
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      // HERE WE WILL CHECK IF THE EMAIL IS WRONG

      // check the password
      const { encryptedPassword } = userDoc;
      // "compareSync()" will return FALSE if "originalPassword" is WRONG
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        // redirect to the login page if the password is wrong
        res.redirect("/login");
      }
      else {
        res.redirect("/");
      }
    })
    .catch(err => next(err));
});


module.exports = router;
