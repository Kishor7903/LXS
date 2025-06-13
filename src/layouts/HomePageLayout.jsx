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
import { useDispatch, useSelector } from "react-redux"
import ShiftingNavbar from "@/pages/shop/ShiftingNavbar"


function HomePageLayout() {
    let dispatch = useDispatch();
    let { carouselImg } = useSelector(state => state.admin);


    useEffect(() => {
        getAllCarouselImages().then((res) => {
            dispatch(getCarouselImgs(res));
        })
    }, []);
    return (
        <>
            <ShiftingNavbar />
            <Carousel carouselImg={carouselImg} />
            <OfferBannerSection />
            <FeaturedProducts />
            <InfoIconsContainer />
            <ShopBlogs />
            <EventGallery />
            <WhatWeDo />
            <WorkWithUsAndNewsletter />
            {/* <Reviews /> */}
            {/* <AnimatingMan className="h-40 md:h-72 lg:h-96" /> */}
        </>
    )
}

export default HomePageLayout
