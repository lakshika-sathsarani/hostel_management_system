const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    if (savedUser) {
      res.status(201).send({ message: "success!", data: savedUser });
    } else {
      res.status(400).send({ message: "failed!", data: savedUser });
    }
  } catch (e) {
    console.log("Error in Add User", e);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).send({ message: "success!", data: users });
    } else {
      res.status(400).send({ message: "failed!", data: users });
    }
  } catch (error) {
    console.log("Error in Get All Users", error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send({ message: "success!", data: user });
    } else {
      res.status(400).send({ message: "failed!", data: user });
    }
  } catch (error) {
    console.log("Error in Get User", error);
  }
};

exports.deleteUser = async (res, req) => {
  try {
    const user = await User.findByIdAndDelete(res.params.id);
    if (user) {
      res.status(200).send({ message: "success!", data: user });
    } else {
      res.status(400).send({ message: "failed!", data: user });
    }
  } catch (error) {
    console.log("Error in Delete User", error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.updateOne({ _id: req.params.id }, { ...data });
    if (result) {
      res.status(200).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in Update User", error);
  }
};

exports.updateStudentHostel = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.updateOne(
      { _id: req.params.id },
      { hostel: data.hostel }
    );
    if (result) {
      res.status(200).send({ message: "success!", data: result });
    } else {
      res.status(400).send({ message: "failed!", data: result });
    }
  } catch (error) {
    console.log("Error in Update Student", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await User.findOne({
      $and: [{ id: username }, { password }],
    });
    if (result) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            _id: result._id,
            role: result.role,
          },
        },
        "secret"
      );
      res.status(200).send({
        message: "success",
        data: {
          token,
          user: result,
        },
      });
    } else {
      res.status(401).send({ message: "Check email or password" });
    }
    console.log("login succes ", result);
  } catch (err) {
    console.log("login requsee eror ", err);
    res.status(500).send({ message: "failed", data: err });
  }
};
