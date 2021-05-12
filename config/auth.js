// Check login
exports.checkLogin = (req, res, next) => {
  if (!req.session.user) return next();
  res.redirect("/user");
};

// Check permission
exports.permission = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/login");
};
