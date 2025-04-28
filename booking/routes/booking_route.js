const express = require("express");
const {bookAppointment} = require("../controller/booking_controller");
const bookingRouter = express.Router();

bookingRouter.post("/book", bookAppointment);

module.exports = bookingRouter;

