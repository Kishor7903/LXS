import React from 'react'

function ShopDashboardTile({bgImage, className, icon, title1, title2, onClick}) {
  return (
    <div className={`rounded-xl relative overflow-hidden flex flex-col px-4 py-2 text-[18px] shadow-md cursor-pointer lg:hover:scale-[1.08] lg:hover:shadow-[0px_0px_10px_2px_rgb(8,43,61)] duration-150 ${className}`} onClick={onClick}>
        <img src={bgImage} alt="" className='opacity-50 h-[70%] absolute top-6 right-0 z-10 scale-110' />
        <img src={icon} alt=""className='w-14' />
        <span className='text-white font-bold top-2 text-[16px] relative z-20 '>{title1}</span><br />
        <span className='text-white font-bold text-[16px] z-20 relative bottom-6'>{title2}</span>
    </div>
  )
}

export default ShopDashboardTile
