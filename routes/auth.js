const router = require('express').Router();
const CryptoJS = require('crypto-js');

const User = require('../models/User');

//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY)
    });

    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err) {
        res.status(500).json(err);
    }

});

module.exports = router;