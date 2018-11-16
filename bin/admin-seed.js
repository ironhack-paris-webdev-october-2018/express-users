const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

mongoose
  .connect('mongodb://localhost/express-users', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const specialAdmins = [
  {
    fullName: "Mr. Blah",
    email: "blah@blah.com",
    encryptedPassword: bcrypt.hashSync("blah0", 10),
    role: "admin",
  },
  {
    fullName: "Mathis",
    email: "mathis@gmail.com",
    encryptedPassword: bcrypt.hashSync("cococo", 10),
    role: "admin",
  }
];

User.create(specialAdmins)
  .then(userResults => {
    console.log(`Creted ${userResults.length} admins 🤠`);
  })
  .catch(err => {
    console.log("ADMIN create failure 💩");
  });
