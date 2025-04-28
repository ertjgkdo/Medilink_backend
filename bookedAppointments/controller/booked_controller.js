const bookedService = require("../service/booked_service");
exports.getAll = async (req, res) => {
    try {
      const appointments = await bookedService.getAllBookedAppointments();
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getById = async (req, res) => {
    try {
      const appointment = await bookedService.getBookedAppointmentById(req.params.id);
      if (!appointment) return res.status(404).json({ message: "Not found" });
      res.status(200).json(appointment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getByPatient = async (req, res) => {
    try {
      const patientId = req.user; 
      const appointments = await bookedService.getBookedAppointmentsByPatient(patientId);
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getByDoctor = async (req, res) => {
    try {
      const doctorId = req.user; // assuming doctor is logged in
      const appointments = await bookedService.getBookedAppointmentsByDoctor(doctorId);
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };