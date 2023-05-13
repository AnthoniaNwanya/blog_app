const express = require("express");
const controller = require("../controllers/comment.cont");
const router = express.Router();

router.post("/:id", controller.createComment);
router.get("/", controller.getComments);
router.get("/:id", controller.getCommentById);
router.put("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;
