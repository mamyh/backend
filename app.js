//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal import
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routeHandler/loginRouter");
const userRouter = require("./routeHandler/userRouter");
const inboxRouter = require("./routeHandler/inboxRouter");

dotenv.config();
const app = express();
//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log("database connection successfull !!"))
  .catch((err) => console.log(err));

//Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set the view engin
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routing setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);
//404 not found handler
app.use(notFoundHandler);
//Default Error Handling
app.use(errorHandler);

//creating the server on 3000
app.listen(process.env.PORT, () => {
  console.log("server running on  port " + process.env.PORT);
});
