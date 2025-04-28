const express = require("express");
const {patientSignup, patientLogin} = require("../controller/patientAuthController");

// authentication router creater
const authRouter = express.Router();

authRouter.post("/signup", patientSignup);
authRouter.post("/login", patientLogin);



module.exports = authRouter;