var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  // 1. Retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;

  // Verify body
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed"
    });
    return;
  }

  // 2. Determine if user already exists in table
  const queryUsers = req.db.from("users").select("*").where("email", "=", email);
  queryUsers
    .then(users => {
      if (users.length === 0) {
        console.log("User does not exist");
        return;
      }

      // Compare password hashes
      const user = users[0];
      return bcrypt.compare(password, user.hash);
    })
    .then(match => {
      if (!match) {
        console.log("Passwords do not match");
        res.status(401).json({
          error: "Invalid login"
        });
        res.end();
        return;
      }
      // Create and return JWT token
      const expires_in = 60 * 60 * 24; // 24 hours
      const exp = Math.floor(Date.now() / 1000) + expires_in;
      const token = jwt.sign({ email, exp }, process.env.JWT_SECRET);
      res.status(200).json({
        token,
        token_type: "Bearer",
        expires_in
      });
    });
});

router.post('/register', function (req, res, next) {
  // Retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;
  const LGAName = req.body.LGAName;

  // Verify body
  if (!email || !password || !LGAName) {
    res.status(400).json({
      error: true,
      message: "Error - request body incomplete - email, password and LGAName needed"
    });
    return;
  }

  // Determine if user already exists in table
  const queryUsers = req.db.from("users").select("*").where("email", "=", email);
  queryUsers.then(users => {

    if (users.length > 0) {
      res.status(400).json({
        error: true,
        message: "Error - User already exists"
      });
      return;
    }

    // Insert user into DB
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    req.db.from("users").insert({ email, hash, LGAName })
    .then(() => {
      res.status(201).json({ success: true, message: "User created" });
    })
      .catch((err) => {
        res.status(400).json({
          error: true,
          message: "Error - " + err.sqlMessage
        });
      });

  })
    .catch((err) => {
      res.status(400).json({
        error: true,
        message: "Error registering user "
      });
    });
});

module.exports = router;
