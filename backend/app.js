//
//  IFQ717 Web Development Capstone
//
//  app.js - Express backend server for Localis project
//
//
//  End points exposed are -
//
//    User Related
//
//    GET		  /profile
//    POST		/login
//    POST 		/register
//    PUT		  /update
//    DELETE	/delete
//
//    Data Related
//
//    GET 		/api/combined_data
//    GET 		/api/length_of_stay
//    GET 		/api/occupancy_daily_rate
//    GET 		/api/combined_data/:LGAName
//    GET 		/api/spend_categories
//    GET 		/api/spend_data
//
//    AI Related
//
//    POST 		/api/ai/query_llm
//

// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");
require("dotenv").config();
const helmetConfig = require("./middleware/helmetConfig");

const options = require("./knexfile.js");
const knex = require("knex")(options);
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// loggin middleware
app.use(require("./middleware/logOriginalUrl"));
// put this in for more intense logging
//app.use(logger("dev"));
app.use(helmetConfig);

// set a cors header
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://localis-capstone-f7a22eb1b92e.herokuapp.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};

// specify what to log
logger.token("res", (req, res) => {
  const headers = {};
  res.getHeaderNames().map((h) => (headers[h] = res.getHeader(h)));
  return JSON.stringify(headers);
});

// set up Express middleware structure
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

// include Knex to request for DB access
app.use((req, res, next) => {
  req.db = knex;
  next();
});

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// serve react
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

module.exports = app;

/* default knex endpoint for debugging  
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
*/

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

// pre-cache commonly requested end points on server startup
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

fetch(`${BASE_URL}/api/combined_data`);
fetch(`${BASE_URL}/api/spend_data`);

module.exports = app;
