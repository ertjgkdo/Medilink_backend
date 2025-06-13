const mongoose = require('mongoose');

const departmentAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  role: { type: String, default: 'Department Admin' }
});

const DepartmentAdmin = mongoose.model("DepartmentAdmin", departmentAdminSchema);

module.exports = DepartmentAdmin;