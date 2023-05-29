const db = require("../models");
const Login = db.login;
const Employee = db.employees;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).json({
      message: "Username can not be empty!",
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).json({
      message: "Password can not be empty!",
    });
    return;
  }

  const { username, password } = req.body;

  try {
    const login = await Employee.findOne({
      where: {
        username,
      },
    });

    if (login) {
      const isPasswordValid = bcrypt.compare("Password@123", password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { username: login.username, role: login.role, id: login.id },
          "PI826372HBYQ02837H",
          { expiresIn: "3h" }
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
