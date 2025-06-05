import MultiImageCarousel from "@/components/MultiImageCarousel";
import { getAllEventGaleryImages } from "@/firebase/admin";
import { getEventGalleryImgs } from "@/store/features/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function EventGallery() {
    let { eventGalleryImg } = useSelector(state => state.admin);
    let dispatch = useDispatch();

    useEffect(() => {
        getAllEventGaleryImages().then((res) => {
            dispatch(getEventGalleryImgs(res))
        })
    }, [])

    return (
        <div className="lg:pt-5 space-y-2 lg:space-y-5 w-full h-auto pb-10">

            <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
                <h3 className={`bg-gradient-to-b from-[rgb(248,181,42)] to-[rgb(240,84,120)] flex items-center rounded-r-full text-lg xl:text-3xl font-semibold pl-5 md:pl-8 lg:pl-12 xl:pl-16 py-1 text-white shadow-[0_5px_5px_-2px_rgb(8,43,61,0.6)] w-40 xl:w-72`}>Mission Logs!</h3>
                <p className="text-xs xl:text-lg font-medium ml-1 relative bottom-2 xl:bottom-0">Updates from the LXS universe, direct from HQ! 📡</p>
            </div>

            {
                eventGalleryImg.length >= 5 ? (
                    <MultiImageCarousel images={eventGalleryImg} />
                )
                :
                null
            }

        </div>
    )
}

export default EventGallery
