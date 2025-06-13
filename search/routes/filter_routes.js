const express = require("express");
const Hospital = require("../../hospitals/model/hospitals.js");
const Appointment = require("../../appointments/model/appointment_slots.js");

const filterRouter = express.Router();

filterRouter.post('/find', async (req, res) => {
    try {
        const { hospital, department, doctor, date, timeSlot } = req.body;

        const query = {};

        if (doctor) query.doctor = doctor; // 🛠 correct field
        if (date) query.date = date;
        // time filtering will need special handling because slot has startTime, endTime separately

        let slots = await Appointment.find(query)
            .populate({
                path: 'doctor',
                select: 'name dep_id', 
                populate: {
                    path: 'dep_id',
                    select: 'name hospital', 
                    populate: {
                        path: 'hospital',
                        select: 'name', // 
                    }
                }
            });

        // Now manually filter by departmentId and hospitalId if provided
        if (department) {
            slots = slots.filter(slot => slot.doctor?.dep_id?._id.toString() === department);
        }
        if (hospital) {
            slots = slots.filter(slot => slot.doctor?.dep_id?.hospital?._id.toString() === hospital);
        }
        if (timeSlot) {
            slots = slots.filter(slot => slot.startTime === timeSlot);
        }
        return res.status(200).json({ slots });
    } catch (error) {
        console.error('Error searching appointments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

filterRouter.get("/hospital-summary" , async (req, res) => {
    try {
        const hospitals = await Hospital.find({})
          .select('name departments') 
          .populate({
            path: 'departments',
            select: 'name doctors', 
            populate: {
              path: 'doctors',
              select: 'name' 
            }
          });
    
        res.json(hospitals);
      } catch (error) {
        console.error('Error fetching hospital summaries:', error);
        res.status(500).json({ message: 'Server Error' });
      }
  });
  

module.exports = filterRouter;