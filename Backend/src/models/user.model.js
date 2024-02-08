import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)

})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return Jwt.sign({
        _id: this._id,
        name: this.fullName,
        username: this.username
    },
        process.env.TOKEN_SECRET
        , {
            expiresIn: process.env.TOKEN_EXPIRY
        })
}

export const User = mongoose.model("User", userSchema)