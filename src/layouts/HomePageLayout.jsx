import { getAllCarouselImages } from "@/firebase/admin"
// import AnimatingMan from "@/pages/shop/AnimatingMan"
import Blogs from "@/pages/shop/Blogs"
import Carousel from "@/pages/shop/Carousel"
import Contributers from "@/pages/shop/Contributers"
import EventGallery from "@/pages/shop/EventGallery"
import FeaturedProducts from "@/pages/shop/FeaturedProducts"
import InfoIconsContainer from "@/pages/shop/InfoIconsContainer"
import OfferBannerSection from "@/pages/shop/OfferBannerSection"
// import Reviews from "@/pages/shop/Reviews"
import { getCarouselImgs } from "@/store/features/adminSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


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
            <Carousel carouselImg={carouselImg} />
            <OfferBannerSection />
            <FeaturedProducts />
            <InfoIconsContainer />
            <Blogs />
            <EventGallery />
            {/* <Reviews /> */}
            {/* <AnimatingMan className="h-40 md:h-72 lg:h-96" /> */}
            <Contributers />
        </>
    )
}

export default HomePageLayout
