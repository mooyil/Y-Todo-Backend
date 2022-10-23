const express = require("express");
const todosRoute = express.Router();
const db = require("../database/database");

todosRoute.get("/todos/username/:userEmail", (req, res, next) => {
  const sql = "select * from todos where userEmail = ?";
  const params = [req.params.userEmail];
  console.log(params);
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

todosRoute.get("/todos/sort/date", (req, res, next) => {
  const sql = "select * from todos order by date desc";
  db.all(sql, (err, resp) => {
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

todosRoute.post("/todos/post", (req, res, next) => {
  const errors = [];
  if (!req.body.content) {
    errors.push("No content specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    content: req.body.content,
    tab: req.body.tab,
    date: req.body.date,
    userEmail: req.body.userEmail,
  };
  const sql =
    "INSERT INTO todos (content, tab, date, userEmail) VALUES (?,?,?,?)";
  const params = [data.content, data.tab, data.date, data.userEmail];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

todosRoute.delete("/todos/delete/:id", (req, res, next) => {
  db.run(
    "DELETE FROM todos WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

todosRoute.patch("/todos/change/:id", (req, res, next) => {
  const data = {
    content: req.body.content,
    tab: req.body.tab,
    date: req.body.date,
  };
  db.run(
    `UPDATE todos set 
         content = COALESCE(?,content),
         tab = COALESCE(?,tab),
         date = COALESCE(?,date)
         WHERE id = ?`,
    [data.content, data.tab, data.date, req.params.id],
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

module.exports = todosRoute;
