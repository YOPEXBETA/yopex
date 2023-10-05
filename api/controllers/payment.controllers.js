const Payment = require("../models/payment.model");



const getPayments = async (req, res) => {
    try {
        const payment = await Payment.find()
        .populate({path:"user",select:"firstname lastname"});
        if (!payment || payment.length === 0) {
        throw new Error("payment not found!");
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPaymentByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.find({user:id,state: { $in: ["success", "fail"] } }).select("-payment_id");

        if (!payment || payment.length === 0) {
        throw new Error("payment not found!");
        }
        
        
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getPayments,
    getPaymentByUser,
};