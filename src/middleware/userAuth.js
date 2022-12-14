const jwt = require("jsonwebtoken");
const USER = require("../schema/user");

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const userId = jwt.verify(token, process.env.SECRET_KEY || "yoursecretkey");
        console.log(token, process.env.SECRET_KEY);
        const user = await USER.findOne({ _id: userId })
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error)
        res.render("index");
    }
}
module.exports = authUser;