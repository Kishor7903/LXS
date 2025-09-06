import { getWebsiteReview } from '@/firebase/auth'
import AboutUs from '@/pages/shop/AboutUs'
import Contributers from '@/pages/shop/Contributers'
import reviewLogoActive from "../assets/commonIcons/Ratings & Reviews (Fill).png"
import starIconFill from "../assets/commonIcons/Rewards 2 (Fill).png"
import starIconStroke from "../assets/commonIcons/Rewards 2 (Stroke).png"
import accountIcon from "../assets/commonIcons/Account.png"
import WhatWeDo from '@/pages/shop/WhatWeDo'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllUsers } from '@/firebase/admin'

function AboutUsPageLayout() {
    let navigate = useNavigate();
    let [reviews, setReviews] = useState([]);
    let [users, setUsers] = useState([]);
    let location = useLocation();

    useEffect(() => {
        getWebsiteReview().then(res => {
            setReviews(res);
        })
        getAllUsers().then(res => {
            setUsers(res);
        })
    }, [])

    useEffect(() => {
        if (location.hash) {
          const element = document.querySelector(location.hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, [location]);

    return (
        <>
            <AboutUs />
            <div className="px-16 border-t flex flex-col items-center w-full gap-6 py-6" id='global-ratings'>
                <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-2/3 after:left-[16%] after:bottom-0 after:bg-[rgb(8,43,61)] after:rounded-full'>GLOBAL RATINGS !</h2>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-5">
                        <span className="text-[45px] font-semibold leading-6">{(() => {
                            let totalRating = reviews.reduce((sum, i) => sum + i.rating, 0)
                            return (totalRating / reviews.length).toFixed(1)
                        })()}</span>
                        <img src={reviewLogoActive} alt="" className="h-12 relative bottom-2" />
                    </div>
                    <p className="font-semibold text-lg">Ratings & Reviews <span className="text-base font-bold">({reviews.length})</span> </p>
                </div>
                <div className="flex gap-10">
                    {
                        reviews.map((review, index) => (
                            <div key={index} className="flex flex-col gap-3 items-center border relative border-slate-300 shadow-md rounded-xl p-4 w-1/5">
                                <img src={review.userId ? users.find((i) => i.id === review.userId)?.profilePic ? users.find((i) => i.id === review.userId)?.profilePic : accountIcon : accountIcon} alt="" className='h-14 shadow-md rounded-full' />
                                <div className="flex gap-2">
                                    {
                                        [0,1,2,3,4].map((_, idx) => (
                                            <img src={idx < review.rating ? starIconFill : starIconStroke} alt="" className='h-6' />
                                        ))
                                    }
                                </div>
                                <p className='line-clamp-3 text-center font-medium leading-[1.3] text-sm opacity-60'>{review.description}</p>
                                <span className='text-base font-semibold mt-auto'>- {review.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Contributers />
            <WhatWeDo />
            {/* <div className="flex justify-center items-center gap-5 border-t py-5 font-semibold">
                <p>So, you’re ready to revisit your little fashion scandal? Bold move — I respect it. Wanna see it again?</p>
                <button onClick={() => navigate("/setting/hidden-orders")} className=" text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 self-end">Click Here <i className="fi fi-sr-eye relative top-[2px]"></i></button>
            </div> */}
        </>
    )
}

export default AboutUsPageLayout
