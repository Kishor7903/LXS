import { useState } from "react";
import shoppingIcon from "../../assets/shiftingNavbarIcons/Shopping.png"
import jobPortalIcon from "../../assets/shiftingNavbarIcons/Job Portal.png"
import influencerCollabIcon from "../../assets/shiftingNavbarIcons/Influncer Collab.png"
import artMarketplaceIcon from "../../assets/shiftingNavbarIcons/Art Marketplace.png"
import sellOnLXSStoreIcon from "../../assets/shiftingNavbarIcons/Sell on LXS Store.png"


function ShiftingNavbar() {
    const [state, setState] = useState("Shopping");

    const items = [
        {
            name: "Sell On LXS",
            icon: sellOnLXSStoreIcon
        },
        {
            name: "Creators Collab",
            icon: influencerCollabIcon
        },
        {
            name: "Shopping",
            icon: shoppingIcon
        },
        {
            name: "Job Portal",
            icon: jobPortalIcon
        },
        {
            name: "Art Marketplace",
            icon: artMarketplaceIcon
        },
    ];

    return (
        <div className="h-10 md:h-14 lg:h-16 flex gap-2 items-end justify-between bg-[rgb(213,225,233)] px-2">
            {
                items.map((item, index) => (
                    <div key={index} name={item.name} className={`w-1/5 h-[34px] md:h-[45px] lg:h-[55px] flex justify-center items-center gap-1 px-2 cursor-pointer text-[9px] md:text-base lg:text-lg  font-bold ${state === item.name ? "bg-white rounded-t-xl xl:text-2xl md:font-bold shadow-[0_-2px_4px_-1px_rgb(8,43,61)]" : "xl:text-xl md:font-semibold"}`} onClick={() => setState(item.name)}><span className={`tracking-tight sm:tracking-normal text-center  leading-[1.1] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2] `}>{item.name}</span><img src={item.icon} alt="" className="lg:h-8 xl:h-8 hidden lg:block" /></div>
                ))
            }
        </div>
    )
}

export default ShiftingNavbar
