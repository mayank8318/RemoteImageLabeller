var User = require("../models/User");
var isLoggedIn = require("../middleware/isLoggedIn");
var passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
let router = require("express").Router();

// Create User - Only Admin
router.post('/register', (req, res) => {
    var user = req.body.username;
    var password = req.body.password;

	 User.findOne({
            username: user
        })
        .then(res_user => {
            if (res_user) {
                res.send({
                    message: "User already exists"
                });
            } else {
                User.register(new User({
                    username: user
                }), password, (err, account) => {
                    if (err) {
                        console.log(err);
                        res.send({
                            message: "Error in registering"
                        });
                    } else {
                        res.status(201).send(account);
                    }

                });
            }
        });
});

module.exports = router;