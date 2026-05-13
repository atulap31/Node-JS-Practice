// don't change the prewritten code
// change the code for 'join' event

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { messageModel } from './message.schema.js';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    socket.on("join", async (data) => {
        // Join the room
        socket.join(data.room);
        
        // Emit a welcome message to the user who joined
        const welcomeMessage = {
            text: `Welcome ${data.username} to room ${data.room}!`
        };
        socket.emit("welcome", welcomeMessage);
        
        // Broadcast to other users in the room
        socket.to(data.room).emit("message", {
            username: "System",
            text: `${data.username} has joined the room`
        });
        
        // Load previous messages based on time range
        try {
            let query = { room: data.room };
            
            // Apply time filter if specified
            if (data.timeRange && data.timeRange !== 'all') {
                const hoursAgo = parseInt(data.timeRange);
                const cutoffTime = new Date();
                cutoffTime.setHours(cutoffTime.getHours() - hoursAgo);
                query.timestamp = { $gte: cutoffTime };
            }
            
            // Retrieve messages in chronological order (oldest first)
            const previousMessages = await messageModel.find(query)
                .sort({ timestamp: 1 }) // Ascending order for chronological display
                .exec();
            
            // Send previous messages to the user who just joined
            socket.emit("previousMessages", previousMessages);
            
            console.log(`Loaded ${previousMessages.length} messages for room ${data.room} with timeRange: ${data.timeRange || 'all'}`);
        } catch (error) {
            console.error("Error loading previous messages:", error);
            socket.emit("previousMessages", []);
        }
    });

    socket.on("sendMessage", async (data) => {
        try {
            const message = new messageModel({
                username: data.username,
                text: data.message,
                room: data.room,
                timestamp: new Date()
            });
            
            await message.save();
            
            // Broadcast the received message to all users in the same room
            io.to(data.room).emit("message", {
                username: data.username,
                text: data.message,
                timestamp: message.timestamp
            });
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});