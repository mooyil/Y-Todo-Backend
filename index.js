const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/routes");
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
app.use("/todos", route);

//bestimmte todos bekommen
app.use("/todos/", route);

//add new todos
app.use("/", route);

//delete todos
app.use("/", route);

//update todos
app.use("/", route);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => console.log("server started " + PORT));
