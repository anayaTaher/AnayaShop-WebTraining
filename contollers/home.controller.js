const products = require("../models/products.model")

exports.getHomeController = (req, res) => {

    let cat = req.query.category

    if (cat && cat !== "all")
        products.getProductsByCategory(cat).then(products => res.render("index", {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            username: req.session.username,
            pageTitle: "Home"
        }))
    else
        products.getAllProducts().then(products => res.render("index", {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            username: req.session.username,
            pageTitle: "Home"
        }))
}