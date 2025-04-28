const OPD_Card = require("../model/opdcard_model");
const Records = require("../model/opdrecord_model");

const getAllOPDCardsByPatient = async (patientId) => {
    return OPD_Card.find({ patient: patientId })
      .populate("hospital")
      .populate("records")
      .select("-__v");
  };
  
  const getOPDCardById = async (opdId) => {
    return OPD_Card.findById(opdId)
      .populate("records")
      .populate("hospital")
      .select("-__v");
  };
  
  const getAllRecordsByOPD = async (opdId) => {
    return Records.find({ opd_id: opdId })
      .populate("doctor")
      .populate("department")
      .sort({ visit_date: -1 });
  };
  
  const getRecordById = async (recordId) => {
    return Records.findById(recordId).select("-__v");
  };
  
  module.exports = {
    getAllOPDCardsByPatient,
    getOPDCardById,
    getAllRecordsByOPD,
    getRecordById,
  };