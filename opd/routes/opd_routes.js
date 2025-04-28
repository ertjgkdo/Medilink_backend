const express = require("express");
const auth = require("../../authentication/middlewares/auth");
const {getAllOPDCards, getOPDCard, getAllRecords, getRecord}= require("../controller/opdController");
const opdRouter = express.Router();

opdRouter.get("/cards/all/:patientId", auth, getAllOPDCards);
opdRouter.get("/cards/:opdId", auth, getOPDCard);
opdRouter.get("/records/all/:opdId", auth, getAllRecords);
opdRouter.get("/records/:id", auth, getRecord);
module.exports = opdRouter;