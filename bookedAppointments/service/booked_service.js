const BookedSlots = require("../../booking/model/booked_slots");
exports.getAllBookedAppointments = async () => {
    return await BookedSlots.find().populate("patient").populate("doctor");
  };
  
  exports.getBookedAppointmentById = async (id) => {
    return await BookedSlots.findById(id).populate("patient").populate("doctor");
  };
  
  exports.getBookedAppointmentsByPatient = async (patientId) => {
    return await BookedSlots.find({ patient: patientId }).populate("doctor");
  };
  exports.getBookedAppointmentsByDoctor = async (doctorId) => {
    return await BookedSlots.find({ doctor: doctorId }).populate("patient");
  };