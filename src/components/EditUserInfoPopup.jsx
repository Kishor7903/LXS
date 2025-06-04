import React, { useState } from "react";
import DialogBox from "./DialogBox";
import { toast } from "react-toastify";
import { editUserDetails } from "@/firebase/auth";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/features/authSlice";

function EditUserInfoPopup({ isOpen, setIsOpen, user }) {
    let [formData, setFormData] = useState(user);
    let dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleMobileNoChange = (e) => {
        e.preventDefault();

        if(e.target.value.length <= 10){
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleCancelButton = (e) => {
        e.preventDefault();

        setIsOpen(false);
        setFormData(userData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.name || !formData.gender  || !formData.DOB ){
            toast.error("Required All Fields!!")
            return
        }
        
        if(formData.altPhone){
            if(formData.altPhone.length > 10 || formData.altPhone.length < 10){
                toast.error("Alternate Phone Number is Invalid ...");
                return
            }
        }

        editUserDetails(formData).then(() => {
            dispatch(updateUserInfo(formData));
            setFormData(formData);
            setIsOpen(false);
            toast.success("User Updated Successfully...")
        })
    }

    return (
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="w-[550px] p-6 bg-white rounded-xl flex flex-col"
            parentDivClassName="flex justify-center items-center"
        >
            <h2 className="text-center text-xl font-semibold flex gap-1 justify-center items-center">
                Edit User Info
            </h2>
            <form autoComplete="off">
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">
                        {" "}
                        Name<span className="text-red-600">*</span>
                    </label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">
                        {" "}
                        Phone No.<span className="text-red-600">*</span>
                    </label>
                    <br />
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleMobileNoChange}
                        className="border-[rgb(196,185,185)] bg-white border px-3 rounded-xl h-10 w-full outline-none text-[rgb(8,43,61,0.5)]"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium pr-1">
                        {" "}
                        Alternate Ph. No.
                    </label>
                    <br />
                    <input
                        type="number"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleMobileNoChange}
                        className="border-[rgb(196,185,185)] bg-white border px-3 rounded-xl h-10 w-full outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className="">
                    <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">
                        {" "}
                        Email<span className="text-red-600">*</span>
                    </label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-[rgb(196,185,185)] bg-white border px-3 rounded-xl h-10 w-full outline-none text-[rgb(8,43,61,0.5)]"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="flex space-x-5">
                    <div className="w-1/2">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">
                            {" "}
                            Gender<span className="text-red-600">*</span>
                        </label>
                        <br />
                        <select
                            value={formData.gender}
                            onChange={handleChange}
                            name="gender"
                            className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none"
                        >
                            <option value="" disabled defaultChecked>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="relative top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">
                            {" "}
                            DOB<span className="text-red-600">*</span>
                        </label>
                        <br />
                        <input
                            type="date"
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleChange}
                            onWheel={(e) => e.target.blur()}
                            className="border-[rgb(196,185,185)] border px-3 rounded-xl h-10 w-full outline-none"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </form>
            <div className="flex justify-end gap-6 mt-5">
                <button
                    className="border-2 font-semibold border-[rgb(8,43,61)] h-10 w-28 rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"
                    onClick={handleCancelButton}
                >
                    Cancel
                </button>
                <button
                    className="h-10 w-28 rounded-full font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]"
                    onClick={handleSubmit}
                >
                    Apply
                </button>
            </div>
        </DialogBox>
    );
}

export default EditUserInfoPopup;
