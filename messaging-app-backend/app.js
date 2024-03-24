var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
// const logoutRouter = require("./routes/logout");
// const chatRouter = require("./routes/chat");

require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set up database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbURL)
  .then(() => app.listen(3000))
  .catch((err) => console.log("database connection error"));

app.use(
  session({
    secret: process.env.cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 },
  })
);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
// app.use("/logout", logoutRouter);
// app.use("/chat", chatRouter);

/*
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
*/

module.exports = app;
