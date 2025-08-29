import React, { useEffect, useRef, useState } from 'react'
import DialogBox from './DialogBox'
import { addProduct, editProduct, uploadImage } from '@/firebase/admin';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, updateProduct } from '@/store/features/adminSlice';
import { useToast } from './ToastProvider';

let category = ['Select', 'Mens', 'Womens', 'Kids'];
let subCategory = ['Select', 'T-Shirts', 'Shirts', 'Jeans', 'Sweatshirts', 'Hoddies', 'Shoes', 'Watches', 'Shorts', 'Joggers'];
let brand = ['Select', 'LXS Originals', 'HRX', 'Nike', 'Roadster', 'Peter England', 'Fastrack', 'Allen Solley', 'Addidas'];
let lxsCertified = ['Select', 'Yes', 'No'];
let codAvailability = ['Select', 'Yes', 'No'];
let returnAvailability = ['Select', 'No', '1 Days', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days'];
let sizeFit = ['Select', 'Slim Fit', 'Regular Fit', 'Oversized Fit'];
let color = ['Select', 'Black', 'White', 'Jet Black', 'Maroon', 'Bright Mint', 'Cedar Brown', 'Celestial Sand', 'Lavender Mist', 'Desert Gold', 'Light Olive',];
let material = ['Select', '100% Cotton', 'Polyster'];
let washCare = ['Select', 'Hand Wash', 'Machine Wash', 'Do not Bleach', 'Do not Iron on Prints', 'Iron Inside Out', 'Wash at Max Tempertaure 30°C'];
let sleevLength = ['Select', 'Sleevless', 'Half Length', 'Elbow Length', '3/4 Length', 'Full Length'];
let neck = ['Select', 'V-Neck', 'Round Neck', 'Polo Neck', 'Hooded Neck'];
let occasion = ['Select', 'Casual Wear', 'Street Wear', 'Ethnic/Party Wear', 'Work/Office Wear', 'Gym/Active Wear', 'Travle/Vacation Wear', 'Date/Outing Wear', 'Festival/Cultural Wear', 'Outdoor/Trekking Wear'];
let modelWearingSize = ["Select", "XS", "S", "M", "L", "XL", "XXL"];


function AddProductButtonAndPopup({ isOpen, setIsOpen, productData, formData, setFormData, currentEditId, setCurrentEditId }) {
    const [previews, setPreviews] = useState([null, null, null, null, null, null]);
    const [files, setFiles] = useState([null, null, null, null, null, null]);
    const [uploadedUrls, setUploadedUrls] = useState([null, null, null, null, null, null]);
    const fileInputs = useRef([]);
    let dispatch = useDispatch();
    const toast = useToast();
    let { products } = useSelector(state => state.admin);

    const handleChange = (field, value) => {
        const keys = field.split(".");
      
        if (keys.length === 1) {
          setFormData(prev => ({
            ...prev,
            [keys[0]]: value,
          }));
        } else {
          setFormData(prev => {
            let updated = { ...prev };
            let nested = updated;
      
            for (let i = 0; i < keys.length - 1; i++) {
              nested[keys[i]] = { ...nested[keys[i]] };
              nested = nested[keys[i]];
            }
      
            nested[keys[keys.length - 1]] = value;
      
            return updated;
          });
        }
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

        if(formData.name === "" || formData.category === "Select" || formData.subCategory === "Select" || formData.brand === "Select" || formData.isLxsCertified === "Select" || formData.price === "" || formData.salePrice === "" || formData.codAvailability === "Select" || formData.returnAvailability === "Select" || formData.description.text === "" || formData.description.sizeFit === "Select" || formData.description.color === "Select" || formData.description.material === "Select" || formData.description.washCare === "Select" || formData.description.sleevLength === "Select" || formData.description.neck === "Select" || formData.description.occasion === "Select" || formData.description.modelHeight === "" ||formData.description.modelWearingSize === "Select" || files.length === 0){
            toast("Requires all the fields!!");
            return
        }

        let prefix = "LXS"
        
        let cate = formData.category.split("")[0];
        let subC = ""
        if(formData.subCategory === "T-Shirts"){
            subC = "TS"
        }
        else if(formData.subCategory === "Shirts"){
            subC = "SH"
        }
        else if(formData.subCategory === "Jeans"){
            subC = "JE"
        }
        else if(formData.subCategory === "Sweatshirts"){
            subC = "SW"
        }
        else if(formData.subCategory === "Hoodies"){
            subC = "HO"
        }
        else if(formData.subCategory === "Shoes"){
            subC = "SE"
        }
        else if(formData.subCategory === "Watches"){
            subC = "WA"
        }
        else if(formData.subCategory === "Shorts"){
            subC = "SS"
        }
        else if(formData.subCategory === "Joggers"){
            subC = "JO"
        }

        let uniqueDigit = ""
        if(products.length+1 < 10){
            uniqueDigit = "0000" + `${products.length+1}`;
        }
        else if(products.length+1 < 100){
            uniqueDigit = "000" + `${products.length+1}`;
        }
        else if(products.length+1 < 1000){
            uniqueDigit = "00" + `${products.length+1}`;
        }
        else if(products.length+1 < 10000){
            uniqueDigit = "0" + `${products.length+1}`;
        }
        else{
            uniqueDigit = `${products.length+1}`;
        }
            
        addProduct({ ...formData, SKU: `${prefix}-${cate}-${subC}-${uniqueDigit}` }).then((res)=>{
            let images = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    let response = uploadImage(files[i], `products/${res.id}`)
                    images.push(response);
                }
            }

            editProduct({ images: images }).then((res) => {
                dispatch(addNewProduct({...res, images: images}));
            })
        })

        setFiles([null, null, null, null, null, null]);
        setPreviews([null, null, null, null, null, null]);
        setUploadedUrls([null, null, null, null, null, null]);

        toast("Product Added Successfully ...")
        setIsOpen(false);
        setFormData(productData);
    };

    const handleAddProductButton = (e) => {
        e.preventDefault();

        setCurrentEditId(null)

        setFormData(productData)

        setIsOpen(true);
    }

    const handleEditProductSubmit = async (e) => {
        e.preventDefault();

        if(formData.name === "" || formData.category === "Select" || formData.subCategory === "Select" || formData.brand === "Select" || formData.isLxsCertified === "Select" || formData.price === "" || formData.salePrice === "" || formData.codAvailability === "Select" || formData.returnAvailability === "Select" || formData.description.text === "" || formData.description.sizeFit === "Select" || formData.description.color === "Select" || formData.description.material === "Select" || formData.description.washCare === "Select" || formData.description.sleevLength === "Select" || formData.description.neck === "Select" || formData.description.occasion === "Select" || formData.description.modelHeight === "" ||formData.description.modelWearingSize === "Select" || files.length === 0){
            toast("Requires all the fields!!");
            return
        }

        const urls = [...uploadedUrls];

        for (let i = 0; i < files.length; i++) {
            if(formData.images[i] && previews[i] && files[i] === null){
                urls[i] = formData.images[i];
            }
            else if(formData.images[i] && previews[i] === null && files[i] === null){
                urls[i] = null;
            }
            else if (formData.images[i] && files[i]) {
                await uploadImage(files[i], `products/${currentEditId}`).then((res) => {
                    urls[i] = res;
                })
            }
        }

        editProduct(currentEditId, {...formData, images: urls}).then(() => {
            dispatch(updateProduct({id: currentEditId, ...formData, images: urls}))
            toast("Product Edited Successfully ...")
            setIsOpen(false);
        })
    }

    useEffect(() => {
        setUploadedUrls([null, null, null, null, null, null]);
        setFiles([null, null, null, null, null, null]);
        if(currentEditId){
            setPreviews(formData.images)
        }else{
            setPreviews([null, null, null, null, null, null]);
        }
    }, [isOpen, setIsOpen])

    return (
        <div className='h-12'>
            <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-[6px] border items-end" onClick={handleAddProductButton}>+ Create New</button>

            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[80vw] p-6 bg-white rounded-[30px] flex flex-col" parentDivClassName="flex justify-center items-center">
                <h2 className='text-center text-2xl font-semibold'>{currentEditId === null ? "Add Product" : "Edit Product"}</h2>
                <hr className='border-[rgb(8,43,61)]' />
                <form className='flex gap-10 py-2'>
                    <div className="w-1/2">
                        <div className="">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">Product Name<span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" name='name' value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                        </div>
                        <div className="space-x-5 flex">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Category<span className="text-red-600">*</span></label>
                                <br />
                                <select name='category' value={formData.category} onChange={(e) => handleChange("category", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        category.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Sub Category<span className="text-red-600">*</span></label>
                                <br />
                                <select name='subCategory' value={formData.subCategory} onChange={(e) => handleChange("subCategory", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        subCategory.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="space-x-5 flex">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Brand<span className="text-red-600">*</span></label>
                                <br />
                                <select name='brand' value={formData.brand} onChange={(e) => handleChange("brand", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        brand.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> LXS Certified<span className="text-red-600">*</span></label>
                                <br />
                                <select name='isLxsCertified' value={formData.isLxsCertified} onChange={(e) => handleChange("isLxsCertified", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        lxsCertified.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-5">
                            <div className="w-1/2 relative">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> M.R.P<span className="text-red-600">*</span></label>
                                <br />
                                <input type="number" name='price' value={formData.price} onChange={(e) => handleChange("price", e.target.value)} onWheel={(e) => e.target.blur()} className="border-[rgb(196,185,185)] border pr-3 pl-10 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                                <p className="font-medium absolute top-[30px] left-3 text-lg opacity-50">₹</p>
                                <hr className="border w-7 absolute left-5 opacity-30 top-[44px] rotate-90 border-[rgb(8,43,61)]" />
                            </div>
                            <div className="w-1/2 relative">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Selling Price<span className="text-red-600">*</span></label>
                                <br />
                                <input type="number" name='salePrice' value={formData.salePrice} onChange={(e) => handleChange("salePrice", e.target.value)} onWheel={(e) => e.target.blur()} className="border-[rgb(196,185,185)] border pr-3 pl-10 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                                <p className="font-medium absolute top-[30px] left-3 text-lg opacity-50">₹</p>
                                <hr className="border w-7 absolute left-5 opacity-30 top-[44px] rotate-90 border-[rgb(8,43,61)]" />
                            </div>
                        </div>

                        <div className="space-x-5 flex">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> COD Availability<span className="text-red-600">*</span></label>
                                <br />
                                <select name='codAvailability' value={formData.codAvailability} onChange={(e) => handleChange("codAvailability", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        codAvailability.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Return Availability<span className="text-red-600">*</span></label>
                                <br />
                                <select name='returnAvailability' value={formData.returnAvailability} onChange={(e) => handleChange("returnAvailability", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        returnAvailability.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
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
                    <div className="w-1/2">
                        <div className="">
                            <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Description<span className="text-red-600">*</span></label>
                            <br />
                            <textarea name='description' value={formData.description.text} onChange={(e) => handleChange("description.text", e.target.value)} className='border-[rgb(196,185,185)] border px-3 h-[180px] rounded-xl w-full outline-none py-[6px]' autoComplete='off'></textarea>
                        </div>
                        <div className="space-x-5 flex">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Size & Fit<span className="text-red-600">*</span></label>
                                <br />
                                <select name='codAvailability' value={formData.description.sizeFit} onChange={(e) => handleChange("description.sizeFit", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        sizeFit.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Colour<span className="text-red-600">*</span></label>
                                <br />
                                <select name='returnAvailability' value={formData.description.color} onChange={(e) => handleChange("description.color", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        color.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Material<span className="text-red-600">*</span></label>
                                <br />
                                <select name='returnAvailability' value={formData.description.material} onChange={(e) => handleChange("description.material", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        material.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="space-x-5 flex">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Wash Care<span className="text-red-600">*</span></label>
                                <br />
                                <select name='codAvailability' value={formData.description.washCare} onChange={(e) => handleChange("description.washCare", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        washCare.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Sleeve Length<span className="text-red-600">*</span></label>
                                <br />
                                <select name='returnAvailability' value={formData.description.sleeveLength} onChange={(e) => handleChange("description.sleeveLength", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        sleevLength.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Neck<span className="text-red-600">*</span></label>
                                <br />
                                <select name='returnAvailability' value={formData.description.neck} onChange={(e) => handleChange("description.neck", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        neck.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="space-x-5 flex">
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Occasion<span className="text-red-600">*</span></label>
                                <br />
                                <select name='codAvailability' value={formData.description.occasion} onChange={(e) => handleChange("description.occasion", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        occasion.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Model Height<span className="text-red-600">*</span></label>
                                <br />
                                <input type="text" name='modalHeight' value={formData.description.modalHeight} onChange={(e) => handleChange("description.modalHeight", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none" autoComplete='off' />
                            </div>
                            <div className="w-1/2">
                                <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium"> Model Wearing Size<span className="text-red-600">*</span></label>
                                <br />
                                <select name='returnAvailability' value={formData.description.modalWearingSize} onChange={(e) => handleChange("description.modalWearingSize", e.target.value)} className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none">
                                    {
                                        modelWearingSize.map((item, idx) => (
                                            <option key={idx} value={item} disabled={idx === 0}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='flex justify-center gap-10 mt-7'>
                    <button onClick={() => setIsOpen(false)} className='bg-slate-800 text-white rounded h-12 px-10' >Cancel</button>
                    <button onClick={currentEditId === null ? handleAddProductSubmit : handleEditProductSubmit} className='bg-blue-600 text-white rounded h-12 px-10' >{currentEditId === null ? "Upload" : "Edit"}</button>
                </div>
            </DialogBox>

        </div>
    )
}

export default AddProductButtonAndPopup
