const {handleBooking} = require("../service/booking_service");
const bookAppointment = async (req, res) => {
    try {
      const { slot_Id, user_id } = req.body;
      const result = await handleBooking(slot_Id, user_id);
      res.json({ success: true, message: "Appointment booked successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = { bookAppointment };

  