import AdminHeader from "@/components/AdminHeader";
import AdminSideBar from "@/components/AdminSideBar";
import { logoutUser } from "@/firebase/auth";
import { logout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoutRedIcon from "../assets/commonIcons/Log Out (Fill) Pink.png";
import dashboardIconFill from "../assets/Admin Panel/Dashboard (Fill).png"
import dashboardIconPink from "../assets/Admin Panel/Dashboard (Fill) Pink.png"
import ordersIconFill from "../assets/Admin Panel/Orders (Fill).png"
import ordersIconPink from "../assets/Admin Panel/Orders (Fill) Pink.png"
import usersIconFill from "../assets/Admin Panel/Users (Fill).png"
import usersIconPink from "../assets/Admin Panel/Users (Fill) Pink.png"
import sellersIconFill from "../assets/Admin Panel/Sellers (Fill).png"
import sellersIconPink from "../assets/Admin Panel/Sellers (Fill) Pink.png"
import productsIconFill from "../assets/Admin Panel/Products (Fill).png"
import productsIconPink from "../assets/Admin Panel/Products (Fill) Pink.png"
import earningsPayoutIconFill from "../assets/Admin Panel/Earnings & Payout (Fill).png"
import earningsPayoutIconPink from "../assets/Admin Panel/Earnings & Payout (Fill) Pink.png"
import promotionsDiscountsIconFill from "../assets/Admin Panel/Promotions & Discounts (Fill).png"
import promotionsDiscountsIconPink from "../assets/Admin Panel/Promotions & Discounts (Fill) Pink.png"
import notificationsIconFill from "../assets/Admin Panel/Notifications (Fill).png"
import notificationsIconPink from "../assets/Admin Panel/Notifications (Fill) Pink.png"
import messagesIconFill from "../assets/Admin Panel/Messages (Fill).png"
import messagesIconPink from "../assets/Admin Panel/Messages (Fill) Pink.png"
import blogsIconFill from "../assets/Admin Panel/Blogs (Fill).png"
import blogsIconPink from "../assets/Admin Panel/Blogs (Fill) Pink.png"
import eventGalleryIconFill from "../assets/Admin Panel/Event Gallery (Fill).png"
import eventGalleryIconPink from "../assets/Admin Panel/Event Gallery (Fill) Pink.png"
import ratingsReviewsIconFill from "../assets/Admin Panel/Ratings & Reviews (Fill).png"
import ratingsReviewsIconPink from "../assets/Admin Panel/Ratings & Reviews (Fill) Pink.png"
import workWithUsIconFill from "../assets/Admin Panel/Work with Us (Fill).png"
import workWithUsIconPink from "../assets/Admin Panel/Work with Us (Fill) Pink.png"
import responseDeckIconFill from "../assets/Admin Panel/Response Deck (Fill).png"
import responseDeckIconPink from "../assets/Admin Panel/Response Deck (Fill) Pink.png"
import reportsIconFill from "../assets/Admin Panel/Report (Fill).png"
import reportsIconPink from "../assets/Admin Panel/Report (Fill) Pink.png"
import callRequestsIconFill from "../assets/Admin Panel/Call Request (Fill).png"
import callRequestsIconPink from "../assets/Admin Panel/Call Request (Fill) Pink.png"
import pickupWarehouseIconFill from "../assets/Admin Panel/Pickup Warehouse (Fill).png"
import pickupWarehouseIconPink from "../assets/Admin Panel/Pickup Warehouse (Fill) Pink.png"

function AdminLayout() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation().pathname;

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser().then(() => {
            dispatch(logout())
            navigate("/shop")
        })
    }


    let navItems = [
        {
            name: "Dashboard",
            slug: "/admin/dashboard",
            // icon: "fi fi-sr-apps"
            icon: dashboardIconFill,
            activeIcon: dashboardIconPink,
        },
        {
            name: "Orders",
            slug: "/admin/orders",
            // icon: "fi fi-sr-dolly-flatbed-alt"
            icon: ordersIconFill,
            activeIcon: ordersIconPink,
        },
        {
            name: "Users",
            slug: "/admin/users",
            // icon: "fi fi-sr-dolly-flatbed-alt"
            icon: usersIconFill,
            activeIcon: usersIconPink,
        },
        {
            name: "Sellers",
            slug: "/admin/sellers",
            // icon: "fi fi-ss-seller"
            icon: sellersIconFill,
            activeIcon: sellersIconPink,
        },
        // {
        //     name: "Carousel",
        //     slug: "/admin/carousel",
        //     // icon: "fi fi-sr-add-image"
        //     icon: ,
        //     activeIcon: ,
        // },
        // {
        //     name: "Promotional Banners",
        //     slug: "/admin/promotional-banners",
        //     // icon: "fi fi-sr-multiple"
        //     icon: ,
        //     activeIcon: ,
        // },
        {
            name: "Products",
            slug: "/admin/products",
            // icon: "fi fi-sr-boxes"
            icon: productsIconFill,
            activeIcon: productsIconPink,
        },
        {
            name: "Earnings & Payouts",
            slug: "/admin/earnings-payouts",
            // icon: "fi fi-sr-boxes"
            icon: earningsPayoutIconFill,
            activeIcon: earningsPayoutIconPink,
        },
        {
            name: "Promotions & Discounts",
            slug: "/admin/promotions-discounts",
            // icon: "fi fi-sr-boxes"
            icon: promotionsDiscountsIconFill,
            activeIcon: promotionsDiscountsIconPink,
        },
        {
            name: "Notifications",
            slug: "/admin/notifications",
            // icon: "fi fi-sr-boxes"
            icon: notificationsIconFill,
            activeIcon: notificationsIconPink,
        },
        {
            name: "Messages",
            slug: "/admin/messages",
            // icon: "fi fi-sr-boxes"
            icon: messagesIconFill,
            activeIcon: messagesIconPink,
        },
        {
            name: "Blogs",
            slug: "/admin/blogs",
            // icon: "fi fi-sr-blog-pencil"
            icon: blogsIconFill,
            activeIcon: blogsIconPink,
        },
        {
            name: "Event Gallery",
            slug: "/admin/event-gallery",
            // icon: "fi fi-sr-gallery"
            icon: eventGalleryIconFill,
            activeIcon: eventGalleryIconPink,
        },
        {
            name: "Ratings & Reviews",
            slug: "/admin/ratings-reviews",
            // icon: "fi fi-sr-feedback-review"
            icon: ratingsReviewsIconFill,
            activeIcon: ratingsReviewsIconPink,
        },
        {
            name: "Work With Us",
            slug: "/admin/work-with-us",
            // icon: "fi fi-sr-briefcase"
            icon: workWithUsIconFill,
            activeIcon: workWithUsIconPink,
        },
        {
            name: "Response Deck",
            slug: "/admin/newsletter",
            // icon: "fi fi-ss-thought-bubble"
            icon: responseDeckIconFill,
            activeIcon: responseDeckIconPink,
        },
        {
            name: "Reports",
            slug: "/admin/ticket-and-reports",
            // icon: "fi fi-sr-file-medical-alt"
            icon: reportsIconFill,
            activeIcon: reportsIconPink,
        },
        {
            name: "Call Request",
            slug: "/admin/request-call",
            // icon: "fi fi-sr-call-missed"
            icon: callRequestsIconFill,
            activeIcon: callRequestsIconPink,
        },
        {
            name: "Pickup Warehouse",
            slug: "/admin/pickup-warehouse",
            // icon: "fi fi-sr-warehouse-alt"
            icon: pickupWarehouseIconFill,
            activeIcon: pickupWarehouseIconPink,
        }
    ]

    return (
        <>
            <AdminHeader />
            <main className="flex gap-5 w-full h-[calc(100vh-64px)] p-5">
                <div className="w-[16%] 2xl:w-[14%] flex flex-col items-end h-full text-sm  relative overflow-y-scroll no-scrollbar">
                    {
                        navItems.map((item, index) => (
                            <NavLink to={item.slug} key={index} className={({ isActive }) => `w-full 2xl:w-[95%] py-2 pr-2 flex justify-end items-center gap-1 font-semibold rounded-[8px] lg:hover:bg-slate-200 ${isActive ? "text-[rgb(253,84,120)]" : ""}`}>{item.name} 
                            {/* <i className={`${item.icon} relative top-[2px]`} ></i> */}
                            <img src={location.includes(item.slug) ? item.activeIcon : item.icon} alt="" className="h-4" />
                            </NavLink>
                        ))
                    }
                    {/* <button onClick={handleLogout} className="flex gap-1 items-center text-[rgb(253,84,120)] hover:underline font-medium">
                        <img src={logoutRedIcon} alt="" className="h-5" /> Logout
                    </button> */}
                </div>
                <div className="w-[84%] 2xl:w-[86%] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border p-5 overflow-y-scroll no-scrollbar"><Outlet /></div>
            </main>
            {/* <main className="flex">
                <AdminSideBar />
                <div className="w-[84vw] bg-[rgb(245,245,245)] h-[calc(100vh-64px)] px-10 overflow-y-scroll">
                    <Outlet />
                </div>
            </main> */}
        </>
    );
}

export default AdminLayout;
