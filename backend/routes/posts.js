const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const pool = require('../models/post');
const jwt = require('jsonwebtoken');

router.post("/api/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        pool.query('INSERT INTO users SET ?', req.body, (error, result) => {
            if (error) throw error;

            res.status(201).json({
                'message': 'User signup successfuly',
                'userData': result
            });
        });
    })

});

router.post("/api/login", (req, res, next) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
        const USERS = result;
        const user = Object.values(USERS).find(user => user.email === req.body.email);
        if (!user) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        const token = jwt.sign(
            { email: user.email, userId: user.mobile_no },
            "secret_this_should_be_longer",
            { expiresIn: "1h" }
        );
        res.status(200).json({
            access_token: token,
            expiresIn: 3600
        });
    });
    // let fetchedUser;
    // User.findOne({ email: req.body.email })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(401).json({
    //                 message: "Auth failed"
    //             });
    //         }
    //         fetchedUser = user;
    //         return bcrypt.compare(req.body.password, user.password);
    //     })
    //     .then(result => {
    //         if (!result) {
    //             return res.status(401).json({
    //                 message: "Auth failed"
    //             });
    //         }
    //         const token = jwt.sign(
    //             { email: fetchedUser.email, userId: fetchedUser._id },
    //             "secret_this_should_be_longer",
    //             { expiresIn: "1h" }
    //         );
    //         res.status(200).json({
    //             token: token,
    //             expiresIn: 3600
    //         });
    //     })
    //     .catch(err => {
    //         return res.status(401).json({
    //             message: "Auth failed"
    //         });
    //     });
});

router.get("/api/getuserlist", (req, res, next) => {
    pool.query('SELECT * FROM mantis_user_table', (error, result) => {
        if (error) throw error;

        res.status(200).json({
            'message': 'User List Successfully',
            'userData': result
        });
    });
});

module.exports = router;