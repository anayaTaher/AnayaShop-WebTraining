exports.isAuth = (req, res, next) => req.session.userId ? next() : res.redirect("/login")
exports.notAuth = (req, res, next) => req.session.userId ? res.redirect("/") : next()