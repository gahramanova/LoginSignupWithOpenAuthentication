const express = require("express");
const router = express.Router();
const { getAllMessages } = require("../controller/message");

router.get("/", getAllMessages);

module.exports = router;
