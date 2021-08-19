const // Constants Declaration
    authRoute = require("express").Router(),
    bodyParser = require("body-parser"),
    bp = bodyParser.urlencoded({extended: true}),
    authController = require("../contollers/auth.controller"),
    check = require("express-validator").check,
    authGuard = require("./guards/auth.guard")

authRoute.get("/signup", authGuard.notAuth, authController.getSignController)
authRoute.get("/login", authGuard.notAuth, authController.getLoginController)
authRoute.post(
    "/signup", bp,
    check("username").not().isEmpty().withMessage("The Username Field Is Required"),
    check("email").not().isEmpty().withMessage("The Email Field Is Required").isEmail().withMessage("Invalid Email"),
    check("password").isLength({min: 8}).withMessage("Password Must Have At Least 8 Characters"),
    check("confirmPassword").custom((value, {req}) => {
        if (value === req.body.password) return true
        else throw "Passwords Do Not Match. Please Re Enter Password"
    }).withMessage("Passwords Do Not Match. Please Re Enter Password"),
    authController.postSignController)
authRoute.post("/login", bp, authController.postLoginController)
authRoute.all("/logout", bp, authGuard.isAuth, authController.postLogoutController)

module.exports = authRoute