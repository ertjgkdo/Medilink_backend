const mongoose = require("mongoose");
const Schedule = require("./schedule");
const docSchema = mongoose.Schema({
    name: {type: String,required: true,},
    email: {type: String,required: false,unique: true, sparse:true},
    phone: {type: String,required: true,maxlength:14,unique: true},
    title: {type: String,required: true,},
    dep_id: {type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    schedule:[{type: mongoose.Schema.Types.ObjectId, ref: "Schedule"}],
    image:{type:String, required: false},
    password:{type: String,required: false, minlength: 6},
    role:{type: String,enum: ["general_user", "doctor", "admin"], default: "doctor"}
});

const Doctor = mongoose.model("Doctor", docSchema);
module.exports = Doctor;