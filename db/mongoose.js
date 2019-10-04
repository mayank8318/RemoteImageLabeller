const mongoose = require('mongoose');
mongoose.Promise = global.Promise ;

mongoose.connect(`mongodb://localhost:27017/imagelabeller`,
    { useNewUrlParser: true })
    .catch((err)=> {
       console.log(err);
    });

module.exports = {
    mongoose
};