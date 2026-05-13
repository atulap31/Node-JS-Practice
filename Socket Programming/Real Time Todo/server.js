// Complete the server.js file to make user's add, delete and update the todos.
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Task from './task.schema.js';
import { connectToDatabase } from './db.config.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Socket.IO connection handling
io.on('connection', async (socket) => {
    console.log('New client connected:', socket.id);

    // Send existing tasks to the newly connected client
    try {
        const tasks = await Task.find().sort({ createdAt: 1 });
        socket.emit('initialTasks', tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }

    // Handle adding a new task
    socket.on('addTask', async (taskText) => {
        try {
            // Create new task in database
            const newTask = new Task({
                text: taskText
            });
            const savedTask = await newTask.save();
            
            // Broadcast the new task to all connected clients
            io.emit('addTask', savedTask);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Handle deleting a task
    socket.on('deleteTask', async (taskId) => {
        try {
            // Delete task from database
            await Task.findByIdAndDelete(taskId);
            
            // Broadcast the deletion to all connected clients
            io.emit('deleteTask', taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Export the server for use in index.js
export const server = httpServer;