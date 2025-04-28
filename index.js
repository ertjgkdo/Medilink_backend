require("dotenv").config();
const e = require("express");
require("./appointments/services/slot_service");
const express = require("express");
const mongoose = require("mongoose");
const patientAuthRouter = require("./authentication/routes/patientAuthRouter");
const commonAuthRouter = require("./authentication/routes/commonAuthRouter");
const portalAuthRouter = require("./authentication/routes/portalAuthRouter");
const hospRouter = require("./hospitals/routes/hospital_routes");
const depRouter = require("./departments/routes/department_router");
const docRouter = require("./doctors/routes/doctor_router");
const schedRouter = require("./doctors/routes/doct_schedule_router");
const appointmentRouter = require("./appointments/routes/appointment_routes");
const bookingRouter = require("./booking/routes/booking_route");
const bookedRouter = require("./bookedAppointments/routes/booked_router");
const cancelRouter = require("./booking/routes/cancelling_route");
const searchRouter = require("./search/routes/search_router");
const opdRouter = require("./opd/routes/opd_routes");
const patientRouter = require("./patients/routes/patientRouter");
const filterRouter = require("./search/routes/filter_routes");
const PORT = process.env.PORT || 3002;


const app = express();
//convert data into json and sends to server
app.use(express.json());
//middleware
app.use("/api/auth/patient", patientAuthRouter);
app.use("/api/auth",commonAuthRouter);
app.use("/api/auth/portal", portalAuthRouter);
app.use("/api", hospRouter);
app.use("/api", depRouter);
app.use("/api", docRouter);
app.use("/api", schedRouter);
app.use("/api", appointmentRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/booked", bookedRouter);
app.use("/api/bookings", cancelRouter);
app.use("/api/search",searchRouter);
app.use("/api/opd",opdRouter);
app.use("/api/patients", patientRouter);
app.use("/api/filter", filterRouter)
//dbconnection
const DB = process.env.MONGO_URI;


mongoose.connect(DB).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});