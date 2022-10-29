const authRouter = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const db = require("../database/database");

require("dotenv").config();

let userEmail
// Sign up
authRouter.post(
  "/signup",
  [
    // check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const sql = "INSERT INTO tabs (name, userEmail) Values(?,?)";
    const params = [req.body.email, req.body.password];
    db.run(sql, params, (err, resp) => {
      if (err) {
        console.log(err)
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
    const sqlSelectSignup = "select email from users where email = ?";
    const paramsSelectSignup = [req.body.email];
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
        // 422 Unprocessable Entity: server understands the content type of the request entity
        // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
        res.send("The user already exists");
      } else {
        // Hash password before saving to database
        userEmail = email
        const salt = await bcrypt.genSalt(10);
        console.log("salt:", salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("hashed password:", hashedPassword);

        const sqlInsert = "INSERT INTO users (email, password) VALUES (?,?)";
        const paramsInsert = [email, password]; //hier noch hashed passwort speichern
        db.run(sqlInsert, paramsInsert, function (err, result) {
          if (err) {
            console.log(err);
          }
        });

        // Do not include sensitive information in JWT
        const accessToken = JWT.sign(
          { email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10s",
          }
        );

        res.json({
         accessToken: accessToken,
          userEmail: userEmail
        });
      }
    });
  }
);

// Error status code
// 401 Unauthorized: it’s for authentication, not authorization. Server says "you're not authenticated".
// 403 Forbidden: it's for authorization. Server says "I know who you are,
//                but you just don’t have permission to access this resource".

///////////////////////////

// Get all users
authRouter.get("/users", (req, res) => {
  res.json(users);
});

// Log in
authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Look for user email in the database
  const sqlSelectSignin = "select email,password from users where email = ? and password = ?";
  const paramsSelectSignin = [req.body.email, req.body.password];
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
      // 422 Unprocessable Entity: server understands the content type of the request entity
      // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
      console.log("user existiert nicht");
    } else {
      userEmail = email
            // Send JWT
            const accessToken = JWT.sign(
              { email },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "10s",
              }
            );

            res.json({
              accessToken: accessToken,
              userEmail: userEmail
            });
          }
        }
      );

      // Compare hased password with user password to see if they are valid
      // let isMatch = bcrypt.compare(password, req.body.password); //das noch benutzen siehe oben
    
});

module.exports = authRouter;
