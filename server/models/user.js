var mongoose = require('mongoose');


var User = mongoose.model('Users', {
    name: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    }
});

module.exports = {User};
