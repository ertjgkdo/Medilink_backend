const express = require("express");
const hospitalController = require("../controller/hospital_controller.js");
const hospRouter = express.Router();

hospRouter.get("/hospitals", hospitalController.getAllHospitals);
hospRouter.get("/hospitals/:id", hospitalController.getHospitalById);

module.exports = hospRouter;