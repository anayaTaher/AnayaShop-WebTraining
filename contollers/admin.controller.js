const // Constants Declaration
    orders = require("../models/order.model"),
    products = require("../models/products.model"),
    validationResult = require("express-validator").validationResult,
    order = require("../models/order.model")

exports.getAddController = (req, res) => {
    res.render("addProduct", {
        error: req.flash("validationError")[0],
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        username: req.session.username,
        pageTitle: "Add Product"
    })
}

exports.getManageController = (req, res) => {

    let status = req.query.status

    if (status && status !== "all")
        order.getProductsByStatus(status).then(items => res.render("manageProducts", {
            items: items,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            username: req.session.username,
            pageTitle: "Manage Products"
        }))
    else
        order.getAllOrders().then(items => res.render("manageProducts", {
            items: items,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            username: req.session.username,
            pageTitle: "Manage Products"
        }))
}

exports.postManageSearchController = (req, res) => {

    if (req.body.orderId === undefined)
        order.getProductsByEmail(req.body.email).then(items => res.render("manageProducts", {
            items: items,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            username: req.session.username,
            pageTitle: "Manage Products"
        }))
    else
        orders.editItem(req.body.orderId, {status: req.body.status}).then(_ => res.redirect("/admin/manage"))
}

exports.postAddController = (req, res) => {
    let errors = validationResult(req).array()

    if (errors.length === 0) {
        products.AddNewProduct({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file.filename
        }).then(_ => res.redirect("/admin/add")).catch(_ => res.redirect("/admin/add"))
    } else {
        req.flash("validationError", errors[0].msg)
        res.redirect("/admin/add")
    }
}