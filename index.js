const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: String,
    age: Number
});

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

const User = mongoose.model("User", userScheme);
const user = new User({
    name: "Bill",
    age: 45
});
  
user.save(function(err){
    mongoose.disconnect();  // отключение от базы данных
      
    if(err) return console.log(err);
    console.log("Сохранен объект", user);
});

app.use(cors());

app.post('/login', (req, res) => {
    console.log(req);
    res.json('success');
});

