import Header from "@/components/Header"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import accountIcon from "../assets/commonIcons/Account.png"
import dashboardIconStroke from "../assets/commonIcons/Dash Board (Stroke).png"
import dashboardIconFill from "../assets/commonIcons/Dash Board (Fill).png"
import accountIconFill from "../assets/commonIcons/Account Management (Fill).png"
import accountIconStroke from "../assets/commonIcons/Account Management (Stroke).png"
import orderIconFill from "../assets/commonIcons/Orders 2 (Fill).png"
import orderIconStroke from "../assets/commonIcons/Orders 2 (Stroke) (1).png"
import wishlistIconFill from "../assets/commonIcons/Wishlist (Fill).png"
import wishlistIconStroke from "../assets/commonIcons/Wishlist (Stroke).png"
import savedAddressIconFill from "../assets/commonIcons/Home (Fill).png"
import savedAddressIconStroke from "../assets/commonIcons/Home (Stroke).png"
import paymentOptionIconFill from "../assets/commonIcons/Payment (Fill).png"
import paymentOptionIconStroke from "../assets/commonIcons/Payment (Stroke).png"
// import subscriptionIconFill from "../assets/commonIcons/Gift Cards (Fill).png"
// import subscriptionIconStroke from "../assets/commonIcons/Gift Cards (Stroke).png"
import settingIconFill from "../assets/commonIcons/Setting (Fill).png"
import settingIconStroke from "../assets/commonIcons/Setting (Stroke).png"
import contactUsIconFill from "../assets/commonIcons/Call (Fill).png"
import contactUsIconStroke from "../assets/commonIcons/Call (Stroke).png"
import myReviewsAndRatingIconStroke from "../assets/commonIcons/Ratings & Reviews (Stroke).png"
import myReviewsAndRatingIconFill from "../assets/commonIcons/Ratings & Reviews (Fill).png"
// import helpIcon from "../assets/commonIcons/Help (Stroke).png";
import logoutRedIcon from "../assets/commonIcons/Log Out (Fill).png";
import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { logoutUser } from "@/firebase/auth"
// import { toast } from "react-toastify"
// import { logout } from "@/store/features/authSlice"


function ShopSettingsLayout() {
    let location = useLocation().pathname;
    let navigate = useNavigate();
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

    // const handleLogout = (e) => {
    //     e.preventDefault();

    //     logoutUser().then(() => {
    //         dispatch(logout());
    //         toast.success("User Logged Out Successfully ...")
    //         navigate("/shop")
    //     })
    // }

    let settingItems = [
        {
            name: "Dashboard",
            slug: "/setting/dashboard",
            icon: dashboardIconStroke,
            activeIcon: dashboardIconFill,
        },
        {
            name: "Account Info",
            slug: "/setting/my-account",
            icon: accountIconStroke,
            activeIcon: accountIconFill,
        },
        {
            name: "Orders",
            slug: "/setting/my-orders",
            icon: orderIconStroke,
            activeIcon: orderIconFill,
        },
        {
            name: "Wishlist",
            slug: "/setting/wishlist",
            icon: wishlistIconStroke,
            activeIcon: wishlistIconFill,
        },
        {
            name: "Saved Addresses",
            slug: "/setting/saved-addresses",
            icon: savedAddressIconStroke,
            activeIcon: savedAddressIconFill,
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
            icon: myReviewsAndRatingIconStroke,
            activeIcon: myReviewsAndRatingIconFill
        },
        {
            name: "Settings",
            slug: "/setting/settings/notification",
            icon: settingIconStroke,
            activeIcon: settingIconFill,
            childrens: [
                {
                    name: "Notifications & Communication",
                    slug: "/setting/settings/notification"
                },
                {
                    name: "Account & Preferences",
                    slug: "/setting/settings/account-preference"
                },
                {
                    name: "Security & Login",
                    slug: "/setting/settings/security-login"
                },
                {
                    name: "Privacy Data",
                    slug: "/setting/settings/privacy-data"
                },
            ]
        },
        {
            name: "Contact Us",
            slug: "/setting/contact-us",
            icon: contactUsIconStroke,
            activeIcon: contactUsIconFill,
        },
    ]

    return (
        <>
            <Header className="h-16" />
            <div className="flex w-full h-[91%]">
                <div className="xl:w-[20%] 2xl:w-[15%] flex flex-col px-2 py-5">
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
                    <div className="flex flex-col items-end h-full text-sm pt-5">
                        {
                            settingItems.map((item, index) => (
                                <NavLink to={item.slug} key={index} className={({ isActive }) => `${item.childrens && openDropdown ? "h-[105px] justify-start font-bold text-base" : "h-8 justify-center"} w-full flex flex-col items-end  ${isActive ? "font-bold text-base" : ""}`}>
                                    <span onClick={() => handleDropdown(index)} className="flex justify-end lg:hover:bg-slate-200 w-5/6 px-2 py-1 rounded-l-[20px] rounded-r">{item.name} <img src={`${location.includes(item.slug) || (item.childrens && openDropdown) ? item.activeIcon : item.icon}`} alt="" className="h-5 ml-2" /></span>
                                    {
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
                                    }
                                </NavLink>
                            ))
                        }
                    </div>
                    {/* <div className="flex justify-end items-center w-full cursor-pointer h-[12%]">
                        <Link onClick={handleLogout} className="flex gap-1 items-center text-[rgb(240,85,120)] hover:underline">
                            <img src={logoutRedIcon} alt="" className="h-5" /> Logout
                        </Link>
                    </div> */}
                </div>
                <div className="w-[81%] m-5 rounded-xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border p-5 overflow-hidden"><Outlet /></div>
            </div>
        </>
    )
}

export default ShopSettingsLayout
