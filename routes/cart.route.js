const // Constants Declaration
    cartRoute = require("express").Router(),
    cartController = require("../contollers/cart.controller"),
    bodyParser = require("body-parser"),
    bp = bodyParser.urlencoded({extended: true}),
    authGuard = require("./guards/auth.guard"),
    check = require("express-validator").check

cartRoute.get("/", authGuard.isAuth, cartController.getCartController)
cartRoute.post("/", authGuard.isAuth, bp, check("amount").not().isEmpty().isInt({min: 1}).withMessage("Amount Should Be Positive Integer"), cartController.postCartController)
cartRoute.post("/save", authGuard.isAuth, bp, check("amount").not().isEmpty().isInt({min: 1}).withMessage("Amount Should Be Positive Integer"), cartController.postSaveCartController)
cartRoute.post("/delete", authGuard.isAuth, bp, cartController.postDeleteCartController)
cartRoute.post("/deleteAll", authGuard.isAuth, bp, cartController.postDeleteAllCartController)

module.exports = cartRoute