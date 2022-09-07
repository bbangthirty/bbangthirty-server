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
const myAreasRouter = require("./routes/myAreas");

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
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
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/areas", areasRouter);
app.use("/users", usersRouter);
app.use("/myAreas", myAreasRouter);

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
