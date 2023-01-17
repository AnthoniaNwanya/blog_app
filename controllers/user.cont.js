const userModel = require("../models/user.model");

const getUsers = async (req, res) => {
  const foundUser = await userModel.find({}).populate("blogs", { title: 1 });
  if (foundUser) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send("User not found");
  }
};

const getUsersById = async (req, res) => {
  const reqUser = req.query.id;
  const foundUser = await userModel
    .findById(reqUser)
    .populate("blogs", { title: 1 });
  if (foundUser) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send("User not found");
  }
};

const updateUser = async (req, res) => {
  const id = req.query.id;
  const userUpdate = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, userUpdate, {
      new: true,
    });

    return res.status(202).send({
      message: "User update was successful",
      data: updatedUser,
    });
  } catch (err) {
    res.status(304).send("Unable to perform update");
  }
};

const deleteUser = async (req, res) => {
  const id = req.query.id;
  const deletedUser = await userModel.findByIdAndDelete(id);

  if (!deletedUser) {
    res.status(409).send("Unable to delete user");
  } else {
    res.status(200).send({
      message: "Successfully deleted user",
      data: deletedUser,
    });
  }
};
module.exports = {
  getUsers,
  getUsersById,
  updateUser,
  deleteUser,
};
