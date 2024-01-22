const { Schema, model } = require("mongoose");
const { refreshTokenLife } = require("../Services/keys").jwt;


const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    token: {
        type: String,
        required: true,
    },
    refreshToken: { type: String, required: true },
    createdAt: {
        type: Date,
        expired: refreshTokenLife,
        default: Date.now,
    }
});

const Token = model("token", tokenSchema, "token");
module.exports = Token;