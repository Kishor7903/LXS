import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import lxsLogo from "../../assets/commonIcons/LXS Certified Logo.png"
import { useNavigate } from 'react-router-dom';

let options = { weekday: "long", day: '2-digit', month: 'short', year: 'numeric' };


function ReturnedAndCancelled() {
    let { orders } = useSelector(state => state.cart);
    let [order, setOrder] = useState([]);
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        let filteredOrders = orders.filter((item) => (item.orderStatus === "Cancelled" && item.isHidden === false));
        let sortedOrders = [...filteredOrders].sort((a, b) => { return new Date(b.timestamp) - new Date(a.timestamp); })
        setOrder(sortedOrders)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [orders])

    return (
        <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border m-5 px-5 py-5 overflow-hidden">
            <div className="pl-5 w-[65%]">
                <p className="font-medium text-sm">My Account {">"} Dashboard {">"} <span className="text-[rgb(253,84,120)] font-semibold">Returned & Cancelled</span></p>
                <div className="w-full flex gap-10 mt-4 ml-4">
                    <div className="w-full flex flex-col pb-2">
                    <div className="w-full flex items-end justify-between pb-2">
                        <div className="leading-[1] font-semibold">Mission Aborted 🚫<br />
                            <p className="text-xs font-normal">The mothership has recalled your cargo — launch sequence terminated.</p>
                        </div>
                        <div className="flex gap-5">
                        <p className='text-[14px] font-semibold self-end mb-1'>Total Cancelled: <span className="text-[rgb(253,84,120)]">{order.length > 9 ? order.length : `0${order.length}`}</span></p>
                        <p className='text-[14px] font-semibold self-end mb-1'>Total Items: <span className="text-[rgb(253,84,120)]">{order.reduce((sum, product) => { return sum + product.products.length }, 0) > 9 ? order.reduce((sum, product) => { return sum + product.products.length }, 0) : `0${order.reduce((sum, product) => { return sum + product.products.length }, 0)}`}</span></p>
                        <p className='text-[14px] font-semibold self-end mb-1'>Total Quantity: <span className="text-[rgb(253,84,120)]">{(() => {
                                let total = order.reduce((sum, product) => {
                                    return sum + product.products.reduce((s, p) => {
                                        return s + p.quantity
                                    }, 0)
                                }, 0)
                                return total < 10 ? `0${total}` : total
                            })()}</span></p>
                        </div>
                    </div>
                        <div className="space-y-3 h-full py-2 overflow-y-scroll no-scrollbar">
                            {
                                !loading ? (
                                    order && order.length > 0 ?
                                        order.map((item, index) => (
                                            <div key={index} className="flex flex-col items-center p-3 border border-slate-300 lg:hover:shadow-[0px_0px_10px_-1px_rgb(8,43,61)] rounded-xl lg:hover:scale-[1.01] lg:hover:duration-200 w-[97%] mx-auto cursor-pointer relative bg-slate-100 shadow-md" onClick={() => navigate(`/orders/order-details/${item.id}`)} >
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
                                                                <div className="w-full">
                                                                    <div className="flex gap-2">
                                                                        <div className="flex items-center gap-1 rounded-tl-full rounded-br-full bg-[rgb(8,43,61)] w-[90px] px-2"><img src={lxsLogo} alt="" className="h-[12px]" /> <span className="text-[8px] text-white font-medium">LXS Certified</span>
                                                                        </div>
                                                                        <p className="text-gray-500 text-[11px] uppercase font-bold line-clamp-1">Apparel & Fashion</p>
                                                                        <p className="text-xs ml-3 font-bold">Quantity: <span className="text-[rgb(253,84,120)]">{product.quantity < 10 ? `0${product.quantity}` : product.quantity}</span></p>
                                                                    </div>
                                                                    <h2 className="font-semibold w-[70%] line-clamp-1">{product.productName}</h2>
                                                                    <div className="flex flex-col">
                                                                        <p className="text-xs tracking-tight font-semibold pr-2 mr-2 leading-4">Order Date: <span className="text-[rgb(253,84,120)]">{`${item.timestamp.split(",")[0]}, ${item.timestamp.split(",")[1]}`}</span></p>
                                                                        {
                                                                            item.orderStatus !== "Cancelled" &&
                                                                            <p className="text-xs tracking-tight font-semibold leading-4">
                                                                                {
                                                                                    order[index]?.orderStatus !== "Delivered" ? (
                                                                                        <>
                                                                                            Expected Delivery:{" "}
                                                                                            <span className="text-[rgb(253,84,120)]">
                                                                                                {(() => {
                                                                                                    const orderDate = new Date(item.timestamp);
                                                                                                    const expectedDate = new Date(orderDate);
                                                                                                    expectedDate.setDate(orderDate.getDate() + 6);

                                                                                                    const date = expectedDate.toLocaleDateString("en-US", options);
                                                                                                    return `${date.split(" ")[0]} ${date.split(" ")[2].split(",")[0]} ${date.split(" ")[1]} ${date.split(",")[2]}`
                                                                                                })()}
                                                                                            </span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            Delivered Date:{" "}
                                                                                            <span className="text-[rgb(38,165,65)]">
                                                                                                {`${order[index]?.orderUpdates[5]?.details[0]?.timestamp.split(",")[0]}, ${order[index]?.orderUpdates[5]?.details[0]?.timestamp.split(",")[1]}`}
                                                                                            </span>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </p>
                                                                        }

                                                                    </div>
                                                                </div>
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
                                                <div className="absolute top-2 right-3 text-sm font-semibold">Status: <span className={`${order[index].orderStatus === "Delivered" ? "text-[rgb(38,165,65)]" : order[index].orderStatus === "Cancelled" ? "text-[rgb(253,84,120)]" : "text-[rgb(248,181,44)]"}`}>{item.orderStatus}</span></div>
                                            </div>
                                        )) :
                                        <div className="text-xl font-semibold flex justify-center items-center h-40">No Returned or Cancelled Orders Yet!!</div>
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
                    </div>
                </div>
            </div>
            <div className="w-[35%] h-[100%] rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
        </div>
    )
}

export default ReturnedAndCancelled
