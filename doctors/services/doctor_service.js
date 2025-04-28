const Doctor = require("../model/doctors");
const doctorService = {
    async getAllDoctors() {
      return await Doctor.find().select("-__v");
    },
  
    async getDoctorById(id) {
      return await Doctor.findById(id).select("-__v");
    },
  };
  
  module.exports = doctorService;