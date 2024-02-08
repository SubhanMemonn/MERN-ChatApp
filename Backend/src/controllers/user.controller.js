import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"
import { COOKIE_OPTIONS } from "../constants.js"
const signup = asyncHandler(async (req, res) => {
    const { fullName, username, password, gender } = req.body
    if (!fullName || !username || !password || !gender) {
        throw new ApiError(400, "All field are required")
    }
    const isUserExisted = await User.findOne({ username })
    if (isUserExisted) {
        throw new ApiError("400", "Username already exists")
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        password,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    const token = await generateToken(user?._id)
    console.log(token);
    return res.status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(new ApiResponse(200, { user, token }, "User Created"))
})
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new ApiError(400, "username or password are required")
    }
    const isUserExisted = await User.findOne({ username: username.toLowerCase() })
    if (!isUserExisted) {
        throw new ApiError("404", "Username not found")
    }

    const passChecking = await isUserExisted.isPasswordCorrect(password)
    if (!passChecking) {
        throw new ApiError("401", "Wrong password")

    }

    const token = await generateToken(isUserExisted?._id)


    return res.status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(new ApiResponse(200, { user: isUserExisted, token }, "Login successfully"))
})
const logout = asyncHandler(async (req, res) => {
    return res.status(200)
        .clearCookie("token")
        .json(new ApiResponse(200, {}, "Logout successfully"))
})
const getUsersForSidebar = asyncHandler(async (req, res) => {
    const me = req.user?._id;
    const user = await User.find({ _id: { $ne: me } });
    res.status(200).json(new ApiResponse(200, user, "All user fetched"))
})

export { signup, login, logout, getUsersForSidebar }