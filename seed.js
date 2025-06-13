const mongoose = require("mongoose");
const fs = require('fs');
const csv = require('csv-parser');
const { generateSlotsForDate } = require("./hospital_directory/services/slot_service");
const Hospital = require("./hospital_directory/model/hospitals");
const Department = require("./hospital_directory/model/departments");
const Doctor = require("./doctors/model/doctors");
const DoctorSchedule = require("./hospital_directory/model/schedule");
const SuperAdmin = require("./admins/model/superAdmin");
const bcrypt = require("bcryptjs");

const OPD_Card = require("./opd/model/opdcard_model");
require("./index");
const createSuperAdmin = async () => {
    const existing = await SuperAdmin.findOne({ email: "superadmin@example.com" });
    if (existing) return console.log("Super Admin already exists.");
  
    const hashedPassword = await bcrypt.hash("supersecurepassword", 10);
    const superAdmin = new SuperAdmin({
      email: "superadmin@example.com",
      password: hashedPassword
    });
  
    await superAdmin.save();
    console.log(" Super Admin created.");
  };
async function seedDatabase() {
    try {
        await Hospital.deleteMany({});
        await Department.deleteMany({});
        await Doctor.deleteMany({});
        await DoctorSchedule.deleteMany({});
        createSuperAdmin();
        // Insert Hospitals
        await Hospital.insertMany([
            { name: "Kathmandu General Hospital", description: "Best hospital in Kathmandu", address: "Kathmandu, Nepal", phone: "01-4455667" },
            { name: "Pokhara Medical Center", description: "Leading healthcare in Pokhara", address: "Pokhara, Nepal", phone: "061-4456778" },
            { name: "Chitwan City Hospital", description: "Top facilities in Chitwan", address: "Chitwan, Nepal", phone: "056-4455999" }
        ]);
        const hospitals = await Hospital.find();
        // Read and Insert Departments
        
        let departments = [];
        fs.createReadStream("C:\\Users\\User\\Downloads\\departments.csv")
            .pipe(csv())
            .on("data", (row) => {
                departments.push({
                    name: row.department_name,
                    description: row.description,
                    phone: row.phone
                });
            })
            .on("end", async () => {
                try {
                    console.log(" Read departments CSV. Now inserting into DB...");
                    //  Assign hospitalId to departments (Round-robin assignment)
                    const departmentRes = await Department.insertMany(
                        departments.map((dept, index) => ({
                            ...dept,
                            hospital: hospitals[index % hospitals.length]._id
                        }))
                );
        // Update Hospitals with Department IDs
        for (const hospital of hospitals) {
            const hospitalDepartments = departmentRes
            .filter((dept) => dept.hospital && dept.hospital.toString() === hospital._id.toString())
            .map((dept) => dept._id);

            await Hospital.updateOne({ _id: hospital._id }, { $set: { departments: hospitalDepartments } });
        }

        console.log(`Inserted ${departmentRes.length} departments and updated hospitals successfully!`);

        // Read and Insert Doctors
        const doctors = [];
        fs.createReadStream("C:\\Users\\User\\hosp\\updated_doctors.csv")
                        .pipe(csv())
                        .on("data", (row) => {
                            doctors.push({
                                name: row.name,
                                email: row.email,
                                phone: row.phone,
                                title: row.title
                            });
                        })
                        .on("end", async () => {
                            try {
                                console.log("Read doctors CSV. Now inserting into DB...");
                                //  Assign departmentId to doctors (Round-robin assignment)
                                const doctorRes = await Doctor.insertMany(
                                    doctors.map((doc, index) => ({
                                        ...doc,
                                        dep_id: departmentRes[index % departmentRes.length]._id // ✅ Corrected key name
                                    }))
                                );

        console.log(`Inserted ${doctorRes.length} doctors successfully!`);

        // Update Departments with Doctor IDs
        for (const department of departmentRes) {
            const departmentDoctors = doctorRes
            .filter((doc) => doc.dep_id && doc.dep_id.toString() === department._id.toString())
            .map((doc) => doc._id);

            await Department.updateOne({ _id: department._id }, { $set: { doctors: departmentDoctors } });
        }

        console.log("Updated departments with doctor IDs!");

        // Insert Schedules
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const shifts = [
            { startTime: "08:00 AM", endTime: "12:00 PM" },
            { startTime: "12:30 PM", endTime: "04:30 PM" },
            { startTime: "05:00 PM", endTime: "09:00 PM" }
        ];

        let schedules = [];
        doctorRes.forEach((doctor, index) => {
            for (let i = 0; i < 3; i++) { // Assign 3 shifts per doctor
                const randomDay = daysOfWeek[(index + i) % daysOfWeek.length]; // Rotate days
                const randomShift = shifts[i % shifts.length]; // Rotate shift times
                schedules.push({
                    doctor: doctor._id,
                    day: randomDay,
                    startTime: randomShift.startTime,
                    endTime: randomShift.endTime,
                    isAvailable:true 
                });
            }
        });

        const scheduleRes = await DoctorSchedule.insertMany(schedules);
        console.log(`Inserted ${scheduleRes.length} doctor schedules successfully!`);
        for (const doctor of doctorRes) {
            const doctorSchedules = scheduleRes
                .filter((schedule) => schedule.doctor.toString() === doctor._id.toString())
                .map((schedule) => schedule._id);
        
            await Doctor.updateOne({ _id: doctor._id }, { $set: { schedule: doctorSchedules } });
        }
        
        console.log("Updated doctors with their schedule IDs!");
        // Generate Slots for the Next 7 Days
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            let futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            let futureDateString = futureDate.toISOString().split("T")[0];

            await generateSlotsForDate(futureDateString);
        }

        console.log("Generated slots for the next 7 days!");
        console.log("Seeding completed successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error(" Error inserting doctors:", error);
        mongoose.connection.close();
    }
});
} catch (error) {
console.error(" Error inserting departments:", error);
mongoose.connection.close();
}
});
} catch (error) {
console.error("Seeding failed:", error);
await createEmptyCollection();
mongoose.connection.close();
}
}
async function createEmptyCollection() {
    const db = mongoose.connection;
    await db.createCollection("opd_cards");
    await db.createCollection("opd_records");
    console.log("OPD Cards collection created successfully!");
}                
seedDatabase();
