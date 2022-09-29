const router = require("express").Router();
const usersController = require("../controllers/usersController");

//server route to register
router.post("/api/users/register", usersController.addUser);

//server route to login
router.post("/api/users/login", usersController.findUser);

//server route to get single user information
router.post("/api/users/info", usersController.singleUser);

module.exports = router;
