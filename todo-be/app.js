const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
require('dotenv').config()

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
// console.log('MONGODB_URI_PROD', MONGODB_URI_PROD)

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use('/api', indexRouter)

const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI, {useNewUrlParser:true}).then(() => {
    console.log('mongoose connected');
}).catch((err) => {
    console.log("DB connected fail", err)
})

app.listen(process.env.PORT || 5000, () => {
    console.log("server on 5000")
})

// 1. 회원가입
// 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
// 받은 정보를 저장함 (데이터 베이스 모델 필요)
// 패스워드를 암호화 시켜서 저장


// 1) 라우터
// 2) 모델
// 3) 데이터 저장 (이미 가입된 유저 유무, 패스워드 암호화)
// 4) 응답 보냄

// 2. 로그인
// 이메일 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있다면? 유저정보 + 토큰

// 1) 라우터 설정
// 2) 이메일 패스워드 정보 읽어오기
// 3) 이메일을 가지고 유저정보 가져오기
// 4) 이 유저의 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
// 5) 맞을 경우, 토큰 발행
// 6) 틀릴 경우, 에러메시지 보냄
// 7) 응답으로 유저정보 + 토큰 보냄


