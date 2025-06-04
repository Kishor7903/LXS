import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import KnowMorePopup from "@/components/KnowMorePopup"
import CheckoutNavigator from "@/components/CheckoutNavigator"


function AddressPage() {
    let [selectedAddress, setSelectedAddress] = useState("")
    let [isOpen, setIsOpen] = useState(false);
    let { address } = useSelector(state => state.cart);
    let navigate = useNavigate();
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    let totalPrice = cartItems.reduce((sum, cart) => sum + Number(cart.price * cart.quantity), 0);
    let discountOnMRP = totalPrice - cartItems.reduce((sum, cart) => sum + Number(cart.salePrice * cart.quantity), 0);
    let deliveryPrice = 49;
    let deliveryDiscount = 49;
    let platformFee = 9;

    useEffect(() => {
        setSelectedAddress(address.find(add => add.isDefault === true))
    }, [])

    useEffect(() => {
        localStorage.setItem("address", JSON.stringify(selectedAddress))
    }, [selectedAddress, setSelectedAddress])

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
                            <div className="w-full lg:w-[60%] space-y-4">
                                {
                                    address.map((item, index) => (
                                        <div key={index} className={`flex flex-col gap-2 border border-[rgb(8,43,61)] rounded-xl relative py-3 px-5 overflow-hidden cursor-pointer ${selectedAddress === item ? "shadow-[0px_0px_10px_-1px_rgb(8,43,61)] scale-100 border-2 bg-slate-200" : "scale-95"}`} onClick={() => setSelectedAddress(item)}>
                                            <div className="font-bold text-sm lg:text-base flex gap-3">
                                                <label htmlFor="address1">ADDRESS {index + 1} <span className="text-blue-500 text-[10px] lg:text-xs">{`${item.isDefault ? "(Default)" : ""}`}</span></label>
                                            </div>
                                            <div className="grid grid-rows-3 grid-cols-2 gap-y-[6px] lg:gap-y-2 gap-x-8 lg:gap-x-10" >
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Name <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.name}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Phone No.<br /> <span className="text-[12px] lg:text-[14px] font-semibold">+91 {item.phone}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">House/Appartment No. <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.houseNo}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Village/Area Name <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.area}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Landmark <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.landmark}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Pincode <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.pincode}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">City <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.city}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">State <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.state}</span></p>
                                            </div>
                                            {
                                                selectedAddress === item && (
                                                    <div className="h-10 w-24 bg-[rgb(8,43,61)] absolute -top-3 -right-10 rotate-45 flex justify-center items-end">
                                                        <i className="fi fi-br-check text-white relative left-[2px] top-[2px] -rotate-45"></i>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                                <button onClick={() => navigate("/setting/saved-addresses")} className="w-full h-8 border border-[rgb(8,43,61)] rounded-full font-semibold">+ Add New Address</button>
                            </div>
                            <div className="w-full lg:w-[40%]">
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
                                <button className="w-full h-10 rounded-full bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-lg font-semibold text-white my-2 lg:mt-6 lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" onClick={() => navigate("/checkout/payment")}>Proceed To Payments</button>
                            </div>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-3 right-4 lg:right-5">Need Help? <Link to="/setting/contact-us" className="text-blue-500 lg:hover:underline font-bold">Contact Us</Link></span>
                </div>
                <div className="border hidden lg:inline-block w-[35%] h-[85vh] sticky top-10 rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)]"></div>
            </div>
            <KnowMorePopup setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}

export default AddressPage
