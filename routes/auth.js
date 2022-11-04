const authRouter = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const db = require("../database/database");

require("dotenv").config();

let userName;
// Sign up
authRouter.post(
  "/signup",
  [
    // check("username", "Invalid username").isusername(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const sql = "INSERT INTO tabs (name, userName) Values(?,?)";
    const params = [req.body.username, req.body.password];
    db.run(sql, params, (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    // Validate user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Validate if user already exists
    const sqlSelectSignup = "select username from users where username = ?";
    const paramsSelectSignup = [req.body.username];
    let userExistsSignup = false;
    db.get(sqlSelectSignup, paramsSelectSignup, async function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (result !== undefined) {
        userExistsSignup = true;
      }
      if (userExistsSignup) {
        console.log("code beenden");

        res.send("The user already exists");
      } else {
        userName = username;
        const sqlInsert = "INSERT INTO users (username, password) VALUES (?,?)";
        const paramsInsert = [username, password]; //hier noch hashed passwort speichern
        db.run(sqlInsert, paramsInsert, function (err, result) {
          if (err) {
            console.log(err);
          }
        });

        const accessToken = JWT.sign(
          { username },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10s",
          }
        );

        res.json({
          accessToken: accessToken,
          userName: userName,
        });
      }
    });
  }
);

// Get all users
authRouter.get("/users", (req, res) => {
  res.json(users);
});

// Log in
authRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  // Look for user username in the database
  const sqlSelectSignin =
    "select username,password from users where username = ? and password = ?";
  const paramsSelectSignin = [req.body.username, req.body.password];
  let userExistsSignin = false;
  db.get(sqlSelectSignin, paramsSelectSignin, async function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (result !== undefined) {
      userExistsSignin = true;
      console.log(userExistsSignin);
    }
    if (!userExistsSignin) {
      res.status(400).json({
        msg: "The user does not exists",
      });

      console.log("user existiert nicht");
    } else {
      userName = username;
      // Send JWT
      const accessToken = JWT.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10s",
        }
      );

      res.json({
        accessToken: accessToken,
        userName: userName,
      });
    }
  });
});

module.exports = authRouter;
