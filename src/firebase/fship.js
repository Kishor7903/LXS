import axios from "axios";

export async function addWarehouse(data) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/addWarehouse",
        data
    );
    return response.data;
}

export async function createShipmentOrder(
    orderId,
    recipient,
    paymentMode,
    totalAmount,
    pickupAddress,
    shipment_details,
    items
) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/createShipment",
        {
            orderId,
            recipient,
            payment_mode: paymentMode,
            total_amount: totalAmount,
            pickup_address_id: pickupAddress,
            shipment_details,
            items,
        }
    );
    return response.data;
}

export async function addShippingLabel(AWB) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/shippingLabel",
        {
            waybill: AWB,
        }
    );
    return response.data;
}

export async function cancelTheShipment(AWB, reason) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/cancelShipment",
        {
            waybill: AWB,
            reason,
        }
    );
    return response.data;
}

export async function registerOrderPickup(AWBs) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/registerPickup",
        {
            waybills: AWBs,
        }
    );
    return response.data;
}

export async function orderTrackingHistory(AWB) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/trackingHistory",
        {
            waybill: AWB,
        }
    );
    return response.data;
}

export async function orderCurrentStatus(AWB) {
    const response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/shipmentCurrentStatus",
        {
            waybill: AWB,
        }
    );
    return response.data;
}

export async function getAllCourierList() {
    const response = await axios.get(
        "/lxslifestylestore-8935b/us-central1/getCourierList"
    );
    return response.data;
}

export async function checkPincode(sourcePincode, destinationPincode) {
    let response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/checkPincodeServiceability",
        {
            source_Pincode: sourcePincode,
            destination_Pincode: destinationPincode,
        }
    );
    return response.data;
}

export async function orderReattempt(apiorderid, action, reattempt_date, contact_name, complete_address, landmark, mobilenumber, remarks) {
    let response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/reattemptOrder",
        {
            apiorderid,
            action,
            reattempt_date,
            contact_name,
            complete_address,
            landmark,
            mobilenumber,
            remarks,
        }
    );
    return response;
}

export const sendEmail = async () => {
    let response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/sendPromoEmail",
        {
            email: "sachinofficialme24@gmail.com",
            subject: "Big Discount Inside!",
            htmlContent: "<h1>🔥 50% Off Today Only!</h1>"
        }
    );
    return response.data;
}

export const sendWhatsAppMessage = async () => {
    let response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/sendPromoEmail",
        {
            recipient: "+917903189506",
            message: "Test Message."
        }
    );
    return response.data;
}

export const sendSms = async () => {
    let response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/sendSMS",
        {
            message: "Hii",
            phone: "+917903189506"
        }
    )
    // console.log(response);
    return response.data;
}

export const sendPushNotification = async (token, title, body) => {
    let response = await axios.post(
        "/lxslifestylestore-8935b/us-central1/sendNotification",
        {
            token,
            title,
            body
        }
    )
    return response.data;
}
  