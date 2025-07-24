import tile1Icon from "../../assets/dashboard/Recently Viewed Products.png"
import tile2Icon from "../../assets/dashboard/LXS Crew Membership.png"
import tile3Icon from "../../assets/dashboard/Personalise Your Order.png"
import tile4Icon from "../../assets/dashboard/Returned & Cancelled Orders.png"
import tile5Icon from "../../assets/dashboard/Payment History.png"
import tile6Icon from "../../assets/dashboard/LXS Announcement.png"
import tile7Icon from "../../assets/dashboard/Track Order.png"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

let tiles = [
  {
    icon: tile1Icon,
    title1: "Recently",
    title2: "Viewed Products",
    className: "bg-[rgb(8,43,61)]",
    navigate: "/user/recent-viewed-products"
  },
  {
    icon: tile2Icon,
    title1: "Exclusive",
    title2: "Membership",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
  },
  {
    icon: tile3Icon,
    title1: "Personalised",
    title2: "Your Order",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
  },
  {
    icon: tile4Icon,
    title1: "Returned &",
    title2: "Cancelled Orders",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
  },
  {
    icon: tile5Icon,
    title1: "Payment",
    title2: "History",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
  },
  {
    icon: tile6Icon,
    title1: "LXS",
    title2: "Announcements",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
  },
  {
    icon: tile7Icon,
    title1: "Track",
    title2: "Orders",
    className: "bg-[rgb(111,54,123)]",
    navigate: ""
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
    <div className="flex gap-4 h-full w-full pl-5">
      <div className="w-[60%] h-full pr-5">
        <div className="w-full">
          <p className="text-xl font-bold">Hello, {user.name.split(" ")[0]}!</p>
          <p className="font-medium text-sm relative bottom-1">Today is {formattedDate[0] + ", " + formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}</p>
        </div>
        <div className="flex gap-5 flex-wrap mt-5">
        {
          tiles.map((item, index) => (
            <div key={index} className={`w-[23%] h-28 rounded-xl relative overflow-hidden flex flex-col justify-end px-4 py-2 text-[18px] shadow-md cursor-pointer hover:scale-[1.08] active:scale-[0.95] lg:hover:shadow-[0px_0px_10px_-2px_rgb(8,43,61)] duration-200 z-0 bg-slate-100 border border-slate-300 `} onClick={() => navigate(item.navigate)}>
              <img src={item.icon} alt="" className='w-14 absolute top-5 right-0 -z-10' />
              <div className="text-[15px] leading-[1.3] text-center">
                <p className=''>{item.title1}</p>
                <p className='font-bold '>{item.title2}</p>
              </div>
            </div>
          ))
        }
        </div>
      </div>
      <div className="border w-[40%] h-full rounded-xl bg-[rgb(241,234,234)] shadow-[inset_0px_0px_10px_-2px_rgb(8,43,61)]"></div>
      {/* <ShopDashboardTile className="bg-[rgb(8,43,61)]" bgImage={tile1Image} icon={tile1Icon} title1="Recently" title2="Viewed Products" onClick={() => navigate("../../user/recent-viewed-products")} />
      <ShopDashboardTile className="bg-[rgb(111,54,123)]" bgImage={tile2Image} icon={tile2Icon} title1="Exclusive" title2="Membership Perks" />
      <ShopDashboardTile className="bg-[rgb(74,116,179)]" bgImage={tile3Image} icon={tile3Icon} title1="Personalized" title2="Recommendations" />
      <ShopDashboardTile className="bg-[rgb(60,23,49)]" bgImage={tile4Image} icon={tile4Icon} title1="Return &" title2="Refund Status" />
      <div className="border rounded-xl row-span-6 col-span-2 bg-[rgb(241,234,234)] shadow-[inset_0px_0px_10px_-2px_rgb(8,43,61)]"></div>
      <ShopDashboardTile className="bg-[rgb(68,52,72)]" bgImage={tile10Image} icon={tile10Icon} title1="Payment" title2="History" />
      <ShopDashboardTile className="bg-[rgb(49,80,96)]" bgImage={tile11Image} icon={tile11Icon} title1="Saved" title2="Jobs" />
      <ShopDashboardTile className="bg-[rgb(153,132,47)]" bgImage={tile12Image} icon={tile12Icon} title1="My" title2="Applied Jobs" />
      <ShopDashboardTile className="bg-[rgb(220,77,77)]" bgImage={tile13Image} icon={tile13Icon} title1="My" title2="Posted Jobs" />
      <ShopDashboardTile className="bg-[rgb(49,80,96)]" bgImage={tile11Image} icon={tile11Icon} title1="Saved" title2="Jobs" />
      <ShopDashboardTile className="bg-[rgb(153,132,47)]" bgImage={tile12Image} icon={tile12Icon} title1="My" title2="Applied Jobs" />
      <ShopDashboardTile className="bg-[rgb(220,77,77)]" bgImage={tile13Image} icon={tile13Icon} title1="My" title2="Posted Jobs" />
      <ShopDashboardTile className="bg-[rgb(49,80,96)]" bgImage={tile11Image} icon={tile11Icon} title1="Saved" title2="Jobs" />
      <ShopDashboardTile className="bg-[rgb(153,132,47)]" bgImage={tile12Image} icon={tile12Icon} title1="My" title2="Applied Jobs" />
      <ShopDashboardTile className="bg-[rgb(220,77,77)]" bgImage={tile13Image} icon={tile13Icon} title1="My" title2="Posted Jobs" />
      <ShopDashboardTile className="bg-[rgb(49,80,96)]" bgImage={tile11Image} icon={tile11Icon} title1="Saved" title2="Jobs" />
      <ShopDashboardTile className="bg-[rgb(153,132,47)]" bgImage={tile12Image} icon={tile12Icon} title1="My" title2="Applied Jobs" />
      <ShopDashboardTile className="bg-[rgb(220,77,77)]" bgImage={tile13Image} icon={tile13Icon} title1="My" title2="Posted Jobs" />
      <ShopDashboardTile className="bg-[rgb(49,80,96)]" bgImage={tile11Image} icon={tile11Icon} title1="Saved" title2="Jobs" /> */}
    </div>
  )
}

export default ShopSettingDashboard
