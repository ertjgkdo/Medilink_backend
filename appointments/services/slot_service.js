const Slot = require("../model/appointment_slots");
const Schedule = require("../../doctors/model/schedule");
const cron = require("node-cron");

//Function to generate slots for a given date
const generateSlotsForDate = async (dateString) => {
    const targetDate = new Date(dateString);
    const dayOfWeek = targetDate.toLocaleDateString("en-US", { weekday: "long" });

    //Get all schedules for this specific day
    const schedules = await Schedule.find({ day: dayOfWeek, isAvailable: true }).populate("doctor");

    let slots = [];

    for (let schedule of schedules) {
        let { startTime, endTime, doctor } = schedule;
        //Slot duration in minutes 
        let slotDuration = 30; 
        let currentTime = convertToMinutes(startTime);
        let endTimeMinutes = convertToMinutes(endTime);
        // console.log(currentTime);

        while (currentTime + slotDuration <= endTimeMinutes) {
            let startTimeStr = convertToTimeString(currentTime);
            let endTimeStr = convertToTimeString(currentTime + slotDuration);

            slots.push({
                doctor: doctor,
                date: targetDate,
                startTime: startTimeStr,
                endTime: endTimeStr,
                isBooked: false,
            });
            
            currentTime += slotDuration; 
            // Move to next slot
        }
    }

    const slotRes = await Slot.insertMany(slots);
    console.log(`Inserted ${slotRes.length}  slots successfully!`);
    // console.log(`Slots created for ${dateString}`);
};

//Convert "08:30" to minutes (8*60 + 30 = 510)
const convertToMinutes = (timeStr) => {
    let [time, period] = timeStr.split(" "); // Split "08:00 AM" into ["08:00", "AM"]
    let [hours, minutes] = time.split(":").map(Number); // Convert "08:00" into [8, 0]

    if (period === "PM" && hours !== 12) {
        hours += 12; // Convert PM hours (e.g., 1 PM -> 13)
    } else if (period === "AM" && hours === 12) {
        hours = 0; // Convert "12 AM" to 0
    }

    return hours * 60 + minutes;
};


//Convert minutes to "HH:mm" format
const convertToTimeString = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

// Remove past slots & generate new ones daily
cron.schedule("0 0 * * *", async () => {
    const today = new Date();

    // Delete past unbooked slots
    let pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 1);
    await Slot.deleteMany({ date: pastDate, isBooked: false });

    //Generate slots for the rolling 7th day
    let newFutureDate = new Date(today);
    newFutureDate.setDate(today.getDate() + 6);
    let futureDateString = newFutureDate.toISOString().split("T")[0];

    await generateSlotsForDate(futureDateString);
});

module.exports = { generateSlotsForDate };
