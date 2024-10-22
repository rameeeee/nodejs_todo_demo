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

// 3. 유저 권한 확인(투두 페이지는 로그인한 유저만! 들어갈 수 있다.)

// 1) 로그인을 했다면, 로그인 페이지로 들어갈 수 없다.
// 1-1) 로그인을 했으면 토큰을 저장한다.
// 1-2) 토큰값을 읽어온다.
// 1-2-1) 토큰이 사용 가능하면 토큰을 바탕으로 유저 객체를 보내준다.
// 1-3) 토큰이 사용 가능한 토큰인지 체크한다. (토큰이 만료되지 않고, 토큰을 해독했을 때 유저 ID가 있다.) => 백엔드에서 체크
// 1-4) 유저값을 저장한다.
// 1-5) 유저가 있다면 투두 페이지를 보여준다.
// 2) 로그인을 안했다면 투두페이지로 들어갈 수 없다.


// 4. 내가 이미 로그인한 유저라면 추가 로그인 없이 바로 메인 페이지로 들어오기

// 5. 작성자 추가하기
// 1) 테이블(컬렉션)의 컬럼을 추가한다. author
// 1-2) 현재 로그인한 유저가 누군지 로그인 유저정보를 알아야 한다.
// 2) 할 일 생성 시 author값을 추가한다.
// 3) 프론트엔드는 작성자 이름도 함께 보여준다.