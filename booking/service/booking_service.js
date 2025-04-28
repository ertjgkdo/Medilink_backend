const Slots = require("../../appointments/model/appointment_slots");
const BookedSlots = require("../model/booked_slots");

const handleBooking = async (slot_Id, user_id) => {
    const slot = await Slots.findById(slot_Id);
  
    if (!slot) {
      throw new Error("Appointment slot not found");
    }
  
    const bookedSlot = new BookedSlots({
      _id: slot._id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: true,
      doctor: slot.doctor,
      patient: user_id,
    });
  
    await bookedSlot.save();
    await Slots.deleteOne({ _id: slot_Id });
  
    return bookedSlot;
  };
  
  module.exports = { handleBooking };