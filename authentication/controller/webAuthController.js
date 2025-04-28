const Doctor = require("../../doctors/model/doctors");
const HospitalAdmin = require("../../admins/model/hospitalAdmin");
const DepartmentAdmin = require("../../admins/model/departmentAdmin");
const SuperAdmin = require("../../admins/model/superAdmin");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.portalLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    let user;

    // Check based on role
    if (role === "Doctor") {
      user = await Doctor.findOne({ email }).select("+password");
    } else if (role === "Hospital Admin") {
      user = await HospitalAdmin.findOne({ email }).select("+password");
    } else if (role === "Department Admin") {
      user = await DepartmentAdmin.findOne({ email }).select("+password");
    } else if (role === "Super Admin") {
      user = await SuperAdmin.findOne({ email }).select("+password");
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    // User not found
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generating token
    const token = generateToken(user._id, role);

    // Not sending back the password
    const { password: pw, ...userWithoutPassword } = user.toObject();

    res.json({ user: userWithoutPassword, token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
