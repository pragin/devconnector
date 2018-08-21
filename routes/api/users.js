const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../models/User");

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public

router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route    Post api/users/register
// @desc     USer registration route
// @access   Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(404).json({ email: "Email already exists" });
    } else {
      //create an avatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", // Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route    Post api/users/login
// @desc     login route
// @access   Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      //check if the user email is valid
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }

      //Check if the password match
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            res.json({ msg: "Success" });
          } else {
            return res.status(404).json({ password: "Password incorrect" });
          }
        })
        .catch(err => console.log("error"));
    })
    .catch(err => res.json({ error: "Error" }));
});

module.exports = router;
