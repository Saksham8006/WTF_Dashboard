const jwt = require("jsonwebtoken");

const { accessSecret } = require("../../Services/keys").jwt;
const Token = require("../../models/RefreshToken.model");

const logoutUser = async (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Authorization header missing"
            })
        }

        const data = jwt.verify(token, accessSecret);
        const removeToken = await Token.findOneAndDelete({
            _userId: data?._id,
            token: token,
        })

        if (!removeToken) {
            return res.status(400).json({
                message: "No token found with this user"
            })
        }

        res.clearCookie("auth");
        res.status(200).json({
            message: "User Logout Successfully"
        })

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = logoutUser;