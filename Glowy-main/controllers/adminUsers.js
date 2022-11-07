const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    }
    res.render("./users/index", { users });
  });
});

router.get("/new", (req, res) => {
  res.render("users/adminUsers.ejs");
});
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, user) => {
    if (err) {
      res.send("unable to create user" + err.message);
    } else {
      res.redirect("/users/" + user.id);
    }
  });
});

router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.render("./users/edit.ejs", { user });
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/adminUsers/");
    }
  );
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/adminUsers");
  });
});
module.exports = router;
