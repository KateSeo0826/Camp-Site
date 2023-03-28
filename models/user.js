const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({

    // username: {
    //     type: String,
    //     require: [true, 'Username cannot be blank']
    // },
    email: {
        type: String,
        require: [true],
        unique: true
    },
    // password: {
    //     type: String,
    //     require: [true, 'Password cannot be blank']
    // }
})

UserSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', UserSchema)
