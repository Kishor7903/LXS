import { useRef, useState } from 'react';
import DialogBox from './DialogBox';
import { uploadToCloudinary } from '@/firebase/cloudinary';
import { addEventGalleryImg } from '@/firebase/admin';
import { useDispatch } from 'react-redux';
import { addNewEventGalleryImg } from '@/store/features/adminSlice';
import { useToast } from './ToastProvider';

function AddEventGalleryButton({ isOpen, setIsOpen }) {
    const [previews, setPreviews] = useState(null);
    const [files, setFiles] = useState(null);
    const fileInputs = useRef(null);
    let dispatch = useDispatch();
    const toast = useToast();

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

        setIsOpen(true);
    }

    const handleAddImageSubmit = async (e) => {
        e.preventDefault();

        if (files) {
            let response = await uploadToCloudinary(files);

            let url = response?.url;
            let publicId = response?.public_id;

            let imageData = {
                img_url: url,
                publicId: publicId
            }
    
            addEventGalleryImg(imageData).then((res) => {
                dispatch(addNewEventGalleryImg(res))
                toast("New Image Added Successfully ...")
            })
        }

        setFiles(null);
        setPreviews(null);
        setIsOpen(false);
    }


    return (
        <div className='h-12'>
            <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-[6px] border items-end" onClick={handleAddProductButton}>+ Create New</button>

            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="p-6 bg-white rounded-[30px] flex flex-col" parentDivClassName="flex justify-center items-center">
                <h2 className='text-center text-xl font-semibold'>Add Event Image</h2>
                <hr className='border-[rgb(8,43,61)]' />
                <div
                    className="w-[270px] h-[270px] rounded-2xl mt-5 flex items-center justify-center text-sm text-gray-400 cursor-pointer relative"
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
                <div className='flex justify-center gap-10 mt-5'>
                    <button onClick={() => {removeImage(), setIsOpen(false)}} className='bg-slate-800 text-white rounded h-10 w-20' >Cancel</button>
                    <button onClick={handleAddImageSubmit} className='bg-blue-600 text-white rounded h-10 w-20' >Upload</button>
                </div>
            </DialogBox>

        </div>
    )
}

export default AddEventGalleryButton
