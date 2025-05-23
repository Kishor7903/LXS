import React, { useEffect, useRef, useState } from 'react'
import DialogBox from './DialogBox'
import { uploadToCloudinary } from '@/firebase/cloudinary';
import { toast } from 'react-toastify';
import { addProduct, editProduct } from '@/firebase/admin';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '@/store/features/adminSlice';


function AddProductButtonAndPopup({isOpen, setIsOpen, productData, formData, setFormData, currentEditId, setCurrentEditId}) {
    const [previews, setPreviews] = useState([null, null, null, null, null, null]);
    const [files, setFiles] = useState([null, null, null, null, null, null]);
    const [uploadedUrls, setUploadedUrls] = useState([null, null, null, null, null, null]);
    const [publicIds, setPublicIds] = useState([null, null, null, null, null, null])
    const fileInputs = useRef([]);
    let dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

    const handleAddProductSubmit = async () => {
        const urls = [...uploadedUrls];
        const ids = [...publicIds];

        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                let response = await uploadToCloudinary(files[i]);
                urls[i] = response?.url;
                ids[i] = response?.public_id
            }
        }

        let imageData = {
            urls,
            ids
        }

        let product = addProduct({formData, imageData})
        
        dispatch(addNewProduct(product))

        setFiles([null, null, null, null, null, null]);
        setPreviews([null, null, null, null, null, null]);
        setUploadedUrls([null, null, null, null, null, null]);
        setPublicIds([null, null, null, null, null, null]);
        
        toast.success("Product Added Successfully ...")
        setIsOpen(false);
        setFormData(productData);
    };

    const handleAddProductButton = (e) => {
        e.preventDefault();

        setCurrentEditId(null)

        setFormData({
            name: "",
            price: "",
            description: "",
            category: "",
            brand: "",
            salePrice: "",
            totalStock: "",
            images: [],
            imagesId: []
        })

        setIsOpen(true);
    }

    const handleEditProductSubmit = async (e) => {
        e.preventDefault();

        const urls = [...uploadedUrls];
        const ids = [...publicIds];

        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                let response = await uploadToCloudinary(files[i]);
                urls[i] = response?.url;
                ids[i] = response?.public_id
            }
        }

        let imageData = {
            urls,
            ids
        }

        editProduct({currentEditId, formData, imageData}).then((res) => {
            if(res){
                toast.success("Product Edited Successfully ...")
                setIsOpen(false);
            }
            else{
                console.log("Product Edit Error ...");
            }
        })
    }

    useEffect(() => {
        setFiles([null, null, null, null, null, null]);
        setPreviews([null, null, null, null, null, null]);
        setUploadedUrls([null, null, null, null, null, null]);
    }, [isOpen, setIsOpen])

    return (
        <div className='h-12'>
            <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-[6px] border items-end" onClick={handleAddProductButton}>+ Create New</button>

            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[550px] p-6 bg-white rounded-[30px] flex flex-col" parentDivClassName="flex justify-center items-center">
                <h2 className='text-center text-xl font-semibold'>{currentEditId === null ? "Add Product" : "Edit Product"}</h2>
                <hr className='border-[rgb(8,43,61)]' />
                <form>
                    <div className="">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Name<span className="text-red-600">*</span></label>
                        <br />
                        <input type="text" name='name' value={formData.name} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                    </div>
                    <div className="space-x-5 flex">
                        <div className="w-1/2">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Category<span className="text-red-600">*</span></label>
                            <br />
                            <select name='category' value={formData.category} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                <option value="" className="hidden"></option>
                                <option value="Mens">Mens</option>
                                <option value="Womens">Womens</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Brand<span className="text-red-600">*</span></label>
                            <br />
                            <select name='brand' value={formData.brand} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                <option value="" className="hidden"></option>
                                <option value="LXS">LXS</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex space-x-5">
                        <div className="w-1/2">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> M.R.P<span className="text-red-600">*</span></label>
                            <br />
                            <input type="number" name='price' value={formData.price} onChange={handleChange} onWheel={(e) => e.target.blur()} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>
                        <div className="w-1/2">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Selling Price<span className="text-red-600">*</span></label>
                            <br />
                            <input type="number" name='salePrice' value={formData.salePrice} onChange={handleChange} onWheel={(e) => e.target.blur()} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>
                    </div>

                    <div className="">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Total Stock<span className="text-red-600">*</span></label>
                        <br />
                        <input type="number" name='totalStock' value={formData.totalStock} onChange={handleChange} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                    </div>
                    <div className="">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Description<span className="text-red-600">*</span></label>
                        <br />
                        <textarea name='description' value={formData.description} onChange={handleChange} className='border-[rgb(196,185,185)] border px-3 rounded-xl h-16 w-full outline-none py-[6px]' autoComplete='off'></textarea>
                    </div>

                    <div className="flex gap-4 mt-4">
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
                                            className="absolute -top-2 -right-2 bg-black text-white text-lg rounded-full w-5 h-5 flex items-center justify-center shadow"
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
                                        <i className="fi fi-rs-cloud-upload text-2xl"></i>
                                        <span>Image{index + 1}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </form>
                <div className='flex justify-between px-36 mt-5'>
                    <button onClick={() => setIsOpen(false)} className='bg-slate-800 text-white rounded h-10 w-20' >Cancel</button>
                    <button onClick={currentEditId === null ? handleAddProductSubmit : handleEditProductSubmit} className='bg-blue-600 text-white rounded h-10 w-20' >{currentEditId === null ? "Upload" : "Edit"}</button>
                </div>
            </DialogBox>

        </div>
    )
}

export default AddProductButtonAndPopup
