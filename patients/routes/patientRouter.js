const express = require("express");
const auth = require("../../authentication/middlewares/auth");
const patientController = require("../controller/patientController");
const patientRouter = express.Router();

patientRouter.get('/profile/view', auth, patientController.viewProfile);
patientRouter.put('/profile/edit/:id', auth, patientController.editProfile);

module.exports = patientRouter;