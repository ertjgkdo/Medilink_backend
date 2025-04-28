const patientService = require("../services/patientService");
const viewProfile = async (req, res) => {
    try {
      const patient = await patientService.getPatientById(req.user);
      if (!patient) return res.status(404).json({ message: 'User not found' });
  
      res.json({ patient });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const editProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const updatedPatient = await patientService.updatePatientById(id, updates);
      if (!updatedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.json(updatedPatient);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  module.exports = {
    viewProfile,
    editProfile,
  };