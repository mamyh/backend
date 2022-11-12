function decorateHtmlResponse(pageTitle) {
  return function (req, res, next) {
    res.locals.html = true;

    res.locals.title = `${pageTitle} -  ${process.env.APP_NAME}`;
    console.log(res.locals.title);
    next();
  };
}

module.exports = decorateHtmlResponse;
