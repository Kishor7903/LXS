import Breadcrum from "@/components/Breadcrum"
import OrderProgressStepper from "@/components/OrderProgressStepper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"


function TrackPackage() {
    let { id } = useParams();
    let { user } = useSelector(state => state.auth);
    let { orders } = useSelector(state => state.cart);
    let [orderDetails, setOrderDetails] = useState(null);
    let [status, setStatus] = useState([])

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
        if(user){
            let orderedItem = orders.find((item) => item.id === id);
            setOrderDetails(orderedItem);
            if(orderedItem.orderStatus === "Cancelled"){
                setStatus(["Order Placed", "Cancelled"]);
            }else{
                setStatus(["Order Placed", "Order Approved", "Pickup Done", "In-Transit", "Out for Delivery", "Delivered"])
            }
        }
    }, [orders])

    return (
        <div className="px-16 py-6 h-[91vh]">
            <Breadcrum items={items} />
            <div className="w-full h-[97%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12 relative">
                    <h6 className="font-semibold tracking-wider leading-4">Orbital Tracking Hub 🛸</h6>
                    <div className="flex text-xs font-medium relative">
                        <p className="mr-7">Your drop is circling the orbit — ready for planetary touchdown!</p>
                        <p className=" absolute right-0 -top-[1.5px] text-sm font-semibold">Tracking ID: {orderDetails?.wayBill}<span className="lg:hover:underline text-[rgb(240,85,120)] cursor-pointer">{orderDetails?.waybill}</span></p>
                    </div>
                    <div className="rounded-3xl bg-slate-100 shadow-md border border-slate-300 h-[92.2%] mt-5 px-8 py-5 flex overflow-y-scroll no-scrollbar">
                        <div className="flex flex-col gap-2 text-sm w-full">
                            {
                                orderDetails?.orderUpdates &&
                            <OrderProgressStepper steps={orderDetails?.orderUpdates} currentStep={status.indexOf(orderDetails?.orderStatus)} currentState={orderDetails?.orderStatus} />
                        }
                        </div>
                    </div>
                    <span className="text-[11px] font-medium lg:text-xs absolute bottom-3 lg:bottom-3 lg:right-5">
                        Need Help?{" "}
                        <Link
                            to="/setting/contact-us"
                            className="text-blue-500 lg:hover:underline font-bold"
                        >
                            Contact Us
                        </Link>
                    </span>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)]"></div>
            </div>
        </div>
    )
}

export default TrackPackage
