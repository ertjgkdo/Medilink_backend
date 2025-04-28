const express = require("express");
const departmentController = require("../controller/department_controller");
const auth = require("../../authentication/middlewares/auth");
const depRouter = express.Router();

depRouter.get("/departments", departmentController.getAllDepartments);
depRouter.get("/departments/:id", departmentController.getDepartmentById);

module.exports = depRouter;