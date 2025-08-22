import functions from "firebase-functions";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import axios from "axios";
import sibApiV3Sdk from "sib-api-v3-sdk";
import admin from "firebase-admin";
admin.initializeApp();

dotenv.config({
    path: "./.env",
});

// Razorpay backend functionalities........

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

export const verifyPayment = functions.https.onRequest(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = CryptoJS.HmacSHA256(
        body,
        process.env.RAZORPAY_SECRET
    ).toString(CryptoJS.enc.Hex);

    if (expectedSignature !== razorpay_signature) {
        return res
            .status(400)
            .json({ success: false, message: "Signature verification failed" });
    }

    try {
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        return res.status(200).json({
            success: true,
            message: "Payment verified",
            paymentDetails: payment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Payment verified, but fetch failed",
        });
    }
});

export const refundPayment = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res
            .status(405)
            .send({ error: "Only POST requests are allowed" });
    }

    const { payment_id, amount } = req.body;

    if (!payment_id) {
        return res.status(400).send({ error: "Payment ID is required" });
    }

    try {
        const refund = await razorpay.payments.refund(payment_id, {
            amount: amount*100,
            speed: "optimum",
        });

        return res.status(200).send({ success: true, refund });
    } catch (error) {
        console.error("Refund Error:", error);
        return res.status(500).send({ success: false, error: error.message });
    }
});

// FShip backend functionalities.............

export const getCourierList = functions.https.onRequest(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const response = await axios.get(
            "https://capi-qc.fship.in/api/getallcourier",
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );
        return res.status(200).send(response.data);
    } catch (error) {
        console.error("Error Getting All Couriers:", error.message);
        res.status(500).send({
            error: "Failed to get All Courier List",
            data: error.message,
        });
    }
});

export const addWarehouse = functions.https.onRequest(async (req, res) => {
    try {
        const {
            warehouseId,
            warehouseName,
            contactName,
            addressLine1,
            addressLine2,
            pincode,
            city,
            stateId,
            countryId,
            phoneNumber,
            email,
        } = req.body;

        if (!warehouseName || !pincode || !city) {
            return res.status(400).json({
                error: "Required fields missing (warehouseName, pincode, city)",
            });
        }

        const payload = {
            warehouseId,
            warehouseName,
            contactName,
            addressLine1,
            addressLine2,
            pincode,
            city,
            stateId,
            countryId,
            phoneNumber,
            email,
        };

        const response = await axios.post(
            "https://capi-qc.fship.in/api/addwarehouse",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        res.status(200).json({
            success: true,
            fshipResponse: response.data,
        });
    } catch (error) {
        console.error("Error adding warehouse:", error.message);
        res.status(500).json({
            error: "Failed to add warehouse",
            data: error.message,
        });
    }
});

export const createShipment = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const {
            orderId,
            recipient,
            payment_mode,
            total_amount,
            pickup_address_id,
            shipment_details,
            items,
        } = req.body;

        const payload = {
            customer_Name: recipient.name,
            customer_Mobile: recipient.phone,
            customer_Emailid: recipient.email,
            customer_Address: recipient.address,
            landMark: recipient.landmark,
            customer_Address_Type: recipient.address_type,
            customer_PinCode: recipient.pincode,
            customer_City: recipient.city,
            orderId: orderId,
            payment_Mode: payment_mode,
            express_Type: "surface",
            total_Amount: total_amount,
            shipment_Weight: shipment_details.weight,
            shipment_Length: shipment_details.length,
            shipment_Width: shipment_details.width,
            shipment_Height: shipment_details.height,
            pick_Address_ID: pickup_address_id,
            return_Address_ID: 0,
            products: items,
            isTaxIncluded: true,
        };

        const response = await axios.post(
            "https://capi-qc.fship.in/api/createforwardorder",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        const shipment = response.data;
        res.status(200).send(shipment);
    } catch (error) {
        console.error("Error creating shipment:", error.message);
        res.status(500).send({
            error: "Failed to create shipment",
            data: error.message,
        });
    }
});

export const shippingLabel = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const { waybill } = req.body;

        const response = await axios.post(
            "https://capi-qc.fship.in/api/shippinglabel",
            { waybill },
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        const info = response.data;
        res.status(200).send(info);
    } catch (error) {
        console.error("Error creating shipping label:", error.message);
        res.status(500).send({
            error: "Failed to create shipping label",
            data: error.message,
        });
    }
});

export const cancelShipment = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const { waybill, reason } = req.body;

        const response = await axios.post(
            "https://capi-qc.fship.in/api/cancelorder",
            { reason, waybill },
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        const info = response.data;
        res.status(200).send(info);
    } catch (error) {
        console.error("Error Cancelling Shipment:", error.message);
        res.status(500).send({
            error: "Failed to cancel the shipment",
            data: error.message,
        });
    }
});

export const registerPickup = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const { waybills } = req.body;

        const response = await axios.post(
            "https://capi-qc.fship.in/api/registerpickup",
            { waybills },
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        const info = response.data;
        res.status(200).send(info);
    } catch (error) {
        console.error("Error in Registering Order Pickup:", error.message);
        res.status(500).send({
            error: "Failed to register order pickup",
            data: error.message,
        });
    }
});

export const trackingHistory = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const { waybill } = req.body;

        const response = await axios.post(
            "https://capi-qc.fship.in/api/trackinghistory",
            { waybill },
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        const info = response.data;
        res.status(200).send(info);
    } catch (error) {
        console.error("Error Fetching Order Tracking History:", error.message);
        res.status(500).send({
            error: "Failed to fetch order tracking history",
            data: error.message,
        });
    }
});

export const shipmentCurrentStatus = functions.https.onRequest(
    async (req, res) => {
        if (req.method !== "POST") {
            return res.status(405).send({ error: "Method Not Allowed" });
        }

        try {
            const { waybill } = req.body;

            const response = await axios.post(
                "https://capi-qc.fship.in/api/shipmentcurrentstatus",
                { waybill },
                {
                    headers: {
                        "Content-Type": "application/json",
                        signature: process.env.FSHIP_SECURITY_KEY,
                    },
                }
            );

            const info = response.data;
            res.status(200).send(info);
        } catch (error) {
            console.error(
                "Error Fetching Order Current Status:",
                error.message
            );
            res.status(500).send({
                error: "Failed to fetch order current status",
                data: error.message,
            });
        }
    }
);

export const checkPincodeServiceability = functions.https.onRequest(
    async (req, res) => {
        if (req.method !== "POST") {
            return res.status(405).send({ error: "Method Not Allowed" });
        }

        try {
            const { source_Pincode, destination_Pincode } = req.body;

            if (!source_Pincode || !destination_Pincode) {
                return res.status(400).send({
                    error: "Both source_Pincode and destination_Pincode are required.",
                });
            }

            const payload = {
                source_Pincode: source_Pincode,
                destination_Pincode: destination_Pincode,
            };

            const response = await axios.post(
                "https://capi-qc.fship.in/api/pincodeserviceability",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        signature: process.env.FSHIP_SECURITY_KEY,
                    },
                }
            );

            const result = response.data;

            res.status(200).send(result);
        } catch (error) {
            console.error(
                "Error checking pincode serviceability:",
                error.message
            );
            res.status(500).send({
                error: "Failed to check pincode serviceability",
                data: error.message,
            });
        }
    }
);

export const reattemptOrder = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
        const {
            apiorderid,
            action,
            reattempt_date,
            contact_name,
            complete_address,
            landmark,
            mobilenumber,
            remarks,
        } = req.body;

        const payload = {
            apiorderid,
            action,
            reattempt_date,
            contact_name,
            complete_address,
            landmark,
            mobilenumber,
            remarks,
        };

        const response = await axios.post(
            "https://capi-qc.fship.in/api/reattemptorder",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    signature: process.env.FSHIP_SECURITY_KEY,
                },
            }
        );

        const result = response.data;

        res.status(200).send(result);
    } catch (error) {
        console.error("Error checking pincode serviceability:", error.message);
        res.status(500).send({
            error: "Failed to check pincode serviceability",
            data: error.message,
        });
    }
});

// Bvevo email sender...................

export const sendPromoEmail = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }

    const { email, subject, htmlContent } = req.body;

    if (!email || !subject || !htmlContent) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const defaultClient = sibApiV3Sdk.ApiClient.instance;
    const apiKeyInstance = defaultClient.authentications["api-key"];
    apiKeyInstance.apiKey = process.env.BREVO_EMAIL_KEY;

    const apiInstance = new sibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
        to: [{ email }],
        sender: {
            name: "LXS Lifestyle Store",
            email: "lxs.lifestyle.store@gmail.com",
        },
        subject,
        htmlContent,
    };

    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
});

// export const sendSMS = functions.https.onRequest(async (req, res) => {
//     if (req.method !== "POST") {
//         return res.status(405).send({ error: "Method Not Allowed" });
//     }

//     try {
//         const { phone, message } = req.body;

//         const response = await axios.post(
//             "https://api.brevo.com/v3/transactionalSMS/sms",
//             {
//                 sender: "YourBrand", // Must be approved in Brevo
//                 recipient: phone, // Format: +91XXXXXXXXXX
//                 content: message,
//                 type: "transactional",
//             },
//             {
//                 headers: {
//                     "api-key": "YOUR_BREVO_API_KEY",
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         return res.status(200).json({ success: true, data: response.data });
//     } catch (error) {
//         console.error("SMS Error:", error.response?.data || error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// });

export const sendWhatsAppMessage = functions.https.onRequest(
    async (req, res) => {
        if (req.method !== "POST") {
            return res.status(405).send({ error: "Method Not Allowed" });
        }

        try {
            const { recipient, message } = req.body;

            const token = process.env.META_ACCESS_TOKEN;
            const phoneNumberId = process.env.META_PHONE_ID;

            const response = await axios.post(
                `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
                {
                    messaging_product: "whatsapp",
                    to: recipient, // E.g., "+919876543210"
                    type: "text",
                    text: {
                        body: message,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.status(200).json({ success: true, data: response.data });
        } catch (error) {
            console.error(
                "WhatsApp Error:",
                error.response?.data || error.message
            );
            return res
                .status(500)
                .json({ success: false, error: error.message });
        }
    }
);

// Fast2SMS api for sms sending............................

export const sendSMS = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { phone, message } = req.body;
    console.log(phone, message);

    if (!phone || !message) {
        return res
            .status(400)
            .json({ error: "Phone and message are required" });
    }

    try {
        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "v3",
                sender_id: "TXTIND", // Change if approved
                message,
                language: "english",
                numbers: phone,
            },
            {
                headers: {
                    authorization: process.env.FAST2SMS_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Push Notificationn using FCM ........................

export const sendNotification = functions.https.onRequest(async (req, res) => {
    const {token, title, body} = req.body;

    try {
        const response = await admin.messaging().send({
            token: token,
            notification: {
                title,
                body
            }
        });
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});
