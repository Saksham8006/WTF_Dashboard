const router = require("express").Router();
const userRoutes = require("./User.route");




router.use("/user", userRoutes);





router.get("/test", (req, res) => {
    res.status(200).json({
        message: "success",
    });
});


router.get("/test", (req, res) => {
    res.status(200).json({
        message: "success",
    });
});

router.get("/ping", (req, res) => {
    res.json({ success: "true", message: "successful request" });
});

module.exports = router;
