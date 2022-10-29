const express = require("express");
const app = express();
const cors = require("cors");
const todosRoute = require("./routes/todosRoute");
const tabsRoute = require("./routes/tabsRoute");
const authRouter = require("./routes/auth");
const userConfigRoute = require("./routes/userConfigRoute");
// const postsRouter = require("./routes/posts");

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

app.use("/", todosRoute);
app.use("/", tabsRoute);
app.use("/auth", authRouter);
app.use("/", userConfigRoute);
// app.use("/posts", postsRouter);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => console.log("server started " + PORT));
