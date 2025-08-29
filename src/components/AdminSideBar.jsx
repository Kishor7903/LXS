import { logoutUser } from "@/firebase/auth";
import { logout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"

function AdminSideBar() {
    let dispatch = useDispatch();
    let navigate = useNavigate();

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
            icon: "fi fi-sr-apps"
        },
        // {
        //     name: "Carousel",
        //     slug: "/admin/carousel",
        //     icon: "fi fi-sr-add-image"
        // },
        // {
        //     name: "Promotional Banners",
        //     slug: "/admin/promotional-banners",
        //     icon: "fi fi-sr-multiple"
        // },
        {
            name: "Products",
            slug: "/admin/products",
            icon: "fi fi-sr-boxes"
        },
        {
            name: "Pickup Warehouse",
            slug: "/admin/pickup-warehouse",
            icon: "fi fi-sr-warehouse-alt"
        },
        {
            name: "Orders",
            slug: "/admin/orders",
            icon: "fi fi-sr-dolly-flatbed-alt"
        },
        {
            name: "Blogs",
            slug: "/admin/blogs",
            icon: "fi fi-sr-blog-pencil"
        },
        {
            name: "Reviews",
            slug: "/admin/reviews",
            icon: "fi fi-sr-feedback-review"
        },
        {
            name: "Sellers",
            slug: "/admin/sellers",
            icon: "fi fi-ss-seller"
        },
        {
            name: "Event Gallery",
            slug: "/admin/event-gallery",
            icon: "fi fi-sr-gallery"
        },
        {
            name: "Work With Us",
            slug: "/admin/work-with-us",
            icon: "fi fi-sr-briefcase"
        },
        {
            name: "Response Deck",
            slug: "/admin/newsletter",
            icon: "fi fi-ss-thought-bubble"
        },
        {
            name: "Reports",
            slug: "/admin/ticket-and-reports",
            icon: "fi fi-sr-file-medical-alt"
        },
        {
            name: "Request Call",
            slug: "/admin/request-call",
            icon: "fi fi-sr-call-missed"
        },

        // {
        //     name: "Settings",
        //     slug: "/admin/settings",
        //     icon: "fi fi-sr-settings"
        // },
    ]

    return (
        <div className="h-[92vh] flex flex-col justify-between fixed w-[16%] border-r shadow-sm py-3 px-1 text-[rgb(8,43,61,0.8)] top-[70px]">
            <div className="flex flex-col items-end">
                {
                    navItems.map((item, index) => (
                        <NavLink key={index} to={item.slug} className={({ isActive }) => `hover:bg-slate-200 w-[97%] px-3 text-right py-2 rounded-[6px] ${isActive ? "font-semibold text-[rgb(8,43,61)]" : ""}`}>{item.name}<i className={`${item.icon} relative top-[2px] ml-2`} ></i></NavLink>
                    ))
                }
            </div>
            <button onClick={handleLogout} className="h-10 w-20 rounded bg-red-500 text-white font-semibold lg:active:bg-red-600 self-end mb-5">Logout</button>
        </div>
    )
}

export default AdminSideBar
