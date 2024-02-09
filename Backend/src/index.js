import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./constants.js";
import connectDB from "./db/index.js";
import { app, server } from "./utils/socket.js";
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"

dotenv.config({
    path: "./env"
})

const __dirname = path.resolve()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter)
app.use("/api/messages", messageRouter)

app.use(express.static(path.join(__dirname, "../Frontend/dist")))
// console.log(__dirname);
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server ready at port ${PORT}`);
    })
}).catch((error) => {
    console.log("Error while connect with server", error);
})