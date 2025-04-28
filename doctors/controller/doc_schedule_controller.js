const scheduleService = require("../services/doc_schedule_service");
const scheduleController = {
    async getAllSchedules(req, res) {
      try {
        const schedules = await scheduleService.getAllSchedules();
        res.status(200).json(schedules);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async getScheduleById(req, res) {
      try {
        const schedule = await scheduleService.getScheduleById(req.params.id);
        if (!schedule) {
          return res.status(404).json({ error: "Schedule not found" });
        }
        res.status(200).json(schedule);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };
  
  module.exports = scheduleController;