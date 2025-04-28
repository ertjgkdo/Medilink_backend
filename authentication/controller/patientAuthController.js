const Patient = require("../../patients/model/patient");
const generateToken = require("../utils/generateToken");
const { hashPassword, comparePasswords } = require("../services/authService");

exports.patientSignup = async (req, res) => {
  try {
    const { name, email, phone, dob, address, gender, bloodGroup, password } = req.body;
    if (!name || !phone || !dob || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await Patient.findOne({ $or: [{ phone }, { email }] });
    if (existingUser)
      return res.status(400).json({ error: "Phone number already registered" });

    const hashedPassword = await hashPassword(password);

    const patient = new Patient({
      name,
      email,
      phone,
      dob: new Date(dob),
      address,
      gender,
      bloodGroup,
      password: hashedPassword,
      role: "Patient", // fixed role
    });

    await patient.save();

    const token = generateToken(patient._id);

    // Only send selected fields (no password!)
    const responsePatient = {
      id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      dob: patient.dob,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup
    };

    res.status(201).json({ message: "Signup successful", user: responsePatient, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.patientLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const patient = await Patient.findOne({ phone }).select("+password");

    if (!patient) return res.status(400).json({ error: "Invalid phone" });

    const isMatch = await comparePasswords(password, patient.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = generateToken(patient._id, patient.role);

    // Only send selected fields (no password!)
    const responsePatient = {
      id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      dob: patient.dob,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup
    };

    res.status(200).json({ message: "Login successful", user: responsePatient, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

