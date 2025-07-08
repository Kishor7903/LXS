import { useEffect, useRef, useState } from 'react';
import DialogBox from './DialogBox';
import { addCarouselImg, editCarouselImg } from '@/firebase/admin';
import { addNewCarouselImg, editCarouselImage } from '@/store/features/adminSlice';
import { toast } from 'react-toastify';
import { uploadToCloudinary } from '@/firebase/cloudinary';
import { useDispatch } from 'react-redux';

function AddCarouselmageButton({ isOpen, setIsOpen, currentEditId, setCurrentEditId }) {
    const [previews, setPreviews] = useState(null);
    const [files, setFiles] = useState(null);
    const fileInputs = useRef(null);
    let dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setPreviews(URL.createObjectURL(file));
            setFiles(file);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setPreviews(URL.createObjectURL(file));
            setFiles(file);
        }
    };

    const removeImage = () => {
        setPreviews(null);
        setFiles(null);
        if (fileInputs.current) {
            fileInputs.current.value = null;
        }
    };

    const handleAddProductButton = (e) => {
        e.preventDefault();

        setCurrentEditId(null)

        setIsOpen(true);
    };

    const handleAddImageSubmit = async () => {

        if (files) {
            let response = await uploadToCloudinary(files);

            let url = response?.url;
            let publicId = response?.public_id;

            let imageData = {
                img_url: url,
                publicId: publicId
            }
    
            addCarouselImg(imageData).then((res) => {
                dispatch(addNewCarouselImg(res))
                toast.success("New Image Added Successfully ...")
            })
        }

        setFiles(null);
        setPreviews(null);
        setIsOpen(false);
    };

    const handleCarouselImgEdit = async () => {
        if (files) {
            let response = await uploadToCloudinary(files);

            let url = response?.url;
            let publicId = response?.public_id;

            let imageData = {
                img_url: url,
                publicId: publicId,
            }
    
            editCarouselImg(currentEditId, imageData).then((res) => {
                dispatch(editCarouselImage(res));
                toast.success("Image Edited Successfully ...");
            }) 
        }
        
        setCurrentEditId(null);
        setFiles(null);
        setPreviews(null);
        setIsOpen(false);
    }

    useEffect(() => {
        if(currentEditId){
            setPreviews(currentEditId.imgUrl)
        }else{
            setPreviews(null)
        }
    })

    return (
        <div className='h-12'>
            <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-[6px] border items-end" onClick={handleAddProductButton}>+ Create New</button>

            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="w-[550px] p-6 bg-white rounded-[30px] flex flex-col" parentDivClassName="flex justify-center items-center">
                <h2 className='text-center text-xl font-semibold'>{currentEditId === null ? "Add Carousel Image" : "Edit Carousel Image"}</h2>
                <hr className='border-[rgb(8,43,61)]' />
                <div
                    className="w-full h-[200px]  rounded-2xl mt-5 flex items-center justify-center text-sm text-gray-400 cursor-pointer relative"
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={handleDragOver}
                >
                    <input
                        id='image'
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => (fileInputs.current = el)}
                        onChange={(e) => handleImageChange(e)}
                    />
                    {previews ? (
                        <>
                            <img
                                src={previews}
                                alt='Preview'
                                className="w-full h-full object-fill rounded-2xl border border-[rgb(196,185,185)]"
                            />
                            <button
                                className="absolute -top-2 -right-2 bg-black text-white text-lg rounded-full w-5 h-5 flex items-center justify-center shadow"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                }}
                            >
                                ×
                            </button>
                        </>
                    ) 

                    : 

                    (
                        <label htmlFor="image" className="h-full w-full rounded-2xl flex flex-col justify-center items-center border-[2px] border-dashed border-[rgb(196,185,185)]">
                            <i className="fi fi-rs-cloud-upload text-[70px]"></i>
                            <span className='text-xl'>Image</span>
                        </label>
                    )}
                </div>
                <div className='flex justify-between px-36 mt-5'>
                    <button onClick={() => setIsOpen(false)} className='bg-slate-800 text-white rounded h-10 w-20' >Cancel</button>
                    <button onClick={currentEditId === null ? handleAddImageSubmit : handleCarouselImgEdit} className='bg-blue-600 text-white rounded h-10 w-20' >{currentEditId === null ? "Upload" : "Apply"}</button>
                </div>
            </DialogBox>

        </div>
    )
}

export default AddCarouselmageButton
