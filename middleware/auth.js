module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect(`/${req.params.lang}/admin/login`);
  }

  next();
};
