const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: `config/.env.${process.env.NODE_ENV}` });
const indexRouter = require("./routes/index");
const areasRouter = require("./routes/areas");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// swagger
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
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

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/areas", areasRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
