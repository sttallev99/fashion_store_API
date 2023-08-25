const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
    res.end();
});

mongoose.connect('mongodb+srv://admin:admin@cluster0.sas1iic.mongodb.net/fashion_store')
    .then(() => console.log('DB CONNECTED'))
    .then(() => app.listen(5000, () => console.log('Server is running on http://localhost:5000')))
    .catch((err) => console.log(err))


