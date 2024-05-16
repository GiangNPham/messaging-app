var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const connectDB = require("./config/db");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");

require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

// set up database
connectDB();

// app.use(
//   session({
//     secret: process.env.cookie_key,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 6000000 },
//   })
// );

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/chat", chatRouter);

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    // console.log(message);
    socket.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
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
