const Hospital = require("../model/hospitals");
const hospitalService = {
    async getAllHospitals() {
      return await Hospital.find().select("-__v");
    },
  
    async getHospitalById(id) {
      return await Hospital.findById(id).populate("departments").select("-__v");
    },
  };
  
  module.exports = hospitalService;