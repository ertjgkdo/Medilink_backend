const mongoose = require("mongoose");
const Patient = require("../../patients/model/patient");
const Hospital = require("../../hospitals/model/hospitals");
const Records = require("./opdrecord_model");
const cardSchema = mongoose.Schema({
    opd_no: {type: String,required: true,default:Date.now.toString()},
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient",},
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital",}, 
    records:[{ type: mongoose.Schema.Types.ObjectId, ref: "Records",}],
    followup:{type: Date,required: false}
},{timestamps: true});

const OPD_Card = mongoose.model("OPD_Card", cardSchema);
module.exports = OPD_Card;