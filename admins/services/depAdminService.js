const Doctor = require('../../doctors/model/doctors');
const Department = require('../../departments/model/departments');

// Service function to create a doctor for a specific department
const createDoctorForDepartment = async (departmentId, doctorData, user) => {
  // Check if the department exists
  const department = await Department.findById(departmentId).populate('admin');
  if (!department) {
    throw new Error('Department not found');
  }

  // Ensure the logged-in user is the department admin
  if (department.admin._id.toString() !== user._id.toString()) {
    throw new Error('You are not authorized to add a doctor to this department');
  }

  // Create the doctor and associate with the department
  const doctor = new Doctor({
    ...doctorData,
    dep_id: department._id, // Associate the doctor with the department
  });

  // Save the doctor to the database
  await doctor.save();

  return doctor;
};

module.exports = {
  createDoctorForDepartment,
};
