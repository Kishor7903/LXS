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