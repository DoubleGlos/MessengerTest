const express = require("express")
const app = express();
const http = require("http")
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

const connectedUsers = {};

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("A user has connected");

    const userId = socket.handshake.query.userId;

    connectedUsers[socket.id] = { userId, socket };

    socket.on("disconnect", () => {
       console.log("Great they have gone");
    });
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});


server.listen(3000, () => {
    console.log("Now listening on port 3000");
})