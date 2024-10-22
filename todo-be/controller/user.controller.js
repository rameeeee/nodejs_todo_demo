const User = require("../model/User");
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const userController = {}

userController.createUser = async(req, res) => {
    try {
        const {email, name, password} = req.body;
        const user = await User.findOne({email})
        if(user){
            throw new Error('이미 가입된 유저 입니다.')
        }
        if (!name) {
            throw new Error('이름을 입력해주세요.')
        }
        if (!email) {
            throw new Error('이메일을 입력해주세요.')
        }
        if (!password) {
            throw new Error('비밀번호를 입력해주세요.')
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log('hash', hash)

        const newUser = new User({email, name, password:hash})
        await newUser.save();
        res.status(200).json({status: 'success'})
    } catch(error){
        console.log(error.message)
        res.status(400).json({status: 'fail', message: error.message})
        
    }
}

userController.loginWithEmail = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v")
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password)
            if(isMatch) {
                const token = user.generateToken()
                return res.status(200).json({status: "success", user, token})
            }
        }
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
    } catch(error){
        res.status(400).json({status: "fail", message: error.message})
    }
}

userController.getUser = async(req, res) => {
    try {
        const {userId} = req // req.userId
        const user = await User.findById(userId)
        if(!user) {
            throw new Error("can not find user")
        }
        res.status(200).json({status: "success", user})
    } catch(error) {
        res.status(400).json({status: "fail", message: error.message})
    }
}

module.exports = userController