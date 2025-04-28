const mongoose = require('mongoose');

const hospitalAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  role: { type: String, default: 'hospital_admin' }
});

module.exports = mongoose.model('HospitalAdmin', hospitalAdminSchema);
