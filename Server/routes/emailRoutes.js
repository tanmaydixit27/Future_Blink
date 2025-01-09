const express = require("express");
const { createEmailSequence } = require("../controllers/emailController");
const router = express.Router();

router.post("/email-sequence", createEmailSequence);

module.exports = router;
