const express = require("express");
const { mongooseDB } = require("./database");
const UserRouter = require("./routers/user.router");
const BlogRouter = require("./routers/blog.router");
const CommentRouter = require("./routers/comment.router");

const PORT = process.env.PORT;

require("dotenv").config();
mongooseDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/blogapp/user", UserRouter);
app.use("/blogapp/blog", BlogRouter);
app.use("/blogapp/comment", CommentRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: "route not found" });
});

app.listen(PORT, () => {
  console.log("Server started listening on,", PORT);
});
