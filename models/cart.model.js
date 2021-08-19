const // Constants Declaration
    mongoose = require("mongoose"),
    cart = mongoose.model("cart"/*Collection Name => [cart+s=>carts]*/, mongoose.Schema(
        {
            name: String, price: Number, amount: Number,
            userId: String, productId: String, timeStamp: Number
        }
    ))

exports.addNewItem = data =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => cart.find({productId: data.productId}))
            .then((items => items.length === 0 ? new cart(data).save() : cart.updateOne({productId: data.productId}, {
                $inc: {amount: data.amount},
                $set: {timeStamp: data.timeStamp}
            })))
            .then(() => {
                mongoose.disconnect().then()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.getItemsByUserId = userId =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => cart.find({userId: userId}, {}, {sort: {timeStamp: 1}}))
            .then((items) => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.getAllItems = _ =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => cart.find({}, {}, {sort: {timeStamp: 1}}))
            .then((items) => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.editItem = (id, newData) =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => cart.updateOne({_id: id}, newData))
            .then((items) => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.deleteItem = id =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => cart.findByIdAndDelete(id))
            .then(() => {
                mongoose.disconnect().then()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )


exports.deleteAllItems = _ =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => cart.remove({}))
            .then(() => {
                mongoose.disconnect().then()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )