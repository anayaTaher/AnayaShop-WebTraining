const // Constants Declaration
    homeRoute = require("express").Router(),
    homeController = require("../contollers/home.controller")

homeRoute.get("/", homeController.getHomeController)

module.exports = homeRoute