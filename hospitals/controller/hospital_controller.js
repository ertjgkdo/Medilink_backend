const hospitalService = require("../services/hospital_services");
const hospitalController = {
    async getAllHospitals(req, res) {
      try {
        const hospitals = await hospitalService.getAllHospitals();
        res.status(200).json(hospitals);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async getHospitalById(req, res) {
      try {
        const hospital = await hospitalService.getHospitalById(req.params.id);
        if (!hospital) {
          return res.status(404).json({ error: "Hospital not found" });
        }
        res.status(200).json(hospital);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };
  
  module.exports = hospitalController;