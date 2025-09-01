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

    let breadcrum = ["My Account", "Orders", "Order Details", "Track Package"];

    useEffect(() => {
        if(user){
            let orderedItem = orders.find((item) => item.id === id);
            setOrderDetails(orderedItem);
            if(orderedItem?.orderStatus === "Cancelled"){
                setStatus(["Order Placed", "Cancelled"]);
            }else{
                setStatus(["Order Placed", "Order Approved", "Pickup Done", "In-Transit", "Out for Delivery", "Delivered"])
            }
        }
    }, [orders])

    return (
        <div className="px-16 flex gap-10 py-6 h-[calc(100vh-64px)]">
            <div className="w-[60%] gap-10">
                <Breadcrum items={breadcrum} />
                <div className="relative pl-5 mt-3">
                    <h6 className="font-semibold tracking-wider leading-4">Orbital Tracking Hub 🛸</h6>
                    <div className="flex text-xs font-medium relative">
                        <p className="mr-7">Your drop is circling the orbit — ready for planetary touchdown!</p>
                        <p className=" absolute right-0 -top-[1.5px] text-sm font-semibold">Tracking ID: {orderDetails?.wayBill}<span className="lg:hover:underline text-[rgb(253,84,120)] cursor-pointer">{orderDetails?.waybill}</span></p>
                    </div>
                    <div className="rounded-3xl bg-slate-100 shadow-md border border-slate-300 h-[calc(100vh-185px)] mt-3 pl-8 py-6 flex ">
                            {
                                orderDetails?.orderUpdates &&
                            <OrderProgressStepper steps={orderDetails?.orderUpdates} currentStep={status.indexOf(orderDetails?.orderStatus)} currentState={orderDetails?.orderStatus} className="overflow-y-scroll no-scrollbar h-full w-[80%]" />
                        }
                    </div>
                    <span className="text-[11px] font-medium lg:text-xs absolute bottom-3 lg:bottom-3 lg:right-5">
                        Need Help?{" "}
                        <Link
                            to="/setting/contact-us"
                            className="text-[rgb(59,130,246)] lg:hover:underline font-bold"
                        >
                            Contact Us
                        </Link>
                    </span>
                </div>
            </div>
            <div className="w-[40%] h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default TrackPackage
