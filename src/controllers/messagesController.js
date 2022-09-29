const db = require("../models/db");

// function to add messages in the Db
const addMessages = ({ author, message, authorImage, room })=>{
    let sqlInsert = `insert into messages (author, roomName, message, authorImage) values('${author}', '${room}', '${message}', '${authorImage}');`;
                        
    // inserting a new message into the database
    db.query(sqlInsert, (err, result)=>{
        if(result){
            console.log('Message added')
        }
        if(err){
            console.log('Failure while adding the message')
            console.log(err);
        }
    })
}





// function to get messages from the Db
function getMessages(req, res){
    const {roomName} = req.body

    // queryng all messages
    let sql = `select * from messages where roomName = '${roomName}';`;

        db.query(sql, (err, result) => {
            //if there was found any room
            if (result.length > 0) {
                res.json({result, succes: true});
            }
            //if there wasn't found any room
            else if (result.length == 0) {
                res.json({
                    message: "Failure Searching the messages", succes: false
                });
            }

        });
};

module.exports = {addMessages, getMessages};