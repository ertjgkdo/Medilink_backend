const Schedule = require("../model/schedule");
const scheduleService = {
    async getAllSchedules() {
      return await Schedule.find().select("-__v");
    },
  
    async getScheduleById(id) {
      return await Schedule.findById(id).select("-__v");
    },
  };
  
  module.exports = scheduleService;