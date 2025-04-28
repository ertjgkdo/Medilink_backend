const express = require("express");
const scheduleController = require("../controller/doc_schedule_controller");
const auth = require("../../authentication/middlewares/auth");
const schedRouter = express.Router();

schedRouter.get("/schedules", scheduleController.getAllSchedules);
schedRouter.get("/schedules/:id", scheduleController.getScheduleById);

module.exports = schedRouter;