import Breadcrum from "@/components/Breadcrum"
import RequestSuccessfullPopup from "@/components/RequestSuccessfullPopup"
import RgbButton from "@/components/RgbButton"
import { useToast } from "@/components/ToastProvider"
import { getSingleOrderDetails } from "@/firebase/auth"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

let sizes = ["Select", "S", "M", "L", "XL", "2XL"];
let reasons = ["Select", "Wrong Size", "Wrong Color", "Defective or Damaged Product", "Received different Product", "Others"]

function ProductExchange() {
    let [showExchangeSuccessfullPopup, setShowExchangeSuccessfullPopup] = useState(false);
    let [orderDetails, setOrderDetails] = useState([]);
    let [returnReason, setReturnReason] = useState("Select");
    let [returnDescription, setReturnDescription] = useState("");
    let [size, setSize] = useState("Select");
    const [previews, setPreviews] = useState([null, null, null, null]);
    const [files, setFiles] = useState([null, null, null, null]);
    const [uploadedUrls, setUploadedUrls] = useState([null, null, null, null]);
    const [publicIds, setPublicIds] = useState([null, null, null, null])
    const fileInputs = useRef([]);
    let { user } = useSelector(state => state.auth);
    let { products } = useSelector(state => state.admin);
    let { id } = useParams();
    const toast = useToast();

    let productInfo = products.filter(item => item.id === orderDetails?.productInfo?.product_id)[0];

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
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

    const handleBoxClick = (index) => {
        fileInputs.current[index]?.click();
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

    const handleSubmitReturn = async () => {
        const urls = [...uploadedUrls];
        const ids = [...publicIds];
        console.log(files, returnReason, size, returnDescription);

        // for (let i = 0; i < files.length; i++) {
        //     if (files[i]) {
        //         let response = await uploadToCloudinary(files[i]);
        //         urls[i] = response?.url;
        //         ids[i] = response?.public_id
        //     }
        // }

        // let imageData = {
        //     urls,
        //     ids
        // }

        // dispatch

        setFiles([null, null, null, null]);
        setPreviews([null, null, null, null]);
        setUploadedUrls([null, null, null, null]);
        setPublicIds([null, null, null, null]);

        toast("Product Added Successfully ...")
        setIsOpen(false);
        setFormData(productData);
    };

    useEffect(() => {
        setFiles([null, null, null, null]);
        setPreviews([null, null, null, null]);
        setUploadedUrls([null, null, null, null]);
        getSingleOrderDetails(user.id, id).then((res) => {
            setOrderDetails(res);
        })
    }, [])

    let items = [
        {
            label: "Your Orders",
            path: "../setting/my-orders"
        },
        {
            label: "Order Details",
            path: `/orders/order-details/${id}`
        },
        {
            label: "Request Product Exchange"
        }
    ]



    return (
        <div className="px-16 py-6 h-[91vh]">
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <div className="leading-[1] font-semibold">Hassle Free Products Exchange <br />
                        <p className="text-xs font-normal">Need a Replacement? Request an Exchange with Ease!</p>
                    </div>
                    <div className="rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border h-[89.5%] mt-5 px-8 py-5 flex flex-col overflow-y-scroll no-scrollbar w-full">
                        <div className="flex justify-between w-full relative">
                            <h4 className="text-xl font-bold"><span className="text-orange-600">Delivered</span> on 24 January 2025, Wednesday 11:42 AM</h4>
                            <div className="leading-3 text-right absolute right-0">
                                <p className="font-semibold">SELLER</p>
                                <p className="text-xl font-extrabold">LXS STORE</p>
                                <p className="text-xs font-medium text-blue-500 lg:hover:underline relative bottom-[5px] cursor-pointer">View Seller Profile</p>
                            </div>
                        </div>
                        <div className="h-[40%] w-full mt-5 flex gap-5">
                            <img src={productInfo?.images[0]} alt="" className="h-44 w-44 border rounded-2xl" />
                            <div className="w-[65%] text-xs leading-4 font-medium">
                                <h3 className="font-bold text-xl">{productInfo?.name}</h3>
                                <p >Sold By : <span className="text-blue-500">LXS Store</span></p>
                                <p>Size : M</p>
                                <p className="text-lg font-bold">₹ 1048.00</p>
                                <p>Return & Exchange window closes on 18 Jan</p>
                                <button className="bg-gradient-to-br from-orange-400 to-red-400 h-9 px-3 rounded-full border mt-3 text-white font-semibold">Buy Again</button>
                            </div>
                        </div>
                        <div className="w-full flex gap-5 ">
                            <div className="text-xs w-1/2">
                                <p className="text-sm font-semibold">Select Exchange Reason & New Product Varient</p>
                                <p className="text-orange-500"><span className="relative top-1 text-base">*</span> Reason For Exchange</p>
                                <select value={returnReason} onChange={(e) => { e.preventDefault(), setReturnReason(e.target.value) }} className="border border-[rgb(8,43,61)] px-2 py-[2px] rounded-full font-medium focus:outline-none w-60">
                                    {
                                        reasons.map((item, index) => (
                                            <option key={index} value={item} disabled={index === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                                <p className="text-orange-500"><span className="relative top-1 text-base">*</span> Choose Replacement Option</p>
                                <select value={size} onChange={(e) => { e.preventDefault(), setSize(e.target.value) }} className="border border-[rgb(8,43,61)] px-2 py-[2px] rounded-full font-medium focus:outline-none w-60">
                                    {
                                        sizes.map((item, index) => (
                                            <option key={index} value={item} disabled={index === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                                <p className="text-orange-500"><span className="relative top-1 text-base">*</span> Upload Proof of Issue</p>
                                <div className="flex gap-4">
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
                                                <div className="h-full w-full rounded-2xl flex flex-col justify-center items-center border-[2px] border-dashed border-[rgb(196,185,185)]">
                                                    <i className="fi fi-sr-camera-viewfinder text-2xl"></i>
                                                    <span>Image{index + 1}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col justify-between items-center">
                                <textarea value={returnDescription} onChange={(e) => setReturnDescription(e.target.value)} className="h-40 w-full border border-[rgb(8,43,61,0.4)] rounded-2xl px-3 py-2 text-sm outline-none" placeholder="Describe the Issue here..."></textarea>
                                <RgbButton onClick={handleSubmitReturn} className="px-5 py-2 text-base font-semibold" >Submit</RgbButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
            <RequestSuccessfullPopup showSuccessfullPopup={showExchangeSuccessfullPopup} setShowSuccessfullPopup={setShowExchangeSuccessfullPopup} state="Exchange" />
        </div>
    )
}

export default ProductExchange
