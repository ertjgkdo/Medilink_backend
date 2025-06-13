const { superAdminService} = require("../services/superAdminService");

const createHospitalWithDepartments = async (req, res) => {
  try {
    const hospital = await superAdminService(req.body);

    res.status(201).json({
      message: "Hospital created successfully",
      hospital
    });
  } catch (error) {
    console.error("Error in createHospitalWithDepartments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createHospitalWithDepartments
};

