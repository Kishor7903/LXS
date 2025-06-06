import CheckoutNavigator from '@/components/CheckoutNavigator'
import HoverButton from '@/components/HoverButton';
import KnowMorePopup from '@/components/KnowMorePopup';
import RequestSuccessfullPopup from '@/components/RequestSuccessfullPopup';
import { displayRazorpay } from '@/firebase/RazorpayPayment';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

let offers = [
    {
        item: "10% instant discount on Axis Bank Credit Card on minimum purchase amount of 5000 or more. ",
        slug: ""
    },
    {
        item: "10% instant discount on Axis Bank Credit Card on minimum purchase amount of 5000 or more. ",
        slug: ""
    }
]

let paymentOptions = [
    {
        type: "LXS Cosmic Pay",
        icon: "fi fi-rr-sack",
        iconActive: "fi fi-sr-sack"
    },
    {
        type: "UPI / QR CODE",
        icon: "fi fi-rr-qr-scan",
        iconActive: "fi fi-br-qr-scan"
    },
    {
        type: "Credit or Debit Card",
        icon: "fi fi-rr-credit-card",
        iconActive: "fi fi-sr-credit-card"
    },
    {
        type: "Net Banking",
        icon: "fi fi-rr-bank",
        iconActive: "fi fi-sr-bank"
    },
    {
        type: "EMI",
        icon: "fi fi-rr-tax-alt",
        iconActive: "fi fi-sr-tax-alt"
    },
    {
        type: "Wallet",
        icon: "fi fi-rr-wallet",
        iconActive: "fi fi-sr-wallet"
    },
    {
        type: "Buy Now, Pay Later",
        icon: "fi fi-rr-payroll-calendar",
        iconActive: "fi fi-br-payroll-calendar"
    },
    {
        type: "POD (Pay On Delivery)",
        icon: "fi fi-rs-hand-bill",
        iconActive: "fi fi-ss-hand-bill"
    }
]

function PaymentsPage() {
    let [showMore, setShowMore] = useState(false);
    let [formattedNumber, setFormattedNumber] = useState("");
    let [pinNumber, setPinNumber] = useState("");
    let [paymentMode, setPaymentMode] = useState(-1);
    let [isOpen, setIsOpen] = useState(false);
    let [popupData, setPopupData] = useState({ orderId: "" });
    let [showOrderedSuccessfull, setShowOrderedSuccessfull] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let cartItems = JSON.parse(localStorage.getItem("cart"))
    let address = JSON.parse(localStorage.getItem("address"))
    let { user } = useSelector(state => state.auth)

    let totalPrice = cartItems.reduce((sum, cart) => sum + Number(cart.price * cart.quantity), 0);
    let discountOnMRP = totalPrice - cartItems.reduce((sum, cart) => sum + Number(cart.salePrice * cart.quantity), 0);
    let deliveryPrice = 49;
    let deliveryDiscount = 49;
    let platformFee = 9;

    const handleProceedToPayment = async (e) => {
        e.preventDefault();
        navigate("/checkout/payment")

        let order = {
            amount: (totalPrice - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee)
        }

        displayRazorpay(order, cartItems, address, user, setShowOrderedSuccessfull, setPopupData, dispatch);
    }

    const handleGiftCardNumberChange = (e) => {
        let input = e.target.value;

        // Remove all non-digit characters
        input = input.replace(/[^0-9]/g, "");

        // Limit to 16 digits
        if (input.length > 16) {
            input = input.slice(0, 16);
        }

        // Format with spaces every 4 digits
        let formatted = "";
        for (let i = 0; i < input.length; i += 4) {
            formatted += input.substring(i, i + 4) + " ";
        }

        setFormattedNumber(formatted.trim());
    };

    const handleGiftCardPinChange = (e) => {
        let input = e.target.value;

        input = input.replace(/[^0-9]/g, "");

        if (input.length > 6) {
            input = input.slice(0, 6);
        }
        setPinNumber(input)
    }


    return (
        <>
            <div className="w-full h-full py-3 lg:py-8 px-3 lg:px-16 flex gap-10">
                <div className="w-full lg:w-[65%] space-y-3 relative">
                    <div className="leading-[1] font-semibold">Headquarters Coordinates 🚀 <br />
                        <p className="text-xs font-normal">The Secret Location where your supplies get delivered!</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-3xl relative py-5 px-4 lg:p-8 shadow-[0px_0px_10px_-2px_rgb(8,43,61)] lg:min-h-[80vh]">
                        <CheckoutNavigator />
                        <div className="w-full flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-[55%] space-y-4">
                                <div className="border border-[rgb(8,43,61)] rounded-xl px-4 py-3 relative">
                                    <p className='xl:text-sm 2xl:text-base font-semibold'><i className="fi fi-rr-badge-percent relative top-[2px] mr-1"></i>DISCOUNTS & OFFERS</p>
                                    <div className="space-y-2 ml-5">
                                        {
                                            !showMore ? (
                                                <p className='xl:text-xs 2xl:text-sm mt-1'>{offers[0].item}<Link className='text-blue-500 lg:hover:underline'>Terms & Conditions </Link>Applied</p>
                                            )

                                                :

                                                offers.map((item, idx) => (
                                                    <p key={idx} className='xl:text-xs 2xl:text-sm mt-1'>{item.item}<Link className='text-blue-500 lg:hover:underline'>Terms & Conditions Applied</Link></p>
                                                ))
                                        }
                                    </div>
                                    <span onClick={(e) => { e.preventDefault(), setShowMore(!showMore) }} className='xl:text-xs 2xl:text-sm cursor-pointer font-medium '>{showMore ? "View Less" : "View More"} {showMore ? <i className="fi fi-br-angle-small-up relative top-[2px]"></i> : <i className="fi fi-br-angle-small-right relative top-[2px]"></i>}</span>
                                </div>
                                <div className="border border-[rgb(8,43,61)] rounded-xl px-4 py-3 relative">
                                    <p className='xl:text-sm 2xl:text-base font-semibold'><i className="fi fi-rr-gift-card relative top-[2px] mr-1"></i>HAVE A GIFT CARD ?</p>
                                    <div className="flex gap-4">
                                        <div className='w-[80%] ml-4'>
                                            <input type="text" value={formattedNumber} onChange={handleGiftCardNumberChange} className='bg-slate-200 px-3 h-8 text-sm font-medium rounded-full w-full mt-2 outline-none' placeholder='Enter Gift Card Number' />
                                            <input type="text" value={pinNumber} onChange={handleGiftCardPinChange} className='bg-slate-200 px-3 h-8 text-sm font-medium rounded-full w-full mt-2 outline-none' placeholder='Enter Gift Card Pin' />
                                        </div>
                                        <HoverButton className="h-8 px-4 text-sm font-semibold self-end">Apply</HoverButton>
                                    </div>
                                </div>
                                <div className="">
                                    <h5 className='font-semibold mb-2'>CHOOSE PAYMENT OPTION</h5>
                                    <div className="space-y-3">
                                        {
                                            paymentOptions.map((item, index) => (
                                                <div onClick={(e) => { e.preventDefault(), setPaymentMode(index) }} key={index} className={`border-[rgb(8,43,61)] rounded-xl px-4 py-3 font-medium relative overflow-hidden cursor-pointer ${paymentMode === index ? "shadow-[0px_0px_10px_-1px_rgb(8,43,61)] scale-100 border-2 bg-slate-200" : "border scale-[0.96]"}`}><i className={`${paymentMode === index ? item.iconActive : item.icon} mr-2 relative top-1 text-xl`}></i>{item.type}
                                                    {
                                                        paymentMode === index && (
                                                            <div className="h-10 w-24 bg-[rgb(8,43,61)] absolute -top-5 -right-[48px] rotate-45 flex justify-center items-end">
                                                                <i className="fi fi-br-check text-white text-xs relative left-[2px] top-[2px] -rotate-45"></i>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <div className="w-full lg:w-[40%]">
                                <div className="mt-5 leading-3 font-semibold">
                                    <span className="">Price BreakDown ({cart.length} Items)</span>
                                    <span className="flex justify-between mt-2 text-xs">Total MRP <p className="">₹{totalPrice}</p></span>
                                    <span className="flex justify-between text-xs">Delivery <p className="">₹{deliveryPrice}</p></span>
                                    <span className="flex justify-between text-xs">Discount on MRP <p className="text-red-500">- ₹{discountOnMRP}</p></span>
                                    <span className="flex justify-between text-xs">Discount on Delivery <p className="text-red-500">- ₹{deliveryDiscount}</p></span>
                                    <span className="flex justify-between text-xs"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-blue-500 lg:hover:underline">(Know More)</Link></p> <p className="">₹{platformFee}</p></span>
                                    <hr className="pb-1 mt-1" />
                                    <span className="flex justify-between font-bold text-green-500 mt-1">Grand Total <p>₹{totalPrice - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee}</p></span>
                                </div>
                                <button className="w-full h-10 rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-lg font-semibold text-white my-2 lg:mt-6 lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" onClick={handleProceedToPayment}>Proceed To Payments</button>
                                <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-2 right-4 lg:right-5">Need Help? <Link className="text-blue-500 lg:hover:underline font-bold">Contact Us</Link></span>
                            </div> */}
                            <div className="flex flex-col gap-5 w-[45%]">
                                <div className="w-full">
                                    <h5 className='font-semibold'>Delivery Address</h5>
                                    <div className="border border-[rgb(8,43,61)] rounded-xl p-3 text-xs space-y-[6px] font-medium">
                                        <span className='text-[15px]'>{address.name}</span>
                                        <p className='tracking-tight leading-[1.3]'>{address.landmark === "" ? "" : address.landmark + ", "}{address.houseNo + ", " + address.area + ", " + address.city + ", " + address.state + ", India (" + address.pincode + ")"}</p>
                                        <p className=''>{address.phone}</p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="mt-5 leading-3 font-semibold">
                                        <span className="">Price BreakDown ({cartItems.length} Items)</span>
                                        <span className="flex justify-between mt-2 text-xs">Total MRP <p className="">₹{totalPrice}</p></span>
                                        <span className="flex justify-between text-xs">Delivery <p className="">₹{deliveryPrice}</p></span>
                                        <span className="flex justify-between text-xs">Discount on MRP <p className="text-red-500">- ₹{discountOnMRP}</p></span>
                                        <span className="flex justify-between text-xs">Discount on Delivery <p className="text-red-500">- ₹{deliveryDiscount}</p></span>
                                        <span className="flex justify-between text-xs"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-blue-500 lg:hover:underline">(Know More)</Link></p> <p className="">₹{platformFee}</p></span>
                                        <hr className="pb-1 mt-1" />
                                        <span className="flex justify-between font-bold text-green-500 mt-1">Grand Total <p>₹{totalPrice - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee}</p></span>
                                    </div>
                                    {
                                        paymentMode !== -1 ? (
                                            <>
                                                <button className="w-full h-10 rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-lg font-semibold text-white my-2 lg:mt-6 lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" onClick={handleProceedToPayment}>Proceed To Payments</button>
                                                <p className='opacity-70 text-xs mt-1 text-center'>(You can tell your Big Brother and Sister to pay 😁)</p>
                                            </>
                                        )
                                            :
                                            null
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-3 right-4 lg:right-5">Need Help? <Link to="/setting/contact-us" className="text-blue-500 lg:hover:underline font-bold">Contact Us</Link></span>
                </div>
                <div className="border hidden lg:inline-block w-[35%] h-[85vh] sticky top-10 rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)]"></div>
            </div>
            <RequestSuccessfullPopup popupData={popupData} showSuccessfullPopup={showOrderedSuccessfull} setShowSuccessfullPopup={setShowOrderedSuccessfull} state="Ordered" />
            <KnowMorePopup setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}

export default PaymentsPage
