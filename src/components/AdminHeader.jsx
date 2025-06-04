import { logoutUser } from "@/firebase/auth";
import { logout } from "@/store/features/authSlice";
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lxsLogo from "../assets/commonIcons/Lxs Logo.png"


function AdminHeader() {
    let popupRef = useRef(null);
    let [isHovered, setIsHovered] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsHovered(false);
          }
        };
        
        if (isHovered) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isHovered]);


    let menuItems = [
        {
            name: "Profile",
            icon: ""
        },
    ]

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser().then(() => {
            dispatch(logout())
            toast.success("User Logged Out Successfully ...")
            navigate("/shop")
        })
    }

    return (
        <header className="h-[70px] w-full shadow-sm border-b flex fixed justify-between items-center z-30 bg-white">

            <div className="flex justify-start items-center w-[17%] border-r h-full shadow-sm pl-5">
                <img src={lxsLogo} alt="" className="h-12" />
                <div className="mt-2">
                <p className="text-2xl font-bold">LXS Store</p><p className="text-sm relative bottom-2 font-medium">Admin Panel</p>
                </div>
            </div>

            <div className="flex justify-end items-center w-[83%] px-12">
                <div className="flex items-center gap-8">
                    <i className="fi fi-rs-bell relative top-1 text-xl"></i>
                    <div onClick={() => setIsHovered(!isHovered)} className="flex gap-[2px] items-center cursor-pointer relative select-none">
                        <div
                            className="border rounded-full h-12 w-12 bg-lime-200 flex justify-center items-center text-xl font-semibold text-[rgb(8,41,61,0.8)]">K</div>
                        <i className="fi fi-rs-angle-small-down text-xl relative top-1"></i>
                        {isHovered && (
                            <div
                                ref={popupRef}
                                className="bg-white w-32 rounded-xl shadow-lg border border-[rgb(8,43,61,0.4)] py-2 absolute right-0 mt-1 top-12 overflow-hidden">
                                <ul className="flex flex-col">
                                    {
                                        menuItems.map((items, index) => (
                                            <li key={index} className="text-left text-lg flex gap-1 items-center hover:bg-slate-200 cursor-pointer hover:text-[rgb(8,43,61)] px-4">
                                                <img src={items.icon} alt="" className="h-3" /> {items.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                    <button onClick={handleLogout} className="h-10 w-20 text-lg rounded bg-red-500 text-white font-semibold lg:active:bg-red-600">Logout</button>
                </div>
            </div>

        </header>
    )
}

export default AdminHeader
