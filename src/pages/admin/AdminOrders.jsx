import AdminHeadings from "@/components/AdminHeadings"
import { useToast } from "@/components/ToastProvider";
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import { updateOrderInfo } from "@/firebase/auth";
import { addShippingLabel, registerOrderPickup } from "@/firebase/fship";
import { updateOrder } from "@/store/features/cartSlice";
import { getTimestamp } from "@/utils/commomFunctions";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const statusOrder = ["Order Placed", "Order Approved", "Pickup Done", "In-Transit", "Out for Delivery", "Delivered"];


function AdminOrders() {
    let [isOpen, setIsOpen] = useState(-1);
    let [user, setUser] = useState(null);
    const [isStatusChanged, setIsStatusChanged] = useState({});
    let [orderStatusMap, setOrderStatusMap] = useState({});
    let { orders, users } = useSelector(state => state.admin);
    let dispatch = useDispatch();
    let toast = useToast();

    const handleOrderClick = (e, user_id, i) => {
        e.preventDefault();

        if (i !== -1) {
            setUser(() => {
                return users.find((i) => i.id === user_id)
            })
        }
        setIsOpen(i)
    }

    const handleSave = (e, order) => {
        e.stopPropagation();
        const newStatus = orderStatusMap[order.orderId] || order.orderStatus;
        if (order.orderStatus === "Order Placed") {
            addShippingLabel(order.waybill).then(response => {
                if (response.status === "success") {
                    registerOrderPickup([order.waybill]).then(res => {
                        if (res.status) {
                            let newUpdates = {
                                orderStatus: newStatus,
                                shippingPartner: res.apipickuporderids[0].serviceProviderName,
                                fshipPickupId: res.apipickuporderids[0].fshipPickupId,
                                pickupOrderId: res.apipickuporderids[0].pickupOrderId,
                                orderUpdates: order.orderUpdates.map((item) => item.title === "Order Approved" ? {
                                    title: "Order Approved",
                                    details: [
                                        { text: "Boom! Your Order is Confirmed by LXS Store 💥" },
                                        { text: "All Set! Your Shipment is Packed and Ready 📦", timestamp: getTimestamp() }
                                    ]
                                } : item),
                            }
                            updateOrderInfo(order.userId, order.id, { ...newUpdates })
                                .then(() => {
                                    dispatch(updateOrder({ ...order, ...newUpdates }))
                                    toast("Order Status Changed!")
                                })
                        }
                    }).catch(err => console.log("Register Order Pickup Error: ", err.message));
                }
            }).catch(error => console.log("Adding Shipping Label Error: ", error.message));

        }
        setIsStatusChanged((prev) => ({
            ...prev,
            [order.orderId]: false
        }));
    }

    return (
        <div>
            <AdminHeadings title="Orders" />
            <div className="bg-white p-5 flex flex-col gap-7">
                <div className="flex justify-between items-center">
                    <input type="text" className="h-10 w-72 rounded-full border border-[rgb(8,43,61,0.5)] px-4" placeholder="Search order" />
                </div>
                {
                    orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <div key={index} className="w-full mx-auto bg-white shadow-md rounded-[8px] border border-slate-300" onClick={(e) => handleOrderClick(e, order.userId, isOpen !== index ? index : -1)}>
                                {/* Clickable Header for Accordion */}
                                <div className="flex justify-between items-center cursor-pointer shadow-sm px-6 py-4">
                                    <div className="h-full">
                                        <h2 className="text-lg font-semibold">{order.timestamp}</h2>
                                        <p className="text-gray-500 text-sm">{order.orderId}</p>
                                    </div>
                                    <div className="flex items-center gap-5" >
                                        {
                                            order.orderStatus === "Order Placed" &&
                                            <>
                                                <select
                                                    className="border p-2 rounded outline-none"
                                                    value={orderStatusMap[order.orderId] || order.orderStatus}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setOrderStatusMap((prev) => ({
                                                            ...prev,
                                                            [order.orderId]: newValue
                                                        }));

                                                        setIsStatusChanged((prev) => ({
                                                            ...prev,
                                                            [order.orderId]: newValue !== order.orderStatus
                                                        }));
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {statusOrder.slice(0, 2).map((status) => (
                                                        <option
                                                            key={status}
                                                            value={status}
                                                            disabled={
                                                                statusOrder.indexOf(status) < statusOrder.indexOf(order.orderStatus)
                                                            }
                                                        >
                                                            {status === "Order Placed" ? "Pending" : "Approved"}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    className={`px-4 py-2 rounded text-white ${isStatusChanged[order.orderId] ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
                                                        }`}
                                                    disabled={!isStatusChanged[order.orderId]}
                                                    onClick={(e) => handleSave(e, order)}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        }

                                        <i className={`fi fi-rr-angle-small-down duration-150 relative text-xl ${isOpen ? "-rotate-90" : "top-1 -left-0.5"}`}></i>
                                    </div>
                                </div>

                                {isOpen === index && (
                                    <div className="m-6">
                                        <div className="flex mt-4">
                                            {/* Customer Info */}
                                            <div className="flex gap-4 relative w-full">
                                                <img src={user.profilePic} alt="" className="h-[100px] rounded-xl shadow-md" />
                                                <div className="flex flex-col text-sm leading-[1.3] max-w-[25%]">
                                                    <h3 className="font-semibold text-lg">User Info:</h3>
                                                    <p><span className="font-semibold">Name: </span>{user?.name}</p>
                                                    <p><span className="font-semibold">Phone: </span>+91 {user?.phone}</p>
                                                    <p><span className="font-semibold">Email: </span>{user?.email}</p>
                                                </div>
                                                <div className="text-sm leading-[1.3] ml-5 max-w-[45%]">
                                                    <h3 className="font-semibold text-lg">Delivery Info:</h3>
                                                    <p><span className="font-semibold">Name: </span>{order.address.name}</p>
                                                    <p><span className="font-semibold">Phone: </span>+91 {order.address.phone}</p>
                                                    <p className="text-wrap"><span className="font-semibold">Address: </span>{order.address.landmark}, {order.address.houseNo}, {order.address.area}, {order.address.city}, {order.address.state} ({order.address.pincode})</p>
                                                </div>
                                                <p className="text-sm font-medium absolute top-0 right-0">Status: <span className={`font-semibold ${order?.orderStatus === "Cancelled" ? "text-[rgb(253,84,120)]" : order?.orderStatus === "Delivered" ? "text-[rgb(34,197,94)]" : "text-[rgb(248,181,44)]"}`}>{order.orderStatus}</span></p>
                                            </div>
                                        </div>
                                        <div className=" space-y-4 mt-5">
                                            {order.products.flatMap((product, idx) => {
                                                const perSizeQty = Math.floor(product.quantity / product.size.length);
                                                return product.size.map((s, i) => (
                                                    <div key={`${idx}-${i}`} className="flex gap-2 p-3 rounded-xl border border-slate-300 shadow-md">
                                                        <img src={product.image} alt="" className="h-24 rounded-xl shadow-md" />
                                                        <div className="flex flex-col items-start">
                                                            <div className="flex gap-5">
                                                                {product.isLxsCertified === "Yes" &&
                                                                    <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] pl-2 pr-4"><img src={lxsLogo} alt="" className="h-[14px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
                                                                    </div>
                                                                }
                                                                <p className="text-[14px] font-medium leading-4">Brand: {product.brand}</p>
                                                            </div>
                                                            <h4 className="font-semibold text-lg text-[rgb(8,43,61,0.7)]">{product.productName}</h4>
                                                            <p className="space-x-5 text-sm font-medium"><span>Size: {s}</span><span>Quantity: {perSizeQty}</span></p>
                                                            <p className="text-sm lg:text-base leading-5 font-semibold">
                                                                ₹{product.unitPrice}
                                                                <s className="font-medium text-sm opacity-60 ml-2">
                                                                    ₹{product.price}
                                                                </s>{" "}
                                                                <span className="font-bold text-xs text-[rgb(253,84,120)]">
                                                                    (
                                                                    {`${Math.floor(
                                                                        ((product.price -
                                                                            product.unitPrice) *
                                                                            100) /
                                                                        product.price
                                                                    )}`}
                                                                    % OFF)
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ));
                                            })}
                                        </div>



                                        {/* <table className="w-full mt-4 border-t">
                                            <thead>
                                                <tr className="text-left border-b">
                                                    <th className="p-2">Product</th>
                                                    <th className="p-2">Size</th>
                                                    <th className="p-2">Quantity</th>
                                                    <th className="p-2">Unit Price</th>
                                                    <th className="p-2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.products.map((product, idx) => (
                                                        <tr key={idx} className="border-b">
                                                            <td className="p-2 text-[rgb(59,130,246)]">{product.productName}</td>
                                                            <td className="p-2">{product.size.join(",")}</td>
                                                            <td className="p-2">{product.quantity}</td>
                                                            <td className="p-2">₹ {product.unitPrice}</td>
                                                            <td className="p-2">₹ {product.unitPrice * product.quantity}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table> */}
                                        <div className="flex justify-between gap-6 mt-4">
                                            <div>
                                                <h3 className="font-semibold">Payment info</h3>
                                                <p className="uppercase mb-1">{order.paymentMethod}</p>
                                                <span className="bg-green-100 text-green-600 px-3 py-1.5 rounded">Prepaid Payment</span>
                                            </div>
                                            <div className="w-52">
                                                <p className=" flex justify-between"><strong>Subtotal:</strong>₹ {order.products.reduce((sum, p) => {
                                                    return sum + (p.unitPrice * p.quantity)
                                                }, 0)}</p>
                                                <p className=" flex justify-between"><strong>Promotional Fee:</strong>₹ 15</p>
                                                <p className="text-xl font-bold flex justify-between">Total:<span> ₹ {order.products.reduce((sum, p) => {
                                                    return sum + (p.unitPrice * p.quantity)
                                                }, 0) + 15} </span></p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) :
                        <div className="text-xl text-center">No Orders Yet!!</div>
                }
            </div>
        </div>
    )
}

export default AdminOrders
