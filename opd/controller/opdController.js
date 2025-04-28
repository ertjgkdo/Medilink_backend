const opdService = require("../services/opdService");

const getAllOPDCards = async (req, res) => {
    try {
      const cards = await opdService.getAllOPDCardsByPatient(req.params.patientId);
  
      if (!cards.length) {
        
        return res.status(200).json([]);
      }
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getOPDCard = async (req, res) => {
    try {
      const card = await opdService.getOPDCardById(req.params.opdId);
  
      if (!card) {
        return res.status(404).json({ message: "No OPD card with the id." });
      }
  
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllRecords = async (req, res) => {
    try {
      const records = await opdService.getAllRecordsByOPD(req.params.opdId);
  
      if (!records.length) {
        return res.status(404).json({ message: "No visit records found for this OPD card" });
      }
  
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getRecord = async (req, res) => {
    try {
      const record = await opdService.getRecordById(req.params.id);
  
      if (!record) {
        return res.status(404).json({ message: "No Record found" });
      }
  
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllOPDCards,
    getOPDCard,
    getAllRecords,
    getRecord,
  };