const // Constants Declaration
    mongoose = require("mongoose"),
    product = mongoose.model("product"/*Collection Name => [product+s=>products]*/, mongoose.Schema(
        {name: String, price: Number, category: String, description: String, image: String}
    ))

exports.getAllProducts = _ =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => product.find().then(products => resolve(products)))
            .then(() => mongoose.disconnect())
            .catch(err => reject(err))
    )

exports.getProductsByCategory = category =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => product.find({category: category}).then(products => resolve(products)))
            .then(() => mongoose.disconnect())
            .catch(err => reject(err))
    )

exports.getProductById = id =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => product.findById(id).then(product => resolve(product)))
            .then(() => mongoose.disconnect())
            .catch(err => reject(err))
    )

exports.AddNewProduct = data =>
    new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(_ => {
                return new product(data).save()
            }).then(_ => {
            resolve()
            mongoose.disconnect().then()
        }).catch(err => {
            reject(err)
            mongoose.disconnect().then()
        })
    })