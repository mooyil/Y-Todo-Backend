const express = require("express");
const router = express.Router();
// let todos = require("../Todos");
const mongoose = require("mongoose");
const Todos = require("../models/Todos");

// router.get("/", (req, res) => {
//     res.json(todos);
// })

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todos.find();
    res.json(todos);
  } catch (err) {
    res.send(err);
  }
});

// router.get("/:id", (req, res) => {
//   res.json(todos.filter((todo) => todo.id === parseInt(req.params.id)));
// });

router.get("/todo/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    res.send(todo);
  } catch (err) {
    res.send(err);
  }
});

// // methode um die Id´s zu generieren
// function getBiggestIdOfTodosArray() {
//     if (todos.length === 0) {
//       return 0;
//     }
//     let biggestNumber = todos[0]._id;
//     for (i = 0; i < todos.length; i++) {
//       if (todos[i]._id > biggestNumber) {
//         biggestNumber = todos[i]._id;
//       }
//     }
//     return biggestNumber;
//   }

// // add new Todos
// router.post("/todos", (req, res) => {
//     const newTodos = {
//       _id: getBiggestIdOfTodosArray() + 1,
//       content: req.body.content,
//       isDone: false,
//       date: req.body.date,
//     };
//     if (!newTodos.content) {
//       return res.status(400).json({ msg: "include everything" });
//     }
//     todos.push(newTodos);
//     res.json(newTodos);
//   });

router.post("/todos", async (req, res) => {
  const todos = Todos({
    content: req.body.content,
    isDone: false,
    date: req.body.date,
    tab: req.body.tab
  });
  try {
    const savedTodos = await todos.save();
    res.json(savedTodos);
  } catch (err) {
    res.send(err);
  }
});

// //delete todos
// router.delete("/todos/delete/:id", (req, res) => {
//   todos = todos.filter((todo) => todo._id !== parseInt(req.params.id));
//   res.json(todos);
// });

router.delete("/todos/delete/:id", async (req, res) => {
  try {
    const removedTodo = await Todos.deleteOne({ _id: req.params.id });
    res.json(removedTodo);
  } catch (err) {
    res.send(err);
  }
});

// //update Todos
// router.put("/todos/change/:id", (req, res) => {
//   const found = todos.some((todo) => todo._id === parseInt(req.params.id));

//   if (found) {
//     todos.forEach((todo, i) => {
//       if (todo._id === parseInt(req.params.id)) {
//         const updTodo = { ...todo, ...req.body };
//         todos[i] = updTodo;
//         res.json(updTodo);
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

router.patch("/todos/change/:id", async (req, res) => {
  try {
    const updatedTodo = await Todos.updateOne(
      { _id: req.params.id },
      { $set: { content: req.body.content, date: req.body.date } },
    );
    res.send(updatedTodo);
  } catch (err) {
    res.send(err);
  }
});

mongoose.connect("mongodb://localhost:27017", () => {
  console.log("conntected to DB");
});

module.exports = router;
