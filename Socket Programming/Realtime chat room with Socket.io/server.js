// No need to change the pre-written code
// Implement the features in io.on() section
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    // Write your code here
    
    // Handle user joining a room
    socket.on('join', (data) => {
        const { username, room } = data;
        
        // Join the specified room
        socket.join(room);
        
        // Send welcome message to the user who just joined
        socket.emit('welcome', {
            message: `Welcome ${username} to room ${room}!`
        });
        
        // Notify other users in the room that a new user has joined
        socket.to(room).emit('userJoined', {
            message: `${username} has joined the chat!`
        });
        
        // Store user info in socket object for later use
        socket.userData = { username, room };
    });
    
    // Handle sending messages
    socket.on('sendMessage', (data) => {
        const { username, room, message } = data;
        
        // Broadcast the message to all users in the same room (including sender)
        io.to(room).emit('message', {
            username: username,
            message: message,
            timestamp: new Date().toISOString()
        });
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
        
        // Notify other users when someone disconnects
        if (socket.userData) {
            const { username, room } = socket.userData;
            socket.to(room).emit('userJoined', {
                message: `${username} has left the chat!`
            });
        }
    });
});