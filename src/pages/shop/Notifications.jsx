import Breadcrumb from "@/components/Breadcrum";
import TabSwitcher from "@/components/TabSwitcher";
import { useState } from "react"

let breadcrum = ["My Account", "Dashboard", "LXS Updates"];


function Notifications() {
    const tabs = ["Unread", "Read"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border m-5 px-5 py-5 overflow-hidden">
            <div className="pl-5 w-[65%] relative">
                <Breadcrumb items={breadcrum} />
                <div className="w-full flex justify-between mt-4">
                    <div className="leading-[1] font-semibold">Attention, Earthling 🔊<br />
                        <p className="text-xs font-normal">An Alien voice is calling you to check updates!</p>
                    </div>
                    <div className="text-sm rounded-full py-1 pl-3 ">
                        <label htmlFor="">Sort By :</label>
                        <select className="focus:outline-none font-semibold text-[rgb(59,130,246)]">
                            <option value="">Newest First</option>
                            <option value="">Oldest First</option>
                        </select>
                    </div>
                </div>
                <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} layoutId="notification" tabs={tabs} className="h-12 p-1 w-full mx-auto rounded-xl mt-4" activeClassName="rounded-[10px]" textClassName="uppercase" />
                <hr className="border-[rgb(8,43,61)] border absolute bottom-0 w-[98%] right-0" />
            </div>
            <div className="w-[35%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border sticky top-[92px]"></div>
        </div>
    )
}

export default Notifications
