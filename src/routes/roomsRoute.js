const router = require("express").Router();
const getRooms = require("../controllers/roomsController");

//server route to get rooms
router.get("/api/rooms", getRooms);

module.exports = router;
