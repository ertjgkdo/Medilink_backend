const mongoose = require("mongoose");
const scheduleSchema = mongoose.Schema({
    day: {type: String,required: true,},
    startTime: {type: String,required: true},
    endTime: {type: String,required: true},
   isAvailable: {type:Boolean, required:true},
   doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;