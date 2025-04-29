const Hospital = require("../../hospitals/model/hospitals");
const Department = require("../../departments/model/departments");
const DepartmentAdmin = require("../model/departmentAdmin");
const bcrypt = require("bcryptjs");

async function superAdminService(data) {
  const { name, phone, address, description, image, departments } = data;

//  Creating Hospital
  const hospital = await Hospital.create({
    name,
    phone,
    address,
    description,
    image
  });

  const departmentIds = [];

  // Creating Departments and Admins
  for (const dept of departments) {
    const hashedPassword = await bcrypt.hash(dept.admin.password, 10);

    // Create Department Admin
    const depAdmin = await DepartmentAdmin.create({
      name: dept.admin.name,
      email: dept.admin.email,
      password: hashedPassword,
      department: null 
    });

    // Create Department
    const department = await Department.create({
      name: dept.name,
      phone: dept.phone,
      description: dept.description,
      hospital: hospital._id,
      admin: depAdmin._id
    });

    // Update Admin with Department ID
    depAdmin.department = department._id;
    await depAdmin.save();

    departmentIds.push(department._id);
  }

  // Updating Hospital with Department IDs
  hospital.departments = departmentIds;
  await hospital.save();

  return hospital;
}

module.exports = {
    superAdminService
};