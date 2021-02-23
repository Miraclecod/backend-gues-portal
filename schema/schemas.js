const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: String,
    lastName: String,
    gender: String,
    birthday: String,
    email: String,
    password: String,
    specialOffers: Boolean,
    token: String
});

module.exports.userScheme = userScheme;
