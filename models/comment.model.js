const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const CommentSchema = new mongoose.Schema({
  id: ObjectId,
  comment: {
    type: String,
  },
  timestamp: Date,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  commenter: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
