const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");

if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: `config/.env.dev` });
} else dotenv.config();

const indexRouter = require("./routes/index");
const areasRouter = require("./routes/areas");
const usersRouter = require("./routes/users");
const myAreasRouter = require("./routes/my_areas");
const profileImgRouter = require("./routes/profile_img");
const ownersRouter = require("./routes/owners");
const bakeriesRouter = require("./routes/bakeries");
const bakeryImgRouter = require("./routes/bakery_img");
const adminsRouter = require("./routes/admins");
const fvBreadsRouter = require("./routes/fv_breads");
const feedsRouter = require("./routes/feeds");
const feedImgRouter = require("./routes/feed_img");
const noticesRouter = require("./routes/notices");
const fvBakeriesRouter = require("./routes/fv_bakeries");
const pwdAuthRouter = require("./routes/pwd_auth");
const albaAuthRouter = require("./routes/alba_auth");
const albasRouter = require("./routes/albas");
const passsportConfing = require("./components/passport");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// view engine setup
https: app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

passsportConfing();

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { application } = require("express");
const nodemon = require("nodemon");
let host;
if (process.env.NODE_ENV === "dev") {
  host = "localhost:3000";
} else host = "52.78.52.247";

const swaggerDefinition = {
  info: {
    title: "빵떠리 Server API",
    version: "1.0",
    decription: "API description",
  },
  host: host,
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ["./schemas/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
// express session 보다 아래에 위치시켜야 한다. passport에서 express session에 세션을 저장했기 때문에 받아서 처리해야 하기 때문
app.use(passport.initialize());
app.use(passport.session()); // 로그인 이후 이 부분 실행될때 passport index deserializeUser 실행

app.use("/", indexRouter);
app.use("/areas", areasRouter);
app.use("/users", usersRouter);
app.use("/myAreas", myAreasRouter);
app.use("/profileImg", profileImgRouter);
app.use("/owners", ownersRouter);
app.use("/bakeries", bakeriesRouter);
app.use("/bakeryImg", bakeryImgRouter);
app.use("/admins", adminsRouter);
app.use("/fvBreads", fvBreadsRouter);
app.use("/feeds", feedsRouter);
app.use("/feedImg", feedImgRouter);
app.use("/notices", noticesRouter);
app.use("/fvBakeries", fvBakeriesRouter);
app.use("/pwdAuth", pwdAuthRouter);
app.use("/albaAuth", albaAuthRouter);
app.use("/albas", albasRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "prod" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
