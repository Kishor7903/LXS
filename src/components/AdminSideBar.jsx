import { NavLink } from "react-router-dom"


function AdminSideBar() {


    let navItems = [
        {
            name: "Dashboard",
            slug: "/admin/dashboard",
            icon: "fi fi-sr-apps"
        },
        {
            name: "Carousel",
            slug: "/admin/carousel",
            icon: "fi fi-sr-add-image"
        },
        {
            name: "Products",
            slug: "/admin/products",
            icon: "fi fi-sr-boxes"
        },
        {
            name: "Orders",
            slug: "/admin/orders",
            icon: "fi fi-sr-dolly-flatbed-alt"
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
            name: "Newsletter",
            slug: "/admin/newsletter",
            icon: "fi fi-sr-newspaper"
        },
        {
            name: "Tickets & Reports",
            slug: "/admin/ticket-and-reports",
            icon: "fi fi-sr-comment-question"
        },
        {
            name: "Request Call",
            slug: "/admin/request-call",
            icon: "fi fi-sr-phone-call"
        },
        
        {
            name: "Settings",
            slug: "/admin/settings",
            icon: "fi fi-sr-settings"
        },
    ]

  return (
    <div className="h-screen fixed w-[17%] border-r shadow-sm flex flex-col p-3 text-lg text-[rgb(8,43,61,0.8)] top-[70px]">
        {
            navItems.map((item, index) => (
                <NavLink key={index} to={item.slug} className={({isActive}) => `mt-1 hover:bg-slate-200 px-3 py-2 rounded-[6px] ${isActive ? "font-semibold text-[rgb(8,43,61)]" : ""}`}><i className={`${item.icon} relative top-[2px] mr-2`} ></i> {item.name}</NavLink>
            ))
        }
    </div>
  )
}

export default AdminSideBar
