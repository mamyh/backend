const express = require("express");
const app = express();
const handle = require("./handle.js");

app.locals.title = "may app";

app.get("/", handle);

app.listen(3000, () => {
  console.log("i am listening to the 3000 port");
});
