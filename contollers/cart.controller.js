const  // Constants Declaration
    cartModel = require("../models/cart.model"),
    validationResult = require("express-validator").validationResult

exports.getCartController = (req, res) =>
    cartModel.getItemsByUserId(req.session.userId)
        .then(items =>
            res.render("cart", {
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                username: req.session.username,
                items: items,
                pageTitle: "Cart"
            })
        )

exports.postCartController = (req, res) => {

    if (validationResult(req).isEmpty()) {
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            productId: req.body.productId,
            timeStamp: Date.now()
        }).then(_ => res.redirect("/cart"))
    } else {
        req.flash("validationErrors", validationResult(req).array()[0])
        res.redirect(req.body.redirectTo)
    }
}

exports.postSaveCartController = (req, res) => {

    if (validationResult(req).isEmpty()) {
        cartModel.editItem(req.body.cartId, {
            amount: req.body.amount,
            timeStamp: Date.now()
        }).then(_ => res.redirect("/cart"))
    } else {
        req.flash("validationErrors", validationResult(req).array()[0])
        res.redirect("/cart")
    }
}

exports.postDeleteCartController = (req, res) => cartModel.deleteItem(req.body.cartId).then(_ => res.redirect("/cart"))

exports.postDeleteAllCartController = (req, res) => cartModel.deleteAllItems().then(_ => res.redirect("/cart"))