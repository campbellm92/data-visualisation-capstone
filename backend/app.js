// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");
require("dotenv").config();
const helmet = require("helmet");

const options = require("./knexfile.js");
const knex = require("knex")(options);
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup - not needed b/c app has a frontend - consider deletion
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// middleware
app.use(require("./middleware/logOriginalUrl"));
app.use(logger("dev"));
app.use(helmet());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};

logger.token("res", (req, res) => {
  const headers = {};
  res.getHeaderNames().map((h) => (headers[h] = res.getHeader(h)));
  return JSON.stringify(headers);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public"))); < don't need to serve files from public dir
app.use(cors(corsOptions));
app.use((req, res, next) => {
  req.db = knex;
  next();
});

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/knex", function (req, res, next) {
  req.db
    .raw("SELECT VERSION()")
    .then((version) => console.log(version[0][0]))
    .catch((err) => {
      console.log(err);
      throw err;
    });

  res.send("Version Logged successfully");
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// this error handling middleware supplies information in json
// better for testing in Insomnia
app.use(function (req, res, next) {
  res.status(404).json({ error: true, message: "Not Found" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// pre-cache commonly requested end points
fetch('http://localhost:3000/api/combined_data');

module.exports = app;
