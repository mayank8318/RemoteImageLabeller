let {
    mongoose
} = require('../db/mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        trim: true
    }
});

//passport plugin
userSchema.plugin(passportLocalMongoose);

//TODO: complete this
/* userSchema.methods.isUserAdmin = function (tokenId) {
    return this.isAdmin;
}; */

module.exports = mongoose.model("user", userSchema);