var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
// const authRateLimiter = require("../middleware/authRateLimiter");

// router.use(authRateLimiter);

/* GET users listing. */
router.get("/profile", authorization, async function (req, res, next) {
  try {
    const email = req.user.email;
    const users = await req.db.from("users").select("*").where("email", email);

    if (users.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const user = users[0];
    res.status(200).json({
      message: "Success",
      user: {
        email: user.email,
        firstName: user.FirstName,
        lastName: user.LastName,
        LGAName: user.LGAName,
        Organisation: user.Organisation,
        StreetAddress: user.StreetAddress,
        City: user.City,
        Postcode: user.Postcode,
        CardNumber: user.CardNumber,
        ExpiryDate: user.ExpiryDate,
        CVV: user.CVV,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Database error" });
  }
});

// router.post("/login", async function (req, res, next) {
//   // 1. Retrieve email and password from req.body

//   const email = req.body.email;
//   const password = req.body.password;

//   // Verify body
//   if (!email || !password) {
//     res.status(400).json({
//       success: false,
//       message: "Request body incomplete - email and password needed",
//     });
//     return;
//   }

//   const users = await req.db.from("users").select("*").where("email", email);

//   if (users.length === 0) {
//     console.log("User does not exist");
//     return res.status(401).json({
//       success: false,
//       message: "User does not exist",
//     });
//   }

//   // 2. Determine if user already exists in table
//   const queryUsers = req.db
//     .from("users")
//     .select("*")
//     .where("email", "=", email);
//   queryUsers
//     .then((users) => {
//       if (users.length === 0) {
//         console.log("User does not exist");
//         res.status(401).json({
//           success: false,
//           message: "User does not exist",
//         });
//         return;
//       }

//       // Compare password hashes
//       const user = users[0];
//       return bcrypt.compare(password, user.hash);
//     })
//     .then((match) => {
//       if (!match) {
//         console.log("Passwords do not match");
//         res.status(401).json({
//           success: false,
//           message: "Passwords do not match",
//         });
//         return;
//       }
//       // Create and return JWT token
//       const expires_in = 60 * 60 * 48; // 48 hours
//       const exp = Math.floor(Date.now() / 1000) + expires_in;
//       const token = jwt.sign({ email, exp }, process.env.JWT_SECRET);
//       res.status(200).json({
//         success: true,
//         token,
//         token_type: "Bearer",
//         expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       //Check if headers have already been sent
//       if (!res.headersSent) {
//         //If headers have not been sent, send a 500 response with an error message
//         res.status(500).json({
//           success: false,
//           message: "Server error. Could not complete login.",
//         });
//       }
//     });
// });

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Verify request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Request body incomplete - email and password needed",
      });
    }

    // Fetch user from DB
    const users = await req.db.from("users").select("*").where("email", email);

    if (users.length === 0) {
      console.log("User does not exist");
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    const user = users[0];

    // Compare passwords
    const match = await bcrypt.compare(password, user.hash);
    if (!match) {
      console.log("Passwords do not match");
      return res.status(401).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Create JWT token
    const expires_in = 60 * 60 * 48; // 48 hours
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: expires_in,
    });

    // Respond with token and user data
    res.status(200).json({
      success: true,
      token,
      token_type: "Bearer",
      expires_in,
      user: {
        email: user.email,
        firstName: user.FirstName,
        lastName: user.LastName,
        LGAName: user.LGAName,
      },
    });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Server error. Could not complete login.",
      });
    }
  }
});

router.post("/register", function (req, res, next) {
  // Retrieve email and password from req.body
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const LGAName = req.body.LGAName;

  // Determine if user already exists in table
  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", email);
  queryUsers
    .then((users) => {
      if (users.length > 0) {
        res.status(400).json({
          error: true,
          message:
            "A user with that email already exists. Please use a different email address.",
        });
        return;
      }

      // Insert user into DB
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      req.db
        .from("users")
        .insert({ email, hash, LGAName, firstName, lastName })
        .then(() => {
          res.status(201).json({ success: true, message: "User created" });
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            message: "Error - " + err.sqlMessage,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        message: "Error registering user ",
      });
    });
});

router.put("/update", authorization, async function (req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      LGAName,
      password,
      Organisation,
      StreetAddress,
      City,
      Postcode,
      CardNumber,
      ExpiryDate,
      CVV,
    } = req.body;
    const userEmail = req.user.email;

    // Fetch user from DB
    const users = await req.db
      .from("users")
      .select("*")
      .where("email", userEmail);

    if (users.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const user = users[0];

    // Update user details
    const updatedUser = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      LGAName: LGAName || user.LGAName,
      Organisation: Organisation || user.Organisation,
      StreetAddress: StreetAddress || user.StreetAddress,
      City: City || user.City,
      Postcode: Postcode || user.Postcode,
      CardNumber: CardNumber || user.CardNumber,
      ExpiryDate: ExpiryDate || user.ExpiryDate,
      CVV: CVV || user.CVV,
    };

    if (password) {
      const saltRounds = 10;
      updatedUser.hash = bcrypt.hashSync(password, saltRounds);
    }

    if (CardNumber) {
      const saltRounds = 10;
      updatedUser.CardNumber = bcrypt.hashSync(CardNumber, saltRounds);
    }

    await req.db.from("users").where("email", userEmail).update(updatedUser);

    res.status(200).json({ success: true, message: "User details updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Database error" });
  }
});

router.delete("/delete", authorization, async function (req, res, next) {
  try {
    const userEmail = req.user.email;

    // Fetch user from DB
    const users = await req.db
      .from("users")
      .select("*")
      .where("email", userEmail);

    if (users.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Delete user from DB
    await req.db.from("users").where("email", userEmail).del();

    res.status(200).json({ success: true, message: "User account deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Database error" });
  }
});

module.exports = router;
