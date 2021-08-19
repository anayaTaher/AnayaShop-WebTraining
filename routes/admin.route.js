const // Constants Declaration
    adminRoute = require("express").Router(),
    multer = require("multer"),
    adminController = require("../contollers/admin.controller"),
    check = require("express-validator").check,
    adminGuard = require("./guards/admin.guard"),
    path = require("path"),
    bodyParser = require("body-parser"),
    bp = bodyParser.urlencoded({extended: true})

adminRoute.get("/add", adminGuard.isAuth, adminController.getAddController)
adminRoute.get("/manage", adminGuard.isAuth, adminController.getManageController)
adminRoute.post("/manage", adminGuard.isAuth, bp, adminController.postManageSearchController)

adminRoute.post("/add",
    adminGuard.isAuth,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => callback(null, path.join("assets", "images")),
            filename: (req, file, callback) => callback(null, Date.now() + "-" + file.originalname)
        })
    }).single("image"),
    check("name").not().isEmpty().withMessage("The Product Name Is Required"),
    check("price").not().isEmpty().withMessage("The Price Field Is Required"),
    check("category").not().isEmpty().withMessage("The Category Type Is Required"),
    check("description").not().isEmpty().withMessage("The Description Field Is Required"),
    check("image").custom((value, {req}) => {
        if (req.file) return true
        else throw "Image Is Required";
    }),
    adminController.postAddController
)

module.exports = adminRoute