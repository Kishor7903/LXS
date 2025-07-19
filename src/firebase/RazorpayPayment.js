import axios from "axios";
import lxsLogo from "../assets/commonIcons/LXS Logo.png";
import { createOrderInfo, deleteSelectedCartItems, updateOrderInfo } from "./auth";
import { addNewOrder, removeAllSelectedCartItems } from "@/store/features/cartSlice";
import { createShipmentOrder } from "./fship";
import { getTimestamp } from "@/utils/commomFunctions";

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
                    let timestamp = getTimestamp();

                    let orderInfo = {
                        orderId,
                        orderStatus: "Pending",
                        orderUpdates: [
                            {
                                title: "Order Placed",
                                details: [
                                    { text: "Your order is successfully placed", timestamp: timestamp },
                                ],
                            },
                        ],
                        products: cart,
                        address,
                        userId: user.id,
                        email: user.email,
                        paymentId: verifyRes.data.paymentDetails.id,
                        paymentMethod: verifyRes.data.paymentDetails.method,
                        amount: order.amount,
                        timestamp: timestamp
                    };

                    createOrderInfo(user.id, orderInfo).then((res) => {
                        dispatch(addNewOrder({id: res.id, ...orderInfo}))
                        setPopupData({orderId, id:res.id})
                        setShowOrderedSuccessfull(true);

                        createShipmentOrder(
                            orderId,
                            {
                                name: address.name,
                                phone: address.phone,
                                email: user.email,
                                address: `${address.houseNo}, ${address.area}`,
                                landmark: address.landmark,
                                address_type: address.address_type,
                                pincode: address.pincode,
                                city: address.city,
                            },
                            2,
                            order.amount,
                            11056,
                            { weight: 0, length: 0, width: 0, height: 0 },
                            cart
                        )
                        .then((response) => {
                            if(response.order_status === "success"){
                                updateOrderInfo(user.id, res.id, {waybill: response.waybill, apiOrderId: response.apiorderid})
                            }
                        })
                        .catch((err) => console.log("Error Creating Shipping Order: ", err.message));
                    })
                    deleteSelectedCartItems(user.id).then(() => {
                        dispatch(removeAllSelectedCartItems([]));
                    });
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
