const bcrypt = require("bcrypt");
const { loginValidation } = require("../../Services/validationSchema")

const Token = require("../../models/RefreshToken.model");
const {
    generateAccessToken,
    generateRefreshToken
} = require("../../Services/generate_token")
const User = require("../../models/User.model");

const { refreshTokenLife, accessTokenLife } = require("../../Services/keys").jwt;

const loginUser = async (req, res, next) => {
    try {

        const { email, password } = await loginValidation.validateAsync(req.body);

        const loggedInUser = await User.findOne({ email: email });
        console.log("Logged In User", loggedInUser)

        if (!loggedInUser) {
            return res.status(404).json({
                message: "Email is not correct, Please regsiter with this email first."
            })
        }
        console.log("Logged In User Password", loggedInUser.password)
        const isMatchPassword = await bcrypt.compare(password, loggedInUser.password);
        console.log("password", password)
        console.log("Is match password", isMatchPassword)

        if(!isMatchPassword){
            return res.status(401).json({
                status:false,
                message: "Incorrect Password. Please try again.",
            })
        }

        // const currentDate = new Date();
        // console.log("currentDate", currentDate)
        // console.log("expiryDate", loggedInUser.expiryDate)
        // if(loggedInUser.expiryDate && loggedInUser.expiryDate < currentDate){
        //     return res.status(401).json({
        //         status : false,
        //         message: "Your account has expired."
        //     })

        // }

        const payload = {
            role : loggedInUser.role,
            email: loggedInUser.email,
            _id: loggedInUser._id,
        }

        const accessToken = generateAccessToken(payload, accessTokenLife);
        const refreshToken = generateRefreshToken(payload, refreshTokenLife);

        console.log("accessToken", accessToken)
        console.log("refreshToken", refreshToken)

        if(!accessToken || !refreshToken){
            return res.status(500).json({
                status:false,
                message:"Unable to generate tokens, Please try again later."
            })
        }

        const token = new Token({
            user: loggedInUser._id,
            token: accessToken,
            refreshToken:refreshToken
        })

        console.log("token", token)

        await token.save();

        res.cookie("auth", refreshToken, { httpOnly: true });


        await User.findByIdAndUpdate(loggedInUser._id, {
            lastLoginAt: new Date(),
            lastLoginIp: req.ip,
        })


        res.status(200).json({
            success: true,
            accessToken,
            user: payload,
            role: loggedInUser.role,
        })




    } catch (error) {
        if (error.isJoi) {
            res.status(402).json({
                message: "Validation Error",
                details: error.details
            })
        } else {
            next(error);
        }
    }
}

module.exports = loginUser;