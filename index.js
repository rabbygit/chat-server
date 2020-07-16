const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const {
    userJoin,
    userLeft
} = require("./utils/users")


app.get('/', (req, res) => {
    res.send("Hello")
});

io.on('connection', (socket) => {
    // Save user
    socket.on('SEND_USER', (user) => {
        userJoin(socket.id, user)
        socket.emit('WELCOME', `Welcome ${user} to chat`);
        socket.broadcast.emit("NEW_USER_JOIN", `${user} joins in chat`, "join")
    })

    // Handle the message event
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('MESSAGE', data, "message");
    })

    socket.on('disconnect', () => {
        // Find the left user
        const user = userLeft(socket.id);

        if (user) {
            socket.broadcast.emit("USER_LEFT", `${user.userName} left the chat`, "left")
        }
    });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT); 