const express = require("express");
const db = require("../database/database");
const tabsRoute = express.Router();
// const mongoose = require("mongoose");
// const Tabs = require("../models/Tabs");

tabsRoute.get("/tabs/useremail/:userEmail", (req, res, next) => {
  const sql = "select * from tabs where userEmail = ?";
  const params = [req.params.userEmail];
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
    userEmail: req.body.userEmail,
  };
  const sql =
    "INSERT INTO tabs (name, userEmail) VALUES (?,?)";
  const params = [data.name, data.userEmail];
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
