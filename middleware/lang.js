module.exports = function (req, res, next) {
  const splittedUrl = req.url.split("/");
  if (splittedUrl[1] !== "ru" && splittedUrl[1] !== "et") {
    return res.status(404).redirect("/et");
  }

  next();
};
