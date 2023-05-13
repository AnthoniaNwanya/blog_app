const blogModel = require("../models/blog.model");
const commentModel = require("../models/comment.model");

const createComment = async (req, res) => {
  const blogID = req.params.id;
  const findBlog = await blogModel.findById(blogID);
  const commenter = req.body.name
  const comment = req.body.comment;

  const addComment = await commentModel.create({
    comment: comment,
    timestamp: Date.now(),
    blog: findBlog,
    commenter: commenter,
  });

  // In the absence of a user interface to incorporate the like button, this like logic was applied
  if(addComment.comment.includes("like")){
    findBlog.likes += 1;
    await findBlog.save();
    } 
  if(addComment){
    findBlog.views += 1;
    await findBlog.save();
    }
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
  const id = req.params.id;
  const commentId = await blogModel
    .findById(id)
    .populate("blog", { title: 1, content: 1, author: 1 });

  return res.status(200).send({ status: true, commentId });
};

const updateComment = async (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id;
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
