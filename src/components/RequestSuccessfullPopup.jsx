import { Link } from "react-router-dom"
import tickIcon from "../assets/commonIcons/Submit.png"
import DialogBox from "./DialogBox"

function RequestSuccessfullPopup({popupData = "", showSuccessfullPopup, setShowSuccessfullPopup, state }) {

    let headerContent = () => {
        if (state === "Exchange"){
            return "Exchange Request Submitted Successfully";
        }
        else if(state === "Return"){
            return "Return & Refund Request Submitted Successfully";
        }
        else if(state === "Ordered"){
            return "Ordered Placed Successfully"
        }
    }

    let secoundLineContent = () => {
        if (state === "Exchange"){
            return "Exchange";
        }
        else if(state === "Return"){
            return "Return & Refund";
        }
        else if(state === "Ordered"){
            return "Order"
        }
    }

    let thirdLineContent = () => {
        if (state === "Exchange"){
            return "Exchange";
        }
        else if(state === "Return"){
            return "Return & Refund";
        }
        else if(state === "Ordered"){
            return "Delivery"
        }
    }

    let linkContent = () => {
        if (state === "Exchange"){
            return "Exchange";
        }
        else if(state === "Return" || state === "Ordered"){
            return "Return & Refund";
        }
    }



    return (
        <DialogBox isOpen={showSuccessfullPopup} setIsOpen={setShowSuccessfullPopup} className="h-[650px] w-[780px] overflow-hidden bg-white rounded-[50px] gap-5 flex flex-col relative shadow-[0px_0px_20px_-1px_black]" parentDivClassName="flex items-center justify-center pl-4">
            <div className="h-[90%] flex flex-col justify-center items-center ">
                <img src={tickIcon} alt="" className="w-28 mb-8" />
                <h5 className="text-lg font-bold">{headerContent()}</h5>
                <p className="text-sm">{secoundLineContent()} ID: <span className="font-semibold text-orange-400">{popupData.orderId}</span></p>
                <p className="text-sm">Estimate {thirdLineContent()} Processing Time: <span className="font-semibold text-orange-400">4-6 Business Days</span></p>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full h-10 w-1/4 mt-5 font-semibold border border-[rgb(8,43,61,0.2)]">Track Status</button>
            </div>
            <div className="flex justify-center gap-32 px-20">
                <Link to="/policy/return-and-refund-policy" className="text-blue-400 font-medium text-sm lg:hover:underline">{linkContent()} Policy</Link>
                <Link to="/policy/FAQs" className="text-blue-400 font-medium text-sm lg:hover:underline">FAQs</Link>
                <Link to="/setting/contact-us" className="text-blue-400 font-medium text-sm lg:hover:underline">Customer Support</Link>
            </div>
        </DialogBox>
    )
}

export default RequestSuccessfullPopup
