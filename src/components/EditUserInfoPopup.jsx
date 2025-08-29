import React, { useEffect, useState } from "react";
import DialogBox from "./DialogBox";
import { editUserDetails } from "@/firebase/auth";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/features/authSlice";
import flagIcon from "../assets/commonIcons/Indian Flag (Fill).png"
import { useToast } from "./ToastProvider";

function EditUserInfoPopup({ isOpen, setIsOpen, user }) {
    let [formData, setFormData] = useState(user);
    let [isEdited, setIsEdited] = useState(true);
    let dispatch = useDispatch();
    const toast = useToast();

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleMobileNoChange = (e) => {
        e.preventDefault();

        if (e.target.value.length <= 10) {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleCancelButton = (e) => {
        e.preventDefault();

        setIsOpen(false);
        setFormData(user);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.gender || !formData.DOB || !formData.email) {
            toast("Required All Fields!!")
            return
        }

        if (formData.altPhone) {
            if (formData.altPhone.length > 10 || formData.altPhone.length < 10) {
                toast("Alternate Phone Number is Invalid ...");
                return
            }
        }

        editUserDetails(formData).then(() => {
            dispatch(updateUserInfo(formData));
            setFormData(formData);
            setIsOpen(false);
            toast("User Updated Successfully...")
        })
    }

    useEffect(() => {
        if (user.name !== formData.name || user.email !== formData.email || user.DOB !== formData.DOB || user.altPhone !== formData.altPhone || user.gender !== formData.gender) {
            setIsEdited(true)
        } else {
            setIsEdited(false);
        }
    }, [formData, setFormData])

    return (
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="w-[550px] p-6 bg-white rounded-3xl flex flex-col items-center"
            parentDivClassName="flex justify-center items-center"
        >
            <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-80">
            Edit User Info !
            </h2>
            <form autoComplete="off" className="w-full">
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
                <div className="relative">
                    <label className="relative top-2 left-3 pl-1 pr-5 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium">
                        {" "}
                        Phone No.<span className="text-red-600">* </span> <img src={flagIcon} alt="" className="h-2 absolute top-1 right-0 pr-1" />
                    </label>
                    <br />
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleMobileNoChange}
                        className="border-[rgb(196,185,185)] bg-white border pr-3 pl-12 rounded-xl h-10 w-full outline-none text-[rgb(8,43,61,0.5)]"
                        autoComplete="off"
                        disabled
                    />
                    <p className="font-medium absolute top-[32px] opacity-50 left-[8px]">+91</p>
                    <hr className="border w-7 absolute left-[28px] opacity-30 top-[43px] rotate-90 border-[rgb(8,43,61)]" />
                </div>
                <div className="relative">
                    <label className="relative gap-2 top-2 left-3 pl-1 bg-white text-[rgb(8,43,61,0.7)] text-xs font-medium pr-5">
                        {" "}
                        Alternate Ph. No. <img src={flagIcon} alt="" className="h-2 absolute top-1 right-0 pr-1" />
                    </label>
                    <br />
                    <input
                        type="number"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleMobileNoChange}
                        className="border-[rgb(196,185,185)] bg-white border pr-3 pl-12 rounded-xl h-10 w-full outline-none"
                        autoComplete="off"
                    />
                    <p className="font-medium absolute top-[32px] left-[8px]">+91</p>
                    <hr className="border w-7 absolute left-[28px] opacity-30 top-[43px] rotate-90 border-[rgb(8,43,61)]" />
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
                        className="border-[rgb(196,185,185)] bg-white border px-3 rounded-xl h-10 w-full outline-none"
                        autoComplete="off"
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
            <div className="flex justify-center gap-6 mt-5">
                <button
                    className="border-2 font-semibold border-[rgb(8,43,61)] h-10 w-28 rounded-xl lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white active:scale-[0.95]"
                    onClick={handleCancelButton}
                >
                    Cancel
                </button>
                <button
                    className={`h-10 w-28 rounded-xl font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-white ${!isEdited ? "select-none cursor-not-allowed opacity-40" : "cursor-pointer lg:hover:scale-[1.1] duration-200 lg:active:scale-[0.95]"}`}
                    onClick={isEdited ? handleSubmit : null}
                    disabled={isEdited === false}
                >
                    Apply
                </button>
            </div>
        </DialogBox>
    );
}

export default EditUserInfoPopup;
