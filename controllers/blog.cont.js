const userModel = require("../models/user.model");
const blogModel = require("../models/blog.model");
const commentModel = require("../models/comment.model");

const createBlog = async (req, res) => {
  const { title, content, author, tags, comments } = req.body;
  const ownerID = req.User.validUser_id;
  const findOwner = await userModel.findById({ _id: ownerID });
  try {
    const addBlog = await blogModel.create({
      title,
      content,
      author: findOwner,
      tags,
      timestamp: Date.now(),
      comments,
    });
    const saveBlog = await addBlog.save();

    // Add and save created blog in "blogs" field of User schema.
    findOwner.blogs = findOwner.blogs.concat(saveBlog._id);
    await findOwner.save();
    res.status(201).send(saveBlog);
  } catch (err) {
    res.send(err);
  }
};

const getBlogs = async (req, res) => {
  const comments = await commentModel.find({});
  const getBlog = await blogModel
    .find({})
    .populate("author", { _id: 1, full_name: 1 })
    .populate("comments", { commenter: 1, comment: 1 });

  return res.status(200).send({ status: true, getBlog });
};

const getBlogById = async (req, res) => {
  const id = req.query.id;
  const blogId = await blogModel
    .findById(id)
    .populate("author", { _id: 1, full_name: 1 })
    .populate("comments", { commenter: 1, comment: 1 });

  // Increment view count when a blog is requested
  blogId.views += 1;
  await blogId.save();

  return res.status(200).send({ status: true, blogId });
};

const updateBlog = async (req, res) => {
  const id = req.query.id;
  const blogUpdate = req.body;
  const updatedBlog = await blogModel.findByIdAndUpdate(id, blogUpdate, {
    new: true,
  });
  return res.status(202).send({
    message: "Update was successful",
    data: updatedBlog,
  });
};

const deleteBlog = async (req, res) => {
  const id = req.query.id;
  const delBlog = await blogModel.findByIdAndDelete(id);
  return res
    .status(200)
    .send({ message: "Blog deleted successfully", data: delBlog });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
