const db = require("./db");

// Checking if the Messages Table exists
let sql = "select id from messages where id < 40;";

db.query(sql, (err, result) => {
    if (err) {
        // Creating users Table
        let sql = `CREATE TABLE messages (id INT NOT NULL PRIMARY KEY auto_increment, author VARCHAR(100) NOT NULL, roomName VARCHAR(100) NOT NULL, message TEXT not null, authorImage TEXT NOT NULL);`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error creating Messages table", err);
            }

            if (result) {
                console.log("Messages table Created");
            }
        });
    }
    if (result) console.log("Messages table found");
});
