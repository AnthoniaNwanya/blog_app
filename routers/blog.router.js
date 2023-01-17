const express = require("express");
const controller = require("../controllers/blog.cont");
const router = express.Router();

const { useToken } = require("../middleware/token");
// blogOwnerCheck middleware validates only the owner of the blog can make changes to or delete their blog
const { blogOwnerCheck } = require("../middleware/verifyOwner");

router.post("/", useToken, controller.createBlog);
router.get("/", controller.getBlogs);
router.get("/id/:id?", controller.getBlogById);
router.put("/:id?", useToken, blogOwnerCheck, controller.updateBlog);
router.delete("/:id?", useToken, blogOwnerCheck, controller.deleteBlog);

module.exports = router;
