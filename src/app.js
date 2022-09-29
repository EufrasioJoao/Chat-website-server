// core modules
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// externals modules
const router = require("./routes/router");
const formatMessage = require("./utils/formatMessage");
const db =require("./models/db");
const {addMessages} = require('./controllers/messagesController.js')


//middlewares and the router
app.use(cors());
app.use(express.json());
app.use(router); /* router */

//creating the server
const server = http.createServer(app);
const io = new Server(server, { /* instantiating new server with socket.io */
    cors: {
        origin: ["http://localhost:3000", "*"],
        methods: ["POST", "GET"],
    },
});


// listening to the connection event from the client
io.on("connection", (socket) => {
    socket.on("join_room", (data) => { /* join_room event to join room */
        socket.join(data)
        console.log(`user ${socket.id} joined`);
    });

    /* send_message event to send messages*/
    socket.on("send_message", ({ author, message, authorImage, room }) => {
        io.to(room).emit("receive_message", formatMessage(author, authorImage, message));

        //function to ad messages in the database
        addMessages({ author, authorImage, message, room })
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log("server is running on port " + PORT));
