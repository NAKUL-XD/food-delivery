import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import OrderModel from '../models/orderModel.js'; // Make sure path is correct

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'receipt_order_' + new Date().getTime(),
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, id: order.id, amount: order.amount });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, error });
  }
};

// VERIFY PAYMENT & SAVE ORDER
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    items,
    address,
    userId = "guest" // Replace if you support login
  } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      // ✅ Save order to DB
      const newOrder = new OrderModel({
        userId,
        items,
        amount,
        address,
        payment: true,
        status: "Order Placed",
        date: new Date()
      });

      await newOrder.save();

      return res.json({ success: true, message: "Payment verified & order saved." });
    } catch (err) {
      console.error("Error saving order:", err);
      return res.status(500).json({ success: false, message: "Order saving failed" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};

export { createOrder, verifyPayment };
