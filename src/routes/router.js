const express = require("express");
const router = require("express").Router();
const usersRoute = require("./usersRoute");
const roomsRoute = require("./roomsRoute");
const messagesRoute = require("./messagesRoute");

// aply middlewares
router.use(usersRoute);
router.use(roomsRoute);
router.use(messagesRoute);

module.exports = router;
