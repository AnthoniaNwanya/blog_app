const express = require("express");
const auth = require("../jwtAuth");
const controller = require("../controllers/user.cont");
const router = express.Router();

const { useToken } = require("../middleware/token");
// authorCheck middleware validates only the owner of the account can make changes to or delete their account
const { authorCheck } = require("../middleware/verifyOwner");

router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUsersById);
router.put("/:id", useToken, authorCheck, controller.updateUser);
router.delete("/:id", useToken, authorCheck, controller.deleteUser);

module.exports = router;
