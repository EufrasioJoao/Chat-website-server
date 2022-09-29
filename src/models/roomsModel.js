const db = require("./db");
const roomsArray = require("../config/roomsConfig");

// Checking if the Rooms Table exists
let sql = "select id from rooms where id < 40;";

db.query(sql, (err, result) => {
    if (err) {
        // Creating users Table
        let sql = `CREATE TABLE rooms (id INT NOT NULL PRIMARY KEY auto_increment, members INT NOT NULL, subscribers INT NOT NULL, roomName VARCHAR(100) NOT NULL, imageUrl TEXT not null, description VARCHAR(250) not null, UNIQUE INDEX roomName_UNIQUE (roomName ASC) );`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error creating Rooms table");
            }

            if (result) {
                console.log("Rooms Table Created");

                roomsArray.map((room) => {
                    // inserting the Medicine room
                    let sqlInsert = `insert into rooms (members, subscribers, roomName, imageUrl, description) values(${room.members},${room.subscribers},'${room.roomName}', '${room.imageUrl}', '${room.description}' );`;

                    db.query(sqlInsert, (err, result) => {
                        if (result) console.log(`${room.roomName} Room Added`);
                        if (err)
                            console.log(
                                `Failure adding ${room.roomName} Room`,
                                err
                            );
                    });
                });
            }
        });
    }
    if (result) console.log("Rooms table found");
});
