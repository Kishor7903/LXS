import CheckoutNavigator from '@/components/CheckoutNavigator'
import HoverButton from '@/components/HoverButton';
import KnowMorePopup from '@/components/KnowMorePopup';
import RequestSuccessfullPopup from '@/components/RequestSuccessfullPopup';
import { displayRazorpay } from '@/firebase/RazorpayPayment';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import secureIcon from "../../assets/commonIcons/Secure.png"
import paymentIcon from "../../assets/commonIcons/Cash White (Fill).png"

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
    // {
    //     type: "LXS Cosmic Pay",
    //     value: ""
    //     icon: "fi fi-rr-sack",
    //     iconActive: "fi fi-sr-sack"
    // },
    {
        type: "UPI / QR CODE",
        value: "upi",
        icon: "fi fi-rr-qr-scan",
        iconActive: "fi fi-br-qr-scan"
    },
    {
        type: "Credit or Debit Card",
        value: "card",
        icon: "fi fi-rr-credit-card",
        iconActive: "fi fi-sr-credit-card"
    },
    {
        type: "Net Banking",
        value: "netbanking",
        icon: "fi fi-rr-bank",
        iconActive: "fi fi-sr-bank"
    },
    {
        type: "EMI",
        value: "emi",
        icon: "fi fi-rr-tax-alt",
        iconActive: "fi fi-sr-tax-alt"
    },
    {
        type: "Wallet",
        value: "wallet",
        icon: "fi fi-rr-wallet",
        iconActive: "fi fi-sr-wallet"
    },
    {
        type: "Buy Now, Pay Later",
        value: "paylater",
        icon: "fi fi-rr-payroll-calendar",
        iconActive: "fi fi-br-payroll-calendar"
    },
    // {
    //     type: "POD (Pay On Delivery)",
    //     value: "pod",
    //     icon: "fi fi-rr-money-bills-simple",
    //     iconActive: "fi fi-sr-money-bills-simple"
    // }
]

function PaymentsPage() {
    let [showMore, setShowMore] = useState(false);
    let [formattedNumber, setFormattedNumber] = useState("");
    let [pinNumber, setPinNumber] = useState("");
    let [paymentMode, setPaymentMode] = useState("");
    let [isOpen, setIsOpen] = useState(false);
    let [popupData, setPopupData] = useState({ orderId: "", id: "" });
    let [showOrderedSuccessfull, setShowOrderedSuccessfull] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let address = JSON.parse(localStorage.getItem("address"))
    let { user } = useSelector(state => state.auth)


    const today = new Date();
    const sixDaysLater = new Date();
    sixDaysLater.setDate(today.getDate() + 6);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = sixDaysLater.toLocaleDateString('en-GB', options);

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

        let cart = cartItems.map(item => ({
            id: item.item_id,
            productName: item.name,
            unitPrice: item.salePrice,
            price: item.price,
            size: item.size,
            brand: item.brand,
            quantity: item.quantity,
            image: item.images[0]
        }))

        displayRazorpay(order, cart, address, user, setShowOrderedSuccessfull, setPopupData, dispatch, paymentMode);
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
                    <div className="leading-[1] font-semibold flex justify-between items-center">
                        <span>Trade Console🛡️<br />
                            <p className="text-xs font-normal">Encrypted, secure, and verified — power the transfer with confidence</p></span>
                        <span className="text-sm font-semibold flex items-center gap-1"><img src={secureIcon} alt="" className="h-7" /> 100% Secure</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-3xl relative py-5 px-4 lg:p-8 shadow-[0px_0px_10px_-2px_rgb(8,43,61)] lg:min-h-[80vh]">
                        <CheckoutNavigator />
                        <div className="w-full flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-[55%] space-y-4">
                                <div className="w-full py-4 px-4 rounded-xl shadow-md border border-slate-300 bg-slate-100" >
                                    <div className="flex gap-3 items-center">
                                        <span className="bg-[rgb(8,43,61)] h-4 text-white rounded flex justify-center items-center select-none px-2 text-[10px] font-medium ">{address.address_type}</span>
                                        <span className="font-semibold text-base">Shipping Address</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-5 pl-2 mt-2 text-[11px]">
                                        <div className="flex flex-col leading-3">
                                            <p>Name</p>
                                            <p className="text-[14px] font-semibold">{address?.name}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>Phone No. </p>
                                            <p className="text-[14px] font-semibold">{address?.phone}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>House No./Appartment No. </p>
                                            <p className="text-[14px] font-semibold">{address?.houseNo}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>Village/Area Name </p>
                                            <p className="text-[14px] font-semibold">{address?.area}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>Landmark </p>
                                            <p className="text-[14px] font-semibold">{address?.landmark ? address?.landmark : "_"}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>Pincode </p>
                                            <p className="text-[14px] font-semibold">{address?.pincode}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>City/Town </p>
                                            <p className="text-[14px] font-semibold">{address?.city}</p>
                                        </div>
                                        <div className="flex flex-col leading-3">
                                            <p>State </p>
                                            <p className="text-[14px] font-semibold">{address?.state}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="shadow-md border border-slate-300 rounded-xl px-4 py-3 relative">
                                    <p className='xl:text-sm 2xl:text-base font-semibold'><i className="fi fi-sr-badge-percent relative top-[2px] mr-1"></i>DISCOUNTS & OFFERS</p>
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
                                </div> */}
                                <div className="shadow-md border border-slate-300 rounded-xl px-4 py-3 relative bg-slate-100">
                                    <p className='xl:text-sm 2xl:text-base font-semibold'><i className="fi fi-sr-gift-card relative top-[2px] mr-1"></i>HAVE A GIFT CARD ?</p>
                                    <div className="flex gap-4">
                                        <div className='w-[80%] ml-4'>
                                            <input type="text" value={formattedNumber} onChange={handleGiftCardNumberChange} className='bg-white px-3 h-8 text-[12px] font-medium rounded-full w-full mt-2 outline-none shadow-[inset_0px_0px_10px_-5px_rgb(8,43,61)]' placeholder='Enter Gift Card Number' />
                                            <input type="text" value={pinNumber} onChange={handleGiftCardPinChange} className='bg-white px-3 h-8 text-[12px] font-medium rounded-full w-full mt-2 outline-none shadow-[inset_0px_0px_10px_-5px_rgb(8,43,61)]' placeholder='Enter Gift Card Pin' />
                                        </div>
                                        <HoverButton className="h-8 px-4 text-sm font-semibold self-end">Apply</HoverButton>
                                    </div>
                                </div>
                                <div className="">
                                    <h5 className='font-semibold mb-2'>CHOOSE PAYMENT OPTION</h5>
                                    <div className="space-y-3">
                                        {
                                            paymentOptions.map((item, index) => (
                                                <div onClick={(e) => { e.preventDefault(), setPaymentMode(item.value) }} key={index} className={`border-[rgb(8,43,61)] rounded-xl px-4 py-3 font-medium relative overflow-hidden cursor-pointer duration-200 bg-slate-100 ${paymentMode === item.value ? "shadow-[0px_0px_10px_-1px_rgb(8,43,61)] scale-100 border-2 bg-slate-200" : "shadow-md border border-slate-300 scale-[0.96] lg:hover:scale-[0.98]"}`}><i className={`${paymentMode === item.value ? item.iconActive : item.icon} mr-2 relative top-1 text-xl`}></i>{item.type}
                                                    {
                                                        paymentMode === item.value && (
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
                                <div className="p-2 shadow-md border border-slate-300 rounded-xl flex flex-col bg-slate-100">
                                    {
                                        cartItems.map((product, idx) => (
                                            <>
                                                <div key={idx} className=" gap-4 flex items-center">
                                                    <img src={product.images[0]} alt="" className='h-16 rounded-[6px]' />
                                                    <div className="flex flex-col">
                                                        <p className='font-semibold opacity-70 line-clamp-1'>{product.name}</p>
                                                        <p className='text-xs'>Estimated Delivery by <span className='font-semibold'>{formattedDate}</span></p>
                                                    <div className="flex gap-3 items-center text-xs">
                                                        {
                                                            product?.size.map((size, i) => (
                                                                <p key={i} className='px-1.5 py-0.5 my-0.5 border border-slate-300 rounded-full font-medium bg-slate-100'>Size{i+1}: <span className="text-[rgb(240,85,120)] font-bold">{size}</span></p>
                                                            ))
                                                        }
                                                    </div>
                                                    </div>
                                                </div>
                                                {
                                                    cartItems.length > 1 && idx !== cartItems.length - 1 ?
                                                        <hr className={`border-t-2 opacity-30 border-[rgb(8,43,61)] border-dashed w-full pt-2 mt-2`} />
                                                        :
                                                        null
                                                }
                                            </>
                                        ))
                                    }
                                </div>
                                <p className='leading-4 text-xs py-4 px-4 rounded-xl shadow-md border border-slate-300 font-medium bg-slate-100'><span className='text-[rgb(240,85,120)] font-semibold text-xs'>Please Note:</span> If you cancel any item after pickup but before delivery, all items in the same shipment will be cancelled. However, items in separate shipments will continue to be delivered if already in transit.</p>
                                <div className="w-full flex gap-2 text-sm">
                                    <input type="text" className="bg-slate-100 px-3 h-8 text-[12px] font-medium rounded-full w-full outline-none shadow-[inset_0px_0px_10px_-5px_rgb(8,43,61)]" placeholder="Apply Coupons" />
                                    <button className="font-semibold w-[20%] border border-[rgb(8,43,61)] lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white rounded-full ">Apply</button>
                                </div>
                                <div className="w-full">
                                    <div className="leading-3 font-semibold">
                                        <span className="">Price BreakDown ({cartItems.length > 0 ? cartItems.reduce((sum, i) => {return sum + i.quantity}, 0) : 0} Items)</span>
                                        <span className="flex justify-between mt-2 text-xs">Total MRP <p className="">₹{totalPrice}</p></span>
                                        <span className="flex justify-between text-xs">Delivery <p className="">₹{deliveryPrice}</p></span>
                                        <span className="flex justify-between text-xs text-red-500">Discount on MRP <p className="">- ₹{discountOnMRP}</p></span>
                                        <span className="flex justify-between text-xs text-red-500">Discount on Delivery <p className="">- ₹{deliveryDiscount}</p></span>
                                        <span className="flex justify-between text-xs"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-blue-500 lg:hover:underline">(Know More)</Link></p> <p className="">₹{platformFee}</p></span>
                                        <hr className="pb-1 mt-1" />
                                        <span className="flex justify-between text-xs">Payment Method: <p className="text-blue-500">{paymentOptions[paymentMode]?.type}</p></span>
                                        <span className="flex justify-between font-bold text-green-500 mt-1">Grand Total <p>₹{totalPrice - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee}</p></span>
                                    </div>
                                    <button className={`w-full h-11 rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-lg font-semibold text-white my-2 lg:mt-6 flex gap-2 justify-center items-center ${paymentMode === "" ? "cursor-not-allowed opacity-50" : "lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)] lg:hover:scale-[1.03] lg:active:scale-[0.97] duration-150"}`} onClick={handleProceedToPayment}>Pay Now <img src={paymentIcon} alt="" className='h-4' /></button>
                                    <p className='opacity-70 font-medium text-[11px] mt-1 text-center'>(You can tell your Brothers and Sisters to Pay, bcoz Sharing is Caring 💸😅)</p>
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
