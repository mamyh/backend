const express = require("express");
const app = express();
const router = express.Router({
  caseSensitive: true,
});
// app.use(express.urlencoded());
// app.use(
//   express.static(`${__dirname}/public/`, {
//     index: "home.html",
//   })
// );

app.use(router);
router.get("/about", (req, res) => {
  res.send("this is about page ");
});
app.get("/", (req, res) => {
  res.send("this is index page ");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("this is index page with post message");
});

app.listen(3000, () => {
  console.log("server has been started on 3000");
});
