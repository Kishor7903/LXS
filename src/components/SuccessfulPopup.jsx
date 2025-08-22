import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import gif from "../assets/GIF/Order Placed Successfully 1.gif"

let options = { weekday: "long", day: '2-digit', month: 'short', year: 'numeric' };

function SuccessfulPopup() {
    let { orders } = useSelector(state => state.cart);
    let [order, setOrder] = useState(null);
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        let orderedItem = orders.find((item) => item.id === id);
        setOrder(orderedItem);
    }, [orders])

    useEffect(() => {
        if(order){
            setLoading(false);
        }
    }, [order])

    return (
        <div className='bg-green-300 h-[calc(100vh-64px)] w-full'>
            {
                !loading ?
                    <div className="h-[90%] flex flex-col justify-center items-center ">
                        <img src={gif} alt="" className="w-28 mb-8" />
                        <h5 className="text-2xl font-semibold">Ordered Placed Successfully</h5>
                        <p className="text-sm">Order ID: <span className="font-semibold text-[rgb(253,84,120)]">{order?.orderId}</span></p>
                        {
                            order?.orderStatus === "Cancelled" ?
                            <p className='text-sm'>Status: <span className="font-semibold text-[rgb(253,84,120)]">{order?.orderStatus}</span></p>:
                            <p className="text-sm">Expected Delivery Date: <span className="font-semibold text-[rgb(253,84,120)]">{(() => {
                                const orderDate = new Date(order?.timestamp);
                                const expectedDate = new Date(orderDate);
                                expectedDate.setDate(orderDate.getDate() + 6);
    
                                const date = expectedDate.toLocaleDateString("en-US", options);
                                console.log(date, order?.timestamp);
                                return `${date.split(" ")[0]} ${date.split(" ")[2].split(",")[0]} ${date.split(" ")[1]} ${date.split(",")[2]}`
                            })()}</span></p>
                        }
                        <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] rounded-full h-12 w-[30vw] mt-5 font-semibold text-white text-lg" onClick={() => navigate(`/orders/track-package/${id}`)}><i className="fi fi-br-track relative top-[2px] mr-3"></i>Track Shipment <i className='fi fi-br-angle-double-small-right relative top-[3px] ml-2'></i></button>
                        <button className="bg-white text-[rgb(8,43,61)] rounded-full h-12 w-[30vw] mt-3 font-semibold text-lg" onClick={() => navigate('/products')}><i className='fi fi-sr-cart-shopping-fast relative top-0.5 mr-3'></i> Continue Shopping <i className="fi fi-br-angle-double-small-right relative top-[3px] ml-2"></i></button>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center h-[90%] p-10 rounded-lg animate-pulse">
                        {/* Image Placeholder */}
                        <div className="w-28 h-28 bg-gray-100 rounded-lg mb-10 mt-5" />

                        {/* Title */}
                        <div className="h-6 w-1/4 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-1/6 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-1/6 bg-gray-200 rounded mb-6" />

                        {/* Track Shipment Button */}
                        <div className="h-12 w-1/3 bg-gray-100 to-pink-300 rounded-full mb-4" />

                        {/* Continue Shopping Button */}
                        <div className="h-12 w-1/3 bg-gray-100 rounded-full" />
                    </div>
            }
            <div className="flex justify-between w-[70vw] mx-auto">
                <Link to="/policy/return-and-refund-policy" className="font-medium text-sm lg:hover:underline">Return & Refund Policy</Link>
                <Link to="/policy/FAQs" className="font-medium text-sm lg:hover:underline">FAQs</Link>
                <Link to="/setting/contact-us" className="font-medium text-sm lg:hover:underline">Customer Support</Link>
            </div>
        </div>
    )
}

export default SuccessfulPopup
