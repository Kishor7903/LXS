import HeadingWithUnderline from "@/components/HeadingWithUnderline";
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
        <div className="lg:pt-5 mt-5 space-y-2 lg:space-y-5 w-full h-auto pb-10 border-y flex flex-col">

            <HeadingWithUnderline name="Mission Logs!" />

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
