import Breadcrumb from "@/components/Breadcrum"

let breadcrum = ["My Account", "Dashboard", "Custom Order"];


function CustomOrders() {
  return (
    <div className="flex gap-10 h-[calc(100vh-104px)] rounded-3xl shadow-[0px_0px_10px_-2px_rgb(8,43,61)] border m-5 px-5 py-5 overflow-hidden">
            <div className="pl-5 w-[65%]">
                <Breadcrumb items={breadcrum} />
                <div className="w-full flex gap-10 mt-4 ml-4">
                    <div className="w-full flex items-center pb-2">
                        <div className="leading-[1] font-semibold">Dream Drop 💭<br />
                            <p className="text-xs font-normal">Your vision, our craft — launched into reality</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[35%] h-[100%] rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)] border sticky top-[92px]"></div>
        </div>
    // <div className="w-full h-full pl-5 flex gap-5 ">
    //         <div className="w-[60%] h-full flex flex-col">
    //         <div className="leading-[1] font-semibold flex justify-between border-b border-[rgb(8,43,61)] h-10">
    //             <span>Mission Aborted 🚫<br />
    //                 <p className="text-xs font-normal">The mothership has recalled your cargo — launch sequence terminated.</p>
    //             </span>
    //             <p className='text-[12px] self-end mb-1'>Total Cancelled: <span className="text-[rgb(253,84,120)]"></span></p>
    //         </div>
    //         <hr className="border-[rgb(8,43,61)] border" />
    //     </div>
    //         <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
    //     </div>
  )
}

export default CustomOrders
