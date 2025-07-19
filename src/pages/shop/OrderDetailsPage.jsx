import Breadcrum from "@/components/Breadcrum"
import { getSingleOrderDetails } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"


function OrderDetailsPage() {
    let navigate = useNavigate();
    let [orderDetails, setOrderDetails] = useState(null);
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(false);
    let { user } = useSelector(state => state.auth);
    let { id } = useParams();

    let totalMRP = orderDetails?.products?.reduce((sum, product) => { return sum + product?.price }, 0)
    let deliveryPrice = 50;
    let discountOnMRP = orderDetails?.products?.reduce((sum, product) => { return sum + (product?.price - product?.unitPrice) }, 0);
    let deliveryDiscount = 50;
    let platformFee = 9;

    useEffect(() => {
        setLoading(true);
        getSingleOrderDetails(user.id, id).then((res) => {
            setOrderDetails(res);
        })
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    useEffect(() => {
        const result = [];

        orderDetails?.products.forEach((product) => {
            const sizeCount = {};

            product.size.forEach((size) => {
                if (sizeCount[size]) {
                    sizeCount[size] += 1;
                } else {
                    sizeCount[size] = 1;
                }
            });

            Object.entries(sizeCount).forEach(([size, qty]) => {
                result.push({
                    productId: product.id,
                    image: product.image,
                    productName: product.productName,
                    brand: product.brand,
                    unitPrice: product.unitPrice,
                    price: product.price,
                    size: size,
                    quantity: qty
                });
            });
        });

        setProducts(result);
    }, [orderDetails])

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
        <div className="px-16 py-6 h-[91vh]">
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
                                        <p>{orderDetails?.timestamp}</p> <hr className="border border-[rgb(8,43,61)] h-4" />
                                        <p>{orderDetails?.orderId}</p>
                                    </div>
                                </div>
                                <div className="flex gap-5 mt-5">
                                    <div className="w-[60%] py-4 px-6 rounded-xl shadow-md border border-slate-300 bg-slate-100" >
                                        <div className="font-semibold flex gap-1 items-center">
                                            <span className="bg-[rgb(8,43,61)] text-white rounded py-[1px] select-none px-1 text-[9px] font-medium">{orderDetails?.address?.address_type}</span>
                                            <span className="font-semibold text-base">Drop Location</span>
                                        </div>
                                        <div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-5 mt-2 text-[11px]">
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
                                    <div className="rounded-xl shadow-md border border-slate-300 bg-slate-100 py-4 px-6 leading-[1.6] font-medium w-[40%] text-[12px]">
                                        <span className="font-semibold text-base">Price Details ({products.length} items)</span>
                                        <span className="flex justify-between mt-2">Total MRP <p className="">₹{totalMRP}</p></span>
                                        <span className="flex justify-between">Delivery <p className="">₹{orderDetails?.products?.length > 0 ? deliveryPrice : 0}</p></span>
                                        <span className="flex justify-between text-red-500">Discount on MRP <p className="">- ₹{discountOnMRP}</p></span>
                                        <span className="flex justify-between text-red-500">Discount on Delivery <p className="">- ₹ {deliveryDiscount}</p></span>
                                        <span className="flex justify-between"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-blue-500 lg:hover:underline font-semibold">(Know More)</Link></p> <p className="">₹{orderDetails?.products?.length > 0 ? platformFee : 0}</p></span>
                                        <hr className="pb-1 mt-1" />
                                        <span className="flex justify-between mt-[2px] text-base font-bold text-green-500">Grand Total <p>₹{orderDetails?.products?.length > 0 ? (totalMRP - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee) : 0}</p></span>
                                    </div>
                                </div>
                                <button className="w-full my-5 text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white shadow-md border border-slate-300 bg-slate-100  px-3 py-2 flex justify-between items-center font-semibold" onClick={() => navigate(`/orders/successfull/${id}`)}><p>Payment Method: <span className="uppercase ml-2 font-medium">{orderDetails?.paymentMethod}</span></p> <i className="fi fi-br-angle-double-small-right relative top-[2px]"></i></button>
                                <div className="flex gap-5">
                                    <button className="w-1/4 text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white shadow-md border border-slate-300 bg-slate-100  px-3 py-2 flex justify-between items-center font-semibold gap-5" onClick={() => navigate(`/orders/track-package/${id}`)}>Cancel Order <i className="fi fi-sr-cross-circle relative top-[2px]"></i></button>
                                    <button className="w-1/4 text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white shadow-md border border-slate-300 bg-slate-100  px-3 py-2 flex justify-between items-center font-semibold gap-5" onClick={() => navigate(`/orders/track-package/${id}`)}>Track Shipment <i className="fi fi-br-track relative top-[2px]"></i></button>
                                    <button className="w-1/4 text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white shadow-md border border-slate-300 bg-slate-100  px-3 py-2 flex justify-between items-center font-semibold gap-5">Hide Order <i className="fi fi-sr-eye-crossed relative top-[2px]"></i></button>
                                    <button className="w-1/4 text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white shadow-md border border-slate-300 bg-slate-100  px-3 py-2 flex justify-between items-center font-semibold gap-5">Download Invoice <i className="fi fi-sr-down-to-line relative top-[2px]"></i></button>
                                </div>

                                {/* <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border mt-5 px-6 py-4 flex justify-between items-center font-semibold">
                                    
                                    <div className="w-1/4 h-full flex flex-col justify-end gap-3 text-sm font-semibold">
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/track-package/${id}`)}>Track Package <i className="fi fi-br-angle-double-small-right relative top-[2px]"></i></button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Product Review</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Delivery Feedback</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/seller-profile/${id}`)}>Seller Feedback</button> 
                                    </div>
                                </div> */}
                                <div className="pb-8 mt-5 relative">
                                    {
                                        products?.map((item, index) => (
                                            <div key={index} className="rounded-xl shadow-md border border-slate-300 bg-slate-100 mt-2 p-3 flex flex-col gap-y-5 mb-5">
                                                <div className="w-full flex justify-between">
                                                    <div className="flex gap-5">
                                                        <img src={item.image} alt="" className="border h-[119px] rounded-[6px] object-fit" onClick={() => navigate(`/product-details/${item?.id}`)} />
                                                        <div className="text-[11px] leading-[1.3] relative">
                                                            <div className="flex gap-2 items-center">
                                                                <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
                                                                </div>
                                                                <span className="opacity-50 mr-3 font-semibold tracking-tight">APPAREL & FASHION</span>
                                                            </div>
                                                            <h3 className="font-bold text-base line-clamp-1">{item?.productName}</h3>
                                                            <div className="flex text-sm leading-4">
                                                                <p className="font-semibold">Brand : <span className="text-[rgb(240,85,120)] lg:hover:underline active:underline">{item?.brand}</span></p>
                                                                <p className="font-semibold border-x-2 px-3 mx-3 border-[rgb(8,43,61)]">Size : <span className="text-[rgb(240,85,120)]">{item?.size}</span></p>
                                                                <p className="font-semibold">Qty : <span className="text-[rgb(240,85,120)]">{item?.quantity}</span></p>
                                                            </div>
                                                            <p className="text-sm lg:text-lg font-semibold">₹{item.unitPrice}<s className="font-medium text-sm opacity-60 ml-2">₹{item.price}</s> <span className="font-bold text-xs text-[rgb(240,85,120)]">({`${Math.floor(((item.price - (item.unitPrice)) * 100) / item.price)}`}% OFF)</span></p>
                                                            {/* <p className="text-lg font-bold">₹{item?.unitPrice} <s className="text-gray-600 font-semibold opacity-60 text-base ml-1">₹{productInfo[0]?.price}</s> <span className="text-red-500 text-sm font-semibold">({`${Math.floor(((productInfo[0]?.price - productInfo[0]?.salePrice) * 100) / productInfo[0]?.price)}`}% OFF)</span></p> */}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-5 text-white font-semibold mt-1 self-end">
                                                        <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] h-[33px] px-3 rounded-full lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)] lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200" onClick={() => navigate(`/orders/product-exchange/${id}`)}><i className="fi fi-br-restock relative top-[2px] mr-1"></i> Request Exchange <i className="fi fi-br-angle-double-small-right relative top-[3px]"></i> </button>
                                                        <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] h-[33px] px-3 rounded-full lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)] lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200" onClick={() => navigate(`/orders/product-return/${id}`)}><i className="fi fi-sr-truck-arrow-left relative top-[2px] mr-1"></i> Request Return <i className="fi fi-br-angle-double-small-right relative top-[3px]"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-3 lg:right-0">
                                        Need Help?{" "}
                                        <Link
                                            to="/setting/contact-us"
                                            className="text-blue-500 lg:hover:underline font-bold"
                                        >
                                            Contact Us
                                        </Link>
                                    </span>
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
        </div>
    )
}

export default OrderDetailsPage
