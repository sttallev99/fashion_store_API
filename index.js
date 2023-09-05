const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/product');
const cartsRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB CONNECTED'))
    .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server is running on http://localhost:5000')))
    .catch((err) => console.log(err))


