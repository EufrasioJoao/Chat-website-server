const db = require("../models/db");


// function to get all rooms in the Db
function getRooms(req, res){
    let sqlSelect = `select * from rooms;`;

    db.query(sqlSelect, (err, result) => {
        //if there was found any room
        if (result.length > 0) {
            res.json(result);
        }
            //if there wasn't found any room
        else if (result.length == 0) {
            res.json({
                message: "Failure Searching the rooms"
            });
        }

    });
};

module.exports = getRooms;
