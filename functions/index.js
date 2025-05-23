import functions from "firebase-functions";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config({
  path: "./.env",
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = functions.https.onRequest(async (req, res) => {
  const { amount, currency = "INR", orderId } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt: orderId,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

export const verifyPayment = functions.https.onRequest( async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = CryptoJS.HmacSHA256(
    body,
    process.env.RAZORPAY_SECRET
  ).toString(CryptoJS.enc.Hex);

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Signature verification failed" });
  }

  try {
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    return res.status(200).json({
      success: true,
      message: "Payment verified",
      paymentDetails: payment,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Payment verified, but fetch failed" });
  }
});
