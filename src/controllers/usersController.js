const db = require("../models/db");

/*
 * 1 Add new Users
 */
const addUser = async (req, res) => {
    //values provided
    const { email, username, gender, password, userImage } = await req.body;

    //if the input values where  provided
    if(username && password && gender && email && userImage){
        let sqlSelect = `select * from users where username = '${username}';`

        db.query(sqlSelect, (err, result)=>{
            if(err) console.log(err);

            //if there already is a user with a similar username 
            else if(result.length > 0) res.json({message: `You can't use this username`, succes: false})

            //if there are no users with a similar username
            else if(result.length == 0){
                let sqlSelect = `select * from users where password = '${password}';`
                
                //if there are users with a similar password
                db.query(sqlSelect, (err, result)=>{
                    if(err) console.log(err);
                    
                    //if there is a user with a similar password
                    else if(result.length > 0) res.json({message: `Choose other password`, succes: false})
                    
                    //if there are no users with a similar password
                    else if(result.length == 0){
                        let sqlInsert = `insert into users (email, password, username, gender, userImage) values('${email}', '${password}', '${username}', '${gender}', '${userImage}');`;
                        
                        //inserting a new user into the database
                        db.query(sqlInsert, (err, result)=>{
                            if(result){
                                res.json({message: 'User added', username, userImage, succes: true})
                            }
                            if(err){
                                res.json({message: 'Failure while adding the user', succes: false})
                                console.log(err);
                            }
                        })
                    }
                })

                
            }
        })

    }
    // if the all the values were not succesfuly provided
    else{
        res.json({ message: 'Fill all fields', succes: false })
    }

};









/*========================== 2 Find/Login User ========================================*/
const findUser = async (req, res) => {
    //values provided
    const { username, password } = await req.body;

    //if the input values where  provided
    if (username && password) {
        let sqlSelect = `select * from users where username = '${username}';`;

        db.query(sqlSelect, (err, result) => {
            //if there was found any user with the value provided
            if (result.length > 0) {
                let sqlSelect = `select * from users where password = '${password}';`;

                db.query(sqlSelect, (err, result) => {
                    //if there was found any user with the value provided
                    if (result.length > 0) {
                        res.json({ message: "Logged IN", username, userImage :result[0].userImage, succes: true });
                    }
                    else if (result.length == 0) {
                        res.json({
                            message:
                                "Wrong password",
                            succes: false,
                        });
                    }
                })
            }
            //if there wasn't found any user with the values provided
            else if (result.length == 0) {
                res.json({
                    message:
                        "User doesn't exist",
                    succes: false,
                });
            }

        });
    } else {
        //if the input values where not provided
        res.json({ message: "Fill all fields", succes: false });
    }
};








/*========================== 3 get singleUser========================================*/
const singleUser = async (req, res) => {
    //values provided
    const { username } = await req.body;
    console.log(username);

    //if the input values where  provided
    if (username) {
        let sqlSelect = `select * from users where username = '${username}';`;

        db.query(sqlSelect, (err, result) => {
            //if there was found any user with the value provided
            if (result.length > 0) {
                res.json(result);
            }

            //if there was not found any user with the value provided
            else if (result.length == 0) {
                res.json({
                    message: "User was not found in the database"
                });
            }
        });
    } else {
        //if the input values where not provided
        res.json({ username, message: "Fill all fields", succes: false });
    }
};

module.exports = {
    addUser,
    findUser,
    singleUser
};
