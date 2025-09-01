import React, { useEffect, useRef, useState } from 'react'
import DialogBox from './DialogBox'
import { useDispatch } from 'react-redux';
import { editUserDetails } from '@/firebase/auth';
import { updateUserInfo } from '@/store/features/authSlice';
import { useToast } from './ToastProvider';
import { deleteImage, uploadImage } from '@/firebase/admin';

function EditProfilePicPopup({ isOpen, setIsOpen, user }) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files) {
            if (files.size > (1024 * 1024)) {
                toast("Image size should not exceeds 1MB.")
                return
            }
            uploadImage(files, `user/${user.id}`).then((res) => {
                editUserDetails({ ...user, profilePic: res }).then(() => {
                    deleteImage(user.profilePic).then(() => {
                        dispatch(updateUserInfo({ ...user, profilePic: res }));
                        toast("Profile Picture Edited...")
                        setIsOpen(false);
                        setPreviews(null);
                        setFiles(null);
                        if (fileInputs.current) {
                            fileInputs.current.value = null;
                        }
                    })
                })
            })
        } else if (!files && previews) {
            toast("Select New Image First...")
        } else {
            toast("Select Image First...")
        }
    }

    useEffect(() => {
        if (user.profilePic) {
            setPreviews(user.profilePic);
        }
    }, [isOpen])

    return (
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="py-6 px-10 bg-white rounded-3xl flex flex-col items-center"
            parentDivClassName="flex justify-center items-center"
        >
            <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-96">
                Edit Picture !
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
                                className="absolute -top-2 -right-2 bg-[rgb(8,43,61)] text-white text-lg rounded-full w-5 h-5 flex items-center justify-center shadow"
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
                            <label htmlFor="image" className="h-full w-full cursor-pointer rounded-2xl flex flex-col justify-center items-center border-[2px] border-dashed border-[rgb(8,43,61)]">
                                <i className="fi fi-sr-camera-viewfinder text-[rgb(8,43,61)] text-[120px]"></i>
                            </label>
                        )}
                </div>
                <div className="flex gap-6 mt-5 w-full">
                    <button
                        className="border-2 font-semibold border-[rgb(8,43,61)] h-12 w-60 rounded-xl lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white active:scale-[0.95]"
                        onClick={(e) => {
                            e.preventDefault(),
                                setIsOpen(false),
                                removeImage()
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="h-12 w-60 rounded-xl font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-white lg:hover:scale-[1.1] duration-200 lg:active:scale-[0.95]"
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
