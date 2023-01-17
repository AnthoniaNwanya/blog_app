const blogModel = require("../models/blog.model");
const commentModel = require("../models/comment.model");

const createComment = async (req, res) => {
  const blogID = req.query.id;
  const findBlog = await blogModel.findById(blogID);
  const commenter = req.User.validUser_id;

  const addComment = await commentModel.create({
    comment: req.body.comment,
    timestamp: Date.now(),
    blog: findBlog,
    commenter: commenter,
  });

  const saveComment = await addComment.save();

  // Add and save created comment in "comments" field of Blog schema.
  findBlog.comments = findBlog.comments.concat(saveComment._id);
  await findBlog.save();

  res.status(201).send(saveComment);
};

const getComments = async (req, res) => {
  const comments = await commentModel
    .find({})
    .populate("blog", { title: 1, content: 1, author: 1 });

  return res.status(200).send({ status: true, comments });
};

const getCommentById = async (req, res) => {
  const id = req.query.id;
  const commentId = await blogModel
    .findById(id)
    .populate("blog", { title: 1, content: 1, author: 1 });

  return res.status(200).send({ status: true, commentId });
};

const updateComment = async (req, res) => {
  const id = req.query.id;
  const commentUpdate = req.body;
  const updatedComment = await commentModel.findByIdAndUpdate(
    id,
    commentUpdate,
    { new: true }
  );
  return res.status(202).send({
    message: "Update was successful",
    data: updatedComment,
  });
};

const deleteComment = async (req, res) => {
  const id = req.query.id;
  const delComment = await commentModel.findByIdAndDelete(id);
  return res
    .status(200)
    .send({ message: "Successfully deleted comment", data: delComment });
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
