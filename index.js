const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB CONNECTED'))
    .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server is running on http://localhost:5000')))
    .catch((err) => console.log(err))


