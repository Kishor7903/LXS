import AboutUs from '@/pages/shop/AboutUs'
import Contributers from '@/pages/shop/Contributers'
import InfoIconsContainer from '@/pages/shop/InfoIconsContainer'
import WhatWeDo from '@/pages/shop/WhatWeDo'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AboutUsPageLayout() {
  let navigate = useNavigate();

  return (
    <>
      <AboutUs />
      <InfoIconsContainer />
      <Contributers />
      <WhatWeDo />
      <div className="flex justify-center items-center gap-5 border-t py-5 font-semibold">
        <p>So, you’re ready to revisit your little fashion scandal? Bold move — I respect it. Wanna see it again?</p>
        <button onClick={() => navigate("/setting/hidden-orders")} className=" text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end">Click Here <i className="fi fi-sr-eye relative top-[2px]"></i></button>
      </div>
    </>
  )
}

export default AboutUsPageLayout
