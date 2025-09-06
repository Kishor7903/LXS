import DialogBox from "@/components/DialogBox";
import { useToast } from "@/components/ToastProvider";
import { uploadImage } from "@/firebase/admin";
import { addNewReportAndIssue, talkToAnAgent } from "@/firebase/auth";
import { uploadToCloudinary } from "@/firebase/cloudinary";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

let data = {
    reason: "",
    description: ""
}

let reasonOptions = ["Select", "Order Not Received", "Received Wrong Item", "Item Arrived Damaged", "Size/Fit Issue", "Product Quality Issue", "Payment Failed but Amount Deducted", "Refund Not Received", "Exchange Request", "Shipping Delay", "Coupon/Discount Not Applied", "Account/Login Issue", "Unable to Track Order", "Technical Issue on Website", "Incorrect Billing/Invoice", "Other (Please Specify)"]

function ShopSettingContactUs() {
    let [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState(false);
    let [formData, setFormData] = useState(data);
    const [previews, setPreviews] = useState([null, null, null, null, null]);
    const [files, setFiles] = useState([null, null, null, null, null]);
    const [uploadedUrls, setUploadedUrls] = useState([null, null, null, null, null]);
    const [isEnabled, setIsEnabled] = useState(false);
    const fileInputs = useRef([]);
    const toast = useToast();
    let { user } = useSelector(state => state.auth);

    const handleSendGmail = () => {
        window.open(
            `https://mail.google.com/mail/?view=cm&to=contact@lxs-lifestyle-store.com`,
            '_blank'
        );
    };

    const handleSendWhatsApp = () => {
        const url = `https://wa.me/${+918987888368}`;
        window.open(url, '_blank'); // Opens WhatsApp Web or App
    };

    const handleTalkToAgentConfirm = (e) => {
        e.preventDefault();

        talkToAnAgent(user.uid).then(() => {
            setIsOpen(false);
            toast("Request sent sucessfully...");
        })
    }

    const handleReportAndIsuue = (e) => {
        e.preventDefault();

        setOpen(true);
    }

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                toast("Please select a valid image file.");
                return;
            }

            if (file.size > 1024 * 1024) { // 1MB = 1048576 bytes
                toast("Image size must be less than 1 MB.");
                return;
            }

            const newPreviews = [...previews];
            const newFiles = [...files];
            newPreviews[index] = URL.createObjectURL(file);
            newFiles[index] = file;
            setPreviews(newPreviews);
            setFiles(newFiles);
        }
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const newPreviews = [...previews];
            const newFiles = [...files];
            newPreviews[index] = URL.createObjectURL(file);
            newFiles[index] = file;
            setPreviews(newPreviews);
            setFiles(newFiles);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleBoxClick = (index) => {
        fileInputs.current[index]?.click();
    };

    const checkBusinessTime = () => {
        const now = new Date();
        const day = now.getDay(); // 0 (Sun) - 6 (Sat)
        const hour = now.getHours(); // 0 - 23

        const isWeekday = day >= 1 && day <= 5; // Monday to Friday
        const isBusinessHour = hour >= 10 && hour < 17; // 10:00 AM to 4:59 PM

        return isWeekday && isBusinessHour;
    };

    const removeImage = (index) => {
        const newPreviews = [...previews];
        const newFiles = [...files];
        const newUrls = [...uploadedUrls];
        newPreviews[index] = null;
        newFiles[index] = null;
        newUrls[index] = null;
        setPreviews(newPreviews);
        setFiles(newFiles);
        setUploadedUrls(newUrls);
        if (fileInputs.current[index]) {
            fileInputs.current[index].value = null;
        }
    };

    const handleReportIssueSubmit = async () => {
        if (!formData.reason || !formData.description) {
            toast("Required all fields!")
            return;
        }
        const urls = [...uploadedUrls];

        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                await uploadImage(files[i], `Report Issue`).then((res) => {
                    urls[i] = res;
                })
            }
        }

        addNewReportAndIssue({ ...formData, urls }, user).then(() => {
            setFiles([null, null, null, null, null]);
            setPreviews([null, null, null, null, null]);
            setUploadedUrls([null, null, null, null, null]);

            toast("Issue Send Successfully...")
        })
        setOpen(false);
        setFormData(data);
    };

    let contactUsContent = [
        {
            title: "Having any Trouble?",
            menus: [
                {
                    titleText: "Having an Issues:",
                    linkText: "Report",
                    onClick: handleReportAndIsuue
                }

            ]
        },
        {
            title: "Contact Support",
            menus: [
                {
                    titleText: "Email:",
                    linkText: "Write",
                    onClick: handleSendGmail
                },
                {
                    titleText: "Whatsapp:",
                    linkText: "Write",
                    onClick: handleSendWhatsApp
                },
                {
                    titleText: "Talk to an Agent:",
                    linkText: "Request Call",
                    onClick: function (e) {
                        e.preventDefault();

                        setIsOpen(true);
                    }
                }

            ]
        },
    ]

    useEffect(() => {
        const updateState = () => {
            setIsEnabled(checkBusinessTime());
        };

        updateState(); // Run once on mount
        const interval = setInterval(updateState, 60 * 1000); // Update every minute
        setFormData(data);

        return () => clearInterval(interval); // Cleanup
    }, []);


    return (
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between">
                <div className="leading-[1] font-semibold h-10">Mayday Mayday 🛸 <br />
                    <p className="text-xs font-normal">Lost in Space? We'll guide you home because we won't let you collapse!</p>
                </div>
                <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
                    {
                        contactUsContent.map((content, index) => (
                            <div key={index} className="border border-slate-300 bg-slate-100 shadow-md px-4 pt-2 pb-4 rounded-xl">
                                <h3 className="font-bold tracking-wide text-lg">{content.title}</h3>
                                <div className="space-y-1 text-xs leading-3 mt-2 flex flex-col gap-1 font-medium ml-3">
                                    {
                                        content.menus.map((item, idx) => (
                                            <div className="" key={idx}>
                                                <span className=" mr-3 ">{item.titleText}</span>
                                                <Link onClick={item.onClick} className="capitalize text-[rgb(253,84,120)] lg:hover:underline">{item.linkText}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-[40vw] bg-white rounded-3xl flex flex-col items-center p-6 overflow-hidden" parentDivClassName="flex justify-center items-center">
                <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-80">
                    Talk to an Agent !
                </h2>
                <div className="mt-4 text-sm px-6 font-medium space-y-2">
                    <p>Have questions, concerns, or need help choosing the right product? Our customer support team is just a click away.</p>
                    <p>By selecting <span className="font-bold">“Talk to an Agent”,</span> you can connect directly with a trained support representative who’s ready to assist you in real time. Whether you’re facing an issue with an order, need product recommendations, or simply want more information, we’re here to provide quick, friendly, and personalized support.</p>
                    <p>Once you click the button below, you can:</p>
                    <ul className="list-disc ml-10">
                        <li>Request a callback from our support team</li>
                        <li>Share details about your concern for faster assistance</li>
                        <li>Choose your preferred time (if scheduled call is available)</li>
                        <li>Receive expert help tailored to your needs</li>
                    </ul>
                    <p><span className="font-bold">Support Hours</span>: Monday to Friday, 10:00 AM – 5:00 PM IST</p>
                    <p><span className="font-bold">After Hours?</span> No worries — just leave your message or number, and we’ll reach out to you as soon as we’re back online.</p>
                    <p>We value your time and are committed to resolving your queries with care and efficiency.</p>
                </div>
                <textarea type="text" className="border border-slate-300 shadow-md rounded-xl mt-3 w-3/4 h-32 outline-none py-2 text-sm px-3" placeholder="Describe your issue !"></textarea>
                <div className='flex justify-center gap-6 mt-5'>
                    <button className='border-2 font-semibold border-[rgb(8,43,61)] h-9 w-24 rounded-xl lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white' onClick={(e) => { e.preventDefault(), setIsOpen(false) }} >Cancel</button>
                    <button className={`h-9 px-4 rounded-xl font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-white flex justify-center items-center ${isEnabled ? "lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]" : "opacity-60 cursor-not-allowed"}`} onClick={handleTalkToAgentConfirm} disabled={isEnabled === false}>{!isEnabled ? <i className="fi fi-br-ban relative top-[2px] mr-1 text-red-500"></i> : null}{isEnabled ? "Request Callback" : "Retry on Working Hours"}</button>
                </div>
            </DialogBox>
            <DialogBox isOpen={open} setIsOpen={setOpen} className="min-w-[35vw] bg-white rounded-3xl flex flex-col p-8 items-center overflow-hidden" parentDivClassName="flex justify-center items-center">
                <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-80">
                    Report an Issue !
                </h2>
                <form className="w-full">
                    <div className="">
                        <label name="reason"className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Reason<span className="text-red-600">*</span></label>
                        <br />
                        <select name='reason' value={formData.reason} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                            {
                                reasonOptions.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Describe in Details<span className="text-red-600">*</span></label>
                        <br />
                        <textarea name='description' value={formData.description} onChange={handleChange} className='border-[rgb(196,185,185)] border px-3 rounded-xl h-32 leading-4 w-full outline-none py-2' autoComplete='off'></textarea>
                    </div>
                    <label className="mt-2 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Proof of Issue (Only <span className="font-semibold text-[rgb(8,43,61)]">.jpg </span>and <span className="font-semibold text-[rgb(8,43,61)]">.png </span>image files are allowed. Maximum file size: <span className="font-semibold text-[rgb(8,43,61)]">1 MB</span>.)</label>
                    <br />
                    <div className="flex gap-4 mt-1">
                        {previews.map((image, index) => (
                            <div
                                key={index}
                                className="w-[72px] h-[72px]  rounded-2xl flex items-center justify-center text-sm text-gray-400 cursor-pointer relative"
                                onClick={() => handleBoxClick(index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={(el) => (fileInputs.current[index] = el)}
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                {image ? (
                                    <>
                                        <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-fill rounded-2xl border border-[rgb(196,185,185)]"
                                        />
                                        <button
                                            className="absolute -top-2 -right-2 bg-[rgb(8,43,61)] text-white text-lg rounded-full w-5 h-5 flex items-center justify-center shadow"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </>
                                ) : (
                                    <div className="h-full w-full rounded-2xl flex flex-col justify-center items-center border-[2px] border-dashed border-[rgb(8,43,61)]">
                                        <i className="fi fi-sr-camera-viewfinder text-3xl text-[rgb(8,43,61)] relative top-1"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </form>
                <div className='flex justify-center gap-8 mt-7'>
                    <button className='border-2 font-semibold border-[rgb(8,43,61)] h-12 w-60 rounded-xl lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white' onClick={(e) => { e.preventDefault(), setOpen(false) }} >Cancel</button>
                    <button className='h-12 w-60 rounded-xl font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-white lg:hover:scale-[1.05] duration-200 lg:active:scale-[0.98]' onClick={handleReportIssueSubmit}>Report</button>
                </div>
            </DialogBox>
        </div>
    )
}

export default ShopSettingContactUs
