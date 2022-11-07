const express = require("express");

const app = express();
const adminRouter = express.Router();
app.use("/admin", adminRouter);
// const myMiddleware = (req, res, next) => {
//   console.log("i am middleware");
//   next(); //parameter of next fn is error
//   //   res.send("Heelo from middleware");
// };
// const logger = (req, res, next) => {
//   console.log(
//     `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
//       req.originalUrl
//     } - ${req.protocol} - ${req.ip} `
//   );
//   next();
// };
// const logger = (req, res, next) => {
//   console.log(
//     `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
//       req.originalUrl
//     } - ${req.protocol} - ${req.ip} `
//   );
//   throw new Error("there was an error in your admin session");
// };

const loggerWrapper = (options) => {
  return (req, res, next) => {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
          req.originalUrl
        } - ${req.protocol} - ${req.ip} `
      );
      next();
    } else {
      throw new Error("there was a server side error");
    }
  };
};
// In every middleware must have 3 parametters but in error middleware mush have 4 paramerters

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("you have server side error !!!");
};

// adminRouter.use(logger);
adminRouter.use(loggerWrapper({ log: false }));
adminRouter.use(errorHandlerMiddleware);
// app.use(myMiddleware);
// app.use(logger);
app.get("/about", (req, res) => {
  res.send("hello Middleware");
});

adminRouter.get("/dashboard", (req, res) => {
  res.send("i am in admin dashboard");
});

app.listen(3000, () => {
  console.log("listening to the port 3000");
});
