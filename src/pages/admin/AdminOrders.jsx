import AdminHeadings from "@/components/AdminHeadings"
import { getAllOrders } from "@/firebase/admin"
import { getUserInfo } from "@/firebase/auth";
import { useEffect, useState } from "react"


function AdminOrders() {
    let [orders, setOrders] = useState([]);
    let [isOpen, setIsOpen] = useState(-1);
    let [user, setUser] = useState(null);
    let [orderCurrentState, setOrderCurrentState] = useState(null);
    console.log(orderCurrentState);

    const handleOrderClick = (e, user_id, i) => {
        e.preventDefault();

        setIsOpen(i)
        if (i !== -1) {
            getUserInfo(user_id).then((res) => {
                setUser(res);
            })
        }
    }

    useEffect(() => {
        getAllOrders().then((res) => {
            setOrders(res);
        })
    }, [])

    return (
        <div>
            <AdminHeadings title="Orders" />
            <div className="bg-white p-5 flex flex-col gap-7">
                <div className="flex justify-between items-center">
                    <input type="text" className="h-10 w-72 rounded-full border border-[rgb(8,43,61,0.5)] px-4" placeholder="Search order" />
                    <div className="space-x-5">
                        <select className="border border-[rgb(8,43,61,0.5)] rounded-[6px] px-1 py-2">
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>In Transit</option>
                            <option>Delivered</option>
                            <option>Return/Replaced</option>
                        </select>
                    </div>
                </div>
                {
                    orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <div key={index} className="w-full mx-auto bg-white shadow-md rounded-lg border" onClick={(e) => handleOrderClick(e, order.userId, isOpen !== index ? index : -1)}>
                                {/* Clickable Header for Accordion */}
                                <div className="flex justify-between items-center cursor-pointer shadow-sm">
                                    <div className="w-[73%] h-full p-6">
                                        <h2 className="text-lg font-semibold">{order.timestamp}</h2>
                                        <p className="text-gray-500 text-sm">{order.orderId}</p>
                                    </div>
                                    <div className="flex items-center gap-5 w-[27%]" >
                                        <select className="border p-2 rounded outline-none" value={order.orderStatus} onChange={(e) => { e.preventDefault(), setOrderCurrentState(e.target.value)}} onClick={(e) => e.stopPropagation()}>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="in transit">In Transit</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="return/replaced">Return/Replaced</option>
                                        </select>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={(e) => {e.stopPropagation()}}>Save</button>
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
                                                            <td className="p-2">{product.size}</td>
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
