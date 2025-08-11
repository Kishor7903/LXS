import { getAllCarouselImages } from "@/firebase/admin"
// import AnimatingMan from "@/pages/shop/AnimatingMan"
import ShopBlogs from "@/pages/shop/ShopBlogs"
import Carousel from "@/pages/shop/Carousel"
import EventGallery from "@/pages/shop/EventGallery"
import FeaturedProducts from "@/pages/shop/FeaturedProducts"
import InfoIconsContainer from "@/pages/shop/InfoIconsContainer"
import OfferBannerSection from "@/pages/shop/OfferBannerSection"
import WhatWeDo from "@/pages/shop/WhatWeDo"
import WorkWithUsAndNewsletter from "@/pages/shop/WorkWithUsAndNewsletter"
// import Reviews from "@/pages/shop/Reviews"
import { getCarouselImgs } from "@/store/features/adminSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import banner1 from "../assets/Banners/Carousel Image 1.png"
import banner2 from "../assets/Banners/Carousel Image 4.png"


function HomePageLayout() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let carouselImg = [
        {
            img: banner1,
            url: "/about-us"
        },
        {
            img: banner2,
            url: "/blank"
        }
    ]


    useEffect(() => {
        getAllCarouselImages().then((res) => {
            dispatch(getCarouselImgs(res));
        })
    }, []);
    return (
        <>
            {/* <ShiftingNavbar /> */}
            {/* <Carousel carouselImg={carouselImg} /> */}
            <div className="flex flex-wrap gap-12 xl:px-20 2xl:px-32 pt-10">
                {
                    carouselImg.map((img, idx) => 
                    <div onClick={() => navigate(img.url)} key={idx} className="w-[calc(50%-1.5rem)] rounded-xl h-full lg:rounded-2xl overflow-hidden border border-[rgb(8,43,61,0.2)] cursor-pointer lg:hover:scale-[1.02] duration-200 hover:shadow-[0px_0px_20px_-1px_rgb(8,43,61)] lg:hover:border-none shadow-md">
                        <img src={img.img} alt="" className="object-fill" />
                    </div>
                    )
                }
            </div>
            <OfferBannerSection />
            <FeaturedProducts />
            <ShopBlogs />
            <EventGallery />
            {/* <WhatWeDo /> */}
            {/* <InfoIconsContainer /> */}
            <WorkWithUsAndNewsletter />
            {/* <Reviews /> */}
            {/* <AnimatingMan className="h-40 md:h-72 lg:h-96" /> */}
        </>
    )
}

export default HomePageLayout
