const Patient = require("../model/patient");

const getPatientById = async (id) => {
    return await Patient.findById(id);
  };
  
  const updatePatientById = async (id, updates) => {
    return await Patient.findByIdAndUpdate(id, updates, { new: true });
  };
  
  module.exports = {
    getPatientById,
    updatePatientById,
  };