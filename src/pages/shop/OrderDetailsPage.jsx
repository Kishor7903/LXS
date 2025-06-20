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
    let [loading, setLoading] = useState(false);
    let { user } = useSelector(state => state.auth);
    let { id } = useParams();

    let productInfo = products.filter(item => item.id === orderDetails?.productInfo?.product_id);
    let deliveryPrice = 50;
    let deliveryDiscount = 50;
    let platformFee = 9;
    let discountOnMRP = productInfo[0]?.price - productInfo[0]?.salePrice

    useEffect(() => {
        setLoading(true);
        getSingleOrderDetails(user.id, id).then((res) => {
            setOrderDetails(res);
        })
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    let items = [
        {
            label: "My Orders",
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
                    {
                        !loading ? (
                            <>
                                <div className="flex justify-between">
                                    <div className="leading-[1] font-semibold">Shipment LogBook 📦<br />
                                        <p className="text-xs font-normal">Every purchase, every dispatch — all under your command</p>
                                    </div>
                                    <div className="flex text-xs gap-5 justify-end relative mr-2 self-end font-semibold">
                                        <p>Order Date: {orderDetails.timestamp}</p> <hr className="border border-[rgb(8,43,61)] h-4" />
                                        <p>Order ID: {orderDetails.orderId}</p>
                                    </div>
                                </div>
                                <div className="flex gap-10 mt-5">
                                    <div className="w-[60%] py-4 px-8 rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border " >
                                        <span className="font-semibold text-base">Shipping Address</span>
                                        <div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-5 pl-2 mt-2 text-[11px]">
                                            <div className="flex flex-col leading-3">
                                                <p>Name</p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.name}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>Phone No. </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.phone}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>House No./Appartment No. </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.houseNo}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>Village/Area Name </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.area}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>Landmark </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.landmark ? orderDetails?.address?.landmark : "_"}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>Pincode </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.pincode}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>City/Town </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.city}</p>
                                            </div>
                                            <div className="flex flex-col leading-3">
                                                <p>State </p>
                                                <p className="text-[14px] font-semibold">{orderDetails?.address?.state}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-44 px-8 py-3 w-1/2">
                                        <span className="font-semibold text-base">Shipping Address</span>
                                        <p className="leading-[1] text-sm mt-1 font-medium pl-2">{orderDetails?.address?.name} <br />{orderDetails?.address?.houseNo} <br />{orderDetails?.address?.area} <br />{orderDetails?.address?.city},<br /> {orderDetails?.address?.state} <br />{orderDetails?.address?.pincode} <br />India</p>
                                    </div> */}
                                    <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border py-4 px-8 leading-[1.2] font-medium w-[40%] text-[12px]">
                                        <span className="font-semibold text-base">Price Details</span>
                                        <span className="flex justify-between mt-2">Total MRP <p className="">₹{productInfo[0]?.price}</p></span>
                                        <span className="flex justify-between">Delivery <p className="">₹{productInfo.length > 0 ? deliveryPrice : 0}</p></span>
                                        <span className="flex justify-between text-red-500">Discount on MRP <p className="">- ₹{discountOnMRP}</p></span>
                                        <span className="flex justify-between text-red-500">Discount on Delivery <p className="">- ₹ {deliveryDiscount}</p></span>
                                        <span className="flex justify-between"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-blue-500 lg:hover:underline font-semibold">(Know More)</Link></p> <p className="">₹{productInfo.length > 0 ? platformFee : 0}</p></span>
                                        <hr className="pb-1 mt-1" />
                                        <span className="flex justify-between mt-[2px] text-base font-bold text-green-500">Grand Total <p>₹{productInfo.length > 0 ? (productInfo[0]?.price - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee) : 0}</p></span>
                                    </div>
                                </div>
                                <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border mt-5 px-8 py-3 flex font-semibold">
                                    Payment Method: <span className="uppercase ml-2 font-medium">{orderDetails.paymentMethod}</span>
                                </div>
                                <div className="flex justify-end gap-5 text-xs mt-4 mr-2 font-medium">
                                    <p className="lg:hover:underline text-blue-500 cursor-pointer">Hide Order</p>
                                    <p className="lg:hover:underline text-blue-500 cursor-pointer">Download Invoice</p>
                                </div>
                                <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-60 mt-2 px-8 py-5 flex">
                                    <div className="w-3/4 leading-3">
                                        <div className="h-[12%] opacity-80">
                                            <h6 className="font-semibold"> Expected Delivery: 8 January, 2025</h6>
                                        </div>
                                        <div className="h-[88%] flex gap-5">
                                            <img src={productInfo[0]?.images[0]} alt="" className="border w-[25%] rounded-2xl object-fit" onClick={() => navigate(`/product-details/${productInfo[0]?.id}`)} />
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
                                    <div className="w-1/4 h-full flex flex-col justify-end gap-3 text-sm font-semibold">
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/track-package/${id}`)}>Track Package</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Product Review</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Delivery Feedback</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/seller-profile/${id}`)}>Seller Feedback</button>
                                    </div>

                                </div>
                            </>
                        )
                            : (
                                <div className="space-y-6 max-w-5xl w-full animate-pulse">

                                    {/* Header */}
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="h-4 w-36 bg-gray-300 rounded-md" />
                                        <div className="flex gap-7 relative top-2">
                                            <div className="h-3 w-52 bg-gray-300 rounded" />
                                            <div className="h-3 w-52 bg-gray-300 rounded" />
                                        </div>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="grid grid-cols-3 gap-4 border border-gray-300 rounded-xl px-6 py-5 shadow-sm">
                                        <div className="space-y-2">
                                            <div className="h-5 w-32 bg-gray-300 rounded" />
                                            <div className="h-3 w-40 bg-gray-200 rounded" />
                                            <div className="h-3 w-44 bg-gray-200 rounded" />
                                            <div className="h-3 w-36 bg-gray-200 rounded" />
                                            <div className="h-3 w-40 bg-gray-200 rounded" />
                                            <div className="h-3 w-20 bg-gray-200 rounded" />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="h-5 w-36 bg-gray-300 rounded" />
                                            <div className="h-3 w-24 bg-gray-200 rounded" />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="h-5 w-36 bg-gray-300 rounded" />
                                            <div className="flex justify-between">
                                                <div className="h-3 w-24 bg-gray-200 rounded" />
                                                <div className="h-3 w-10 bg-gray-200 rounded" />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-3 w-24 bg-gray-200 rounded" />
                                                <div className="h-3 w-10 bg-gray-200 rounded" />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-3 w-24 bg-gray-200 rounded" />
                                                <div className="h-3 w-10 bg-gray-200 rounded" />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-3 w-28 bg-red-200 rounded" />
                                                <div className="h-3 w-10 bg-red-200 rounded" />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-5 w-28 bg-green-300 rounded" />
                                                <div className="h-5 w-12 bg-green-300 rounded" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col border border-gray-300 rounded-xl px-6 py-5 shadow-sm gap-4">
                                        <div className="bg-gray-300 h-4 w-72 rounded"></div>
                                        {/* Image */}
                                        <div className="grid grid-cols-12 space-x-8">
                                            <div className="col-span-2 h-40 w-32 bg-gray-300 rounded-xl" />

                                            {/* Info */}
                                            <div className="col-span-7 space-y-2">
                                                <div className="h-3 w-40 bg-gray-200 rounded" />
                                                <div className="h-4 w-80 bg-gray-300 rounded" />
                                                <div className="h-2 w-32 bg-gray-200 rounded" />
                                                <div className="h-2 w-20 bg-gray-200 rounded" />
                                                <div className="h-4 w-36 bg-green-300 rounded" />
                                                <div className="flex gap-5 pt-2">
                                                    <div className="h-9 w-36 bg-orange-300 rounded-full" />
                                                    <div className="h-9 w-44 bg-red-300 rounded-full" />
                                                </div>
                                                <div className="h-3 w-64 bg-gray-200 rounded ml-2" />
                                            </div>

                                            {/* Buttons */}
                                            <div className="col-span-3 flex flex-col gap-3 items-end">
                                                {[...Array(4)].map((_, i) => (
                                                    <div key={i} className="h-8 w-44 bg-gray-300 rounded-full" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-end gap-6 text-sm relative bottom-2">
                                        <div className="h-3 w-16 bg-gray-300 rounded" />
                                        <div className="h-3 w-28 bg-gray-300 rounded" />
                                    </div>
                                </div>
                            )

                    }

                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </>
    )
}

export default OrderDetailsPage
