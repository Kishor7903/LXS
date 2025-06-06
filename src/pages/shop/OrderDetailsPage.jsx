import Breadcrum from "@/components/Breadcrum"
import { getSingleOrderDetails } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"


function OrderDetailsPage() {
    let navigate = useNavigate();
    let { products } = useSelector(state => state.admin);
    let [orderDetails, setOrderDetails] = useState([]);
    let { user } = useSelector(state => state.auth);
    let { id } = useParams();

    let productInfo = products.filter(item => item.id === orderDetails?.productInfo?.product_id);
    let deliveryPrice = 50;
    
    useEffect(() => {
        getSingleOrderDetails(user.id, id).then((res) => {
            setOrderDetails(res);
        })
    }, [])

    let items = [
        {
            label: "Your Orders",
            path: "../../setting/my-orders"
        },
        {
            label: "Order Details"
        }
    ]

    return (
        <>
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <h6 className="font-bold tracking-wider">ORDER DETAILS</h6>
                    <div className="flex text-xs font-medium relative">
                        {/* <p className="mr-7">Ordered On {orderDetails.}</p> | */}
                        <p className="ml-7">Order ID: {orderDetails.orderId}</p>
                        <p className="absolute right-32 lg:hover:underline text-blue-500 cursor-pointer">Hide Order</p>
                        <p className="lg:hover:underline text-blue-500 absolute right-0 cursor-pointer">Download Invoice</p>
                    </div>
                    <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-44 mt-5 px-8 py-5 flex">
                        <div className="w-[35%]">
                            <span className="font-semibold text-base">Shipping Address</span>
                            <p className="leading-4 text-sm">{orderDetails?.address?.name} <br />{orderDetails?.address?.houseNo} <br />{orderDetails?.address?.area} <br />{orderDetails?.address?.city},<br /> {orderDetails?.address?.state} <br />{orderDetails?.address?.pincode} <br />India</p>
                        </div>
                        <div className="w-[30%]">
                            <span className="font-semibold text-base">Payments Method</span>
                            <p className="text-sm capitalize">{orderDetails.paymentMethod}</p>
                        </div>
                        <div className="w-[35%] leading-5 text-sm">
                            <span className="font-semibold text-base">Order Summary</span>
                            <span className=" flex justify-between">item(s) Subtotal : <p className="text-right">₹ {productInfo[0]?.price}</p></span>
                            <span className=" flex justify-between">Shipping : <p className="text-right">₹ {deliveryPrice}</p></span> 
                            <span className=" flex justify-between">Total : <p className="text-right">₹ {productInfo[0]?.price + deliveryPrice}</p></span> 
                            <span className=" flex justify-between">Offer Applied : <p className="text-right">₹ {productInfo[0]?.price - productInfo[0]?.salePrice + deliveryPrice}</p></span> 
                            <span className="font-semibold flex justify-between">Grand Total : <p className="text-right">₹ {productInfo[0]?.salePrice}</p></span> 
                        </div>
                    </div>
                    <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-52 mt-5 px-8 py-5 flex">
                        <div className="w-3/4 leading-3">
                            <div className="h-[20%] opacity-80">
                                <h6 className="font-semibold">Delivery 8 January, 2025</h6>
                                <p className="text-xs tracking-tight">Package was handed to nearest Hub</p>
                            </div>
                            <div className="h-[80%] flex gap-5">
                                <img src={productInfo[0]?.images[0]} alt=""className="border w-[25%] rounded-2xl object-fit" />
                                <div className="w-[65%] text-xs leading-4">
                                    <h3 className="font-bold text-xl text-blue-500 line-clamp-1">{productInfo[0]?.name}</h3>
                                    <p >Sold By : <span className="text-blue-500">LXS Store</span></p>
                                    <p>Size : {orderDetails?.productInfo?.size}</p>
                                    <p className="text-sm font-bold">₹ {orderDetails?.amount}</p>
                                    <p>Return & Exchange window closes on 18 Jan</p>
                                    <div className="flex space-x-5 text-white font-semibold mt-1">
                                        <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] h-9 px-3 rounded-full border" onClick={() => navigate("/orders/product-exchange")}>Request Return/Exchange</button>
                                        <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] h-9 px-3 rounded-full border" onClick={() => navigate("/orders/product-return")}>Return Refund</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 h-full flex flex-col justify-between text-sm font-semibold">
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate("/orders/track-package")}>Track Package</button>
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate("/orders/product-reviews")}>Product Review</button>
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate("/orders/product-reviews")}>Delivery Feedback</button>
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate("/orders/seller-profile")}>Seller Feedback</button>
                        </div>
                        
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </>
    )
}

export default OrderDetailsPage
