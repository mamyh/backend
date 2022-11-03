const handle = (req, res) => {
  console.log(req.app.locals.title);
  res.send("hello world ");
};

module.exports = handle;
