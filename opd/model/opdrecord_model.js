const mongoose = require("mongoose");
const Doctor = require("../../doctors/model/doctors");
const Department = require("../../departments/model/departments");
const OPD_Card = require("./opdcard_model");
const recordSchema = mongoose.Schema({
    opd_id: { type: mongoose.Schema.Types.ObjectId, ref: "OPD_Card", },
    visitdate: { type: Date,required:true, default:Date.now},
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department",}, 
    doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor",},
    time:{type:String, required: true},
    chiefcomplain:{type: String},
    examination:{type: String},
    diagnosis:{type: String, required: true}, 
    vitals:{bp:{type:String},
                temp: {type:String},
                wt: {type:String},
                ht:{type: String},    
            },
    prescription:[{medicine: {type: String}, 
                duration: {type:String}, 
                instruction:{type:String},}],
    followup:{type: Date,required: false}
});

const Records = mongoose.model("Records", recordSchema);
module.exports = Records;