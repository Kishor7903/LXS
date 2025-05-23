import Breadcrum from "@/components/Breadcrum"


function TrackReturnAndRefund() {
    let items = [
        {
            label: "Your Orders",
            path: "/setting/my-orders"
        },
        {
            label: "Orders Details",
            path: "/orders/order-details"
        },
        {
            label: "Track Return & Refund",
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
                        <p className=" absolute right-0">
                            Tracking ID:{" "}
                            <span className="lg:hover:underline text-blue-500 cursor-pointer">
                                LSX2876GY12
                            </span>
                        </p>
                    </div>
                    <div className="rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border h-[89.5%] mt-5 px-8 py-5 flex flex-col overflow-y-scroll no-scrollbar w-full">
                        <div className="h-[10%] flex justify-between w-full">
                            <h4 className="text-xl font-bold"><span className="text-orange-600">Delivered</span> on 24 January 2025, Wednesday 11:42 AM</h4>
                            <div className="leading-3 text-right">
                                <p className="font-semibold">SELLER</p>
                                <p className="text-xl font-extrabold">LXS STORE</p>
                                <p className="text-xs font-medium text-blue-500 lg:hover:underline relative bottom-[5px] cursor-pointer">View Seller Profile</p>
                            </div>
                        </div>
                        <div className="h-[35%] w-full mt-5 flex gap-5 relative bottom-4">
                            <img src="https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/n/v/1/-original-imah6s6pq7wxa4u6.jpeg?q=70" alt="" className="h-44 w-44 border rounded-2xl" />
                            <div className="w-[65%] text-xs leading-4">
                                <h3 className="font-bold text-xl text-blue-500">LXS Signature Tee</h3>
                                <p >Sold By : <span className="text-blue-500">LXS Store</span></p>
                                <p>Size : M</p>
                                <p className="text-sm font-bold">₹ 1048.00</p>
                                <p>Return & Exchange window closes on 18 Jan</p>
                                <button className="bg-gradient-to-br from-orange-400 to-red-400 h-9 px-3 rounded-full border mt-3 text-white font-semibold">Buy Again</button>
                            </div>
                        </div>
                        <div className="h-[45%] w-full flex flex-col">
                            <p className="font-semibold">Reason for Return & Refund Request</p>
                            <ul className="text-xs leading-5 font-medium">
                                <li><span className="text-orange-400 mr-1">Option: </span>Return & Refund</li>
                                <li><span className="text-orange-400 mr-1">Reason for Return & Refund: </span>Wrong Size</li>
                                <li><span className="text-orange-400 mr-1">Select Refund Method: </span>Bank Account</li>
                                <li><span className="text-orange-400 mr-1">Option: </span>Return & Refund</li>
                                <li><span className="text-orange-400 mr-1">Proof of Issue: </span>
                                    <div className="flex gap-2">
                                        <div className="h-10 w-10 rounded-[8px] border border-[rgb(8,43,61,0.6)]"></div>
                                        <div className="h-10 w-10 rounded-[8px] border border-[rgb(8,43,61,0.6)]"></div>
                                        <div className="h-10 w-10 rounded-[8px] border border-[rgb(8,43,61,0.6)]"></div>
                                        <div className="h-10 w-10 rounded-[8px] border border-[rgb(8,43,61,0.6)]"></div>
                                    </div>
                                </li>
                                <li><span className="text-orange-400 mr-1">Describe Reason: </span>Mistakenly Wrong Size order in Hurry</li>
                                <li><span className="text-orange-400 mr-1">Estimated Time: </span>Refund Amount Reflect on Given Account Details within 7 Business Days</li>
                                <li><span className="text-orange-400 mr-1">Refund Amount: </span>₹ 799.00</li>
                                <li><span className="text-orange-400 mr-1">Status: </span>Pending</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </>
  )
}

export default TrackReturnAndRefund
