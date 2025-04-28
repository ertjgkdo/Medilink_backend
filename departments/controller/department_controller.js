const departmentService = require("../services/department_service");
const departmentController = {
    async getAllDepartments(req, res) {
      try {
        const departments = await departmentService.getAllDepartments();
        res.status(200).json(departments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async getDepartmentById(req, res) {
      try {
        const department = await departmentService.getDepartmentById(req.params.id);
        if (!department) {
          return res.status(404).json({ error: "Department not found" });
        }
        res.status(200).json(department);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };
  
  module.exports = departmentController;