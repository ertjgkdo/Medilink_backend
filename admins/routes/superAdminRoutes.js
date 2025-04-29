const express = require("express");
const superAdminrouter = express.Router();
const { createHospitalWithDepartments } = require("../controllers/superAdminController");

// POST /api/superadmin/create-hospital-with-departments
superAdminrouter.post("/create-hospital", createHospitalWithDepartments);

module.exports = superAdminrouter;
