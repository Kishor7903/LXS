import Breadcrum from "@/components/Breadcrum"
import OrderProgressStepper from "@/components/OrderProgressStepper";
import { getSingleOrderDetails } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

const steps = [
    {
        title: "Order Received",
        date: "Fri, 9th May '25",
        details: [
            { text: "Your order is put on hold", timestamp: "Fri, 9th May '25 - 12:00am" },
        ],
    },
    {
        title: "Order Confirmed",
        date: "Fri, 9th May '25",
        details: [
            { text: "Your Order has been placed.", timestamp: "Fri, 9th May '25 - 8:00am" },
            { text: "Seller has processed your order.", timestamp: "Fri, 9th May '25 - 9:52am" },
            { text: "Your item has been picked up by delivery partner.", timestamp: "Fri, 9th May '25 - 9:52am" },
        ],
    },
    {
        title: "Shipped",
        date: "Fri, 9th May '25",
        details: [
            { text: "Ekart Logistics - FMPP3039434847", timestamp: "" },
            { text: "Your item has been shipped.", timestamp: "Fri, 9th May '25 - 10:47am" },
            { text: "Your item has been received in the hub nearest to you", timestamp: "" },
        ],
    },
    {
        title: "Out For Delivery",
        date: "Sun, 11th May '25",
        details: [
            { text: "Your item is out for delivery", timestamp: "Sun, 11th May '25 - 8:20am" },
        ],
    },
    {
        title: "Delivered",
        date: "Sun, 11th May '25",
        details: [
            { text: "Your item has been delivered", timestamp: "Sun, 11th May '25 - 8:19pm" },
        ],
    },
];


function TrackPackage() {
    let { id } = useParams();
    let { user } = useSelector(state => state.auth);
    let [orderDetails, setOrderDetails] = useState(null);

    let items = [
        {
            label: "Your Orders",
            path: "/setting/my-orders"
        },
        {
            label: "Orders Details",
            path: `/orders/order-details/${id}`
        },
        {
            label: "Your Orders",
        },
    ]

    useEffect(() => {
        getSingleOrderDetails(user.id, id).then((res) => {
            setOrderDetails(res);
            console.log(res);
        })
    }, [])

    return (
        <div className="px-16 py-6 h-[91vh]">
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <h6 className="font-semibold tracking-wider">Delivered By LXS Store</h6>
                    <div className="flex text-xs font-medium relative">
                        <p className="mr-7">Ordered On {orderDetails?.timestamp}</p>
                        <p className=" absolute right-0">Tracking ID: <span className="lg:hover:underline text-blue-500 cursor-pointer">{orderDetails?.waybill}</span></p>
                    </div>
                    <div className="rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border h-[89.5%] mt-5 px-8 py-5 flex overflow-y-scroll no-scrollbar">
                        <div className="flex flex-col gap-2 text-sm w-full">
                                <OrderProgressStepper steps={steps} currentStep={2} />
                            {/* <ul className="pl-5 list-disc space-y-3">
                                <li>
                                    <span className="flex justify-between w-full">11:52 AM <p className="w-[80%]">Delivered <br />827013, Bokaro Steel City, Jharkhand, India</p></span>
                                </li>
                                <li className="list-disc">
                                    <span className="flex justify-between w-full">9:53 AM <p className="w-[80%]">Out For Delivery <br />827013, Bokaro Steel City, Jharkhand, India</p></span>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </div>
    )
}

export default TrackPackage
