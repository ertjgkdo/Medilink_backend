const depAdminService  = require('../services/depAdminService');

// Controller function to create a doctor
const createDoctor = async (req, res) => {
  const { departmentId } = req.params;
  const doctorData = req.body;

  try {
    // Call service to create the doctor
    const doctor = await depAdminService.createDoctorForDepartment(departmentId, doctorData, req.user);
    return res.status(201).json({ message: 'Doctor created successfully', doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
};
