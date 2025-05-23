import ShopDashboardTile from "@/components/ShopDashboardTile"
import tile1Image from "../../assets/commonIcons/Cart IMG.png"
import tile1Icon from "../../assets/commonIcons/Recent Purchase.png"
import tile2Image from "../../assets/commonIcons/Perks IMG.png"
import tile2Icon from "../../assets/commonIcons/Member IMG.png"
import tile3Image from "../../assets/commonIcons/Personalized Recommondation IMG.png"
import tile3Icon from "../../assets/commonIcons/Artwork.png"
import tile4Image from "../../assets/commonIcons/Refund Status IMG.png"
import tile4Icon from "../../assets/commonIcons/Returned Order IMG.png"
import tile5Image from "../../assets/commonIcons/Wishlist 2 IMG.png"
import tile5Icon from "../../assets/commonIcons/Estimate IMG.png"
import tile6Image from "../../assets/commonIcons/Happyness IMG.png"
import tile6Icon from "../../assets/commonIcons/Savings IMG.png"
import tile7Image from "../../assets/commonIcons/Pending Order.png"
import tile7Icon from "../../assets/commonIcons/Pending Orders IMG.png"
import tile8Image from "../../assets/commonIcons/Category IMG.png"
import tile8Icon from "../../assets/commonIcons/Category.png"
import tile9Image from "../../assets/commonIcons/Monthly IMG.png"
import tile9Icon from "../../assets/commonIcons/Monthly Report IMG.png"
import tile10Image from "../../assets/commonIcons/Histort IMG.png"
import tile10Icon from "../../assets/commonIcons/Payment History IMG.png"
import tile11Image from "../../assets/commonIcons/Order Placed IMG.png"
import tile11Icon from "../../assets/commonIcons/Total Order IMG.png"
import tile12Image from "../../assets/commonIcons/Average IMG.png"
import tile12Icon from "../../assets/commonIcons/Average Order Value 2 IMG.png"
import tile13Image from "../../assets/commonIcons/First IMG.png"
import tile13Icon from "../../assets/commonIcons/First Purchase IMG.png"
import tile14Image from "../../assets/commonIcons/Total Spent 2 IMG.png"
import tile14Icon from "../../assets/commonIcons/Total Spent IMG.png"

function ShopSettingDashboard() {  
  return (
    <div className="grid grid-cols-5 grid-rows-4 gap-8 h-full w-full">
      <ShopDashboardTile className="bg-[rgb(8,43,61)]" bgImage={tile1Image} icon={tile1Icon} title1="Recently" title2="Viewed Products" />
      <ShopDashboardTile className="bg-[rgb(111,54,123)]" bgImage={tile2Image} icon={tile2Icon} title1="Exclusive" title2="Membership Perks" />
      <div className="border rounded-xl row-span-2 col-span-3 bg-[rgb(241,234,234)] shadow-[inset_0px_0px_10px_-2px_rgb(8,43,61)]"></div>
      <ShopDashboardTile className="bg-[rgb(74,116,179)]" bgImage={tile3Image} icon={tile3Icon} title1="Personalized" title2="Recommendations" />
      <ShopDashboardTile className="bg-[rgb(60,23,49)]" bgImage={tile4Image} icon={tile4Icon} title1="Return &" title2="Refund Status" />
      <ShopDashboardTile className="bg-[rgb(12,196,207)]" bgImage={tile5Image} icon={tile5Icon} title1="Estimated" title2="Wishlist Value" />
      <ShopDashboardTile className="bg-[rgb(31,116,95)]" bgImage={tile6Image} icon={tile6Icon} title1="Saving" title2="Discount Received" />
      <ShopDashboardTile className="bg-[rgb(41,117,182)]" bgImage={tile7Image} icon={tile7Icon} title1="Pending" title2="Orders" />
      <ShopDashboardTile className="bg-[rgb(105,103,86)]" bgImage={tile8Image} icon={tile8Icon} title1="Most Purchased" title2="Category" />
      <ShopDashboardTile className="bg-[rgb(14,10,69)]" bgImage={tile9Image} icon={tile9Icon} title1="Monthly" title2="Spending Report" />
      <ShopDashboardTile className="bg-[rgb(68,52,72)]" bgImage={tile10Image} icon={tile10Icon} title1="Payment" title2="History" />
      <ShopDashboardTile className="bg-[rgb(49,80,96)]" bgImage={tile11Image} icon={tile11Icon} title1="Total" title2="Order Placed" />
      <ShopDashboardTile className="bg-[rgb(153,132,47)]" bgImage={tile12Image} icon={tile12Icon} title1="Average" title2="Order Value" />
      <ShopDashboardTile className="bg-[rgb(220,77,77)]" bgImage={tile13Image} icon={tile13Icon} title1="First" title2="Order Placed" />
      <ShopDashboardTile className="bg-[rgb(140,0,0)]" bgImage={tile14Image} icon={tile14Icon} title1="Total" title2="Money Spent" />
    </div>
  )
}

export default ShopSettingDashboard
