import { Server } from "socket.io"
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})
export const getReceiverScoketId = (receiverId) => {
    return userSocketMap[receiverId]
}
let userSocketMap = {}
io.on("connection", (socket) => {
    // console.log("hello", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        // console.log("user disconnect", socket.id);
        delete userSocketMap[userId]

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
})
export { app, server, io }