const // Constants Declaration
    express = require("express"),
    app = express(),
    path = require("path"),
    homeRoute = require("./routes/home.route"),
    productRoute = require("./routes/product.route"),
    authRoute = require("./routes/auth.route"),
    cartRoute = require("./routes/cart.route"),
    orderRoute = require("./routes/order.route"),
    adminRoute = require("./routes/admin.route"),
    session = require("express-session"),
    SessionStore = require("connect-mongodb-session")(session),
    flash = require("connect-flash"),
    store = new SessionStore({uri: "mongodb://localhost:27017/anaya-shop", collection: "sessions"})

app.set("view engine", "ejs")
app.set("views", "views")


app.use(express.static(path.join(__dirname, "assets")))
app.use(session({secret: "This Is Trivial Secret To Encrypted", saveUninitialized: false, store: store}))
app.use(flash())
app.use("/products/", productRoute)
app.use("/", homeRoute)
app.use("/", authRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.use("/admin", adminRoute)
app.use((req, res) => res.render("notFound", {
    pageTitle: "Page Not Found",
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
    username: req.session.username,
}))

app.listen(3000, () => console.log("Server Is Listening On Port 3000"))