const appointmentService = require("../services/appointment_service");

const fetchAllSlots = async (req, res) => {
    try {
      const slots = await appointmentService.getAllSlots();
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const fetchSlotById = async (req, res) => {
    try {
      const slot = await appointmentService.getSlotById(req.params.id);
      if (!slot) return res.status(404).json({ error: 'Slot not found' });
  
      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const fetchSlotsByDoctor = async (req, res) => {
    try {
      const doctorId = req.params.id;
      if (!doctorId) return res.status(400).json({ message: 'Doctor ID is required' });
  
      const slots = await appointmentService.getSlotsByDoctor(doctorId);
      res.status(200).json(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    fetchAllSlots,
    fetchSlotById,
    fetchSlotsByDoctor,
  };