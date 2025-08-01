import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import HoverButton from "@/components/HoverButton";
import { useNavigate } from "react-router-dom";


function HiddenOrders() {
    let { orders } = useSelector(state => state.cart);
    let [order, setOrder] = useState([]);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        let filteredOrders = orders.filter((item) => item.isHidden === true);
        let sortedOrders = [...filteredOrders].sort((a, b) => { return new Date(b.timestamp) - new Date(a.timestamp); })
        setOrder(sortedOrders)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [orders])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="leading-[1] font-semibold flex justify-between border-b-2 border-[rgb(8,43,61)] h-10">
                <span>Shh... It's Hidden 🤐<br />
                    <p className="text-xs font-normal">No one needs to know. Not even your wallet!</p>
                </span>
            </div>
            <div className="space-y-3 h-full py-2 overflow-y-scroll no-scrollbar">
                {
                    !loading ? (
                        order && order.length > 0 ?
                            order.map((item) => (
                                <div key={item.id} className="flex flex-col items-center p-3 border border-slate-300 scale-[0.95] duration-200 lg:hover:shadow-[0px_0px_10px_-1px_rgb(8,43,61)] rounded-xl lg:hover:scale-[0.97] w-full cursor-pointer relative bg-slate-100 shadow-md" onClick={() => navigate(`/orders/order-details/${item.id}`)} >
                                    {
                                        item.products.map((product, idx) => (
                                            <div key={product.id} className="w-full">
                                                <div key={idx} className={`flex w-full relative`}>
                                                    <div className="w-16 rounded-[6px] overflow-hidden mr-3">
                                                        <img
                                                            src={product.image}
                                                            className="h-full w-full object-fill rounded border"
                                                        />
                                                    </div>
                                                    <div className="w-[62%]">
                                                        <div className="flex gap-2">
                                                            <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[100px] px-2 py-[1px]"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[10px] text-white font-medium">LXS Certified</span>
                                                            </div>
                                                            <p className="text-gray-500 text-xs uppercase font-bold line-clamp-1">Apparel & Fashion</p>
                                                        </div>
                                                        <h2 className="font-semibold line-clamp-1">{product.productName}</h2>
                                                        <div className="flex">
                                                            <p className="text-[14px] text-gray-600 tracking-tight font-semibold pr-2 border-r-2 border-[rgb(8,43,61)] mr-2 leading-4">Order Date: <span className="text-[rgb(240,85,120)]">{`${item.timestamp.split(" ")[1].slice(0, 2)} ${item.timestamp.split(" ")[0]}, ${item.timestamp.split(" ")[2].slice(0, 4)}`}</span></p>
                                                            <p className="text-[14px] text-gray-600 tracking-tight font-semibold leading-4">Expected Delivery: </p>
                                                        </div>
                                                        <p className="text-xs font-medium italic mt-1">(Delivery may vary due to unforeseen reasons)</p>
                                                    </div>
                                                    <HoverButton onClick={(e) => { e.stopPropagation(), navigate(`/product-details/${product.id}`) }} className="px-2 py-[4px] text-[14px] text-center font-semibold absolute bottom-0 right-1">View Product Details</HoverButton>
                                                </div>
                                                {
                                                    item.products.length > 1 && idx !== item.products.length - 1 ?
                                                        <hr className={`border-t-2 border-[rgb(8,43,61,0.5)] border-dashed w-full pt-3 mt-3`} />
                                                        :
                                                        null
                                                }
                                            </div>
                                        ))
                                    }
                                    <p className="text-[14px] mb-1 font-semibold tracking-tighter absolute top-2 right-4">{item.orderId}</p>
                                </div>
                            )) :
                            <div className="text-xl font-semibold flex justify-center items-center h-40">No Hidden Orders Yet!!</div>
                    )
                        :
                        (
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
                                <div key={idx} className="flex gap-4 p-2 border border-slate-300 rounded-xl shadow-sm animate-pulse bg-white w-full scale-[0.98]">
                                    <div className="w-[70px] h-[70px] bg-gray-300 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-1/3 bg-gray-300 rounded"></div>
                                        <div className="h-3 w-full bg-gray-300 rounded"></div>
                                        <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                                        <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end w-40">
                                        <div className="h-2 w-3/4 bg-gray-300 rounded mt-2"></div>
                                        <div className="h-6 w-3/4 bg-gray-300 rounded-full"></div>
                                    </div>
                                </div>
                            ))
                        )
                }
            </div>
            <hr className="border-[rgb(8,43,61)] border" />
        </div>
    )
}

export default HiddenOrders
