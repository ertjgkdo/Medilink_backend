const express = require("express");
const AppointmentSlot = require("../../appointments/model/appointment_slots");
const BookedSlot = require("../model/booked_slots");
const cancelRouter = express.Router();

cancelRouter.post("/cancel/:slotId", async(req,res)=>{
    try{
        const slotId = req.params.slotId;

        const bookedSlot = await BookedSlot.findById(slotId);
        if (!bookedSlot) {
            return res.status(404).json({ error: "Booking not found" });
        }
        
        const restoredSlot = new AppointmentSlot({
            _id: bookedSlot._id, // Keep the same ID
            date: bookedSlot.date,
            startTime: bookedSlot.startTime,
            endTime: bookedSlot.endTime,
            doctor: bookedSlot.doctor
        });

        await restoredSlot.save();

        // Delete the booking from Booked_Slot
        await BookedSlot.deleteOne({ _id: slotId });
        res.json({ success: true, message: "Booking cancelled successfully" });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
module.exports = cancelRouter;