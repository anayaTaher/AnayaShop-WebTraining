const // Constants Declaration
    orderRoute = require("express").Router(),
    orderController = require("../contollers/order.controller"),
    bodyParser = require("body-parser"),
    bp = bodyParser.urlencoded({extended: true}),
    authGuard = require("./guards/auth.guard"),
    {check} = require("express-validator")

orderRoute.get("/", authGuard.isAuth, orderController.getOrderController)
orderRoute.get("/confirmOrder", authGuard.isAuth, orderController.getOrderController)
orderRoute.get("/confirmAllOrders", authGuard.isAuth, orderController.getOrderController)
orderRoute.post("/confirmOrder", authGuard.isAuth, bp, orderController.postConfirmOrderController)
orderRoute.post("/confirmAllOrders", authGuard.isAuth, bp, orderController.postConfirmAllOrdersController)
orderRoute.get("/orders", authGuard.isAuth, orderController.getOrdersController)
orderRoute.post("/orders", authGuard.isAuth, bp, check("location").not().isEmpty().withMessage("The Location Field Is Required"), orderController.postOrdersController)
orderRoute.post("/cancel", authGuard.isAuth, bp, orderController.postCancelOrderController)
orderRoute.post("/cancelAll", authGuard.isAuth, bp, orderController.postCancelAllOrdersController)

module.exports = orderRoute