const // Constants Declaration
    productRoute = require("express").Router(),
    productController = require("../contollers/product.controller")

productRoute.get("/", productController.goToHome)
productRoute.get("/:id", productController.getProductControllerById)

module.exports = productRoute