import HoverButton from "@/components/HoverButton";
import { getAllOrders } from "@/firebase/auth"
import { getAllOrdersItems } from "@/store/features/cartSlice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function ShopSettingMyOrders() {
    let { user } = useSelector(state => state.auth);
    let { orders } = useSelector(state => state.cart);
    let { products } = useSelector(state => state.admin);
    let [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();


    let orderItems = orders?.map(item => {
        let product = products.find(p => p.id === item.productInfo.product_id);
        return product ? { ...product, quantity: item.productInfo.quantity, size: item.productInfo.size, orderId: item.orderId, amount: item.amount, timestamp: item.timestamp, order_id: item.id } : null;
    }).filter(item => item !== null);

    useEffect(() => {
        setLoading(true);
        getAllOrders(user.id).then((res) => {
            dispatch(getAllOrdersItems(res));
        })
        setTimeout(() => {
			setLoading(false)
		}, 1000)
    }, [])

    return (
        <div className="w-full h-full px-5 flex gap-8 ">
            <div className="w-1/2 flex flex-col justify-between">
                <div className="leading-[1] font-semibold border-b-2 border-[rgb(8,43,61)] h-10">The Damage Report 🛠️ <br />
                    <p className="text-xs font-normal">Because your wallet just took a hit!</p>
                </div>
                <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
                    {
                        orderItems.map((item, index) => (
                            !loading ? (
                                <div key={index} className="flex items-center p-[6px] border border-[rgb(8,43,61)] scale-[0.98] duration-100 lg:hover:shadow-[0px_0px_10px_-1px_rgb(8,43,61)] rounded-xl lg:hover:scale-100 w-full cursor-pointer" onClick={() => navigate(`/orders/order-details/${item.order_id}`)} >
                                    <div className="h-[74px] w-20 rounded-[6px] overflow-hidden mr-1">
                                        <img
                                            src={item.images[0]}
                                            className="h-full w-full object-fill rounded border"
                                        />
                                    </div>
                                    <div className="w-[60%]">
                                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Apparel & Fashion</p>
                                        <h2 className="font-semibold line-clamp-1">{item.name}</h2>
                                        <p className="text-[10px] text-gray-600 tracking-tighter mt-1 font-medium">Order Date: {`${item.timestamp.split(" ")[1].slice(0, 2)} ${item.timestamp.split(" ")[0]}, ${item.timestamp.split(" ")[2].slice(0, 4)}`}</p>
                                        <p className="text-[10px] text-gray-600 tracking-tighter font-medium">Expected Delivery: 19/05/2025</p>
                                    </div>
                                    <div className="flex flex-col justify-between h-[78px] items-end w-[40%]">
                                        <p className="text-[11px] mb-1 text-gray-400 tracking-tighter">Order ID: {item.orderId}</p>
                                        <HoverButton onClick={(e) => { e.stopPropagation(), navigate(`/product-details/${item.id}`) }} className="px-2 text-[11px] font-medium">View Product Details</HoverButton>
                                    </div>
                                </div>
                            )
                                : (
                                    <div className="flex gap-4 p-2 border border-slate-300 rounded-xl shadow-sm animate-pulse bg-white w-full scale-[0.98]">
                                        <div className="w-[70px] h-[70px] bg-gray-300 rounded-lg"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-2 w-1/3 bg-gray-300 rounded"></div>
                                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                                            <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                                            <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                                        </div>
                                        <div className="flex flex-col justify-between items-end w-40">
                                            <div className="h-2 w-full bg-gray-300 rounded mt-2"></div>
                                            <div className="h-6 w-3/4 bg-gray-300 rounded-full"></div>
                                        </div>
                                    </div>
                                )
                        ))
                    }
                </div>
                <hr className="border-[rgb(8,43,61)] border" />
            </div>
            <div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default ShopSettingMyOrders