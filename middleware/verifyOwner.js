const userModel = require("../models/user.model");

const blogOwnerCheck = async (req, res, next) => {
  const entryID = req.User.validUser_id;
  const currUser = await userModel.findById(entryID);

  // Iterate over blog id in user model
  const mapUserToBlog = currUser.blogs.map((blog) => {
    return blog.toString();
  });

  // Check if the requested blog id is contained in iterated blogs
  const checkInclusion = mapUserToBlog.includes(req.query.id);

  if (!checkInclusion) {
    return res
      .status(403)
      .send("Only blog owners are authorized to perform this action");
  }

  next();
};

const authorCheck = async (req, res, next) => {
  const entryID = req.User.validUser_id;
  const currUser = await userModel.findById(entryID);
  const currUserId = currUser._id.toString();

  // Check if the user making the request is the account owner
  if (currUserId !== req.query.id) {
    return res
      .status(403)
      .send("Only account owners are authorized to perform this action");
  } else {
    next();
  }
};
module.exports = {
  blogOwnerCheck,
  authorCheck,
};
