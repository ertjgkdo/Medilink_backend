const express = require("express");
const router = express.Router();
const { portalLogin } = require("../controller/webAuthController");

router.post("/login", portalLogin);

module.exports = router;
