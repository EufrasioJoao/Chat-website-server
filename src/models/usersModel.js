const db = require("./db");

// Checking if the Users Table exists
let sql = "select id from users where id < 40;";

db.query(sql, (err, result) => {
    if (err) {
        // Creating users Table
        let sql = `CREATE TABLE users (id INT NOT NULL PRIMARY KEY auto_increment, username VARCHAR(100) NOT NULL , gender VARCHAR(30) NOT NULL, userImage TEXT NOT NULL, email TEXT not null, password VARCHAR(100) NOT NULL, UNIQUE INDEX password_UNIQUE (password ASC) );`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error creating Users table", err);
            }

            if (result) {
                console.log("Users table Created");

                // inserting the main user
                let sqlInsert = `insert into users (email, password, username, gender, userImage) values('eufrasiojoao00@gmail.com','eufrasio2004','Frasio Joao', 'masculin', '/assets/images/m1.jpg');`;

                db.query(sqlInsert, (err, result) => {
                    if (result) {
                        console.log("Main User Added");
                    }
                    if (err) {
                        console.log("Failure adding main user ", err);
                    }
                });
            }
        });
    }
    if (result) console.log("Users table found");
});
