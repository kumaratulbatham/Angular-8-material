const express = require('express');
const router = express.Router();
const pool = require('../models/post');

router.post("/api/signup", (req, res, next) => {
    const userData = req.body;
    res.status(200).json({
        message: 'User signup successfuly',
        user: userData
    });
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