const products = require("../models/products.model")

exports.getProductControllerById = (req, res) =>
    products.getProductById(req.params.id)
        .then(product => res.render("product", {
                product: product,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                username: req.session.username,
                pageTitle: "Product"
            })
        )

exports.goToHome = (req, res) => res.redirect("/")