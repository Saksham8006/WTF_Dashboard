const router = require("express").Router();

const loginUser = require("../../controllers/auth/login");
const logoutUser = require("../../controllers/auth/logout");
const registerUser  = require("../../controllers/auth/register")
const validateAccessToken = require("../../middlewares/jwtValidation")



//==================routes for user=============================//

// router.post("/forgotPassword", forgotPassword);
router.post("/register",  registerUser);
router.post("/login", loginUser)
router.delete("/logout", validateAccessToken, logoutUser)





module.exports = router;