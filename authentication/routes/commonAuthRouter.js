const express = require("express");
const router = express.Router();
const { changePassword, authRoot } = require("../controller/commonAuthController");
const auth = require("../middlewares/auth");

router.get("/", authRoot);
router.post("/change-password", auth, changePassword);

module.exports = router;
