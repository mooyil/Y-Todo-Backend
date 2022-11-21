const express = require("express");
const db = require("../database/database");
const tabsRoute = express.Router();

tabsRoute.get("/tabs/userName/:userName", (req, res, next) => {
  const sql = "select * from tabs where userName = ?";
  const params = [req.params.userName];
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

tabsRoute.post("/tabs/post", (req, res, next) => {
  const data = {
    name: req.body.name,
    userName: req.body.userName,
  };
  const sql = "INSERT INTO tabs (name, userName) VALUES (?,?)";
  const params = [data.name, data.userName];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
    });
  });
});

tabsRoute.delete("/tabs/delete/:name", (req, res, next) => {
  db.run(
    "DELETE FROM tabs WHERE name = ?",
    req.params.name,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

module.exports = tabsRoute;
