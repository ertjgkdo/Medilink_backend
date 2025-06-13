const express = require("express");
const auth = require("../../authentication/middlewares/auth");
const superAdminrouter = express.Router();
const { createHospitalWithDepartments } = require("../controllers/superAdminController");


superAdminrouter.post("/create-hospital",auth,  createHospitalWithDepartments);

module.exports = superAdminrouter;
