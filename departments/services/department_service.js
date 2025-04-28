const Department = require("../model/departments");

const departmentService = {
    async getAllDepartments() {
      return await Department.find().select("-__v");
    },
  
    async getDepartmentById(id) {
      return await Department.findById(id).populate("doctors").select("-__v");
    },
  };
  
  module.exports = departmentService;