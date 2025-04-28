const express = require("express");
const auth = require("../../authentication/middlewares/auth");
const controller = require("../controller/booked_controller");

const bookedRouter = express.Router();

bookedRouter.get("/patient", auth, controller.getByPatient);
bookedRouter.get("/doctor", auth, controller.getByDoctor);
bookedRouter.get("/:id", auth, controller.getById);
bookedRouter.get("/", auth, controller.getAll);


module.exports = bookedRouter;