const LocalStrategy = require('passport-local').Strategy;

let config_passport = (passport)=> {
    var User = require('../models/User');
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

};

module.exports = {
  config_passport
};