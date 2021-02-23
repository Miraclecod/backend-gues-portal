const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;

const tokenCreator = require('./utils/tokenCreator');
const randomToken = require('./utils/randomToken');
const schemas = require('./schema/schemas');
const User = mongoose.model("User", schemas.userScheme);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://saleba:Z1x2c3v4b5@cluster0.penv2.mongodb.net/myGues', {
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(port, () => {
            console.log("project start");
        });
    } catch (e) {
        console.log(e)
    }
}

start()

app.use(cors());

app.post('/login', (req, res) => {
    User.findOneAndUpdate(
        { email: req.body.email, password: tokenCreator(req.body.password) },
        { token: randomToken()},
        { returnOriginal: false }, function(err, result) {
        mongoose.disconnect();

        if(err) return console.log(err);

        res.json({name: result.name, token: result.token});
    });
});

app.post('/registration', (req, res) => {
    User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthday: req.body.birthday,
        email: req.body.email,
        password: tokenCreator(req.body.password),
        specialOffers: req.body.specialOffers
    }, function(err) {
        if(err) console.log(err);

        return true;
    });

    res.json('success');
});

app.post('/signOut', (req, res) => {
    User.findOneAndUpdate(
        { token: req.body.token },
        { token: ''},
        { returnOriginal: false }, function(err, result) {
        mongoose.disconnect();

        if(err) return console.log(err);

        res.json(true);
    });
})