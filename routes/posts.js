// const postsRouter = require("express").Router();
// const { publicPosts, privatePosts } = require("../database");
// const authToken = require("../middleware/authenticateToken");

// postsRouter.get("/public", (req, res) => {
//   res.json(publicPosts);
// });

// postsRouter.get("/private", authToken, (req, res) => {
//   res.json(privatePosts);
// });

// module.exports = postsRouter;