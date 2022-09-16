const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
};

module.exports.sendPwdUrl = async (token, user_mail, user_nickname) => {
  console.log("token :", token);
  console.log("user_mail", user_mail);
  console.log("user_nickname", user_nickname);
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(
    {
      from: process.env.GOOGLE_MAIL,
      to: user_mail,
      subject: "빵떠리 비밀번호 초기화 이메일입니다.",
      html:
        `<p>${user_nickname}님 비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.</p>` +
        `<a href='http://52.78.52.247/pwdAuth/reset/password/${token}'>비밀번호 새로 입력하기</a>`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        return info.response;
      }
    }
  );
};

module.exports.sendAlbaUrl = async (
  token,
  user_mail,
  user_nickname,
  bakery_name,
  bakery_id
) => {
  console.log("token :", token);
  console.log("user_mail", user_mail);
  console.log("user_nickname", user_nickname);
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(
    {
      from: process.env.GOOGLE_MAIL,
      to: user_mail,
      subject: `빵떠리 - ${bakery_name}의 알바가 되어주시겠어요?`,
      html:
        `<p>${user_nickname}님 알바 수락을 원하시면 아래의 URL을 클릭하여 주세요.</p>` +
        `<a href='http://52.78.52.247/albaAuth/accept/${token}?bakery_id=${bakery_id}'>${bakery_name} 알바 수락하기</a>`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        return info.response;
      }
    }
  );
};
