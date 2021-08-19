const  // Constants Declaration
    orderModel = require("../models/order.model"),
    cartModel = require("../models/cart.model"),
    validationResult = require("express-validator").validationResult

exports.getOrderController = (req, res) => res.redirect('/cart')

exports.postConfirmOrderController = (req, res) => {

    req.session.itemInfo = {
        name: req.body.name,
        amount: req.body.amount,
        cost: req.body.amount * req.body.price,
        userId: req.session.userId,
        email: req.session.email,
        productId: req.body.cartId,

    }

    res.render("confirmOrder", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        username: req.session.username,
        error: req.flash("validationErrors"),
        src: "single",
        pageTitle: "Confirm Order"

    })
}

exports.postConfirmAllOrdersController = (req, res) =>
    cartModel.getAllItems().then(items => req.session.itemInfo = [...items])
        .then(_ => {
            res.render("confirmOrder", {
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                username: req.session.username,
                error: req.flash("validationErrors"),
                src: "all",
                pageTitle: "Confirm Order"
            })
        })

exports.getOrdersController = (req, res) =>
    orderModel.getOrdersByUserId(req.session.userId)
        .then(items => {
            res.render("orders", {
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                username: req.session.username,
                items: items,
                pageTitle: "Orders"
            })
        })

exports.postOrdersController = (req, res) => {

    if (validationResult(req).isEmpty()) {
        if (req.body.src === "all") {

            for (let i = 0; i < req.session.itemInfo.length; i++) {
                req.session.itemInfo[i].timeStamp = Date.now()
                req.session.itemInfo[i].location = req.body.location
                req.session.itemInfo[i].email = req.session.email
                req.session.itemInfo[i].status = "pending"
                req.session.itemInfo[i].cost = req.session.itemInfo[i].price * req.session.itemInfo[i].amount
            }

            orderModel.addMultipleOrders(req.session.itemInfo)
                .then(items => {
                    res.render("orders", {
                        isUser: req.session.userId,
                        isAdmin: req.session.isAdmin,
                        username: req.session.username,
                        items: items,
                        pageTitle: "Orders"
                    })
                }).then(_ => cartModel.deleteAllItems()).then(res.redirect("/order/orders"))

        } else {

            req.session.itemInfo.timeStamp = Date.now()
            req.session.itemInfo.location = req.body.location
            req.session.itemInfo.status = "pending"

            orderModel.addNewOrder(req.session.itemInfo)
                .then(items => {
                    cartModel.deleteItem(req.session.itemInfo.productId).then()
                    res.render("orders", {
                        isUser: req.session.userId,
                        isAdmin: req.session.isAdmin,
                        username: req.session.username,
                        items: items,
                        pageTitle: "Orders"
                    })

                })
        }
    } else {
        req.flash("validationErrors", validationResult(req).array()[0])
        res.redirect("/order/confirmOrder")
    }
}

exports.postCancelOrderController = (req, res) => orderModel.deleteItem(req.body.orderId).then(_ => res.redirect("/order/orders"))
exports.postCancelAllOrdersController = (req, res) => orderModel.deleteAllItems("pending").then(_ => res.redirect("/order/orders"))