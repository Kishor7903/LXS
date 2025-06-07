import Breadcrum from "@/components/Breadcrum"
import { useParams } from "react-router-dom"


function TrackPackage() {
    let { id } = useParams();
    
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
    
    return (
        <>
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <h6 className="font-bold tracking-wider">Delivered By LXS Store</h6>
                    <div className="flex text-xs font-medium relative">
                        <p className="mr-7">Ordered On 5 January, 2025</p>
                        <p className=" absolute right-0">Tracking ID: <span className="lg:hover:underline text-blue-500 cursor-pointer">LSX2876GY12</span></p>
                    </div>
                    <div className="rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border h-[89.5%] mt-5 px-8 py-5 flex overflow-y-scroll no-scrollbar">
                        <div className="flex flex-col gap-2 text-sm w-full">
                            <h6 className="font-semibold">Delivered on 8 January 2025, Wednesday 11:52 AM</h6>
                            <ul className="pl-5 list-disc space-y-3">
                                <li>
                                    <span className="flex justify-between w-full">11:52 AM <p className="w-[70%]">Delivered <br />827013, Bokaro Steel City, Jharkhand, India</p></span>
                                </li>
                                <li className="list-disc">
                                    <span className="flex justify-between w-full">9:53 AM <p className="w-[70%]">Out For Delivery <br />827013, Bokaro Steel City, Jharkhand, India</p></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </>
    )
}

export default TrackPackage
