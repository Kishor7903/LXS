import TabSwitcher from "@/components/TabSwitcher";
import { useState } from "react"


function Notifications() {
    const tabs = ["Unread", "Read"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border m-5 px-5 py-5 overflow-hidden">
            <div className="pl-5 w-[65%]">
                <p className="font-medium text-sm">My Account {">"} <span className="text-[rgb(253,84,120)] font-semibold">Updates</span></p>
                <div className="w-full flex gap-10 mt-4 ml-4">
                    <div className="w-full flex items-center pb-2">
                        <div className="leading-[1] font-semibold">Attention, Earthling 🔊<br />
                            <p className="text-xs font-normal">An Alien voice is calling you to check updates!</p>
                        </div>
                        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} layoutId="notification" tabs={tabs} className="h-10 p-1 w-[50%] rounded-xl" activeClassName="rounded-[10px]" />
                        <div className="text-sm rounded-full py-1 px-3 ">
                            <label htmlFor="">Sort By :</label>
                            <select className="focus:outline-none font-semibold">
                                <option value="">Newest First</option>
                                <option value="">Oldest First</option>
                                <option value="">Low to High</option>
                                <option value="">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[35%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border sticky top-[92px]"></div>
        </div>
    )
}

export default Notifications
