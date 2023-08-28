const router = require('express').Router();

router.get('/usertest', (req, res) => {
    res.send('User test is successfull');
    res.end();
});

router.post('/userposttest', (req, res) => {
    const username = req.body.username;
    console.log(username);
    res.send('Your username is:' + username);
    res.end();
})

module.exports = router;