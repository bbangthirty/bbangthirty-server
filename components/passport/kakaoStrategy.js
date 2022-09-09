const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const db = require("../db");
const users = require("../../models/users");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/users/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // accessToken refreshToken -> oauth2
        console.log("kakao profile", profile);
        try {
          // 가입한게 있나 찾아보고
          const connection = await db.getConnection();
          const userList = await users.getUserList(connection, {
            sns_id: profile.id,
            provider: "kakao",
          });
          let exUser = userList[0];
          console.log("exUser:", exUser);
          if (exUser) {
            done(null, exUser);
          } else {
            // 없으면 빵떠리 회원가입 후 로그인
            const newUser = {
              user_nickname: profile.displayName,
              user_mail: profile._json && profile._json.kakao_account_email,
              provider: "kakao",
              snsId: profile.id,
            };
            const connection = await db.getConnection();
            await db.beginTransaction(connection);
            const result = await users.insertUserInfo(connection, newUser);
            console.log("result: ", result);
            await db.commit(connection);
            res.status(200).json({ result });
            // return res.redirect("/");
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
