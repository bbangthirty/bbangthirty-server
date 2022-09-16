const crypto = require("crypto");

module.exports.createPasswordPbkdf2 = (pw) => {
  const salt = crypto.randomBytes(32).toString("base64");
  const encodedPw = crypto
    .pbkdf2Sync(pw, salt, 99381, 32, "sha512")
    .toString("base64");
  // 변수 의미 : 암호, 암호의 기준이 되는키, 해쉬를 진행하는 반복 횟수, 데이터 길이
  return { encodedPw, salt };
};

//로그인할때 비교하는 코드
module.exports.getPasswordPbkdf2 = (pw, salt) => {
  return crypto.pbkdf2Sync(pw, salt, 99381, 32, "sha512").toString("base64");
  // 512 bits = 64 bytes
};

// 비밀번호 찾기 & 알바생 초대 이메일 인증 토큰 생성
module.exports.createMailToken = (user_mail) => {
  const token = crypto.randomBytes(20).toString("hex"); // token 생성
  console.log("user_mail :", user_mail);
  const data = {
    // 데이터 정리
    token: token,
    user_mail: user_mail,
  };
  return { token, data };
};
