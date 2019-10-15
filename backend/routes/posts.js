const express = require('express');
const router = express.Router();


router.post("/api/signup", (req, res, next) => {
    const userData = req.body;
    res.status(200).json({
        message: 'User signup successfuly',
        user: userData
    });
});
router.get("/api/getuserlist", (req, res, next) => {
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

module.exports = router;