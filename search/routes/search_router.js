const express = require("express");
const Doctor = require("../../doctors/model/doctors.js");
const Hospital = require("../../hospitals/model/hospitals.js");
const Department = require("../../departments/model/departments.js");
const Slots = require("../../appointments/model/appointment_slots.js");

const searchRouter = express.Router();

searchRouter.get("/doctors", async(req,res)=>{
    try{
        const {name} = req.query;
        if (!name) {
            return res.status(400).json({ error: "Doctor name is required" });
        }

        const doctors = await Doctor.find({
            name: { $regex: name, $options: "i" }, // Case-insensitive search
        });

        res.json(doctors);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
searchRouter.get("/departments", async(req,res)=>{
    try{
        const {name} = req.query;

        if (!name) {
            return res.status(400).json({ error: "Department name is required" });
        }

        const departments = await Department.find({
            name: { $regex: name, $options: "i" }, // Case-insensitive search
        }).populate("hospital");

        res.json(departments);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
searchRouter.get("/hospitals", async(req,res)=>{
    try{
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "Hospital name is required" });
        }

        const hospitals = await Hospital.find({
            name: { $regex: name, $options: "i" }, // Case-insensitive search
        });

        res.json(hospitals);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
searchRouter.get("/appointments", async(req, res)=>{
    const { date, department, hospital, doctor, startTime, endTime } = req.query;

    // Build query based on filters
    const query = {};

    // Filter by date
    if (date) {
        query.date = date;
    }
    
    // Filter by department
    if (department) {
        query.department = department;
    }
    
    // Filter by hospital name
    if (hospital) {
        query.hospitalName = hospital;
    }

    // Filter by doctor
    if (doctor) {
        query.doctor = doctor;
    }

    // Filter by startTime (if provided)
    if (startTime) {
        query.startTime = { $gte: new Date(startTime) }; // Greater than or equal to the provided start time
    }

    // Filter by endTime (if provided)
    if (endTime) {
        query.endTime = { $lte: new Date(endTime) }; // Less than or equal to the provided end time
    }

    const appointmentSlots = await AppointmentSlot.find(query);

    res.json(appointmentSlots);

})
module.exports = searchRouter;