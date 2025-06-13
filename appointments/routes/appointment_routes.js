const express = require("express");
const slotController=require("../controller/appointment_controller");
const auth = require("../../authentication/middlewares/auth");
const appointmentRouter = express.Router();

appointmentRouter.get('/slots', slotController.fetchAllSlots);
appointmentRouter.get('/slots/:id', slotController.fetchSlotById);
appointmentRouter.get('/slots/by-doctor/:id', slotController.fetchSlotsByDoctor);

module.exports = appointmentRouter;