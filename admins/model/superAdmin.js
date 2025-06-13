const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Super Admin' }
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
