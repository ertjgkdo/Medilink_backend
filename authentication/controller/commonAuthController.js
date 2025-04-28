const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../../patients/model/patient");
const Doctor = require("../../doctors/model/doctors"); // or Admin
const { hashPassword, comparePasswords } = require("../services/authService");

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, "passwordKey");
    const { id, role } = decoded;

    let UserModel;
    if (role === "Patient") UserModel = Patient;
    else if (role === "Doctor") UserModel = Doctor;
    else return res.status(400).json({ error: "Invalid role" });

    const user = await UserModel.findById(id).select("+password");

    const isMatch = await comparePasswords(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Old password incorrect" });

    user.password = await hashPassword(newPassword);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.authRoot = (req, res) => {
  res.send("Auth endpoint working");
};
