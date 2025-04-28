const mongoose = require("mongoose");
const OPD_Card = require("../../opd/model/opdcard_model");
const userSchema = mongoose.Schema({
    name: {type: String,required: true,},
    email: {type: String,required: false,unique: true, sparse:true},
    phone: {type: String,required: true,maxlength:14,unique: true},
    dob: {type: Date,required: true,},
    address: {type: String,required: false,},
    gender: {type: String,required: true,},
    bloodGroup: {type: String,required: true},
    password:{type: String,required: true, minlength: 6, select: false},
    role:{type: String,enum: ["Patient", "Doctor", "admin"], default: "Patient"},
    opd_cards:[{ type: mongoose.Schema.Types.ObjectId, ref: "OPD_Card",}]
},{timestamps: true});

const Patient = mongoose.model("Patient", userSchema);
module.exports = Patient;