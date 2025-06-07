import Breadcrum from "@/components/Breadcrum"
import RequestSuccessfullPopup from "@/components/RequestSuccessfullPopup"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"

function ProductExchange() {
    const inputRef = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    let [imgFile, setImgFile] = useState(null)
    let [imgFile2, setImgFile2] = useState(null)
    let [imgFile3, setImgFile3] = useState(null)
    let [imgFile4, setImgFile4] = useState(null)
    let [selectedImage, setSelectedImage] = useState("");
    let [selectedImage2, setSelectedImage2] = useState("");
    let [selectedImage3, setSelectedImage3] = useState("");
    let [selectedImage4, setSelectedImage4] = useState("");
    let [showExchangeSuccessfullPopup, setShowExchangeSuccessfullPopup] = useState(false);
    let { id } = useParams();

    const handleimgFileChange = (e, id) => {
        let selectedFile = e.target.files[0];
        if (id === 1) {
            if (selectedFile) setImgFile(selectedFile)
            setSelectedImage(selectedFile ? URL.createObjectURL(selectedFile) : undefined)
        }
        else if (id === 2) {
            if (selectedFile) setImgFile2(selectedFile)
            setSelectedImage2(selectedFile ? URL.createObjectURL(selectedFile) : undefined)
        }
        else if (id === 3) {
            if (selectedFile) setImgFile3(selectedFile)
            setSelectedImage3(selectedFile ? URL.createObjectURL(selectedFile) : undefined)
        }
        else if (id === 4) {
            if (selectedFile) setImgFile4(selectedFile)
            setSelectedImage4(selectedFile ? URL.createObjectURL(selectedFile) : undefined)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, id) => {
        e.preventDefault()
        const dropedFile = e.dataTransfer.files?.[0]

        if (id === 1 && dropedFile) {
            setImgFile(dropedFile)
            setSelectedImage(dropedFile ? URL.createObjectURL(dropedFile) : undefined)
        }
        else if (id === 2 && dropedFile) {
            setImgFile2(dropedFile)
            setSelectedImage2(dropedFile ? URL.createObjectURL(dropedFile) : undefined)
        }
        else if (id === 3 && dropedFile) {
            setImgFile3(dropedFile)
            setSelectedImage3(dropedFile ? URL.createObjectURL(dropedFile) : undefined)
        }
        else if (id === 4 && dropedFile) {
            setImgFile4(dropedFile)
            setSelectedImage4(dropedFile ? URL.createObjectURL(dropedFile) : undefined)
        }
    }

    const handleimgFileRemove = (e, id) => {
        e.preventDefault();
        if (id === 1) {
            setImgFile(null)
            inputRef.current ? inputRef.current.value = "" : null;
        }
        if (id === 2) {
            setImgFile2(null)
            inputRef2.current ? inputRef2.current.value = "" : null;
        }
        else if (id === 3) {
            setImgFile3(null)
            inputRef3.current ? inputRef3.current.value = "" : null;
        }
        else if (id === 4) {
            setImgFile4(null)
            inputRef4.current ? inputRef4.current.value = "" : null;
        }
    }

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
        <>
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <div className="leading-[1] font-semibold">Hassle Free Products Exchange <br />
                        <p className="text-xs font-normal">Need a Replacement? Request an Exchange with Ease!</p>
                    </div>
                    <div className="rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border h-[89.5%] mt-5 px-8 py-5 flex flex-col overflow-y-scroll no-scrollbar w-full">
                        <div className="h-[10%] flex justify-between w-full">
                            <h4 className="text-xl font-bold"><span className="text-orange-600">Delivered</span> on 24 January 2025, Wednesday 11:42 AM</h4>
                            <div className="leading-3 text-right">
                                <p className="font-semibold">SELLER</p>
                                <p className="text-xl font-extrabold">LXS STORE</p>
                                <p className="text-xs font-medium text-blue-500 lg:hover:underline relative bottom-[5px] cursor-pointer">View Seller Profile</p>
                            </div>
                        </div>
                        <div className="h-[40%] w-full mt-5 flex gap-5 relative bottom-4">
                            <img src="https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/n/v/1/-original-imah6s6pq7wxa4u6.jpeg?q=70" alt="" className="h-44 w-44 border rounded-2xl" />
                            <div className="w-[65%] text-xs leading-4">
                                <h3 className="font-bold text-xl text-blue-500">LXS Signature Tee</h3>
                                <p >Sold By : <span className="text-blue-500">LXS Store</span></p>
                                <p>Size : M</p>
                                <p className="text-sm font-bold">₹ 1048.00</p>
                                <p>Return & Exchange window closes on 18 Jan</p>
                                <button className="bg-gradient-to-br from-orange-400 to-red-400 h-9 px-3 rounded-full border mt-3 text-white font-semibold">Buy Again</button>
                            </div>
                        </div>
                        <div className="w-full flex gap-5">
                            <div className="relative bottom-3 text-xs w-1/2">
                                <p className="text-sm font-semibold">Select Exchange Reason & New Product Varient</p>
                                <p className="text-orange-500"><span className="relative top-1 text-base">*</span> Reason For Exchange</p>
                                <select className="border border-[rgb(8,43,61)] px-2 py-[2px] rounded-full font-medium focus:outline-none">
                                    <option value="">Wrong Size</option>
                                    <option value="">Wrong Color</option>
                                    <option value="">Defective or Damaged Product</option>
                                    <option value="">Received different Product</option>
                                    <option value="">Others</option>
                                </select>
                                <p className="text-orange-500"><span className="relative top-1 text-base">*</span> Choose Replacement Option</p>
                                <select className="border border-[rgb(8,43,61)] px-2 py-[2px] rounded-full font-medium w-[203px] focus:outline-none">
                                    <option value="">S</option>
                                    <option value="">M</option>
                                    <option value="">L</option>
                                    <option value="">XL</option>
                                    <option value="">2XL</option>
                                </select>
                                <p className="text-orange-500"><span className="relative top-1 text-base">*</span> Upload Proof of Issue</p>
                                <div className="h-[25%] w-full flex justify-between relative top-2 pr-10">
                                    <input id='image-upload' name="productImg1" accept='image/*' className='hidden' type="file" ref={inputRef} onChange={(e) => handleimgFileChange(e, 1)} />
                                    {
                                        !imgFile ?
                                            <label htmlFor='image-upload' className="flex flex-col justify-center items-center border-2 border-dashed border-slate-400 rounded-xl w-16 h-16 cursor-pointer text-slate-400" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 1)}>
                                                <i className="fi fi-rs-cloud-upload text-xl"></i>
                                                <p className='text-xs text-center'>Image1</p>
                                            </label> :
                                            <div className="h-16 w-16 flex flex-col justify-between items-center relative">
                                                <img src={selectedImage} alt="" className='h-full w-full border rounded-xl' />
                                                <div className="h-4 w-4 absolute -top-1 -right-1 text-xl cursor-pointer bg-white rounded-full grid content-center" onClick={(e) => handleimgFileRemove(e, 1)}><i className="fi fi-sr-circle-x relative top-1 right-1"></i></div>
                                            </div>
                                    }
                                    <input id='image-upload-2' name="productImg2" accept='image/*' className='hidden' type="file" ref={inputRef2} onChange={(e) => handleimgFileChange(e, 2)} />
                                    {
                                        !imgFile2 ?
                                            <label htmlFor='image-upload-2' className="flex flex-col justify-center items-center border-2 border-dashed border-slate-400 rounded-xl h-16 w-16 cursor-pointer text-slate-400" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 2)}>
                                                <i className="fi fi-rs-cloud-upload text-xl"></i>
                                                <p className='text-xs text-center'>Image2</p>
                                            </label> :
                                            <div className="h-16 w-16 flex flex-col justify-between items-center relative">
                                                <img src={selectedImage2} alt="" className='h-full w-full border rounded-xl' />
                                                <div className="h-4 w-4 absolute -top-1 -right-1 text-xl cursor-pointer bg-white rounded-full grid content-center" onClick={(e) => handleimgFileRemove(e, 2)}><i className="fi fi-sr-circle-x relative top-1 right-1"></i></div>
                                            </div>
                                    }
                                    <input id='image-upload-3' name="productImg3" accept='image/*' className='hidden' type="file" ref={inputRef3} onChange={(e) => handleimgFileChange(e, 3)} />
                                    {
                                        !imgFile3 ?
                                            <label htmlFor='image-upload-3' className="flex flex-col justify-center items-center border-2 border-dashed border-slate-400 rounded-xl h-16 w-16 cursor-pointer text-slate-400" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 3)}>
                                                <i className="fi fi-rs-cloud-upload text-xl"></i>
                                                <p className='text-xs text-center'>Image3</p>
                                            </label> :
                                            <div className="h-16 w-16 flex flex-col justify-between items-center relative">
                                                <img src={selectedImage3} alt="" className='h-full w-full border rounded-xl' />
                                                <p className="text-xs line-clamp-1">{imgFile3.name}</p>
                                                <div className="h-4 w-4 absolute -top-1 -right-1 text-xl cursor-pointer bg-white rounded-full grid content-center" onClick={(e) => handleimgFileRemove(e, 3)}><i className="fi fi-sr-circle-x relative top-1 right-1"></i></div>
                                            </div>
                                    }
                                    <input id='image-upload-4' name="productImg4" accept='image/*' className='hidden' type="file" ref={inputRef4} onChange={(e) => handleimgFileChange(e, 4)} />
                                    {
                                        !imgFile4 ?
                                            <label htmlFor='image-upload-4' className="flex flex-col justify-center items-center border-2 border-dashed border-slate-400 rounded-xl h-16 w-16 cursor-pointer text-slate-400" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 4)}>
                                                <i className="fi fi-rs-cloud-upload text-xl"></i>
                                                <p className='text-xs text-center'>Image4</p>
                                            </label> :
                                            <div className="h-16 w-16 flex flex-col justify-between items-center relative">
                                                <img src={selectedImage4} alt="" className='h-full w-full border rounded-xl' />
                                                <p className="text-xs line-clamp-1">{imgFile4.name}</p>
                                                <div className="h-4 w-4 absolute -top-1 -right-1 text-xl cursor-pointer bg-white rounded-full grid content-center" onClick={(e) => handleimgFileRemove(e, 4)}><i className="fi fi-sr-circle-x relative top-1 right-1"></i></div>
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="w-1/2 relative bottom-3 flex flex-col justify-center items-center">
                                <textarea className="h-36 w-full border border-[rgb(8,43,61,0.4)] rounded-2xl px-3 py-2 text-sm" placeholder="Describe the Issue here..."></textarea>
                                <button className="text-sm bg-gradient-to-r from-orange-500 to-red-500 px-5 mt-5 py-2 font-semibold rounded-full text-white" onClick={() => setShowExchangeSuccessfullPopup(true)}>Request Exchange</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
            <RequestSuccessfullPopup showSuccessfullPopup={showExchangeSuccessfullPopup} setShowSuccessfullPopup={setShowExchangeSuccessfullPopup} state="Exchange" />
        </>
    )
}

export default ProductExchange
