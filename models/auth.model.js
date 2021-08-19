const // Constants Declaration
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    User = mongoose.model("user"/*Collection Name => [product+s=>products]*/, mongoose.Schema(
        {username: String, email: String, password: String, isAdmin: Boolean}
    ))

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => User.findOne({email: email}).then())
            .then(user => {
                if (user) {
                    mongoose.disconnect().then()
                    reject("Email Is Already Used")
                } else return bcrypt.hash(password, 10)
            }).then(hashedPassword => {
            return new User({
                username: username,
                email: email,
                password: hashedPassword,
                isAdmin: false
            }).save()
        }).then(_ => {
            resolve()
            mongoose.disconnect().then()
        }).catch(err => {
            reject(err)
            mongoose.disconnect().then()
        })
    })
}

exports.loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
            mongoose.connect("mongodb://localhost:27017/anaya-shop", {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => User.findOne({email: email}).then())
                .then(user => {
                    if (!user) {
                        reject("Email Is Incorrect")
                        mongoose.disconnect().then()
                    } else {
                        bcrypt.compare(password, user.password).then(isSame => {
                            isSame ? resolve(user) : reject("Password Is Incorrect")
                            mongoose.disconnect().then()
                        })
                    }
                }).catch(err => {
                reject(err)
                mongoose.disconnect().then()
            })
        }
    )
}