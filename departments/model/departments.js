const mongoose = require("mongoose");
const Doctor = require("../../doctors/model/doctors");
const Hospital = require("../../hospitals/model/hospitals");
const departmentSchema = mongoose.Schema({
    name: {type: String,required: true,},
    description: {type: String,required: false},
    phone: {type: String,required: true,maxlength:14,unique: true},
   hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", },
   admin: { type: mongoose.Schema.Types.ObjectId, ref: "DepartmentAdmin" },
   doctors:[{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }]
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;