const // Constants Declaration
    mongoose = require("mongoose"),
    order = mongoose.model("order"/*Collection Name => [order+s=>orders]*/, mongoose.Schema(
        {
            name: String, amount: Number, cost: Number, userId: String,
            productId: String, timeStamp: Number, location: String, status: String, email: String
        }
    ))

exports.addNewOrder = data =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then((_ => new order(data).save()))
            .then(_ => order.find({userId: data.userId}, {}, {sort: {timeStamp: 1}}))
            .then(items => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.addMultipleOrders = data =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(_ => order.create(data))
            .then(_ => order.find({userId: data.userId}, {}, {sort: {timeStamp: 1}}))
            .then(items => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.getOrdersByUserId = userId =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(_ => order.find({userId: userId}, {}, {sort: {timeStamp: 1}}))
            .then((items) => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.getAllOrders = _ =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => order.find().then(items => resolve(items)))
            .then(() => mongoose.disconnect())
            .catch(err => reject(err))
    )

exports.deleteItem = id =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => order.findByIdAndDelete(id))
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
            .then(() => order.deleteMany({status: "pending"}))
            .then(() => {
                mongoose.disconnect().then()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.editItem = (id, newData) =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => order.updateOne({_id: id}, newData))
            .then((items) => {
                mongoose.disconnect().then()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect().then()
                reject(err)
            })
    )

exports.getProductsByStatus = status =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => order.find({status: status}).then(products => resolve(products)))
            .then(() => mongoose.disconnect())
            .catch(err => reject(err))
    )

exports.getProductsByEmail = email =>
    new Promise((resolve, reject) =>
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => order.find({email: email}).then(products => resolve(products)))
            .then(() => mongoose.disconnect())
            .catch(err => reject(err))
    )