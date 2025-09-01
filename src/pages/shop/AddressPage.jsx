import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import KnowMorePopup from "@/components/KnowMorePopup"
import CheckoutNavigator from "@/components/CheckoutNavigator"
import { getAllAddress } from "@/firebase/auth"
import { updateAddress } from "@/store/features/cartSlice"
import secureIcon from "../../assets/commonIcons/Secure.png"
import AddNewAddressButton from "@/components/AddNewAddressButton"
import { checkPincode } from "@/firebase/fship"
import { useToast } from "@/components/ToastProvider"

let addressDetails = {
    name: "",
    phone: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
    address_type: ""
}



function AddressPage({ cartItems }) {
    let [selectedAddress, setSelectedAddress] = useState("")
    let [formData, setFormData] = useState(addressDetails);
    let [isOpen, setIsOpen] = useState(false);
    let { address } = useSelector(state => state.cart);
    let { user } = useSelector(state => state.auth);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let toast = useToast();
    let [open, setOpen] = useState(false);

    let totalPrice = cartItems.reduce((sum, cart) => sum + Number(cart.price * cart.quantity), 0);
    let discountOnMRP = totalPrice - cartItems.reduce((sum, cart) => sum + Number(cart.salePrice * cart.quantity), 0);
    let deliveryPrice = 49;
    let deliveryDiscount = 49;
    let platformFee = 15;

    const handleAddAddressButton = (e) => {
        e.preventDefault();

        setFormData(addressDetails);
        setOpen(true);
    }

    const handleContinueToPayment = () => {
        if(address){
            checkPincode("827013").then((res) => {
                if(res.response === "Valid and servicable pincodes."){
                    navigate("/checkout/payment")
                }else{
                    toast("Pincode is not serviceable.");
                }
            })
        }
    }

    useEffect(() => {
        getAllAddress(user.id).then((res) => {
            dispatch(updateAddress(res))
            setSelectedAddress(res.find(add => add.isDefault === true))
        })
    }, [])

    useEffect(() => {
        localStorage.setItem("address", JSON.stringify(selectedAddress))
    }, [selectedAddress, setSelectedAddress])

    return (
        <>
            <div className="w-full h-full py-3 lg:py-8 px-3 lg:px-16 flex gap-10">
                <div className="w-full lg:w-[65%] space-y-3 relative">
                    <div className="leading-[1] font-semibold flex justify-between items-center">
                        <span>Destination Deck📍<br />
                            <p className="text-xs font-normal">Where should we warp your delivery? Input your Earth-based coordinates</p></span>
                        <span className="text-sm font-semibold flex items-center gap-1"><img src={secureIcon} alt="" className="h-7" /> 100% Secure</span>
                    </div>
                    <div className="flex flex-col gap-4 rounded-3xl relative py-5 px-4 lg:p-8 shadow-[0px_0px_10px_-2px_rgb(8,43,61)] lg:min-h-[80vh]">
                        <CheckoutNavigator />
                        <div className="w-full flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-[60%] space-y-4">
                                <p className="text-sm font-medium"><span className="text-[rgb(253,84,120)] font-semibold">Note:</span> Once a product has been shipped, it cannot be cancelled.</p>
                                {
                                    address.map((item, index) => (
                                        <div key={index} className={`flex flex-col gap-2 border border-[rgb(8,43,61)] rounded-xl relative py-3 px-5 overflow-hidden cursor-pointer ${selectedAddress === item ? "shadow-[0px_0px_10px_-1px_rgb(8,43,61)] scale-100 border-2 bg-slate-200" : "scale-95 lg:hover:scale-[0.97] duration-150 shadow-md border border-slate-300"}`} onClick={() => setSelectedAddress(item)}>
                                            <div className="font-bold text-sm lg:text-base flex items-center gap-3">
                                                <span className="bg-[rgb(8,43,61)] h-4 text-white rounded flex justify-center items-center select-none px-2 text-[10px] font-medium ">{item.address_type}</span>
                                                <label htmlFor="address1">ADDRESS {index + 1} <span className="text-[rgb(253,84,120)] text-[10px] lg:text-xs ml-2">{`${item.isDefault ? "(Default)" : ""}`}</span></label>
                                            </div>
                                            <div className="grid grid-rows-3 grid-cols-2 gap-y-[6px] lg:gap-y-2 gap-x-8 lg:gap-x-10" >
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Name <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.name}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Phone No.<br /> <span className="text-[12px] lg:text-[14px] font-semibold">+91 {item.phone}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">House/Appartment No. <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.houseNo}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Village/Area Name <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.area}</span></p>
                                                <p className="text-[9px] lg:text-[11px] leading-[1]">Landmark <br /> <span className="text-[12px] lg:text-[14px] font-semibold">{item.landmark ? item.landmark : "_"}</span></p>
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
                                <AddNewAddressButton isOpen={open} setIsOpen={setOpen} formData={formData} setFormData={setFormData} addressDetails={addressDetails} />
                                <button onClick={(e) => handleAddAddressButton(e)} className="w-[95%] relative left-3.5 lg:hover:scale-[1.05] duration-200 h-10 shadow-md border border-slate-300 rounded-xl font-semibold">+ Add New Address</button>
                            </div>
                            <div className="w-full lg:w-[40%] mt-1">
                                <div className="leading-3 font-semibold">
                                    <span className="font-bold">Price Details ({cartItems.length > 0 ? cartItems.reduce((sum, i) => {return sum + i.quantity}, 0) : 0} Items)</span>
                                    <span className="flex justify-between mt-2 text-xs">Total MRP <p className="">₹{totalPrice}</p></span>
                                    <span className="flex justify-between text-xs">Delivery <p className="">₹{deliveryPrice}</p></span>
                                    <span className="flex justify-between text-xs text-[rgb(253,84,120)]">Discount on MRP <p className="text-[rgb(253,84,120)]">- ₹{discountOnMRP}</p></span>
                                    <span className="flex justify-between text-xs text-[rgb(253,84,120)]">Discount on Delivery <p className="">- ₹{deliveryDiscount}</p></span>
                                    <span className="flex justify-between text-xs"><p>Platform Fee <Link onClick={(e) => { e.preventDefault(), setIsOpen(true) }} className="text-[10px] text-[rgb(59,130,246)] lg:hover:underline">(Know More)</Link></p> <p className="">₹{platformFee}</p></span>
                                    <hr className="pb-1 mt-1" />
                                    <span className="flex justify-between font-bold text-green-500 mt-1">Grand Total <p>₹{totalPrice - discountOnMRP + deliveryPrice - deliveryDiscount + platformFee}</p></span>
                                </div>
                                <button className="w-full h-11 rounded-xl bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-lg font-semibold text-white my-2 lg:mt-6 lg:hover:scale-[1.03] lg:active:scale-[0.97] duration-150" onClick={handleContinueToPayment}>Continue To Payment<i className="fi fi-br-angle-double-small-right relative top-[3px] ml-2"></i></button>
                            </div>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium lg:text-xs absolute bottom-1 lg:bottom-3 right-4 lg:right-5">Need Help? <Link to="/setting/contact-us" className="text-[rgb(59,130,246)] lg:hover:underline font-bold">Contact Us</Link></span>
                </div>
                <div className="border hidden lg:inline-block w-[35%] h-[85vh] sticky top-10 rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)]"></div>
            </div>
            <KnowMorePopup setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}

export default AddressPage
