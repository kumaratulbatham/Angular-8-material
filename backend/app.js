const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// mongoose.connect("mongodb+srv://atulk:<9GES0iIkwM0x9aZl>@701-766-2401-whtzk.mongodb.net/test?retryWrites=true&w=majority")
// .then(() => {
//     console.log('Connected To Database');
// }).catch(() => {
//     console.log('Connection Fail');
// });

// app.use((req, res, next) => {
//     console.log('First Middleware');
//     next();
// });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headres",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});
app.post("/api/signup", (req, res, next) => {
    const userData = req.body;
    res.status(200).json({
        message: 'User signup successfuly',
        user: userData
    });
});
app.get("/api/getuserlist", (req, res, next) => {
    const userData = [
        { title: 'Name', Secure: 'Data' },
        { title: 'Name', Secure: 'Data' },
        { title: 'Name', Secure: 'Data' }
    ]
    res.status(200).json({
        message: 'Message Successfuly',
        user: userData
    });
});

module.exports = app;