const doctorService = require("../services/doctor_service");
const doctorController = {
    async getAllDoctors(req, res) {
      try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async getDoctorById(req, res) {
      try {
        const doctor = await doctorService.getDoctorById(req.params.id);
        if (!doctor) {
          return res.status(404).json({ error: "Doctor not found" });
        }
        res.status(200).json(doctor);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };
  
  module.exports = doctorController;