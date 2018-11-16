const express = require("express");

const User = require("../models/user-model.js");

const router = express.Router();


router.get("/admin/users", (req, res, next) => {
  // AUTHORIZATION: You have to be logged-in AS AN ADMIN to visit this page
  if (!req.user || req.user.role !== "admin") {
    req.flash("error", "Only admins can do that. 👊🏽");
    res.redirect("/");
    return; // use "return" instead of a big else
  }

  User.find()
    .sort({ role: 1, createdAt: 1 })
    .then(userResults => {
      res.locals.userArray = userResults;
      res.render("admin-views/user-list.hbs");
    })
    .catch(err => next(err));
});


module.exports = router;
