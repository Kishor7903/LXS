import Breadcrum from "@/components/Breadcrum"
import { useState } from "react"


function Notifications() {
    let [notificationRead, setNotificationRead] = useState(false);

    let items = [
        {
            label: "Home",
            path: "/shop"
        },
        {
            label: "Notification",
        },
    ]

    return (
        <div className="px-16 py-6 h-[91vh]">
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <div className="leading-[1] font-semibold">Attention, Earthling 🔊<br />
                        <p className="text-xs font-normal">An Alien voice is calling you to check updates!</p>
                    </div>
                    <div className="rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border h-[89.5%] mt-5 px-8 py-3 flex flex-col w-full">
                        <div className="border-b flex justify-between items-center shadow-sm text-sm">
                            <div className="flex ">
                            <div className={`w-32 flex justify-center items-center h-10 border-[rgb(8,43,61)] relative cursor-pointer ${notificationRead ? "" : "after:h-[4px] after:w-full after:bg-[rgb(8,43,61)] after:absolute after:bottom-0 font-semibold"}`} onClick={() => setNotificationRead(false)}>Unread</div>
                            <div className={`w-32 flex justify-center items-center h-10 border-[rgb(8,43,61)] relative cursor-pointer ${notificationRead ? "after:h-[4px] after:w-full after:bg-[rgb(8,43,61)] after:absolute after:bottom-0 font-semibold" : ""}`} onClick={() => setNotificationRead(true)}>Read</div>
                            </div>
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
                        <div className="flex flex-col gap-1 overflow-y-scroll no-scrollbar ">
                            {
                                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((_, index) => (
                                    <div key={index} className="relative text-xs border-b border-[rgb(8,43,61,0.5)] pb-2">
                                        <h6 className="text-sm font-semibold my-1">New Collections Alert</h6>
                                        <p className="relative bottom-1">Join Our influencer program and collaborate with brands. Signup now and start earning.</p>
                                        <span className="absolute top-0 font-medium opacity-70 right-2">March 15, 2025</span>
                                        <hr className="border-[rgb(8,43,61,0.5)] relative top-1" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-[98.5%] rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </div>
    )
}

export default Notifications
