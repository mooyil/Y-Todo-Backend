const express = require("express");
const tabsRoute = express.Router();
// const mongoose = require("mongoose");
// const Tabs = require("../models/Tabs");
let tabs = require("../Tabs");

tabsRoute.get("/tabs", (req, res) => {
  res.json(tabs);
});

tabsRoute.post("/tabs/post", (req, res) => {
  const newTab = {
    name: req.body.name,
  };
  tabs.push(newTab);
  res.json(newTab);
});

tabsRoute.delete("/tabs/delete/:name", (req, res) => {
  tabs = tabs.filter((tab) => tab.name !== req.params.name);
  res.json(tabs)
});

// tabsRouter.get("/tabs", async (req, res) => {
//     try{
//         const tabs = await Tabs.find()
//         res.send(tabs)
//     }catch(err) {
//         res.send(err)
//     }
// })

// tabsRouter.post("/tabs/post", async (req, res) => {
//     const tab = Tabs(
//         req.body.name
//         );
//       try {
//         const savedTab = await tab.save();
//         res.send(savedTab);
//       } catch (err) {
//         res.send(err);
//       }
//     });

// //connect to DB
// mongoose.connect("mongodb://localhost:27017", () => {
//   console.log("connected(Tabs)");
// });

module.exports = tabsRoute;
