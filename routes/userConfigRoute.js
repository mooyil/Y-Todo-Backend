const express = require("express");
const userConfigRoute = express.Router();
const db = require("../database/database");

userConfigRoute.get("/userconfig/username/:username", (req, res, next) => {
  const sql = "select (userConfig) from users where username = ?";
  const params = req.params.username;
  db.all(sql, params, (err, resp) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: resp,
    });
  });
});

userConfigRoute.patch("/userconfig/change/:username", (req, res) => {
  const data = {
    isSorted: req.body.isSorted,
  };
  db.run(
    `UPDATE users set 
         userConfig = COALESCE(?,userConfig)
         WHERE username = ?`,
    [data.isSorted, req.params.username],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

module.exports = userConfigRoute;
