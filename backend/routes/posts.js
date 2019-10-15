const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const pool = require('../models/post');

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