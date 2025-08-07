import AdminHeadings from "@/components/AdminHeadings"
import { useToast } from "@/components/ToastProvider";
import { getUserInfo, updateOrderInfo } from "@/firebase/auth";
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
    let { orders } = useSelector(state => state.admin);
    let dispatch = useDispatch();
    let toast = useToast();

    const handleOrderClick = (e, user_id, i) => {
        e.preventDefault();

        setIsOpen(i)
        if (i !== -1) {
            getUserInfo(user_id).then((res) => {
                setUser(res);
            })
        }
    }

    const handleSave = (e, order) => {
        e.stopPropagation();
        const newStatus = orderStatusMap[order.orderId] || order.orderStatus;
        if(order.orderStatus === "Order Placed"){
            addShippingLabel(order.waybill).then(response => {
                if(response.status === "success"){
                    registerOrderPickup([order.waybill]).then(res => {
                        if(res.status){
                            let newUpdates = {
                                orderStatus: newStatus,
                                shippingPartner: res.apipickuporderids[0].serviceProviderName,
                                fshipPickupId: res.apipickuporderids[0].fshipPickupId,
                                pickupOrderId: res.apipickuporderids[0].pickupOrderId,
                                orderUpdates: order.orderUpdates.map((item) => item.title === "Order Approved" ? {
                                    title: "Order Approved",
                                    details: [
                                        {text: "Boom! Your Order is Confirmed by LXS Store 💥"},
                                        {text: "All Set! Your Shipment is Packed and Ready 📦", timestamp: getTimestamp()}
                                    ]
                                } : item),
                            }
                            updateOrderInfo(order.userId, order.id, {...newUpdates})
                            .then(() => {
                                dispatch(updateOrder({...order, ...newUpdates}))
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
                                            {statusOrder.slice(0,2).map((status) => (
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

                                        <i className={`fi fi-rr-angle-small-down duration-150 relative text-xl ${isOpen ? "-rotate-90" : "top-1 -left-0.5"}`}></i>
                                    </div>
                                </div>

                                {isOpen === index && (
                                    <div className="m-6">
                                        <div className="grid grid-cols-3 gap-6 mt-4">
                                            {/* Customer Info */}
                                            <div className="leading-5 col-span-1">
                                                <h3 className="font-semibold mb-1">Customer's Info</h3>
                                                <p>{user?.name}</p>
                                                <p>{user?.email}</p>
                                                <p>+91 {user?.phone}</p>
                                            </div>

                                            {/* Delivery Info */}
                                            <div className="leading-5 col-span-2">
                                                <h3 className="font-semibold mb-1">Deliver to</h3>
                                                <p><strong>Name:</strong>{` ${order.address.name} (+91 ${order.address.phone})`}</p>
                                                <p><strong>Address:</strong>{` ${order.address.landmark}, ${order.address.houseNo}, ${order.address.area}`}</p>
                                                <p><strong>City:</strong>{` ${order.address.city}, ${order.address.state} (${order.address.pincode})`}</p>
                                            </div>
                                        </div>
                                        <table className="w-full mt-4 border-t">
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
                                                            <td className="p-2 text-blue-500">{product.productName}</td>
                                                            <td className="p-2">{product.size.join(",")}</td>
                                                            <td className="p-2">{product.quantity}</td>
                                                            <td className="p-2">₹ {product.unitPrice}</td>
                                                            <td className="p-2">₹ {product.unitPrice * product.quantity}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
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
                                                <p className=" flex justify-between"><strong>Promotional Fee:</strong>₹ 9</p>
                                                <p className="text-xl font-bold flex justify-between">Total:<span> ₹ {order.products.reduce((sum, p) => {
                                                    return sum + (p.unitPrice * p.quantity)
                                                }, 0) + 9} </span></p>
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
