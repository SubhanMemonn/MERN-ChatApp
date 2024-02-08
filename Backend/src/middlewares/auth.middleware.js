import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import Jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
const JWTVerify = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized Request")
        }
        const decoded = Jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded?._id)
        if (!user) {
            throw new ApiError(401, "Invalid token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invaild Token")
    }
})
export default JWTVerify