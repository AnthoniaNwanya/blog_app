const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user.model");
require("dotenv").config();

// Create a user account
const signup = async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!(full_name && email && password)) {
    res.status(400).send("Input user details");
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).send("User already exists");
    }
    // Encrypt password before storing into database
    const encryptPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      full_name,
      email: email.toLowerCase(),
      password: encryptPass,
    });
    res.status(201).send(newUser);
  } catch (err) {
    return err;
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("Please provide your login details");
  }
  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) {
      res.status(404).send("User does not exist. Please register");
    }

    if (validUser) {
      await bcrypt.compare(password, validUser.password);
    }
    // Create token for user validation and expire token in 1hr
    const token = jwt.sign(
      { validUser_id: validUser._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    validUser.token = token;
    res.status(200).send(validUser);
  } catch (err) {
    return err;
  }
};

module.exports = {
  signup,
  signin,
};
