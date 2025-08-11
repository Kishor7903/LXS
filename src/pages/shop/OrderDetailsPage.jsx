import Breadcrum from "@/components/Breadcrum";
import { updateOrderInfo } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png";
import { updateOrder } from "@/store/features/cartSlice";
import { useToast } from "@/components/ToastProvider";
import invoice from "../../assets/files/TAX INVOICE.docx"
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { getTimestamp, numberToWords } from "@/utils/commomFunctions";
import { cancelTheShipment } from "@/firebase/fship";
import KnowMorePopup from "@/components/KnowMorePopup";
import SizeSelectionPopup from "@/components/SizeSelectionPopup";
import DialogBox from "@/components/DialogBox";

function OrderDetailsPage() {
    let navigate = useNavigate();
    let [orderDetails, setOrderDetails] = useState(null);
    let [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState(false);
    let [popup, setPopup] = useState(false);
    let [item, setItem] = useState(null);
    let [product, setProduct] = useState([]);
    let [selectedSize, setSelectedSize] = useState([]);
    let [loading, setLoading] = useState(false);
    let { user } = useSelector((state) => state.auth);
    let { orders } = useSelector(state => state.cart);
    let { products } = useSelector(state => state.admin);
    let { id } = useParams();
    let dispatch = useDispatch();
    let toast = useToast();

    let platformFee = 15;

    const handleHideOrder = (e) => {
        e.preventDefault();

        updateOrderInfo(user.id, id, { isHidden: true }).then(() => {
            dispatch(updateOrder({ id: id, ...orderDetails, isHidden: true }))
            toast("Order is now Hidden")
            navigate(-1);
        })
    }

    const handleUnhideOrder = (e) => {
        e.preventDefault();

        updateOrderInfo(user.id, id, { isHidden: false }).then(() => {
            dispatch(updateOrder({ id: id, ...orderDetails, isHidden: false }))
            toast("Order is now Visible")
            navigate(-1);
        })
    }

    const handelDownloadInvoice = async (e) => {
        e.preventDefault();

        const response = await fetch(invoice);
        const arrayBuffer = await response.arrayBuffer();
        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const data = {
            orderId: orderDetails?.orderId,
            orderDate: `${orderDetails?.timestamp.split(",")[1].substring(1, orderDetails?.timestamp.split(",")[1].length)}, ${orderDetails?.timestamp.split(",")[2]}`,
            phone: orderDetails?.address?.phone,
            email: orderDetails?.email,
            items: orderDetails?.products?.length,
            products: orderDetails?.products?.map((item, index) => ({
                qty: item.quantity,
                name: item.productName,
                s: index + 1,
                gro: (item.price * item.quantity).toFixed(2),
                tot: (item.quantity * item.unitPrice).toFixed(2),
                tax: (((item.unitPrice * 100) / 105) * item.quantity).toFixed(2),
                dis: ((item.price - (item.unitPrice * 100) / 105) * item.quantity).toFixed(2),
                gst: ((item.quantity * item.unitPrice) - ((item.unitPrice * 100) / 105) * item.quantity).toFixed(2),
            })),
            tqt: orderDetails?.products?.reduce((sum, i) => { return sum + i.quantity }, 0),
            tgr: orderDetails?.products?.reduce((sum, i) => { return sum + (i.price * i.quantity) }, 0).toFixed(2),
            tto: orderDetails?.products?.reduce((sum, i) => { return sum + (i.unitPrice * i.quantity) }, 0).toFixed(2),
            tta: orderDetails?.products?.reduce((sum, i) => { return sum + (((i.unitPrice * 100) / 105) * i.quantity) }, 0).toFixed(2),
            tgs: orderDetails?.products?.reduce((sum, i) => { return sum + ((i.quantity * i.unitPrice) - ((i.unitPrice * 100) / 105) * i.quantity) }, 0).toFixed(2),
            word: `${numberToWords(orderDetails?.products?.reduce((sum, i) => { return sum + (i.unitPrice * i.quantity) }, 0).toFixed(1))} only`,
            tdi: orderDetails?.products?.reduce((sum, i) => { return sum + ((i.price - (i.unitPrice * 100) / 105) * i.quantity) }, 0).toFixed(2),
            shipping_name: orderDetails?.address?.name,
            shipping_area: `${orderDetails?.address?.houseNo}, ${orderDetails?.address?.area}`,
            shipping_landmark: `${orderDetails?.address?.landmark}, ${orderDetails?.address?.city}`,
            shipping_state: `${orderDetails?.address?.state} (${orderDetails?.address?.pincode})`
        };

        doc.setData(data);

        try {
            doc.render();
        } catch (error) {
            console.error("Doc rendering error:", error);
            return;
        }

        const out = doc.getZip().generate({ type: "blob" });
        saveAs(out, "invoice.docx");
    }

    const handleCancelOrder = (e) => {
        e.preventDefault();

        if (orderDetails?.orderStatus === "Order Placed") {
            cancelTheShipment(orderDetails?.waybill, "Not Needed Further.").then((res) => {
                if (res.status) {
                    let newUpdate = {
                        orderStatus: "Cancelled",
                        orderUpdates: [...orderDetails?.orderUpdates?.slice(0, 1), {
                            title: "Cancelled",
                            details: [{ text: "Order Cancelled by user.", timestamp: getTimestamp() }]
                        }]
                    }
                    dispatch(updateOrder({ ...orderDetails, ...newUpdate }))
                    toast("Order Cancelled Successfully.")
                    updateOrderInfo(user.id, id, { ...newUpdate })
                }
            }).catch(err => {
                console.log("Error at cancelling the shipment: ", err.message);
            })
        } else if (orderDetails?.orderStatus === "Delivered") {
            setPopup(true);
        } else {
            toast("Order can't be Cancelled now.")
        }
    }

    const handleReorderButton = (e, item_id) => {
        e.preventDefault();

        let i = products.find((item) => item.id === item_id);
        setItem(i);
        setIsOpen(true);
    }

    useEffect(() => {
        setLoading(true);
        if (user) {
            let orderedItem = orders.find((item) => item.id === id);
            setOrderDetails(orderedItem);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [orders]);

    useEffect(() => {
        const result = [];

        orderDetails?.products?.forEach(item => {
            item.size.forEach(sizeValue => {
                result.push({
                    ...item,
                    size: sizeValue,
                    quantity: 1
                });
            });
        });


        setProduct(result);
    }, [orderDetails]);

    let items = [
        {
            label: "My Orders",
            path: "../../setting/my-orders",
        },
        {
            label: "Order Details",
        },
    ];

    return (
        <div className="px-16 py-6 h-[calc(100%-64px)] flex gap-10">
            <div className="w-[65%] flex flex-col gap-5">
            <Breadcrum items={items} />
                {!loading ? (
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div className="leading-[1] font-semibold">
                                Shipment LogBook 📦
                                <br />
                                <p className="text-xs font-normal">
                                    Every purchase, every dispatch — all
                                    under your command
                                </p>
                            </div>
                            <div className="flex text-xs gap-5 justify-end relative mr-2 self-end font-semibold">
                                <p>{orderDetails?.timestamp}</p>{" "}
                                <hr className="border border-[rgb(8,43,61)] h-4" />
                                <p className="font-bold">Order ID: <span className="font-semibold">{orderDetails?.orderId}</span></p>
                            </div>
                        </div>
                        <div className="flex gap-5 mt-5">
                            <div className={`w-[60%] py-4 px-6 rounded-xl shadow-md ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)]" : "border border-slate-300 bg-slate-100"}`}>
                                <div className="font-semibold flex gap-1 items-center">
                                    <span className="bg-[rgb(8,43,61)] text-white rounded py-[1px] select-none px-1 text-[9px] font-medium">
                                        {
                                            orderDetails?.address
                                                ?.address_type
                                        }
                                    </span>
                                    <span className="font-semibold text-base">
                                        Drop Location
                                    </span>
                                </div>
                                <div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-5 mt-2 text-[11px]">
                                    <div className="flex flex-col leading-3">
                                        <p>Name</p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>Phone No. </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.phone}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>House No./Appartment No. </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.houseNo}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>Village/Area Name </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.area}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>Landmark </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.landmark
                                                ? orderDetails?.address
                                                    ?.landmark
                                                : "_"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>Pincode </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.pincode}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>City/Town </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.city}
                                        </p>
                                    </div>
                                    <div className="flex flex-col leading-3">
                                        <p>State </p>
                                        <p className="text-[14px] font-semibold">
                                            {orderDetails?.address?.state}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border h-44 px-8 py-3 w-1/2">
                                        <span className="font-semibold text-base">Shipping Address</span>
                                        <p className="leading-[1] text-sm mt-1 font-medium pl-2">{orderDetails?.address?.name} <br />{orderDetails?.address?.houseNo} <br />{orderDetails?.address?.area} <br />{orderDetails?.address?.city},<br /> {orderDetails?.address?.state} <br />{orderDetails?.address?.pincode} <br />India</p>
                                    </div> */}
                            <div className={`rounded-xl shadow-md py-4 px-6 leading-[1.6] font-medium w-[40%] text-[12px] ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)]" : "border border-slate-300 bg-slate-100"}`}>
                                <span className="font-semibold text-base">
                                    Price Details ({product.length} items)
                                </span>
                                <span className="flex justify-between mt-2">
                                    Total MRP{" "}
                                    <p className="">
                                        ₹
                                        {product.reduce((sum, p) => {
                                            return sum + p.price;
                                        }, 0)}
                                    </p>
                                </span>
                                <span className="flex justify-between">
                                    Delivery <p className="">₹ 50</p>
                                </span>
                                <span className="flex justify-between text-[rgb(240,85,120)]">
                                    Discount on MRP{" "}
                                    <p className="">
                                        - ₹
                                        {product.reduce((sum, p) => {
                                            return (
                                                sum +
                                                (p.price - p.unitPrice)
                                            );
                                        }, 0)}
                                    </p>
                                </span>
                                <span className="flex justify-between text-[rgb(240,85,120)]">
                                    Discount on Delivery{" "}
                                    <p className="">- ₹ 50</p>
                                </span>
                                <span className="flex justify-between">
                                    <p>
                                        Platform Fee{" "}
                                        <Link
                                            onClick={(e) => {
                                                e.preventDefault(),
                                                    setOpen(true);
                                            }}
                                            className="text-[10px] text-blue-500 lg:hover:underline font-semibold"
                                        >
                                            (Know More)
                                        </Link>
                                    </p>{" "}
                                    <p className="">₹ {platformFee}</p>
                                </span>
                                <hr className="pb-1 mt-1" />
                                <span className="flex justify-between mt-[2px] text-base font-bold text-green-500">
                                    Grand Total{" "}
                                    <p>
                                        ₹
                                        {product.reduce((sum, p) => {
                                            return sum + p.unitPrice;
                                        }, 0) + platformFee}
                                    </p>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-5 my-5">
                            <button
                                className={`w-[70%] text-sm rounded-xl lg:hover:scale-[1.03] lg:active:scale-[0.98] duration-200 lg:hover:text-white shadow-md px-3 py-2 flex justify-between items-center font-semibold ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)] lg:hover:bg-[rgb(240,85,120)]" : "border border-slate-300 bg-slate-100 lg:hover:bg-[rgb(8,43,61)]"}`}
                                onClick={() =>
                                    navigate(`/orders/successfull/${id}`)
                                }
                            >
                                <p>
                                    Payment Method:{" "}
                                    <span className="uppercase ml-2 font-semibold">
                                        {orderDetails?.paymentMethod}
                                    </span>
                                </p>{" "}
                                <i className="fi fi-br-angle-double-small-right relative top-[2px]"></i>
                            </button>
                            <button
                                className={`w-[30%] text-sm rounded-xl  shadow-md px-3 py-2 flex justify-between items-center font-semibold gap-5 cursor-default ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)]" : "border border-slate-300 bg-slate-100"}`}
                            >
                                <p>
                                    Status:{" "}
                                    <span className={`ml-2 font-semibold ${orderDetails?.orderStatus === "Cancelled" ? "text-[rgb(240,85,120)]" : orderDetails?.orderStatus === "Delivered" ? "text-[rgb(38,165,65)]" : "text-[rgb(248,181,44)]"}`}>
                                        {orderDetails?.orderStatus}
                                    </span>
                                </p>{" "}
                                <i className="fi fi-br-location-crosshairs relative top-[2px]"></i>
                            </button>
                        </div>
                        <div className="flex gap-5 justify-between">
                            <button
                                className={`w-full text-sm rounded-xl duration-200 lg:hover:scale-[1.05] lg:active:scale-[0.98] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white shadow-md px-3 py-2 flex justify-between items-center font-semibold gap-5  ${orderDetails?.orderStatus === "Cancelled" ? "hidden" : "inline-block"} ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)] lg:hover:bg-[rgb(240,85,120)]" : "border border-slate-300 bg-slate-100 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"}`}
                                onClick={handleCancelOrder}
                            >
                                {orderDetails?.orderStatus === "Delivered" ? "Show Off Your Look" : "Cancel Order"}{" "}
                                <i className={`${orderDetails?.orderStatus === "Delivered" ? "fi fi-sr-camera" : "fi fi-sr-cross-circle"} relative top-[2px]`}></i>
                            </button>
                            <button
                                className={`w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:text-white shadow-md px-3 py-2 flex justify-between items-center font-semibold gap-5 ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)] lg:hover:bg-[rgb(240,85,120)]" : "border border-slate-300 bg-slate-100 lg:hover:bg-[rgb(8,43,61)]"}`}
                                onClick={() =>
                                    navigate(`/orders/track-package/${id}`)
                                }
                            >
                                Track Shipment{" "}
                                <i className="fi fi-br-track relative top-[2px]"></i>
                            </button>
                            <button
                                className={`w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:text-white shadow-md px-3 py-2 flex justify-between items-center font-semibold gap-5 ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(240,85,120)] bg-[rgb(253,238,241)] lg:hover:bg-[rgb(240,85,120)]" : "border border-slate-300 bg-slate-100 lg:hover:bg-[rgb(8,43,61)]"}`}
                                onClick={orderDetails?.isHidden ? handleUnhideOrder : handleHideOrder}
                            >
                                {orderDetails?.isHidden ? "Unhide" : "Hide"} Order{" "}
                                <i className={`${orderDetails?.isHidden ? "fi fi-sr-eye" : "fi fi-sr-eye-crossed"} relative top-[2px]`}></i>
                            </button>
                            <button
                                className={`w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:text-white shadow-md px-3 py-2 flex justify-between items-center font-semibold gap-5 ${orderDetails?.orderStatus === "Cancelled" ? "hidden" : "border border-slate-300 bg-slate-100 lg:hover:bg-[rgb(8,43,61)] inline-block"}`}
                                onClick={handelDownloadInvoice}
                            >
                                Download Invoice{" "}
                                <i className="fi fi-sr-down-to-line relative top-[2px]"></i>
                            </button>
                        </div>

                        {/* <div className="rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border mt-5 px-6 py-4 flex justify-between items-center font-semibold">
                                    
                                    <div className="w-1/4 h-full flex flex-col justify-end gap-3 text-sm font-semibold">
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/track-package/${id}`)}>Track Package <i className="fi fi-br-angle-double-small-right relative top-[2px]"></i></button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Product Review</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/product-reviews/${id}`)}>Delivery Feedback</button>
                                        <button className="h-8 w-full bg-gray-200 lg:hover:bg-gray-300 rounded-full border border-[rgb(8,43,61)]" onClick={() => navigate(`/orders/seller-profile/${id}`)}>Seller Feedback</button> 
                                    </div>
                                </div> */}
                        <div className="mt-5 relative pb-1">
                            {product?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl shadow-md mt-2 p-3 flex flex-col gap-y-5 mb-5 cursor-pointer ${orderDetails?.orderStatus === "Cancelled" ? "border-2 border-[rgb(245,80,118)] bg-[rgb(253,238,241)]" : "border border-slate-300 bg-slate-100"}`}
                                >
                                    <div className="w-full flex items-end relative">
                                        <div className="flex gap-3 w-full">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="border h-[121px] rounded-[6px] object-fit"
                                                onClick={() =>
                                                    navigate(
                                                        `/product-details/${item?.id}`
                                                    )
                                                }
                                            />
                                            <div className="text-[11px] leading-[1.3] relative w-[68%]">
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]">
                                                        <img
                                                            src={lxsLogo}
                                                            alt=""
                                                            className="h-[12px]"
                                                        />{" "}
                                                        <span className="text-[10px] text-white font-medium">
                                                            LXS Certified
                                                        </span>
                                                    </div>
                                                    <span className="opacity-50 mr-3 font-semibold tracking-tight">
                                                        APPAREL & FASHION
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-base line-clamp-1 w-[90%]">
                                                    {item?.productName}
                                                </h3>
                                                <div className="flex text-sm leading-4">
                                                    <p className="font-semibold">
                                                        Brand :{" "}
                                                        <span className="text-[rgb(240,85,120)] lg:hover:underline active:underline">
                                                            {item?.brand}
                                                        </span>
                                                    </p>
                                                    <p className="font-semibold border-l-2 px-3 mx-3 border-[rgb(8,43,61)]">
                                                        Size :{" "}
                                                        <span className="text-[rgb(240,85,120)]">
                                                            {item?.size}
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="text-sm lg:text-base leading-5 font-semibold">
                                                    ₹{item.unitPrice}
                                                    <s className="font-medium text-sm opacity-60 ml-2">
                                                        ₹{item.price}
                                                    </s>{" "}
                                                    <span className="font-bold text-xs text-[rgb(240,85,120)]">
                                                        (
                                                        {`${Math.floor(
                                                            ((item.price -
                                                                item.unitPrice) *
                                                                100) /
                                                            item.price
                                                        )}`}
                                                        % OFF)
                                                    </span>
                                                </p>
                                                {
                                                    orderDetails?.orderStatus === "Delivered" &&
                                                    <div className="flex space-x-3 font-semibold h-10">
                                                        <button onClick={() => navigate(`/orders/product-exchange/${id}`)} className=" text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white bg-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end relative top-3 mb-3 mr-2 "><i className="fi fi-br-restock relative top-[2px] mr-1"></i>Request Exchange <i className="fi fi-br-angle-double-small-right relative top-[3px]"></i></button>
                                                        <button onClick={() => navigate(`/orders/product-return/${id}`)} className=" text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white bg-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end relative top-3 mb-3 mr-2 "><i className="fi fi-sr-truck-arrow-left relative top-[2px] mr-1"></i>Request Return <i className="fi fi-br-angle-double-small-right relative top-[3px]"></i></button>
                                                    </div>
                                                }
                                            </div>
                                            {
                                                orderDetails?.orderStatus === "Delivered" ?
                                                    <div className="flex flex-col space-y-2 font-semibold w-[20%]">
                                                        <button onClick={() => navigate(`/orders/product-exchange/${id}`)} className="w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white bg-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end relative top-3 mb-3 mr-2"><i className="fi fi-sr-feedback relative top-[2px] mr-1"></i>Product Review <i className="fi fi-br-angle-double-small-right absolute top-[10px] right-2"></i></button>
                                                        <button onClick={() => navigate(`/orders/product-return/${id}`)} className="w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white bg-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end relative top-3 mb-3 mr-2"><i className="fi fi-sr-talent-alt relative top-[2px] mr-1"></i>Seller Review <i className="fi fi-br-angle-double-small-right absolute top-[10px] right-2"></i></button>
                                                    </div> :
                                                    null
                                            }
                                        </div>
                                        {
                                            orderDetails?.orderStatus === "Cancelled" &&
                                            <button onClick={(e) => handleReorderButton(e, item.id)} className=" text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] bg-white duration-200 lg:hover:bg-[rgb(240,85,120)] lg:hover:text-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end absolute bottom-2 right-2"><i className="fi fi-sr-cart-shopping-fast relative top-[2px]"></i>Buy Again </button>
                                        }
                                    </div>
                                </div>
                            ))}
                            <span className="text-[11px] font-medium lg:text-xs absolute -bottom-0.5 lg:right-2">
                                Need Help?{" "}
                                <Link
                                    to="/setting/contact-us"
                                    className="text-blue-500 lg:hover:underline font-bold"
                                >
                                    Contact Us
                                </Link>
                            </span>
                        </div>
                    </div>
                ) : (
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
                                        <div
                                            key={i}
                                            className="h-8 w-44 bg-gray-300 rounded-full"
                                        />
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
                )}
                <KnowMorePopup setIsOpen={setOpen} isOpen={open} />
                {
                    item &&
                    <SizeSelectionPopup isOpen={isOpen} setIsOpen={setIsOpen} item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                }
                <DialogBox isOpen={popup} setIsOpen={setPopup} className="max-w-[40vw] bg-white rounded-xl flex flex-col overflow-hidden" parentDivClassName="flex justify-center items-center">
                    <h2 className="text-center text-xl font-bold border-b border-[rgb(8,43,61,0.4)] p-4 flex gap-1 justify-center items-center bg-slate-100 ">
                        Show Off Your Look
                    </h2>
                    <p className='mt-4 text-sm px-10'>At <span className='font-semibold'>LXS Store</span>, your fashion journey doesn’t end at delivery — it begins when you show it off to the world.
                        <br />Here’s how you can turn your look into real benefits:
                    </p>
                    <span className="px-10 text-sm font-semibold mt-2">Step 1: Flaunt Your Fit</span>
                    <p className="px-10 text-sm">Wear your LXS outfit, style it your way, and snap a pic or reel that shows your vibe.</p>
                    <span className="px-10 text-sm font-semibold mt-2">Step 2: Post It on Social Media</span>
                    <p className="px-10 text-sm">Share your look on your favorite platforms:</p>
                    <ul className='list-disc pl-20 text-sm pr-10'>
                        <li><span className='font-semibold'>Instagram: </span> Tag @lxslifestylestore and use #FlexWithLXS</li>
                        <li><span className='font-semibold'>X (formerly Twitter): </span> Mention @lxs_store and use #FlexWithLXS</li>
                        <li><span className='font-semibold'>LinkedIn:  </span> Share your smart LXS look with a pro touch and tag @lxs-lifestyle-store</li>
                        <li><span className='font-semibold'>Facebook: </span> Post to your story or feed and tag @lxslifestylestore</li>
                    </ul>
                    <span className="px-10 text-sm font-semibold mt-2">Step 3: Get Noticed & Featured</span>
                    <p className="px-10 text-sm">We regularly feature our best-dressed customers across our official platforms and website!</p>
                    <span className="px-10 text-sm font-semibold mt-2">Step 4: Unlock Exclusive Perks</span>
                    <p className="px-10 text-sm">Tagging us gives you a chance to receive:</p>
                    <ul className='list-disc pl-20 text-sm pr-10'>
                        <li className="font-semibold">Special Discounts</li>
                        <li className="font-semibold">Early access to New Collections</li>
                        <li className="font-semibold">Surprise Rewards or Shoutouts</li>
                    </ul>
                    <span className="px-10 text-sm font-semibold mt-2">Step 5: Join the LXS Movement</span>
                    <p className="px-10 text-sm mb-2">Every share strengthens our fashion-forward community.</p>
                    <span className="text-center text-[rgb(240,85,120)] font-semibold mb-5">You’re not just a customer — you’re part of the story.</span>
                </DialogBox>
            </div>
            <div className="w-[35%] h-[84vh] rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border sticky top-[92px]"></div>
        </div>
    );
}

export default OrderDetailsPage;
