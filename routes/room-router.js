const express = require("express");

const Room = require("../models/room-model.js");

const router = express.Router();


router.get("/room/add", (req, res, next) => {
  // AUTHORIZATION: You have to be logged-in to visit this page
  if (!req.user) {
    req.flash("error", "You have to be logged-in to add a room. 🖼");
    res.redirect("/login");
  }
  else {
    res.render("room-views/room-form.hbs");
  }
});

router.post("/process-room", (req, res, next) => {
  const { name, description, pictureUrl } = req.body;
  const owner = req.user._id;

  // create a room whose owner is the logged-in user
  Room.create({ name, description, pictureUrl, owner })
    .then(roomDoc => {
      req.flash("success", "Room created successfully! 🛏");
      res.redirect("/my-rooms");
    })
    .catch(err => next(err));
});

router.get("/my-rooms", (req, res, next) => {
  // AUTHORIZATION: You have to be logged-in to visit this page
  if (!req.user) {
    req.flash("error", "You have to be logged-in to see your rooms. 🚽");
    res.redirect("/login");
    return; // use "return" instead of a big else
  }

  // Find rooms owned by the logged-in user
  Room.find({ owner: { $eq: req.user._id } })
    .sort({ createdAt: -1 }) // sort by newest first
    .then(roomResults => {
      res.locals.roomArray = roomResults;
      res.render("room-views/room-list.hbs");
    })
    .catch(err => next(err));
});


module.exports = router;
