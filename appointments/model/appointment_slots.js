const mongoose = require("mongoose");
const slotSchema = mongoose.Schema({
    date: {type: Date,required: true,},
    startTime: {type: String,required: true},
    endTime: {type: String,required: true},
    isBooked: {type: Boolean,required: true,default:false},
    doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }
});

const Slot = mongoose.model("Appointment_Slot", slotSchema);
module.exports = Slot;