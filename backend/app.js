const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const postRoutes = require('./routes/posts');
// const mongoose = require('mongoose');
var mysql = require("mysql");

const app = express();

app.use(bodyParser.json());

///src/app/layout/charge-station/components/remote-stop
// ng g component src/app/layout/charge-station/components/remote-stop 
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
app.use(postRoutes);

module.exports = app;