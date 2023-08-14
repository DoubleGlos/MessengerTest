const express = require("express")
const app = express();
const http = require("http")
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("ahh shit a user");
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