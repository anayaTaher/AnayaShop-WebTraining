const  // Constants Declaration
    users = require("../models/auth.model"),
    validationResult = require("express-validator").validationResult

exports.getSignController = (req, res) =>
    res.render("signup", {
        error: req.flash("validationError")[0],
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        username: req.session.username,
        pageTitle: "Sign Up"
    })

exports.getLoginController = (req, res) =>
    res.render("login", {
        error: req.flash("loginError")[0],
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        username: req.session.username,
        pageTitle: "Login"
    })

exports.postSignController = (req, res) => {

    let errors = validationResult(req).array()

    if (errors.length === 0) {
        users.createNewUser(req.body.username, req.body.email, req.body.password)
            .then(_ => res.redirect("/login"))
            .catch(err => {
                req.flash("signError", err)
                res.redirect("/signup")
            })
    } else {
        req.flash("validationError", errors[0].msg)
        res.redirect("/signup")
    }
}

exports.postLoginController = (req, res) => users.loginUser(req.body.email, req.body.password)
    .then(user => {
        req.session.userId = user._id
        req.session.username = user.username
        req.session.email = user.email
        req.session.isAdmin = user.isAdmin
        res.redirect("/")
    })
    .catch(err => {
        req.flash("loginError", err)
        res.redirect("/login")
    })

exports.postLogoutController = (req, res) => req.session.destroy(_ => res.redirect("/"))