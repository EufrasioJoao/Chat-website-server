const database_config = require("../config/dbConfig");
const mysql = require("mysql");

const db = mysql.createConnection(database_config);

db.connect((err, result) => {
    if (err) throw err;
    if (result) console.log("Db connnected Succesfuly");
});

module.exports = db;

require("./usersModel");
require("./roomsModel");
require("./messagesModel");
