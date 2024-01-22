const roleCheck = async(req, res, next, roles) => {
    try {
        const { role } = req.user;

        if(roles.includes(role)){
            return next();
        }
        throw new Error(
            " you don't have the required permissions to complete this action."
        )
        
    } catch (error) {
        return res.status(403).json({ message: error.message})
    }
}


module.exports = roleCheck;