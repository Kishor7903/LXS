import accountIcon from "../../assets/commonIcons/Account.png"
import { useDispatch, useSelector } from "react-redux"
import HoverButton from "@/components/HoverButton";
import editIcon from "../../assets/commonIcons/Edit (Fill).png"
import editIconActive from "../../assets/commonIcons/Edit White (Fill).png"
import { useEffect, useState } from "react";
import EditUserInfoPopup from "@/components/EditUserInfoPopup";
import EditProfilePicPopup from "@/components/EditProfilePicPopup";
import { getUserInfo } from "@/firebase/auth";
import { updateUserInfo } from "@/store/features/authSlice";

function ShopSettingMyAccount() {
    let [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState(false);
    let { user } = useSelector(state => state.auth);
    let dispatch = useDispatch();

    const handleEditPersonalInfoButton = (e) => {
        e.preventDefault();

        setIsOpen(true);
    }

    const handleProfilePicEditButton = (e) => {
        e.preventDefault();

        setOpen(true);
    }

    useEffect(() => {
        getUserInfo(user.id).then((res) => {
            dispatch(updateUserInfo(res))
        })
    }, [])

    return (
        <div className="w-full h-full px-5 flex gap-5 ">
            <div className="w-1/2 flex flex-col justify-between">
                <div className="leading-[1] font-semibold h-10">Mission Control 🚀 <br />
                    <p className="text-xs font-normal">Because you are the boss of your Shopping Universe!</p>
                </div>
                <div className="space-y-3 mt-2 h-full overflow-y-scroll no-scrollbar">
                    <div className="h-20 py-2 px-5 border border-[rgb(8,43,61)] flex items-center rounded-xl mx-5 relative shadow-[0px_5px_10px_-6px_rgb(8,43,61)]">
                        <img src={user.profilePic ? user.profilePic.img_url : accountIcon} alt="" className="h-14 mr-4 rounded-full" />
                        <p className="text-2xl h-10 leading-[0.7] font-bold relative top-1">{user.name} <br /> <span className="text-base font-medium text-[rgb(240,85,120)]">User Account</span></p>
                        <HoverButton className="absolute top-2 right-2 px-3 text-sm font-medium" onClick={handleProfilePicEditButton} icon={editIcon} iconActive={editIconActive}>Edit</HoverButton>
                    </div>
                    <div className="flex flex-col gap-2 border border-[rgb(8,43,61)] rounded-xl mx-5 relative py-3 px-5 shadow-[0px_5px_10px_-6px_rgb(8,43,61)]">
                        <h6 className="font-bold">Personal Information</h6>
                        <div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-10">
                            <p className="text-[12px] leading-[1.1]">Full Name <br /> <span className="text-[15px] font-semibold">{user.name}</span></p>
                            <p className="text-[12px] leading-[1.1]">Gender <br /> <span className="text-[15px] font-semibold">{user?.gender ? user.gender : "_"}</span></p>
                            <p className="text-[12px] leading-[1.1]">Phone No. <br /> <span className="text-[15px] font-semibold">+91 {user.phone}</span></p>
                            <p className="text-[12px] leading-[1.1]">Alternate Phone No. <br /> <span className="text-[15px] font-semibold">{user?.altPhone ? `+91 ${user.altPhone}` : "_"}</span></p>
                            <p className="text-[12px] leading-[1.1]">Email <br /> <span className="text-[15px] font-semibold">{user.email}</span></p>
                            <p className="text-[12px] leading-[1.1]">Date of Birth <br /> <span className="text-[15px] font-semibold">{user.DOB}</span></p>
                            <HoverButton className="absolute top-2 right-2 px-3 text-sm font-medium" onClick={handleEditPersonalInfoButton} icon={editIcon} iconActive={editIconActive}>Edit</HoverButton>
                        </div>
                    </div>
                </div>

                {/* <div className="flex flex-col gap-2 border border-[rgb(8,43,61)] rounded-2xl mx-5 relative py-2 px-5">
                    <h6 className="font-bold">Permanent Address</h6>
                    <div className="grid grid-rows-3 grid-cols-2 gap-y-2 gap-x-10">
                        <p className="text-[12px] leading-[1.1]">House / Flat No. <br /> <span className="text-[15px] font-semibold">34 C</span></p>
                        <p className="text-[12px] leading-[1.1]">Village / Town / Street <br /> <span className="text-[15px] font-semibold">Choura Road Chas</span></p>
                        <p className="text-[12px] leading-[1.1]">Post Office <br /> <span className="text-[15px] font-semibold">Narayanpur</span></p>
                        <p className="text-[12px] leading-[1.1]">Police Station <br /> <span className="text-[15px] font-semibold">Pindrajora</span></p>
                        <p className="text-[12px] leading-[1.1]">City <br /> <span className="text-[15px] font-semibold">Bokaro</span></p>
                        <p className="text-[12px] leading-[1.1]">ZIP / Postal Code <br /> <span className="text-[15px] font-semibold">827013</span></p>
                        <p className="text-[12px] leading-[1.1]">State <br /> <span className="text-[15px] font-semibold">Jharkhand</span></p>
                        <p className="text-[12px] leading-[1.1]">Country <br /> <span className="text-[15px] font-semibold">India</span></p>
                    </div>
                </div> */}
                <EditUserInfoPopup isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
                <EditProfilePicPopup isOpen={open} setIsOpen={setOpen} user={user} />
            </div>
            <div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default ShopSettingMyAccount
