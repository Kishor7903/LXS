import HoverButton from "@/components/HoverButton";
import { useState } from "react"
import { Link } from "react-router-dom";


function ShopSettingPaymentOptions() {
    let [paymentOption, setPaymentOption] = useState("Saved Cards");

    const handlePaymentsOptionPage = () => {
        if (paymentOption === "Saved Cards") {
            return (
                <div className="flex flex-col gap-5 py-2 h-full w-full mx-auto">
                    <div className="h-[28vh] w-full rounded-xl p-5 border border-[rgb(8,43,61)]">
                        <div className="flex items-center gap-3 w-full h-[10%]">
                            <input type="radio" id="card" name="card" /> <label htmlFor="card" className="font-semibold">DEFAULT CARD</label>
                        </div>
                        <div className="h-[90%] w-full flex justify-between">
                            <div className="h-full w-1/5 text-xs text-blue-500 flex flex-col gap-1 py-5">
                                <Link className="lg:hover:underline">View Details</Link>
                                <Link className="lg:hover:underline">Edit</Link>
                                <Link className="lg:hover:underline">Remove</Link>
                            </div>
                            <div className="w-3/5 rounded-xl border border-[rgb(8,43,61)] ml-4 mt-2 p-5 bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white">
                                <div className="h-[45%] w-full flex justify-between ">
                                    <p className="text-[12px]">Debit Card</p>
                                    <h5 className="text-xl font-extrabold text-right leading-3 tracking-wider">LXS Store <br /><span className="text-sm font-medium tracking-normal">Prime Card</span></h5>
                                </div>
                                <div className="h-[55%]">
                                    <p className="tracking-widest text-xl">**** **** 4432</p>
                                    <p className="text-xs flex items-center justify-between w-2/3 font-medium relative top-1">FROM 9/21 <span>TO 9/31</span></p>
                                    <p className="tracking-wider font-semibold relative top-2 text-sm">S*C*I*  K*M*R</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HoverButton className="px-3 py-2 flex justify-center items-center self-center">+ Add New Card</HoverButton>
                </div>
            )
        }
        else if (paymentOption === "Saved UPIs") {
            return (
                <div className="flex flex-col gap-4 w-[95%] mx-auto px-5">
                    <div className="h-[17%] w-full rounded-xl px-4 py-1 border border-[rgb(8,43,61)] font-semibold flex justify-between">
                        <div className="w-2/3">
                            <input type="radio" id="card2" name="card" checked /> <label htmlFor="card2">UPI 2</label>
                            <p className="text-[14px] pl-3 mt-2 leading-4">S*C*I* K*M*R <br />sachi*************@okaxis</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-end mr-2 justify-center text-xs text-blue-500">
                            <Link className="lg:hover:underline">View Details</Link>
                            <Link className="lg:hover:underline">Edit</Link>
                            <Link className="lg:hover:underline">Remove</Link>
                        </div>
                    </div>
                    <div className="h-[17%] w-full rounded-xl px-4 py-1 border border-[rgb(8,43,61)] font-semibold flex justify-between">
                        <div className="w-2/3">
                            <input type="radio" id="card2" name="card" checked /> <label htmlFor="card2">UPI 2</label>
                            <p className="text-[14px] pl-3 mt-2 leading-4">S*C*I* K*M*R <br />sachi*************@okaxis</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-end mr-2 justify-center text-xs text-blue-500">
                            <Link className="lg:hover:underline">View Details</Link>
                            <Link className="lg:hover:underline">Edit</Link>
                            <Link className="lg:hover:underline">Remove</Link>
                        </div>
                    </div>
                    <div className="h-[17%] w-full rounded-xl px-4 py-1 border border-[rgb(8,43,61)] font-semibold flex justify-between">
                        <div className="w-2/3">
                            <input type="radio" id="card2" name="card" checked /> <label htmlFor="card2">UPI 2</label>
                            <p className="text-[14px] pl-3 mt-2 leading-4">S*C*I* K*M*R <br />sachi*************@okaxis</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-end mr-2 justify-center text-xs text-blue-500">
                            <Link className="lg:hover:underline">View Details</Link>
                            <Link className="lg:hover:underline">Edit</Link>
                            <Link className="lg:hover:underline">Remove</Link>
                        </div>
                    </div>
                    <div className="h-[17%] w-full rounded-xl px-4 py-1 border border-[rgb(8,43,61)] font-semibold flex justify-between">
                        <div className="w-2/3">
                            <input type="radio" id="card2" name="card" checked /> <label htmlFor="card2">UPI 2</label>
                            <p className="text-[14px] pl-3 mt-2 leading-4">S*C*I* K*M*R <br />sachi*************@okaxis</p>
                        </div>
                        <div className="w-1/3 flex flex-col items-end mr-2 justify-center text-xs text-blue-500">
                            <Link className="lg:hover:underline">View Details</Link>
                            <Link className="lg:hover:underline">Edit</Link>
                            <Link className="lg:hover:underline">Remove</Link>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="text-xs relative top-2 flex flex-col gap-2 text-center">
                    <div className="flex font-semibold text-blue-500 justify-between border-b border-[rgb(8,43,61)] mb-2">
                        <p className="w-[27%]">Name of Transaction</p>
                        <p className="w-[27%]">Product/Service</p>
                        <p className="w-[30%]">Date & Time</p>
                        <p className="w-[14%]">Amount</p>
                    </div>
                    <div className="flex justify-between font-medium">
                        <p className="w-[27%]">Appreal</p>
                        <p className="w-[27%]">LXS Signature Tee</p>
                        <p className="w-[30%]">22 Jan, 2025 11:25 AM</p>
                        <p className="w-[14%]">₹ 999</p>
                    </div>
                    <div className="flex justify-between font-medium">
                        <p className="w-[27%]">Subscription</p>
                        <p className="w-[27%]">LXS Prime</p>
                        <p className="w-[30%]">21 Jan, 2025 4:30 PM</p>
                        <p className="w-[14%]">₹ 199</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="w-full h-full px-5 flex gap-10 ">
            <div className="w-1/2 flex flex-col justify-between">
                <div className="leading-[1] font-semibold h-10">Financial LaunchPad 🚀<br />
                    <p className="text-xs font-normal">Get your Payments Engine Ready!</p>
                </div>
                <div className="space-y-3 h-full py-2">
                    <div className="flex gap-5 text-sm h-8">
                        {
                            ["Saved Cards", "Saved UPIs", "Transaction History"].map((item, index) => (
                                <div key={index} className={`px-3 py-1 border border-[rgb(8,43,61)] rounded-full cursor-pointer ${paymentOption === item ? "bg-[rgb(8,43,61)] text-white" : ""}`} onClick={() => setPaymentOption(item)}>{item}</div>
                            ))
                        }
                    </div>
                    <div className="space-y-3 h-full py-3 overflow-y-scroll no-scrollbar">
                        {
                            handlePaymentsOptionPage()
                        }
                    </div>
                </div>
            </div>
            <div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default ShopSettingPaymentOptions
