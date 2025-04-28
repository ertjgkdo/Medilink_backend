const Slots = require("../model/appointment_slots");

const getAllSlots = async () => {
    return await Slots.find().select('-__v');
  };
  
  const getSlotById = async (id) => {
    return await Slots.findById(id).select('-__v');
  };
  
  const getSlotsByDoctor = async (doctorId) => {
    return await Slots.find({ doctor: doctorId });
  };
  
  module.exports = {
    getAllSlots,
    getSlotById,
    getSlotsByDoctor,
  };