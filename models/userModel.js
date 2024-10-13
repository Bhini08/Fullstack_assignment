const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');  // You may use bcrypt for hashing passwords

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide a user name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    }
});

// You can use a pre-save hook to hash the password before saving

const User = mongoose.model('User', userSchema);

module.exports = User;
