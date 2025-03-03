module.exports = function (req, res, next) {
  res.locals.errorMessage = req.session.errorMessage;

  const token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrf = token;

  next();
};
