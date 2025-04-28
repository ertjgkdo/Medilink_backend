const express = require("express");
const doctorController = require("../controller/doctor_controller");

const docRouter = express.Router();

docRouter.get("/doctors", doctorController.getAllDoctors);
docRouter.get("/doctors/:id", doctorController.getDoctorById);

module.exports = docRouter;