require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var port = process.env.PORT;
var cors = require("cors");

var indexRouter = require("./routes/index");

//conexion a DB
require("./lib/connectMongoose");

var app = express();

//configuracion de cors
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Rutas del Website
 */
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
