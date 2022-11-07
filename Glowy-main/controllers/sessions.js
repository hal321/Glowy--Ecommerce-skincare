const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/userSchema.js");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUserDetails) => {
    if (err) {
      console.log("unable to retrive user" + err.message);
    } else {
      if (foundUserDetails) {
        if (bcrypt.compareSync(req.body.password, foundUserDetails.password)) {
          req.session.currentUser = foundUserDetails;
          res.locals.currentUser = foundUserDetails;
          res.redirect("/products");
        } else {
          res.send("login failed");
        }
      } else {
        res.send("login failed");
      }
    }
  });
  
});

module.exports = router;
