import React, { useRef, useState } from 'react'
import DialogBox from './DialogBox'
import { useDispatch } from 'react-redux';
import { uploadToCloudinary } from '@/firebase/cloudinary';
import { editUserDetails } from '@/firebase/auth';
import { toast } from 'react-toastify';
import { updateUserInfo } from '@/store/features/authSlice';

function EditProfilePicPopup({isOpen, setIsOpen, user}) {
    let [formData, setFormData] = useState(user);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files) {
            let response = await uploadToCloudinary(files);

            let url = response?.url;
            let publicId = response?.public_id;

            let imageData = {
                img_url: url,
                publicId: publicId
            }

            setFormData({
                ...formData,
                profilePic: imageData
            })
    
            editUserDetails(formData).then(() => {
                dispatch(updateUserInfo(formData));
                toast.success("Profile Picture Edited...")
                setIsOpen(false);
                setPreviews(null);
                setFiles(null);
                if (fileInputs.current) {
                    fileInputs.current.value = null;
                }
            })
        } else{
            toast.error("Select Image First...")
        }
    }

    return (
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="py-6 px-10 bg-white rounded-xl flex flex-col"
            parentDivClassName="flex justify-center items-center"
        >
            <h2 className="text-center text-xl font-semibold flex gap-1 justify-center items-center">
                Edit User Profile Picture
            </h2>
            <form autoComplete="off" className='flex flex-col items-center'>
                <div
                    className="h-80 w-80 rounded-2xl mt-5 flex items-center justify-center text-sm text-gray-400 cursor-pointer relative"
                    onDrop={handleDrop}
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
                                <span className='text-xl'>Drag or Click to Upload</span>
                            </label>
                        )}
                </div>
                <div className="flex justify-end gap-6 mt-5">
                <button
                    className="border-2 font-semibold border-[rgb(8,43,61)] h-10 w-28 rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white active:scale-[0.95]"
                    onClick={(e) => {
                        e.preventDefault(),
                        setIsOpen(false),
                        removeImage()
                    }}
                >
                    Cancel
                </button>
                <button
                    className="h-10 w-28 rounded-full font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)] active:scale-[0.95]"
                    onClick={handleSubmit}
                >
                    Apply
                </button>
            </div>
            </form>
        </DialogBox>
    )
}

export default EditProfilePicPopup
