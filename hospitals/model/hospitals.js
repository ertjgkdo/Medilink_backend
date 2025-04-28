const mongoose = require("mongoose");
const Department = require("../../departments/model/departments");
const hospitalSchema = mongoose.Schema({
    name: {type: String,required: true,},
    phone: {type: String,required: true,maxlength:14,unique: true},
    address: {type: String,required: true,},
    description:{type: String, required: false}, 
    image:{type:String},
    departments:[{ type: mongoose.Schema.Types.ObjectId, ref: "Department",}]
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;