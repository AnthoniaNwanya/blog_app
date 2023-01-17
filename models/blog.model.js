const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const BlogSchema = new mongoose.Schema({
  id: ObjectId,
  title: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  reading_time: String,
  tags: Array,
  timestamp: Date,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

BlogSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
