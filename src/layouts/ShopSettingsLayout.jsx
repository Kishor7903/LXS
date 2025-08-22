import Header from "@/components/Header"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import accountIcon from "../assets/commonIcons/Account.png"
import dashboardIconFill from "../assets/commonIcons/Dashboard (Fill).png"
import dashboardIconFillPink from "../assets/commonIcons/Dashboard (Fill) Pink.png"
import accountIconFillPink from "../assets/commonIcons/Account Info (Fill) Pink.png"
import accountIconFill from "../assets/commonIcons/Account Info (Fill).png"
import orderIconFillPink from "../assets/commonIcons/Orders (Fill) Pink.png"
import orderIconFill from "../assets/commonIcons/Orders (Fill).png"
import wishlistIconFillPink from "../assets/commonIcons/Favourites (Fill) Pink.png"
import wishlistIconFill from "../assets/commonIcons/Favourites (Fill).png"
import savedAddressIconFillPink from "../assets/commonIcons/Saved Address (Fill) Pink.png"
import savedAddressIconFill from "../assets/commonIcons/Saved Address (Fill).png"
import rocket from "../assets/commonIcons/Track Rocket (Fill) Green.png"
import notificationIconFillPink from "../assets/commonIcons/Notifications (Fill) Pink.png"
import notificationIconFill from "../assets/commonIcons/Notifications (Fill).png"
import accountAndPreferenceIconFillPink from "../assets/commonIcons/Account & Preference (Fill) Pink.png"
import accountAndPreferenceIconFill from "../assets/commonIcons/Account & Preference (Fill).png"
import securityAndLoginIconFillPink from "../assets/commonIcons/Security & Login (Fill) Pink.png"
import securityAndLoginIconFill from "../assets/commonIcons/Security & Login (Fill).png"
import privacyDataIconFillPink from "../assets/commonIcons/Privacy Data (Fill) Pink.png"
import privacyDataIconFill from "../assets/commonIcons/Privacy Data (Fill).png"
import contactUsIconFillPink from "../assets/commonIcons/Contact Us (Fill) Pink.png"
import contactUsIconFill from "../assets/commonIcons/Contact Us (Fill).png"
import myReviewsAndRatingIconFill from "../assets/commonIcons/Ratings & Reviews (Fill).png"
import myReviewsAndRatingIconFillPink from "../assets/commonIcons/Ratings & Reviews (Fill) Pink.png"
// import helpIcon from "../assets/commonIcons/Help (Stroke).png";
import logoutRedIcon from "../assets/commonIcons/Log Out (Fill) Pink.png";
import notificationIcon from "../assets/commonIcons/Updates (Fill).png";
import { useEffect, useState } from "react"
import { logoutUser } from "@/firebase/auth"
import { logout } from "@/store/features/authSlice"
import { useDispatch } from "react-redux"
import { useToast } from "@/components/ToastProvider"
// import { useDispatch, useSelector } from "react-redux"
// import { logoutUser } from "@/firebase/auth"
// import { toast } from "react-toastify"
// import { logout } from "@/store/features/authSlice"


function ShopSettingsLayout() {
    let location = useLocation().pathname;
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const toast = useToast();
    let [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        if (location.includes("/settings")) {
            setOpenDropdown(true)
        }
    }, [location])

    const handleDropdown = (idx) => {
        if (!openDropdown) {
            if (idx === 6) {
                setOpenDropdown(true)
            }
        }
        else {
            if (idx !== 6) {
                setOpenDropdown(false)
            }
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser().then(() => {
            dispatch(logout());
            toast("User Logout Successfully.")
            navigate("/shop")
        })
    }

    let settingItems = [
        {
            name: "Dashboard",
            slug: "/setting/dashboard",
            icon: dashboardIconFill,
            activeIcon: dashboardIconFillPink
        },
        {
            name: "Account Info",
            slug: "/setting/my-account",
            icon: accountIconFill,
            activeIcon: accountIconFillPink
        },
        {
            name: "Orders",
            slug: "/setting/my-orders",
            icon: orderIconFill,
            activeIcon: orderIconFillPink
        },
        {
            name: "Favourites",
            slug: "/setting/wishlist",
            icon: wishlistIconFill,
            activeIcon: wishlistIconFillPink
        },
        {
            name: "Saved Addresses",
            slug: "/setting/saved-addresses",
            icon: savedAddressIconFill,
            activeIcon: savedAddressIconFillPink
        },
        // {
        //     name: "Payment Options",
        //     slug: "/setting/payment-options",
        //     icon: paymentOptionIconStroke,
        //     activeIcon: paymentOptionIconFill,
        // },
        // {
        //     name: "Subscription",
        //     slug: "/setting/subscriptions",
        //     icon: subscriptionIconStroke,
        //     activeIcon: subscriptionIconFill,
        // },
        {
            name: "Ratings & Reviews",
            slug: "/setting/my-ratings-reviews",
            icon: myReviewsAndRatingIconFill,
            activeIcon: myReviewsAndRatingIconFillPink
        },
        {
            name: "Account & Preferences",
            slug: "/setting/account-preference",
            icon: accountAndPreferenceIconFill,
            activeIcon: accountAndPreferenceIconFillPink
        },
        {
            name: "Notifications",
            slug: "/setting/notification",
            icon: notificationIconFill,
            activeIcon: notificationIconFillPink
        },
        {
            name: "Security & Login",
            slug: "/setting/security-login",
            icon: securityAndLoginIconFill,
            activeIcon: securityAndLoginIconFillPink
        },
        {
            name: "Privacy Data",
            slug: "/setting/privacy-data",
            icon: privacyDataIconFill,
            activeIcon: privacyDataIconFillPink
        },
        // {
        //     name: "Settings",
        //     slug: "/setting/settings/notification",
        //     icon: settingIconStroke,
        //     activeIcon: settingIconFill,
        //     childrens: [
        //         {
        //             name: "Notifications",
        //             slug: "/setting/settings/notification"
        //         },
        //         {
        //             name: "Account & Preferences",
        //             slug: "/setting/settings/account-preference"
        //         },
        //         {
        //             name: "Security & Login",
        //             slug: "/setting/settings/security-login"
        //         },
        //         {
        //             name: "Privacy Data",
        //             slug: "/setting/settings/privacy-data"
        //         }
        //     ]
        // },
        {
            name: "Contact Us",
            slug: "/setting/contact-us",
            icon: contactUsIconFill,
            activeIcon: contactUsIconFillPink
        },
    ]

    return (
        <>
            <Header className="h-16" />
            <div className="flex w-full h-[calc(100vh-64px)]">
                <div className="w-[16%] 2xl:w-[14%] flex flex-col px-2 py-5">
                    {/* <div className="h-[13%] w-full flex items-center px-5 gap-1">
                        <div>
                            <img src={user.profilePic ? user.profilePic.img_url : accountIcon} alt="" className="h-12 rounded-full" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold relative top-[2px]">{user?.name}</h4>
                            <p className="text-[11px] relative bottom-[3px]">{user?.email}</p>
                            <p className="text-[10px] relative bottom-[5px]">+91 {user?.phone}</p>
                        </div>
                    </div> */}
                    <div className="flex flex-col items-end h-full text-sm pt-5 relative">
                        {
                            settingItems.map((item, index) => (
                                <NavLink to={item.slug} key={index} className={({ isActive }) => `h-8 w-full flex flex-col items-end font-semibold  ${isActive ? "text-[rgb(253,84,120)]" : ""}`}>
                                    <span onClick={() => handleDropdown(index)} className="flex justify-end lg:hover:bg-slate-200 w-full px-2 py-1 rounded-[8px]">{item.name} <img src={`${location.includes(item.slug) || (item.childrens && openDropdown) ? item.activeIcon : item.icon}`} alt="" className="h-5 ml-2" /></span>
                                    {/* {
                                        index === 6 && openDropdown ? (
                                            <div className="mr-5">
                                                {
                                                    item.childrens.map((i, idx) => (
                                                        <div onClick={(e) => { e.preventDefault(), navigate(i.slug) }} key={idx} className={`flex justify-end gap-1 items-center text-xs lg:hover:font-bold ${location.includes(i.slug) ? "font-bold" : "font-normal"}`}><div>{i.name}</div><i className="fi fi-br-angle-small-left relative top-[2px]"></i></div>
                                                    ))
                                                }
                                            </div>
                                        ) :
                                            null
                                    } */}
                                </NavLink>
                            ))
                        }
                        {/* <div className=" bg-white border h-8 w-10 rounded-l-full flex justify-end items-center absolute top-5 -right-7">
                            <img src={rocket} alt="" className="h-5 rotate-180" />
                        </div> */}
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <Link to="/orders/notifications" className="flex gap-2 items-center lg:hover:bg-slate-200 w-[60%]  xl:px-3 pt-1 xl:py-1 rounded-l rounded-r-[20px]">
                            <img src={notificationIcon} alt="" className="h-4 xl:h-5" /> Updates
                        </Link>
                        <button onClick={handleLogout} className="flex gap-1 items-center text-[rgb(253,84,120)] hover:underline font-medium">
                            <img src={logoutRedIcon} alt="" className="h-5" /> Logout
                        </button>
                    </div>
                </div>
                <div className="w-[84%] 2xl:w-[86%] m-5 rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border p-5 overflow-hidden"><Outlet /></div>
            </div>
        </>
    )
}

export default ShopSettingsLayout
