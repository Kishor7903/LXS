import React from 'react'

function ShopDashboardTile({bgImage, className, icon, title1, title2}) {
  return (
    <div className={`rounded-xl relative overflow-hidden flex flex-col px-4 py-2 text-[18px] shadow-md cursor-pointer ${className}`}>
        <img src={bgImage} alt="" className='opacity-50 h-[80%] absolute top-6 -right-2 z-10 scale-110' />
        <img src={icon} alt=""className='w-14' />
        <span className='text-white font-bold z-20 '>{title1}</span><br />
        <span className='text-white font-bold z-20 relative bottom-8'>{title2}</span>
    </div>
  )
}

export default ShopDashboardTile
