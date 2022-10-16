const express = require("express");
const app = express();
const cors = require("cors");
const todosRoute = require("./routes/todosRoute");
const tabsRoute = require("./routes/tabsRoute")
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  })
);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Get all todos
app.use("/", todosRoute);
app.use("/", tabsRoute)

//bestimmte todos bekommen
// app.use("/todos/", todosRoute);

//add new todos
// app.use("/", todosRoute);
app.use("/", tabsRoute)

//delete todos
// app.use("/", todosRoute);
app.use("/", tabsRoute)

//update todos
// app.use("/", todosRoute);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => console.log("server started " + PORT));
