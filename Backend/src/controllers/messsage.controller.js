import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { isValidObjectId } from "mongoose"
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { getReceiverScoketId, io } from "../utils/socket.js"

const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;
    if (!isValidObjectId(receiverId)) {
        throw new ApiError(400, "Invalid Id")

    }
    if (!message) {
        throw new ApiError(400, "Message field empty")
    }

    let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } })
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })
    if (newMessage) {
        conversation.messages.push(newMessage._id)
        await conversation.save({ validateBeforeSave: false })
    }

    const receiverSocketId = getReceiverScoketId(receiverId)
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }
    return res.status(200)
        .json(new ApiResponse(200, newMessage, "Message send successfully"))
})

const getMessage = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    if (!isValidObjectId(userToChatId)) {
        throw new ApiError(404, "Invalid Id")
    }

    const conversation = await Conversation.findOne({ participants: { $all: [senderId, userToChatId] } }).populate("messages")

    return res.status(200).json(new ApiResponse(200, conversation.messages, "All messages get successfully"))

})

export { sendMessage, getMessage }