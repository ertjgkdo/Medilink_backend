const mongoose = require("mongoose");
const booked_slotSchema = mongoose.Schema({
    date: {type: Date,required: true,},
    startTime: {type: String,required: true},
    endTime: {type: String,required: true},
    isBooked: {type: Boolean,required: true,default:false},
    doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    patient:{type: mongoose.Schema.Types.ObjectId, ref: "Patient"}
});

const Booked_Slot = mongoose.model("Booked_Slot", booked_slotSchema);
module.exports = Booked_Slot;