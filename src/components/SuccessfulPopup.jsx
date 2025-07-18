import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import gif from "../assets/GIF/Order Placed Successfully 1.gif"

function SuccessfulPopup() {
    let { orders } = useSelector(state => state.cart);
    let [order, setOrder] = useState(null);
    let navigate = useNavigate();
    let { id } = useParams();

    const today = new Date();
    const sixDaysLater = new Date();
    sixDaysLater.setDate(today.getDate() + 6);
    const options = { weekday: "long", day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = sixDaysLater.toLocaleDateString('en-GB', options);

    useEffect(() => {
        let orderedItem = orders.find((item) => item.id === id);
        setOrder(orderedItem);
    }, [orders])

    return (
        <div className='bg-green-300 h-[93vh] w-full'>
            <div className="h-[90%] flex flex-col justify-center items-center ">
                <img src={gif} alt="" className="w-28 mb-8" />
                <h5 className="text-2xl font-semibold">Ordered Placed Successfully</h5>
                <p className="text-sm">Order ID: <span className="font-semibold text-[rgb(240,85,120)]">{order?.orderId}</span></p>
                <p className="text-sm">Expected Delivery Date: <span className="font-semibold text-[rgb(240,85,120)]">{`${formattedDate.split(" ")[0]}, ${formattedDate.split(" ")[1]} ${formattedDate.split(" ")[2]} ${formattedDate.split(" ")[3]}`}</span></p>
                <button className="bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] rounded-full h-12 w-[30vw] mt-5 font-semibold text-white text-lg" onClick={() => navigate(`/orders/track-package/${id}`)}><i className="fi fi-br-track relative top-[2px] mr-3"></i>Track Shipment <i className='fi fi-br-angle-double-small-right relative top-[3px] ml-2'></i></button>
                <button className="bg-white text-[rgb(8,43,61)] rounded-full h-12 w-[30vw] mt-3 font-semibold text-lg" onClick={() => navigate('/products')}><i className='fi fi-sr-cart-shopping-fast relative top-0.5 mr-3'></i> Continue Shopping <i className="fi fi-br-angle-double-small-right relative top-[3px] ml-2"></i></button>
            </div>
            <div className="flex justify-between w-[70vw] mx-auto">
                <Link to="/policy/return-and-refund-policy" className="font-medium text-sm lg:hover:underline">Return & Refund Policy</Link>
                <Link to="/policy/FAQs" className="font-medium text-sm lg:hover:underline">FAQs</Link>
                <Link to="/setting/contact-us" className="font-medium text-sm lg:hover:underline">Customer Support</Link>
            </div>
        </div>
    )
}

export default SuccessfulPopup
