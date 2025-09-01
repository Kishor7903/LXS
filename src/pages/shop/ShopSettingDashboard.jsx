import tile1Icon from "../../assets/dashboard/Recently Viewed.png"
import tile2Icon from "../../assets/dashboard/LXS Crew Member.png"
import tile3Icon from "../../assets/dashboard/Custom Orders.png"
import tile4Icon from "../../assets/dashboard/Returned & Cancelled.png"
import tile5Icon from "../../assets/dashboard/Payment History.png"
import tile6Icon from "../../assets/dashboard/LXS Updates.png"
import tile7Icon from "../../assets/dashboard/Track Orders.png"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

let tiles = [
  {
    icon: tile1Icon,
    title1: "Recently",
    title2: "Viewed",
    className: "bg-[rgb(8,43,61)]",
    navigate: "/orders/recent-viewed-products"
  },
  {
    icon: tile3Icon,
    title1: "Custom",
    title2: "Orders",
    className: "bg-[rgb(111,54,123)]",
    navigate: "/orders/custom-orders"
  },
  {
    icon: tile4Icon,
    title1: "Returned &",
    title2: "Cancelled",
    className: "bg-[rgb(111,54,123)]",
    navigate: "/orders/returned-and-cancelled-orders"
  },
  {
    icon: tile7Icon,
    title1: "Track",
    title2: "Orders",
    className: "bg-[rgb(111,54,123)]",
    navigate: "/orders/track-orders"
  },
  {
    icon: tile2Icon,
    title1: "LXS Crew",
    title2: "Member",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
  },
  {
    icon: tile5Icon,
    title1: "Payment",
    title2: "History",
    className: "bg-[rgb(111,54,123)]",
    navigate: "/orders/payment-history"
  },
  {
    icon: tile6Icon,
    title1: "LXS",
    title2: "Updates",
    className: "bg-[rgb(111,54,123)]",
    navigate: "/orders/notifications"
  },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "My",
  //   title2: "Applied Jobs",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "My",
  //   title2: "Posted Jobs",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "Job",
  //   title2: "Alerts",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "Resume",
  //   title2: "Builder",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "My",
  //   title2: "Collaborations",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "Apply",
  //   title2: "as Creator",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "Earning",
  //   title2: "& Payouts",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "Creators",
  //   title2: "Profile",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "My",
  //   title2: "Gig",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "My Art",
  //   title2: "Gallery",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
  // {
  //   bgImage: tile1Icon,
  //   icon: tile1Icon,
  //   title1: "My",
  //   title2: "Portfolio",
  //   className: "bg-[rgb(111,54,123)]",
  //   navigate: ""
  // },
]


function ShopSettingDashboard() {
  let navigate = useNavigate();
  let { user } = useSelector(state => state.auth);
  let todaysDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(todaysDate).split(" ");

  return (
    <div className="flex gap-5 h-full w-full pl-5">
      <div className="w-[60%] h-full">
        <div className="w-full">
          <p className="text-xl font-bold">Hello, <span className="text-[rgb(253,84,120)]">{user?.name.split(" ")[0]}!</span></p>
          <p className="font-medium text-sm relative bottom-1">Today is {formattedDate[0] + ", " + formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}</p>
        </div>
        <div className="flex gap-5 flex-wrap mt-5">
        {
          tiles.map((item, index) => (
            <div key={index} className={`w-[22%] 0 2xl:w-[18%] h-14 rounded-xl relative overflow-hidden flex flex-col justify-end px-3 py-2 text-[18px] shadow-md cursor-pointer hover:scale-[1.08] active:scale-[0.95] lg:hover:shadow-[0px_0px_10px_-2px_rgb(8,43,61)] duration-200 z-0 bg-slate-100 border border-slate-300 `} onClick={() => navigate(item.navigate)}>
              <img src={item.icon} alt="" className='w-8 2xl:w-10 absolute top-3 2xl:top-2 right-2 -z-10' />
              <div className="text-[15px] leading-[1.3] text-left">
                <p className=''>{item.title1}</p>
                <p className='font-bold '>{item.title2}</p>
              </div>
            </div>
          ))
        }
        </div>
      </div>
      <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
    </div>
  )
}

export default ShopSettingDashboard
