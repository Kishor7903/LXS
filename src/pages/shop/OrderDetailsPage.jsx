import Breadcrum from "@/components/Breadcrum"
import { getSingleOrderDetails } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"


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
                    <div className="flex justify-between">
                        <h6 className="font-bold text-lg">ORDER DETAILS</h6>
                        <div className="flex text-xs gap-5 justify-end relative mr-2 self-end font-semibold">
                            <p>Order Date: {orderDetails.timestamp}</p> <hr className="border border-[rgb(8,43,61)] h-4" />
                            <p>Order ID: {orderDetails.orderId}</p>
                        </div>
                    </div>
                    <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-44 mt-3 px-8 py-5 flex">
                        <div className="w-[35%]">
                            <span className="font-semibold text-base">Shipping Address</span>
                            <p className="leading-4 text-sm">{orderDetails?.address?.name} <br />{orderDetails?.address?.houseNo} <br />{orderDetails?.address?.area} <br />{orderDetails?.address?.city},<br /> {orderDetails?.address?.state} <br />{orderDetails?.address?.pincode} <br />India</p>
                        </div>
                        <div className="w-[30%]">
                            <span className="font-semibold text-base">Payments Method</span>
                            <p className="text-sm capitalize">{orderDetails.paymentMethod}</p>
                        </div>
                        <div className="w-[35%] leading-5 text-sm font-medium">
                            <span className="font-semibold text-base">Order Summary</span>
                            <span className=" flex justify-between">item(s) Subtotal : <p className="text-right">₹{productInfo[0]?.price}</p></span>
                            <span className=" flex justify-between">Shipping : <p className="text-right">₹{deliveryPrice}</p></span>
                            <span className=" flex justify-between">Total : <p className="text-right">₹{productInfo[0]?.price + deliveryPrice}</p></span>
                            <span className=" flex justify-between text-red-500">Offer Applied : <p className="text-right">-₹{productInfo[0]?.price - productInfo[0]?.salePrice + deliveryPrice}</p></span>
                            <span className="text-lg mt-1 font-bold flex justify-between text-green-500">Grand Total : <p className="text-right">₹{productInfo[0]?.salePrice}</p></span>
                        </div>
                    </div>
                    <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-60 mt-5 px-8 py-5 flex">
                        <div className="w-3/4 leading-3">
                            <div className="h-[12%] opacity-80">
                                <h6 className="font-semibold"> Expectde Delivery: 8 January, 2025</h6>
                            </div>
                            <div className="h-[88%] flex gap-5">
                                <img src={productInfo[0]?.images[0]} alt="" className="border w-[25%] rounded-2xl object-fit" />
                                <div className="w-[65%] text-xs leading-4 relative">
                                    <div className="flex gap-2 items-center">
                                    <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
                                    </div>
                                    <span className="opacity-50 mr-3 font-semibold tracking-tight">APPAREL & FASHION</span>
                                    </div>
                                    <h3 className="font-bold text-xl line-clamp-1">{productInfo[0]?.name}</h3>
                                    <p className="font-semibold">Sold By : <Link className="text-blue-500 lg:hover:underline active:underline">LXS Store</Link></p>
                                    <p className="font-semibold">Size : {orderDetails?.productInfo?.size}</p>
                                    <p className="text-lg font-bold">₹{orderDetails?.amount} <s className="text-gray-600 font-semibold opacity-60 text-base ml-1">₹{productInfo[0]?.price}</s> <span className="text-red-500 text-sm font-semibold">({`${Math.floor(((productInfo[0]?.price - productInfo[0]?.salePrice) * 100) / productInfo[0]?.price)}`}% OFF)</span></p>
                                    <div className="absolute bottom-0 space-y-2">
                                        <div className="flex space-x-5 text-white font-semibold mt-1">
                                            <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] h-9 px-3 rounded-full lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" onClick={() => navigate(`/orders/product-exchange/${id}`)}>Request Exchange</button>
                                            <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] h-9 px-3 rounded-full lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" onClick={() => navigate(`/orders/product-return/${id}`)}>Request Return & Refund</button>
                                        </div>
                                        <p className="font-semibold ml-3">Return & Exchange window closes on 18 Jan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 h-full flex flex-col justify-between text-sm font-semibold">
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/track-package/${id}`)}>Track Package</button>
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Product Review</button>
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Delivery Feedback</button>
                            <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/seller-profile/${id}`)}>Seller Feedback</button>
                        </div>

                    </div>
                    <div className="flex justify-end gap-5 text-xs mt-2 mr-2 font-medium">
                        <p className="lg:hover:underline text-blue-500 cursor-pointer">Hide Order</p>
                        <p className="lg:hover:underline text-blue-500 cursor-pointer">Download Invoice</p>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </>
    )
}

export default OrderDetailsPage
