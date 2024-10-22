const authController = {}
const jwt = require("jsonwebtoken")
const userController = require("./user.controller")
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

authController.authenticate = (req, res, next) => {
    try {
        // 토큰값은 fe에서 저장한 header에서 읽어주고 Bearer 를 지워줘야 한다. 
        const tokenString = req.headers.authorization
        if(!tokenString) {
            throw new Error("invalid token")
        }
        const token = tokenString.replace("Bearer ", "")
        // token이 유효한지 확인
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
              throw new Error("invalid token");
            }
            console.log("payload?!", payload)
            // res.status(200).json({status: "success", userId: payload._id})
            req.userId = payload._id;
        });
        next();
    } catch(error) {
        res.status(400).json({status: "fail", message: error.message})
    }
}


module.exports = authController;

// 미들웨어
