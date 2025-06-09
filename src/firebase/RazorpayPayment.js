import axios from "axios";
import lxsLogo from "../assets/commonIcons/LXS Logo.png";
import { createOrderInfo, deleteSelectedCartItems } from "./auth";
import { toast } from "react-toastify";
import { removeAllSelectedCartItems } from "@/store/features/cartSlice";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function generateOrderId() {
  const prefix = "LXS-";
  const timestamp = Date.now().toString().slice(3, 14);
  const random = Math.floor(1000 + Math.random() * 9000).toString();
  let newTimestamp = timestamp + random;
  const last4 = newTimestamp.slice(-4);

  const remaining = newTimestamp.slice(0, -4);

  const reversedChunks = remaining
    .split("")
    .reverse()
    .join("")
    .match(/.{1,5}/g) // chunks of 5
    .map((chunk) => chunk.split("").reverse().join(""))
    .reverse();

  const formatted = [...reversedChunks, last4].join("-");
   return prefix + formatted;
}

export const displayRazorpay = async (
  order,
  cart,
  address,
  user,
  setShowOrderedSuccessfull,
  setPopupData,
  dispatch
) => {
  try {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    let orderId = generateOrderId();

    let response = await axios.post(
      "/sachin-kumar-24/us-central1/createOrder",
      { ...order, orderId }
    );

    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      key_secret: "",
      amount: response.data.amount,
      currency: response.data.currency,
      order_id: response.data.id,
      order_receipt: orderId,
      name: "LXS Store",
      image: lxsLogo,
      description: "For Payment Testing Purpose",
      handler: async function (response) {
        let verifyRes = await axios.post(
          "/sachin-kumar-24/us-central1/verifyPayment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        if (verifyRes.data.success) {
          cart.map((item) => {
            let orderDetails = {
              productInfo: {
                product_id: item.productId,
                quantity: item.quantity,
                size: item.size,
                price: item.salePrice,
              },
              address,
              timestamp: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              }),
              userId: user.id,
              email: user.email,
              paymentId: verifyRes.data.paymentDetails.id,
              paymentMethod: verifyRes.data.paymentDetails.method,
              amount: parseInt(item.quantity) * parseInt(item.salePrice),
              orderId,
            };

            createOrderInfo(orderDetails);
          });
          deleteSelectedCartItems(user.id).then(() => {
            dispatch(removeAllSelectedCartItems([]));
          });
          setPopupData({ orderId: orderId });

          setShowOrderedSuccessfull(true);
        } else {
          toast.error("Payment Verification Failed...");
        }
      },
      prefill: {
        name: `${user?.name}`,
        email: `${user?.email}`,
        contact: `${user?.phone}`,
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#082b3d",
      },
    };

    var rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.log(response);
    });
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
  }
};
