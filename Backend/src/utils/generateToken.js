import { User } from "../models/user.model.js"
import ApiError from "./ApiError.js"
const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const token = user.generateToken()
        return token
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Token")
    }
}
export default generateToken;