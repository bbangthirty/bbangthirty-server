const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../../models/users");
const db = require("../db");
const crypto = require("../crypto");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user_mail", // req.body.user_mail
        passwordField: "user_pwd", // req.body.user_pwd
      },
      async (user_mail, user_pwd, done) => {
        try {
          const connection = await db.getConnection();
          const userList = await users.getUserList(connection, {
            user_mail: user_mail,
          });
          connection.release;
          console.log(userList);
          if (!userList.length) {
            console.log("가입되지 않은 회원입니다");
            return done(null, false, { message: "가입되지 않은 회원입니다." });
          }
          let exUser = userList[0];
          if (exUser.deleted_at !== null) {
            console.log("탈퇴한 회원입니다.");
            return done(null, false, { message: "탈퇴처리 된 회원입니다." });
          }
          console.log("exUser:", exUser);
          const encodedPw = crypto.getPasswordPbkdf2(user_pwd, exUser.salt);
          //encodedPw : 로그인시 입력한 비밀번호 + db에 저장된 salt -> 암호화
          console.log("encodedPw :", encodedPw);
          if (exUser.user_pwd === encodedPw) {
            console.log("ok");
            return done(null, exUser);
          } else {
            console.log("not");
            console.log("비밀번호가 일치하지 않습니다.");
            return done(null, false, {
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
