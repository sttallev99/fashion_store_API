const router = require('express').Router();

const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken');
const Order = require('../models/Order');

//CREATE ORDER
router.post('/',verifyToken, async(req, res) => {
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE ORDER
router.put('/', verifyTokenAndAdmin, async(req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(res.params.id,{$set: req.body}, {new:true});
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE ORDER
router.delete('/', verifyTokenAndAdmin, async(req, res) => {
    try{   
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order has beed deleted....');
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorization, async(req, res) => {
    try{
        const orders = await Order.find({ userId: req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, async(req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(200).json(err);
    }
});

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date.setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt'},
                    sales: "$amount"
                }
            },
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;