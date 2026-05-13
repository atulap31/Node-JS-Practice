import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { connect } from "./config.js";
import { chatModel } from "./chat.schema.js";

const app = express();

// 1. Creating server using http.
const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3. Use socket events.

io.on("connection", (socket) => {
  console.log("Connection is established");

  socket.on("join", (data) => {
    socket.username = data;
    chatModel
      .find()
      .sort({ timestamp: 1 })
      .limit(50)
      .then((messages) => {
        socket.emit("load_messages", messages);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("new_message", (message) => {
    let userMessage = {
      username: socket.username,
      message: message,
    };

    const newChat = new chatModel({
      username: socket.username,
      message: message,
      timestamp: new Date(),
    });
    newChat.save();

    // broadcast this message to all the clients.
    socket.broadcast.emit("broadcast_message", userMessage);
  });

  socket.on("disconnect", () => {
    console.log("Connection is disconnected");
  });
});

server.listen(8080, () => {
  console.log("App is listening on 8080");
  connect();
});

{
  "name": "solution",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "grunt": "^1.6.2"
  },
  "dependencies": {
    "@babel/preset-env": "^7.23.2",
    "archiver": "^6.0.1",
    "axios": "^1.6.2",
    "form-data": "^4.0.0",
    "glob": "^10.3.10",
    "grunt-contrib-cssmin": "^5.0.0",
    "grunt-contrib-uglify": "^5.2.2"
  }
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* Body */
body {
  background: #f4f7fb;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Chat Container */
#chat-container {
  width: 400px;
  height: 600px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Message List */
#message-list {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #eef1f7;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Individual Message */
#message-list div {
  background: #ffffff;
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 75%;
  word-wrap: break-word;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

/* Input Area */
#message-input {
  border: none;
  border-top: 1px solid #ddd;
  padding: 12px;
  font-size: 14px;
  outline: none;
  width: calc(100% - 80px);
}

/* Send Button */
#send-message {
  width: 80px;
  border: none;
  background: #4a90e2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

#send-message:hover {
  background: #357abd;
}

/* Bottom Input Wrapper */
#chat-container > input,
#chat-container > button {
  display: inline-block;
}

/* Fix layout for input + button */
#chat-container > input {
  flex: none;
}

#chat-container {
  position: relative;
}

#chat-container input,
#chat-container button {
  height: 50px;
}

/* Flex row for input + button */
#chat-container {
  display: flex;
}

#chat-container input {
  flex: 1;
}

#chat-container button {
  flex: none;
}

/* Scrollbar styling */
#message-list::-webkit-scrollbar {
  width: 6px;
}

#message-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!!</h1>
</body>
</html>