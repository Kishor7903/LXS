import React from 'react'
import { Outlet } from 'react-router-dom'

function ShopSettingSettings() {
    return (
        <div className="w-full h-full px-5 flex gap-5 ">
            <div className="space-y-3 h-[95%] px-2 overflow-y-scroll no-scrollbar w-1/2"><Outlet/></div>
            <div className="border w-1/2 h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default ShopSettingSettings
