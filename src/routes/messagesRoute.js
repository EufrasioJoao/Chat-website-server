const db = require("../models/db.js")
const router = require("express").Router();
const {getMessages} = require("../controllers/messagesController");

//server route to get rooms
router.post("/api/messages", getMessages)

module.exports = router;
