const express = require("express");
const User = require("../models/user-model.js");
const router = express.Router();
const fileUploader = require("../config/file-upload.js");

/* GET home page */
router.get("/", (req, res, next) => {
  // "req.user" comes from Passport's "deserializeUser()"
  // (it's the document of the currently logged in user)
  if (req.user) {
    console.log("LOGGED IN! 🐉", req.user);
  } else {
    console.log("NOT logged in 😢", req.user);
  }

  res.render("index");
});

router.get("/settings", (req, res, next) => {
  // AUTHORIZATION: You have to be logged-in to visit this page
  if (!req.user) {
    req.flash("error", "You have to be logged-in to visit User Settings!");
    res.redirect("/login");
  } else {
    res.render("settings-page.hbs");
  }
});

router.post(
  "/process-settings",

  // you need to use avatarUpload in the settings-page
  fileUploader.single("avatarUpload"),
  (req, res, next) => {
    const { fullName, email } = req.body;

    let toUpdate = { fullName, email };

    //multer stores the file in req.file
    if (req.file) {
      toUpdate = { fullName, email, avatar: req.file.secure_url };
    }

    User.findByIdAndUpdate(
      req.user._id, // the logged-in user's ID from Passport's "req.user"
      { $set: toUpdate },
      { runValidators: true }
    )
      .then(userDoc => {
        req.flash("success", "Settings saved! 😉");
        res.redirect("/");
      })
      .catch(err => next(err));
  }
);

module.exports = router;
