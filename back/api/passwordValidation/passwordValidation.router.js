const express = require("express");
const router = express.Router();
const { validatePassword } = require("./passwordValidation.controller");

// Endpoint to validate password
router.post("/validate", validatePassword);

module.exports = router;